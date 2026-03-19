import { useState } from 'react'
import { UseMediaUploadReturn, PresignedUrlRequest } from '../components/AdvancedTextEditor/types'
import { fetchPresignedUrl, uploadToS3 } from '../services/mediaService'

export default function useMediaUpload(presignedUrlEndpoint: string): UseMediaUploadReturn {
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [progress, setProgress] = useState(0)

  async function upload(file: File): Promise<string> {
    setIsUploading(true)
    setError(null)
    setProgress(0)
    try {
      const request: PresignedUrlRequest = {
        fileName: file.name,
        contentType: file.type,
        mediaType: file.type.startsWith('video/') ? 'video' : 'image',
      }
      setProgress(30)
      const { uploadUrl, resourceUrl } = await fetchPresignedUrl(presignedUrlEndpoint, request)
      setProgress(60)
      await uploadToS3(uploadUrl, file)
      setProgress(100)
      return resourceUrl
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Upload failed'
      setError(message)
      throw err
    } finally {
      setIsUploading(false)
    }
  }

  return { upload, isUploading, error, progress }
}
