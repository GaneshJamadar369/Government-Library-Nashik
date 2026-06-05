"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

// Seeded random number generator for consistent SSR/client rendering
function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000
  return x - Math.floor(x)
}

const books = [
  { id: 1, title: "भगवद्गीता", image: "/books/bhagavad-gita.png" },
  { id: 2, title: "वेद", image: "/books/vedas.png" },
  { id: 3, title: "उपनिषद्", image: "/books/upanishad.png" },
  { id: 4, title: "Brief History of Time", image: "/books/brief-history-time.png" },
  { id: 5, title: "रामायण", image: "/books/ramayana.png" },
]

const wisdomWords = [
  { text: "ज्ञान", meaning: "Knowledge" },
  { text: "विद्या", meaning: "Learning" },
  { text: "प्रज्ञा", meaning: "Wisdom" },
  { text: "शांति", meaning: "Peace" },
  { text: "सत्य", meaning: "Truth" },
  { text: "धर्म", meaning: "Duty" },
]

const shloka = {
  sanskrit: "विद्या ददाति विनयं विनयाद्याति पात्रताम्",
  meaning: "Knowledge gives humility, from humility comes worthiness",
  meaningMr: "विद्या विनय देते, विनयातून पात्रता येते"
}

interface IntroAnimationProps {
  onComplete: () => void
}

export default function IntroAnimation({ onComplete }: IntroAnimationProps) {
  const [mounted, setMounted] = useState(false)
  const [phase, setPhase] = useState(0)
  // Phases: 0=initial, 1=dot appears, 2=books rise, 3=words float, 4=quote reveal, 5=logo, 6=done

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleSkip = useCallback(() => {
    setPhase(6)
    onComplete()
  }, [onComplete])

  useEffect(() => {
    const timers: NodeJS.Timeout[] = []
    
    // Phase 1: Dot appears (after 500ms)
    timers.push(setTimeout(() => setPhase(1), 500))
    
    // Phase 2: Books rise from ocean floor (after 2s)
    timers.push(setTimeout(() => setPhase(2), 2000))
    
    // Phase 3: Wisdom words float up (after 4s)
    timers.push(setTimeout(() => setPhase(3), 4000))
    
    // Phase 4: Quote reveals (after 6.5s)
    timers.push(setTimeout(() => setPhase(4), 6500))
    
    // Phase 5: Logo appears (after 11s)
    timers.push(setTimeout(() => setPhase(5), 11000))
    
    // Phase 6: Complete (after 14s)
    timers.push(setTimeout(() => {
      setPhase(6)
      onComplete()
    }, 14000))
    
    return () => timers.forEach(clearTimeout)
  }, [onComplete])

  // Generate particles with deterministic values for SSR consistency
  const particles = useMemo(() => {
    return [...Array(30)].map((_, i) => ({
      id: i,
      width: seededRandom(i * 1) * 3 + 1,
      height: seededRandom(i * 2) * 3 + 1,
      left: seededRandom(i * 3) * 100,
      top: seededRandom(i * 4) * 100,
      opacity: seededRandom(i * 5) * 0.3 + 0.1,
      yOffset: -100 - seededRandom(i * 6) * 200,
      xOffset: (seededRandom(i * 7) - 0.5) * 50,
      duration: 10 + seededRandom(i * 8) * 10,
      delay: seededRandom(i * 9) * 10,
    }))
  }, [])

  if (!mounted || phase === 6) return null

  return (
    <motion.div
      className="fixed inset-0 z-50 overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.2, ease: "easeInOut" }}
    >
      {/* Deep Ocean Background with Gradient Layers */}
      <div className="absolute inset-0">
        {/* Base gradient - deep ocean */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a1628] via-[#0d2847] to-[#051525]" />
        
        {/* Underwater light rays */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={`ray-${i}`}
              className="absolute top-0 w-32 h-full opacity-[0.03]"
              style={{
                left: `${15 + i * 18}%`,
                background: "linear-gradient(180deg, rgba(135,206,235,0.8) 0%, transparent 70%)",
                transform: "skewX(-15deg)",
              }}
              animate={{
                opacity: [0.02, 0.06, 0.02],
                scaleX: [1, 1.2, 1],
              }}
              transition={{
                duration: 8 + i * 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.5,
              }}
            />
          ))}
        </div>
        
        {/* Subtle caustic light patterns */}
        <motion.div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage: `radial-gradient(ellipse at 30% 20%, rgba(100,200,255,0.3) 0%, transparent 50%),
                              radial-gradient(ellipse at 70% 40%, rgba(80,180,220,0.2) 0%, transparent 40%),
                              radial-gradient(ellipse at 50% 60%, rgba(60,160,200,0.15) 0%, transparent 60%)`,
          }}
          animate={{
            opacity: [0.05, 0.1, 0.05],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Floating particles (dust/plankton) */}
        <div className="absolute inset-0">
          {particles.map((p) => (
            <motion.div
              key={`particle-${p.id}`}
              className="absolute rounded-full"
              style={{
                width: p.width,
                height: p.height,
                left: `${p.left}%`,
                top: `${p.top}%`,
                backgroundColor: `rgba(255,255,255,${p.opacity})`,
              }}
              animate={{
                y: [0, p.yOffset],
                x: [0, p.xOffset],
                opacity: [0, 0.5, 0],
              }}
              transition={{
                duration: p.duration,
                repeat: Infinity,
                delay: p.delay,
                ease: "linear",
              }}
            />
          ))}
        </div>
        
        {/* Ocean floor gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-[#020810] via-[#051020] to-transparent" />
      </div>

      {/* Keshari Dot - Central Element */}
      <AnimatePresence>
        {phase >= 1 && phase < 5 && (
          <motion.div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: phase === 1 ? [0, 1.3, 1] : 1,
              opacity: phase >= 4 ? 0 : 1,
            }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ 
              scale: { duration: 1.2, ease: [0.34, 1.56, 0.64, 1] },
              opacity: { duration: 0.8 }
            }}
          >
            <motion.div
              className="relative"
              animate={phase >= 2 && phase < 4 ? {
                y: [0, -20, 0],
                rotate: [0, 5, -5, 0],
              } : {}}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              {/* Glow effect */}
              <div className="absolute inset-0 w-16 h-16 rounded-full bg-gradient-to-br from-[#FF6B35] to-[#F7C548] blur-xl opacity-60" />
              
              {/* Main dot */}
              <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-[#FF8C42] via-[#FF6B35] to-[#E85D04] shadow-[0_0_40px_rgba(255,107,53,0.5)]">
                <div className="absolute inset-1 rounded-full bg-gradient-to-br from-[#FFB347] to-transparent opacity-50" />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Books Rising from Ocean Floor */}
      <div className="absolute bottom-0 left-0 right-0 h-80 flex items-end justify-center gap-4 md:gap-8 px-4 pb-8 z-10">
        {books.map((book, index) => (
          <motion.div
            key={book.id}
            className="relative"
            initial={{ y: 300, opacity: 0, rotateY: -30 }}
            animate={phase >= 2 ? {
              y: phase >= 4 ? 300 : 0,
              opacity: phase >= 4 ? 0 : 1,
              rotateY: 0,
            } : { y: 300, opacity: 0 }}
            transition={{
              y: { duration: 1.5, delay: index * 0.2, ease: [0.25, 0.46, 0.45, 0.94] },
              opacity: { duration: 0.8, delay: index * 0.2 },
              rotateY: { duration: 1, delay: index * 0.2 + 0.3 },
            }}
          >
            {/* Book with floating animation */}
            <motion.div
              className="relative"
              animate={phase >= 2 && phase < 4 ? {
                y: [0, -15 - index * 3, 0],
                rotateZ: [0, 2, -2, 0],
              } : {}}
              transition={{
                duration: 3 + index * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: index * 0.3,
              }}
            >
              {/* Book glow */}
              <div className="absolute -inset-2 bg-gradient-to-t from-[#FF6B35]/20 to-transparent blur-lg rounded-lg" />
              
              {/* Book image */}
              <div className="relative w-20 h-28 md:w-28 md:h-40 rounded-md overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.5)] transform-gpu">
                <Image
                  src={book.image}
                  alt={book.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 80px, 112px"
                  priority
                />
                {/* Book spine highlight */}
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-white/30 via-white/10 to-transparent" />
              </div>
            </motion.div>

            {/* Rising wisdom words from each book */}
            {phase === 3 && wisdomWords[index] && (
              <motion.div
                className="absolute -top-4 left-1/2 -translate-x-1/2 text-center"
                initial={{ y: 0, opacity: 0 }}
                animate={{ y: -80, opacity: [0, 1, 1, 0] }}
                transition={{ duration: 2.5, delay: index * 0.4, ease: "easeOut" }}
              >
                <span className="block text-[#87CEEB] text-lg md:text-xl font-serif drop-shadow-[0_0_10px_rgba(135,206,235,0.5)]">
                  {wisdomWords[index].text}
                </span>
                <span className="block text-white/50 text-xs mt-1">
                  {wisdomWords[index].meaning}
                </span>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Sanskrit Shloka Quote Reveal */}
      <AnimatePresence>
        {phase >= 4 && phase < 5 && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center px-6 z-30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <div className="text-center max-w-4xl">
              {/* Sanskrit quote with character-by-character reveal */}
              <motion.h2 
                className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] via-[#FFA500] to-[#FF8C42] mb-8 leading-relaxed tracking-wide"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                {shloka.sanskrit.split("").map((char, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ 
                      duration: 0.3, 
                      delay: i * 0.05,
                      ease: "easeOut"
                    }}
                  >
                    {char}
                  </motion.span>
                ))}
              </motion.h2>
              
              {/* English meaning */}
              <motion.p
                className="text-base sm:text-lg md:text-2xl text-[#87CEEB] font-light tracking-wide mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 2.5 }}
              >
                {shloka.meaning}
              </motion.p>
              
              {/* Marathi meaning */}
              <motion.p
                className="text-sm sm:text-base md:text-lg text-[#FF8C42] font-serif"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 3 }}
              >
                {shloka.meaningMr}
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Logo Reveal */}
      <AnimatePresence>
        {phase >= 5 && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2 }}
          >
            {/* Background fade to lighter */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-b from-[#0d2847] via-[#1a4a6e] to-[#0d2847]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5 }}
            />
            
            <motion.div className="relative text-center z-10">
              {/* Logo Circle */}
              <motion.div
                className="relative w-28 h-28 md:w-36 md:h-36 mx-auto mb-8"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ 
                  duration: 1.2, 
                  ease: [0.34, 1.56, 0.64, 1],
                  delay: 0.3 
                }}
              >
                {/* Outer glow */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#FF6B35] to-[#228B22] blur-2xl opacity-50" />
                
                {/* Main circle */}
                <div className="relative w-full h-full rounded-full bg-gradient-to-br from-[#FF8C42] via-[#FF6B35] to-[#228B22] p-1 shadow-[0_0_60px_rgba(255,107,53,0.4)]">
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-[#0d2847] to-[#051525] flex items-center justify-center">
                    <span className="text-4xl md:text-5xl font-serif text-transparent bg-clip-text bg-gradient-to-br from-[#FFD700] to-[#FF8C42]">
                      ज्ञा
                    </span>
                  </div>
                </div>
              </motion.div>
              
              {/* Library Name */}
              <motion.h1
                className="text-4xl md:text-6xl lg:text-7xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] via-[#FFA500] to-[#FF6B35] mb-4"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                ज्ञानसंपदा
              </motion.h1>
              
              <motion.p
                className="text-xl md:text-2xl text-[#87CEEB] font-light mb-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.2 }}
              >
                सार्वजनिक वाचनालय ग्रंथालय
              </motion.p>
              
              <motion.p
                className="text-sm md:text-base text-white/60 tracking-widest uppercase"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 1.5 }}
              >
                Public Library & Reading Room, Nashik
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Skip Button */}
      <motion.button
        onClick={handleSkip}
        className="absolute bottom-6 right-6 md:bottom-8 md:right-8 px-5 py-2.5 text-white/50 hover:text-white border border-white/20 hover:border-white/50 rounded-full text-sm font-light tracking-wide transition-all duration-300 backdrop-blur-sm hover:backdrop-blur-md z-50"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.5 }}
        whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
        whileTap={{ scale: 0.95 }}
      >
        Skip Intro
      </motion.button>
    </motion.div>
  )
}
