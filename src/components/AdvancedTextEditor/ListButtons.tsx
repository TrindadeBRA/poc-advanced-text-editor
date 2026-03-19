import { Editor } from '@tiptap/react'
import ToolbarIcon from './ToolbarIcon'
import Tooltip from './Tooltip'
import iconListBullet from '../../header-icons/icon-list-bullet.svg'
import iconListOrdered from '../../header-icons/icon-list-ordered.svg'

interface ListButtonsProps {
  editor: Editor
}

export default function ListButtons({ editor }: ListButtonsProps) {
  return (
    <>
      <Tooltip title="Lista">
        <button
          className={`toolbar-button${editor.isActive('bulletList') ? ' is-active' : ''}`}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          <ToolbarIcon src={iconListBullet} alt="Lista" />
        </button>
      </Tooltip>
      <Tooltip title="Lista ordenada">
        <button
          className={`toolbar-button${editor.isActive('orderedList') ? ' is-active' : ''}`}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          <ToolbarIcon src={iconListOrdered} alt="Lista ordenada" />
        </button>
      </Tooltip>
    </>
  )
}
