import { Editor } from '@tiptap/react'

interface LineSpacingDropdownProps {
  editor: Editor
}

const LINE_SPACING_VALUES = ['1.0', '1.2', '1.4', '1.5', '1.6', '1.8', '2.0', '3.0']

export default function LineSpacingDropdown({ editor }: LineSpacingDropdownProps) {
  const currentSpacing =
    (editor.getAttributes('paragraph').lineHeight as string | undefined) ?? '1.5'

  return (
    <select
      className="toolbar-select"
      value={currentSpacing}
      onChange={e => editor.chain().focus().setLineSpacing(e.target.value).run()}
    >
      {LINE_SPACING_VALUES.map(value => (
        <option key={value} value={value}>
          {value}
        </option>
      ))}
    </select>
  )
}
