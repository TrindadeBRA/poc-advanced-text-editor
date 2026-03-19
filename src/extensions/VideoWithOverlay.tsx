import { Node, mergeAttributes } from '@tiptap/core'
import { ReactNodeViewRenderer, NodeViewWrapper } from '@tiptap/react'
import { NodeViewProps } from '@tiptap/react'

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    video: {
      setVideo: (options: { src: string }) => ReturnType
    }
  }
}

function VideoNodeView({ node }: NodeViewProps) {
  const src = node.attrs.src as string
  const isUploading = src?.startsWith('blob:')

  return (
    <NodeViewWrapper style={{ display: 'block', position: 'relative', maxWidth: '100%' }}>
      <video
        src={src}
        controls={node.attrs.controls}
        style={{ maxWidth: '100%', height: 'auto', display: 'block', opacity: isUploading ? 0.5 : 1 }}
      />
      {isUploading && (
        <div className="media-upload-overlay">
          <div className="upload-spinner upload-spinner--large" />
        </div>
      )}
    </NodeViewWrapper>
  )
}

const VideoWithOverlay = Node.create({
  name: 'video',
  group: 'block',
  atom: true,
  addAttributes() {
    return {
      src: { default: null },
      controls: { default: true },
      width: { default: '100%' },
    }
  },
  parseHTML() {
    return [{ tag: 'video' }]
  },
  renderHTML({ HTMLAttributes }) {
    return ['video', mergeAttributes(HTMLAttributes)]
  },
  addCommands() {
    return {
      setVideo: (options) => ({ commands }) => {
        return commands.insertContent({ type: this.name, attrs: options })
      },
    }
  },
  addNodeView() {
    return ReactNodeViewRenderer(VideoNodeView)
  },
})

export default VideoWithOverlay
