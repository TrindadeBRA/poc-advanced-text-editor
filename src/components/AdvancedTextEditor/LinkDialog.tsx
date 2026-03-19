import { useState, RefObject } from 'react'
import { Editor } from '@tiptap/react'
import { Selection } from '@tiptap/pm/state'
import { createPortal } from 'react-dom'

interface LinkDialogProps {
  editor: Editor
  onClose: () => void
  anchorRect?: DOMRect
  savedSelection?: Selection | null
  dialogRef?: RefObject<HTMLDivElement>
}

export default function LinkDialog({ editor, onClose, anchorRect, savedSelection, dialogRef }: LinkDialogProps) {
  const existingHref = editor.isActive('link')
    ? (editor.getAttributes('link').href as string) ?? ''
    : ''
  const [url, setUrl] = useState(existingHref)

  const top = anchorRect ? anchorRect.bottom + 4 : 0
  const left = anchorRect ? anchorRect.left : 0

  function restoreSelection() {
    if (savedSelection) {
      const tr = editor.state.tr.setSelection(savedSelection)
      editor.view.dispatch(tr)
    }
    editor.view.focus()
  }

  function handleConfirm() {
    restoreSelection()
    if (url.trim()) {
      editor.chain().setLink({ href: url.trim() }).run()
    }
    onClose()
  }

  function handleRemove() {
    restoreSelection()
    editor.chain().unsetLink().run()
    onClose()
  }

  return createPortal(
    <div
      ref={dialogRef}
      style={{
        position: 'fixed',
        top,
        left,
        zIndex: 9999,
        background: '#fff',
        border: '1px solid #D5D7DA',
        borderRadius: 8,
        padding: '8px 10px',
        display: 'flex',
        gap: 6,
        alignItems: 'center',
        minWidth: 320,
        boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
      }}
    >
      <svg width="16" height="16" fill="none" viewBox="4 7 20 15" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0, color: '#9DA4AE' }}>
        <path d="M22.2813 8.225C21.933 7.875 21.519 7.598 21.063 7.409C20.607 7.22 20.119 7.122 19.625 7.122C19.131 7.122 18.643 7.22 18.187 7.409C17.731 7.598 17.317 7.875 16.969 8.225L17.856 9.113C18.089 8.88 18.365 8.695 18.669 8.569C18.973 8.443 19.299 8.379 19.628 8.379C19.957 8.379 20.283 8.443 20.587 8.569C20.891 8.695 21.167 8.88 21.4 9.113C21.633 9.345 21.817 9.621 21.943 9.925C22.069 10.23 22.134 10.555 22.134 10.884C22.134 11.214 22.069 11.539 21.943 11.843C21.817 12.147 21.633 12.424 21.4 12.656L16.4 17.656C15.931 18.126 15.294 18.391 14.63 18.391C13.966 18.392 13.329 18.129 12.859 17.659C12.39 17.19 12.125 16.554 12.125 15.89C12.124 15.226 12.387 14.589 12.856 14.119L13.738 13.231L12.856 12.344L11.969 13.231C11.269 13.936 10.877 14.89 10.879 15.884C10.881 16.878 11.277 17.83 11.981 18.531C12.685 19.229 13.64 19.618 14.634 19.613C15.13 19.615 15.62 19.518 16.079 19.33C16.537 19.141 16.953 18.863 17.303 18.513L22.303 13.513C23.003 12.808 23.396 11.854 23.393 10.86C23.391 9.866 22.994 8.914 22.29 8.213L22.2813 8.225Z" fill="currentColor"/>
        <path d="M6.619 19.513C6.385 19.28 6.2 19.004 6.074 18.7C5.947 18.396 5.882 18.07 5.882 17.741C5.882 17.411 5.947 17.085 6.074 16.781C6.2 16.477 6.385 16.201 6.619 15.969L11.619 10.969C11.851 10.735 12.127 10.55 12.431 10.424C12.735 10.297 13.061 10.232 13.391 10.232C13.72 10.232 14.046 10.297 14.35 10.424C14.654 10.55 14.93 10.735 15.163 10.969C15.394 11.203 15.577 11.481 15.699 11.787C15.822 12.093 15.882 12.421 15.875 12.75C15.877 13.081 15.813 13.408 15.688 13.714C15.562 14.02 15.377 14.297 15.144 14.531L13.819 15.875L14.706 16.763L16.031 15.438C16.737 14.732 17.133 13.776 17.133 12.778C17.133 11.781 16.737 10.824 16.031 10.119C15.326 9.413 14.369 9.017 13.372 9.017C12.374 9.017 11.418 9.413 10.713 10.119L5.713 15.119C5.362 15.467 5.084 15.882 4.894 16.338C4.704 16.794 4.606 17.284 4.606 17.778C4.606 18.273 4.704 18.762 4.894 19.218C5.084 19.675 5.362 20.089 5.713 20.438C6.424 21.13 7.382 21.512 8.375 21.5C9.377 21.501 10.339 21.106 11.05 20.4L10.163 19.513C9.93 19.746 9.654 19.931 9.35 20.058C9.046 20.184 8.72 20.249 8.391 20.249C8.061 20.249 7.735 20.184 7.431 20.058C7.127 19.931 6.851 19.746 6.619 19.513Z" fill="currentColor"/>
      </svg>
      <input
        type="text"
        value={url}
        onChange={e => setUrl(e.target.value)}
        placeholder="https://"
        style={{
          flex: 1,
          fontSize: 13,
          padding: '4px 8px',
          border: '1px solid #D5D7DA',
          borderRadius: 6,
          outline: 'none',
          color: '#2d3139',
          background: '#fff',
        }}
        onKeyDown={e => {
          if (e.key === 'Enter') handleConfirm()
          if (e.key === 'Escape') onClose()
        }}
        autoFocus
      />
      <button
        onClick={handleConfirm}
        style={{
          background: '#2d3139',
          color: '#fff',
          border: 'none',
          borderRadius: 6,
          padding: '4px 12px',
          fontSize: 13,
          cursor: 'pointer',
          flexShrink: 0,
        }}
      >
        Confirmar
      </button>
      {editor.isActive('link') && (
        <button
          onClick={handleRemove}
          style={{
            background: 'transparent',
            color: '#e53e3e',
            border: '1px solid #e53e3e',
            borderRadius: 6,
            padding: '4px 10px',
            fontSize: 13,
            cursor: 'pointer',
            flexShrink: 0,
          }}
        >
          Remover
        </button>
      )}
    </div>,
    document.body
  )
}
