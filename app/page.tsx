"use client"

import { useState } from "react"
import IntroAnimation from "@/components/intro-animation"
import Navbar from "@/components/navbar"
import HeroSection from "@/components/hero-section"
import AboutSection from "@/components/about-section"
import EventsSection from "@/components/events-section"
import SuccessStoriesSection from "@/components/success-stories-section"
import HistorySection from "@/components/history-section"
import Footer from "@/components/footer"

export default function Home() {
  const [showIntro, setShowIntro] = useState(true)

  return (
    <main className="min-h-screen">
      {showIntro && (
        <IntroAnimation onComplete={() => setShowIntro(false)} />
      )}
      
      {!showIntro && (
        <>
          <Navbar />
          <HeroSection />
          <AboutSection />
          <EventsSection />
          <SuccessStoriesSection />
          <HistorySection />
          <Footer />
        </>
      )}
    </main>
  )
}
