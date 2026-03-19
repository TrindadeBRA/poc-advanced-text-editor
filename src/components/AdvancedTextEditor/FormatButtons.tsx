import { Editor } from '@tiptap/react'

interface FormatButtonsProps {
  editor: Editor
}

export default function FormatButtons({ editor }: FormatButtonsProps) {
  return (
    <>
      <button
        className={`toolbar-button${editor.isActive('bold') ? ' is-active' : ''}`}
        onClick={() => editor.chain().focus().toggleBold().run()}
      >
        <strong>B</strong>
      </button>
      <button
        className={`toolbar-button${editor.isActive('italic') ? ' is-active' : ''}`}
        onClick={() => editor.chain().focus().toggleItalic().run()}
      >
        <em>I</em>
      </button>
      <button
        className={`toolbar-button${editor.isActive('underline') ? ' is-active' : ''}`}
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        style={{ textDecoration: 'underline' }}
      >
        U
      </button>
      <button
        className={`toolbar-button${editor.isActive('strike') ? ' is-active' : ''}`}
        onClick={() => editor.chain().focus().toggleStrike().run()}
        style={{ textDecoration: 'line-through' }}
      >
        S
      </button>
      <button
        className="toolbar-button"
        onClick={() => editor.chain().focus().clearNodes().unsetAllMarks().run()}
        title="Clear formatting"
      >
        🧹
      </button>
    </>
  )
}
