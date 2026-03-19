import { Editor } from '@tiptap/react'

interface FontFamilyDropdownProps {
  editor: Editor
}

const FONT_FAMILIES = ['Graphik', 'Arial', 'Georgia', 'Times New Roman', 'Courier New', 'Verdana']

export default function FontFamilyDropdown({ editor }: FontFamilyDropdownProps) {
  const currentFamily =
    (editor.getAttributes('textStyle').fontFamily as string | undefined) ?? 'Graphik'

  return (
    <select
      className="toolbar-select"
      value={currentFamily}
      onChange={e => editor.chain().focus().setFontFamily(e.target.value).run()}
    >
      {FONT_FAMILIES.map(family => (
        <option key={family} value={family}>
          {family}
        </option>
      ))}
    </select>
  )
}
