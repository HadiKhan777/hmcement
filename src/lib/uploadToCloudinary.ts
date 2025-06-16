export const uploadToCloudinary = async (file: File) => {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('upload_preset', 'hmcement_unsigned') // your unsigned preset name

  const res = await fetch('https://api.cloudinary.com/v1_1/dpjeivj6w/image/upload', {
    method: 'POST',
    body: formData,
  })

  if (!res.ok) {
    throw new Error('Cloudinary upload failed')
  }

  const data = await res.json()
  return data.secure_url as string
}
