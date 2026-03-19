import { Editor } from '@tiptap/react'
import ToolbarIcon from './ToolbarIcon'
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
      <button
        className={`toolbar-button${editor.isActive('bold') ? ' is-active' : ''}`}
        onClick={() => editor.chain().focus().toggleBold().run()}
      >
        <ToolbarIcon src={iconBold} alt="Negrito" />
      </button>
      <button
        className={`toolbar-button${editor.isActive('italic') ? ' is-active' : ''}`}
        onClick={() => editor.chain().focus().toggleItalic().run()}
      >
        <ToolbarIcon src={iconItalic} alt="Itálico" />
      </button>
      <button
        className={`toolbar-button${editor.isActive('underline') ? ' is-active' : ''}`}
        onClick={() => editor.chain().focus().toggleUnderline().run()}
      >
        <ToolbarIcon src={iconUnderline} alt="Sublinhado" />
      </button>
      <button
        className="toolbar-button"
        onClick={() => editor.chain().focus().unsetAllMarks().run()}
      >
        <ToolbarIcon src={iconClearText} alt="Limpar formatação do texto" />
      </button>
      <button
        className="toolbar-button"
        onClick={() => editor.chain().focus().clearNodes().unsetAllMarks().run()}
      >
        <ToolbarIcon src={iconClearAll} alt="Limpar toda formatação" />
      </button>
    </>
  )
}
