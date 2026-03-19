import { useState } from 'react'
import { SourceViewProps } from './types'

export default function SourceView({ html, onSave, onCancel }: SourceViewProps) {
  const [value, setValue] = useState(html)

  return (
    <div style={{ padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: 8 }}>
      <textarea
        value={value}
        onChange={e => setValue(e.target.value)}
        style={{
          width: '100%',
          minHeight: 200,
          fontFamily: 'monospace',
          fontSize: 13,
          border: '1px solid #e0e0e0',
          borderRadius: 4,
          padding: 8,
          resize: 'vertical',
          boxSizing: 'border-box',
        }}
      />
      <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
        <button className="toolbar-button" onClick={() => onSave(value)}>Confirmar</button>
        <button className="toolbar-button" onClick={onCancel}>Cancelar</button>
      </div>
    </div>
  )
}
