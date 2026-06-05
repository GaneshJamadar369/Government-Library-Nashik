"use client"

import { useMemo, useState, useEffect } from "react"
import { motion } from "framer-motion"
import Image from "next/image"

// Seeded random for SSR consistency
function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000
  return x - Math.floor(x)
}

const leafImages = [
  "/images/leaf-1.png",
  "/images/leaf-2.png", 
  "/images/leaf-3.png",
]

interface FallingLeavesProps {
  count?: number
  blur?: boolean
}

export function FallingLeaves({ count = 15, blur = true }: FallingLeavesProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const leaves = useMemo(() => {
    return [...Array(count)].map((_, i) => ({
      id: i,
      leaf: leafImages[Math.floor(seededRandom(i * 1) * leafImages.length)],
      startX: seededRandom(i * 2) * 100,
      endX: seededRandom(i * 3) * 100,
      size: 20 + seededRandom(i * 4) * 40,
      duration: 15 + seededRandom(i * 5) * 20,
      delay: seededRandom(i * 6) * 15,
      rotation: seededRandom(i * 7) * 360,
      rotationEnd: seededRandom(i * 8) * 720 - 360,
      opacity: 0.15 + seededRandom(i * 9) * 0.25,
      blurAmount: blur ? 2 + seededRandom(i * 10) * 4 : 0,
    }))
  }, [count, blur])

  if (!mounted) {
    return null
  }

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      {leaves.map((leaf) => (
        <motion.div
          key={leaf.id}
          className="absolute"
          style={{
            left: `${leaf.startX}%`,
            top: -60,
            width: leaf.size,
            height: leaf.size,
            filter: `blur(${leaf.blurAmount}px)`,
            opacity: leaf.opacity,
          }}
          animate={{
            y: ["0vh", "110vh"],
            x: [`${leaf.startX}%`, `${leaf.endX}%`],
            rotate: [leaf.rotation, leaf.rotationEnd],
          }}
          transition={{
            duration: leaf.duration,
            delay: leaf.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <Image
            src={leaf.leaf}
            alt=""
            width={leaf.size}
            height={leaf.size}
            className="w-full h-full object-contain"
            priority
          />
        </motion.div>
      ))}
    </div>
  )
}
