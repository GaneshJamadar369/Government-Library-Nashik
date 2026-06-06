"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Lock, User, Eye, EyeOff, BookOpen } from "lucide-react"

export default function AdminLogin() {
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showPw, setShowPw] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError("")
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    })
    if (res.ok) {
      router.push("/admin")
    } else {
      const data = await res.json()
      setError(data.error ?? "लॉगिन अयशस्वी")
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-forest/10 via-background to-keshari/10 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 32, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 16 }}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 14, delay: 0.1 }}
            className="w-20 h-20 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-xl"
            style={{ background: "linear-gradient(135deg, oklch(0.68 0.18 55), oklch(0.42 0.12 145))" }}
          >
            <BookOpen className="w-10 h-10 text-white" />
          </motion.div>
          <h1 className="font-serif text-3xl font-bold text-foreground">ज्ञानसंपदा</h1>
          <p className="text-muted-foreground mt-1">प्रशासन पॅनेल / Admin Panel</p>
        </div>

        {/* Card */}
        <div className="bg-card border border-border rounded-3xl shadow-2xl p-8">
          <h2 className="text-xl font-bold text-foreground mb-6 text-center">
            लॉगिन करा
            <span className="block text-sm font-normal text-muted-foreground mt-1">Sign in to continue</span>
          </h2>

          <form onSubmit={handleLogin} className="space-y-5">
            {/* Username */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                वापरकर्ता नाव <span className="text-muted-foreground font-normal">/ Username</span>
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="w-full pl-12 pr-4 py-4 rounded-2xl border border-border bg-background text-foreground text-base focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
                  placeholder="admin"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                पासवर्ड <span className="text-muted-foreground font-normal">/ Password</span>
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type={showPw ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-12 pr-14 py-4 rounded-2xl border border-border bg-background text-foreground text-base focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPw ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm text-center"
              >
                ❌ {error}
              </motion.div>
            )}

            {/* Submit */}
            <motion.button
              type="submit"
              disabled={loading}
              whileTap={{ scale: 0.97 }}
              className="w-full py-4 rounded-2xl text-white font-semibold text-base shadow-lg transition-all disabled:opacity-60"
              style={{ background: "linear-gradient(135deg, oklch(0.68 0.18 55), oklch(0.42 0.12 145))" }}
            >
              {loading ? "लॉगिन होत आहे..." : "लॉगिन करा / Sign In"}
            </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  )
}
