import { Extension } from '@tiptap/core'

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    indent: {
      indent: () => ReturnType
      outdent: () => ReturnType
    }
  }
}

const INDENT_STEP = 40

const Indent = Extension.create({
  name: 'indent',
  addGlobalAttributes() {
    return [
      {
        types: ['paragraph', 'heading'],
        attributes: {
          marginLeft: {
            default: 0,
            parseHTML: (element) => {
              const value = parseInt(element.style.marginLeft || '0', 10)
              return isNaN(value) ? 0 : value
            },
            renderHTML: (attributes) => {
              if (!attributes.marginLeft) return {}
              return { style: `margin-left: ${attributes.marginLeft}px` }
            },
          },
        },
      },
    ]
  },
  addCommands() {
    return {
      indent: () => ({ tr, state, dispatch }) => {
        const { selection } = state
        const { from, to } = selection
        state.doc.nodesBetween(from, to, (node, pos) => {
          if (node.type.name === 'paragraph' || node.type.name === 'heading') {
            const currentMargin = node.attrs.marginLeft || 0
            const newMargin = currentMargin + INDENT_STEP
            if (dispatch) {
              tr.setNodeMarkup(pos, undefined, { ...node.attrs, marginLeft: newMargin })
            }
          }
        })
        if (dispatch) dispatch(tr)
        return true
      },
      outdent: () => ({ tr, state, dispatch }) => {
        const { selection } = state
        const { from, to } = selection
        state.doc.nodesBetween(from, to, (node, pos) => {
          if (node.type.name === 'paragraph' || node.type.name === 'heading') {
            const currentMargin = node.attrs.marginLeft || 0
            const newMargin = Math.max(0, currentMargin - INDENT_STEP)
            if (dispatch) {
              tr.setNodeMarkup(pos, undefined, { ...node.attrs, marginLeft: newMargin })
            }
          }
        })
        if (dispatch) dispatch(tr)
        return true
      },
    }
  },
  addKeyboardShortcuts() {
    return {
      'Mod-]': () => this.editor.commands.indent(),
      'Mod-[': () => this.editor.commands.outdent(),
    }
  },
})

export default Indent
