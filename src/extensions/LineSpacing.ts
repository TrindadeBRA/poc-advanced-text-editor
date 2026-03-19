import { Extension } from '@tiptap/core'

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    lineSpacing: {
      setLineSpacing: (value: string) => ReturnType
    }
  }
}

const LineSpacing = Extension.create({
  name: 'lineSpacing',
  addGlobalAttributes() {
    return [
      {
        types: ['paragraph'],
        attributes: {
          lineHeight: {
            default: null,
            parseHTML: (element) => element.style.lineHeight || null,
            renderHTML: (attributes) => {
              if (!attributes.lineHeight) return {}
              return { style: `line-height: ${attributes.lineHeight}` }
            },
          },
        },
      },
    ]
  },
  addCommands() {
    return {
      setLineSpacing: (value) => ({ commands }) => {
        return commands.updateAttributes('paragraph', { lineHeight: value })
      },
    }
  },
})

export default LineSpacing
