"use client";

import { Section } from "./section";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import Link from "next/link";
import Image from "next/image";
import { Facebook, Linkedin, Mail, BookOpen, ExternalLink, Star } from "lucide-react";
import { Badge } from "../ui/badge";
import { Analytics } from "@vercel/analytics/next";
import { Typewriter } from "react-simple-typewriter";

// WhatsApp Icon
function WhatsappIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16.72 13.09c-.27-.13-1.61-.79-1.86-.88-.25-.09-.43-.13-.61.13-.18.27-.7.88-.86 1.06-.16.18-.32.2-.59.07-.27-.13-1.14-.42-2.17-1.34-.8-.71-1.34-1.59-1.5-1.86-.16-.27-.02-.42.12-.55.13-.13.27-.32.41-.48.13-.16.18-.27.27-.45.09-.18.04-.34-.02-.48-.07-.13-.61-1.47-.83-2.02-.22-.53-.44-.46-.61-.47h-.52c-.18 0-.48.07-.73.34-.25.27-.96.94-.96 2.29s.98 2.66 1.12 2.84c.13.18 1.93 2.94 4.68 4.12.65.28 1.16.45 1.55.58.65.21 1.25.18 1.72.11.53-.08 1.61-.66 1.84-1.29.23-.64.23-1.19.16-1.29-.07-.09-.25-.16-.52-.29z" />
      <path d="M21.05 3.05A10 10 0 1 0 3 21l1.5-4.35a8.4 8.4 0 0 1 16.55-9.6z" />
    </svg>
  );
}

const userDetails = {
  name: "Hitesh Sharma",
  role: "Normal Human trying to Experience Moments of Life 🍃",
  image: "https://res.cloudinary.com/dgxoe15jd/image/upload/v1756232910/retouch_2025080121291186_hcbobr.jpg",
  bio: "Founder of H.L.-Eduroom and The Hitesh Sir Platform. Lead educator for +2 Exams, guiding students toward medical careers.",
  socials: {
    facebook: "https://www.facebook.com/thehiteshsir",
    linkedin: "https://www.linkedin.com/in/hitesh-sharma-8a3366329",
    email: "mailto:hleduroom@gmail.com",
    whatsapp: "https://wa.me/9779827728726?text=Hello%20Hitesh%20Sir,%20I'd%20like%20to%20know%20more%20about%20your%20courses",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://thehiteshsir.com/#person",
      "name": "Hitesh Sharma",
      "url": "https://thehiteshsir.com",
      "image": userDetails.image,
      "jobTitle": "Founder & Educator",
      "description": userDetails.bio,
      "sameAs": [userDetails.socials.facebook, userDetails.socials.linkedin],
    },
    {
      "@type": "Book",
      "name": "3 AM Confessions: My Life as an Overthinker",
      "author": { "@id": "https://thehiteshsir.com/#person" },
      "bookFormat": "https://schema.org/EBook",
      "datePublished": new Date().toISOString().split("T")[0],
      "inLanguage": "en",
      "isbn": "9789937-1-9247-7",
      "numberOfPages": 196,
      "publisher": "H.L.-Eduroom Publications",
      "description":
        "A profound journey through midnight thoughts and revelations. This book explores the life of an overthinker through intimate confessions.",
      "genre": ["Self-Help", "Psychology", "Personal Development"],
      "offers": {
        "@type": "Offer",
        "price": "399",
        "priceCurrency": "NPR",
        "availability": "https://schema.org/InStock",
        "url": "https://thehiteshsir.com/3AM-Confessions-Preview.pdf",
      },
    },
  ],
};

export default function Hero() {
  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <>
      {/* Structured Data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <Analytics />

      <section className="relative flex flex-col items-center justify-center text-center min-h-screen py-16 overflow-hidden bg-gradient-to-b from-white via-gray-50 to-gray-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
        {/* Subtle Background Image */}
        <div className="absolute inset-0 z-0">
          <Image src="/book_cover_img.png" alt="Background" fill className="object-cover opacity-5" />
          <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/80 to-white/90 dark:from-slate-950/95 dark:via-slate-950/90 dark:to-slate-950/95" />
        </div>

        <motion.div className="relative z-10 flex flex-col items-center px-4 space-y-8" initial="hidden" animate="visible" variants={fadeIn}>
          {/* Profile Image */}
          <motion.div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-white/40 shadow-lg bg-white/10 backdrop-blur-sm">
            <Image src={userDetails.image} alt={userDetails.name} fill className="object-cover" priority />
          </motion.div>

          {/* Name + Typing Animation */}
          <motion.h1 className="text-4xl md:text-5xl font-bold font-headline text-slate-900 dark:text-white">
            {userDetails.name}
          </motion.h1>

          <motion.p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 font-medium">
            <Typewriter
              words={[
                "Founder of H.L.-Eduroom 📚",
                "Author of 3 AM Confessions 🕒",
                "Educator & Dreamer ✨",
                "Normal Human Experiencing Life 🍃",
              ]}
              loop={true}
              cursor
              cursorStyle="|"
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={1500}
            />
          </motion.p>

          {/* Book Highlight */}
          <motion.div className="text-center space-y-4 max-w-xl">
            <Badge variant="secondary" className="bg-gradient-to-r from-red-600 to-rose-700 text-white px-3 py-1 font-semibold">
              <Star className="w-3 h-3 mr-1 fill-current" /> New Book
            </Badge>

            <h2 className="text-2xl md:text-3xl font-semibold text-slate-800 dark:text-white">3 AM Confessions: My Life as an Overthinker</h2>

            <motion.div
              className="relative group cursor-pointer w-48 h-64 mx-auto shadow-2xl rounded-lg overflow-hidden border border-white/40 bg-white/5 backdrop-blur-sm"
              whileHover={{ scale: 1.05 }}
              onClick={() => window.open("/3AM-Confessions-Preview.pdf", "_blank")}
            >
              <Image src="/book_cover.png" alt="3 AM Confessions Book" fill className="object-cover transition-transform duration-300 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                <Button className="bg-white/90 hover:bg-white text-slate-900 font-medium text-sm">
                  <ExternalLink className="w-3.5 h-3.5 mr-1.5" /> Read Preview
                </Button>
              </div>
            </motion.div>
          </motion.div>

          {/* Bio */}
          <motion.p className="max-w-2xl text-sm text-muted-foreground text-center leading-relaxed">{userDetails.bio}</motion.p>

          {/* Social Icons */}
          <motion.div className="flex items-center gap-3 justify-center mt-4">
            <Link href={userDetails.socials.facebook} target="_blank" aria-label="Facebook">
              <Button variant="ghost" size="sm" className="rounded-full bg-white/50 dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-700">
                <Facebook className="h-4 w-4" />
              </Button>
            </Link>

            <Link href={userDetails.socials.linkedin} target="_blank" aria-label="LinkedIn">
              <Button variant="ghost" size="sm" className="rounded-full bg-white/50 dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-700">
                <Linkedin className="h-4 w-4" />
              </Button>
            </Link>

            <Link href={userDetails.socials.email} aria-label="Email">
              <Button variant="ghost" size="sm" className="rounded-full bg-white/50 dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-700">
                <Mail className="h-4 w-4" />
              </Button>
            </Link>

            <Link href={userDetails.socials.whatsapp} target="_blank" aria-label="WhatsApp">
              <Button variant="ghost" size="sm" className="rounded-full bg-white/50 dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-700">
                <WhatsappIcon className="h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </>
  );
}