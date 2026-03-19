import { ToolbarProps } from './types'
import FormatButtons from './FormatButtons'
import AlignmentDropdown from './AlignmentDropdown'
import ListButtons from './ListButtons'
import FontFamilyDropdown from './FontFamilyDropdown'
import FontSizeDropdown from './FontSizeDropdown'
import ColorPickerButton from './ColorPickerButton'
import HistoryButtons from './HistoryButtons'
import EmojiPickerButton from './EmojiPickerButton'
import LinkButton from './LinkButton'
import MediaButtons from './MediaButtons'
import SourceCodeButton from './SourceCodeButton'

export default function Toolbar({
  editor,
  onToggleSource,
  isSourceView,
  presignedUrlEndpoint,
}: ToolbarProps) {
  if (!editor) return null

  return (
    <div className="toolbar">
      <FormatButtons editor={editor} />
      <span className="toolbar-separator" />
      <AlignmentDropdown editor={editor} />
      <span className="toolbar-separator" />
      <ListButtons editor={editor} />
      <span className="toolbar-separator" />
      <FontFamilyDropdown editor={editor} />
      <FontSizeDropdown editor={editor} />
      <span className="toolbar-separator" />
      <ColorPickerButton editor={editor} type="text" />
      <ColorPickerButton editor={editor} type="highlight" />
      <span className="toolbar-separator" />
      <EmojiPickerButton editor={editor} />
      <span className="toolbar-separator" />
      <LinkButton editor={editor} />
      <MediaButtons editor={editor} presignedUrlEndpoint={presignedUrlEndpoint} />
      <SourceCodeButton isActive={isSourceView} onClick={onToggleSource} />
      <span className="toolbar-separator" />
      <HistoryButtons editor={editor} />
    </div>
  )
}
