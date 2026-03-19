import { Editor } from '@tiptap/react'

interface ListButtonsProps {
  editor: Editor
}

export default function ListButtons({ editor }: ListButtonsProps) {
  return (
    <>
      <button
        className={`toolbar-button${editor.isActive('bulletList') ? ' is-active' : ''}`}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
      >
        ≔
      </button>
      <button
        className={`toolbar-button${editor.isActive('orderedList') ? ' is-active' : ''}`}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
      >
        1.
      </button>
    </>
  )
}
