import { Editor } from '@tiptap/react'
import ToolbarIcon from './ToolbarIcon'
import Tooltip from './Tooltip'
import iconUndo from '../../header-icons/icon-undo.svg'
import iconRedo from '../../header-icons/icon-redo.svg'

interface HistoryButtonsProps {
  editor: Editor
}

export default function HistoryButtons({ editor }: HistoryButtonsProps) {
  return (
    <>
      <Tooltip title="Desfazer">
        <button
          className="toolbar-button"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
        >
          <ToolbarIcon src={iconUndo} alt="Desfazer" />
        </button>
      </Tooltip>
      <Tooltip title="Refazer">
        <button
          className="toolbar-button"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
        >
          <ToolbarIcon src={iconRedo} alt="Refazer" />
        </button>
      </Tooltip>
    </>
  )
}
