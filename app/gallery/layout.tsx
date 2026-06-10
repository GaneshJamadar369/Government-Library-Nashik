import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "फोटो गॅलरी / Photo Gallery",
  description:
    "Dnyansampada Sarvajanik Vachanalay, Murari Nagar, Nashik येथील वाचनालय, कार्यक्रम आणि उपक्रमांचे फोटो. Photos of the library, reading hall, events, and community programs in Murari Nagar, Nashik.",
  alternates: { canonical: "/gallery" },
  openGraph: {
    title: "फोटो गॅलरी | Dnyansampada Sarvajanik Vachanalay, Murari Nagar, Nashik",
    description: "Photos of the library, reading hall, events, and community programs.",
    url: "/gallery",
  },
}

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  return children
}
