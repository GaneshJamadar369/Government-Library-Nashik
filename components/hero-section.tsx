"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"

const heroImages = [
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-p9NhWB7z8BQ4zXMYxplCbjJZyxhXKI.png",
    alt: "Celebration at Dnyansampada with Shivaji Maharaj portrait",
    title: "सांस्कृतिक वारसा",
    titleEn: "Cultural Heritage",
    description: "Celebrating our rich traditions and history"
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-czUo7FO4B1hxjyw0fmOsFcGlsBZvOL.png",
    alt: "Community reading session under trees",
    title: "वाचन कट्टा",
    titleEn: "Reading Corner",
    description: "Where community gathers to read and learn"
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-CcRo9NqKwhNyRElh1BUmRhdObL3Mat.png",
    alt: "Library entrance with marigold decorations",
    title: "हरित परिसर",
    titleEn: "Green Campus",
    description: "A serene space surrounded by nature"
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-FZlXfNuj7UlpLNEVR5UhNYqPayMB1w.png",
    alt: "Library building with Indian flag",
    title: "ज्ञानसंपदा ग्रंथालय",
    titleEn: "Dnyansampada Library",
    description: "Serving the community since its establishment"
  }
]

export default function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)

  const nextSlide = useCallback(() => {
    setDirection(1)
    setCurrentIndex((prev) => (prev + 1) % heroImages.length)
  }, [])

  const prevSlide = useCallback(() => {
    setDirection(-1)
    setCurrentIndex((prev) => (prev - 1 + heroImages.length) % heroImages.length)
  }, [])

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000)
    return () => clearInterval(timer)
  }, [nextSlide])

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 1.1,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.9,
    }),
  }

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Background Carousel */}
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.5 },
            scale: { duration: 0.5 },
          }}
          className="absolute inset-0"
        >
          <Image
            src={heroImages[currentIndex].src}
            alt={heroImages[currentIndex].alt}
            fill
            priority
            className="object-cover"
          />
          {/* Gradient Overlay - Improved for better text visibility */}
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute inset-0 bg-gradient-to-b from-sea-deep/80 via-sea-mid/60 to-forest/90" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="max-w-4xl"
        >
          {/* Main Title */}
          <motion.h1
            className="text-4xl sm:text-5xl md:text-7xl font-serif text-white mb-4 text-balance"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            ज्ञानसंपदा
          </motion.h1>
          
          <motion.h2
            className="text-xl sm:text-2xl md:text-3xl font-serif text-keshari mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            सार्वजनिक वाचनालय ग्रंथालय
          </motion.h2>
          
          <motion.p
            className="text-base sm:text-lg md:text-xl text-white/80 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            A sanctuary of knowledge nestled in nature&apos;s embrace. Where trees whisper wisdom and books illuminate minds.
          </motion.p>

          {/* Current Slide Info */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="mb-8"
            >
              <span className="inline-block px-4 py-2 rounded-full bg-white/10 backdrop-blur-md text-white text-sm border border-white/20">
                {heroImages[currentIndex].title} • {heroImages[currentIndex].titleEn}
              </span>
            </motion.div>
          </AnimatePresence>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <a
              href="#about-section"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-keshari to-gold text-white rounded-full font-medium hover:shadow-lg hover:shadow-keshari/30 transition-all duration-300 transform hover:scale-105"
            >
              <span>Explore Our Journey</span>
              <motion.span
                animate={{ y: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                ↓
              </motion.span>
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Navigation Arrows */}
      <div className="absolute inset-y-0 left-0 right-0 z-20 flex items-center justify-between px-4 pointer-events-none">
        <motion.button
          onClick={prevSlide}
          className="p-3 rounded-full bg-white/10 backdrop-blur-md text-white border border-white/20 hover:bg-white/20 transition-all pointer-events-auto"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronLeft size={24} />
        </motion.button>
        
        <motion.button
          onClick={nextSlide}
          className="p-3 rounded-full bg-white/10 backdrop-blur-md text-white border border-white/20 hover:bg-white/20 transition-all pointer-events-auto"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronRight size={24} />
        </motion.button>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {heroImages.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => {
              setDirection(index > currentIndex ? 1 : -1)
              setCurrentIndex(index)
            }}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? "w-8 bg-gradient-to-r from-keshari to-gold" 
                : "w-2 bg-white/50 hover:bg-white/70"
            }`}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-24 left-1/2 -translate-x-1/2 z-20"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 rounded-full border-2 border-white/30 flex justify-center pt-2">
          <motion.div
            className="w-1.5 h-3 rounded-full bg-white/60"
            animate={{ y: [0, 12, 0], opacity: [1, 0, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  )
}
