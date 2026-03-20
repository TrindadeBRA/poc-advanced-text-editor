import { Node } from '@tiptap/core'
import { NodeViewWrapper, ReactNodeViewRenderer, type NodeViewProps } from '@tiptap/react'

function VariableBadgeNode({ node, deleteNode }: NodeViewProps) {
  return (
    <NodeViewWrapper as="span" className="variable-badge-wrapper">
      <span className="variable-badge" contentEditable={false}>
        <span className="variable-badge__label">{node.attrs.name}</span>
        <button
          type="button"
          className="variable-badge__remove"
          onClick={deleteNode}
          aria-label={`Remover variável ${node.attrs.name}`}
        >
          ×
        </button>
      </span>
    </NodeViewWrapper>
  )
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    variableBadge: {
      insertVariable: (name: string) => ReturnType
    }
  }
}

const VariableBadge = Node.create({
  name: 'variableBadge',
  group: 'inline',
  inline: true,
  atom: true,

  addAttributes() {
    return {
      name: {
        default: '',
        parseHTML: (element: HTMLElement) => element.getAttribute('data-variable') || '',
      },
    }
  },

  parseHTML() {
    return [{ tag: 'span[data-variable]' }]
  },

  renderHTML({ node }) {
    return ['span', { 'data-variable': node.attrs.name }, `{{${node.attrs.name}}}`]
  },

  renderText({ node }) {
    return `{{${node.attrs.name}}}`
  },

  addNodeView() {
    return ReactNodeViewRenderer(VariableBadgeNode)
  },

  addCommands() {
    return {
      insertVariable:
        (name: string) =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs: { name },
          })
        },
    }
  },
})

export default VariableBadge
