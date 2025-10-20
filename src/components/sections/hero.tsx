"use client";

import { motion } from "framer-motion";
import { Button } from "../ui/button";
import Link from "next/link";
import Image from "next/image";
import { Facebook, Linkedin, Mail, Clock, BookOpen, Download, Eye } from "lucide-react";
import { Badge } from "../ui/badge";
import { useState, useEffect } from "react";

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
  bio: "Founder of H.L.-Eduroom and The Hitesh Sir Platform lead educator for +2 Exams. Passionate about guiding students toward their dream careers in medicine.",
  socials: {
    facebook: "https://www.facebook.com/thehiteshsir",
    linkedin: "https://www.linkedin.com/in/hitesh-sharma-8a3366329",
    email: "mailto:hleduroom@gmail.com",
    whatsapp: "https://wa.me/9779827728726?text=Hello%20Hitesh%20Sir,%20I'd%20like%20to%20know%20more%20about%20your%20courses.",
  },
};

export function Hero() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
    is3AM: false
  });

  const [isBookOpen, setIsBookOpen] = useState(false);

  useEffect(() => {
    const calculateTimeTo3AM = () => {
      const now = new Date();
      const target = new Date();
      
      // Set target to next 3 AM
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
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
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
        stiffness: 100
      }
    },
  };

  const imageVariants = {
    hidden: { scale: 0.5, opacity: 0, rotateY: 90 },
    visible: {
      scale: 1,
      opacity: 1,
      rotateY: 0,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 10,
        delay: 0.3,
      },
    },
  };

  const bookVariants = {
    closed: { 
      rotateY: 0,
      transition: { type: "spring", stiffness: 300, damping: 30 }
    },
    open: { 
      rotateY: -180,
      transition: { type: "spring", stiffness: 300, damping: 30 }
    }
  };

  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <motion.div
          className="flex flex-col items-center gap-6"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {/* Profile Image */}
          <motion.div
            className="relative h-40 w-40 overflow-hidden rounded-full shadow-2xl md:h-48 md:w-48"
            variants={imageVariants}
            style={{ perspective: 1000 }}
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
          <motion.h1 
            className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl font-headline text-center" 
            variants={itemVariants}
          >
            {userDetails.name}
          </motion.h1>
          
          <motion.p className="text-lg text-primary font-semibold" variants={itemVariants}>
            {userDetails.role}
          </motion.p>

          {/* Book Announcement */}
          <motion.div 
            className="text-center max-w-4xl space-y-4"
            variants={itemVariants}
          >
            <Badge variant="default" className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 text-sm">
              <BookOpen className="w-4 h-4 mr-2" />
              New Book Published!
            </Badge>
            
            <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              3 AM Confessions: My Life as OverThinker
            </h2>
            
            <p className="text-muted-foreground text-lg">
              Published at 3 AM - A journey through midnight thoughts and revelations
            </p>

            {/* Countdown Timer */}
            <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-2xl p-6 border border-blue-500/30">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Clock className="w-5 h-5 text-blue-400" />
                <span className="text-sm font-medium text-blue-300">
                  {timeLeft.is3AM ? "Available Now!" : "Full Release In:"}
                </span>
              </div>
              
              {!timeLeft.is3AM && (
                <div className="flex justify-center gap-4 text-center">
                  <div className="flex flex-col">
                    <span className="text-2xl font-bold text-white">{timeLeft.hours.toString().padStart(2, '0')}</span>
                    <span className="text-xs text-blue-300">HOURS</span>
                  </div>
                  <span className="text-2xl font-bold text-white">:</span>
                  <div className="flex flex-col">
                    <span className="text-2xl font-bold text-white">{timeLeft.minutes.toString().padStart(2, '0')}</span>
                    <span className="text-xs text-blue-300">MINUTES</span>
                  </div>
                  <span className="text-2xl font-bold text-white">:</span>
                  <div className="flex flex-col">
                    <span className="text-2xl font-bold text-white">{timeLeft.seconds.toString().padStart(2, '0')}</span>
                    <span className="text-xs text-blue-300">SECONDS</span>
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          {/* Book Preview */}
          <motion.div 
            className="w-full max-w-2xl space-y-4"
            variants={itemVariants}
          >
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-2">Book Preview</h3>
              <p className="text-muted-foreground text-sm">
                Click the book to preview the first page
              </p>
            </div>

            {/* Book Animation */}
            <div className="flex justify-center">
              <motion.div
                className="relative w-64 h-80 cursor-pointer"
                style={{ perspective: 1200 }}
                onClick={() => setIsBookOpen(!isBookOpen)}
                animate={isBookOpen ? "open" : "closed"}
                variants={bookVariants}
              >
                {/* Book Cover */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-900 to-blue-900 rounded-lg shadow-2xl border-2 border-purple-500/50 flex flex-col items-center justify-center p-6 text-white">
                  <BookOpen className="w-12 h-12 mb-4" />
                  <h4 className="text-lg font-bold text-center">3 AM Confessions</h4>
                  <p className="text-sm text-center mt-2 text-purple-200">My Life as OverThinker</p>
                  <div className="absolute bottom-4 text-xs text-purple-300">
                    Click to preview
                  </div>
                </div>

                {/* Book Pages */}
                <div className="absolute inset-0 bg-gradient-to-r from-amber-50 to-amber-100 rounded-lg shadow-2xl border-2 border-amber-200 flex items-center justify-center p-6">
                  <div className="text-center">
                    <Eye className="w-8 h-8 mx-auto mb-3 text-amber-600" />
                    <p className="text-sm text-amber-800 mb-4">
                      Preview Available - Full PDF at 3 AM
                    </p>
                    <Button 
                      size="sm" 
                      className="bg-amber-600 hover:bg-amber-700"
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open('/3AM-Confessions-Preview.pdf', '_blank');
                      }}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      View Preview
                    </Button>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Bio */}
          <motion.p className="max-w-2xl text-muted-foreground md:text-xl text-center" variants={itemVariants}>
            {userDetails.bio}
          </motion.p>

          {/* Social Links */}
          <motion.div className="flex items-center gap-2" variants={itemVariants}>
            <Button variant="ghost" size="icon" asChild>
              <Link href={userDetails.socials.facebook} target="_blank" aria-label="Facebook">
                <Facebook className="h-5 w-5" />
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <Link href={userDetails.socials.linkedin} target="_blank" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5" />
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <Link href={userDetails.socials.email} aria-label="Email">
                <Mail className="h-5 w-5" />
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <Link href={userDetails.socials.whatsapp} target="_blank" aria-label="WhatsApp">
                <WhatsappIcon className="h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}