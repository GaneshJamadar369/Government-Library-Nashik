import { SignJWT, jwtVerify } from "jose"
import bcrypt from "bcryptjs"

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET ?? "fallback-dev-secret-change-in-prod")
const COOKIE = "admin_token"
const EXPIRES = 8 * 60 * 60 // 8 hours in seconds

export async function signToken(username: string): Promise<string> {
  return new SignJWT({ username })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${EXPIRES}s`)
    .sign(SECRET)
}

export async function verifyToken(token: string): Promise<boolean> {
  try {
    await jwtVerify(token, SECRET)
    return true
  } catch {
    return false
  }
}

export async function checkPassword(plain: string): Promise<boolean> {
  const hash = process.env.ADMIN_PASSWORD_HASH
  if (!hash) return plain === "admin123" // dev fallback only
  return bcrypt.compare(plain, hash)
}

export function checkUsername(input: string): boolean {
  return input === (process.env.ADMIN_USERNAME ?? "admin")
}

export { COOKIE, EXPIRES }
