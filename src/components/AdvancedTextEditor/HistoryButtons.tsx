import { Editor } from '@tiptap/react'
import ToolbarIcon from './ToolbarIcon'
import iconUndo from '../../header-icons/icon-undo.svg'
import iconRedo from '../../header-icons/icon-redo.svg'

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
        <ToolbarIcon src={iconUndo} alt="Desfazer" />
      </button>
      <button
        className="toolbar-button"
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().redo()}
      >
        <ToolbarIcon src={iconRedo} alt="Refazer" />
      </button>
    </>
  )
}
