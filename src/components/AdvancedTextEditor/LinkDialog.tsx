import { useState } from 'react'
import { Editor } from '@tiptap/react'

interface LinkDialogProps {
  editor: Editor
  onClose: () => void
}

export default function LinkDialog({ editor, onClose }: LinkDialogProps) {
  const existingHref = editor.isActive('link')
    ? (editor.getAttributes('link').href as string) ?? ''
    : ''
  const [url, setUrl] = useState(existingHref)

  function handleConfirm() {
    editor.chain().focus().setLink({ href: url }).run()
    onClose()
  }

  function handleRemove() {
    editor.chain().focus().unsetLink().run()
    onClose()
  }

  return (
    <div
      style={{
        position: 'absolute',
        top: '100%',
        left: 0,
        zIndex: 100,
        background: 'white',
        border: '1px solid #e0e0e0',
        borderRadius: 4,
        padding: 8,
        display: 'flex',
        gap: 4,
        alignItems: 'center',
        minWidth: 280,
        boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
      }}
    >
      <input
        type="text"
        value={url}
        onChange={e => setUrl(e.target.value)}
        placeholder="https://"
        style={{ flex: 1, fontSize: 13, padding: '2px 4px', border: '1px solid #e0e0e0', borderRadius: 3 }}
        onKeyDown={e => e.key === 'Enter' && handleConfirm()}
        autoFocus
      />
      <button className="toolbar-button" onClick={handleConfirm}>Confirmar</button>
      {editor.isActive('link') && (
        <button className="toolbar-button" onClick={handleRemove}>Remover link</button>
      )}
      <button className="toolbar-button" onClick={onClose}>Cancelar</button>
    </div>
  )
}
