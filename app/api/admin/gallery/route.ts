import { NextRequest, NextResponse } from "next/server"
import { getGallery, saveGallery } from "@/lib/kv"
import { createHash } from "crypto"

function cloudinaryPublicId(url: string): string | null {
  // Extract public_id from Cloudinary URL
  // e.g. https://res.cloudinary.com/djgkoxguj/image/upload/v1234567/folder/filename.jpg
  // → folder/filename (no extension)
  try {
    const match = url.match(/\/upload\/(?:v\d+\/)?(.+)\.[a-z]+$/i)
    return match ? match[1] : null
  } catch {
    return null
  }
}

async function deleteFromCloudinary(publicId: string) {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME
  const apiKey = process.env.CLOUDINARY_API_KEY
  const apiSecret = process.env.CLOUDINARY_API_SECRET
  if (!cloudName || !apiKey || !apiSecret) return

  const timestamp = Math.floor(Date.now() / 1000).toString()
  const toSign = `public_id=${publicId}&timestamp=${timestamp}${apiSecret}`
  const signature = createHash("sha1").update(toSign).digest("hex")

  const fd = new FormData()
  fd.append("public_id", publicId)
  fd.append("api_key", apiKey)
  fd.append("timestamp", timestamp)
  fd.append("signature", signature)

  await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`, { method: "POST", body: fd })
}

export async function GET() {
  const images = await getGallery()
  return NextResponse.json(images)
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  const images = await getGallery()
  const newImage = { ...body, id: Date.now() }
  await saveGallery([...images, newImage])
  return NextResponse.json(newImage)
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json()
  const images = await getGallery()
  const target = images.find((img) => img.id === id)
  if (target?.src) {
    const publicId = cloudinaryPublicId(target.src)
    if (publicId) await deleteFromCloudinary(publicId)
  }
  await saveGallery(images.filter((img) => img.id !== id))
  return NextResponse.json({ ok: true })
}

export async function PUT(req: NextRequest) {
  const updated = await req.json()
  const images = await getGallery()
  await saveGallery(images.map((img) => (img.id === updated.id ? updated : img)))
  return NextResponse.json({ ok: true })
}
