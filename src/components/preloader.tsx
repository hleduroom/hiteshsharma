"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const Preloader = ({ userImage, userName }: { userImage: string; userName: string }) => {
  const lowerCaseName = userName.toLowerCase();

  const containerVariants = {
    initial: { opacity: 1 },
    exit: { 
      opacity: 0, 
      transition: { duration: 0.5, ease: "easeInOut" } 
    },
  };

  const imageVariants = {
    initial: { scale: 0.5, opacity: 0 },
    animate: { 
      scale: 1, 
      opacity: 1, 
      transition: { duration: 0.3, ease: [0.6, 0.01, 0.05, 0.95], delay: 0.1 } 
    },
  };

  const signatureVariants = {
    initial: { pathLength: 0, opacity: 0 },
    animate: {
      pathLength: 1,
      opacity: 1,
      transition: {
        delay: 0.4, // Very short delay
        duration: 0.5, // Ultra-fast 0.5 second writing
        ease: "linear",
      },
    },
  };

  // SVG path data for "hitesh sharma" in a cursive style
  const signaturePathData = "M 50,70 C 60,50 80,45 90,55 C 100,65 95,75 85,80 C 75,85 65,82 60,75 M 110,50 C 120,40 135,42 140,52 C 145,62 142,72 135,78 C 128,84 118,83 112,76 M 160,45 C 170,35 185,38 190,48 C 195,58 192,68 185,74 C 178,80 168,79 162,72 M 200,70 C 210,50 225,48 235,58 C 245,68 242,78 232,83 C 222,88 212,85 205,78 M 260,50 C 275,30 295,32 305,50 C 315,68 310,83 295,88 C 280,93 265,85 260,70 M 320,45 C 335,25 355,28 365,45 C 375,62 370,77 355,82 C 340,87 325,80 320,65 M 380,70 C 395,50 415,52 425,70 C 435,88 430,98 415,103 C 400,108 385,100 380,85";

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
          viewBox="0 0 450 120" 
          className="w-full h-full"
          preserveAspectRatio="xMidYMid meet"
        >
          <motion.path
            d={signaturePathData}
            fill="transparent"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
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