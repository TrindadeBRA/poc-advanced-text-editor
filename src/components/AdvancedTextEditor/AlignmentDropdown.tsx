import { Editor } from '@tiptap/react'

interface AlignmentDropdownProps {
  editor: Editor
}

const ALIGNMENT_OPTIONS = [
  { value: 'left', label: '≡ Esquerda' },
  { value: 'center', label: '≡ Centro' },
  { value: 'right', label: '≡ Direita' },
  { value: 'justify', label: '≡ Justificado' },
]

export default function AlignmentDropdown({ editor }: AlignmentDropdownProps) {
  const currentAlign =
    ALIGNMENT_OPTIONS.find(opt => editor.isActive({ textAlign: opt.value }))?.value ?? 'left'

  return (
    <select
      className="toolbar-select"
      value={currentAlign}
      onChange={e => editor.chain().focus().setTextAlign(e.target.value).run()}
    >
      {ALIGNMENT_OPTIONS.map(opt => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  )
}
