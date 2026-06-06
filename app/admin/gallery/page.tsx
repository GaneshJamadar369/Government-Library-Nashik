"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, Trash2, X, Upload, CheckCircle } from "lucide-react"

interface GalleryImage {
  id: number; src: string; title: string; titleEn: string; category: string; description: string
}

const CATEGORIES = [
  { id: "events", label: "कार्यक्रम / Events" },
  { id: "reading", label: "वाचन / Reading" },
  { id: "campus", label: "परिसर / Campus" },
]

function Toast({ msg, onDone }: { msg: string; onDone: () => void }) {
  useEffect(() => { const t = setTimeout(onDone, 2500); return () => clearTimeout(t) }, [onDone])
  return (
    <motion.div initial={{ y: 80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 80, opacity: 0 }}
      className="fixed bottom-24 md:bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-6 py-3 rounded-2xl bg-emerald-600 text-white shadow-xl text-sm font-medium">
      <CheckCircle className="w-5 h-5" /> {msg}
    </motion.div>
  )
}

export default function AdminGallery() {
  const [images, setImages] = useState<GalleryImage[]>([])
  const [loading, setLoading] = useState(true)
  const [showAdd, setShowAdd] = useState(false)
  const [deleteId, setDeleteId] = useState<number | null>(null)
  const [toast, setToast] = useState("")
  const [uploading, setUploading] = useState(false)
  const [form, setForm] = useState({ src: "", title: "", titleEn: "", category: "events", description: "" })
  const fileRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    fetch("/api/admin/gallery").then(r => r.json()).then(data => { setImages(data); setLoading(false) })
  }, [])

  async function uploadToCloudinary(file: File): Promise<string> {
    const fd = new FormData()
    fd.append("file", file)
    fd.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET ?? "")
    const res = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`, { method: "POST", body: fd })
    const data = await res.json()
    return data.secure_url
  }

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    try {
      const url = await uploadToCloudinary(file)
      setForm(f => ({ ...f, src: url }))
    } catch { alert("फोटो अपलोड अयशस्वी / Upload failed") }
    setUploading(false)
  }

  async function handleAdd() {
    if (!form.src || !form.title) return
    const res = await fetch("/api/admin/gallery", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) })
    const newImg = await res.json()
    setImages(prev => [...prev, newImg])
    setShowAdd(false)
    setForm({ src: "", title: "", titleEn: "", category: "events", description: "" })
    setToast("फोटो यशस्वीरित्या जोडला! / Photo added!")
  }

  async function handleDelete(id: number) {
    await fetch("/api/admin/gallery", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) })
    setImages(prev => prev.filter(img => img.id !== id))
    setDeleteId(null)
    setToast("फोटो हटवला! / Photo deleted!")
  }

  return (
    <div className="md:pl-20">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-serif text-2xl font-bold text-foreground">गॅलरी व्यवस्थापन</h1>
          <p className="text-sm text-muted-foreground">Gallery Management — {images.length} photos</p>
        </div>
        <motion.button whileTap={{ scale: 0.95 }} onClick={() => setShowAdd(true)}
          className="flex items-center gap-2 px-5 py-3 rounded-2xl text-white font-semibold shadow-lg text-sm"
          style={{ background: "linear-gradient(135deg, oklch(0.68 0.18 55), oklch(0.42 0.12 145))" }}>
          <Plus className="w-5 h-5" /> नवीन फोटो जोडा
        </motion.button>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => <div key={i} className="h-48 rounded-2xl bg-muted animate-pulse" />)}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((img) => (
            <motion.div key={img.id} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
              className="relative group rounded-2xl overflow-hidden border border-border shadow-sm">
              <img src={img.src} alt={img.titleEn} className="w-full h-44 object-cover" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <motion.button whileTap={{ scale: 0.9 }} onClick={() => setDeleteId(img.id)}
                  className="p-3 bg-red-500 rounded-2xl text-white shadow-lg">
                  <Trash2 className="w-5 h-5" />
                </motion.button>
              </div>
              <div className="p-3 bg-card">
                <p className="font-serif font-semibold text-sm text-foreground truncate">{img.title}</p>
                <p className="text-xs text-muted-foreground truncate">{img.titleEn}</p>
                <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground mt-1 inline-block">{img.category}</span>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Add Modal */}
      <AnimatePresence>
        {showAdd && (
          <motion.div className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setShowAdd(false)}>
            <motion.div className="w-full max-w-md bg-card rounded-3xl p-6 shadow-2xl border border-border"
              initial={{ y: 60, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 60, opacity: 0 }}
              onClick={e => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-serif text-xl font-bold">नवीन फोटो जोडा</h2>
                <button onClick={() => setShowAdd(false)} className="p-2 rounded-xl hover:bg-muted"><X className="w-5 h-5" /></button>
              </div>

              {/* File upload */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-foreground mb-2">फोटो निवडा / Choose Photo</label>
                <input ref={fileRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                <motion.button whileTap={{ scale: 0.96 }} onClick={() => fileRef.current?.click()}
                  className="w-full h-36 border-2 border-dashed border-border rounded-2xl flex flex-col items-center justify-center gap-2 hover:border-primary transition-colors">
                  {form.src ? (
                    <img src={form.src} alt="preview" className="h-full w-full object-cover rounded-2xl" />
                  ) : uploading ? (
                    <><div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin" /><span className="text-sm text-muted-foreground">अपलोड होत आहे...</span></>
                  ) : (
                    <><Upload className="w-8 h-8 text-muted-foreground" /><span className="text-sm text-muted-foreground">टॅप करा किंवा ड्रॅग करा</span><span className="text-xs text-muted-foreground">Tap to upload from camera or gallery</span></>
                  )}
                </motion.button>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium mb-1">शीर्षक (मराठी) / Title</label>
                  <input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 text-base"
                    placeholder="उदा. शिवजयंती उत्सव" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Title (English)</label>
                  <input value={form.titleEn} onChange={e => setForm(f => ({ ...f, titleEn: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 text-base"
                    placeholder="e.g. Shivaji Jayanti" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">वर्ग / Category</label>
                  <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none text-base">
                    {CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
                  </select>
                </div>
              </div>

              <motion.button whileTap={{ scale: 0.96 }} onClick={handleAdd}
                disabled={!form.src || !form.title || uploading}
                className="w-full mt-5 py-4 rounded-2xl text-white font-semibold shadow-lg disabled:opacity-50 text-base"
                style={{ background: "linear-gradient(135deg, oklch(0.68 0.18 55), oklch(0.42 0.12 145))" }}>
                जतन करा / Save Photo
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete confirm */}
      <AnimatePresence>
        {deleteId && (
          <motion.div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div className="w-full max-w-sm bg-card rounded-3xl p-6 shadow-2xl text-center"
              initial={{ scale: 0.8 }} animate={{ scale: 1 }} exit={{ scale: 0.8 }}>
              <div className="text-5xl mb-3">🗑️</div>
              <h3 className="font-serif text-lg font-bold mb-2">हटवायचे आहे का?</h3>
              <p className="text-sm text-muted-foreground mb-6">हे चित्र कायमचे हटवले जाईल.<br /><span className="italic">This photo will be permanently deleted.</span></p>
              <div className="flex gap-3">
                <button onClick={() => setDeleteId(null)} className="flex-1 py-3 rounded-2xl border border-border text-foreground font-medium">रद्द करा</button>
                <button onClick={() => handleDelete(deleteId)} className="flex-1 py-3 rounded-2xl bg-red-500 text-white font-semibold">हटवा</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {toast && <Toast msg={toast} onDone={() => setToast("")} />}
      </AnimatePresence>
    </div>
  )
}
