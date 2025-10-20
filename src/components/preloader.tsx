"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { PenTool } from "lucide-react"; // Using a simple pen icon

const Preloader = ({ userImage, userName }: { userImage: string, userName: string }) => {
  // Convert the username to lowercase as requested
  const lowerCaseName = userName.toLowerCase();
  
  // Array of characters, including spaces, for staggering
  const letters = lowerCaseName.split("");

  const containerVariants = {
    initial: { opacity: 1 },
    exit: { 
      opacity: 0, 
      transition: { duration: 0.8, ease: "easeInOut" } 
    },
  };

  const imageVariants = {
    initial: { scale: 0.5, opacity: 0 },
    animate: { 
      scale: 1, 
      opacity: 1, 
      transition: { duration: 0.6, ease: [0.6, 0.01, 0.05, 0.95], delay: 0.5 } 
    },
  };

  // The 'writing' effect uses staggered children
  const nameContainerVariants = {
    animate: {
      transition: {
        delayChildren: 0.8, // Start after the image appears
        staggerChildren: 0.04, // Fast stagger for a fluid "writing" look
      },
    },
  };

  // The animation for each letter: fades and scales in quickly
  const letterVariants = {
    initial: { scale: 0.5, opacity: 0 },
    animate: { 
      scale: 1, 
      opacity: 1, 
      transition: { duration: 0.3, ease: "easeOut" } 
    },
  };
  
  // Pen movement animation: moves across the width of the name text
  const penAnimation = {
    initial: { x: '-100%', opacity: 0 },
    animate: {
      x: '100%', // Move from the start of the text to the end
      opacity: [1, 1, 0], // Stay visible during the animation, then fade out
      transition: {
        delay: 0.7, // Start just before the first letter appears
        duration: letters.length * 0.04 * 1.5, // Duration based on the number of letters
        ease: 'linear',
      },
    }
  }

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
      variants={containerVariants}
      initial="initial"
      exit="exit"
    >
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
      
      {/* Name Container: Now relative to hold the absolute pen icon */}
      <motion.div 
        className="mt-6 flex text-5xl font-bold font-signature text-foreground relative h-12"
      >
        {/* Pen Icon for the visual writing effect */}
        <motion.div 
          className="absolute top-[-0.75rem] text-primary" // Positioned slightly above the text
          variants={penAnimation}
          initial="initial"
          animate="animate"
        >
          <PenTool className="h-6 w-6 rotate-45" />
        </motion.div>
        
        {/* The Text itself, animated with stagger */}
        <motion.div 
          className="flex overflow-hidden"
          variants={nameContainerVariants}
          initial="initial"
          animate="animate"
          aria-label={lowerCaseName}
        >
          {letters.map((letter, index) => (
            <motion.span 
              key={index} 
              variants={letterVariants} 
              className="inline-block"
            >
              {letter === " " ? "\u00A0" : letter}
            </motion.span>
          ))}
        </motion.div>
        
      </motion.div>
    </motion.div>
  );
};

export { Preloader };

