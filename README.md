# AdvancedTextEditor

Editor de texto rico baseado em [Tiptap](https://tiptap.dev/), com suporte a formatação, mídia, links e upload direto para S3.

---

## Instalação das dependências

```bash
npm install
# ou
yarn install
```

---

## Uso do componente

```tsx
import AdvancedTextEditor from './components/AdvancedTextEditor/AdvancedTextEditor'

export default function MyPage() {
  const [content, setContent] = useState('')

  return (
    <AdvancedTextEditor
      initialContent={content}
      onChange={setContent}
      presignedUrlEndpoint="https://api.example.com/presigned-url"
      placeholder="Digite aqui..."
      editable={true}
    />
  )
}
```

---

## Props

| Prop | Tipo | Obrigatório | Padrão | Descrição |
|------|------|-------------|--------|-----------|
| `initialContent` | `string` | Não | `''` | HTML inicial a ser carregado no editor |
| `onChange` | `(html: string) => void` | Não | — | Callback chamado a cada alteração, recebe o HTML atualizado |
| `presignedUrlEndpoint` | `string` | Não | — | URL do endpoint para geração de presigned URL do S3. Se omitido, o upload usa mock local (base64) |
| `placeholder` | `string` | Não | `'Digite aqui...'` | Texto exibido quando o editor está vazio |
| `editable` | `boolean` | Não | `true` | `false` para modo somente leitura |

---

## Funcionalidades da toolbar

| Grupo | Funcionalidades |
|-------|----------------|
| Fonte | Família, tamanho |
| Formatação | Negrito, itálico, sublinhado, limpar formatação |
| Alinhamento | Esquerda, centro, direita, justificado |
| Listas | Com marcadores, ordenada |
| Cores | Cor do texto, cor de fundo (highlight) |
| Mídia | Inserir imagem (limite 2MB), inserir vídeo (limite 5MB) |
| Link | Inserir/editar/remover link |
| Histórico | Desfazer, refazer |
| Código | Visualizar/editar HTML fonte |

---

## Upload de mídia

Quando `presignedUrlEndpoint` é fornecido, o fluxo é:

1. Usuário seleciona o arquivo
2. Editor insere a mídia imediatamente com overlay de carregamento
3. Frontend solicita uma presigned URL ao backend (`POST presignedUrlEndpoint`)
4. Arquivo é enviado diretamente ao S3 via `PUT`
5. Backend retorna `resourceUrl` com a URL do **CloudFront**
6. Overlay é removido e o `src` da mídia é atualizado para a URL final

Sem `presignedUrlEndpoint`, o upload usa um mock que converte o arquivo para base64 — útil para desenvolvimento local.

Consulte [`docs/backend-integration.md`](./docs/backend-integration.md) para o contrato completo da API.

---

## Desenvolvimento local

```bash
npm run dev
```

Acesse `http://localhost:5173`.
