"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

const categories = [
  { id: "all", label: "सर्व", labelEn: "All" },
  { id: "events", label: "कार्यक्रम", labelEn: "Events" },
  { id: "reading", label: "वाचन", labelEn: "Reading" },
  { id: "campus", label: "परिसर", labelEn: "Campus" },
]

const galleryImages = [
  {
    id: 1,
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-p9NhWB7z8BQ4zXMYxplCbjJZyxhXKI.png",
    title: "शिवजयंती उत्सव",
    titleEn: "Shiv Jayanti Celebration",
    category: "events",
    description: "छत्रपती शिवाजी महाराजांची जयंती साजरी"
  },
  {
    id: 2,
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-czUo7FO4B1hxjyw0fmOsFcGlsBZvOL.png",
    title: "वाचन कट्टा",
    titleEn: "Reading Corner",
    category: "reading",
    description: "समुदायिक वृत्तपत्र वाचन सत्र"
  },
  {
    id: 3,
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-CcRo9NqKwhNyRElh1BUmRhdObL3Mat.png",
    title: "ग्रंथालय प्रवेशद्वार",
    titleEn: "Library Entrance",
    category: "campus",
    description: "फुलांनी सजवलेले स्वागत द्वार"
  },
  {
    id: 4,
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-FZlXfNuj7UlpLNEVR5UhNYqPayMB1w.png",
    title: "स्वातंत्र्यदिन",
    titleEn: "Independence Day",
    category: "events",
    description: "राष्ट्रीय ध्वजारोहण समारंभ"
  },
  {
    id: 5,
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-czUo7FO4B1hxjyw0fmOsFcGlsBZvOL.png",
    title: "सकाळचे वाचन",
    titleEn: "Morning Reading",
    category: "reading",
    description: "सकाळच्या शांत वेळी अभ्यास"
  },
  {
    id: 6,
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-CcRo9NqKwhNyRElh1BUmRhdObL3Mat.png",
    title: "हरित परिसर",
    titleEn: "Green Campus",
    category: "campus",
    description: "वृक्षांच्या सावलीत ग्रंथालय"
  },
]

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedImage, setSelectedImage] = useState<typeof galleryImages[0] | null>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, 150])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  const filteredImages = selectedCategory === "all" 
    ? galleryImages 
    : galleryImages.filter(img => img.category === selectedCategory)

  const currentIndex = selectedImage ? filteredImages.findIndex(img => img.id === selectedImage.id) : -1

  const goToPrevious = () => {
    if (currentIndex > 0) {
      setSelectedImage(filteredImages[currentIndex - 1])
    }
  }

  const goToNext = () => {
    if (currentIndex < filteredImages.length - 1) {
      setSelectedImage(filteredImages[currentIndex + 1])
    }
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      {/* Hero Section */}
      <section ref={heroRef} className="relative h-[50vh] overflow-hidden">
        <motion.div style={{ y }} className="absolute inset-0">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-czUo7FO4B1hxjyw0fmOsFcGlsBZvOL.png"
            alt="Gallery hero"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-sea-deep/80 via-sea-mid/60 to-background" />
        </motion.div>
        
        <motion.div 
          style={{ opacity }}
          className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4"
        >
          <motion.span
            className="inline-block px-4 py-1 rounded-full bg-white/10 backdrop-blur-md text-white text-sm mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            गॅलरी • Gallery
          </motion.span>
          
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-serif text-white mb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            आठवणींचा <span className="text-keshari">खजिना</span>
          </motion.h1>
          
          <motion.p
            className="text-lg md:text-xl text-white/80 max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            A Treasury of Memories
          </motion.p>
        </motion.div>
      </section>

      {/* Filter Tabs */}
      <section className="py-8 sticky top-16 md:top-20 z-30 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            className="flex flex-wrap justify-center gap-2 md:gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {categories.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 md:px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === category.id
                    ? "bg-gradient-to-r from-keshari to-gold text-white shadow-lg"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="hidden md:inline">{category.label} • </span>
                {category.labelEn}
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            layout
          >
            <AnimatePresence mode="popLayout">
              {filteredImages.map((image, index) => (
                <motion.div
                  key={image.id}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="group cursor-pointer"
                  onClick={() => setSelectedImage(image)}
                >
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
                    <Image
                      src={image.src}
                      alt={image.titleEn}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Hover Content */}
                    <div className="absolute inset-0 flex flex-col justify-end p-6 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <h3 className="text-lg font-serif text-white mb-1">{image.title}</h3>
                      <p className="text-sm text-keshari">{image.titleEn}</p>
                    </div>
                    
                    {/* Corner Accent */}
                    <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gradient-to-br from-keshari to-gold flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="text-white text-xs">+</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-10"
            >
              <X size={24} />
            </button>

            {/* Navigation */}
            {currentIndex > 0 && (
              <button
                onClick={(e) => { e.stopPropagation(); goToPrevious(); }}
                className="absolute left-4 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
              >
                <ChevronLeft size={24} />
              </button>
            )}
            {currentIndex < filteredImages.length - 1 && (
              <button
                onClick={(e) => { e.stopPropagation(); goToNext(); }}
                className="absolute right-4 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
              >
                <ChevronRight size={24} />
              </button>
            )}

            {/* Image */}
            <motion.div
              className="relative max-w-4xl w-full"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                <Image
                  src={selectedImage.src}
                  alt={selectedImage.titleEn}
                  fill
                  className="object-cover"
                />
              </div>
              
              {/* Image Info */}
              <motion.div
                className="mt-4 text-center"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <h3 className="text-xl font-serif text-white mb-1">{selectedImage.title}</h3>
                <p className="text-keshari mb-2">{selectedImage.titleEn}</p>
                <p className="text-white/70 text-sm">{selectedImage.description}</p>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </main>
  )
}
