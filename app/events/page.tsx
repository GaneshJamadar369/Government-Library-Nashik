"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { BookOpen, Calendar } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { EventsTimeline } from "@/components/events-timeline"
import { FallingLeaves } from "@/components/falling-leaves"
import { EVENTS } from "@/data/events"

const TITLE_WORDS = ["कार्यक्रम", "इतिहास"]
const TITLE_WORDS_EN = ["Events", "History"]

export default function EventsPage() {
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] })
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "35%"])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <div ref={heroRef} className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        <FallingLeaves />

        {/* Background gradient */}
        <motion.div
          style={{ y: heroY }}
          className="absolute inset-0 bg-gradient-to-br from-forest/10 via-background to-keshari/10"
        />

        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-10 text-center px-4 py-20"
        >
          {/* Icon */}
          <motion.div
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 180, damping: 14, delay: 0.1 }}
            className="flex justify-center mb-6"
          >
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg"
              style={{ background: "linear-gradient(135deg, oklch(0.68 0.18 55), oklch(0.42 0.12 145))" }}>
              <BookOpen className="w-8 h-8 text-white" />
            </div>
          </motion.div>

          {/* Marathi title — staggered word reveal */}
          <div className="flex flex-wrap justify-center gap-3 mb-2">
            {TITLE_WORDS.map((word, i) => (
              <motion.span
                key={word}
                initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ delay: 0.2 + i * 0.15, type: "spring", stiffness: 100, damping: 14 }}
                className="font-serif text-5xl md:text-6xl font-bold text-gradient-keshari"
              >
                {word}
              </motion.span>
            ))}
          </div>

          {/* English subtitle */}
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {TITLE_WORDS_EN.map((word, i) => (
              <motion.span
                key={word}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
                className="text-xl md:text-2xl text-muted-foreground font-light tracking-wide"
              >
                {word}
              </motion.span>
            ))}
          </div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75, duration: 0.5 }}
            className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground"
          >
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-keshari" />
              <span>{EVENTS.length} कार्यक्रम / Events</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-gold inline-block" />
              <span>२०१६ ते २०२४</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-forest inline-block" />
              <span>ज्ञानसंपदा सार्वजनिक वाचनालय</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className="w-5 h-8 rounded-full border-2 border-muted-foreground/40 flex items-start justify-center pt-1.5"
          >
            <div className="w-1 h-2 rounded-full bg-muted-foreground/60" />
          </motion.div>
          <span className="text-xs text-muted-foreground/60">Scroll</span>
        </motion.div>
      </div>

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent mx-8" />

      {/* Timeline */}
      <section className="py-12">
        <EventsTimeline />
      </section>

      <Footer />
    </div>
  )
}
