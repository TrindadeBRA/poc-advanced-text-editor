import { Editor } from '@tiptap/react'

interface FontSizeDropdownProps {
  editor: Editor
}

const FONT_SIZES = ['8', '9', '10', '11', '12', '14', '18', '24', '36']

export default function FontSizeDropdown({ editor }: FontSizeDropdownProps) {
  const rawSize = editor.getAttributes('textStyle').fontSize as string | undefined
  const currentSize = rawSize ? rawSize.replace('px', '') : '14'

  return (
    <select
      className="toolbar-select"
      value={currentSize}
      onChange={e => editor.chain().focus().setFontSize(e.target.value + 'px').run()}
    >
      {FONT_SIZES.map(size => (
        <option key={size} value={size}>
          {size}
        </option>
      ))}
    </select>
  )
}
