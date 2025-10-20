"use client";

import { motion } from "framer-motion";
import Image from "next/image";

// Helper component for the writing signature animation
const SignatureAnimation = ({ text }: { text: string }) => {
  // A placeholder SVG path for a signature of "hitesh sharma"
  // In a real application, you would create this path based on a hand-drawn SVG.
  // This path is a simplified example just to demonstrate the writing animation concept.
  const signaturePath =
    "M21 21C21 21 20.3333 19.3333 19 18C15 13 14 12 11 12C8 12 6.5 13 6.5 13C6.5 13 5.5 14 6 15C6.5 16 8 16 8 16C8 16 9 16 9 17C9 18 8 18 7 18C6 18 5 17 5 16C5 15 6 14 6 13C6 12 7 11 9 10C11 9 13 9 15 10C17 11 19 12 20 14C21 16 21 17 20 18C19 19 18 19 17 19C16 19 15 18 14 17C13 16 12 15 11 14C10 13 9 13 8 13C7 13 6 14 6 15C6 16 7 17 8 17C9 17 10 17 11 16C12 15 13 14 14 13C15 12 16 12 17 12C18 12 19 13 20 14";

  const pathVariants = {
    hidden: {
      pathLength: 0,
      opacity: 0,
    },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        duration: 2, // Duration of the writing effect
        ease: "easeInOut",
        delay: 0.8, // Start after the image appears
      },
    },
  };

  return (
    <div className="flex flex-col items-center justify-center mt-6">
      <h2 className="text-xl font-signature font-bold text-foreground mb-4">
        {text}
      </h2>
      <motion.svg
        width="100" // Adjust size as needed
        height="30" // Adjust size as needed
        viewBox="0 0 25 25"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-foreground" // Use text color for the stroke
      >
        <motion.path
          d={signaturePath}
          stroke="currentColor"
          strokeWidth="0.5" // Adjust stroke thickness
          strokeLinecap="round"
          strokeLinejoin="round"
          variants={pathVariants}
          initial="hidden"
          animate="visible"
        />
      </motion.svg>
    </div>
  );
};

const Preloader = ({ userImage, userName }: { userImage: string, userName: string }) => {
  // Convert the incoming userName to lowercase
  const lowerCaseUserName = userName.toLowerCase();
  
  // Check for the specific name to apply the signature effect
  const isHiteshSharma = lowerCaseUserName === "hitesh sharma";

  // --- Animation Variants ---
  
  const containerVariants = {
    initial: { opacity: 1 },
    exit: { 
      opacity: 0, 
      transition: { duration: 0.6, ease: "easeInOut" } // Slightly faster exit
    },
  };

  const imageVariants = {
    initial: { scale: 0.3, opacity: 0 }, // Smaller initial scale
    animate: { 
      scale: 1, 
      opacity: 1, 
      transition: { duration: 0.8, ease: [0.17, 0.67, 0.83, 0.67], delay: 0.3 } // Bouncy/Elastic ease
    },
  };

  // Name animation for non-signature names (falling letters)
  const nameContainerVariants = {
    animate: {
      transition: {
        delayChildren: 0.6,
        staggerChildren: 0.05, // Faster stagger
      },
    },
  };

  const letterVariants = {
    initial: { y: -40, opacity: 0 }, // Start higher up (falling effect)
    animate: { 
      y: 0, 
      opacity: 1, 
      transition: { 
        duration: 0.5, 
        ease: "easeOut" // Smooth landing
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
        className="relative h-24 w-24 overflow-hidden rounded-full shadow-2xl md:h-36 md:w-36" // Slightly larger and stronger shadow
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
      
      {/* 2. User Name/Signature */}
      {isHiteshSharma ? (
        // Signature animation for "hitesh sharma"
        <SignatureAnimation text={lowerCaseUserName} />
      ) : (
        // Standard falling letter animation for other names
        <motion.div 
          className="mt-6 flex overflow-hidden text-3xl font-extrabold font-serif text-foreground" // Increased size, changed font to 'serif'
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
      )}
    </motion.div>
  );
};

export { Preloader };

// Note on Font Changes:
// 1. I changed `font-headline` to `font-serif` for a new look in the non-signature case.
// 2. I've added a hypothetical `font-signature` class for the "hitesh sharma" name.
// 3. You will need to ensure these Tailwind CSS font utilities are configured in your `tailwind.config.js`
//    to use the specific fonts you want (e.g., a nice cursive font for the signature).

// Example Tailwind Config additions:
/*
  theme: {
    extend: {
      fontFamily: {
        // Add your custom font family names here
        'serif': ['Georgia', 'serif'], 
        'signature': ['"Permanent Marker"', 'cursive'], // Example: You need to install this font or use a web-safe one
      },
    },
  },
*/
