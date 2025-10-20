"use client";

import { motion } from "framer-motion";
import { Button } from "../ui/button";
import Link from "next/link";
import Image from "next/image";
import { Facebook, Linkedin, Mail, Clock, BookOpen, ExternalLink, Star } from "lucide-react";
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
      <path d="M9.5 13c.5.5 1 .5 1.5.5s1 0 1.5-.5" />
    </svg>
  );
}

const userDetails = {
  name: "Hitesh Sharma",
  role: " Normal Human try to Experiencing Moments of Life 🍃",
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
      "description": "Official portfolio of Hitesh Sharma - The Normal Human try to Experiencing Moments of Life 🍃",
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

export function Hero() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
    is3AM: false
  });

  useEffect(() => {
    const calculateTimeTo3AM = () => {
      const now = new Date();
      const target = new Date();
      
      target.setHours(3, 0, 0, 0);
      if (now.getHours() >= 3) {
        target.setDate(target.getDate() + 1);
      }

      const difference = target.getTime() - now.getTime();
      
      if (difference <= 0) {
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0, is3AM: true });
        return;
      }

      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ hours, minutes, seconds, is3AM: false });
    };

    calculateTimeTo3AM();
    const timer = setInterval(calculateTimeTo3AM, 1000);

    return () => clearInterval(timer);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 15, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    },
  };

  const imageVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 90,
        delay: 0.1,
      },
    },
  };

  const bookImageVariants = {
    hidden: { scale: 0.95, opacity: 0, y: 10 },
    visible: {
      scale: 1,
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 80,
        delay: 0.3,
      }
    },
    hover: {
      scale: 1.03,
      y: -3,
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
      <section className="w-full py-8 md:py-16 lg:py-20 relative overflow-hidden">
        {/* Background Cover Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/book_cover.png"
            alt="3 AM Confessions Book Cover Background"
            fill
            className="object-cover opacity-5"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/95 via-white/90 to-white/80 dark:from-slate-950/95 dark:via-slate-950/90 dark:to-slate-950/80" />
        </div>

        <div className="container px-4 md:px-6 relative z-10">
          <motion.div
            className="flex flex-col items-center gap-8"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            {/* Profile Image */}
            <motion.div
              className="relative h-28 w-28 overflow-hidden rounded-full shadow-xl md:h-32 md:w-32 border-4 border-white/30 dark:border-slate-800/60 bg-white/10 backdrop-blur-sm"
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
            <motion.div className="text-center space-y-2" variants={itemVariants}>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl font-headline text-slate-900 dark:text-white" itemProp="name">
                {userDetails.name}
              </h1>
              <p className="text-sm text-primary font-medium tracking-wide uppercase" itemProp="jobTitle">
                {userDetails.role}
              </p>
            </motion.div>

            {/* Book Announcement Section */}
            <motion.div 
              className="text-center max-w-3xl space-y-6"
              variants={itemVariants}
            >
              {/* Book Badge and Title */}
              <div className="space-y-3">
                <Badge variant="secondary" className="bg-gradient-to-r from-red-600 to-rose-700 text-white px-4 py-1 text-xs font-semibold border-0 shadow-md">
                  <Star className="w-3 h-3 mr-1.5 fill-current" />
                  NEW RELEASE
                </Badge>
                
                <div className="space-y-2" itemScope itemType="https://schema.org/Book">
                  <h2 className="text-xl md:text-3xl font-bold text-slate-900 dark:text-white tracking-tight leading-tight" itemProp="name">
                    3 AM Confessions: My Life as an Overthinker
                  </h2>
                  <div className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    <span>Release Preview at 3 AM</span>
                  </div>
                  <meta itemProp="author" content="Hitesh Sharma" />
                  <meta itemProp="datePublished" content={new Date().toISOString().split('T')[0]} />
                  <meta itemProp="publisher" content="H.L.-Eduroom Publications" />
                </div>
              </div>

              {/* Book Cover Image */}
              <motion.div 
                className="relative group cursor-pointer"
                variants={bookImageVariants}
                whileHover="hover"
                onClick={() => window.open('/3AM-Confessions-Preview.pdf', '_blank')}
                itemProp="image"
              >
                <div className="relative w-56 h-72 mx-auto shadow-2xl rounded-lg overflow-hidden border-4 border-white/40 dark:border-slate-800/60 bg-white/5 backdrop-blur-sm">
                  <Image
                    src="/book_cover.png"
                    alt="3 AM Confessions: My Life as an Overthinker - Book Cover"
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                    <Button className="bg-white/95 hover:bg-white text-slate-900 font-medium text-sm">
                      <ExternalLink className="w-3.5 h-3.5 mr-1.5" />
                      Read Preview
                    </Button>
                  </div>
                </div>
                <div className="absolute -inset-3 bg-gradient-to-r from-red-500/20 to-rose-500/20 rounded-xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
              </motion.div>

              {/* Professional Countdown Timer */}
              <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-xl p-4 border border-slate-200/50 dark:border-slate-700/50 shadow-lg">
                <div className="flex items-center justify-center gap-1.5 mb-4">
                  <Clock className="w-4 h-4 text-red-500" />
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                    {timeLeft.is3AM ? "📖 Available Now!" : "⏳ Full Release In"}
                  </span>
                </div>
                
                {!timeLeft.is3AM && (
                  <div className="flex justify-center gap-3 text-center">
                    <div className="flex flex-col items-center">
                      <div className="bg-gradient-to-b from-red-600 to-rose-700 text-white text-xl md:text-2xl font-mono font-bold rounded px-2 py-2 min-w-[50px] shadow-md border border-red-500/30">
                        {timeLeft.hours.toString().padStart(2, '0')}
                      </div>
                      <span className="text-[10px] text-red-600 dark:text-red-400 font-medium mt-1.5 uppercase tracking-wider">HRS</span>
                    </div>
                    
                    <div className="flex items-center justify-center pt-2">
                      <div className="w-1 h-1 bg-red-500 rounded-full mx-0.5"></div>
                      <div className="w-1 h-1 bg-red-500 rounded-full mx-0.5"></div>
                    </div>
                    
                    <div className="flex flex-col items-center">
                      <div className="bg-gradient-to-b from-red-600 to-rose-700 text-white text-xl md:text-2xl font-mono font-bold rounded px-2 py-2 min-w-[50px] shadow-md border border-red-500/30">
                        {timeLeft.minutes.toString().padStart(2, '0')}
                      </div>
                      <span className="text-[10px] text-red-600 dark:text-red-400 font-medium mt-1.5 uppercase tracking-wider">MIN</span>
                    </div>
                    
                    <div className="flex items-center justify-center pt-2">
                      <div className="w-1 h-1 bg-red-500 rounded-full mx-0.5"></div>
                      <div className="w-1 h-1 bg-red-500 rounded-full mx-0.5"></div>
                    </div>
                    
                    <div className="flex flex-col items-center">
                      <div className="bg-gradient-to-b from-red-600 to-rose-700 text-white text-xl md:text-2xl font-mono font-bold rounded px-2 py-2 min-w-[50px] shadow-md border border-red-500/30">
                        {timeLeft.seconds.toString().padStart(2, '0')}
                      </div>
                      <span className="text-[10px] text-red-600 dark:text-red-400 font-medium mt-1.5 uppercase tracking-wider">SEC</span>
                    </div>
                  </div>
                )}
                
                {timeLeft.is3AM && (
                  <div className="text-center py-2">
                    <Button 
                      size="sm" 
                      className="bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-700 hover:to-rose-800 text-white font-semibold shadow-md text-sm"
                      onClick={() => window.open('/3AM-Confessions-Preview.pdf', '_blank')}
                      itemProp="url"
                    >
                      <BookOpen className="w-4 h-4 mr-1.5" />
                      Read Full Book
                    </Button>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Bio */}
            <motion.p className="max-w-2xl text-sm text-muted-foreground text-center leading-relaxed" variants={itemVariants} itemProp="description">
              {userDetails.bio}
            </motion.p>

            {/* Social Links */}
            <motion.div className="flex items-center gap-1.5" variants={itemVariants}>
              <Button variant="ghost" size="sm" className="h-9 w-9 rounded-full bg-white/50 dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-700 backdrop-blur-sm" asChild>
                <Link href={userDetails.socials.facebook} target="_blank" aria-label="Facebook" itemProp="sameAs">
                  <Facebook className="h-3.5 w-3.5" />
                </Link>
              </Button>
              <Button variant="ghost" size="sm" className="h-9 w-9 rounded-full bg-white/50 dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-700 backdrop-blur-sm" asChild>
                <Link href={userDetails.socials.linkedin} target="_blank" aria-label="LinkedIn" itemProp="sameAs">
                  <Linkedin className="h-3.5 w-3.5" />
                </Link>
              </Button>
              <Button variant="ghost" size="sm" className="h-9 w-9 rounded-full bg-white/50 dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-700 backdrop-blur-sm" asChild>
                <Link href={userDetails.socials.email} aria-label="Email">
                  <Mail className="h-3.5 w-3.5" />
                </Link>
              </Button>
              <Button variant="ghost" size="sm" className="h-9 w-9 rounded-full bg-white/50 dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-700 backdrop-blur-sm" asChild>
                <Link href={userDetails.socials.whatsapp} target="_blank" aria-label="WhatsApp">
                  <WhatsappIcon className="h-3.5 w-3.5" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}