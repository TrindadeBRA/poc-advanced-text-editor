import { useState } from 'react'
import { Editor } from '@tiptap/react'
import MediaUploadDialog from './MediaUploadDialog'

interface MediaButtonsProps {
  editor: Editor
  presignedUrlEndpoint?: string
}

export default function MediaButtons({ editor, presignedUrlEndpoint }: MediaButtonsProps) {
  const [openDialog, setOpenDialog] = useState<'image' | 'video' | null>(null)

  return (
    <>
      <button
        className="toolbar-button"
        disabled={!presignedUrlEndpoint}
        onClick={() => setOpenDialog('image')}
      >
        🖼
      </button>
      <button
        className="toolbar-button"
        disabled={!presignedUrlEndpoint}
        onClick={() => setOpenDialog('video')}
      >
        🎬
      </button>
      {openDialog && presignedUrlEndpoint && (
        <MediaUploadDialog
          editor={editor}
          type={openDialog}
          presignedUrlEndpoint={presignedUrlEndpoint}
          onClose={() => setOpenDialog(null)}
        />
      )}
    </>
  )
}
