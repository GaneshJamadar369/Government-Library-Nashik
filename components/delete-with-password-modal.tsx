"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Eye, EyeOff, Lock, Trash2 } from "lucide-react"

interface DeleteWithPasswordModalProps {
  itemLabel: string
  onConfirm: () => void
  onCancel: () => void
}

export function DeleteWithPasswordModal({ itemLabel, onConfirm, onCancel }: DeleteWithPasswordModalProps) {
  const [password, setPassword] = useState("")
  const [showPw, setShowPw] = useState(false)
  const [error, setError] = useState("")
  const [checking, setChecking] = useState(false)

  async function handleDelete() {
    if (!password) { setError("पासवर्ड टाका / Enter password"); return }
    setChecking(true)
    setError("")
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: "library_staff", password }),
      })
      if (res.ok) {
        onConfirm()
      } else {
        setError("चुकीचा पासवर्ड / Wrong password")
      }
    } catch {
      setError("नेटवर्क त्रुटी / Network error")
    }
    setChecking(false)
  }

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onCancel}
      >
        <motion.div
          className="w-full max-w-sm bg-card rounded-3xl p-6 shadow-2xl border border-border"
          initial={{ scale: 0.85, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.85, y: 20 }}
          onClick={e => e.stopPropagation()}
        >
          <div className="flex flex-col items-center text-center mb-5">
            <div className="w-14 h-14 rounded-2xl bg-red-100 flex items-center justify-center mb-3">
              <Trash2 className="w-7 h-7 text-red-500" />
            </div>
            <h3 className="font-serif text-lg font-bold text-foreground">हटवायचे आहे का?</h3>
            <p className="text-sm text-muted-foreground mt-1">
              <span className="font-medium text-foreground">{itemLabel}</span> कायमचे हटवले जाईल.
            </p>
            <p className="text-xs text-muted-foreground mt-0.5 italic">This will be permanently deleted.</p>
          </div>

          <div className="mb-4">
            <label className="flex items-center gap-1.5 text-sm font-medium text-foreground mb-2">
              <Lock className="w-4 h-4" />
              पुष्टीसाठी पासवर्ड टाका / Enter password to confirm
            </label>
            <div className="relative">
              <input
                type={showPw ? "text" : "password"}
                value={password}
                onChange={e => { setPassword(e.target.value); setError("") }}
                onKeyDown={e => e.key === "Enter" && handleDelete()}
                className="w-full px-4 py-3 pr-12 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-red-300 text-base"
                placeholder="••••••••"
                autoFocus
              />
              <button
                type="button"
                onClick={() => setShowPw(v => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground p-1"
              >
                {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {error && (
              <p className="text-sm text-red-500 mt-1.5 font-medium">{error}</p>
            )}
          </div>

          <div className="flex gap-3">
            <button
              onClick={onCancel}
              className="flex-1 py-3 rounded-2xl border border-border text-foreground font-medium hover:bg-muted transition-colors"
            >
              रद्द करा
            </button>
            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={handleDelete}
              disabled={checking || !password}
              className="flex-1 py-3 rounded-2xl bg-red-500 text-white font-semibold disabled:opacity-60 transition-opacity"
            >
              {checking ? "तपासत आहे..." : "🗑️ हटवा"}
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
