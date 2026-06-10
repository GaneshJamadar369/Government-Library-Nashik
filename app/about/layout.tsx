import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "आमच्याबद्दल / About Us",
  description:
    "Dnyansampada Sarvajanik Vachanalay (ज्ञानसंपदा सार्वजनिक वाचनालय) इतिहास आणि कार्य — Murari Nagar, Nashik 422010 येथील सार्वजनिक वाचनालयाची स्थापना, विस्तार आणि सेवांचा प्रवास. History and journey of one of Nashik's public libraries since 1998.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "आमच्याबद्दल | Dnyansampada Sarvajanik Vachanalay, Murari Nagar, Nashik",
    description: "History and journey of Dnyansampada Sarvajanik Vachanalay, a public library in Murari Nagar, Nashik since 1998.",
    url: "/about",
  },
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children
}
