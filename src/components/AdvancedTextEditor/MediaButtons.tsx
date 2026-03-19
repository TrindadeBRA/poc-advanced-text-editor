import { useRef } from 'react'
import { Editor } from '@tiptap/react'
import useMediaUpload from '../../hooks/useMediaUpload'
import useMockMediaUpload from '../../hooks/useMockMediaUpload'

interface MediaButtonsProps {
  editor: Editor
  presignedUrlEndpoint?: string
}

function useUpload(presignedUrlEndpoint?: string) {
  const real = useMediaUpload(presignedUrlEndpoint ?? '')
  const mock = useMockMediaUpload()
  return presignedUrlEndpoint ? real : mock
}

function insertWithOverlay(
  editor: Editor,
  type: 'image' | 'video',
  blobUrl: string,
) {
  if (type === 'image') {
    editor.chain().focus().setImage({ src: blobUrl }).run()
  } else {
    editor.chain().focus().setVideo({ src: blobUrl }).run()
  }
}

function replaceMediaSrc(editor: Editor, blobUrl: string, finalUrl: string) {
  const { state, view } = editor
  const { tr, doc } = state
  let replaced = false

  doc.descendants((node, pos) => {
    if (replaced) return false
    if ((node.type.name === 'image' || node.type.name === 'video') && node.attrs.src === blobUrl) {
      tr.setNodeMarkup(pos, undefined, { ...node.attrs, src: finalUrl })
      replaced = true
      return false
    }
  })

  if (replaced) view.dispatch(tr)
}

export default function MediaButtons({ editor, presignedUrlEndpoint }: MediaButtonsProps) {
  const { upload, isUploading } = useUpload(presignedUrlEndpoint)
  const imageInputRef = useRef<HTMLInputElement>(null)
  const videoInputRef = useRef<HTMLInputElement>(null)

  async function handleFileSelected(file: File, type: 'image' | 'video') {
    const blobUrl = URL.createObjectURL(file)
    insertWithOverlay(editor, type, blobUrl)

    try {
      const finalUrl = await upload(file)
      replaceMediaSrc(editor, blobUrl, finalUrl)
    } finally {
      URL.revokeObjectURL(blobUrl)
    }
  }

  return (
    <>
      <input
        ref={imageInputRef}
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={e => {
          const file = e.target.files?.[0]
          if (file) handleFileSelected(file, 'image')
          e.target.value = ''
        }}
      />
      <input
        ref={videoInputRef}
        type="file"
        accept="video/*"
        style={{ display: 'none' }}
        onChange={e => {
          const file = e.target.files?.[0]
          if (file) handleFileSelected(file, 'video')
          e.target.value = ''
        }}
      />
      <button className="toolbar-button" disabled={isUploading} onClick={() => imageInputRef.current?.click()}>
        🖼
      </button>
      <button className="toolbar-button" disabled={isUploading} onClick={() => videoInputRef.current?.click()}>
        🎬
      </button>
    </>
  )
}
