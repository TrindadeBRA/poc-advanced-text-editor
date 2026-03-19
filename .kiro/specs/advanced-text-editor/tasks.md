# Plano de Implementação: Editor de Texto Avançado

## Visão Geral

Implementação incremental de um editor de texto rico baseado no Tiptap, como componente React autônomo com TypeScript e Vite. O plano segue a ordem: setup do projeto → extensões customizadas → componentes da toolbar → upload de mídia → source view → integração final.

## Tarefas

- [ ] 1. Setup do projeto e dependências
  - [ ] 1.1 Configurar projeto React + TypeScript + Vite
    - Inicializar o projeto com Vite template react-ts
    - Instalar dependências: `@tiptap/react`, `@tiptap/pm`, `@tiptap/starter-kit`, `@tiptap/extension-underline`, `@tiptap/extension-text-align`, `@tiptap/extension-text-style`, `@tiptap/extension-color`, `@tiptap/extension-highlight`, `@tiptap/extension-font-family`, `@tiptap/extension-link`, `@tiptap/extension-image`, `@tiptap/extension-placeholder`
    - Instalar dependências de dev: `vitest`, `fast-check`, `@testing-library/react`, `@testing-library/jest-dom`, `jsdom`
    - Configurar `vitest.config.ts` com environment jsdom
    - Criar `src/main.tsx` e `src/App.tsx` com renderização básica
    - Criar estrutura de diretórios: `src/components/AdvancedTextEditor/`, `src/extensions/`, `src/hooks/`, `src/services/`
    - _Requisitos: 1.1, 1.2, 1.3_

  - [ ] 1.2 Criar tipos compartilhados e interfaces
    - Criar `src/components/AdvancedTextEditor/types.ts` com `AdvancedTextEditorProps`, `ToolbarProps`, `SourceViewProps`
    - Criar interfaces de configuração: `FontSizeConfig`, `LineSpacingConfig`, `IndentConfig`, `FontFamilyConfig`
    - Criar interfaces de mídia: `PresignedUrlRequest`, `PresignedUrlResponse`, `UploadState`
    - _Requisitos: 17.1, 17.3_

- [ ] 2. Extensões customizadas do Tiptap
  - [ ] 2.1 Implementar extensão FontSize
    - Criar `src/extensions/FontSize.ts` como extensão que estende TextStyle
    - Implementar comando `setFontSize(size: string)` que aplica `font-size` como atributo de estilo inline
    - Implementar `unsetFontSize()` para remoção
    - _Requisitos: 7.2_

  - [ ] 2.2 Implementar extensão LineSpacing
    - Criar `src/extensions/LineSpacing.ts` como extensão de nó em parágrafos
    - Implementar comando `setLineSpacing(value: string)` que aplica `line-height` no elemento `<p>`
    - _Requisitos: 8.2_

  - [ ] 2.3 Implementar extensão Indent
    - Criar `src/extensions/Indent.ts` como extensão de nó em parágrafos
    - Implementar comandos `indent()` e `outdent()` com incremento/decremento de 40px em `margin-left`
    - Garantir que `margin-left` nunca fique negativo (mínimo 0px)
    - _Requisitos: 6.1, 6.2_

  - [ ] 2.4 Implementar extensão Video
    - Criar `src/extensions/Video.ts` como extensão de nó
    - Definir atributos: `src`, `controls` (default true), `width` (default "100%")
    - Renderizar como `<video src="..." controls width="100%"></video>`
    - _Requisitos: 12.4_

  - [ ]* 2.5 Testes de propriedade para extensões customizadas
    - **Propriedade 5: Indent e outdent são operações inversas**
    - **Valida: Requisitos 6.1, 6.2**

  - [ ]* 2.6 Teste de propriedade: outdent no nível zero
    - **Propriedade 6: Outdent no nível zero é idempotente**
    - **Valida: Requisito 6.2**

  - [ ]* 2.7 Teste de propriedade: atributos de estilo
    - **Propriedade 7: Atributos de estilo de texto são aplicados corretamente**
    - **Valida: Requisitos 7.2, 8.2, 18.2**

- [ ] 3. Componente principal do editor
  - [ ] 3.1 Implementar AdvancedTextEditor
    - Criar `src/components/AdvancedTextEditor/AdvancedTextEditor.tsx`
    - Instanciar `useEditor` com todas as extensões (StarterKit, Underline, TextAlign, TextStyle, Color, Highlight, FontFamily, Link, Image, Placeholder, FontSize, LineSpacing, Indent, Video)
    - Configurar StarterKit desabilitando extensões não necessárias
    - Gerenciar estado `isSourceView` para alternância rich text / source code
    - Invocar callback `onChange` com HTML atualizado a cada mudança de conteúdo
    - Exportar como `export default`
    - _Requisitos: 2.1, 2.2, 2.3, 17.1, 17.2, 17.3_

  - [ ] 3.2 Criar estilos base do editor
    - Criar `src/components/AdvancedTextEditor/AdvancedTextEditor.css`
    - Estilizar área de edição com expansão vertical automática
    - Estilizar toolbar fixa acima do conteúdo
    - _Requisitos: 2.2, 15.3_

  - [ ]* 3.3 Teste de propriedade: onChange callback
    - **Propriedade 17: Callback onChange é invocado com HTML atualizado**
    - **Valida: Requisito 17.3**

  - [ ]* 3.4 Teste de propriedade: conteúdo de tamanho arbitrário
    - **Propriedade 18: Editor aceita conteúdo de tamanho arbitrário**
    - **Valida: Requisito 2.3**

- [ ] 4. Checkpoint — Verificar base do editor
  - Garantir que o editor renderiza corretamente com todas as extensões carregadas. Executar testes existentes. Perguntar ao usuário se há dúvidas.

- [ ] 5. Componentes de formatação da Toolbar
  - [ ] 5.1 Implementar Toolbar
    - Criar `src/components/AdvancedTextEditor/Toolbar.tsx`
    - Receber `editor`, `onToggleSource`, `isSourceView`, `presignedUrlEndpoint` como props
    - Renderizar todos os grupos de botões como sub-componentes
    - Manter toolbar fixa acima da área de edição
    - _Requisitos: 15.1, 15.2, 15.3_

  - [ ] 5.2 Implementar FormatButtons
    - Criar `src/components/AdvancedTextEditor/FormatButtons.tsx`
    - Botões: Bold, Italic, Underline, Strikethrough, Clear formatting
    - Usar `editor.chain().toggleBold().run()` etc. para cada ação
    - Usar `editor.isActive('bold')` etc. para estado ativo visual
    - Atalhos: CTRL+B, CTRL+I, CTRL+U, CTRL+\ (já nativos do Tiptap/StarterKit)
    - _Requisitos: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 15.2_

  - [ ]* 5.3 Testes de propriedade: formatação
    - **Propriedade 1: Toggle de formatação é involutivo**
    - **Valida: Requisitos 3.1, 3.2, 3.3, 3.4**

  - [ ]* 5.4 Teste de propriedade: limpar formatação
    - **Propriedade 2: Limpar formatação remove todas as marcas**
    - **Valida: Requisitos 3.5, 3.6**

  - [ ] 5.5 Implementar AlignmentDropdown
    - Criar `src/components/AdvancedTextEditor/AlignmentDropdown.tsx`
    - Opções: left, center, right, justify
    - Atalhos: CTRL+SHIFT+L/E/R/J
    - Refletir alinhamento ativo no dropdown
    - _Requisitos: 4.1, 4.2, 4.3, 4.4_

  - [ ]* 5.6 Teste de propriedade: alinhamento
    - **Propriedade 3: Alinhamento aplicado é refletido no parágrafo**
    - **Valida: Requisitos 4.1, 4.2, 4.3, 4.4**

  - [ ] 5.7 Implementar ListButtons
    - Criar `src/components/AdvancedTextEditor/ListButtons.tsx`
    - Botões: Bullet list (CTRL+SHIFT+7), Ordered list (CTRL+SHIFT+8)
    - Refletir estado ativo
    - _Requisitos: 5.1, 5.2_

  - [ ]* 5.8 Teste de propriedade: listas
    - **Propriedade 4: Toggle de lista é involutivo**
    - **Valida: Requisitos 5.1, 5.2**

  - [ ] 5.9 Implementar IndentButtons
    - Criar `src/components/AdvancedTextEditor/IndentButtons.tsx`
    - Botões: Indent (CTRL+]), Outdent (CTRL+[)
    - _Requisitos: 6.1, 6.2_

  - [ ] 5.10 Implementar FontSizeDropdown
    - Criar `src/components/AdvancedTextEditor/FontSizeDropdown.tsx`
    - Opções: 8, 9, 10, 11, 12, 14, 18, 24, 36
    - Refletir tamanho atual da seleção
    - _Requisitos: 7.1, 7.2_

  - [ ] 5.11 Implementar FontFamilyDropdown
    - Criar `src/components/AdvancedTextEditor/FontFamilyDropdown.tsx`
    - Incluir pelo menos a opção "Graphik"
    - Refletir família atual da seleção
    - _Requisitos: 18.1, 18.2_

  - [ ] 5.12 Implementar LineSpacingDropdown
    - Criar `src/components/AdvancedTextEditor/LineSpacingDropdown.tsx`
    - Opções: 1.0, 1.2, 1.4, 1.5, 1.6, 1.8, 2.0, 3.0
    - _Requisitos: 8.1, 8.2_

  - [ ] 5.13 Implementar ColorPickerButton
    - Criar `src/components/AdvancedTextEditor/ColorPickerButton.tsx`
    - Dois modos: cor de texto e cor de fundo
    - Exibir color picker visual ao clicar
    - Aplicar cor via `editor.chain().setColor()` ou `editor.chain().toggleHighlight()`
    - _Requisitos: 9.1, 9.2, 9.3, 9.4_

  - [ ]* 5.14 Teste de propriedade: cores
    - **Propriedade 8: Cores são aplicadas ao texto**
    - **Valida: Requisitos 9.2, 9.4**

  - [ ]* 5.15 Teste de propriedade: estado ativo da toolbar
    - **Propriedade 15: Estado ativo da toolbar reflete formatação**
    - **Valida: Requisito 15.2**

  - [ ] 5.16 Implementar HistoryButtons
    - Criar `src/components/AdvancedTextEditor/HistoryButtons.tsx`
    - Botões: Undo (CTRL+Z), Redo (CTRL+Y)
    - Desabilitar quando não há ações disponíveis
    - _Requisitos: 14.1, 14.2, 14.3, 14.4_

  - [ ]* 5.17 Teste de propriedade: undo/redo
    - **Propriedade 14: Undo/Redo é round-trip**
    - **Valida: Requisitos 14.1, 14.2**

- [ ] 6. Checkpoint — Verificar toolbar completa
  - Garantir que todos os botões da toolbar estão funcionais e refletem estado ativo. Executar testes existentes. Perguntar ao usuário se há dúvidas.

- [ ] 7. Link e Emoji
  - [ ] 7.1 Implementar LinkButton e LinkDialog
    - Criar `src/components/AdvancedTextEditor/LinkButton.tsx`
    - Criar `src/components/AdvancedTextEditor/LinkDialog.tsx`
    - Abrir dialog com CTRL+K
    - Permitir inserir, editar e remover links
    - _Requisitos: 10.1, 10.2, 10.3_

  - [ ]* 7.2 Teste de propriedade: link preserva URL
    - **Propriedade 9: Link aplicado preserva URL**
    - **Valida: Requisito 10.2**

  - [ ] 7.3 Implementar EmojiPickerButton
    - Criar `src/components/AdvancedTextEditor/EmojiPickerButton.tsx`
    - Exibir painel de emojis ao clicar
    - Inserir emoji selecionado na posição do cursor
    - Fechar picker ao clicar fora
    - _Requisitos: 16.1, 16.2, 16.3_

  - [ ]* 7.4 Teste de propriedade: emoji inserido
    - **Propriedade 16: Emoji inserido aparece no conteúdo**
    - **Valida: Requisito 16.2**

- [ ] 8. Upload de mídia
  - [ ] 8.1 Implementar mediaService
    - Criar `src/services/mediaService.ts`
    - Função para solicitar URL pré-assinada: `POST` ao endpoint com `{ fileName, contentType, mediaType }`
    - Função para fazer upload via `PUT` na URL pré-assinada
    - _Requisitos: 11.2, 11.3, 12.2, 12.3_

  - [ ] 8.2 Implementar hook useMediaUpload
    - Criar `src/hooks/useMediaUpload.ts`
    - Gerenciar estados: `isUploading`, `progress`, `error`
    - Orquestrar fluxo: solicitar URL → upload para S3 → retornar resourceUrl
    - Tratar erros de rede e timeout
    - _Requisitos: 11.2, 11.3, 11.5, 12.2, 12.3, 12.5_

  - [ ]* 8.3 Testes de propriedade: upload de mídia
    - **Propriedade 10: Upload de mídia solicita URL pré-assinada**
    - **Valida: Requisitos 11.2, 12.2**

  - [ ]* 8.4 Teste de propriedade: upload para S3
    - **Propriedade 11: Upload de mídia envia arquivo para S3**
    - **Valida: Requisitos 11.3, 12.3**

  - [ ] 8.5 Implementar MediaButtons e MediaUploadDialog
    - Criar `src/components/AdvancedTextEditor/MediaButtons.tsx`
    - Criar `src/components/AdvancedTextEditor/MediaUploadDialog.tsx`
    - Dialog para upload de imagem e vídeo
    - Usar `useMediaUpload` para fluxo de upload
    - Inserir mídia no editor após upload bem-sucedido
    - Exibir mensagem de erro em caso de falha
    - _Requisitos: 11.1, 11.4, 11.5, 12.1, 12.4, 12.5_

  - [ ]* 8.6 Teste de propriedade: mídia inserida após upload
    - **Propriedade 12: Mídia inserida após upload bem-sucedido**
    - **Valida: Requisitos 11.4, 12.4**

- [ ] 9. Source View
  - [ ] 9.1 Implementar SourceView e SourceCodeButton
    - Criar `src/components/AdvancedTextEditor/SourceView.tsx` com textarea para HTML bruto
    - Criar `src/components/AdvancedTextEditor/SourceCodeButton.tsx` para toggle
    - Ao confirmar, atualizar conteúdo do editor via `editor.commands.setContent()`
    - Ao cancelar, retornar ao modo rich text sem alterações
    - _Requisitos: 13.1, 13.2, 13.3_

  - [ ]* 9.2 Teste de propriedade: round-trip do Source View
    - **Propriedade 13: Round-trip do Source View**
    - **Valida: Requisitos 13.1, 13.2**

- [ ] 10. Integração e wiring final
  - [ ] 10.1 Integrar todos os componentes no AdvancedTextEditor
    - Garantir que Toolbar renderiza todos os sub-componentes na ordem correta
    - Conectar SourceView com toggle do editor
    - Conectar MediaButtons com presignedUrlEndpoint via props
    - Verificar que todos os atalhos de teclado funcionam
    - _Requisitos: 15.1, 17.1, 17.2_

  - [ ] 10.2 Criar App.tsx de demonstração
    - Renderizar AdvancedTextEditor com props de exemplo
    - Incluir `onChange` que loga o HTML no console
    - Configurar `presignedUrlEndpoint` com URL placeholder
    - _Requisitos: 17.1_

  - [ ]* 10.3 Testes unitários de integração
    - Verificar renderização completa do editor com todos os botões da toolbar
    - Verificar estado inicial: editor vazio, undo/redo desabilitados
    - Verificar transição source view ida e volta
    - _Requisitos: 14.3, 14.4, 15.1_

- [ ] 11. Checkpoint final
  - Executar todos os testes. Garantir que o editor funciona como componente autônomo. Perguntar ao usuário se há dúvidas.

## Notas

- Tarefas marcadas com `*` são opcionais e podem ser puladas para um MVP mais rápido
- Cada tarefa referencia requisitos específicos para rastreabilidade
- Checkpoints garantem validação incremental
- Testes de propriedade validam propriedades universais de corretude
- Testes unitários validam exemplos específicos e edge cases
- Todas as extensões customizadas devem ser implementadas antes dos componentes de toolbar que as utilizam
