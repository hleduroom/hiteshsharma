"use client";

import { motion } from "framer-motion";
import { Button } from "../ui/button";
import Link from "next/link";
import Image from "next/image";
import { Facebook, Linkedin, Mail } from "lucide-react";
import { Badge } from "../ui/badge";
import { useState, useEffect, useCallback, useMemo } from "react";

// --- Utility Components ---

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
      {/* Path for a standard WhatsApp icon */}
      <path d="M22 14v4a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4" />
      <path d="M12 2C6.5 2 2 6.5 2 12c0 1.5.3 3 .8 4.3l-1.6 5.9 6-1.5c1.4.5 3 .8 4.8.8 5.5 0 9.9-4.5 9.9-10S17.5 2 12 2zM12 20c-1.5 0-3-.4-4.3-1l-3 3 1-3c-1-1.3-1.6-3-1.6-4.9 0-4.4 3.6-8 8-8s8 3.6 8 8-3.6 8-8 8zM17 14.5c-.3-.2-.5-.3-1.1-.6-.6-.3-.9-.4-1.2-.4-.3 0-.6-.1-.8.2s-.7.8-.8.9c-.1.2-.3.2-.5.1-.9-.4-1.7-.9-2.5-1.6-.6-.6-1-1.3-1.4-2s-.5-1.2-.2-1.6c.1-.2.3-.5.4-.6.1-.2.2-.4.3-.5.1-.2.1-.3.1-.6s0-.4-.3-.7c-.2-.2-.5-.6-.7-.8-.2-.3-.5-.2-.7-.2h-.4c-.2 0-.6.1-1 .5-.4.4-.7.9-.7 1.2s.7 1.6 1 1.9c.2.3.4.6.6.7.2.1.4.3.5.4.1.1.2.3.2.5s-.2.5-.2.7c-.1.2-.2.3-.4.5-.2.2-.4.3-.6.4-.3.2-.5.3-1 .6z" />
    </svg>
  );
}

// --- Book Constants ---
const LAUNCH_HOUR = 3; // 3 AM
const LAUNCH_MINUTE = 0; // 0 minutes
const PDF_PREVIEW_PATH = "/3AM-Confessions-Preview.pdf#page=1";
const PDF_FULL_PATH = "/3AM-Confessions-Full.pdf"; // Assuming you have the full PDF name

// --- Core Component ---

const userDetails = {
  name: "Hitesh Sharma",
  role: "Author & Educator", // Updated role to reflect book focus
  image: "https://res.cloudinary.com/dgxoe15jd/image/upload/v1756232910/retouch_2025080121291186_hcbobr.jpg",
  bio: "Author of the deeply personal '3 AM Confessions: My Life as OverThinker'. Dedicated to sharing insights on education and life's complexities.", // Updated bio
  socials: {
    facebook: "https://www.facebook.com/thehiteshsir",
    linkedin: "https://www.linkedin.com/in/hitesh-sharma-8a3366329",
    email: "mailto:hleduroom@gmail.com",
    whatsapp: "https://wa.me/9779827728726?text=Hello%20Hitesh%20Sir,%20I'd%20like%20to%20know%20more%20about%20your%20work.",
  },
};

// Custom Hook for Countdown Timer
const useLaunchCountdown = () => {
  const calculateTimeLeft = useCallback(() => {
    const now = new Date();
    const launchDate = new Date();
    
    // Set launch time to 3:00 AM today
    launchDate.setHours(LAUNCH_HOUR, LAUNCH_MINUTE, 0, 0);

    // If it's already past 3 AM today, set the launch time to 3 AM tomorrow
    if (now.getTime() > launchDate.getTime()) {
      launchDate.setDate(launchDate.getDate() + 1);
    }
    
    const difference = launchDate.getTime() - now.getTime();
    
    if (difference <= 0) {
      return { hours: 0, minutes: 0, seconds: 0, isLaunched: true };
    }

    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / 1000 / 60) % 60);
    const seconds = Math.floor((difference / 1000) % 60);

    return { hours, minutes, seconds, isLaunched: false };
  }, []);

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [calculateTimeLeft]);

  return timeLeft;
};

// Placeholder for the Book Viewer (requires a PDF viewer library, e.g., react-pdf)
const BookViewer = ({ isLaunched }: { isLaunched: boolean }) => {
  const pdfPath = isLaunched ? PDF_FULL_PATH : PDF_PREVIEW_PATH;
  
  // NOTE: Implementing a PDF viewer and a Book Turning Animation (like page-flip-react) 
  // is complex and requires external libraries. This component serves as a professional placeholder.
  return (
    <motion.div
      className="w-full max-w-lg mx-auto h-[400px] bg-card border-4 border-primary/50 rounded-lg shadow-2xl flex items-center justify-center overflow-hidden"
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1.5, duration: 1 }}
    >
      <div className="text-center p-4">
        <p className="text-xl font-bold text-primary mb-2">
          {isLaunched ? "Full Book is LIVE!" : "Preview (1st Page)"}
        </p>
        <p className="text-muted-foreground">
          {/* In a real implementation, you would use an iframe or a react-pdf viewer here */}
          **Book Turning Animation Preview (Placeholder)**
        </p>
        <a 
          href={pdfPath} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-sm text-blue-500 hover:underline mt-2 block"
        >
          {isLaunched ? "Read Full Book" : "View 1st Page Preview"}
        </a>
      </div>
    </motion.div>
  );
};

// Countdown Display Component
const CountdownDisplay = ({ time, isLaunched }: ReturnType<typeof useLaunchCountdown>) => {
  if (isLaunched) {
    return (
      <Badge variant="success" className="text-lg px-4 py-2 bg-green-500 hover:bg-green-500 animate-none">
        🎉 Book Published at 3 AM!
      </Badge>
    );
  }

  const formatTime = (value: number) => String(value).padStart(2, '0');

  return (
    <div className="flex flex-col items-center">
      <Badge variant="outline" className="text-xs mb-2 border-primary text-primary">
        Next Launch at 3:00 AM Today
      </Badge>
      <div className="flex space-x-4">
        {[
          { label: "HOURS", value: formatTime(time.hours) },
          { label: "MINUTES", value: formatTime(time.minutes) },
          { label: "SECONDS", value: formatTime(time.seconds) },
        ].map((unit) => (
          <div key={unit.label} className="text-center p-2 rounded-lg bg-card/60 backdrop-blur-sm shadow-inner min-w-[70px]">
            <span className="text-3xl font-extrabold text-foreground tabular-nums">
              {unit.value}
            </span>
            <p className="text-xs text-muted-foreground font-medium">{unit.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- Hero Component ---

export function Hero() {
  const timeLeft = useLaunchCountdown();
  const isLaunched = timeLeft.isLaunched;

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
        stiffness: 100,
      },
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

  return (
    <section className="py-12 md:py-24 lg:py-32 w-full">
      <div className="container px-4 md:px-6">
        <motion.div
          className="flex flex-col items-center gap-10"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {/* 1. Profile Image and Name */}
          <div className="flex flex-col items-center gap-6">
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
            <motion.h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl font-headline" variants={itemVariants}>
              {userDetails.name}
            </motion.h1>
            <motion.p className="text-lg text-primary" variants={itemVariants}>
              {userDetails.role}
            </motion.p>
          </div>

          {/* 2. Book Publication Announcement & Countdown */}
          <motion.div className="text-center max-w-3xl" variants={itemVariants}>
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-4 font-headline text-foreground">
              "3 AM Confessions: My Life as OverThinker" Book is Published!
            </h2>
            <p className="text-muted-foreground mb-6 md:text-lg">
              {isLaunched 
                ? "The highly anticipated, deeply personal book is now available in its entirety. Dive into the confessions."
                : "The book will be fully published today at **3:00 AM**. Until then, enjoy the first page preview!"}
            </p>
            
            <CountdownDisplay {...timeLeft} />
          </motion.div>
          
          {/* 3. Book Viewer/Preview Section */}
          <BookViewer isLaunched={isLaunched} />

          {/* 4. Bio and Socials */}
          <motion.p className="max-w-2xl text-muted-foreground md:text-xl text-center mt-4" variants={itemVariants}>
            {userDetails.bio}
          </motion.p>
          
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
