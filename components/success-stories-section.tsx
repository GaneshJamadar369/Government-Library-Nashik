"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"

const successStories = [
  {
    name: "राज पाटील",
    nameEn: "Raj Patil",
    achievement: "UPSC परीक्षा उत्तीर्ण",
    achievementEn: "Cleared UPSC Exam",
    quote: "ज्ञानसंपदा वाचनालयाने माझ्या स्वप्नांना पंख दिले. येथील शांत वातावरण आणि पुस्तकांचा समृद्ध संग्रह माझ्या यशाचे रहस्य आहे.",
    quoteEn: "Dnyansampada library gave wings to my dreams. The peaceful environment and rich collection of books is the secret of my success.",
    year: "2023"
  },
  {
    name: "प्रिया शर्मा",
    nameEn: "Priya Sharma",
    achievement: "वैद्यकीय पदवी",
    achievementEn: "Medical Degree",
    quote: "दररोज सकाळी वाचनालयात अभ्यास करणे ही माझी सवय होती. आज मी डॉक्टर आहे, हे सर्व या वाचनालयामुळे शक्य झाले.",
    quoteEn: "Studying at the library every morning was my habit. Today I am a doctor, all this was possible because of this library.",
    year: "2022"
  },
  {
    name: "अमित देशमुख",
    nameEn: "Amit Deshmukh",
    achievement: "अभियांत्रिकी पदवी",
    achievementEn: "Engineering Degree",
    quote: "वाचनालयातील स्पर्धा परीक्षेची पुस्तके आणि मार्गदर्शनामुळे मला IIT मध्ये प्रवेश मिळाला.",
    quoteEn: "The competitive exam books and guidance at the library helped me get admission to IIT.",
    year: "2021"
  },
]

const cardVariants = {
  hidden: { opacity: 0, y: 50, rotateX: -15 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: "easeOut"
    }
  })
}

export default function SuccessStoriesSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.9, 1, 1, 0.9])

  return (
    <section
      ref={containerRef}
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-gold/5 to-background" />
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <motion.div
        style={{ opacity, scale }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
      >
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-1 rounded-full bg-gold/10 text-amber-700 text-sm font-medium mb-4">
            यशोगाथा • Success Stories
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-foreground mb-4">
            आमचे <span className="text-gradient-keshari">यशस्वी विद्यार्थी</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our Successful Students Who Made Us Proud
          </p>
        </motion.div>

        {/* Success Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {successStories.map((story, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group"
            >
              <div className="relative h-full bg-card rounded-2xl shadow-lg overflow-hidden border border-border hover:border-keshari/30 transition-all duration-300">
                {/* Top Accent */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-keshari via-gold to-forest" />
                
                {/* Year Badge */}
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 rounded-full bg-keshari/10 text-keshari text-xs font-medium">
                    {story.year}
                  </span>
                </div>

                <div className="p-6 pt-8">
                  {/* Avatar Placeholder */}
                  <motion.div
                    className="w-16 h-16 rounded-full bg-gradient-to-br from-keshari to-gold flex items-center justify-center text-white text-2xl font-serif mb-4"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    {story.name.charAt(0)}
                  </motion.div>

                  {/* Name & Achievement */}
                  <h3 className="text-xl font-serif text-foreground mb-1">{story.name}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{story.nameEn}</p>
                  
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest/10 text-forest text-sm font-medium mb-4">
                    <Image
                      src="/icons/trophy.png"
                      alt="Achievement"
                      width={16}
                      height={16}
                      className="object-contain"
                    />
                    <span>{story.achievement}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mb-4">{story.achievementEn}</p>

                  {/* Quote */}
                  <blockquote className="relative">
                    <span className="absolute -top-2 -left-2 text-4xl text-keshari/20 font-serif">&ldquo;</span>
                    <p className="text-sm text-foreground/80 leading-relaxed pl-4 italic">
                      {story.quote}
                    </p>
                    <p className="text-xs text-muted-foreground mt-2 pl-4">
                      {story.quoteEn}
                    </p>
                  </blockquote>
                </div>

                {/* Hover Glow */}
                <div className="absolute inset-0 bg-gradient-to-t from-keshari/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <a
            href="/success-stories"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-keshari text-keshari hover:bg-keshari hover:text-white transition-all duration-300"
          >
            <span>सर्व यशोगाथा पहा</span>
            <span>→</span>
          </a>
        </motion.div>
      </motion.div>
    </section>
  )
}
