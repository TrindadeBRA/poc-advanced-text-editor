import { useEffect, useRef, useState } from 'react'
import { Editor } from '@tiptap/react'
import { createPortal } from 'react-dom'

interface AlignmentDropdownProps {
  editor: Editor
}

const AlignLeftIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h10.5m-10.5 5.25h16.5" />
  </svg>
)

const AlignCenterIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M6.75 12h10.5M3.75 17.25h16.5" />
  </svg>
)

const AlignRightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5m-6 5.25h6m-16.5 5.25h16.5" />
  </svg>
)

const AlignJustifyIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
  </svg>
)

const ChevronIcon = () => (
  <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1 1L5 5L9 1" stroke="#414650" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const ALIGNMENT_OPTIONS = [
  { value: 'left', label: 'Esquerda', Icon: AlignLeftIcon },
  { value: 'center', label: 'Centro', Icon: AlignCenterIcon },
  { value: 'right', label: 'Direita', Icon: AlignRightIcon },
  { value: 'justify', label: 'Justificado', Icon: AlignJustifyIcon },
]

export default function AlignmentDropdown({ editor }: AlignmentDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [menuPos, setMenuPos] = useState({ top: 0, left: 0 })
  const buttonRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  const currentAlign =
    ALIGNMENT_OPTIONS.find(opt => editor.isActive({ textAlign: opt.value })) ?? ALIGNMENT_OPTIONS[0]

  function handleOpen() {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect()
      setMenuPos({ top: rect.bottom + 4, left: rect.left })
    }
    setIsOpen(v => !v)
  }

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      const target = e.target as Node
      if (
        buttonRef.current && !buttonRef.current.contains(target) &&
        menuRef.current && !menuRef.current.contains(target)
      ) {
        setIsOpen(false)
      }
    }
    if (isOpen) document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen])

  return (
    <>
      <button
        ref={buttonRef}
        className="toolbar-button"
        onClick={handleOpen}
        style={{ display: 'inline-flex', alignItems: 'center', gap: 4, paddingInline: 4 }}
      >
        <currentAlign.Icon />
        <ChevronIcon />
      </button>
      {isOpen && createPortal(
        <div
          ref={menuRef}
          className="alignment-dropdown-menu"
          style={{ top: menuPos.top, left: menuPos.left }}
        >
          {ALIGNMENT_OPTIONS.map(({ value, label, Icon }) => (
            <button
              key={value}
              className={`alignment-dropdown-item${editor.isActive({ textAlign: value }) ? ' is-active' : ''}`}
              onClick={() => {
                editor.chain().focus().setTextAlign(value).run()
                setIsOpen(false)
              }}
            >
              <Icon />
              <span>{label}</span>
            </button>
          ))}
        </div>,
        document.body
      )}
    </>
  )
}
