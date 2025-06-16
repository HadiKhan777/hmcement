export async function uploadToCloudinary(file: File): Promise<string> {
  const apiKey = process.env.IMGBB_API_KEY
  const formData = new FormData()

  formData.append('image', file)
  formData.append('key', apiKey!)

  const res = await fetch('https://api.imgbb.com/1/upload', {
    method: 'POST',
    body: formData,
  })

  const data = await res.json()

  if (!res.ok || !data.success) {
    console.error('❌ ImgBB Upload Error:', data)
    throw new Error('Image upload failed')
  }

  return data.data.url
}
