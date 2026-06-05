"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"

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
]

export default function EventsSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const x = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"])

  return (
    <section
      ref={containerRef}
      className="relative py-24 md:py-32 overflow-hidden bg-gradient-to-b from-background via-forest/5 to-background"
    >
      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-1 rounded-full bg-keshari/10 text-keshari text-sm font-medium mb-4">
            कार्यक्रम • Events
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-foreground mb-4">
            आमचे <span className="text-gradient-keshari">कार्यक्रम</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our Events & Celebrations
          </p>
        </motion.div>
      </div>

      {/* Horizontal Scrolling Cards */}
      <motion.div
        style={{ x }}
        className="flex gap-6 md:gap-8 px-8"
      >
        {events.map((event, index) => (
          <motion.div
            key={index}
            className="flex-shrink-0 w-80 md:w-96"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className="group relative h-96 rounded-2xl overflow-hidden shadow-xl">
              <Image
                src={event.image}
                alt={event.titleEn}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              
              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <motion.h3
                  className="text-xl md:text-2xl font-serif text-white mb-2"
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  {event.title}
                </motion.h3>
                <p className="text-sm text-keshari font-medium mb-2">{event.titleEn}</p>
                <p className="text-sm text-white/80">{event.description}</p>
              </div>
              
              {/* Hover Effect Border */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-keshari/50 rounded-2xl transition-colors duration-300" />
            </div>
          </motion.div>
        ))}
        
        {/* Duplicate for infinite feel */}
        {events.map((event, index) => (
          <motion.div
            key={`dup-${index}`}
            className="flex-shrink-0 w-80 md:w-96"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: (index + events.length) * 0.1 }}
          >
            <div className="group relative h-96 rounded-2xl overflow-hidden shadow-xl">
              <Image
                src={event.image}
                alt={event.titleEn}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-xl md:text-2xl font-serif text-white mb-2">{event.title}</h3>
                <p className="text-sm text-keshari font-medium mb-2">{event.titleEn}</p>
                <p className="text-sm text-white/80">{event.description}</p>
              </div>
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-keshari/50 rounded-2xl transition-colors duration-300" />
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
