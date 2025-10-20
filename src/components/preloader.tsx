"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const Preloader = ({ userImage, userName }: { userImage: string, userName: string }) => {
  // Convert the name to lowercase for the display
  const lowerCaseName = userName.toLowerCase();

  // --- Framer Motion Variants ---

  const containerVariants = {
    initial: { opacity: 1 },
    exit: { 
      opacity: 0, 
      transition: { 
        duration: 0.3, // FAST EXIT: Reduced from 0.8s
        ease: "easeInOut" 
      } 
    },
  };

  const imageVariants = {
    initial: { scale: 0.5, opacity: 0 },
    animate: { 
      scale: 1, 
      opacity: 1, 
      transition: { 
        duration: 0.4, // FAST IMAGE: Reduced from 0.6s
        ease: [0.6, 0.01, 0.05, 0.95], 
        delay: 0.1 // FAST DELAY: Reduced from 0.5s
      } 
    },
  };

  const signatureVariants = {
    // Hidden state for the writing animation (pathLength: 0 hides the stroke)
    initial: { pathLength: 0, opacity: 0 },
    // Animated state (pathLength: 1 reveals the full stroke)
    animate: {
      pathLength: 1,
      opacity: 1,
      transition: {
        delay: 0.3, // FAST START: Reduced from 1.2s (starts soon after image)
        duration: 1.0, // FAST WRITING: Reduced from 3s
        ease: "easeInOut",
      },
    },
  };
  
  // !!! IMPORTANT: THIS IS A PLACEHOLDER.
  // You MUST replace this value with the actual SVG path data for "hitesh sharma" 
  // in the 'Great Vibes' font for the pen-writing effect to work correctly.
  const signaturePathData = "M 10 90 c 25 -30 75 -30 100 0 s 50 30 75 0 s 50 -30 75 0"; 
  // Placeholder: a simple wavy line

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
      variants={containerVariants}
      initial="initial"
      exit="exit"
    >
      {/* User Image */}
      <motion.div
        className="relative h-24 w-24 overflow-hidden rounded-full shadow-lg md:h-32 md:w-32"
        variants={imageVariants}
        initial="initial"
        animate="animate"
      >
        <Image
          src={userImage}
          alt={userName}
          fill
          className="object-cover"
          priority
        />
      </motion.div>
      
      {/* Animated Signature (SVG) */}
      <div 
        className="mt-6 text-5xl font-signature text-foreground tracking-wide w-64 md:w-80 h-16"
        aria-label={lowerCaseName}
      >
        <svg
          // Adjust the viewBox width/height to properly contain your signature path
          viewBox="0 0 500 100" 
          className="w-full h-full"
        >
          <motion.path
            d={signaturePathData}
            fill="transparent"
            stroke="currentColor" // Uses the text-foreground color
            strokeWidth="3"      // Adjust stroke thickness as needed
            strokeLinecap="round"
            variants={signatureVariants}
            initial="initial"
            animate="animate"
          />
        </svg>
      </div>
      
    </motion.div>
  );
};

export { Preloader };
