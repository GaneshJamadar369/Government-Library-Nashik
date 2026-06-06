"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Images, Users, FileText, ArrowRight } from "lucide-react"

const CARDS = [
  {
    href: "/admin/gallery",
    icon: Images,
    label: "गॅलरी",
    sub: "Gallery Photos",
    desc: "फोटो जोडा, हटवा, कॅप्शन बदला",
    descEn: "Add, delete, edit photo captions",
    color: "from-orange-400 to-rose-500",
  },
  {
    href: "/admin/stories",
    icon: Users,
    label: "यशोगाथा",
    sub: "Success Stories",
    desc: "विद्यार्थ्यांच्या यशोगाथा व्यवस्थापित करा",
    descEn: "Manage student success stories",
    color: "from-emerald-400 to-teal-600",
  },
  {
    href: "/admin/content",
    icon: FileText,
    label: "मजकूर",
    sub: "Site Content",
    desc: "सर्व पानांचा मजकूर बदला",
    descEn: "Edit text across all pages",
    color: "from-violet-400 to-indigo-600",
  },
]

export default function AdminDashboard() {
  return (
    <div className="md:pl-20">
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-bold text-foreground">नमस्कार! 👋</h1>
        <p className="text-muted-foreground mt-1">काय व्यवस्थापित करायचे आहे? / What would you like to manage?</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {CARDS.map((card, i) => {
          const Icon = card.icon
          return (
            <motion.div
              key={card.href}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, type: "spring", stiffness: 100 }}
            >
              <Link href={card.href}>
                <motion.div
                  whileHover={{ y: -6, boxShadow: "0 20px 50px -10px rgba(0,0,0,0.15)" }}
                  whileTap={{ scale: 0.97 }}
                  className="bg-card border border-border rounded-3xl p-6 cursor-pointer group h-full"
                >
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${card.color} flex items-center justify-center mb-4 shadow-lg`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h2 className="font-serif text-2xl font-bold text-foreground">{card.label}</h2>
                  <p className="text-sm text-muted-foreground font-medium mb-3">{card.sub}</p>
                  <p className="text-sm text-foreground/80 mb-1">{card.desc}</p>
                  <p className="text-xs text-muted-foreground italic mb-4">{card.descEn}</p>
                  <div className="flex items-center gap-1 text-sm font-semibold text-primary group-hover:gap-2 transition-all">
                    व्यवस्थापित करा <ArrowRight className="w-4 h-4" />
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          )
        })}
      </div>

      <p className="mt-10 text-xs text-muted-foreground text-center">
        ⚠️ विकसक माहिती (Ganesh Jamadar) येथे बदलता येत नाही.
      </p>
    </div>
  )
}
