"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, Trash2, Pencil, X, CheckCircle } from "lucide-react"

interface Story {
  id: number; name: string; nameEn: string; achievement: string; achievementEn: string
  year: string; quote: string; quoteEn: string; category: string
}

const CATEGORIES = [
  { id: "competitive", label: "स्पर्धा परीक्षा / Competitive" },
  { id: "medical", label: "वैद्यकीय / Medical" },
  { id: "engineering", label: "अभियांत्रिकी / Engineering" },
  { id: "professional", label: "व्यावसायिक / Professional" },
  { id: "research", label: "संशोधन / Research" },
]

const EMPTY: Omit<Story, "id"> = { name: "", nameEn: "", achievement: "", achievementEn: "", year: new Date().getFullYear().toString(), quote: "", quoteEn: "", category: "competitive" }

function Toast({ msg, onDone }: { msg: string; onDone: () => void }) {
  useEffect(() => { const t = setTimeout(onDone, 2500); return () => clearTimeout(t) }, [onDone])
  return (
    <motion.div initial={{ y: 80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 80, opacity: 0 }}
      className="fixed bottom-24 md:bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-6 py-3 rounded-2xl bg-emerald-600 text-white shadow-xl text-sm font-medium">
      <CheckCircle className="w-5 h-5" /> {msg}
    </motion.div>
  )
}

function StoryModal({ story, onSave, onClose }: { story: Omit<Story,"id"> | Story; onSave: (s: any) => void; onClose: () => void }) {
  const [form, setForm] = useState(story)
  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }))

  return (
    <motion.div className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
      <motion.div className="w-full max-w-lg bg-card rounded-3xl p-6 shadow-2xl border border-border max-h-[90vh] overflow-y-auto"
        initial={{ y: 60 }} animate={{ y: 0 }} exit={{ y: 60 }} onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-serif text-xl font-bold">{"id" in form ? "यशोगाथा बदला" : "नवीन यशोगाथा जोडा"}</h2>
          <button onClick={onClose} className="p-2 rounded-xl hover:bg-muted"><X className="w-5 h-5" /></button>
        </div>
        <div className="space-y-3">
          {[
            { label: "नाव (मराठी)", key: "name", ph: "उदा. राज पाटील" },
            { label: "Name (English)", key: "nameEn", ph: "e.g. Raj Patil" },
            { label: "यश (मराठी)", key: "achievement", ph: "उदा. UPSC परीक्षा उत्तीर्ण" },
            { label: "Achievement (English)", key: "achievementEn", ph: "e.g. Cleared UPSC Exam" },
            { label: "वर्ष / Year", key: "year", ph: "2024" },
          ].map(({ label, key, ph }) => (
            <div key={key}>
              <label className="block text-sm font-medium mb-1">{label}</label>
              <input value={(form as any)[key]} onChange={e => set(key, e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 text-base"
                placeholder={ph} inputMode={key === "year" ? "numeric" : "text"} />
            </div>
          ))}
          <div>
            <label className="block text-sm font-medium mb-1">अनुभव (मराठी) / Quote</label>
            <textarea value={form.quote} onChange={e => set("quote", e.target.value)} rows={3}
              className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 text-base resize-none"
              placeholder="विद्यार्थ्याचा अनुभव..." />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Quote (English)</label>
            <textarea value={form.quoteEn} onChange={e => set("quoteEn", e.target.value)} rows={3}
              className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 text-base resize-none"
              placeholder="Student's experience in English..." />
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
          disabled={!form.name || !form.achievement}
          className="w-full mt-5 py-4 rounded-2xl text-white font-semibold shadow-lg disabled:opacity-50 text-base"
          style={{ background: "linear-gradient(135deg, oklch(0.68 0.18 55), oklch(0.42 0.12 145))" }}>
          जतन करा / Save
        </motion.button>
      </motion.div>
    </motion.div>
  )
}

export default function AdminStories() {
  const [stories, setStories] = useState<Story[]>([])
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState<"add" | Story | null>(null)
  const [deleteId, setDeleteId] = useState<number | null>(null)
  const [toast, setToast] = useState("")

  useEffect(() => {
    fetch("/api/admin/stories").then(r => r.json()).then(d => { setStories(d); setLoading(false) })
  }, [])

  async function handleSave(form: any) {
    if ("id" in form) {
      await fetch("/api/admin/stories", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) })
      setStories(prev => prev.map(s => s.id === form.id ? form : s))
      setToast("यशोगाथा अपडेट केली!")
    } else {
      const res = await fetch("/api/admin/stories", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) })
      const newStory = await res.json()
      setStories(prev => [...prev, newStory])
      setToast("नवीन यशोगाथा जोडली!")
    }
    setModal(null)
  }

  async function handleDelete(id: number) {
    await fetch("/api/admin/stories", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) })
    setStories(prev => prev.filter(s => s.id !== id))
    setDeleteId(null)
    setToast("यशोगाथा हटवली!")
  }

  return (
    <div className="md:pl-20">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-serif text-2xl font-bold text-foreground">यशोगाथा व्यवस्थापन</h1>
          <p className="text-sm text-muted-foreground">Success Stories — {stories.length} stories</p>
        </div>
        <motion.button whileTap={{ scale: 0.95 }} onClick={() => setModal("add")}
          className="flex items-center gap-2 px-5 py-3 rounded-2xl text-white font-semibold shadow-lg text-sm"
          style={{ background: "linear-gradient(135deg, oklch(0.42 0.12 145), oklch(0.55 0.10 180))" }}>
          <Plus className="w-5 h-5" /> नवीन यशोगाथा
        </motion.button>
      </div>

      {loading ? (
        <div className="space-y-3">{[...Array(4)].map((_, i) => <div key={i} className="h-24 rounded-2xl bg-muted animate-pulse" />)}</div>
      ) : (
        <div className="space-y-3">
          {stories.map(story => (
            <motion.div key={story.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
              className="bg-card border border-border rounded-2xl p-4 flex items-start gap-4">
              <div className="w-12 h-12 rounded-full flex items-center justify-center text-white text-lg font-bold shrink-0"
                style={{ background: "linear-gradient(135deg, oklch(0.42 0.12 145), oklch(0.55 0.10 180))" }}>
                {story.name.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-serif font-bold text-foreground">{story.name}</span>
                  <span className="text-xs text-muted-foreground">({story.nameEn})</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">{story.year}</span>
                </div>
                <p className="text-sm text-foreground/80 mt-0.5">{story.achievement}</p>
                <p className="text-xs text-muted-foreground italic truncate mt-0.5">{story.quote}</p>
              </div>
              <div className="flex gap-2 shrink-0">
                <button onClick={() => setModal(story)} className="p-2 rounded-xl hover:bg-muted text-muted-foreground hover:text-foreground"><Pencil className="w-4 h-4" /></button>
                <button onClick={() => setDeleteId(story.id)} className="p-2 rounded-xl hover:bg-red-50 text-muted-foreground hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <AnimatePresence>
        {modal && <StoryModal story={modal === "add" ? EMPTY : modal} onSave={handleSave} onClose={() => setModal(null)} />}
      </AnimatePresence>

      <AnimatePresence>
        {deleteId && (
          <motion.div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div className="w-full max-w-sm bg-card rounded-3xl p-6 shadow-2xl text-center"
              initial={{ scale: 0.8 }} animate={{ scale: 1 }} exit={{ scale: 0.8 }}>
              <div className="text-5xl mb-3">⚠️</div>
              <h3 className="font-serif text-lg font-bold mb-2">हटवायचे आहे का?</h3>
              <p className="text-sm text-muted-foreground mb-6">ही यशोगाथा कायमची हटवली जाईल.</p>
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
