"use client"

import { useRef, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { MapPin, Clock, Phone, Mail, Send, CheckCircle } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

const contactInfo = [
  {
    icon: MapPin,
    title: "पत्ता",
    titleEn: "Address",
    value: "ज्ञानसंपदा वाचनालय, नाशिक, महाराष्ट्र",
    valueEn: "Dnyansampada Library, Nashik, Maharashtra"
  },
  {
    icon: Clock,
    title: "वेळ",
    titleEn: "Timing",
    value: "सकाळी ९:०० ते सायं. ८:००",
    valueEn: "9:00 AM - 8:00 PM"
  },
  {
    icon: Phone,
    title: "दूरध्वनी",
    titleEn: "Phone",
    value: "+91 XXX XXX XXXX",
    valueEn: "Contact Number"
  },
  {
    icon: Mail,
    title: "ईमेल",
    titleEn: "Email",
    value: "info@dnyansampada.in",
    valueEn: "Email Address"
  },
]

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, 150])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setIsSubmitting(false)
    setIsSubmitted(true)
    setFormState({ name: "", email: "", phone: "", subject: "", message: "" })
    
    // Reset success message after 5 seconds
    setTimeout(() => setIsSubmitted(false), 5000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormState(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      {/* Hero Section */}
      <section ref={heroRef} className="relative h-[40vh] overflow-hidden bg-gradient-to-b from-forest via-sea-mid to-sea-light">
        <motion.div 
          style={{ y, opacity }}
          className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4"
        >
          <motion.span
            className="inline-block px-4 py-1 rounded-full bg-white/10 backdrop-blur-md text-white text-sm mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            संपर्क • Contact
          </motion.span>
          
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-serif text-white mb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            आमच्याशी <span className="text-keshari">संपर्क</span> साधा
          </motion.h1>
          
          <motion.p
            className="text-lg md:text-xl text-white/80 max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Get in Touch With Us
          </motion.p>
        </motion.div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-12 -mt-16 relative z-20">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                className="bg-card rounded-2xl shadow-xl p-5 text-center border border-border hover:border-keshari/30 transition-all"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-to-br from-keshari/10 to-gold/10 flex items-center justify-center">
                  <info.icon className="w-5 h-5 text-keshari" />
                </div>
                <h3 className="font-medium text-foreground text-sm">{info.title}</h3>
                <p className="text-xs text-muted-foreground mb-2">{info.titleEn}</p>
                <p className="text-xs text-foreground/80">{info.value}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-4 py-1 rounded-full bg-forest/10 text-forest text-sm font-medium mb-4">
                संदेश पाठवा • Send Message
              </span>
              <h2 className="text-2xl md:text-3xl font-serif text-foreground mb-6">
                आम्हाला <span className="text-gradient-forest">लिहा</span>
              </h2>

              {isSubmitted ? (
                <motion.div
                  className="bg-forest/10 rounded-2xl p-8 text-center"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <CheckCircle className="w-16 h-16 mx-auto text-forest mb-4" />
                  <h3 className="text-xl font-serif text-foreground mb-2">संदेश पाठवला!</h3>
                  <p className="text-muted-foreground">Message Sent Successfully!</p>
                  <p className="text-sm text-muted-foreground mt-2">आम्ही लवकरच संपर्क साधू.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        नाव / Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formState.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl bg-muted border border-border focus:border-keshari focus:ring-1 focus:ring-keshari/50 outline-none transition-all text-foreground"
                        placeholder="तुमचे नाव"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        ईमेल / Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formState.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl bg-muted border border-border focus:border-keshari focus:ring-1 focus:ring-keshari/50 outline-none transition-all text-foreground"
                        placeholder="email@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        दूरध्वनी / Phone
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formState.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-muted border border-border focus:border-keshari focus:ring-1 focus:ring-keshari/50 outline-none transition-all text-foreground"
                        placeholder="+91 XXXXX XXXXX"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        विषय / Subject *
                      </label>
                      <select
                        name="subject"
                        value={formState.subject}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl bg-muted border border-border focus:border-keshari focus:ring-1 focus:ring-keshari/50 outline-none transition-all text-foreground"
                      >
                        <option value="">विषय निवडा</option>
                        <option value="membership">सदस्यत्व / Membership</option>
                        <option value="inquiry">चौकशी / Inquiry</option>
                        <option value="feedback">अभिप्राय / Feedback</option>
                        <option value="suggestion">सूचना / Suggestion</option>
                        <option value="other">इतर / Other</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      संदेश / Message *
                    </label>
                    <textarea
                      name="message"
                      value={formState.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 rounded-xl bg-muted border border-border focus:border-keshari focus:ring-1 focus:ring-keshari/50 outline-none transition-all resize-none text-foreground"
                      placeholder="तुमचा संदेश येथे लिहा..."
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full md:w-auto px-8 py-3 bg-gradient-to-r from-keshari to-gold text-white rounded-xl font-medium flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-keshari/30 transition-all disabled:opacity-70"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {isSubmitting ? (
                      <>
                        <motion.div
                          className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                        <span>पाठवत आहे...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>संदेश पाठवा / Send</span>
                      </>
                    )}
                  </motion.button>
                </form>
              )}
            </motion.div>

            {/* Map & Additional Info */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span className="inline-block px-4 py-1 rounded-full bg-keshari/10 text-keshari text-sm font-medium mb-4">
                स्थान • Location
              </span>
              <h2 className="text-2xl md:text-3xl font-serif text-foreground mb-6">
                आम्हाला <span className="text-gradient-keshari">भेट द्या</span>
              </h2>

              {/* Map Placeholder */}
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl bg-muted mb-6">
                <div className="absolute inset-0 bg-gradient-to-br from-sea-light to-sea-mid flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-12 h-12 mx-auto text-white/50 mb-3" />
                    <p className="text-white/70 text-sm">Interactive Map</p>
                    <p className="text-white/50 text-xs">Nashik, Maharashtra</p>
                  </div>
                </div>
                
                {/* Decorative Elements */}
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute top-1/4 left-1/4 w-2 h-2 rounded-full bg-white animate-pulse" />
                  <div className="absolute top-1/3 right-1/3 w-3 h-3 rounded-full bg-keshari animate-pulse delay-500" />
                  <div className="absolute bottom-1/4 left-1/2 w-2 h-2 rounded-full bg-gold animate-pulse delay-1000" />
                </div>
              </div>

              {/* Quick Info */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-card rounded-xl p-4 border border-border">
                  <h4 className="font-medium text-foreground mb-1">सदस्यत्व</h4>
                  <p className="text-xs text-muted-foreground mb-2">Membership</p>
                  <p className="text-sm text-foreground/80">विनामूल्य सदस्यत्व उपलब्ध</p>
                  <p className="text-xs text-muted-foreground">Free membership available</p>
                </div>
                <div className="bg-card rounded-xl p-4 border border-border">
                  <h4 className="font-medium text-foreground mb-1">सुविधा</h4>
                  <p className="text-xs text-muted-foreground mb-2">Facilities</p>
                  <p className="text-sm text-foreground/80">वाचन कक्ष, इंटरनेट</p>
                  <p className="text-xs text-muted-foreground">Reading room, Internet</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gradient-to-b from-background to-sea-light/10">
        <div className="max-w-3xl mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-block px-4 py-1 rounded-full bg-forest/10 text-forest text-sm font-medium mb-4">
              वारंवार विचारले जाणारे प्रश्न • FAQ
            </span>
            <h2 className="text-2xl md:text-3xl font-serif text-foreground">
              सामान्य <span className="text-gradient-forest">प्रश्न</span>
            </h2>
          </motion.div>

          <div className="space-y-4">
            {[
              {
                q: "वाचनालयाची वेळ काय आहे?",
                qEn: "What are the library timings?",
                a: "वाचनालय सकाळी ९ ते रात्री ८ वाजेपर्यंत खुले असते. रविवार आणि सार्वजनिक सुट्ट्यांना बंद.",
                aEn: "The library is open from 9 AM to 8 PM. Closed on Sundays and public holidays."
              },
              {
                q: "सदस्यत्व कसे घ्यावे?",
                qEn: "How to get membership?",
                a: "वाचनालयात येऊन फॉर्म भरा. ओळखपत्र आणि फोटो आवश्यक. सदस्यत्व विनामूल्य आहे.",
                aEn: "Visit the library and fill the form. ID proof and photo required. Membership is free."
              },
              {
                q: "पुस्तके किती दिवस ठेवता येतात?",
                qEn: "How long can I keep books?",
                a: "पुस्तके १५ दिवसांसाठी घरी नेता येतात. पुन्हा नूतनीकरण करता येते.",
                aEn: "Books can be borrowed for 15 days. Renewal is possible."
              },
            ].map((faq, index) => (
              <motion.div
                key={index}
                className="bg-card rounded-xl p-6 border border-border"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <h3 className="font-medium text-foreground mb-1">{faq.q}</h3>
                <p className="text-sm text-muted-foreground mb-3">{faq.qEn}</p>
                <p className="text-sm text-foreground/80">{faq.a}</p>
                <p className="text-xs text-muted-foreground mt-1">{faq.aEn}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
