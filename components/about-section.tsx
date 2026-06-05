"use client"

import { useRef, useState, useEffect } from "react"
import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"

export default function AboutSection() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.8, 1, 1, 0.8])

  const features = [
    { icon: "/icons/3d-book.png", text: "5000+ पुस्तके", textEn: "Books Collection" },
    { icon: "/icons/3d-tree.png", text: "हरित परिसर", textEn: "Green Campus" },
    { icon: "/icons/newspaper.png", text: "दैनिक वृत्तपत्रे", textEn: "Daily Papers" },
    { icon: "/icons/3d-community.png", text: "समुदाय वाचन", textEn: "Community Reading" },
  ]

  return (
    <section
      id="about-section"
      ref={containerRef}
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-sea-light/20 to-background" />
      
      {/* Floating Leaves Animation */}
      {mounted && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-8 h-8 text-forest/20"
              initial={{ 
                x: Math.random() * 100 + "%",
                y: -50,
                rotate: 0 
              }}
              animate={{
                y: "120vh",
                rotate: 360,
                x: `${Math.random() * 100}%`
              }}
              transition={{
                duration: 15 + Math.random() * 10,
                repeat: Infinity,
                delay: i * 2,
                ease: "linear"
              }}
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22L6.66 19.7C7.14 19.87 7.64 20 8 20C19 20 22 3 22 3C21 5 14 5.25 9 6.25C4 7.25 2 11.5 2 13.5C2 15.5 3.75 17.25 3.75 17.25C7 8 17 8 17 8Z"/>
              </svg>
            </motion.div>
          ))}
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          style={{ y, opacity, scale }}
          className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center"
        >
          {/* Image Side */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-czUo7FO4B1hxjyw0fmOsFcGlsBZvOL.png"
                alt="Community reading at Dnyansampada"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest/40 to-transparent" />
            </div>
            
            {/* Floating Stats Card */}
            <motion.div
              className="absolute -bottom-6 -right-6 md:bottom-8 md:-right-8 bg-card rounded-xl shadow-xl p-4 md:p-6 border border-border"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-center">
                <span className="text-3xl md:text-4xl font-bold text-gradient-keshari">25+</span>
                <p className="text-sm text-foreground mt-1">वर्षांचा वारसा</p>
                <p className="text-xs text-muted-foreground">Years of Legacy</p>
              </div>
            </motion.div>
            
            {/* Decorative Elements */}
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-gradient-to-br from-keshari/20 to-gold/20 rounded-full blur-2xl" />
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-gradient-to-br from-forest/20 to-sea-mid/20 rounded-full blur-2xl" />
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.span
              className="inline-block px-4 py-1 rounded-full bg-forest/10 text-forest text-sm font-medium mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              आमची कथा - Our Story
            </motion.span>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-foreground mb-6 text-balance">
              <span className="text-gradient-forest">ज्ञानाचे</span> एक आश्रयस्थान
            </h2>
            
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              A Sanctuary of Knowledge
            </p>

            <div className="space-y-4 text-foreground/80">
              <p className="leading-relaxed">
                ज्ञानसंपदा सार्वजनिक वाचनालय हे नाशिक महानगरपालिकेद्वारे चालवले जाणारे एक सुंदर ग्रंथालय आहे. 
                हिरव्यागार वृक्षांच्या सावलीत वसलेले हे ठिकाण ज्ञान आणि शांततेचे केंद्र आहे.
              </p>
              
              <p className="leading-relaxed">
                Dnyansampada Public Library is a beautiful government library run by Nashik Municipal Corporation. 
                Nestled under the shade of lush green trees, this place is a center of knowledge and tranquility.
              </p>
            </div>

            {/* Feature Highlights */}
            <div className="grid grid-cols-2 gap-4 mt-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="flex items-center gap-3 p-3 rounded-lg bg-card/80 border border-border hover:border-keshari/30 transition-colors"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-keshari/10 to-gold/10 flex items-center justify-center">
                    <Image
                      src={feature.icon}
                      alt={feature.textEn}
                      width={28}
                      height={28}
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <p className="font-medium text-sm text-foreground">{feature.text}</p>
                    <p className="text-xs text-muted-foreground">{feature.textEn}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
