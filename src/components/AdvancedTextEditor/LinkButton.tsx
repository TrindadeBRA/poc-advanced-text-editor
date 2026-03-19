import { useEffect, useRef, useState } from 'react'
import { Editor } from '@tiptap/react'
import LinkDialog from './LinkDialog'
import ToolbarIcon from './ToolbarIcon'
import iconLink from '../../header-icons/icon-link.svg'

interface LinkButtonProps {
  editor: Editor
}

export default function LinkButton({ editor }: LinkButtonProps) {
  const [isOpen, setIsOpen] = useState(false)
  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.ctrlKey && e.key === 'k') {
        e.preventDefault()
        setIsOpen(v => !v)
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen])

  return (
    <div ref={wrapperRef} style={{ position: 'relative' }}>
      <button
        className={`toolbar-button${editor.isActive('link') ? ' is-active' : ''}`}
        onClick={() => setIsOpen(v => !v)}
      >
        <ToolbarIcon src={iconLink} alt="Link" />
      </button>
      {isOpen && <LinkDialog editor={editor} onClose={() => setIsOpen(false)} />}
    </div>
  )
}
