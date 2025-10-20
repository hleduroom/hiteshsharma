"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const Preloader = ({ userImage, userName }: { userImage: string, userName: string }) => {
  // Convert the incoming userName to lowercase
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

  // 1. Container for staggered animation
  const nameContainerVariants = {
    animate: {
      transition: {
        // Start the name animation after the image finishes
        delayChildren: 0.8, 
        // This short stagger is key for the "writing" feeling
        staggerChildren: 0.04, 
      },
    },
  };

  // 2. Individual letter animation
  const letterVariants = {
    initial: { 
      // Start slightly transparent and moved to the side
      opacity: 0,
      x: -10,
    },
    animate: { 
      opacity: 1, 
      x: 0, // Slide into place
      transition: { 
        duration: 0.3, // Quick reveal for each letter
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
      
      {/* 2. User Name with "Writing" Animation */}
      <motion.div 
        // Changed font to a custom 'font-cursive' (you must define this in tailwind.config.js)
        // Kept text-3xl for prominence
        className="mt-6 flex overflow-hidden text-3xl font-bold font-cursive text-foreground" 
        variants={nameContainerVariants}
        initial="initial"
        animate="animate"
        aria-label={lowerCaseUserName}
      >
        {lowerCaseUserName.split("").map((letter, index) => (
           <motion.span key={index} variants={letterVariants} className="inline-block">
             {letter === " " ? "\u00A0" : letter}
           </motion.span>
        ))}
      </motion.div>
    </motion.div>
  );
};

export { Preloader };

// Note on Font Changes:
// To make this look like a signature, you *must* use a cursive or handwriting font. 
// I have used a placeholder class `font-cursive`.
// You will need to configure your `tailwind.config.js` to include a custom font (e.g., 'Permanent Marker', 'Dancing Script', etc.)
// and map it to `font-cursive` for the best effect.

/* Example Tailwind Config Addition:
  theme: {
    extend: {
      fontFamily: {
        'cursive': ['"Permanent Marker"', 'cursive'], // Or any other handwriting font
      },
    },
  },
*/
