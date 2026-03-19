# Documento de Requisitos

## Introdução

Este documento define os requisitos para uma Prova de Conceito (POC) de um Editor de Texto Avançado construído com a biblioteca Tiptap (https://tiptap.dev/). O editor será um campo de texto rico, opcional e expansível, com uma toolbar completa para formatação, inserção de mídia e controle de layout. O objetivo é validar a viabilidade técnica do Tiptap como framework de edição para futura integração em um produto maior.

## Glossário

- **Editor**: O componente principal de edição de texto rico baseado na biblioteca Tiptap
- **Toolbar**: A barra de ferramentas posicionada acima da área de edição, contendo botões e controles de formatação
- **Color_Picker**: O componente visual de seleção de cores utilizado para cor de texto e cor de fundo
- **Media_Uploader**: O módulo responsável por realizar upload de mídia (imagens e vídeos) utilizando URLs pré-assinadas do S3
- **Source_View**: O modo de visualização que exibe o código-fonte HTML do conteúdo do editor
- **Formatting_Engine**: O subsistema do Editor responsável por aplicar e remover formatações de texto
- **Alignment_Controller**: O subsistema do Editor responsável por gerenciar o alinhamento de parágrafos
- **List_Manager**: O subsistema do Editor responsável por gerenciar listas ordenadas e não-ordenadas
- **Indentation_Controller**: O subsistema do Editor responsável por gerenciar recuo de texto
- **URL_Pré-assinada**: Uma URL temporária gerada pelo backend que permite upload direto de arquivos para o Amazon S3

## Requisitos

### Requisito 1: Estrutura do Projeto

**User Story:** Como desenvolvedor, eu quero que o projeto seja configurado com React, TypeScript e Vite, para que eu tenha um ambiente de desenvolvimento moderno e performático.

#### Critérios de Aceitação

1. THE Editor SHALL be built as a React application using TypeScript and Vite as the build tool
2. THE Editor SHALL use the Tiptap library as the core rich text editing framework
3. THE Editor SHALL use Yarn 4.11.0 as the package manager

### Requisito 2: Campo de Texto Opcional e Expansível

**User Story:** Como usuário, eu quero que o editor seja um campo opcional e sem limite de tamanho, para que eu possa inserir conteúdo livremente.

#### Critérios de Aceitação

1. THE Editor SHALL function as an optional input field that does not require user input
2. THE Editor SHALL expand vertically based on the content inserted by the user
3. THE Editor SHALL impose no character limit on the content

### Requisito 3: Formatação de Texto Básica

**User Story:** Como usuário, eu quero aplicar formatações básicas ao texto, para que eu possa destacar e organizar o conteúdo visualmente.

#### Critérios de Aceitação

1. WHEN the user presses CTRL+B, THE Formatting_Engine SHALL toggle bold formatting on the selected text
2. WHEN the user presses CTRL+I, THE Formatting_Engine SHALL toggle italic formatting on the selected text
3. WHEN the user presses CTRL+U, THE Formatting_Engine SHALL toggle underline formatting on the selected text
4. WHEN the user clicks the strikethrough button in the Toolbar, THE Formatting_Engine SHALL toggle strikethrough formatting on the selected text
5. WHEN the user presses CTRL+\, THE Formatting_Engine SHALL remove all formatting from the selected text
6. WHEN the user clicks the "clear all formatting" button in the Toolbar, THE Formatting_Engine SHALL remove all formatting from the entire editor content

### Requisito 4: Alinhamento de Texto

**User Story:** Como usuário, eu quero alinhar o texto de diferentes formas, para que eu possa controlar o layout visual do conteúdo.

#### Critérios de Aceitação

1. WHEN the user presses CTRL+SHIFT+L, THE Alignment_Controller SHALL align the current paragraph to the left
2. WHEN the user presses CTRL+SHIFT+E, THE Alignment_Controller SHALL align the current paragraph to the center
3. WHEN the user presses CTRL+SHIFT+R, THE Alignment_Controller SHALL align the current paragraph to the right
4. WHEN the user presses CTRL+SHIFT+J, THE Alignment_Controller SHALL justify the current paragraph

### Requisito 5: Listas

**User Story:** Como usuário, eu quero criar listas ordenadas e não-ordenadas, para que eu possa organizar informações em formato de lista.

#### Critérios de Aceitação

1. WHEN the user presses CTRL+SHIFT+7, THE List_Manager SHALL toggle a bullet (unordered) list on the current selection
2. WHEN the user presses CTRL+SHIFT+8, THE List_Manager SHALL toggle a numbered (ordered) list on the current selection

### Requisito 6: Recuo de Texto

**User Story:** Como usuário, eu quero aumentar e diminuir o recuo do texto, para que eu possa criar hierarquias visuais no conteúdo.

#### Critérios de Aceitação

1. WHEN the user presses CTRL+], THE Indentation_Controller SHALL increase the indentation level of the current paragraph by one step
2. WHEN the user presses CTRL+[, THE Indentation_Controller SHALL decrease the indentation level of the current paragraph by one step


### Requisito 7: Tamanho de Fonte

**User Story:** Como usuário, eu quero selecionar diferentes tamanhos de fonte, para que eu possa variar a hierarquia visual do texto.

#### Critérios de Aceitação

1. THE Toolbar SHALL display a font size selector with the following options: 8, 9, 10, 11, 12, 14, 18, 24, 36
2. WHEN the user selects a font size from the selector, THE Formatting_Engine SHALL apply the selected font size to the current selection or to the text digitado a partir do cursor

### Requisito 8: Espaçamento entre Linhas

**User Story:** Como usuário, eu quero ajustar o espaçamento entre linhas, para que eu possa melhorar a legibilidade do conteúdo.

#### Critérios de Aceitação

1. THE Toolbar SHALL display a line spacing selector with the following options: 1.0, 1.2, 1.4, 1.5, 1.6, 1.8, 2.0, 3.0
2. WHEN the user selects a line spacing value from the selector, THE Formatting_Engine SHALL apply the selected line spacing to the current paragraph

### Requisito 9: Cor do Texto e Cor de Fundo

**User Story:** Como usuário, eu quero alterar a cor do texto e a cor de fundo, para que eu possa destacar partes específicas do conteúdo.

#### Critérios de Aceitação

1. WHEN the user clicks the text color button in the Toolbar, THE Color_Picker SHALL display a visual color picker for text color selection
2. WHEN the user selects a color from the text Color_Picker, THE Formatting_Engine SHALL apply the selected color to the current text selection
3. WHEN the user clicks the background color button in the Toolbar, THE Color_Picker SHALL display a visual color picker for background color selection
4. WHEN the user selects a color from the background Color_Picker, THE Formatting_Engine SHALL apply the selected background color to the current text selection

### Requisito 10: Inserção de Links

**User Story:** Como usuário, eu quero inserir links no texto, para que eu possa referenciar recursos externos.

#### Critérios de Aceitação

1. WHEN the user presses CTRL+K, THE Editor SHALL display a dialog for link URL input
2. WHEN the user confirms a valid URL in the link dialog, THE Editor SHALL apply the link to the selected text
3. WHEN the user clicks an existing link in the Editor, THE Editor SHALL display options to edit or remove the link

### Requisito 11: Inserção de Imagens

**User Story:** Como usuário, eu quero inserir imagens no editor, para que eu possa enriquecer o conteúdo com mídia visual.

#### Critérios de Aceitação

1. WHEN the user clicks the image button in the Toolbar, THE Editor SHALL display a dialog for image upload
2. WHEN the user selects an image file for upload, THE Media_Uploader SHALL request a pre-signed S3 URL from the backend
3. WHEN the Media_Uploader receives a valid pre-signed URL, THE Media_Uploader SHALL upload the image file directly to S3 using the pre-signed URL
4. WHEN the image upload completes successfully, THE Editor SHALL insert the uploaded image at the current cursor position
5. IF the image upload fails, THEN THE Editor SHALL display an error message to the user

### Requisito 12: Inserção de Vídeos

**User Story:** Como usuário, eu quero inserir vídeos no editor, para que eu possa incluir conteúdo multimídia.

#### Critérios de Aceitação

1. WHEN the user clicks the video button in the Toolbar, THE Editor SHALL display a dialog for video upload
2. WHEN the user selects a video file for upload, THE Media_Uploader SHALL request a pre-signed S3 URL from the backend
3. WHEN the Media_Uploader receives a valid pre-signed URL, THE Media_Uploader SHALL upload the video file directly to S3 using the pre-signed URL
4. WHEN the video upload completes successfully, THE Editor SHALL insert the uploaded video at the current cursor position
5. IF the video upload fails, THEN THE Editor SHALL display an error message to the user

### Requisito 13: Visualização de Código-Fonte

**User Story:** Como usuário, eu quero visualizar e editar o código-fonte HTML do conteúdo, para que eu possa fazer ajustes finos na formatação.

#### Critérios de Aceitação

1. WHEN the user clicks the source code button in the Toolbar, THE Source_View SHALL display the raw HTML content of the Editor
2. WHEN the user edits the HTML in the Source_View and confirms, THE Editor SHALL update the rich text content to reflect the HTML changes
3. WHEN the user exits the Source_View, THE Editor SHALL return to the rich text editing mode

### Requisito 14: Desfazer e Refazer

**User Story:** Como usuário, eu quero desfazer e refazer ações, para que eu possa corrigir erros facilmente.

#### Critérios de Aceitação

1. WHEN the user presses CTRL+Z, THE Editor SHALL undo the last action performed
2. WHEN the user presses CTRL+Y, THE Editor SHALL redo the last undone action
3. WHEN no actions are available to undo, THE Toolbar SHALL display the undo button in a disabled state
4. WHEN no actions are available to redo, THE Toolbar SHALL display the redo button in a disabled state

### Requisito 15: Toolbar

**User Story:** Como usuário, eu quero uma barra de ferramentas completa e organizada, para que eu possa acessar todas as funcionalidades de formatação visualmente.

#### Critérios de Aceitação

1. THE Toolbar SHALL display buttons for: Bold, Italic, Underline, Strikethrough, Clear formatting, Text alignment, Bullet list, Ordered list, Font size, Line spacing, Text color, Background color, Emoji picker, Link, Image, Video, Source code, Indent, Outdent, Undo, Redo
2. WHILE a formatting option is active on the current selection, THE Toolbar SHALL visually indicate the active state of the corresponding button
3. THE Toolbar SHALL remain fixed above the editor content area at all times

### Requisito 16: Seletor de Emoji

**User Story:** Como usuário, eu quero inserir emojis no texto, para que eu possa adicionar expressividade ao conteúdo.

#### Critérios de Aceitação

1. WHEN the user clicks the emoji button in the Toolbar, THE Editor SHALL display an emoji picker panel
2. WHEN the user selects an emoji from the picker, THE Editor SHALL insert the selected emoji at the current cursor position
3. WHEN the user clicks outside the emoji picker, THE Editor SHALL close the emoji picker panel

### Requisito 17: Organização do Código

**User Story:** Como desenvolvedor, eu quero que o código seja bem organizado e modular, para que a futura integração em outros projetos seja facilitada.

#### Critérios de Aceitação

1. THE Editor SHALL be implemented as a self-contained React component that can be imported and used independently
2. THE Editor SHALL separate Toolbar components, editor logic, and media upload logic into distinct modules
3. THE Editor SHALL expose props for configuration, including an optional callback for content changes

### Requisito 18: Família de Fonte

**User Story:** Como usuário, eu quero selecionar diferentes famílias de fonte, para que eu possa personalizar a aparência do texto.

#### Critérios de Aceitação

1. THE Toolbar SHALL display a font family selector with at least the "Graphik" font option
2. WHEN the user selects a font family from the selector, THE Formatting_Engine SHALL apply the selected font family to the current selection
