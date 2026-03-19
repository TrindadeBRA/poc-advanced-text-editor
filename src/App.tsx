import { useState } from 'react'
import AdvancedTextEditor from './components/AdvancedTextEditor/AdvancedTextEditor'

export default function App() {
  const [content, setContent] = useState('')

  return (
    <div style={{ maxWidth: '800px', margin: '40px auto', padding: '0 20px', fontFamily: 'sans-serif' }}>
      <AdvancedTextEditor
        placeholder="Escreva orientações para ajudar o aluno a organizar seus estudos."
        onChange={setContent}
      />
      {content && (
        <details style={{ marginTop: '24px' }}>
          <summary style={{ cursor: 'pointer', fontSize: '13px', color: '#666' }}>HTML output</summary>
          <pre style={{ fontSize: '12px', background: '#f5f5f5', padding: '12px', borderRadius: '4px', overflow: 'auto', marginTop: '8px' }}>
            {content}
          </pre>
        </details>
      )}
    </div>
  )
}
