"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const Preloader = ({ userImage, userName }: { userImage: string, userName: string }) => {
  // 1. Convert the incoming userName to lowercase (as requested)
  const lowerCaseUserName = userName.toLowerCase();
  
  // --- Animation Variants ---
  
  const containerVariants = {
    initial: { opacity: 1 },
    exit: { 
      opacity: 0, 
      transition: { duration: 0.6, ease: "easeInOut" } 
    },
  };

  const imageVariants = {
    initial: { scale: 0.3, opacity: 0 },
    animate: { 
      scale: 1, 
      opacity: 1, 
      transition: { duration: 0.8, ease: [0.17, 0.67, 0.83, 0.67], delay: 0.3 }
    },
  };

  // 2. Container for staggered "writing" animation
  const nameContainerVariants = {
    animate: {
      transition: {
        delayChildren: 0.8, 
        // Very short stagger for a smooth, connected writing feel
        staggerChildren: 0.04, 
      },
    },
  };

  // 3. Individual letter animation (slide-in for "writing" effect)
  const letterVariants = {
    initial: { 
      opacity: 0,
      x: -10, // Start slightly off-position
    },
    animate: { 
      opacity: 1, 
      x: 0, // Slide into final position
      transition: { 
        duration: 0.3, 
        ease: "easeInOut"
      } 
    },
  };
  
  // --- Component Render ---

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
      variants={containerVariants}
      initial="initial"
      exit="exit"
    >
      {/* 1. User Image */}
      <motion.div
        className="relative h-24 w-24 overflow-hidden rounded-full shadow-2xl md:h-36 md:w-36"
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
      
      {/* 2. User Name with "Great Vibes" Font and Writing Animation */}
      <motion.div 
        // *************************************************************************
        // *** FONT CHANGE: Using the new utility class `font-signature` ***
        // *************************************************************************
        className="mt-6 flex overflow-hidden text-4xl font-normal font-signature text-foreground md:text-5xl" 
        variants={nameContainerVariants}
        initial="initial"
        animate="animate"
        aria-label={lowerCaseUserName}
      >
        {lowerCaseUserName.split("").map((letter, index) => (
           <motion.span 
             key={index} 
             variants={letterVariants} 
             className="inline-block leading-none" 
           >
             {letter === " " ? "\u00A0" : letter}
           </motion.span>
        ))}
      </motion.div>
    </motion.div>
  );
};

export { Preloader };
