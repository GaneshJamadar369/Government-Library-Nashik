import { NextRequest, NextResponse } from "next/server"
import { getSiteContent, saveSiteContent } from "@/lib/kv"

export async function GET() {
  const content = await getSiteContent()
  return NextResponse.json(content)
}

export async function PUT(req: NextRequest) {
  const body = await req.json()
  await saveSiteContent(body)
  return NextResponse.json({ ok: true })
}
