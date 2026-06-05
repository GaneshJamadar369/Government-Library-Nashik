"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function Footer() {
  const [isDevModalOpen, setIsDevModalOpen] = useState(false)
  return (
    <footer className="relative py-16 md:py-24 overflow-hidden bg-gradient-to-b from-background to-sea-deep/20">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
          backgroundSize: '32px 32px'
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Developer Appreciation */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-1 rounded-full bg-forest/10 text-forest text-sm font-medium mb-4">
            विकासक • Developers
          </span>
          <h2 className="text-2xl md:text-3xl font-serif text-foreground mb-4">
            With <span className="text-keshari font-bold">Love</span> by the Development Team
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-6">
            This website is developed with love and dedication to preserve and promote the legacy of Dnyansampada Library.
          </p>

          {/* Compact, High-Visibility Info Badge */}
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 px-6 py-3 rounded-2xl bg-[#FAF6F0] border border-[#EBE3D5] shadow-sm">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-[#F4EFE6] flex items-center justify-center font-serif text-sm font-bold text-[#2F5233]">GJ</span>
              <div className="text-left">
                <span className="text-[10px] text-[#8D7E73] font-bold block uppercase tracking-wider">DEVELOPER</span>
                <span className="font-serif font-semibold text-[#2B1B17] text-base">Ganesh Jamadar</span>
              </div>
            </div>
            
            <div className="hidden sm:block h-8 w-px bg-[#EBE3D5]" />

            {/* Direct Links */}
            <div className="flex items-center gap-2">
              <a
                href="https://www.linkedin.com/in/ganeshjamadar/"
                target="_blank"
                rel="noopener noreferrer"
                title="LinkedIn"
                className="p-2 rounded-full bg-[#F4EFE6] text-[#2F5233] hover:bg-[#E7AC6F]/20 transition-all cursor-pointer"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
              </a>
              <a
                href="https://ganeshjamadar.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                title="Portfolio"
                className="p-2 rounded-full bg-[#F4EFE6] text-[#7D6E65] hover:bg-[#EBE3D5] transition-all cursor-pointer"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg>
              </a>
              <a
                href="https://github.com/GaneshJamadar369"
                target="_blank"
                rel="noopener noreferrer"
                title="GitHub"
                className="p-2 rounded-full bg-[#F4EFE6] text-[#7D6E65] hover:bg-[#EBE3D5] transition-all cursor-pointer"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
              </a>
              
              <div className="h-6 w-px bg-[#EBE3D5] mx-1 hidden sm:block" />

              <button
                onClick={() => setIsDevModalOpen(true)}
                title="View Full Card"
                className="text-xs font-bold text-[#2F5233] hover:underline cursor-pointer px-2 py-1"
              >
                View Profile
              </button>
            </div>
          </div>
        </motion.div>

        {/* Developer Profile Modal */}
        <AnimatePresence>
          {isDevModalOpen && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsDevModalOpen(false)}
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              />
              
              {/* Card Container */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                transition={{ type: "spring", duration: 0.4 }}
                className="relative overflow-hidden bg-[#FAF6F0] border border-[#EBE3D5] rounded-[2rem] p-8 md:p-10 w-full max-w-lg shadow-2xl text-left font-sans z-10"
              >
                {/* Close Button */}
                <button
                  onClick={() => setIsDevModalOpen(false)}
                  className="absolute top-6 right-6 w-8 h-8 rounded-full bg-[#F4EFE6] flex items-center justify-center text-[#7D6E65] hover:text-[#2B1B17] hover:bg-[#EBE3D5] transition-all z-20 cursor-pointer"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                </button>

                {/* Soft Peach Circle Blob top-right */}
                <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[#FCE5CD] opacity-60 pointer-events-none" />

                {/* Header info */}
                <div className="relative z-10 pr-8">
                  <span className="text-xs font-bold tracking-widest text-[#2F5233] uppercase block">
                    CSE · BATCH OF '27
                  </span>
                  <h3 className="text-2xl md:text-3xl font-semibold text-[#2B1B17] mt-2 font-serif">
                    Ganesh Jamadar
                  </h3>
                  <p className="text-sm text-[#7D6E65] mt-1 font-medium">
                    Full Stack · UI · Animations
                  </p>
                </div>

                {/* Info Grid */}
                <div className="relative z-10 grid grid-cols-1 gap-4 mt-6">
                  {/* Branch & Batch */}
                  <div className="grid grid-cols-2 gap-4">
                    {/* Branch */}
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#F4EFE6] flex items-center justify-center text-[#2F5233] shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"/><path d="M6 18.8v-4L2 13"/><path d="M21.42 10.922V17a2 2 0 0 1-2 2h-2.582a2 2 0 0 1-1.879-1.318l-1.025-3.076"/></svg>
                      </div>
                      <div>
                        <span className="text-[9px] font-bold tracking-wider text-[#8D7E73] uppercase block">BRANCH</span>
                        <span className="text-xs font-semibold text-[#2B1B17]">CSE</span>
                      </div>
                    </div>

                    {/* Batch */}
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#F4EFE6] flex items-center justify-center text-[#2F5233] shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="9" y2="9"/><line x1="4" x2="20" y1="15" y2="15"/><line x1="10" x2="8" y1="3" y2="21"/><line x1="16" x2="14" y1="3" y2="21"/></svg>
                      </div>
                      <div>
                        <span className="text-[9px] font-bold tracking-wider text-[#8D7E73] uppercase block">BATCH</span>
                        <span className="text-xs font-semibold text-[#2B1B17]">Class of '27</span>
                      </div>
                    </div>
                  </div>

                  {/* Role */}
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#F4EFE6] flex items-center justify-center text-[#2F5233] shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m18 16 4-4-4-4"/><path d="m6 8-4 4 4 4"/><path d="m14.5 4-5 16"/></svg>
                    </div>
                    <div>
                      <span className="text-[9px] font-bold tracking-wider text-[#8D7E73] uppercase block">ROLE</span>
                      <span className="text-xs font-semibold text-[#2B1B17]">Frontend · Backend · Animations</span>
                    </div>
                  </div>

                  {/* Built */}
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#F4EFE6] flex items-center justify-center text-[#2F5233] shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="6" x2="6" y1="3" y2="15"/><circle cx="18" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M18 9a9 9 0 0 1-9 9"/></svg>
                    </div>
                    <div>
                      <span className="text-[9px] font-bold tracking-wider text-[#8D7E73] uppercase block">BUILT</span>
                      <span className="text-xs font-semibold text-[#2B1B17]">Frontend, backend, and the pixels too.</span>
                    </div>
                  </div>
                </div>

                {/* Divider */}
                <div className="relative z-10 border-t border-[#EBE3D5] my-5" />

                {/* Social Buttons */}
                <div className="relative z-10 space-y-2.5">
                  <div className="grid grid-cols-2 gap-2.5">
                    {/* LinkedIn */}
                    <a
                      href="https://www.linkedin.com/in/ganeshjamadar/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="border border-[#E7AC6F] text-[#2F5233] rounded-full py-2.5 px-4 flex items-center justify-center gap-1.5 hover:bg-[#FCE5CD]/40 transition-all font-medium text-xs text-center"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
                      LinkedIn
                    </a>

                    {/* GitHub */}
                    <a
                      href="https://github.com/GaneshJamadar369"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="border border-[#EBE3D5] text-[#7D6E65] rounded-full py-2.5 px-4 flex items-center justify-center gap-1.5 hover:bg-[#F4EFE6] transition-all font-medium text-xs text-center"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
                      GitHub
                    </a>
                  </div>

                  {/* Portfolio */}
                  <a
                    href="https://ganeshjamadar.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full border border-[#EBE3D5] text-[#7D6E65] rounded-full py-2.5 px-4 flex items-center justify-center gap-1.5 hover:bg-[#F4EFE6] transition-all font-medium text-xs text-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg>
                    Portfolio
                  </a>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent mb-8" />

        {/* Footer Info */}
        <div className="grid md:grid-cols-3 gap-8 text-center md:text-left">
          {/* Logo & Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-keshari to-gold flex items-center justify-center text-white font-serif">
                ज्ञा
              </div>
              <div>
                <h3 className="font-serif text-foreground">ज्ञानसंपदा</h3>
                <p className="text-xs text-muted-foreground">Public Library</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              नाशिक महानगरपालिका
              <br />
              Nashik Municipal Corporation
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-center"
          >
            <h4 className="font-medium text-foreground mb-4">Quick Links</h4>
            <div className="space-y-2">
              {[
                { label: "About", href: "/about" },
                { label: "Gallery", href: "/gallery" },
                { label: "Success Stories", href: "/success-stories" },
                { label: "Contact", href: "/contact" },
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="block text-sm text-muted-foreground hover:text-keshari transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-center md:text-right"
          >
            <h4 className="font-medium text-foreground mb-4">संपर्क • Contact</h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>वाचनालय वेळ: सकाळी ९ ते सायं. ८</p>
              <p>Timing: 9 AM - 8 PM</p>
              <p className="text-keshari">Nashik, Maharashtra</p>
            </div>
          </motion.div>
        </div>

        {/* Copyright */}
        <motion.div
          className="mt-12 pt-8 border-t border-border text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} ज्ञानसंपदा सार्वजनिक वाचनालय ग्रंथालय. सर्व हक्क राखीव.
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Dnyansampada Public Library. All Rights Reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  )
}
