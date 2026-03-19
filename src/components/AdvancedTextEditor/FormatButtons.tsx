import { Editor } from '@tiptap/react'
import ToolbarIcon from './ToolbarIcon'
import Tooltip from './Tooltip'
import iconBold from '../../header-icons/icon-bold.svg'
import iconItalic from '../../header-icons/icon-italic.svg'
import iconUnderline from '../../header-icons/icon-underline.svg'
import iconClearText from '../../header-icons/icon-clear-text.svg'
import iconClearAll from '../../header-icons/icon-clear-all.svg'

interface FormatButtonsProps {
  editor: Editor
}

export default function FormatButtons({ editor }: FormatButtonsProps) {
  return (
    <>
      <Tooltip title="Negrito">
        <button
          className={`toolbar-button${editor.isActive('bold') ? ' is-active' : ''}`}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          <ToolbarIcon src={iconBold} alt="Negrito" />
        </button>
      </Tooltip>
      <Tooltip title="Itálico">
        <button
          className={`toolbar-button${editor.isActive('italic') ? ' is-active' : ''}`}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <ToolbarIcon src={iconItalic} alt="Itálico" />
        </button>
      </Tooltip>
      <Tooltip title="Sublinhado">
        <button
          className={`toolbar-button${editor.isActive('underline') ? ' is-active' : ''}`}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
        >
          <ToolbarIcon src={iconUnderline} alt="Sublinhado" />
        </button>
      </Tooltip>
      <Tooltip title="Limpar formatação">
        <button
          className="toolbar-button"
          onClick={() => editor.chain().focus().unsetAllMarks().run()}
        >
          <ToolbarIcon src={iconClearText} alt="Limpar formatação do texto" />
        </button>
      </Tooltip>
      <Tooltip title="Limpar tudo">
        <button
          className="toolbar-button"
          onClick={() => editor.chain().focus().clearNodes().unsetAllMarks().run()}
        >
          <ToolbarIcon src={iconClearAll} alt="Limpar toda formatação" />
        </button>
      </Tooltip>
    </>
  )
}
