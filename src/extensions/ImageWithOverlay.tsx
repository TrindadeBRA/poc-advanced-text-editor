import { Node, mergeAttributes } from '@tiptap/core'
import { ReactNodeViewRenderer, NodeViewWrapper } from '@tiptap/react'
import { NodeViewProps } from '@tiptap/react'

function ImageNodeView({ node }: NodeViewProps) {
  const src = node.attrs.src as string
  const isUploading = src?.startsWith('blob:')

  return (
    <NodeViewWrapper style={{ display: 'inline-block', position: 'relative', maxWidth: '100%' }}>
      <img
        src={src}
        style={{ maxWidth: '100%', height: 'auto', display: 'block', opacity: isUploading ? 0.5 : 1 }}
      />
      {isUploading && (
        <div className="media-upload-overlay">
          <div className="upload-spinner" />
        </div>
      )}
    </NodeViewWrapper>
  )
}

const ImageWithOverlay = Node.create({
  name: 'image',
  group: 'block',
  atom: true,
  addAttributes() {
    return {
      src: { default: null },
      alt: { default: null },
      title: { default: null },
    }
  },
  parseHTML() {
    return [{ tag: 'img[src]' }]
  },
  renderHTML({ HTMLAttributes }) {
    return ['img', mergeAttributes(HTMLAttributes)]
  },
  addCommands() {
    return {
      setImage: (options: { src: string; alt?: string; title?: string }) => ({ commands }: { commands: any }) => {
        return commands.insertContent({ type: this.name, attrs: options })
      },
    } as any
  },
  addNodeView() {
    return ReactNodeViewRenderer(ImageNodeView)
  },
})

export default ImageWithOverlay
