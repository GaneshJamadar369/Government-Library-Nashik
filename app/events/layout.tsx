import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "कार्यक्रम इतिहास / Events History",
  description:
    "Dnyansampada Sarvajanik Vachanalay, Murari Nagar, Nashik येथे आयोजित जयंती उत्सव, गुणगौरव सोहळे, कार्यशाळा आणि सामुदायिक कार्यक्रमांचा इतिहास (२०१६ पासून). Timeline of community events, felicitation ceremonies, and workshops held at our library since 2016.",
  alternates: { canonical: "/events" },
  openGraph: {
    title: "कार्यक्रम इतिहास | Dnyansampada Sarvajanik Vachanalay, Murari Nagar, Nashik",
    description: "Timeline of community events, felicitation ceremonies, and workshops since 2016.",
    url: "/events",
  },
}

export default function EventsLayout({ children }: { children: React.ReactNode }) {
  return children
}
