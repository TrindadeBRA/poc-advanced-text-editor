import { useRef } from 'react'
import AdvancedTextEditor from './components/AdvancedTextEditor/AdvancedTextEditor'
import { AdvancedTextEditorRef } from './components/AdvancedTextEditor/types'
import useEditorContent from './components/AdvancedTextEditor/useEditorContent'
import useSampleContent from './hooks/useSampleContent'

export default function App() {
  const editorRef = useRef<AdvancedTextEditorRef>(null)
  const { htmlContent, textContent, handleChange } = useEditorContent()
  const { injectSample } = useSampleContent(editorRef, handleChange)

  return (
    <div style={{ maxWidth: '800px', margin: '40px auto', padding: '0 20px', fontFamily: 'sans-serif' }}>
      <AdvancedTextEditor
        ref={editorRef}
        placeholder="Escreva orientações para ajudar o aluno a organizar seus estudos."
        onChange={handleChange}
        variables={[
          { name: 'NOME_CURSO' },
          { name: 'DATA_ENCERRAMENTO' },
        ]}
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
      <button
        onClick={injectSample}
        style={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          background: '#1a1a1a',
          color: '#fff',
          border: 'none',
          borderRadius: 8,
          padding: '12px 20px',
          fontSize: 14,
          fontWeight: 500,
          cursor: 'pointer',
          boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
          zIndex: 9999,
        }}
      >
        Injetar Lorem Ipsum
      </button>
    </div>
  )
}
