import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "संपर्क / Contact Us",
  description:
    "Dnyansampada Sarvajanik Vachanalay (ज्ञानसंपदा सार्वजनिक वाचनालय) — Murari Nagar, Nashik 422010 शी संपर्क साधा. पत्ता, वेळ, फोन नंबर आणि दिशा. Address, timings, phone number, and directions to our public library in Murari Nagar, Nashik.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "संपर्क | Dnyansampada Sarvajanik Vachanalay, Murari Nagar, Nashik",
    description: "Address, timings, phone number, and directions to our public library in Murari Nagar, Nashik 422010.",
    url: "/contact",
  },
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children
}
