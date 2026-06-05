"use client"

import { useRef, useState, useEffect } from "react"
import Image from "next/image"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { FallingLeaves } from "@/components/falling-leaves"

const successStories = [
  {
    id: 1,
    name: "राज पाटील",
    nameEn: "Raj Patil",
    achievement: "UPSC परीक्षा उत्तीर्ण",
    achievementEn: "Cleared UPSC Exam",
    year: "2023",
    image: null,
    quote: "ज्ञानसंपदा वाचनालयाने माझ्या स्वप्नांना पंख दिले. येथील शांत वातावरण आणि पुस्तकांचा समृद्ध संग्रह माझ्या यशाचे रहस्य आहे. दररोज सकाळी ६ वाजता वाचनालयात येणे माझी सवय होती.",
    quoteEn: "Dnyansampada library gave wings to my dreams. The peaceful environment and rich collection of books is the secret of my success. Coming to the library every morning at 6 AM was my habit.",
    category: "competitive"
  },
  {
    id: 2,
    name: "प्रिया शर्मा",
    nameEn: "Priya Sharma",
    achievement: "वैद्यकीय पदवी - MBBS",
    achievementEn: "Medical Degree - MBBS",
    year: "2022",
    image: null,
    quote: "वैद्यकीय प्रवेश परीक्षेची तयारी करताना या वाचनालयाने मला खूप मदत केली. येथील संदर्भ पुस्तके आणि शांत वातावरण अभ्यासासाठी आदर्श होते.",
    quoteEn: "This library helped me a lot while preparing for medical entrance exams. The reference books and peaceful atmosphere here were ideal for studying.",
    category: "medical"
  },
  {
    id: 3,
    name: "अमित देशमुख",
    nameEn: "Amit Deshmukh",
    achievement: "IIT मुंबई प्रवेश",
    achievementEn: "IIT Mumbai Admission",
    year: "2021",
    image: null,
    quote: "JEE परीक्षेची तयारी करताना वाचनालयातील स्पर्धा परीक्षेची पुस्तके आणि मार्गदर्शनामुळे मला IIT मध्ये प्रवेश मिळाला. ग्रंथपालांनी नेहमी मदत केली.",
    quoteEn: "The competitive exam books and guidance at the library helped me get admission to IIT. The librarians always helped.",
    category: "engineering"
  },
  {
    id: 4,
    name: "सुनीता जाधव",
    nameEn: "Sunita Jadhav",
    achievement: "महाराष्ट्र लोकसेवा आयोग",
    achievementEn: "Maharashtra PSC Officer",
    year: "2023",
    image: null,
    quote: "शासकीय नोकरीचे स्वप्न पूर्ण करण्यात या वाचनालयाचा मोठा वाटा आहे. येथे अभ्यास करताना मिळालेली शांतता आणि एकाग्रता अमूल्य होती.",
    quoteEn: "This library played a big role in fulfilling my dream of a government job. The peace and concentration I got while studying here was invaluable.",
    category: "competitive"
  },
  {
    id: 5,
    name: "विकास मोरे",
    nameEn: "Vikas More",
    achievement: "CA परीक्षा उत्तीर्ण",
    achievementEn: "Chartered Accountant",
    year: "2022",
    image: null,
    quote: "CA परीक्षेसारख्या कठीण परीक्षेची तयारी करताना वाचनालयातील वातावरणाने मला खूप प्रेरित केले. इथले सहकारी विद्यार्थीही प्रेरणादायी होते.",
    quoteEn: "The library environment motivated me a lot while preparing for a difficult exam like CA. The fellow students here were also inspiring.",
    category: "professional"
  },
  {
    id: 6,
    name: "अंजली कुलकर्णी",
    nameEn: "Anjali Kulkarni",
    achievement: "NET/SET परीक्षा",
    achievementEn: "NET/SET Qualified",
    year: "2021",
    image: null,
    quote: "संशोधन आणि शिक्षण क्षेत्रात जाण्याचे माझे स्वप्न या वाचनालयामुळे पूर्ण झाले. इथल्या पुस्तकांनी माझी दृष्टी विस्तारली.",
    quoteEn: "My dream of entering research and education was fulfilled because of this library. The books here broadened my vision.",
    category: "research"
  },
]

const categories = [
  { id: "all", label: "सर्व", labelEn: "All" },
  { id: "competitive", label: "स्पर्धा परीक्षा", labelEn: "Competitive" },
  { id: "medical", label: "वैद्यकीय", labelEn: "Medical" },
  { id: "engineering", label: "अभियांत्रिकी", labelEn: "Engineering" },
  { id: "professional", label: "व्यावसायिक", labelEn: "Professional" },
]

export default function SuccessStoriesPage() {
  const [mounted, setMounted] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [expandedStory, setExpandedStory] = useState<number | null>(null)
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])
  
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, 150])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  const filteredStories = selectedCategory === "all" 
    ? successStories 
    : successStories.filter(story => story.category === selectedCategory)

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      {/* Hero Section */}
      <section ref={heroRef} className="relative h-[50vh] overflow-hidden bg-gradient-to-b from-sea-deep via-sea-mid to-sea-light">
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
            यशोगाथा • Success Stories
          </motion.span>
          
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-serif text-white mb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            आमचे <span className="text-keshari">गौरव</span>
          </motion.h1>
          
          <motion.p
            className="text-lg md:text-xl text-white/80 max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Our Pride - Students Who Made Us Proud
          </motion.p>

          {/* Floating Achievement Icons - use leaf images */}
          {mounted && (
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {["/images/leaf-1.png", "/images/leaf-2.png", "/images/leaf-3.png", "/images/leaf-1.png", "/images/leaf-2.png"].map((leaf, i) => (
                <motion.div
                  key={i}
                  className="absolute w-8 h-8 opacity-20"
                  initial={{ 
                    x: Math.random() * 100 + "%",
                    y: Math.random() * 100 + "%"
                  }}
                  animate={{
                    y: [null, "-20%", null],
                    rotate: [0, 10, -10, 0]
                  }}
                  transition={{
                    duration: 6 + Math.random() * 4,
                    repeat: Infinity,
                    delay: i * 0.5
                  }}
                >
                  <Image src={leaf} alt="" width={32} height={32} className="object-contain" />
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </section>

      {/* Stats Banner */}
      <section className="py-8 bg-gradient-to-r from-keshari/10 via-gold/10 to-forest/10">
        <div className="max-w-5xl mx-auto px-4">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {[
              { value: "500+", label: "यशस्वी विद्यार्थी", labelEn: "Successful Students" },
              { value: "50+", label: "शासकीय अधिकारी", labelEn: "Govt Officers" },
              { value: "100+", label: "डॉक्टर/इंजिनियर", labelEn: "Doctors/Engineers" },
              { value: "25+", label: "वर्षांचा वारसा", labelEn: "Years Legacy" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <span className="text-2xl md:text-3xl font-bold text-gradient-keshari">{stat.value}</span>
                <p className="text-xs md:text-sm text-foreground mt-1">{stat.label}</p>
                <p className="text-xs text-muted-foreground">{stat.labelEn}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
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
                {category.labelEn}
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stories Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            layout
          >
            <AnimatePresence mode="popLayout">
              {filteredStories.map((story, index) => (
                <motion.div
                  key={story.id}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="group"
                >
                  <motion.div
                    className={`relative bg-card rounded-2xl shadow-lg border border-border overflow-hidden transition-all duration-300 ${
                      expandedStory === story.id ? "lg:col-span-2" : ""
                    }`}
                    whileHover={{ y: -5 }}
                    onClick={() => setExpandedStory(expandedStory === story.id ? null : story.id)}
                  >
                    {/* Top Accent */}
                    <div className="h-1 bg-gradient-to-r from-keshari via-gold to-forest" />
                    
                    {/* Year Badge */}
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 rounded-full bg-keshari/10 text-keshari text-xs font-bold">
                        {story.year}
                      </span>
                    </div>

                    <div className="p-6">
                      {/* Avatar */}
                      <motion.div
                        className="w-16 h-16 rounded-full bg-gradient-to-br from-keshari to-gold flex items-center justify-center text-white text-2xl font-serif mb-4 shadow-lg"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                      >
                        {story.name.charAt(0)}
                      </motion.div>

                      {/* Name & Achievement */}
                      <h3 className="text-xl font-serif text-foreground mb-1">{story.name}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{story.nameEn}</p>
                      
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-forest/10 text-forest text-sm font-medium mb-4">
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
                      <AnimatePresence>
                        <motion.div
                          initial={{ height: "4.5rem" }}
                          animate={{ height: expandedStory === story.id ? "auto" : "4.5rem" }}
                          className="relative overflow-hidden"
                        >
                          <blockquote className="relative">
                            <span className="absolute -top-2 -left-1 text-3xl text-keshari/20 font-serif">&ldquo;</span>
                            <p className="text-sm text-foreground/80 leading-relaxed pl-4 italic">
                              {story.quote}
                            </p>
                            <p className="text-xs text-muted-foreground mt-2 pl-4">
                              {story.quoteEn}
                            </p>
                          </blockquote>
                          
                          {expandedStory !== story.id && (
                            <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-card to-transparent" />
                          )}
                        </motion.div>
                      </AnimatePresence>

                      {/* Read More */}
                      <button className="mt-4 text-sm text-keshari hover:text-gold transition-colors">
                        {expandedStory === story.id ? "कमी पहा" : "अधिक वाचा"} →
                      </button>
                    </div>

                    {/* Hover Glow */}
                    <div className="absolute inset-0 bg-gradient-to-t from-keshari/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  </motion.div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-b from-background to-sea-light/20">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-3xl font-serif text-foreground mb-4">
              तुमची यशोगाथा <span className="text-gradient-keshari">शेअर करा</span>
            </h2>
            <p className="text-muted-foreground mb-8">
              Share Your Success Story With Us
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-keshari to-gold text-white rounded-full font-medium hover:shadow-lg hover:shadow-keshari/30 transition-all duration-300"
            >
              <span>संपर्क करा</span>
              <span>→</span>
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
