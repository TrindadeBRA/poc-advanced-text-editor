import { useEffect, useRef, useState } from 'react'
import { Editor } from '@tiptap/react'

const EMOJIS = [
  '😀','😂','😍','🤔','😎','😢','😡','🥳',
  '👍','👎','👏','🙏','❤️','🔥','⭐','✅',
  '❌','⚠️','💡','📝','🎉','🚀','💪','🤝',
  '👀','💬','📌','🔗','📎','🖊️','📋','📊',
  '📈','🗓️','⏰','🔔','💰','🎯','🏆','🌟',
]

interface EmojiPickerButtonProps {
  editor: Editor
}

export default function EmojiPickerButton({ editor }: EmojiPickerButtonProps) {
  const [isOpen, setIsOpen] = useState(false)
  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen])

  function handleEmojiClick(emoji: string) {
    editor.chain().focus().insertContent(emoji).run()
    setIsOpen(false)
  }

  return (
    <div ref={wrapperRef} style={{ position: 'relative' }}>
      <button className="toolbar-button" onClick={() => setIsOpen(v => !v)}>
        😊
      </button>
      {isOpen && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            zIndex: 100,
            background: 'white',
            border: '1px solid #e0e0e0',
            borderRadius: 4,
            padding: 8,
            display: 'grid',
            gridTemplateColumns: 'repeat(8, 1fr)',
            gap: 4,
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
            maxWidth: 240,
          }}
        >
          {EMOJIS.map(emoji => (
            <button
              key={emoji}
              onClick={() => handleEmojiClick(emoji)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 18, padding: 2 }}
            >
              {emoji}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
