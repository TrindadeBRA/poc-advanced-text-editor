import { useEditor, EditorContent } from '@tiptap/react'
import { useState, useImperativeHandle, forwardRef, useMemo } from 'react'
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
import VariableBadge from '../../extensions/VariableBadge'
import { AdvancedTextEditorProps, AdvancedTextEditorRef } from './types'
import Toolbar from './Toolbar'
import SourceView from './SourceView'
import VariableBar from './VariableBar'
import './AdvancedTextEditor.css'

const AdvancedTextEditor = forwardRef<AdvancedTextEditorRef, AdvancedTextEditorProps>(function AdvancedTextEditor({
  initialContent = '',
  onChange,
  presignedUrlEndpoint,
  placeholder,
  editable = true,
  variables,
}, ref) {
  const [isSourceView, setIsSourceView] = useState(false)
  const hasVariables = Array.isArray(variables) && variables.length > 0

  const extensions = useMemo(() => {
    const base = [
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
    ]
    if (hasVariables) {
      base.push(VariableBadge)
    }
    return base
  }, [hasVariables, placeholder])

  const editor = useEditor({
    extensions,
    content: initialContent,
    editable,
    onUpdate: ({ editor: e }) => {
      onChange?.(e.getHTML())
    },
  })

  useImperativeHandle(ref, () => ({
    setContent: (html: string) => {
      editor?.commands.setContent(html)
      onChange?.(html)
    },
    getContent: () => editor?.getHTML() ?? '',
  }), [editor, onChange])

  return (
    <>
      {hasVariables && (
        <VariableBar editor={editor} variables={variables} />
      )}
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
            onChange?.(html)
            setIsSourceView(false)
          }}
          onCancel={() => setIsSourceView(false)}
        />
      ) : (
        <EditorContent editor={editor} className="editor-content" />
      )}
      </div>
    </>
  )
})

export default AdvancedTextEditor
