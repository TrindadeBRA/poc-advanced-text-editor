import { Editor } from '@tiptap/react'

export interface VariableDefinition {
  name: string
  label?: string
}

interface VariableBarProps {
  editor: Editor | null
  variables: VariableDefinition[]
}

export default function VariableBar({ editor, variables }: VariableBarProps) {
  if (!editor || variables.length === 0) return null

  const handleInsert = (variable: VariableDefinition) => {
    editor.chain().focus().insertVariable(variable.name).run()
  }

  return (
    <div className="variable-bar">
      <span className="variable-bar__title">Variáveis:</span>
      {variables.map((variable, index) => (
        <span key={variable.name} style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
          {index > 0 && <span className="variable-bar__separator">-</span>}
          <button
            type="button"
            className="variable-bar__item"
            onClick={() => handleInsert(variable)}
          >
            {variable.label ?? variable.name}
          </button>
        </span>
      ))}
    </div>
  )
}
