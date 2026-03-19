import { useEditor, EditorContent } from '@tiptap/react'
import { useState } from 'react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'
import TextStyle from '@tiptap/extension-text-style'
import Color from '@tiptap/extension-color'
import Highlight from '@tiptap/extension-highlight'
import FontFamily from '@tiptap/extension-font-family'
import Link from '@tiptap/extension-link'
import Placeholder from '@tiptap/extension-placeholder'
import FontSize from '../../extensions/FontSize'
import LineSpacing from '../../extensions/LineSpacing'
import Indent from '../../extensions/Indent'
import ImageWithOverlay from '../../extensions/ImageWithOverlay'
import VideoWithOverlay from '../../extensions/VideoWithOverlay'
import { AdvancedTextEditorProps } from './types'
import Toolbar from './Toolbar'
import SourceView from './SourceView'
import './AdvancedTextEditor.css'

export default function AdvancedTextEditor({
  initialContent = '',
  onChange,
  presignedUrlEndpoint,
  placeholder,
  editable = true,
}: AdvancedTextEditorProps) {
  const [isSourceView, setIsSourceView] = useState(false)

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bold: {},
        italic: {},
        strike: {},
        bulletList: {},
        orderedList: {},
        history: {},
        heading: false,
        blockquote: false,
        code: false,
        codeBlock: false,
        horizontalRule: false,
      }),
      Underline,
      TextAlign.configure({ types: ['paragraph', 'heading'] }),
      TextStyle,
      Color,
      Highlight.configure({ multicolor: true }),
      FontFamily,
      Link.configure({ openOnClick: false, HTMLAttributes: { rel: 'noopener noreferrer' } }),
      ImageWithOverlay,
      Placeholder.configure({ placeholder: placeholder ?? 'Digite aqui...' }),
      FontSize,
      LineSpacing,
      Indent,
      VideoWithOverlay,
    ],
    content: initialContent,
    editable,
    onUpdate: ({ editor: e }) => {
      onChange?.(e.getHTML())
    },
  })

  return (
    <div className="advanced-text-editor">
      <Toolbar
        editor={editor}
        onToggleSource={() => setIsSourceView(v => !v)}
        isSourceView={isSourceView}
        presignedUrlEndpoint={presignedUrlEndpoint}
      />
      {isSourceView ? (
        <SourceView
          html={editor?.getHTML() === '<p></p>' ? '' : (editor?.getHTML() ?? '')}
          onSave={(html) => {
            editor?.commands.setContent(html)
            setIsSourceView(false)
          }}
          onCancel={() => setIsSourceView(false)}
        />
      ) : (
        <EditorContent editor={editor} className="editor-content" />
      )}
    </div>
  )
}
