"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, Trash2, Pencil, X, CheckCircle } from "lucide-react"

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

const EMPTY: Omit<LibraryEvent, "id"> = {
  titleMarathi: "", titleEnglish: "", date: "", dateISO: "",
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

function EventModal({ event, onSave, onClose }: { event: Omit<LibraryEvent, "id"> | LibraryEvent; onSave: (e: any) => void; onClose: () => void }) {
  const [form, setForm] = useState(event)
  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }))

  return (
    <motion.div className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
      <motion.div className="w-full max-w-lg bg-card rounded-3xl p-6 shadow-2xl border border-border max-h-[90vh] overflow-y-auto"
        initial={{ y: 60 }} animate={{ y: 0 }} exit={{ y: 60 }} onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-serif text-xl font-bold">{"id" in form ? "कार्यक्रम बदला" : "नवीन कार्यक्रम जोडा"}</h2>
          <button onClick={onClose} className="p-2 rounded-xl hover:bg-muted"><X className="w-5 h-5" /></button>
        </div>
        <div className="space-y-3">
          {[
            { label: "शीर्षक (मराठी)", key: "titleMarathi", ph: "उदा. शिवजयंती उत्सव" },
            { label: "Title (English)", key: "titleEnglish", ph: "e.g. Shivaji Jayanti" },
            { label: "तारीख (मराठी)", key: "date", ph: "उदा. २६ मार्च २०१६" },
            { label: "Date (ISO format)", key: "dateISO", ph: "e.g. 2016-03-26" },
            { label: "फोटो मार्ग / Image path", key: "imagePath", ph: "/events/event_01.jpg" },
          ].map(({ label, key, ph }) => (
            <div key={key}>
              <label className="block text-sm font-medium mb-1">{label}</label>
              <input value={(form as any)[key]} onChange={e => set(key, e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 text-base"
                placeholder={ph} />
            </div>
          ))}
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
          disabled={!form.titleMarathi || !form.dateISO}
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
  const [deleteId, setDeleteId] = useState<number | null>(null)
  const [toast, setToast] = useState("")

  useEffect(() => {
    fetch("/api/admin/events").then(r => r.json()).then(d => { setEvents(d); setLoading(false) })
  }, [])

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
    setDeleteId(null)
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
              {event.imagePath && (
                <img src={event.imagePath} alt="" className="w-16 h-16 rounded-xl object-cover shrink-0" />
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-serif font-bold text-foreground">{event.titleMarathi}</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">{event.date}</span>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">{event.titleEnglish}</p>
                <p className="text-xs text-muted-foreground italic truncate mt-0.5">{event.category}</p>
              </div>
              <div className="flex gap-2 shrink-0">
                <button onClick={() => setModal(event)} className="p-2 rounded-xl hover:bg-muted text-muted-foreground hover:text-foreground"><Pencil className="w-4 h-4" /></button>
                <button onClick={() => setDeleteId(event.id)} className="p-2 rounded-xl hover:bg-red-50 text-muted-foreground hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <AnimatePresence>
        {modal && <EventModal event={modal === "add" ? EMPTY : modal} onSave={handleSave} onClose={() => setModal(null)} />}
      </AnimatePresence>

      <AnimatePresence>
        {deleteId && (
          <motion.div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div className="w-full max-w-sm bg-card rounded-3xl p-6 shadow-2xl text-center"
              initial={{ scale: 0.8 }} animate={{ scale: 1 }} exit={{ scale: 0.8 }}>
              <div className="text-5xl mb-3">⚠️</div>
              <h3 className="font-serif text-lg font-bold mb-2">हटवायचे आहे का?</h3>
              <p className="text-sm text-muted-foreground mb-6">हा कार्यक्रम कायमचा हटवला जाईल.</p>
              <div className="flex gap-3">
                <button onClick={() => setDeleteId(null)} className="flex-1 py-3 rounded-2xl border border-border font-medium">रद्द</button>
                <button onClick={() => handleDelete(deleteId)} className="flex-1 py-3 rounded-2xl bg-red-500 text-white font-semibold">हटवा</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>{toast && <Toast msg={toast} onDone={() => setToast("")} />}</AnimatePresence>
    </div>
  )
}
