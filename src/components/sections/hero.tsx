"use client";

import { motion } from "framer-motion";
import { Button } from "../ui/button";
import Link from "next/link";
import Image from "next/image";
import { Facebook, Linkedin, Mail, BookOpen, ExternalLink, Star, ArrowRight } from "lucide-react";
import { Badge } from "../ui/badge";
import { useState, useEffect } from "react";
import { Analytics } from "@vercel/analytics/next";

// Whatsapp Icon
function WhatsappIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
      <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1Z" />
      <path d="M14 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1Z" />
      <path d="M9.5 13a3.5 3.5 0 0 0 5 0" />
    </svg>
  );
}

// User Details
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

// Structured Data
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://thehiteshsir.com/#person",
      name: userDetails.name,
      url: "https://thehiteshsir.com",
      image: userDetails.image,
      jobTitle: "Founder & Educator",
      description: userDetails.bio,
      sameAs: [userDetails.socials.facebook, userDetails.socials.linkedin],
    },
  ],
};

// Typing Animation Component
function TypingAnimation() {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const fullText = `यः परिश्रमतः किञ्चित्, न तस्य दुर्लभं जगत्।
Normal Human try to Experiencing Every Moments of Life 🍃`;

  useEffect(() => {
    if (index < fullText.length) {
      const timeout = setTimeout(() => {
        setText(prev => prev + fullText[index]);
        setIndex(prev => prev + 1);
      }, 50);
      return () => clearTimeout(timeout);
    }
  }, [index]);

  return (
    <span className="text-sm md:text-base font-light min-h-[20px] inline-block font-shooting-star text-white/90 dark:text-white/80">
      {text}
      <span className="inline-block w-0.5 h-4 bg-white/70 dark:bg-white/50 ml-1 animate-pulse" />
    </span>
  );
}

// Hero Component
export function Hero() {
  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.3 } } };
  const itemVariants = { hidden: { y: 25, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100, damping: 12 } } };
  const imageVariants = { hidden: { scale: 0.8, opacity: 0 }, visible: { scale: 1, opacity: 1, transition: { type: "spring", stiffness: 100, damping: 10, delay: 0.2 } } };
  const bookVariants = { hidden: { scale: 0.9, opacity: 0, y: 20 }, visible: { scale: 1, opacity: 1, y: 0, transition: { type: "spring", stiffness: 80, delay: 0.5 } }, hover: { scale: 1.05, y: -5, transition: { type: "spring", stiffness: 400 } } };

  const socialIcons: Record<string, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
    facebook: Facebook,
    linkedin: Linkedin,
    email: Mail,
  };

  return (
    <>
      {/* Structured Data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <Analytics />

      <section className="w-full min-h-screen flex items-center justify-center relative overflow-hidden">
        {/* Background Image with Dynamic Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src={userDetails.image}
            alt="Background"
            fill
            className="object-cover scale-110 blur-sm transition-all duration-700"
            priority
          />
          {/* Dynamic Overlay */}
          <div className="absolute inset-0 bg-black/50 dark:bg-black/70 transition-colors duration-700" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70 dark:from-black/80 dark:via-black/50 dark:to-black/70 transition-colors duration-700" />
        </div>

        <div className="container px-4 md:px-6 relative z-10 mt-16">
          <motion.div className="flex flex-col items-center gap-12 max-w-6xl mx-auto" initial="hidden" animate="visible" variants={containerVariants}>
            <div className="grid lg:grid-cols-2 gap-12 items-center w-full">
              {/* Left Column */}
              <motion.div className="space-y-8 text-center lg:text-left">
                {/* Mobile Profile */}
                <motion.div className="lg:hidden relative h-24 w-24 mx-auto overflow-hidden rounded-full shadow-2xl border-4 border-white/30 backdrop-blur-sm" variants={imageVariants}>
                  <Image src={userDetails.image} alt={userDetails.name} fill className="object-cover" priority />
                </motion.div>

                {/* Name & Role */}
                <motion.div className="space-y-4" variants={itemVariants}>
                  <div className="space-y-3">
                    <Badge variant="secondary" className="bg-white/20 text-white border-white/30 px-3 py-1 text-xs font-medium backdrop-blur-sm font-shooting-star dark:bg-white/10 dark:text-white/80">
                      Educator & Author
                    </Badge>
                    <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight font-shooting-star dark:text-white/90">
                      {userDetails.name}
                    </h1>
                  </div>
                  <div className="text-sm md:text-base font-light text-white/90 dark:text-white/80">
                    <TypingAnimation />
                  </div>
                </motion.div>

                {/* Bio */}
                <motion.p className="text-sm text-white/80 dark:text-white/70 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-shooting-star" variants={itemVariants}>
                  {userDetails.bio}
                </motion.p>

                {/* CTA Buttons */}
                <motion.div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start" variants={itemVariants}>
                  <Button
                    size="lg"
                    className="bg-white/20 hover:bg-white/30 text-white border border-white/30 px-6 py-5 text-sm font-medium rounded-full backdrop-blur-sm hover:shadow-lg transition-all duration-300 group font-shooting-star dark:bg-white/10 dark:text-white/80"
                    onClick={() => window.open("/book", "_blank")}
                  >
                    <BookOpen className="w-4 h-4 mr-2" />
                    Buy Book
                    <ArrowRight className="w-3 h-3 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>

                  {/* Connect Button fixed for dark/light */}
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-white/30 text-white hover:bg-white/10 px-6 py-5 text-sm font-medium rounded-full backdrop-blur-sm transition-all duration-300 font-shooting-star dark:border-white/40 dark:text-white/80 dark:hover:bg-white/10"
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
                  {Object.keys(socialIcons).map(key => {
                    const Icon = socialIcons[key];
                    return (
                      <Button
                        key={key}
                        variant="ghost"
                        size="icon"
                        className="h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white dark:bg-white/5 dark:text-white/80"
                        asChild
                      >
                        <Link href={userDetails.socials[key as keyof typeof userDetails.socials]} target="_blank" aria-label={key}>
                          <Icon className="w-4 h-4" />
                        </Link>
                      </Button>
                    );
                  })}
                </motion.div>
              </motion.div>

              {/* Right Column */}
              <motion.div className="space-y-8">
                {/* Desktop Profile */}
                <motion.div className="hidden lg:block relative h-72 w-72 mx-auto overflow-hidden rounded-2xl shadow-2xl border-4 border-white/30 backdrop-blur-sm" variants={imageVariants}>
                  <Image src={userDetails.image} alt={userDetails.name} fill className="object-cover" priority />
                  <div className="absolute inset-0 ring-4 ring-white/10 rounded-2xl" />
                </motion.div>

                {/* Book */}
                <motion.div className="relative group cursor-pointer" variants={bookVariants} whileHover="hover" onClick={() => window.open("/3AM-Confessions-Preview.pdf", "_blank")}>
                  <div className="relative w-48 h-60 mx-auto shadow-2xl rounded-lg overflow-hidden border-2 border-white/30 backdrop-blur-sm bg-white/5 dark:bg-white/10">
                    <Image src="/book_cover_img.png" alt="Book Cover" fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-3">
                      <Button className="bg-white/95 hover:bg-white text-slate-900 font-medium text-xs px-3 py-2 rounded-full shadow-lg font-shooting-star">
                        <ExternalLink className="w-3 h-3 mr-1" />
                        Read Preview
                      </Button>
                    </div>
                  </div>
                  <div className="absolute -top-2 -right-2 z-10">
                    <Badge className="bg-gradient-to-r from-red-500 to-rose-600 text-white px-3 py-1 text-xs font-semibold border-0 shadow-lg font-shooting-star">
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