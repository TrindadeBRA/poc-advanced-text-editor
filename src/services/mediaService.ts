import { PresignedUrlRequest, PresignedUrlResponse } from '../components/AdvancedTextEditor/types'

export async function fetchPresignedUrl(
  endpoint: string,
  request: PresignedUrlRequest
): Promise<PresignedUrlResponse> {
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(request),
  })
  if (!response.ok) {
    throw new Error(`Failed to get presigned URL: ${response.statusText}`)
  }
  return response.json()
}

export async function uploadToS3(uploadUrl: string, file: File): Promise<void> {
  const response = await fetch(uploadUrl, {
    method: 'PUT',
    headers: { 'Content-Type': file.type },
    body: file,
  })
  if (!response.ok) {
    throw new Error(`Failed to upload to S3: ${response.statusText}`)
  }
}
