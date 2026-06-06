"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, Trash2, Pencil, RefreshCw, X, Upload, CheckCircle, Camera } from "lucide-react"
import { DeleteWithPasswordModal } from "@/components/delete-with-password-modal"

interface LibraryEvent {
  id: number
  titleMarathi: string
  titleEnglish: string
  date: string
  dateISO: string
  description: string
  category: string
  imagePath: string
}

const CATEGORIES = [
  { id: "जयंती उत्सव", label: "जयंती उत्सव / Birth Anniversary" },
  { id: "गुणगौरव", label: "गुणगौरव / Student Felicitation" },
  { id: "सन्मान सोहळा", label: "सन्मान सोहळा / Honour Ceremony" },
  { id: "कार्यशाळा", label: "कार्यशाळा / Workshop" },
  { id: "उदघाटन", label: "उदघाटन / Inauguration" },
  { id: "राष्ट्रीय दिन", label: "राष्ट्रीय दिन / National Day" },
]

const TODAY = new Date().toISOString().split("T")[0]

const EMPTY: Omit<LibraryEvent, "id"> = {
  titleMarathi: "", titleEnglish: "", date: "", dateISO: TODAY,
  description: "", category: "जयंती उत्सव", imagePath: "",
}

function Toast({ msg, onDone }: { msg: string; onDone: () => void }) {
  useEffect(() => { const t = setTimeout(onDone, 2500); return () => clearTimeout(t) }, [onDone])
  return (
    <motion.div initial={{ y: 80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 80, opacity: 0 }}
      className="fixed bottom-24 md:bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-6 py-3 rounded-2xl bg-emerald-600 text-white shadow-xl text-sm font-medium">
      <CheckCircle className="w-5 h-5" /> {msg}
    </motion.div>
  )
}

function EventModal({
  event, onSave, onClose,
}: {
  event: Omit<LibraryEvent, "id"> | LibraryEvent
  onSave: (e: any) => void
  onClose: () => void
}) {
  const [form, setForm] = useState({ ...event })
  const [uploading, setUploading] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)
  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }))

  async function uploadToCloudinary(file: File): Promise<string> {
    const fd = new FormData()
    fd.append("file", file)
    fd.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET ?? "")
    const res = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`, { method: "POST", body: fd })
    const data = await res.json()
    return data.secure_url
  }

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    try {
      const url = await uploadToCloudinary(file)
      set("imagePath", url)
    } catch { alert("फोटो अपलोड अयशस्वी / Upload failed") }
    setUploading(false)
  }

  return (
    <motion.div className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
      <motion.div className="w-full max-w-lg bg-card rounded-3xl p-6 shadow-2xl border border-border max-h-[90vh] overflow-y-auto"
        initial={{ y: 60 }} animate={{ y: 0 }} exit={{ y: 60 }} onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-serif text-xl font-bold">{"id" in form ? "कार्यक्रम बदला ✏️" : "नवीन कार्यक्रम जोडा"}</h2>
          <button onClick={onClose} className="p-2 rounded-xl hover:bg-muted"><X className="w-5 h-5" /></button>
        </div>
        <div className="space-y-3">
          {/* Photo upload */}
          <div>
            <label className="flex items-center gap-1.5 text-sm font-medium mb-2">
              <Camera className="w-4 h-4" /> फोटो / Photo
            </label>
            <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} className="hidden" />
            <motion.button whileTap={{ scale: 0.97 }} type="button" onClick={() => fileRef.current?.click()}
              className="w-full h-32 border-2 border-dashed border-border rounded-2xl flex flex-col items-center justify-center gap-2 hover:border-primary transition-colors overflow-hidden relative">
              {form.imagePath ? (
                <img src={form.imagePath} alt="preview" className="absolute inset-0 w-full h-full object-cover rounded-2xl" />
              ) : uploading ? (
                <><div className="w-7 h-7 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
                <span className="text-xs text-muted-foreground">अपलोड होत आहे...</span></>
              ) : (
                <><Upload className="w-7 h-7 text-muted-foreground" />
                <span className="text-sm font-medium text-muted-foreground">📷 फोटो निवडा</span>
                <span className="text-xs text-muted-foreground">Camera or Gallery</span></>
              )}
            </motion.button>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">शीर्षक (मराठी) / Title</label>
            <input value={form.titleMarathi} onChange={e => set("titleMarathi", e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 text-base"
              placeholder="उदा. शिवजयंती उत्सव" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Title (English)</label>
            <input value={form.titleEnglish} onChange={e => set("titleEnglish", e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 text-base"
              placeholder="e.g. Shivaji Jayanti Celebration" />
          </div>

          {/* Date picker — calendar UI, default today */}
          <div>
            <label className="block text-sm font-medium mb-1">दिनांक / Date</label>
            <input type="date" value={form.dateISO} onChange={e => set("dateISO", e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 text-base" />
            <p className="text-xs text-muted-foreground mt-1">कॅलेंडरमधून निवडा / Pick from calendar</p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">तारीख (मराठी) / Date label (Marathi)</label>
            <input value={form.date} onChange={e => set("date", e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 text-base"
              placeholder="उदा. २६ मार्च २०१६" />
            <p className="text-xs text-muted-foreground mt-1">दाखवण्यासाठी मराठी तारीख / Display label</p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">वर्णन / Description (मराठी)</label>
            <textarea value={form.description} onChange={e => set("description", e.target.value)} rows={5}
              className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 text-base resize-none"
              placeholder="कार्यक्रमाचे संपूर्ण वर्णन..." />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">वर्ग / Category</label>
            <select value={form.category} onChange={e => set("category", e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none text-base">
              {CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
            </select>
          </div>
        </div>

        <motion.button whileTap={{ scale: 0.96 }} onClick={() => onSave(form)}
          disabled={!form.titleMarathi || !form.dateISO || uploading}
          className="w-full mt-5 py-4 rounded-2xl text-white font-semibold shadow-lg disabled:opacity-50 text-base"
          style={{ background: "linear-gradient(135deg, oklch(0.68 0.18 55), oklch(0.42 0.12 145))" }}>
          जतन करा / Save
        </motion.button>
      </motion.div>
    </motion.div>
  )
}

export default function AdminEvents() {
  const [events, setEvents] = useState<LibraryEvent[]>([])
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState<"add" | LibraryEvent | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<LibraryEvent | null>(null)
  const [replaceTarget, setReplaceTarget] = useState<LibraryEvent | null>(null)
  const [toast, setToast] = useState("")
  const replaceRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    fetch("/api/admin/events").then(r => r.json()).then(d => { setEvents(d); setLoading(false) })
  }, [])

  async function uploadToCloudinary(file: File): Promise<string> {
    const fd = new FormData()
    fd.append("file", file)
    fd.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET ?? "")
    const res = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`, { method: "POST", body: fd })
    const data = await res.json()
    return data.secure_url
  }

  async function handleReplace(file: File) {
    if (!replaceTarget) return
    try {
      const url = await uploadToCloudinary(file)
      const updated = { ...replaceTarget, imagePath: url }
      await fetch("/api/admin/events", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(updated) })
      setEvents(prev => prev.map(e => e.id === updated.id ? updated : e))
      setToast("फोटो बदलला!")
    } catch { alert("बदलणे अयशस्वी") }
    setReplaceTarget(null)
  }

  async function handleSave(form: any) {
    if ("id" in form) {
      await fetch("/api/admin/events", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) })
      setEvents(prev => prev.map(e => e.id === form.id ? form : e))
      setToast("कार्यक्रम अपडेट केला!")
    } else {
      const res = await fetch("/api/admin/events", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) })
      const newEvent = await res.json()
      setEvents(prev => [...prev, newEvent])
      setToast("नवीन कार्यक्रम जोडला!")
    }
    setModal(null)
  }

  async function handleDelete(id: number) {
    await fetch("/api/admin/events", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) })
    setEvents(prev => prev.filter(e => e.id !== id))
    setDeleteTarget(null)
    setToast("कार्यक्रम हटवला!")
  }

  return (
    <div className="md:pl-20">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-serif text-2xl font-bold text-foreground">कार्यक्रम व्यवस्थापन</h1>
          <p className="text-sm text-muted-foreground">Events Management — {events.length} events</p>
        </div>
        <motion.button whileTap={{ scale: 0.95 }} onClick={() => setModal("add")}
          className="flex items-center gap-2 px-5 py-3 rounded-2xl text-white font-semibold shadow-lg text-sm"
          style={{ background: "linear-gradient(135deg, oklch(0.68 0.18 55), oklch(0.42 0.12 145))" }}>
          <Plus className="w-5 h-5" /> नवीन कार्यक्रम
        </motion.button>
      </div>

      {loading ? (
        <div className="space-y-3">{[...Array(4)].map((_, i) => <div key={i} className="h-24 rounded-2xl bg-muted animate-pulse" />)}</div>
      ) : (
        <div className="space-y-3">
          {events.map(event => (
            <motion.div key={event.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
              className="bg-card border border-border rounded-2xl p-4 flex items-start gap-4">
              {/* Thumbnail with replace overlay */}
              <div className="relative shrink-0 group">
                {event.imagePath ? (
                  <img src={event.imagePath} alt="" className="w-16 h-16 rounded-xl object-cover" />
                ) : (
                  <div className="w-16 h-16 rounded-xl bg-muted flex items-center justify-center text-2xl">📅</div>
                )}
                <button
                  onClick={() => { setReplaceTarget(event); replaceRef.current?.click() }}
                  className="absolute inset-0 bg-black/60 rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  title="फोटो बदला">
                  <RefreshCw className="w-4 h-4 text-white" />
                </button>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-serif font-bold text-foreground">{event.titleMarathi}</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">{event.date || event.dateISO}</span>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">{event.titleEnglish}</p>
                <p className="text-xs text-muted-foreground italic mt-0.5">{event.category}</p>
              </div>
              <div className="flex gap-2 shrink-0">
                <button onClick={() => setModal(event)}
                  className="p-2.5 rounded-xl bg-amber-50 text-amber-600 hover:bg-amber-100 transition-colors">
                  <Pencil className="w-4 h-4" />
                </button>
                <button onClick={() => setDeleteTarget(event)}
                  className="p-2.5 rounded-xl bg-red-50 text-red-500 hover:bg-red-100 transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Hidden replace input */}
      <input ref={replaceRef} type="file" accept="image/*" className="hidden"
        onChange={e => { const f = e.target.files?.[0]; if (f && replaceTarget) handleReplace(f) }} />

      <AnimatePresence>
        {modal && <EventModal event={modal === "add" ? EMPTY : modal} onSave={handleSave} onClose={() => setModal(null)} />}
      </AnimatePresence>

      <AnimatePresence>
        {deleteTarget && (
          <DeleteWithPasswordModal
            itemLabel={deleteTarget.titleMarathi}
            onConfirm={() => handleDelete(deleteTarget.id)}
            onCancel={() => setDeleteTarget(null)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>{toast && <Toast msg={toast} onDone={() => setToast("")} />}</AnimatePresence>
    </div>
  )
}
