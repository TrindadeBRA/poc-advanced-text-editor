import { useRef, useState } from 'react'
import { Editor } from '@tiptap/react'
import useMediaUpload from '../../hooks/useMediaUpload'

interface MediaUploadDialogProps {
  editor: Editor
  type: 'image' | 'video'
  presignedUrlEndpoint: string
  onClose: () => void
}

export default function MediaUploadDialog({ editor, type, presignedUrlEndpoint, onClose }: MediaUploadDialogProps) {
  const { upload, isUploading, error, progress } = useMediaUpload(presignedUrlEndpoint)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  async function handleConfirm() {
    if (!selectedFile) return
    const resourceUrl = await upload(selectedFile)
    if (type === 'image') {
      editor.chain().focus().setImage({ src: resourceUrl }).run()
    } else {
      editor.chain().focus().setVideo({ src: resourceUrl }).run()
    }
    onClose()
  }

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.4)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 200,
      }}
    >
      <div
        style={{
          background: 'white',
          borderRadius: 8,
          padding: 24,
          minWidth: 320,
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
        }}
      >
        <input
          ref={inputRef}
          type="file"
          accept={type === 'image' ? 'image/*' : 'video/*'}
          onChange={e => setSelectedFile(e.target.files?.[0] ?? null)}
        />
        {isUploading && (
          <div style={{ width: '100%', background: '#e0e0e0', borderRadius: 4, height: 8 }}>
            <div
              style={{
                width: `${progress}%`,
                background: '#1976d2',
                height: '100%',
                borderRadius: 4,
                transition: 'width 0.2s',
              }}
            />
          </div>
        )}
        {error && <span style={{ color: '#d32f2f', fontSize: 13 }}>{error}</span>}
        <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
          <button
            className="toolbar-button"
            onClick={handleConfirm}
            disabled={!selectedFile || isUploading}
          >
            Confirmar
          </button>
          <button className="toolbar-button" onClick={onClose}>Cancelar</button>
        </div>
      </div>
    </div>
  )
}
