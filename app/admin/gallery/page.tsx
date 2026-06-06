"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, Trash2, Pencil, RefreshCw, X, Upload, CheckCircle, Camera } from "lucide-react"
import { DeleteWithPasswordModal } from "@/components/delete-with-password-modal"

interface GalleryImage {
  id: number; src: string; title: string; titleEn: string; category: string; description: string; eventDate?: string
}

const CATEGORIES = [
  { id: "events", label: "कार्यक्रम / Events" },
  { id: "reading", label: "वाचन / Reading" },
  { id: "campus", label: "परिसर / Campus" },
]

const TODAY = new Date().toISOString().split("T")[0]

const EMPTY_FORM = { src: "", title: "", titleEn: "", category: "events", description: "", eventDate: TODAY }

function Toast({ msg, onDone }: { msg: string; onDone: () => void }) {
  useEffect(() => { const t = setTimeout(onDone, 2500); return () => clearTimeout(t) }, [onDone])
  return (
    <motion.div initial={{ y: 80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 80, opacity: 0 }}
      className="fixed bottom-24 md:bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-6 py-3 rounded-2xl bg-emerald-600 text-white shadow-xl text-sm font-medium">
      <CheckCircle className="w-5 h-5" /> {msg}
    </motion.div>
  )
}

function UploadArea({ src, uploading, onFile }: { src: string; uploading: boolean; onFile: (f: File) => void }) {
  const ref = useRef<HTMLInputElement>(null)
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-foreground mb-2">
        <Camera className="inline w-4 h-4 mr-1" />
        फोटो निवडा / Choose Photo
      </label>
      <input ref={ref} type="file" accept="image/*" onChange={e => { const f = e.target.files?.[0]; if (f) onFile(f) }} className="hidden" />
      <motion.button whileTap={{ scale: 0.97 }} type="button" onClick={() => ref.current?.click()}
        className="w-full h-40 border-2 border-dashed border-border rounded-2xl flex flex-col items-center justify-center gap-2 hover:border-primary transition-colors overflow-hidden relative">
        {src ? (
          <img src={src} alt="preview" className="absolute inset-0 w-full h-full object-cover rounded-2xl" />
        ) : uploading ? (
          <><div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
          <span className="text-sm text-muted-foreground">अपलोड होत आहे...</span></>
        ) : (
          <><Upload className="w-8 h-8 text-muted-foreground" />
          <span className="text-sm font-medium text-muted-foreground">📷 फोटो निवडा</span>
          <span className="text-xs text-muted-foreground">Camera or Gallery — tap to open</span></>
        )}
      </motion.button>
    </div>
  )
}

export default function AdminGallery() {
  const [images, setImages] = useState<GalleryImage[]>([])
  const [loading, setLoading] = useState(true)
  const [showAdd, setShowAdd] = useState(false)
  const [editTarget, setEditTarget] = useState<GalleryImage | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<GalleryImage | null>(null)
  const [replaceTarget, setReplaceTarget] = useState<GalleryImage | null>(null)
  const [toast, setToast] = useState("")
  const [uploading, setUploading] = useState(false)
  const [form, setForm] = useState(EMPTY_FORM)
  const replaceFileRef = useRef<HTMLInputElement>(null)

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

  async function handleFileForAdd(file: File) {
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
    setForm(EMPTY_FORM)
    setToast("फोटो यशस्वीरित्या जोडला!")
  }

  async function handleEdit() {
    if (!editTarget) return
    await fetch("/api/admin/gallery", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(editTarget) })
    setImages(prev => prev.map(img => img.id === editTarget.id ? editTarget : img))
    setEditTarget(null)
    setToast("फोटो माहिती अपडेट केली!")
  }

  async function handleReplace(file: File) {
    if (!replaceTarget) return
    setUploading(true)
    try {
      const newUrl = await uploadToCloudinary(file)
      const updated = { ...replaceTarget, src: newUrl }
      await fetch("/api/admin/gallery", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(updated) })
      setImages(prev => prev.map(img => img.id === updated.id ? updated : img))
      setToast("फोटो बदलला यशस्वीरित्या!")
    } catch { alert("बदलणे अयशस्वी / Replace failed") }
    setReplaceTarget(null)
    setUploading(false)
  }

  async function handleDelete(id: number) {
    await fetch("/api/admin/gallery", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) })
    setImages(prev => prev.filter(img => img.id !== id))
    setDeleteTarget(null)
    setToast("फोटो हटवला!")
  }

  return (
    <div className="md:pl-20">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-serif text-2xl font-bold text-foreground">गॅलरी व्यवस्थापन</h1>
          <p className="text-sm text-muted-foreground">Gallery Management — {images.length} photos</p>
        </div>
        <motion.button whileTap={{ scale: 0.95 }} onClick={() => { setForm(EMPTY_FORM); setShowAdd(true) }}
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
              className="relative rounded-2xl overflow-hidden border border-border shadow-sm bg-card">
              <img src={img.src} alt={img.titleEn} className="w-full h-40 object-cover" />
              {/* Always-visible action bar */}
              <div className="flex items-center justify-between gap-1 px-2 py-1.5 bg-black/70 absolute bottom-[88px] md:bottom-[92px] left-0 right-0">
                <button onClick={() => { setReplaceTarget(img); replaceFileRef.current?.click() }}
                  className="flex items-center gap-1 px-2 py-1 rounded-lg bg-blue-500 text-white text-xs font-medium">
                  <RefreshCw className="w-3.5 h-3.5" /> बदला
                </button>
                <button onClick={() => setEditTarget({ ...img })}
                  className="flex items-center gap-1 px-2 py-1 rounded-lg bg-amber-500 text-white text-xs font-medium">
                  <Pencil className="w-3.5 h-3.5" /> बदल
                </button>
                <button onClick={() => setDeleteTarget(img)}
                  className="flex items-center gap-1 px-2 py-1 rounded-lg bg-red-500 text-white text-xs font-medium">
                  <Trash2 className="w-3.5 h-3.5" /> हटवा
                </button>
              </div>
              <div className="p-3 bg-card">
                <p className="font-serif font-semibold text-sm text-foreground truncate">{img.title}</p>
                <p className="text-xs text-muted-foreground truncate">{img.titleEn}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">{img.category}</span>
                  {img.eventDate && <span className="text-xs text-muted-foreground">{img.eventDate}</span>}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Hidden replace file input */}
      <input ref={replaceFileRef} type="file" accept="image/*" className="hidden"
        onChange={e => { const f = e.target.files?.[0]; if (f && replaceTarget) handleReplace(f) }} />

      {/* Add Modal */}
      <AnimatePresence>
        {showAdd && (
          <motion.div className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setShowAdd(false)}>
            <motion.div className="w-full max-w-md bg-card rounded-3xl p-6 shadow-2xl border border-border max-h-[90vh] overflow-y-auto"
              initial={{ y: 60, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 60, opacity: 0 }}
              onClick={e => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-serif text-xl font-bold">नवीन फोटो जोडा</h2>
                <button onClick={() => setShowAdd(false)} className="p-2 rounded-xl hover:bg-muted"><X className="w-5 h-5" /></button>
              </div>

              <UploadArea src={form.src} uploading={uploading} onFile={handleFileForAdd} />

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
                <div>
                  <label className="block text-sm font-medium mb-1">दिनांक / Date</label>
                  <input type="date" value={form.eventDate} onChange={e => setForm(f => ({ ...f, eventDate: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 text-base" />
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

      {/* Edit Modal */}
      <AnimatePresence>
        {editTarget && (
          <motion.div className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setEditTarget(null)}>
            <motion.div className="w-full max-w-md bg-card rounded-3xl p-6 shadow-2xl border border-border max-h-[90vh] overflow-y-auto"
              initial={{ y: 60, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 60, opacity: 0 }}
              onClick={e => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-serif text-xl font-bold">फोटो माहिती बदला ✏️</h2>
                <button onClick={() => setEditTarget(null)} className="p-2 rounded-xl hover:bg-muted"><X className="w-5 h-5" /></button>
              </div>
              <img src={editTarget.src} alt="" className="w-full h-32 object-cover rounded-2xl mb-4" />
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium mb-1">शीर्षक (मराठी)</label>
                  <input value={editTarget.title} onChange={e => setEditTarget(t => t ? { ...t, title: e.target.value } : t)}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 text-base" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Title (English)</label>
                  <input value={editTarget.titleEn} onChange={e => setEditTarget(t => t ? { ...t, titleEn: e.target.value } : t)}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 text-base" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">वर्ग / Category</label>
                  <select value={editTarget.category} onChange={e => setEditTarget(t => t ? { ...t, category: e.target.value } : t)}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none text-base">
                    {CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">दिनांक / Date</label>
                  <input type="date" value={editTarget.eventDate ?? ""} onChange={e => setEditTarget(t => t ? { ...t, eventDate: e.target.value } : t)}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 text-base" />
                </div>
              </div>
              <motion.button whileTap={{ scale: 0.96 }} onClick={handleEdit}
                className="w-full mt-5 py-4 rounded-2xl text-white font-semibold shadow-lg text-base"
                style={{ background: "linear-gradient(135deg, oklch(0.68 0.18 55), oklch(0.42 0.12 145))" }}>
                जतन करा / Save Changes
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete with password */}
      <AnimatePresence>
        {deleteTarget && (
          <DeleteWithPasswordModal
            itemLabel={deleteTarget.title}
            onConfirm={() => handleDelete(deleteTarget.id)}
            onCancel={() => setDeleteTarget(null)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {toast && <Toast msg={toast} onDone={() => setToast("")} />}
      </AnimatePresence>
    </div>
  )
}
