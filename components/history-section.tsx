"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"

const timelineEvents = [
  { year: "2017", event: "ग्रंथालयाची स्थापना", eventEn: "Library Established" },
  { year: "2018", event: "वाचन कट्टा सुरुवात", eventEn: "Reading Corner Started" },
  { year: "2019", event: "5000+ पुस्तके", eventEn: "5000+ Books Collection" },
  { year: "2020", event: "ऑनलाइन सेवा", eventEn: "Online Services" },
  { year: "2023", event: "25 वर्षे पूर्ण", eventEn: "25 Years Complete" },
]

export default function HistorySection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

  return (
    <section
      ref={containerRef}
      className="relative py-24 md:py-32 overflow-hidden bg-gradient-to-b from-background via-sea-light/10 to-background"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-1 rounded-full bg-sea-mid/10 text-sea-deep text-sm font-medium mb-4">
            इतिहास • History
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-foreground mb-4">
            आमचा <span className="text-gradient-forest">प्रवास</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our Journey Through the Years
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Timeline */}
          <div className="relative">
            {/* Animated Line */}
            <div className="absolute left-4 md:left-6 top-0 bottom-0 w-0.5 bg-border">
              <motion.div
                className="absolute top-0 left-0 right-0 bg-gradient-to-b from-keshari via-gold to-forest"
                style={{ height: lineHeight }}
              />
            </div>

            {/* Timeline Items */}
            <div className="space-y-8">
              {timelineEvents.map((item, index) => (
                <motion.div
                  key={index}
                  className="relative flex gap-6 md:gap-8 items-start pl-12 md:pl-16"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  {/* Dot */}
                  <motion.div
                    className="absolute left-2 md:left-4 w-4 h-4 rounded-full bg-gradient-to-br from-keshari to-gold border-4 border-background shadow-lg"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.1 + 0.2 }}
                  />

                  {/* Content */}
                  <div className="flex-1">
                    <span className="inline-block px-3 py-1 rounded-full bg-keshari/10 text-keshari text-sm font-bold mb-2">
                      {item.year}
                    </span>
                    <h3 className="text-lg md:text-xl font-serif text-foreground">{item.event}</h3>
                    <p className="text-sm text-muted-foreground">{item.eventEn}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Image Showcase */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-CcRo9NqKwhNyRElh1BUmRhdObL3Mat.png"
                alt="Library entrance"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest/60 via-transparent to-transparent" />
              
              {/* Overlay Text */}
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                >
                  <h3 className="text-2xl md:text-3xl font-serif text-white mb-2">
                    हरित वारसा
                  </h3>
                  <p className="text-white/80">
                    A green legacy growing with every reader
                  </p>
                </motion.div>
              </div>
            </div>

            {/* Floating Decorative Elements */}
            <motion.div
              className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-keshari/30 to-gold/30 rounded-full blur-xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5]
              }}
              transition={{ duration: 4, repeat: Infinity }}
            />
            <motion.div
              className="absolute -bottom-4 -left-4 w-24 h-24 bg-gradient-to-br from-forest/30 to-sea-mid/30 rounded-full blur-xl"
              animate={{
                scale: [1.2, 1, 1.2],
                opacity: [0.5, 0.8, 0.5]
              }}
              transition={{ duration: 4, repeat: Infinity, delay: 2 }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
