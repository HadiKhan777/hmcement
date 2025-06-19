export async function uploadToCloudinary(file: File): Promise<string> {
  const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY
  if (!apiKey) throw new Error('❌ Missing IMGBB_API_KEY in .env.local')

  const formData = new FormData()
  formData.append('image', file)

  const res = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
    method: 'POST',
    body: formData,
  })

  const data = await res.json()

  if (!res.ok || !data.success) {
    console.error('❌ ImgBB Upload Error:', data)
    throw new Error('Image upload failed')
  }

  return data.data.url // This is the direct image URL
}
