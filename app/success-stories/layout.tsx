import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "यशोगाथा / Success Stories",
  description:
    "Dnyansampada Sarvajanik Vachanalay, Murari Nagar, Nashik येथील विद्यार्थ्यांच्या यशोगाथा — MPSC, UPSC आणि स्पर्धा परीक्षांमध्ये यशस्वी झालेल्या विद्यार्थ्यांच्या प्रेरणादायी कथा. Inspiring success stories of students who cleared MPSC, UPSC and competitive exams while studying at our library.",
  alternates: { canonical: "/success-stories" },
  openGraph: {
    title: "यशोगाथा | Dnyansampada Sarvajanik Vachanalay, Murari Nagar, Nashik",
    description: "Inspiring success stories of MPSC/UPSC qualified students from Murari Nagar, Nashik.",
    url: "/success-stories",
  },
}

export default function SuccessStoriesLayout({ children }: { children: React.ReactNode }) {
  return children
}
