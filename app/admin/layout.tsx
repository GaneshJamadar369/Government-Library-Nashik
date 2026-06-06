"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { LayoutDashboard, Images, Users, FileText, LogOut, BookOpen, CalendarDays } from "lucide-react"

const NAV = [
  { href: "/admin", label: "डॅशबोर्ड", sub: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/gallery", label: "गॅलरी", sub: "Gallery", icon: Images },
  { href: "/admin/stories", label: "यशोगाथा", sub: "Stories", icon: Users },
  { href: "/admin/events", label: "कार्यक्रम", sub: "Events", icon: CalendarDays },
  { href: "/admin/content", label: "मजकूर", sub: "Content", icon: FileText },
]

function NavItem({ item, active }: { item: typeof NAV[0]; active: boolean }) {
  const Icon = item.icon
  return (
    <Link href={item.href}>
      <motion.div
        whileTap={{ scale: 0.95 }}
        className={`flex flex-col items-center gap-1 px-3 py-2 rounded-2xl transition-all ${
          active
            ? "text-white shadow-lg"
            : "text-muted-foreground hover:text-foreground hover:bg-muted"
        }`}
        style={active ? { background: "linear-gradient(135deg, oklch(0.68 0.18 55), oklch(0.42 0.12 145))" } : {}}
      >
        <Icon className="w-5 h-5 md:w-6 md:h-6" />
        <span className="text-xs font-medium">{item.label}</span>
        <span className="hidden md:block text-[10px] opacity-70">{item.sub}</span>
      </motion.div>
    </Link>
  )
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()

  // Don't render shell on login page
  if (pathname === "/admin/login") return <>{children}</>

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" })
    router.push("/admin/login")
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top bar */}
      <header className="sticky top-0 z-40 bg-card/95 backdrop-blur border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, oklch(0.68 0.18 55), oklch(0.42 0.12 145))" }}
            >
              <BookOpen className="w-4 h-4 text-white" />
            </div>
            <div>
              <span className="font-serif font-bold text-foreground text-sm">ज्ञानसंपदा</span>
              <span className="text-xs text-muted-foreground ml-2">प्रशासन पॅनेल</span>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-destructive transition-colors px-3 py-1.5 rounded-xl hover:bg-muted"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">बाहेर पडा</span>
          </button>
        </div>
      </header>

      {/* Main content area — with bottom nav padding on mobile */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-6 pb-24 md:pb-6">
        {children}
      </main>

      {/* Bottom nav — mobile */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-card/95 backdrop-blur border-t border-border px-2 py-2">
        <div className="flex items-center justify-around">
          {NAV.map((item) => (
            <NavItem key={item.href} item={item} active={pathname === item.href} />
          ))}
          <motion.button
            onClick={handleLogout}
            whileTap={{ scale: 0.95 }}
            className="flex flex-col items-center gap-1 px-3 py-2 rounded-2xl text-muted-foreground hover:text-destructive transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="text-xs font-medium">बाहेर</span>
          </motion.button>
        </div>
      </nav>

      {/* Side nav — desktop */}
      <aside className="hidden md:flex fixed left-0 top-14 bottom-0 w-20 flex-col items-center gap-2 pt-4 border-r border-border bg-card/80 backdrop-blur z-30">
        {NAV.map((item) => (
          <NavItem key={item.href} item={item} active={pathname === item.href} />
        ))}
      </aside>
    </div>
  )
}
