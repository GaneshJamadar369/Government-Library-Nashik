"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"

const navLinks = [
  { href: "/", label: "Home", labelMr: "मुखपृष्ठ" },
  { href: "/about", label: "About", labelMr: "आमच्याबद्दल" },
  { href: "/gallery", label: "Gallery", labelMr: "गॅलरी" },
  { href: "/success-stories", label: "Success Stories", labelMr: "यशोगाथा" },
  { href: "/contact", label: "Contact", labelMr: "संपर्क" },
]

interface NavbarProps {
  showLanguageToggle?: boolean
}

export default function Navbar({ showLanguageToggle = true }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [language, setLanguage] = useState<"en" | "mr">("mr")

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled 
            ? "bg-card/95 backdrop-blur-md shadow-lg border-b border-border" 
            : "bg-gradient-to-b from-sea-deep/50 to-transparent"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <motion.div
                className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-keshari via-gold to-forest flex items-center justify-center shadow-lg"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-white font-serif text-lg md:text-xl">ज्ञा</span>
              </motion.div>
              <div className="hidden sm:block">
                <h1 className={`font-serif text-lg md:text-xl transition-colors ${
                  isScrolled ? "text-foreground" : "text-white"
                }`}>
                  ज्ञानसंपदा
                </h1>
                <p className={`text-xs transition-colors ${
                  isScrolled ? "text-muted-foreground" : "text-white/70"
                }`}>
                  Public Library, Nashik
                </p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-4 py-2 rounded-full text-sm font-medium transition-colors group ${
                    isScrolled 
                      ? "text-foreground hover:text-primary" 
                      : "text-white/90 hover:text-white"
                  }`}
                >
                  <span>{language === "mr" ? link.labelMr : link.label}</span>
                  <motion.span
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-keshari to-gold rounded-full group-hover:w-3/4 transition-all duration-300"
                    layoutId="navUnderline"
                  />
                </Link>
              ))}
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-3">
              {/* Language Toggle */}
              {showLanguageToggle && (
                <motion.button
                  onClick={() => setLanguage(language === "en" ? "mr" : "en")}
                  className={`hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full text-sm border transition-all ${
                    isScrolled
                      ? "border-border hover:border-primary text-foreground"
                      : "border-white/30 hover:border-white text-white"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="w-5 h-5 rounded-full bg-gradient-to-br from-keshari to-gold flex items-center justify-center text-xs text-white">
                    {language === "en" ? "A" : "अ"}
                  </span>
                  <span>{language === "en" ? "English" : "मराठी"}</span>
                </motion.button>
              )}

              {/* Mobile Menu Button */}
              <motion.button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`lg:hidden p-2 rounded-full transition-colors ${
                  isScrolled 
                    ? "text-foreground hover:bg-muted" 
                    : "text-white hover:bg-white/10"
                }`}
                whileTap={{ scale: 0.9 }}
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-30 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            
            <motion.div
              className="absolute top-16 right-4 left-4 bg-card rounded-2xl shadow-2xl overflow-hidden border border-border"
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ type: "spring", damping: 25 }}
            >
              <div className="p-4 space-y-1">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center justify-between px-4 py-3 rounded-xl text-foreground hover:bg-muted transition-colors"
                    >
                      <span className="font-medium">{link.labelMr}</span>
                      <span className="text-sm text-muted-foreground">{link.label}</span>
                    </Link>
                  </motion.div>
                ))}
                
                {/* Mobile Language Toggle */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navLinks.length * 0.05 }}
                  className="pt-3 border-t border-border mt-3"
                >
                  <button
                    onClick={() => setLanguage(language === "en" ? "mr" : "en")}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-keshari/10 to-gold/10 text-foreground"
                  >
                    <span className="w-6 h-6 rounded-full bg-gradient-to-br from-keshari to-gold flex items-center justify-center text-sm text-white">
                      {language === "en" ? "A" : "अ"}
                    </span>
                    <span>{language === "en" ? "Switch to मराठी" : "Switch to English"}</span>
                  </button>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
