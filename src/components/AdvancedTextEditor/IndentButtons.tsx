import { Editor } from '@tiptap/react'

interface IndentButtonsProps {
  editor: Editor
}

export default function IndentButtons({ editor }: IndentButtonsProps) {
  return (
    <>
      <button
        className="toolbar-button"
        onClick={() => editor.chain().focus().indent().run()}
      >
        →
      </button>
      <button
        className="toolbar-button"
        onClick={() => editor.chain().focus().outdent().run()}
      >
        ←
      </button>
    </>
  )
}
