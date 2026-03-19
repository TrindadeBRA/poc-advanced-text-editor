import { Editor } from '@tiptap/react'

export interface AdvancedTextEditorProps {
  initialContent?: string
  onChange?: (html: string) => void
  presignedUrlEndpoint?: string
  placeholder?: string
  editable?: boolean
}

export interface ToolbarProps {
  editor: Editor | null
  onToggleSource: () => void
  isSourceView: boolean
  presignedUrlEndpoint?: string
}

export interface SourceViewProps {
  html: string
  onSave: (html: string) => void
  onCancel: () => void
}

export interface FontSizeConfig {
  sizes: string[]
  defaultSize: string
}

export interface LineSpacingConfig {
  values: string[]
  defaultValue: string
}

export interface IndentConfig {
  step: number
  maxLevel: number
}

export interface FontFamilyConfig {
  families: string[]
  defaultFamily: string
}

export interface PresignedUrlRequest {
  fileName: string
  contentType: string
  mediaType: 'image' | 'video'
}

export interface PresignedUrlResponse {
  uploadUrl: string
  resourceUrl: string
}

export interface UploadState {
  isUploading: boolean
  progress: number
  error: string | null
}

export interface UseMediaUploadReturn {
  upload: (file: File) => Promise<string>
  isUploading: boolean
  error: string | null
  progress: number
}
