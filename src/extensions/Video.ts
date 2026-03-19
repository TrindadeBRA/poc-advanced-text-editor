import { Node, mergeAttributes } from '@tiptap/core'

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    video: {
      setVideo: (options: { src: string }) => ReturnType
    }
  }
}

const Video = Node.create({
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
        return commands.insertContent({
          type: this.name,
          attrs: options,
        })
      },
    }
  },
})

export default Video
