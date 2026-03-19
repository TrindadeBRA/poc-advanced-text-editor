import { useCallback } from 'react'
import { AdvancedTextEditorRef } from '../components/AdvancedTextEditor/types'

const SAMPLE_HTML = [
  '<p><span style="font-size: 18px;"><strong>Lorem Ipsum Dolor Sit Amet</strong></span></p>',
  '<p>Consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p>',
  '<p><strong>Dicas importantes</strong></p>',
  '<ul>',
  '<li><p>Duis aute irure dolor in <em>reprehenderit</em> in voluptate velit</p></li>',
  '<li><p>Excepteur sint occaecat <u>cupidatat non proident</u></p></li>',
  '<li><p>Sunt in culpa qui officia <a href="https://example.com">deserunt mollit</a> anim id est laborum</p></li>',
  '</ul>',
  '<img src="https://picsum.photos/id/24/800/400" />',
  '<p style="text-align: center;"><span style="color: #e03e2d; font-size: 16px;">Sed ut perspiciatis unde omnis iste natus error sit voluptatem.</span></p>',
  '<p><span style="font-family: Georgia;">Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.</span></p>',
  '<p style="text-align: left;">Alinhado à esquerda — At vero eos et accusamus et iusto odio dignissimos.</p>',
  '<p style="text-align: center;">Centralizado — Temporibus autem quibusdam et aut officiis debitis.</p>',
  '<p style="text-align: right;">Alinhado à direita — Nam libero tempore, cum soluta nobis est eligendi.</p>',
  '<p style="text-align: justify;">Justificado — Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus.</p>',
].join('')

export default function useSampleContent(
  editorRef: React.RefObject<AdvancedTextEditorRef | null>,
  onContentChange: (html: string) => void,
) {
  const injectSample = useCallback(() => {
    editorRef.current?.setContent(SAMPLE_HTML)
    onContentChange(SAMPLE_HTML)
  }, [editorRef, onContentChange])

  return { injectSample, sampleHtml: SAMPLE_HTML }
}
