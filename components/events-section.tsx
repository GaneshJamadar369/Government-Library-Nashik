"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion } from "framer-motion"

const events = [
  {
    title: "शिवजयंती उत्सव",
    titleEn: "Shiv Jayanti Celebration",
    description: "छत्रपती शिवाजी महाराजांची ३९४ वी जयंती साजरी",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-p9NhWB7z8BQ4zXMYxplCbjJZyxhXKI.png",
  },
  {
    title: "वाचन कट्टा",
    titleEn: "Reading Sessions",
    description: "दररोज सकाळी समुदायिक वृत्तपत्र वाचन",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-czUo7FO4B1hxjyw0fmOsFcGlsBZvOL.png",
  },
  {
    title: "स्वातंत्र्यदिन",
    titleEn: "Independence Day",
    description: "राष्ट्रीय सण आणि कार्यक्रम",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-FZlXfNuj7UlpLNEVR5UhNYqPayMB1w.png",
  },
  {
    title: "गुणगौरव सोहळा",
    titleEn: "Student Felicitation",
    description: "गुणवंत विद्यार्थ्यांचा सत्कार सोहळा",
    image: "https://res.cloudinary.com/djgkoxguj/image/upload/dyansampada/events/dyansampada/events/event_04.jpg",
  },
  {
    title: "जयंती उत्सव",
    titleEn: "Birth Anniversary",
    description: "महापुरुषांच्या जयंत्या उत्साहाने साजऱ्या",
    image: "https://res.cloudinary.com/djgkoxguj/image/upload/dyansampada/events/dyansampada/events/event_12.jpg",
  },
  {
    title: "अभ्यासिका उदघाटन",
    titleEn: "Study Room Inauguration",
    description: "UPSC/MPSC विद्यार्थ्यांसाठी अभ्यासिका कक्ष",
    image: "https://res.cloudinary.com/djgkoxguj/image/upload/dyansampada/events/dyansampada/events/event_14.jpg",
  },
]

export default function EventsSection() {
  const trackRef = useRef<HTMLDivElement>(null)

  return (
    <section className="relative py-24 md:py-32 overflow-hidden bg-gradient-to-b from-background via-forest/5 to-background">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <motion.div className="text-center"
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <span className="inline-block px-4 py-1 rounded-full bg-keshari/10 text-keshari text-sm font-medium mb-4">
            कार्यक्रम • Events
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-foreground mb-4">
            आमचे <span className="text-gradient-keshari">कार्यक्रम</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Our Events & Celebrations</p>
          <p className="text-sm text-muted-foreground mt-2">← स्वाइप करा / Drag to scroll →</p>
        </motion.div>
      </div>

      {/* Draggable carousel */}
      <motion.div
        ref={trackRef}
        className="flex gap-5 px-6 cursor-grab active:cursor-grabbing select-none overflow-x-auto pb-4"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        drag="x"
        dragConstraints={{ right: 0, left: -((events.length - 1) * 340) }}
        dragElastic={0.1}
        dragTransition={{ bounceStiffness: 300, bounceDamping: 30 }}
        whileTap={{ cursor: "grabbing" }}
      >
        {events.map((event, index) => (
          <motion.div
            key={index}
            className="flex-shrink-0 w-72 md:w-80"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
            whileHover={{ scale: 1.03 }}
          >
            <div className="group relative h-96 rounded-2xl overflow-hidden shadow-xl">
              <Image
                src={event.image}
                alt={event.titleEn}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110 pointer-events-none"
                draggable={false}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-xl md:text-2xl font-serif text-white mb-1">{event.title}</h3>
                <p className="text-sm text-keshari font-medium mb-1">{event.titleEn}</p>
                <p className="text-sm text-white/80">{event.description}</p>
              </div>
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-keshari/50 rounded-2xl transition-colors duration-300" />
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Scroll hint dots */}
      <div className="flex justify-center gap-2 mt-6">
        {events.map((_, i) => (
          <div key={i} className={`w-2 h-2 rounded-full transition-all ${i === 0 ? "bg-keshari w-6" : "bg-muted-foreground/30"}`} />
        ))}
      </div>
    </section>
  )
}
