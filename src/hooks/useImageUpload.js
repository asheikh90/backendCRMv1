import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'

export const useImageUpload = (options = {}) => {
  const [images, setImages] = useState([])
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)

  const onDrop = useCallback((acceptedFiles) => {
    setIsUploading(true)
    setUploadProgress(0)

    const newImages = acceptedFiles.map((file, index) => {
      const imageObj = {
        id: `img_${Date.now()}_${index}`,
        file,
        preview: URL.createObjectURL(file),
        name: file.name,
        size: file.size,
        type: file.type,
        uploadedAt: new Date().toISOString(),
        label: generateImageLabel(file.name, index)
      }

      // Simulate upload progress
      setTimeout(() => {
        setUploadProgress((prev) => Math.min(100, prev + (100 / acceptedFiles.length)))
      }, 500 * (index + 1))

      return imageObj
    })

    setTimeout(() => {
      setImages(prev => [...prev, ...newImages])
      setIsUploading(false)
      setUploadProgress(0)
    }, 1000)
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp']
    },
    maxFiles: options.maxFiles || 10,
    maxSize: options.maxSize || 10 * 1024 * 1024, // 10MB
    ...options
  })

  const removeImage = useCallback((imageId) => {
    setImages(prev => {
      const updated = prev.filter(img => img.id !== imageId)
      // Clean up object URLs
      const removed = prev.find(img => img.id === imageId)
      if (removed?.preview) {
        URL.revokeObjectURL(removed.preview)
      }
      return updated
    })
  }, [])

  const updateImageLabel = useCallback((imageId, newLabel) => {
    setImages(prev => prev.map(img => 
      img.id === imageId ? { ...img, label: newLabel } : img
    ))
  }, [])

  const clearImages = useCallback(() => {
    images.forEach(img => {
      if (img.preview) {
        URL.revokeObjectURL(img.preview)
      }
    })
    setImages([])
  }, [images])

  return {
    images,
    isUploading,
    uploadProgress,
    getRootProps,
    getInputProps,
    isDragActive,
    removeImage,
    updateImageLabel,
    clearImages
  }
}

// Helper function to generate smart image labels
const generateImageLabel = (filename, index) => {
  const name = filename.toLowerCase()
  
  if (name.includes('front') || name.includes('bumper')) return 'Front Bumper'
  if (name.includes('rear') || name.includes('back')) return 'Rear Bumper'
  if (name.includes('side') || name.includes('door')) return 'Side Panel'
  if (name.includes('hood')) return 'Hood'
  if (name.includes('trunk')) return 'Trunk'
  if (name.includes('wheel') || name.includes('tire')) return 'Wheel/Tire'
  if (name.includes('interior')) return 'Interior'
  
  // Default labels based on order
  const defaultLabels = [
    'Front View', 'Rear View', 'Driver Side', 'Passenger Side', 
    'Hood', 'Trunk', 'Interior', 'Detail Shot'
  ]
  
  return defaultLabels[index] || `Damage Photo ${index + 1}`
}
