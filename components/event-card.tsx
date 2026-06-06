"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Calendar, Tag, ChevronDown, ChevronUp } from "lucide-react"
import type { LibraryEvent } from "@/data/events"

interface EventCardProps {
  event: LibraryEvent
  side: "left" | "right"
  index: number
  isInView: boolean
}

export function EventCard({ event, side, index, isInView }: EventCardProps) {
  const [expanded, setExpanded] = useState(false)
  const xOffset = side === "left" ? -60 : 60

  return (
    <motion.div
      initial={{ opacity: 0, x: xOffset }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ type: "spring", stiffness: 70, damping: 18, delay: 0.08 }}
      className="w-full"
    >
      <motion.div
        whileHover={{ y: -6, boxShadow: "0 24px 64px -12px oklch(0.42 0.12 145 / 0.22)" }}
        transition={{ type: "spring", stiffness: 280, damping: 22 }}
        className="bg-card border border-border rounded-2xl overflow-hidden shadow-md"
      >
        {/* Photo */}
        <div className="relative overflow-hidden" style={{ height: "260px" }}>
          <motion.img
            src={event.imagePath}
            alt={event.titleEnglish}
            loading="lazy"
            initial={{ scale: 1.1 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            whileHover={{ scale: 1.06 }}
            className="w-full h-full object-cover"
            style={{ transition: "transform 0.5s ease" }}
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

          {/* Category badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold backdrop-blur-sm text-white shadow-md"
            style={{ background: "oklch(0.68 0.18 55 / 0.92)" }}
          >
            <Tag className="w-3 h-3" />
            {event.category}
          </motion.div>

          {/* Date badge bottom */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="absolute bottom-4 right-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-black/50 text-white backdrop-blur-sm"
          >
            <Calendar className="w-3 h-3 text-gold" />
            {event.date}
          </motion.div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Marathi title */}
          <motion.h3
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, type: "spring", stiffness: 120 }}
            className="font-serif text-xl font-bold text-foreground leading-snug mb-1"
          >
            {event.titleMarathi}
          </motion.h3>

          {/* English subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.28 }}
            className="text-sm text-muted-foreground mb-4 italic"
          >
            {event.titleEnglish}
          </motion.p>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-keshari/30 via-border to-transparent mb-4" />

          {/* Description */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.34 }}
          >
            <p
              className={`text-sm text-foreground/80 leading-relaxed font-serif ${
                expanded ? "" : "line-clamp-3"
              }`}
            >
              {event.description}
            </p>

            <motion.button
              onClick={() => setExpanded(!expanded)}
              whileTap={{ scale: 0.94 }}
              className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-forest hover:text-keshari transition-colors"
            >
              {expanded ? (
                <>
                  <ChevronUp className="w-3.5 h-3.5" />
                  कमी करा / Less
                </>
              ) : (
                <>
                  <ChevronDown className="w-3.5 h-3.5" />
                  पुढे वाचा / Read more
                </>
              )}
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  )
}
