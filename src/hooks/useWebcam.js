import { useState, useRef, useCallback } from 'react'

export const useWebcam = () => {
  const [isActive, setIsActive] = useState(false)
  const [stream, setStream] = useState(null)
  const [capturedImages, setCapturedImages] = useState([])
  const [error, setError] = useState(null)
  const videoRef = useRef(null)
  const canvasRef = useRef(null)

  const startWebcam = useCallback(async () => {
    try {
      setError(null)
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: 'environment' // Use back camera on mobile
        }
      })
      
      setStream(mediaStream)
      setIsActive(true)
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream
      }
    } catch (err) {
      setError('Unable to access camera. Please check permissions.')
      console.error('Webcam error:', err)
    }
  }, [])

  const stopWebcam = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop())
      setStream(null)
    }
    setIsActive(false)
    setError(null)
  }, [stream])

  const captureImage = useCallback(() => {
    if (!videoRef.current || !canvasRef.current) return null

    const video = videoRef.current
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')

    // Set canvas dimensions to match video
    canvas.width = video.videoWidth
    canvas.height = video.videoHeight

    // Draw current video frame to canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height)

    // Convert to blob
    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        const imageObj = {
          id: `webcam_${Date.now()}`,
          file: new File([blob], `webcam_capture_${Date.now()}.jpg`, { type: 'image/jpeg' }),
          preview: URL.createObjectURL(blob),
          name: `Webcam Capture ${capturedImages.length + 1}`,
          size: blob.size,
          type: 'image/jpeg',
          capturedAt: new Date().toISOString(),
          label: `Live Capture ${capturedImages.length + 1}`,
          source: 'webcam'
        }

        setCapturedImages(prev => [...prev, imageObj])
        resolve(imageObj)
      }, 'image/jpeg', 0.9)
    })
  }, [capturedImages.length])

  const clearCapturedImages = useCallback(() => {
    capturedImages.forEach(img => {
      if (img.preview) {
        URL.revokeObjectURL(img.preview)
      }
    })
    setCapturedImages([])
  }, [capturedImages])

  return {
    isActive,
    stream,
    capturedImages,
    error,
    videoRef,
    canvasRef,
    startWebcam,
    stopWebcam,
    captureImage,
    clearCapturedImages
  }
}
