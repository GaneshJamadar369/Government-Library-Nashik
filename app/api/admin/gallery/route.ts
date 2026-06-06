import { NextRequest, NextResponse } from "next/server"
import { getGallery, saveGallery } from "@/lib/kv"

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
  await saveGallery(images.filter((img) => img.id !== id))
  return NextResponse.json({ ok: true })
}

export async function PUT(req: NextRequest) {
  const updated = await req.json()
  const images = await getGallery()
  await saveGallery(images.map((img) => (img.id === updated.id ? updated : img)))
  return NextResponse.json({ ok: true })
}
