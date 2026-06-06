"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform, useInView } from "framer-motion"
import { EVENTS, EVENT_YEARS } from "@/data/events"
import { EventCard } from "@/components/event-card"

function YearMarker({ year }: { year: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-40px" })

  return (
    <div ref={ref} className="relative flex justify-center items-center my-14 z-10">
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="hidden md:block h-px flex-1 bg-gradient-to-r from-transparent to-border/60 origin-right"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ type: "spring", stiffness: 200, damping: 14, delay: 0.1 }}
        className="mx-6 px-8 py-2.5 rounded-full font-bold text-lg text-white shadow-xl z-10 shrink-0"
        style={{ background: "linear-gradient(135deg, oklch(0.68 0.18 55), oklch(0.75 0.14 85))" }}
      >
        {year}
      </motion.div>
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="hidden md:block h-px flex-1 bg-gradient-to-l from-transparent to-border/60 origin-left"
      />
    </div>
  )
}

function TimelineDot({ isInView }: { isInView: boolean }) {
  return (
    <div className="hidden md:flex absolute left-1/2 top-10 -translate-x-1/2 items-center justify-center z-20">
      <motion.div
        initial={{ scale: 0, opacity: 0.8 }}
        animate={isInView ? { scale: [0, 2.2, 1], opacity: [0.8, 0, 0] } : {}}
        transition={{ duration: 0.9, delay: 0.05 }}
        className="absolute w-6 h-6 rounded-full bg-keshari"
      />
      <motion.div
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : {}}
        transition={{ type: "spring", stiffness: 260, damping: 16, delay: 0.05 }}
        className="w-5 h-5 rounded-full border-4 border-background shadow-lg z-10"
        style={{ background: "linear-gradient(135deg, oklch(0.68 0.18 55), oklch(0.42 0.12 145))" }}
      />
    </div>
  )
}

function EventRow({ event, index }: { event: (typeof EVENTS)[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-60px" })
  const isLeft = index % 2 === 0

  return (
    <div ref={ref} className="relative mb-16">
      <TimelineDot isInView={isInView} />

      {/* Mobile: full width stacked */}
      <div className="md:hidden px-4">
        <EventCard event={event} side="left" index={index} isInView={isInView} />
      </div>

      {/* Desktop: alternating two-column layout */}
      <div className="hidden md:grid md:grid-cols-2 md:gap-0 md:items-start">
        {/* Left column */}
        <div className="pr-14">
          {isLeft && (
            <EventCard event={event} side="left" index={index} isInView={isInView} />
          )}
        </div>
        {/* Right column */}
        <div className="pl-14">
          {!isLeft && (
            <EventCard event={event} side="right" index={index} isInView={isInView} />
          )}
        </div>
      </div>
    </div>
  )
}

export function EventsTimeline() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

  const grouped = EVENT_YEARS.map((year) => ({
    year,
    events: EVENTS.filter((e) => e.dateISO.startsWith(year)),
  }))

  let globalIndex = 0

  return (
    <div ref={containerRef} className="relative max-w-6xl mx-auto px-4 md:px-8 py-8">
      {/* Growing center line — desktop only */}
      <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-border/40 overflow-hidden">
        <motion.div
          className="absolute top-0 left-0 right-0"
          style={{
            height: lineHeight,
            background:
              "linear-gradient(to bottom, oklch(0.68 0.18 55), oklch(0.75 0.14 85), oklch(0.42 0.12 145))",
          }}
        />
      </div>

      {grouped.map(({ year, events }) => (
        <div key={year}>
          <YearMarker year={year} />
          {events.map((event) => {
            const idx = globalIndex++
            return <EventRow key={event.id} event={event} index={idx} />
          })}
        </div>
      ))}
    </div>
  )
}
