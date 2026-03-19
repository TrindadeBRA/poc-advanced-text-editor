import { useRef } from 'react'
import { Editor } from '@tiptap/react'

interface ColorPickerButtonProps {
  editor: Editor
  type: 'text' | 'highlight'
}

export default function ColorPickerButton({ editor, type }: ColorPickerButtonProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  const currentColor =
    type === 'text'
      ? ((editor.getAttributes('textStyle').color as string | undefined) ?? '#000000')
      : '#ffff00'

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const color = e.target.value
    if (type === 'text') {
      editor.chain().focus().setColor(color).run()
    } else {
      editor.chain().focus().toggleHighlight({ color }).run()
    }
  }

  return (
    <div style={{ position: 'relative', display: 'inline-flex' }}>
      <button
        className="toolbar-button"
        onClick={() => inputRef.current?.click()}
        style={{ padding: '2px 4px' }}
      >
        {type === 'text' ? (
          <span
            style={{
              display: 'inline-block',
              width: 14,
              height: 14,
              background: currentColor,
              border: '1px solid #ccc',
              borderRadius: 2,
            }}
          />
        ) : (
          '🎨'
        )}
      </button>
      <input
        ref={inputRef}
        type="color"
        value={currentColor}
        onChange={handleChange}
        style={{
          position: 'absolute',
          opacity: 0,
          width: '100%',
          height: '100%',
          top: 0,
          left: 0,
          cursor: 'pointer',
          pointerEvents: 'none',
        }}
      />
    </div>
  )
}
