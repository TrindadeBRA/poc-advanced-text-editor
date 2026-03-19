import { useEffect, useRef, useState } from 'react'
import { Editor } from '@tiptap/react'
import { Selection } from '@tiptap/pm/state'
import LinkDialog from './LinkDialog'
import ToolbarIcon from './ToolbarIcon'
import Tooltip from './Tooltip'
import iconLink from '../../header-icons/icon-link.svg'

interface LinkButtonProps {
  editor: Editor
}

export default function LinkButton({ editor }: LinkButtonProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [savedSelection, setSavedSelection] = useState<Selection | null>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const dialogRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.ctrlKey && e.key === 'k') {
        e.preventDefault()
        openDialog()
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      const target = e.target as Node
      if (
        wrapperRef.current && !wrapperRef.current.contains(target) &&
        dialogRef.current && !dialogRef.current.contains(target)
      ) {
        setIsOpen(false)
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen])

  function openDialog() {
    setSavedSelection(editor.state.selection)
    setIsOpen(v => !v)
  }

  return (
    <div ref={wrapperRef} style={{ position: 'relative' }}>
      <Tooltip title="Link">
        <button
          ref={buttonRef}
          className={`toolbar-button${editor.isActive('link') ? ' is-active' : ''}`}
          onClick={openDialog}
        >
          <ToolbarIcon src={iconLink} alt="Link" />
        </button>
      </Tooltip>
      {isOpen && (
        <LinkDialog
          editor={editor}
          onClose={() => setIsOpen(false)}
          anchorRect={buttonRef.current?.getBoundingClientRect()}
          savedSelection={savedSelection}
          dialogRef={dialogRef}
        />
      )}
    </div>
  )
}
