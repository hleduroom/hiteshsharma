
"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const Preloader = ({ userImage, userName }: { userImage: string, userName: string }) => {
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

  const nameContainerVariants = {
    animate: {
      transition: {
        delayChildren: 0.8,
        staggerChildren: 0.1,
      },
    },
  };

  const letterVariants = {
    initial: { y: 20, opacity: 0 },
    animate: { 
      y: 0, 
      opacity: 1, 
      transition: { duration: 0.6, ease: "circOut" } 
    },
  };

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
      <motion.div 
        className="mt-6 flex overflow-hidden text-2xl font-bold font-headline text-foreground"
        variants={nameContainerVariants}
        initial="initial"
        animate="animate"
        aria-label={userName}
      >
        {userName.split("").map((letter, index) => (
           <motion.span key={index} variants={letterVariants} className="inline-block">
             {letter === " " ? "\u00A0" : letter}
           </motion.span>
        ))}
      </motion.div>
    </motion.div>
  );
};

export { Preloader };
