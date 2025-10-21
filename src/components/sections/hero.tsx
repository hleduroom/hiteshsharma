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
  const fullText = ""यः परिश्रमतः किञ्चित्, न तस्य दुर्लभं जगत्।"
Normal Human try to Experiencing Every Moments of Life 🍃";

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
    <span className="text-sm md:text-base text-white/90 font-light min-h-[20px] inline-block font-shooting-star">
      {text}
      <span className="inline-block w-0.5 h-4 bg-white/70 ml-1 animate-pulse" />
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
      
      <section className="w-full min-h-screen flex items-center justify-center relative overflow-hidden">
        {/* User Image Background with Shadow Effect */}
        <div className="absolute inset-0 z-0">
          <Image
            src={userDetails.image}
            alt="Background"
            fill
            className="object-cover scale-110 blur-sm brightness-50"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        </div>

        {/* Subtle Pattern Overlay */}
        <div className="absolute inset-0 z-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px]" />
        </div>

        <div className="container px-4 md:px-6 relative z-10 mt-16">
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
                  className="lg:hidden relative h-24 w-24 mx-auto overflow-hidden rounded-full shadow-2xl border-4 border-white/30 backdrop-blur-sm"
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
                  <div className="space-y-3">
                    <Badge 
                      variant="secondary" 
                      className="bg-white/20 text-white border-white/30 px-3 py-1 text-xs font-medium backdrop-blur-sm font-shooting-star"
                    >
                      Educator & Author
                    </Badge>
                    <h1 
                      className="text-2xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight font-shooting-star"
                      itemProp="name"
                    >
                      {userDetails.name}
                    </h1>
                  </div>
                  <div className="text-sm md:text-base text-white/90 font-light">
                    <TypingAnimation />
                  </div>
                </motion.div>

                {/* Bio */}
                <motion.p 
                  className="text-sm text-white/80 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-shooting-star"
                  variants={itemVariants}
                  itemProp="description"
                >
                  {userDetails.bio}
                </motion.p>

                {/* CTA Buttons */}
                <motion.div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start" variants={itemVariants}>
                  <Button 
                    size="lg"
                    className="bg-white/20 hover:bg-white/30 text-white border border-white/30 px-6 py-5 text-sm font-medium rounded-full backdrop-blur-sm hover:shadow-lg transition-all duration-300 group font-shooting-star"
                    onClick={() => window.open('/book', '_blank')}
                  >
                    <BookOpen className="w-4 h-4 mr-2" />
                    Buy Book 
                    <ArrowRight className="w-3 h-3 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  <Button 
                    variant="outline"
                    size="lg"
                    className="border-white/30 text-white hover:bg-white/10 px-6 py-5 text-sm font-medium rounded-full backdrop-blur-sm transition-all duration-300 font-shooting-star"
                    asChild
                  >
                    <Link href={userDetails.socials.whatsapp} target="_blank">
                      <WhatsappIcon className="w-4 h-4 mr-2" />
                      Connect With Me
                    </Link>
                  </Button>
                </motion.div>

                {/* Social Links */}
                <motion.div className="flex items-center gap-2 justify-center lg:justify-start" variants={itemVariants}>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white"
                    asChild
                  >
                    <Link href={userDetails.socials.facebook} target="_blank" aria-label="Facebook" itemProp="sameAs">
                      <Facebook className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white"
                    asChild
                  >
                    <Link href={userDetails.socials.linkedin} target="_blank" aria-label="LinkedIn" itemProp="sameAs">
                      <Linkedin className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white"
                    asChild
                  >
                    <Link href={userDetails.socials.email} aria-label="Email">
                      <Mail className="h-4 w-4" />
                    </Link>
                  </Button>
                </motion.div>
              </motion.div>

              {/* Right Column - Visual Content */}
              <motion.div className="space-y-8">
                {/* Profile Image for Desktop with Enhanced Shadow */}
                <motion.div
                  className="hidden lg:block relative h-72 w-72 mx-auto overflow-hidden rounded-2xl shadow-2xl border-4 border-white/30 backdrop-blur-sm"
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
                  <div className="absolute inset-0 ring-4 ring-white/10 rounded-2xl" />
                </motion.div>

                {/* Book Showcase */}
                <motion.div 
                  className="relative group cursor-pointer"
                  variants={bookImageVariants}
                  whileHover="hover"
                  onClick={() => window.open('/3AM-Confessions-Preview.pdf', '_blank')}
                  itemProp="image"
                >
                  <div className="relative w-48 h-60 mx-auto shadow-2xl rounded-lg overflow-hidden border-2 border-white/30 backdrop-blur-sm bg-white/5">
                    <Image
                      src="/book_cover_img.png"
                      alt="3 AM Confessions: My Life as an Overthinker - Book Cover"
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-3">
                      <Button className="bg-white/95 hover:bg-white text-slate-900 font-medium text-xs px-3 py-2 rounded-full shadow-lg font-shooting-star">
                        <ExternalLink className="w-3 h-3 mr-1" />
                        Read Preview
                      </Button>
                    </div>
                  </div>
                  
                  {/* Book Badge */}
                  <div className="absolute -top-2 -right-2 z-10">
                    <Badge 
                      className="bg-gradient-to-r from-red-500 to-rose-600 text-white px-3 py-1 text-xs font-semibold border-0 shadow-lg font-shooting-star"
                    >
                      <Star className="w-3 h-3 mr-1 fill-current" />
                      NEW Release
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