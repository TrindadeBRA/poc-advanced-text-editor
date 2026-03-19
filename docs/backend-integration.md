# Documentação de Integração — Backend

## Visão Geral

O Editor de Texto Avançado realiza upload de mídia (imagens e vídeos) diretamente para o Amazon S3 usando o padrão de **URLs pré-assinadas**. O backend é responsável apenas por gerar essas URLs — o upload em si ocorre diretamente do browser para o S3, sem trafegar pelo servidor.

O editor também produz conteúdo em **HTML** que deve ser armazenado e recuperado pelo backend.

---

## 1. Endpoint de URL Pré-assinada

### `POST /presigned-url`

> O path exato é configurável. O frontend recebe o endpoint via prop `presignedUrlEndpoint`.

Gera uma URL pré-assinada do S3 para upload direto e retorna a URL pública final do recurso.

### Request

**Headers**
```
Content-Type: application/json
Authorization: Bearer <token>   (conforme autenticação da aplicação)
```

**Body**
```json
{
  "fileName": "imagem-exemplo.jpg",
  "contentType": "image/jpeg",
  "mediaType": "image"
}
```

| Campo | Tipo | Obrigatório | Descrição |
|-------|------|-------------|-----------|
| `fileName` | `string` | Sim | Nome original do arquivo selecionado pelo usuário |
| `contentType` | `string` | Sim | MIME type do arquivo (ex: `image/jpeg`, `video/mp4`) |
| `mediaType` | `"image" \| "video"` | Sim | Tipo de mídia — determina bucket/pasta de destino |

### Response — 200 OK

```json
{
  "uploadUrl": "https://bucket.s3.amazonaws.com/uploads/uuid-filename.jpg?X-Amz-Signature=...",
  "resourceUrl": "https://cdn.example.com/uploads/uuid-filename.jpg"
}
```

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `uploadUrl` | `string` | URL pré-assinada do S3 para `PUT` direto. Deve ter validade mínima de **5 minutos** |
| `resourceUrl` | `string` | URL pública permanente do recurso após o upload. Será inserida no HTML do editor |

### Responses de Erro

| Status | Situação |
|--------|----------|
| `400 Bad Request` | Body inválido ou campos ausentes |
| `401 Unauthorized` | Token inválido ou ausente |
| `403 Forbidden` | Usuário sem permissão para upload |
| `500 Internal Server Error` | Falha ao gerar a URL pré-assinada |

---

## 2. Fluxo Completo de Upload

```
Frontend                    Backend                     S3
   |                           |                          |
   |-- POST /presigned-url --> |                          |
   |   { fileName,             |                          |
   |     contentType,          |-- GeneratePresignedUrl ->|
   |     mediaType }           |<-- uploadUrl + key ------|
   |<-- { uploadUrl,           |                          |
   |      resourceUrl } -------|                          |
   |                           |                          |
   |-- PUT {uploadUrl} --------|---------------->         |
   |   Content-Type: image/jpeg|                          |
   |   Body: <binary file>     |                          |
   |<-- 200 OK ----------------|<-------------------------|
   |                           |                          |
   | (insere resourceUrl no    |                          |
   |  HTML do editor)          |                          |
```

**Importante:** O `PUT` para o S3 é feito diretamente pelo browser, sem passar pelo backend. O header `Content-Type` enviado no `PUT` deve corresponder exatamente ao `contentType` informado na geração da URL pré-assinada.

---

## 3. Configuração do S3 (CORS)

O bucket S3 precisa ter CORS configurado para aceitar requisições `PUT` diretas do browser:

```json
[
  {
    "AllowedHeaders": ["Content-Type"],
    "AllowedMethods": ["PUT"],
    "AllowedOrigins": ["https://seu-dominio.com"],
    "ExposeHeaders": []
  }
]
```

Para desenvolvimento local, adicionar `"http://localhost:5173"` em `AllowedOrigins`.

---

## 4. Recomendações de Implementação

### Geração da URL pré-assinada

```
- Método S3: PutObject
- Validade recomendada: 5 a 15 minutos
- Key sugerida: uploads/{mediaType}/{uuid}/{fileName}
  Exemplo: uploads/image/a1b2c3d4/imagem-exemplo.jpg
- Permissão necessária na IAM policy: s3:PutObject no bucket de destino
```

### Separação por tipo de mídia

Recomenda-se usar pastas ou buckets distintos por `mediaType`:

| `mediaType` | Destino sugerido |
|-------------|-----------------|
| `image` | `s3://bucket/uploads/images/` |
| `video` | `s3://bucket/uploads/videos/` |

### Validação recomendada no backend

Antes de gerar a URL pré-assinada, validar:

- `contentType` está na lista de tipos permitidos
- Tamanho máximo do arquivo (via `Content-Length` condition na URL pré-assinada)
- Usuário autenticado tem permissão para fazer upload

**Tipos de arquivo recomendados para aceitar:**

| `mediaType` | `contentType` aceitos |
|-------------|----------------------|
| `image` | `image/jpeg`, `image/png`, `image/gif`, `image/webp`, `image/svg+xml` |
| `video` | `video/mp4`, `video/webm`, `video/ogg`, `video/quicktime` |

---

## 5. Conteúdo do Editor (HTML)

O editor produz e consome **HTML** serializado. O backend deve armazenar e retornar esse HTML como string.

### Formato do conteúdo

O HTML gerado pelo editor segue o padrão do ProseMirror/Tiptap. Exemplos:

**Texto com formatação:**
```html
<p><strong>Negrito</strong> e <em>itálico</em> e <u>sublinhado</u></p>
```

**Imagem inserida:**
```html
<img src="https://cdn.example.com/uploads/images/uuid/foto.jpg">
```

**Vídeo inserido:**
```html
<video src="https://cdn.example.com/uploads/videos/uuid/video.mp4" controls width="100%"></video>
```

**Lista:**
```html
<ul><li>Item 1</li><li>Item 2</li></ul>
```

**Texto com estilos inline:**
```html
<p style="text-align: center; line-height: 1.5;">
  <span style="font-size: 18px; font-family: Graphik; color: #ff0000;">Texto estilizado</span>
</p>
```

### Integração com o componente

O componente `AdvancedTextEditor` aceita as seguintes props para integração:

```tsx
<AdvancedTextEditor
  initialContent="<p>Conteúdo salvo anteriormente</p>"
  onChange={(html) => salvarNoBackend(html)}
  presignedUrlEndpoint="https://api.example.com/presigned-url"
  placeholder="Digite aqui..."
  editable={true}
/>
```

| Prop | Tipo | Descrição |
|------|------|-----------|
| `initialContent` | `string` | HTML salvo anteriormente, retornado pelo backend |
| `onChange` | `(html: string) => void` | Callback chamado a cada alteração — recebe o HTML atualizado |
| `presignedUrlEndpoint` | `string` | URL completa do endpoint de geração de URL pré-assinada |
| `placeholder` | `string` | Texto de placeholder quando o editor está vazio |
| `editable` | `boolean` | `false` para modo somente leitura (ex: visualização) |

### Sanitização

Recomenda-se sanitizar o HTML no backend antes de armazenar e ao retornar para o cliente, usando uma biblioteca como [DOMPurify](https://github.com/cure53/DOMPurify) (Node.js) ou equivalente, para prevenir XSS.

---

## 6. Resumo dos Contratos

| # | Responsabilidade | Frontend | Backend |
|---|-----------------|----------|---------|
| 1 | Gerar URL pré-assinada | Envia `POST` com `fileName`, `contentType`, `mediaType` | Retorna `uploadUrl` e `resourceUrl` |
| 2 | Upload do arquivo | Faz `PUT` direto no S3 com o arquivo binário | Configura CORS no bucket S3 |
| 3 | Armazenar conteúdo | Envia HTML via `onChange` callback | Persiste a string HTML no banco |
| 4 | Carregar conteúdo | Recebe HTML via prop `initialContent` | Retorna a string HTML salva |
