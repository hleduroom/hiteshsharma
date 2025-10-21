"use client";

import { motion } from "framer-motion";
import { Button } from "../ui/button";
import Link from "next/link";
import Image from "next/image";
import { Facebook, Linkedin, Mail, BookOpen, ExternalLink, Star, ArrowRight } from "lucide-react";
import { Badge } from "../ui/badge";
import { useState, useEffect } from "react";
import { Analytics } from "@vercel/analytics/next";

// A component for the Whatsapp icon
function WhatsappIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
      <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1Z" />
      <path d="M14 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1Z" />
      <path d="M9.5 13a3.5 3.5 0 0 0 5 0" />
    </svg>
  );
}

const userDetails = {
  name: "Hitesh Sharma",
  role: "Educator & Founder",
  image: "https://res.cloudinary.com/dgxoe15jd/image/upload/v1756232910/retouch_2025080121291186_hcbobr.jpg",
  bio: "Founder of H.L.-Eduroom and The Hitesh Sir Platform. Lead educator for +2 Exams, guiding students toward medical careers.",
  socials: {
    facebook: "https://www.facebook.com/thehiteshsir",
    linkedin: "https://www.linkedin.com/in/hitesh-sharma-8a3366329",
    email: "mailto:hleduroom@gmail.com",
    whatsapp: "https://wa.me/9779827728726?text=Hello%20Hitesh%20Sir,%20I'd%20like%20to%20know%20more%20about%20your%20courses.",
  },
};

// Schema.org structured data
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://thehiteshsir.com/#person",
      "name": "Hitesh Sharma",
      "url": "https://thehiteshsir.com",
      "image": "https://res.cloudinary.com/dgxoe15jd/image/upload/v1756232910/retouch_2025080121291186_hcbobr.jpg",
      "jobTitle": "Founder & Educator",
      "description": "Founder of H.L.-Eduroom and The Hitesh Sir Platform. Lead educator for +2 Exams, guiding students toward medical careers.",
      "sameAs": [
        "https://www.facebook.com/thehiteshsir",
        "https://www.linkedin.com/in/hitesh-sharma-8a3366329"
      ]
    },
    {
      "@type": "Book",
      "name": "3 AM Confessions: My Life as an Overthinker",
      "author": {
        "@id": "https://thehiteshsir.com/#person"
      },
      "bookFormat": "https://schema.org/EBook",
      "datePublished": new Date().toISOString().split('T')[0],
      "inLanguage": "en",
      "isbn": "9789937-1-9247-7",
      "numberOfPages": 196,
      "publisher": "H.L.-Eduroom Publications",
      "description": "A profound journey through midnight thoughts and revelations. Published daily at 3 AM, this book explores the life of an overthinker through intimate confessions.",
      "genre": ["Self-Help", "Psychology", "Personal Development"],
      "offers": {
        "@type": "Offer",
        "price": "399",
        "priceCurrency": "NPR",
        "availability": "https://schema.org/InStock",
        "url": "https://thehiteshsir.com/3AM-Confessions-Preview.pdf"
      }
    },
    {
      "@type": "WebSite",
      "name": "Hitesh Sharma - Official Portfolio",
      "url": "https://hiteshsharma.com.np",
      "description": "Official portfolio of Hitesh Sharma - Educator and Founder of H.L.-Eduroom",
      "publisher": {
        "@id": "https://thehiteshsir.com/#person"
      }
    },
    {
      "@type": "Organization",
      "name": "H.L.-Eduroom",
      "url": "https://thehiteshsir.com",
      "logo": "https://thehiteshsir.com/logo.png",
      "description": "Educational platform founded by Hitesh Sharma specializing in +2 Exam preparation for medical careers."
    }
  ]
};

// Typing animation component
function TypingAnimation() {
  const [text, setText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const fullText = "Normal Human try to Experiencing Moments of Life 🍃";

  useEffect(() => {
    if (currentIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setText(prevText => prevText + fullText[currentIndex]);
        setCurrentIndex(prevIndex => prevIndex + 1);
      }, 50);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, fullText]);

  return (
    <span className="text-lg md:text-xl text-slate-600 dark:text-slate-400 font-light min-h-[28px] inline-block">
      {text}
      <span className="inline-block w-0.5 h-6 bg-slate-400 dark:bg-slate-500 ml-1 animate-pulse" />
    </span>
  );
}

export function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 25, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    },
  };

  const imageVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
        delay: 0.2,
      },
    },
  };

  const bookImageVariants = {
    hidden: { scale: 0.9, opacity: 0, y: 20 },
    visible: {
      scale: 1,
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 80,
        delay: 0.5,
      }
    },
    hover: {
      scale: 1.05,
      y: -5,
      transition: {
        type: "spring",
        stiffness: 400,
      }
    }
  };

  return (
    <>
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      <Analytics />
      
      <section className="w-full min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
        {/* Background Pattern */}
        <div className="absolute inset-0 z-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(#64748b_1px,transparent_1px)] [background-size:16px_16px]" />
        </div>

        {/* Hero Image Background */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/book_cover.png"
            alt="Abstract Background"
            fill
            className="object-cover opacity-5"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/60 to-white/90 dark:from-slate-950/90 dark:via-slate-950/80 dark:to-slate-950/95" />
        </div>

        <div className="container px-4 md:px-6 relative z-10">
          <motion.div
            className="flex flex-col items-center gap-12 max-w-6xl mx-auto"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            {/* Main Content Grid */}
            <div className="grid lg:grid-cols-2 gap-12 items-center w-full">
              {/* Left Column - Text Content */}
              <motion.div className="space-y-8 text-center lg:text-left">
                {/* Profile Image for Mobile */}
                <motion.div
                  className="lg:hidden relative h-32 w-32 mx-auto overflow-hidden rounded-full shadow-2xl border-4 border-white/50 dark:border-slate-800/50 bg-white/10 backdrop-blur-sm"
                  variants={imageVariants}
                  itemProp="image"
                >
                  <Image
                    src={userDetails.image}
                    alt={userDetails.name}
                    fill
                    className="object-cover"
                    priority
                  />
                </motion.div>

                {/* Name and Role */}
                <motion.div className="space-y-4" variants={itemVariants}>
                  <div className="space-y-2">
                    <Badge 
                      variant="secondary" 
                      className="bg-slate-800 text-white px-3 py-1 text-xs font-medium border-0 mb-4"
                    >
                      Educator & Author
                    </Badge>
                    <h1 
                      className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight font-headline text-slate-900 dark:text-white"
                      itemProp="name"
                    >
                      {userDetails.name}
                    </h1>
                  </div>
                  <div className="text-lg md:text-xl text-slate-600 dark:text-slate-400 font-light">
                    <TypingAnimation />
                  </div>
                </motion.div>

                {/* Bio */}
                <motion.p 
                  className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto lg:mx-0"
                  variants={itemVariants}
                  itemProp="description"
                >
                  {userDetails.bio}
                </motion.p>

                {/* CTA Buttons */}
                <motion.div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start" variants={itemVariants}>
                  <Button 
                    size="lg"
                    className="bg-slate-900 hover:bg-slate-800 text-white px-8 py-6 text-base font-medium rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
                    onClick={() => window.open('/3AM-Confessions-Preview.pdf', '_blank')}
                  >
                    <BookOpen className="w-5 h-5 mr-2" />
                    Read Book Preview
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  <Button 
                    variant="outline"
                    size="lg"
                    className="border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 px-8 py-6 text-base font-medium rounded-full hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-300"
                    asChild
                  >
                    <Link href={userDetails.socials.whatsapp} target="_blank">
                      <WhatsappIcon className="w-5 h-5 mr-2" />
                      Connect
                    </Link>
                  </Button>
                </motion.div>

                {/* Social Links */}
                <motion.div className="flex items-center gap-3 justify-center lg:justify-start" variants={itemVariants}>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="h-12 w-12 rounded-full bg-white/50 dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-700 backdrop-blur-sm border border-slate-200 dark:border-slate-700"
                    asChild
                  >
                    <Link href={userDetails.socials.facebook} target="_blank" aria-label="Facebook" itemProp="sameAs">
                      <Facebook className="h-5 w-5" />
                    </Link>
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="h-12 w-12 rounded-full bg-white/50 dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-700 backdrop-blur-sm border border-slate-200 dark:border-slate-700"
                    asChild
                  >
                    <Link href={userDetails.socials.linkedin} target="_blank" aria-label="LinkedIn" itemProp="sameAs">
                      <Linkedin className="h-5 w-5" />
                    </Link>
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="h-12 w-12 rounded-full bg-white/50 dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-700 backdrop-blur-sm border border-slate-200 dark:border-slate-700"
                    asChild
                  >
                    <Link href={userDetails.socials.email} aria-label="Email">
                      <Mail className="h-5 w-5" />
                    </Link>
                  </Button>
                </motion.div>
              </motion.div>

              {/* Right Column - Visual Content */}
              <motion.div className="space-y-8">
                {/* Profile Image for Desktop */}
                <motion.div
                  className="hidden lg:block relative h-96 w-96 mx-auto overflow-hidden rounded-3xl shadow-2xl border-8 border-white/50 dark:border-slate-800/50 bg-white/10 backdrop-blur-sm"
                  variants={imageVariants}
                  itemProp="image"
                >
                  <Image
                    src={userDetails.image}
                    alt={userDetails.name}
                    fill
                    className="object-cover"
                    priority
                  />
                </motion.div>

                {/* Book Showcase */}
                <motion.div 
                  className="relative group cursor-pointer"
                  variants={bookImageVariants}
                  whileHover="hover"
                  onClick={() => window.open('/3AM-Confessions-Preview.pdf', '_blank')}
                  itemProp="image"
                >
                  <div className="relative w-64 h-80 mx-auto shadow-2xl rounded-xl overflow-hidden border-4 border-white/60 dark:border-slate-800/60 bg-white/5 backdrop-blur-sm">
                    <Image
                      src="/book_cover.png"
                      alt="3 AM Confessions: My Life as an Overthinker - Book Cover"
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-6">
                      <Button className="bg-white/95 hover:bg-white text-slate-900 font-medium text-sm px-6 py-3 rounded-full shadow-lg">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Read Preview
                      </Button>
                    </div>
                  </div>
                  
                  {/* Book Badge */}
                  <div className="absolute -top-3 -right-3 z-10">
                    <Badge 
                      className="bg-gradient-to-r from-red-600 to-rose-700 text-white px-4 py-2 text-sm font-semibold border-0 shadow-lg"
                    >
                      <Star className="w-4 h-4 mr-1.5 fill-current" />
                      NEW RELEASE
                    </Badge>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}