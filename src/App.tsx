import AdvancedTextEditor from './components/AdvancedTextEditor/AdvancedTextEditor'
import useEditorContent from './components/AdvancedTextEditor/useEditorContent'

export default function App() {
  const { htmlContent, textContent, handleChange } = useEditorContent()

  return (
    <div style={{ maxWidth: '800px', margin: '40px auto', padding: '0 20px', fontFamily: 'sans-serif' }}>
      <AdvancedTextEditor
        placeholder="Escreva orientações para ajudar o aluno a organizar seus estudos."
        onChange={handleChange}
      />
      {htmlContent && (
        <>
          <details style={{ marginTop: '24px' }}>
            <summary style={{ cursor: 'pointer', fontSize: '13px', color: '#666' }}>HTML output</summary>
            <pre style={{ fontSize: '12px', background: '#f5f5f5', padding: '12px', borderRadius: '4px', marginTop: '8px', whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
              {htmlContent}
            </pre>
          </details>
          <details style={{ marginTop: '12px' }}>
            <summary style={{ cursor: 'pointer', fontSize: '13px', color: '#666' }}>Text output</summary>
            <pre style={{ fontSize: '12px', background: '#f5f5f5', padding: '12px', borderRadius: '4px', marginTop: '8px', whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
              {textContent}
            </pre>
          </details>
        </>
      )}
    </div>
  )
}
