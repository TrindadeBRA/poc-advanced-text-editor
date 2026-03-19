import { useState } from 'react'
import { UseMediaUploadReturn } from '../components/AdvancedTextEditor/types'

function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = () => reject(new Error('Failed to read file'))
    reader.readAsDataURL(file)
  })
}

export default function useMockMediaUpload(): UseMediaUploadReturn {
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [progress, setProgress] = useState(0)

  async function upload(file: File): Promise<string> {
    setIsUploading(true)
    setError(null)
    setProgress(0)

    try {
      setProgress(40)
      await new Promise(resolve => setTimeout(resolve, 3000))
      const dataUrl = await readFileAsDataUrl(file)
      setProgress(100)
      return dataUrl
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Mock upload failed'
      setError(message)
      throw err
    } finally {
      setIsUploading(false)
    }
  }

  return { upload, isUploading, error, progress }
}
