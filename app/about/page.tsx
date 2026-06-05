"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

const timelineData = [
  {
    year: "1998",
    title: "स्थापना",
    titleEn: "Foundation",
    description: "नाशिक महानगरपालिकेने ज्ञानसंपदा वाचनालयाची स्थापना केली",
    descriptionEn: "Nashik Municipal Corporation established Dnyansampada Library"
  },
  {
    year: "2005",
    title: "विस्तार",
    titleEn: "Expansion",
    description: "नवीन वाचन कक्ष आणि ग्रंथालय विभाग जोडला गेला",
    descriptionEn: "New reading room and library section added"
  },
  {
    year: "2010",
    title: "डिजिटल युग",
    titleEn: "Digital Era",
    description: "संगणक आणि इंटरनेट सुविधा सुरू",
    descriptionEn: "Computer and internet facilities started"
  },
  {
    year: "2017",
    title: "वाचन कट्टा",
    titleEn: "Reading Corner",
    description: "बाहेरील वाचन कट्टा सुरू, समुदायिक वाचनाला प्रोत्साहन",
    descriptionEn: "Outdoor reading corner started, promoting community reading"
  },
  {
    year: "2023",
    title: "रौप्य महोत्सव",
    titleEn: "Silver Jubilee",
    description: "25 वर्षे पूर्ण, हजारो विद्यार्थ्यांना ज्ञानाचा प्रकाश",
    descriptionEn: "25 years complete, enlightened thousands of students"
  },
]

const stats = [
  { value: "5000+", label: "पुस्तके", labelEn: "Books" },
  { value: "25+", label: "वर्षे", labelEn: "Years" },
  { value: "10000+", label: "सदस्य", labelEn: "Members" },
  { value: "50+", label: "वृत्तपत्रे", labelEn: "Newspapers" },
]

export default function AboutPage() {
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, 200])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      {/* Hero Section */}
      <section ref={heroRef} className="relative h-[70vh] overflow-hidden">
        <motion.div style={{ y }} className="absolute inset-0">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-FZlXfNuj7UlpLNEVR5UhNYqPayMB1w.png"
            alt="Library building"
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
            आमच्याबद्दल • About Us
          </motion.span>
          
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-serif text-white mb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            आमची <span className="text-keshari">कथा</span>
          </motion.h1>
          
          <motion.p
            className="text-lg md:text-xl text-white/80 max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            The story of knowledge, community, and growth
          </motion.p>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-16 -mt-20 relative z-20">
        <div className="max-w-5xl mx-auto px-4">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="bg-card rounded-2xl shadow-xl p-6 text-center border border-border"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <span className="text-3xl md:text-4xl font-bold text-gradient-keshari">{stat.value}</span>
                <p className="text-sm text-foreground mt-2">{stat.label}</p>
                <p className="text-xs text-muted-foreground">{stat.labelEn}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-4 py-1 rounded-full bg-forest/10 text-forest text-sm font-medium mb-4">
                आमचे ध्येय • Our Mission
              </span>
              <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-6">
                ज्ञानाचा प्रकाश <span className="text-gradient-forest">सर्वांसाठी</span>
              </h2>
              <div className="space-y-4 text-foreground/80 leading-relaxed">
                <p>
                  ज्ञानसंपदा सार्वजनिक वाचनालय हे नाशिक शहरातील एक प्रमुख ज्ञान केंद्र आहे. 
                  आमचे ध्येय समाजातील प्रत्येक व्यक्तीला ज्ञानाच्या प्रकाशाकडे नेणे हे आहे.
                </p>
                <p>
                  Dnyansampada Public Library is a premier knowledge center in Nashik city. 
                  Our mission is to lead every person in society towards the light of knowledge.
                </p>
                <p>
                  हिरव्यागार वृक्षांच्या सावलीत वसलेले हे ग्रंथालय शांत वातावरणात अभ्य��साची 
                  आदर्श जागा प्रदान करते. येथे वाचकांना विविध विषयांवरील पुस्तके, वृत्तपत्रे, 
                  आणि संदर्भ साहित्य उपलब्ध आहे.
                </p>
              </div>
            </motion.div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-czUo7FO4B1hxjyw0fmOsFcGlsBZvOL.png"
                  alt="Community reading session"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-br from-keshari/20 to-gold/20 rounded-full blur-2xl" />
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-forest/20 to-sea-mid/20 rounded-full blur-2xl" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-gradient-to-b from-background via-sea-light/10 to-background">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-block px-4 py-1 rounded-full bg-keshari/10 text-keshari text-sm font-medium mb-4">
              इतिहास • History
            </span>
            <h2 className="text-3xl md:text-4xl font-serif text-foreground">
              आमचा <span className="text-gradient-keshari">प्रवास</span>
            </h2>
          </motion.div>

          <div className="relative">
            {/* Central Line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-keshari via-gold to-forest -translate-x-1/2" />

            {timelineData.map((item, index) => (
              <motion.div
                key={index}
                className={`relative flex items-center gap-8 mb-12 ${
                  index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                }`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                {/* Content */}
                <div className={`w-5/12 ${index % 2 === 0 ? "text-right" : "text-left"}`}>
                  <motion.div
                    className="bg-card rounded-xl p-6 shadow-lg border border-border"
                    whileHover={{ scale: 1.02 }}
                  >
                    <span className="inline-block px-3 py-1 rounded-full bg-keshari/10 text-keshari text-sm font-bold mb-2">
                      {item.year}
                    </span>
                    <h3 className="text-xl font-serif text-foreground mb-1">{item.title}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{item.titleEn}</p>
                    <p className="text-sm text-foreground/70">{item.description}</p>
                    <p className="text-xs text-muted-foreground mt-1">{item.descriptionEn}</p>
                  </motion.div>
                </div>

                {/* Center Dot */}
                <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-gradient-to-br from-keshari to-gold border-4 border-background shadow-lg" />

                {/* Empty Space */}
                <div className="w-5/12" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-block px-4 py-1 rounded-full bg-forest/10 text-forest text-sm font-medium mb-4">
              आमची मूल्ये • Our Values
            </span>
            <h2 className="text-3xl md:text-4xl font-serif text-foreground">
              आम्ही <span className="text-gradient-forest">विश्वास</span> ठेवतो
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "/icons/knowledge.png",
                title: "ज्ञान",
                titleEn: "Knowledge",
                description: "प्रत्येकाला ज्ञानाची संधी",
                descriptionEn: "Knowledge opportunity for everyone"
              },
              {
                icon: "/icons/tree.png",
                title: "पर्यावरण",
                titleEn: "Environment",
                description: "हरित आणि शांत वातावरण",
                descriptionEn: "Green and peaceful environment"
              },
              {
                icon: "/icons/community.png",
                title: "समुदाय",
                titleEn: "Community",
                description: "एकत्र शिकणे, एकत्र वाढणे",
                descriptionEn: "Learning together, growing together"
              },
            ].map((value, index) => (
              <motion.div
                key={index}
                className="text-center p-8 rounded-2xl bg-card border border-border shadow-lg"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-br from-keshari/10 to-gold/10 flex items-center justify-center">
                  <Image
                    src={value.icon}
                    alt={value.titleEn}
                    width={40}
                    height={40}
                    className="object-contain"
                  />
                </div>
                <h3 className="text-xl font-serif text-foreground mb-1">{value.title}</h3>
                <p className="text-sm text-muted-foreground mb-3">{value.titleEn}</p>
                <p className="text-sm text-foreground/70">{value.description}</p>
                <p className="text-xs text-muted-foreground">{value.descriptionEn}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
