import { NextRequest, NextResponse } from "next/server"
import { checkUsername, checkPassword, signToken, COOKIE, EXPIRES } from "@/lib/auth"

export async function POST(req: NextRequest) {
  const { username, password } = await req.json()

  if (!checkUsername(username) || !(await checkPassword(password))) {
    return NextResponse.json({ error: "चुकीचे नाव किंवा पासवर्ड" }, { status: 401 })
  }

  const token = await signToken(username)
  const res = NextResponse.json({ ok: true })
  res.cookies.set(COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: EXPIRES,
    path: "/",
  })
  return res
}
