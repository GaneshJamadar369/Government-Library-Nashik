import { NextRequest, NextResponse } from "next/server"
import { kv } from "@vercel/kv"
import { EVENTS } from "@/data/events"

async function getEvents() {
  try {
    const data = await kv.get<any[]>("events:all")
    return data ?? EVENTS
  } catch {
    return EVENTS
  }
}

async function saveEvents(events: any[]) {
  await kv.set("events:all", events)
}

export async function GET() {
  return NextResponse.json(await getEvents())
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  const events = await getEvents()
  const newEvent = { ...body, id: Date.now() }
  await saveEvents([...events, newEvent])
  return NextResponse.json(newEvent)
}

export async function PUT(req: NextRequest) {
  const updated = await req.json()
  const events = await getEvents()
  await saveEvents(events.map(e => e.id === updated.id ? updated : e))
  return NextResponse.json({ ok: true })
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json()
  const events = await getEvents()
  await saveEvents(events.filter(e => e.id !== id))
  return NextResponse.json({ ok: true })
}
