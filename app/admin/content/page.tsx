"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, ChevronUp, Save, CheckCircle, Camera, Upload } from "lucide-react"

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

function LogoUpload({ logoUrl, onUpload, uploading }: { logoUrl: string; onUpload: (file: File) => void; uploading: boolean }) {
  const ref = useRef<HTMLInputElement>(null)
  return (
    <div>
      <label className="flex items-center gap-1.5 text-sm font-medium text-foreground mb-2">
        <Camera className="w-4 h-4" /> लोगो / Logo Image
      </label>
      <input ref={ref} type="file" accept="image/*" className="hidden" onChange={e => { const f = e.target.files?.[0]; if (f) onUpload(f) }} />
      <div className="flex items-center gap-4">
        {logoUrl ? (
          <img src={logoUrl} alt="logo" className="w-16 h-16 rounded-xl object-contain border border-border bg-muted shrink-0" />
        ) : (
          <div className="w-16 h-16 rounded-xl bg-muted flex items-center justify-center text-2xl font-serif font-bold text-muted-foreground shrink-0">ज्ञा</div>
        )}
        <motion.button whileTap={{ scale: 0.96 }} type="button" onClick={() => ref.current?.click()}
          className="flex items-center gap-2 px-4 py-3 rounded-xl border border-border hover:bg-muted transition-colors text-sm font-medium">
          {uploading ? (
            <><div className="w-4 h-4 border-2 border-primary/30 border-t-primary rounded-full animate-spin" /> अपलोड होत आहे...</>
          ) : (
            <><Upload className="w-4 h-4" /> 📷 लोगो बदला / Change Logo</>
          )}
        </motion.button>
      </div>
      {logoUrl && <p className="text-xs text-muted-foreground mt-1.5 break-all">{logoUrl.slice(0, 60)}...</p>}
    </div>
  )
}

export default function AdminContent() {
  const [content, setContent] = useState<any>(null)
  const [saving, setSaving] = useState(false)
  const [logoUploading, setLogoUploading] = useState(false)
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

  async function uploadLogo(file: File) {
    setLogoUploading(true)
    try {
      const fd = new FormData()
      fd.append("file", file)
      fd.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET ?? "")
      const res = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`, { method: "POST", body: fd })
      const data = await res.json()
      set(["branding", "logoUrl"], data.secure_url)
    } catch { alert("लोगो अपलोड अयशस्वी / Logo upload failed") }
    setLogoUploading(false)
  }

  async function handleSave() {
    setSaving(true)
    await fetch("/api/admin/content", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(content) })
    setSaving(false)
    setToast("बदल यशस्वीरित्या जतन केले! / Changes saved!")
  }

  if (!content) return (
    <div className="md:pl-20 space-y-4">
      {[...Array(5)].map((_, i) => <div key={i} className="h-16 rounded-2xl bg-muted animate-pulse" />)}
    </div>
  )

  const branding = content.branding ?? { siteName: "ज्ञानसंपदा", siteNameEn: "Dnyansampada", tagline: "Public Library, Nashik", logoUrl: "" }
  const storyStats = content.storyStats ?? { successStudents: "500+", govOfficers: "50+", doctors: "30+", years: "25+" }
  const footer = content.footer ?? { orgName: "नाशिक महानगरपालिका अंतर्गत", location: "नाशिक, महाराष्ट्र" }

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

      {/* Branding */}
      <Section title="ब्रँडिंग" sub="Branding — Logo, Site Name, Tagline" defaultOpen>
        <LogoUpload logoUrl={branding.logoUrl} onUpload={uploadLogo} uploading={logoUploading} />
        <Field label="साइटचे नाव (मराठी)" sub="Site Name" value={branding.siteName} onChange={v => set(["branding","siteName"], v)} />
        <Field label="Site Name (English)" value={branding.siteNameEn} onChange={v => set(["branding","siteNameEn"], v)} />
        <Field label="टॅगलाइन / Tagline" value={branding.tagline} onChange={v => set(["branding","tagline"], v)} />
      </Section>

      {/* Home page hero */}
      <Section title="मुख्य पृष्ठ" sub="Home Page — Hero Section">
        <Field label="मुख्य शीर्षक" sub="Main Heading" value={content.hero.heading} onChange={v => set(["hero","heading"], v)} />
        <Field label="उपशीर्षक" sub="Subheading" value={content.hero.subheading} onChange={v => set(["hero","subheading"], v)} />
        <Field label="टॅगलाइन" sub="Tagline" value={content.hero.tagline} onChange={v => set(["hero","tagline"], v)} multiline />
      </Section>

      {/* About */}
      <Section title="आमच्याबद्दल" sub="About Section">
        <Field label="शीर्षक" sub="Heading" value={content.about.heading} onChange={v => set(["about","heading"], v)} />
        <Field label="मजकूर" sub="Body Text" value={content.about.body} onChange={v => set(["about","body"], v)} multiline />
      </Section>

      {/* Library stats */}
      <Section title="आकडेवारी" sub="Library Stats Numbers">
        <div className="grid grid-cols-2 gap-3">
          <Field label="पुस्तके / Books" value={content.stats.books} onChange={v => set(["stats","books"], v)} />
          <Field label="सदस्य / Members" value={content.stats.members} onChange={v => set(["stats","members"], v)} />
          <Field label="वर्षे / Years" value={content.stats.years} onChange={v => set(["stats","years"], v)} />
          <Field label="वर्तमानपत्रे / Newspapers" value={content.stats.newspapers} onChange={v => set(["stats","newspapers"], v)} />
        </div>
      </Section>

      {/* Story stats */}
      <Section title="यशोगाथा आकडेवारी" sub="Success Story Stats">
        <div className="grid grid-cols-2 gap-3">
          <Field label="यशस्वी विद्यार्थी / Students" value={storyStats.successStudents} onChange={v => set(["storyStats","successStudents"], v)} />
          <Field label="शासकीय अधिकारी / Gov Officers" value={storyStats.govOfficers} onChange={v => set(["storyStats","govOfficers"], v)} />
          <Field label="डॉक्टर / Doctors" value={storyStats.doctors} onChange={v => set(["storyStats","doctors"], v)} />
          <Field label="वर्षे / Years" value={storyStats.years} onChange={v => set(["storyStats","years"], v)} />
        </div>
      </Section>

      {/* Contact */}
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

      {/* Footer org info */}
      <Section title="पादटीप" sub="Footer — Organisation Info">
        <Field label="संस्था नाव / Org Name" value={footer.orgName} onChange={v => set(["footer","orgName"], v)} />
        <Field label="स्थान / Location" value={footer.location} onChange={v => set(["footer","location"], v)} />
      </Section>

      <AnimatePresence>{toast && <Toast msg={toast} onDone={() => setToast("")} />}</AnimatePresence>
    </div>
  )
}
