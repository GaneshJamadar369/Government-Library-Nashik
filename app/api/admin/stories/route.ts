import { NextRequest, NextResponse } from "next/server"
import { getStories, saveStories } from "@/lib/kv"

export async function GET() {
  const stories = await getStories()
  return NextResponse.json(stories)
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  const stories = await getStories()
  const newStory = { ...body, id: Date.now() }
  await saveStories([...stories, newStory])
  return NextResponse.json(newStory)
}

export async function PUT(req: NextRequest) {
  const updated = await req.json()
  const stories = await getStories()
  await saveStories(stories.map((s) => (s.id === updated.id ? updated : s)))
  return NextResponse.json({ ok: true })
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json()
  const stories = await getStories()
  await saveStories(stories.filter((s) => s.id !== id))
  return NextResponse.json({ ok: true })
}
