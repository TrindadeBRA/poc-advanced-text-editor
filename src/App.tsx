import { useState } from 'react'
import AdvancedTextEditor from './components/AdvancedTextEditor/AdvancedTextEditor'

const BLOCK_TAGS = new Set(['P', 'DIV', 'LI', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'BLOCKQUOTE', 'BR'])

function extractText(node: Node): string {
  if (node.nodeType === Node.TEXT_NODE) return node.textContent ?? ''
  if (node.nodeType !== Node.ELEMENT_NODE) return ''

  const el = node as Element
  const tag = el.tagName

  if (tag === 'BR') return '\n'

  const inner = Array.from(el.childNodes).map(extractText).join('')

  if (BLOCK_TAGS.has(tag)) return inner + '\n'
  return inner
}

function stripHtml(html: string): string {
  const div = document.createElement('div')
  div.innerHTML = html
  return extractText(div).replace(/\n{3,}/g, '\n\n').trim()
}

export default function App() {
  const [content, setContent] = useState('')

  const textOutput = content ? stripHtml(content).trim() : ''

  return (
    <div style={{ maxWidth: '800px', margin: '40px auto', padding: '0 20px', fontFamily: 'sans-serif' }}>
      <AdvancedTextEditor
        placeholder="Escreva orientações para ajudar o aluno a organizar seus estudos."
        onChange={setContent}
      />
      {content && (
        <>
          <details style={{ marginTop: '24px' }}>
            <summary style={{ cursor: 'pointer', fontSize: '13px', color: '#666' }}>HTML output</summary>
            <pre style={{ fontSize: '12px', background: '#f5f5f5', padding: '12px', borderRadius: '4px', marginTop: '8px', whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
              {content}
            </pre>
          </details>
          <details style={{ marginTop: '12px' }}>
            <summary style={{ cursor: 'pointer', fontSize: '13px', color: '#666' }}>Text output</summary>
            <pre style={{ fontSize: '12px', background: '#f5f5f5', padding: '12px', borderRadius: '4px', marginTop: '8px', whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
              {textOutput}
            </pre>
          </details>
        </>
      )}
    </div>
  )
}
