import { useRef } from 'react'
import { Editor } from '@tiptap/react'
import ToolbarIcon from './ToolbarIcon'
import iconColor from '../../header-icons/icon-color.svg'

interface ColorPickerButtonProps {
  editor: Editor
  type: 'text' | 'highlight'
}

const Chevron = () => (
  <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1 1L5 5L9 1" stroke="#414650" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

export default function ColorPickerButton({ editor, type }: ColorPickerButtonProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  const currentColor =
    type === 'text'
      ? ((editor.getAttributes('textStyle').color as string | undefined) ?? '#000000')
      : ((editor.getAttributes('highlight').color as string | undefined) ?? '#ffff00')

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const color = e.target.value
    if (type === 'text') {
      editor.chain().focus().setColor(color).run()
    } else {
      editor.chain().focus().toggleHighlight({ color }).run()
    }
  }

  return (
    <div
      style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', gap: 2, cursor: 'pointer' }}
      onClick={() => inputRef.current?.click()}
    >
      {type === 'text' ? (
        <span
          style={{
            display: 'inline-block',
            width: 20,
            height: 20,
            background: currentColor,
            border: '2px solid rgba(0,0,0,0.15)',
            borderRadius: 5,
            flexShrink: 0,
          }}
        />
      ) : (
        <ToolbarIcon src={iconColor} alt="Cor de fundo" />
      )}
      <Chevron />
      <input
        ref={inputRef}
        type="color"
        value={currentColor}
        onChange={handleChange}
        style={{ position: 'absolute', opacity: 0, width: 0, height: 0, pointerEvents: 'none' }}
      />
    </div>
  )
}
