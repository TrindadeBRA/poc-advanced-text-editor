import { Editor } from '@tiptap/react'

interface FontFamilyDropdownProps {
  editor: Editor
}

const FONT_FAMILIES = ['Graphik', 'Arial', 'Georgia', 'Times New Roman', 'Courier New', 'Verdana']

export default function FontFamilyDropdown({ editor }: FontFamilyDropdownProps) {
  const currentFamily =
    (editor.getAttributes('textStyle').fontFamily as string | undefined) ?? 'Graphik'

  return (
    <div className="toolbar-select-sizer">
      <span className="toolbar-select-sizer__label">{currentFamily}</span>
      <select
        className="toolbar-select-ghost"
        value={currentFamily}
        onChange={e => editor.chain().focus().setFontFamily(e.target.value).run()}
      >
        {FONT_FAMILIES.map(family => (
          <option key={family} value={family}>
            {family}
          </option>
        ))}
      </select>
    </div>
  )
}
