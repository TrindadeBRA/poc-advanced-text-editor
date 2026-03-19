import { useState, useCallback, useMemo } from 'react'

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

export default function useEditorContent() {
  const [htmlContent, setHtmlContent] = useState('')

  const handleChange = useCallback((html: string) => {
    setHtmlContent(html)
  }, [])

  const textContent = useMemo(() => {
    return htmlContent ? stripHtml(htmlContent) : ''
  }, [htmlContent])

  return { htmlContent, textContent, handleChange }
}
