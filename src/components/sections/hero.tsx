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
  role: "Founder & Educator",
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
      "name": "3 AM Confessions: My Life as OverThinker",
      "author": {
        "@id": "https://thehiteshsir.com/#person"
      },
      "bookFormat": "https://schema.org/EBook",
      "datePublished": new Date().toISOString().split('T')[0],
      "inLanguage": "en",
      "isbn": "978-0000000000",
      "numberOfPages": 150,
      "publisher": "H.L.-Eduroom Publications",
      "description": "A profound journey through midnight thoughts and revelations. Published daily at 3 AM, this book explores the life of an overthinker through intimate confessions.",
      "genre": ["Self-Help", "Psychology", "Personal Development"],
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD",
        "availability": "https://schema.org/InStock",
        "url": "https://thehiteshsir.com/3AM-Confessions-Preview.pdf"
      }
    },
    {
      "@type": "WebSite",
      "name": "Hitesh Sharma - Official Portfolio",
      "url": "https://thehiteshsir.com",
      "description": "Official portfolio of Hitesh Sharma - Founder, Educator, and Author of 3 AM Confessions",
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
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 120
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
        stiffness: 100,
        delay: 0.4,
      }
    },
    hover: {
      scale: 1.02,
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

      {/* SEO Meta Tags */}
      <meta name="description" content="Hitesh Sharma - Founder & Educator, Author of '3 AM Confessions: My Life as OverThinker'. Founder of H.L.-Eduroom educational platform." />
      <meta name="keywords" content="Hitesh Sharma, 3 AM Confessions, OverThinker, H.L.-Eduroom, Educator, Author, Medical Career Guidance, +2 Exams, Book Release" />
      <meta name="author" content="Hitesh Sharma" />
      
      {/* Open Graph Tags */}
      <meta property="og:title" content="Hitesh Sharma - Founder, Educator & Author" />
      <meta property="og:description" content="Author of '3 AM Confessions: My Life as OverThinker'. Founder of H.L.-Eduroom - Guiding students toward medical careers." />
      <meta property="og:image" content="https://res.cloudinary.com/dgxoe15jd/image/upload/v1756232910/retouch_2025080121291186_hcbobr.jpg" />
      <meta property="og:url" content="https://thehiteshsir.com" />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Hitesh Sharma Portfolio" />
      
      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Hitesh Sharma - Founder, Educator & Author" />
      <meta name="twitter:description" content="Author of '3 AM Confessions: My Life as OverThinker'. Founder of H.L.-Eduroom educational platform." />
      <meta name="twitter:image" content="https://res.cloudinary.com/dgxoe15jd/image/upload/v1756232910/retouch_2025080121291186_hcbobr.jpg" />
      <meta name="twitter:creator" content="@thehiteshsir" />

      <Analytics />
      <section className="w-full py-12 md:py-20 lg:py-24 bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
        <div className="container px-4 md:px-6">
          <motion.div
            className="flex flex-col items-center gap-10"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            {/* Profile Image */}
            <motion.div
              className="relative h-32 w-32 overflow-hidden rounded-full shadow-2xl md:h-36 md:w-36 border-4 border-white/20 dark:border-slate-800/50"
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
            <motion.div className="text-center space-y-3" variants={itemVariants}>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl font-headline bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent" itemProp="name">
                {userDetails.name}
              </h1>
              <p className="text-lg text-primary font-semibold tracking-wide uppercase text-sm" itemProp="jobTitle">
                {userDetails.role}
              </p>
            </motion.div>

            {/* Book Announcement Section */}
            <motion.div 
              className="text-center max-w-4xl space-y-8"
              variants={itemVariants}
            >
              {/* Book Badge and Title */}
              <div className="space-y-4">
                <Badge variant="secondary" className="bg-gradient-to-r from-red-600 to-rose-700 text-white px-6 py-2 text-sm font-bold border-0 shadow-lg">
                  <Star className="w-4 h-4 mr-2 fill-current" />
                  NEW BOOK RELEASE
                </Badge>
                
                <div className="space-y-3" itemScope itemType="https://schema.org/Book">
                  <h2 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent tracking-tight leading-tight" itemProp="name">
                    3 AM Confessions
                  </h2>
                  <p className="text-lg md:text-xl text-muted-foreground font-light italic" itemProp="alternativeHeadline">
                    My Life as OverThinker
                  </p>
                  <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span>Published Daily at 3 AM</span>
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
                <div className="relative w-64 h-80 mx-auto shadow-2xl rounded-xl overflow-hidden border-4 border-white/20 dark:border-slate-800/50">
                  <Image
                    src="/book_cover.png"
                    alt="3 AM Confessions Book Cover - A profound journey through midnight thoughts and revelations"
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                    <Button className="bg-white/90 hover:bg-white text-slate-900 font-semibold">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Read Preview
                    </Button>
                  </div>
                </div>
                <div className="absolute -inset-4 bg-gradient-to-r from-red-500/10 to-rose-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
              </motion.div>

              {/* Professional Countdown Timer */}
              <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 border border-slate-700/50 shadow-2xl">
                <div className="flex items-center justify-center gap-2 mb-6">
                  <Clock className="w-5 h-5 text-red-400" />
                  <span className="text-base font-semibold text-slate-200">
                    {timeLeft.is3AM ? "📖 Available Now!" : "⏳ Full Release In"}
                  </span>
                </div>
                
                {!timeLeft.is3AM && (
                  <div className="flex justify-center gap-4 text-center">
                    <div className="flex flex-col items-center">
                      <div className="bg-gradient-to-b from-red-600 to-rose-700 text-white text-2xl md:text-3xl font-mono font-bold rounded-lg px-3 py-3 min-w-[60px] shadow-lg border border-red-500/30">
                        {timeLeft.hours.toString().padStart(2, '0')}
                      </div>
                      <span className="text-xs text-red-300 font-medium mt-2 uppercase tracking-wider">Hours</span>
                    </div>
                    
                    <div className="flex items-center justify-center">
                      <div className="w-1 h-1 bg-red-500 rounded-full mx-1"></div>
                      <div className="w-1 h-1 bg-red-500 rounded-full mx-1"></div>
                    </div>
                    
                    <div className="flex flex-col items-center">
                      <div className="bg-gradient-to-b from-red-600 to-rose-700 text-white text-2xl md:text-3xl font-mono font-bold rounded-lg px-3 py-3 min-w-[60px] shadow-lg border border-red-500/30">
                        {timeLeft.minutes.toString().padStart(2, '0')}
                      </div>
                      <span className="text-xs text-red-300 font-medium mt-2 uppercase tracking-wider">Minutes</span>
                    </div>
                    
                    <div className="flex items-center justify-center">
                      <div className="w-1 h-1 bg-red-500 rounded-full mx-1"></div>
                      <div className="w-1 h-1 bg-red-500 rounded-full mx-1"></div>
                    </div>
                    
                    <div className="flex flex-col items-center">
                      <div className="bg-gradient-to-b from-red-600 to-rose-700 text-white text-2xl md:text-3xl font-mono font-bold rounded-lg px-3 py-3 min-w-[60px] shadow-lg border border-red-500/30">
                        {timeLeft.seconds.toString().padStart(2, '0')}
                      </div>
                      <span className="text-xs text-red-300 font-medium mt-2 uppercase tracking-wider">Seconds</span>
                    </div>
                  </div>
                )}
                
                {timeLeft.is3AM && (
                  <div className="text-center py-4">
                    <Button 
                      size="lg" 
                      className="bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-700 hover:to-rose-800 text-white font-bold shadow-lg"
                      onClick={() => window.open('/3AM-Confessions-Preview.pdf', '_blank')}
                      itemProp="url"
                    >
                      <BookOpen className="w-5 h-5 mr-2" />
                      Read Full Book Now
                    </Button>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Bio */}
            <motion.p className="max-w-2xl text-base text-muted-foreground text-center leading-relaxed font-light" variants={itemVariants} itemProp="description">
              {userDetails.bio}
            </motion.p>

            {/* Social Links */}
            <motion.div className="flex items-center gap-2" variants={itemVariants}>
              <Button variant="ghost" size="sm" className="h-10 w-10 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700" asChild>
                <Link href={userDetails.socials.facebook} target="_blank" aria-label="Facebook" itemProp="sameAs">
                  <Facebook className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="ghost" size="sm" className="h-10 w-10 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700" asChild>
                <Link href={userDetails.socials.linkedin} target="_blank" aria-label="LinkedIn" itemProp="sameAs">
                  <Linkedin className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="ghost" size="sm" className="h-10 w-10 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700" asChild>
                <Link href={userDetails.socials.email} aria-label="Email">
                  <Mail className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="ghost" size="sm" className="h-10 w-10 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700" asChild>
                <Link href={userDetails.socials.whatsapp} target="_blank" aria-label="WhatsApp">
                  <WhatsappIcon className="h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}