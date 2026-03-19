import { useState, useCallback, useMemo } from 'react'
import htmlToText from './htmlToText'

interface UseEditorContentOptions {
  initialContent?: string
  onChange?: (html: string) => void
}

export default function useEditorContent(options: UseEditorContentOptions = {}) {
  const [htmlContent, setHtmlContent] = useState(options.initialContent ?? '')

  const handleChange = useCallback((html: string) => {
    setHtmlContent(html)
    options.onChange?.(html)
  }, [options.onChange])

  const textContent = useMemo(() => htmlToText(htmlContent), [htmlContent])

  const isEmpty = useMemo(() => {
    if (!htmlContent) return true
    return htmlContent === '<p></p>' || !htmlToText(htmlContent)
  }, [htmlContent])

  return { htmlContent, textContent, isEmpty, handleChange }
}
