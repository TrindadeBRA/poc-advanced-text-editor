import { Editor } from '@tiptap/react'

interface HistoryButtonsProps {
  editor: Editor
}

export default function HistoryButtons({ editor }: HistoryButtonsProps) {
  return (
    <>
      <button
        className="toolbar-button"
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().undo()}
      >
        ↩
      </button>
      <button
        className="toolbar-button"
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().redo()}
      >
        ↪
      </button>
    </>
  )
}
