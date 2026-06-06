"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, ChevronUp, Save, CheckCircle } from "lucide-react"

function Toast({ msg, onDone }: { msg: string; onDone: () => void }) {
  useEffect(() => { const t = setTimeout(onDone, 2500); return () => clearTimeout(t) }, [onDone])
  return (
    <motion.div initial={{ y: 80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 80, opacity: 0 }}
      className="fixed bottom-24 md:bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-6 py-3 rounded-2xl bg-emerald-600 text-white shadow-xl text-sm font-medium">
      <CheckCircle className="w-5 h-5" /> {msg}
    </motion.div>
  )
}

function Section({ title, sub, children, defaultOpen = false }: { title: string; sub: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="bg-card border border-border rounded-2xl overflow-hidden mb-4">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between px-5 py-4 hover:bg-muted/50 transition-colors">
        <div className="text-left">
          <span className="font-serif font-bold text-foreground text-lg">{title}</span>
          <span className="block text-xs text-muted-foreground">{sub}</span>
        </div>
        {open ? <ChevronUp className="w-5 h-5 text-muted-foreground" /> : <ChevronDown className="w-5 h-5 text-muted-foreground" />}
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }} className="overflow-hidden">
            <div className="px-5 pb-5 pt-1 space-y-4 border-t border-border">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function Field({ label, sub, value, onChange, multiline = false }: { label: string; sub?: string; value: string; onChange: (v: string) => void; multiline?: boolean }) {
  return (
    <div>
      <label className="block text-sm font-medium text-foreground mb-1">
        {label} {sub && <span className="font-normal text-muted-foreground">/ {sub}</span>}
      </label>
      {multiline ? (
        <textarea value={value} onChange={e => onChange(e.target.value)} rows={3}
          className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 text-base resize-none" />
      ) : (
        <input value={value} onChange={e => onChange(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 text-base" />
      )}
    </div>
  )
}

export default function AdminContent() {
  const [content, setContent] = useState<any>(null)
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState("")

  useEffect(() => {
    fetch("/api/admin/content").then(r => r.json()).then(setContent)
  }, [])

  function set(path: string[], value: string) {
    setContent((prev: any) => {
      const next = JSON.parse(JSON.stringify(prev))
      let obj = next
      for (let i = 0; i < path.length - 1; i++) obj = obj[path[i]]
      obj[path[path.length - 1]] = value
      return next
    })
  }

  async function handleSave() {
    setSaving(true)
    await fetch("/api/admin/content", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(content) })
    setSaving(false)
    setToast("बदल यशस्वीरित्या जतन केले! / Changes saved!")
  }

  if (!content) return (
    <div className="md:pl-20 space-y-4">
      {[...Array(4)].map((_, i) => <div key={i} className="h-16 rounded-2xl bg-muted animate-pulse" />)}
    </div>
  )

  return (
    <div className="md:pl-20">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-serif text-2xl font-bold text-foreground">मजकूर बदला</h1>
          <p className="text-sm text-muted-foreground">Edit Site Content — all pages</p>
        </div>
        <motion.button whileTap={{ scale: 0.95 }} onClick={handleSave} disabled={saving}
          className="flex items-center gap-2 px-5 py-3 rounded-2xl text-white font-semibold shadow-lg text-sm disabled:opacity-60"
          style={{ background: "linear-gradient(135deg, oklch(0.55 0.10 180), oklch(0.42 0.12 145))" }}>
          <Save className="w-4 h-4" /> {saving ? "जतन होत आहे..." : "सर्व जतन करा"}
        </motion.button>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-2xl px-5 py-3 mb-5 text-sm text-amber-800">
        ⚠️ विकसक माहिती (Ganesh Jamadar) येथे बदलता येत नाही — ती संरक्षित आहे.
        <span className="block text-xs text-amber-600 mt-0.5">Developer info is protected and cannot be edited here.</span>
      </div>

      <Section title="मुख्य पृष्ठ" sub="Home Page — Hero Section" defaultOpen>
        <Field label="मुख्य शीर्षक" sub="Main Heading" value={content.hero.heading} onChange={v => set(["hero","heading"], v)} />
        <Field label="उपशीर्षक" sub="Subheading" value={content.hero.subheading} onChange={v => set(["hero","subheading"], v)} />
        <Field label="टॅगलाइन" sub="Tagline" value={content.hero.tagline} onChange={v => set(["hero","tagline"], v)} multiline />
      </Section>

      <Section title="आमच्याबद्दल" sub="About Section">
        <Field label="शीर्षक" sub="Heading" value={content.about.heading} onChange={v => set(["about","heading"], v)} />
        <Field label="मजकूर" sub="Body Text" value={content.about.body} onChange={v => set(["about","body"], v)} multiline />
      </Section>

      <Section title="आकडेवारी" sub="Stats Numbers">
        <div className="grid grid-cols-2 gap-3">
          <Field label="पुस्तके / Books" value={content.stats.books} onChange={v => set(["stats","books"], v)} />
          <Field label="सदस्य / Members" value={content.stats.members} onChange={v => set(["stats","members"], v)} />
          <Field label="वर्षे / Years" value={content.stats.years} onChange={v => set(["stats","years"], v)} />
          <Field label="वर्तमानपत्रे / Newspapers" value={content.stats.newspapers} onChange={v => set(["stats","newspapers"], v)} />
        </div>
      </Section>

      <Section title="संपर्क" sub="Contact Information">
        <Field label="पत्ता (मराठी)" sub="Address" value={content.contact.address} onChange={v => set(["contact","address"], v)} />
        <Field label="Address (English)" value={content.contact.addressEn} onChange={v => set(["contact","addressEn"], v)} />
        <Field label="वेळ (मराठी)" sub="Library Hours" value={content.contact.timing} onChange={v => set(["contact","timing"], v)} />
        <Field label="Hours (English)" value={content.contact.timingEn} onChange={v => set(["contact","timingEn"], v)} />
        <div className="grid grid-cols-2 gap-3">
          <Field label="फोन / Phone" value={content.contact.phone} onChange={v => set(["contact","phone"], v)} />
          <Field label="ईमेल / Email" value={content.contact.email} onChange={v => set(["contact","email"], v)} />
        </div>
      </Section>

      <AnimatePresence>{toast && <Toast msg={toast} onDone={() => setToast("")} />}</AnimatePresence>
    </div>
  )
}
