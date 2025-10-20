"use client";

import { motion } from "framer-motion";
import { Button } from "../ui/button";
import Link from "next/link";
import Image from "next/image";
import { Facebook, Linkedin, Mail, Clock, BookOpen, Download, Eye, Calendar } from "lucide-react";
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
  bio: "Founder of H.L.-Eduroom and The Hitesh Sir Platform. Lead educator for +2 Exams, guiding students toward medical careers.",
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

  const bookVariants = {
    closed: { 
      rotateY: 0,
      transition: { type: "spring", stiffness: 400, damping: 35 }
    },
    open: { 
      rotateY: -180,
      transition: { type: "spring", stiffness: 400, damping: 35 }
    }
  };

  return (
    <section className="w-full py-8 md:py-16 lg:py-20">
      <div className="container px-4 md:px-6">
        <motion.div
          className="flex flex-col items-center gap-8"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {/* Profile Image */}
          <motion.div
            className="relative h-32 w-32 overflow-hidden rounded-full shadow-xl md:h-40 md:w-40 border-4 border-white/10"
            variants={imageVariants}
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
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl font-headline">
              {userDetails.name}
            </h1>
            <p className="text-base text-primary font-medium tracking-wide">
              {userDetails.role}
            </p>
          </motion.div>

          {/* Book Announcement */}
          <motion.div 
            className="text-center max-w-3xl space-y-6"
            variants={itemVariants}
          >
            <Badge variant="secondary" className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 py-1.5 text-xs font-semibold">
              <BookOpen className="w-3 h-3 mr-1.5" />
              NEW RELEASE
            </Badge>
            
            <div className="space-y-2">
              <h2 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-purple-700 to-blue-700 bg-clip-text text-transparent tracking-tight">
                3 AM Confessions: My Life as OverThinker
              </h2>
              <div className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
                <Calendar className="w-3 h-3" />
                <span>Published at 3 AM</span>
              </div>
            </div>

            {/* Countdown Timer */}
            <div className="bg-gradient-to-br from-slate-900/80 to-slate-800/80 rounded-xl p-4 border border-slate-700/50 backdrop-blur-sm">
              <div className="flex items-center justify-center gap-1.5 mb-3">
                <Clock className="w-4 h-4 text-blue-400" />
                <span className="text-sm font-medium text-slate-300">
                  {timeLeft.is3AM ? "Available Now" : "Full Release In"}
                </span>
              </div>
              
              {!timeLeft.is3AM && (
                <div className="flex justify-center gap-3 text-center">
                  <div className="flex flex-col">
                    <span className="text-lg font-mono font-bold text-white bg-slate-700/50 rounded px-2 py-1">
                      {timeLeft.hours.toString().padStart(2, '0')}
                    </span>
                    <span className="text-[10px] text-slate-400 mt-1">HRS</span>
                  </div>
                  <span className="text-lg font-bold text-slate-400 pt-1">:</span>
                  <div className="flex flex-col">
                    <span className="text-lg font-mono font-bold text-white bg-slate-700/50 rounded px-2 py-1">
                      {timeLeft.minutes.toString().padStart(2, '0')}
                    </span>
                    <span className="text-[10px] text-slate-400 mt-1">MIN</span>
                  </div>
                  <span className="text-lg font-bold text-slate-400 pt-1">:</span>
                  <div className="flex flex-col">
                    <span className="text-lg font-mono font-bold text-white bg-slate-700/50 rounded px-2 py-1">
                      {timeLeft.seconds.toString().padStart(2, '0')}
                    </span>
                    <span className="text-[10px] text-slate-400 mt-1">SEC</span>
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          {/* Book Preview Section */}
          <motion.div 
            className="w-full max-w-4xl space-y-4"
            variants={itemVariants}
          >
            <div className="text-center space-y-1">
              <h3 className="text-lg font-semibold text-foreground">Preview</h3>
              <p className="text-xs text-muted-foreground">
                First page preview • Full book available at 3 AM
              </p>
            </div>

            {/* Embedded PDF Preview */}
            <div className="bg-white rounded-lg shadow-2xl border border-slate-200 overflow-hidden">
              <div className="bg-slate-50 border-b border-slate-200 px-4 py-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  </div>
                  <span className="text-xs font-medium text-slate-600">3AM-Confessions-Preview.pdf</span>
                </div>
                <Button 
                  size="sm" 
                  variant="ghost" 
                  className="h-7 text-xs"
                  onClick={() => window.open('/3AM-Confessions-Preview.pdf', '_blank')}
                >
                  <Download className="w-3 h-3 mr-1" />
                  Download
                </Button>
              </div>
              
              {/* PDF Embed Container */}
              <div className="aspect-[4/5] max-h-[500px] bg-slate-100 flex items-center justify-center">
                <div className="text-center space-y-3 p-8">
                  <Eye className="w-8 h-8 mx-auto text-slate-400" />
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-slate-600">PDF Preview Loading</p>
                    <p className="text-xs text-slate-500">First page preview of "3 AM Confessions"</p>
                  </div>
                  <Button 
                    size="sm" 
                    className="bg-slate-800 hover:bg-slate-900 text-xs"
                    onClick={() => window.open('/3AM-Confessions-Preview.pdf', '_blank')}
                  >
                    <Eye className="w-3 h-3 mr-1.5" />
                    View Full Preview
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Bio */}
          <motion.p className="max-w-2xl text-sm text-muted-foreground text-center leading-relaxed" variants={itemVariants}>
            {userDetails.bio}
          </motion.p>

          {/* Social Links */}
          <motion.div className="flex items-center gap-1" variants={itemVariants}>
            <Button variant="ghost" size="sm" className="h-9 w-9" asChild>
              <Link href={userDetails.socials.facebook} target="_blank" aria-label="Facebook">
                <Facebook className="h-4 w-4" />
              </Link>
            </Button>
            <Button variant="ghost" size="sm" className="h-9 w-9" asChild>
              <Link href={userDetails.socials.linkedin} target="_blank" aria-label="LinkedIn">
                <Linkedin className="h-4 w-4" />
              </Link>
            </Button>
            <Button variant="ghost" size="sm" className="h-9 w-9" asChild>
              <Link href={userDetails.socials.email} aria-label="Email">
                <Mail className="h-4 w-4" />
              </Link>
            </Button>
            <Button variant="ghost" size="sm" className="h-9 w-9" asChild>
              <Link href={userDetails.socials.whatsapp} target="_blank" aria-label="WhatsApp">
                <WhatsappIcon className="h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}