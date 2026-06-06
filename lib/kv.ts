import { kv } from "@vercel/kv"

export interface GalleryImage {
  id: number
  src: string
  title: string
  titleEn: string
  category: string
  description: string
  eventDate?: string
}

export interface Story {
  id: number
  name: string
  nameEn: string
  achievement: string
  achievementEn: string
  year: string
  quote: string
  quoteEn: string
  category: string
  photoUrl?: string
}

export interface LibraryEvent {
  id: number
  titleMarathi: string
  titleEnglish: string
  date: string
  dateISO: string
  description: string
  category: string
  imagePath: string
}

export interface SiteContent {
  hero: { heading: string; subheading: string; tagline: string }
  about: { heading: string; body: string }
  stats: { books: string; members: string; years: string; newspapers: string }
  contact: {
    address: string
    addressEn: string
    timing: string
    timingEn: string
    phone: string
    email: string
  }
  branding: {
    siteName: string
    siteNameEn: string
    tagline: string
    logoUrl: string
  }
  storyStats: {
    successStudents: string
    govOfficers: string
    doctors: string
    years: string
  }
  footer: {
    orgName: string
    location: string
  }
}

// ── Fallback defaults (current hardcoded data) ──────────────────────────────

const DEFAULT_GALLERY: GalleryImage[] = [
  { id: 1, src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-p9NhWB7z8BQ4zXMYxplCbjJZyxhXKI.png", title: "शिवजयंती उत्सव", titleEn: "Shiv Jayanti Celebration", category: "events", description: "छत्रपती शिवाजी महाराजांची जयंती साजरी" },
  { id: 2, src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-czUo7FO4B1hxjyw0fmOsFcGlsBZvOL.png", title: "वाचन कट्टा", titleEn: "Reading Corner", category: "reading", description: "समुदायिक वृत्तपत्र वाचन सत्र" },
  { id: 3, src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-CcRo9NqKwhNyRElh1BUmRhdObL3Mat.png", title: "ग्रंथालय प्रवेशद्वार", titleEn: "Library Entrance", category: "campus", description: "फुलांनी सजवलेले स्वागत द्वार" },
  { id: 4, src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-FZlXfNuj7UlpLNEVR5UhNYqPayMB1w.png", title: "स्वातंत्र्यदिन", titleEn: "Independence Day", category: "events", description: "राष्ट्रीय ध्वजारोहण समारंभ" },
  { id: 5, src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-czUo7FO4B1hxjyw0fmOsFcGlsBZvOL.png", title: "सकाळचे वाचन", titleEn: "Morning Reading", category: "reading", description: "सकाळच्या शांत वेळी अभ्यास" },
  { id: 6, src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-CcRo9NqKwhNyRElh1BUmRhdObL3Mat.png", title: "हरित परिसर", titleEn: "Green Campus", category: "campus", description: "वृक्षांच्या सावलीत ग्रंथालय" },
]

const DEFAULT_STORIES: Story[] = [
  { id: 1, name: "राज पाटील", nameEn: "Raj Patil", achievement: "UPSC परीक्षा उत्तीर्ण", achievementEn: "Cleared UPSC Exam", year: "2023", quote: "ज्ञानसंपदा वाचनालयाने माझ्या स्वप्नांना पंख दिले. येथील शांत वातावरण आणि पुस्तकांचा समृद्ध संग्रह माझ्या यशाचे रहस्य आहे.", quoteEn: "Dnyansampada library gave wings to my dreams. The peaceful environment and rich collection of books is the secret of my success.", category: "competitive" },
  { id: 2, name: "प्रिया शर्मा", nameEn: "Priya Sharma", achievement: "वैद्यकीय पदवी - MBBS", achievementEn: "Medical Degree - MBBS", year: "2022", quote: "वैद्यकीय प्रवेश परीक्षेची तयारी करताना या वाचनालयाने मला खूप मदत केली.", quoteEn: "This library helped me a lot while preparing for medical entrance exams.", category: "medical" },
  { id: 3, name: "अमित देशमुख", nameEn: "Amit Deshmukh", achievement: "IIT मुंबई प्रवेश", achievementEn: "IIT Mumbai Admission", year: "2021", quote: "JEE परीक्षेची तयारी करताना वाचनालयातील मार्गदर्शनामुळे मला IIT मध्ये प्रवेश मिळाला.", quoteEn: "The guidance at the library helped me get admission to IIT.", category: "engineering" },
  { id: 4, name: "सुनीता जाधव", nameEn: "Sunita Jadhav", achievement: "महाराष्ट्र लोकसेवा आयोग", achievementEn: "Maharashtra PSC Officer", year: "2023", quote: "शासकीय नोकरीचे स्वप्न पूर्ण करण्यात या वाचनालयाचा मोठा वाटा आहे.", quoteEn: "This library played a big role in fulfilling my dream of a government job.", category: "competitive" },
  { id: 5, name: "विकास मोरे", nameEn: "Vikas More", achievement: "CA परीक्षा उत्तीर्ण", achievementEn: "Chartered Accountant", year: "2022", quote: "CA परीक्षेसारख्या कठीण परीक्षेची तयारी करताना वाचनालयातील वातावरणाने मला प्रेरित केले.", quoteEn: "The library environment motivated me while preparing for the CA exam.", category: "professional" },
  { id: 6, name: "अंजली कुलकर्णी", nameEn: "Anjali Kulkarni", achievement: "NET/SET परीक्षा", achievementEn: "NET/SET Qualified", year: "2021", quote: "संशोधन आणि शिक्षण क्षेत्रात जाण्याचे माझे स्वप्न या वाचनालयामुळे पूर्ण झाले.", quoteEn: "My dream of entering research and education was fulfilled because of this library.", category: "research" },
]

const DEFAULT_CONTENT: SiteContent = {
  hero: { heading: "ज्ञानसंपदा", subheading: "सार्वजनिक वाचनालय ग्रंथालय", tagline: "A sanctuary of knowledge nestled in nature's embrace — where every page opens a new world." },
  about: { heading: "ज्ञानाचे एक आश्रयस्थान", body: "ज्ञानसंपदा सार्वजनिक वाचनालय नाशिकच्या हृदयात स्थित एक शांत आश्रयस्थान आहे, जिथे ज्ञान आणि निसर्ग एकत्र येतात." },
  stats: { books: "5000+", members: "10,000+", years: "25+", newspapers: "50+" },
  contact: { address: "ज्ञानसंपदा वाचनालय, नाशिक, महाराष्ट्र", addressEn: "Dnyansampada Library, Nashik, Maharashtra", timing: "सकाळी ९:०० ते सायं. ८:००", timingEn: "9:00 AM – 8:00 PM", phone: "+91 XXX XXX XXXX", email: "info@dnyansampada.in" },
  branding: { siteName: "ज्ञानसंपदा", siteNameEn: "Dnyansampada", tagline: "Public Library, Nashik", logoUrl: "" },
  storyStats: { successStudents: "500+", govOfficers: "50+", doctors: "30+", years: "25+" },
  footer: { orgName: "नाशिक महानगरपालिका अंतर्गत", location: "नाशिक, महाराष्ट्र" },
}

// ── KV helpers ──────────────────────────────────────────────────────────────

export async function getGallery(): Promise<GalleryImage[]> {
  try {
    const data = await kv.get<GalleryImage[]>("gallery:images")
    return data ?? DEFAULT_GALLERY
  } catch {
    return DEFAULT_GALLERY
  }
}

export async function saveGallery(images: GalleryImage[]): Promise<void> {
  await kv.set("gallery:images", images)
}

export async function getStories(): Promise<Story[]> {
  try {
    const data = await kv.get<Story[]>("stories:all")
    return data ?? DEFAULT_STORIES
  } catch {
    return DEFAULT_STORIES
  }
}

export async function saveStories(stories: Story[]): Promise<void> {
  await kv.set("stories:all", stories)
}

export async function getSiteContent(): Promise<SiteContent> {
  try {
    const data = await kv.get<SiteContent>("content:site")
    if (!data) return DEFAULT_CONTENT
    // Merge with defaults to handle old data without new fields
    return {
      ...DEFAULT_CONTENT,
      ...data,
      branding: { ...DEFAULT_CONTENT.branding, ...(data.branding ?? {}) },
      storyStats: { ...DEFAULT_CONTENT.storyStats, ...(data.storyStats ?? {}) },
      footer: { ...DEFAULT_CONTENT.footer, ...(data.footer ?? {}) },
    }
  } catch {
    return DEFAULT_CONTENT
  }
}

export async function saveSiteContent(content: SiteContent): Promise<void> {
  await kv.set("content:site", content)
}
