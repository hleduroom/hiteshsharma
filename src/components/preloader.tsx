"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const Preloader = ({
  userImage,
  userName,
}: {
  userImage: string;
  userName: string;
}) => {
  const name = userName.toLowerCase(); // 👈 convert to lowercase

  const containerVariants = {
    initial: { opacity: 1 },
    exit: {
      opacity: 0,
      transition: { duration: 0.8, ease: "easeInOut" },
    },
  };

  const imageVariants = {
    initial: { scale: 0.5, opacity: 0 },
    animate: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.6, 0.01, 0.05, 0.95],
        delay: 0.5,
      },
    },
  };

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
      variants={containerVariants}
      initial="initial"
      exit="exit"
    >
      {/* --- Profile Image --- */}
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

      {/* --- Name with Pen Writing Animation --- */}
      <motion.h1
        className="mt-6 text-3xl font-greatvibes text-primary handwriting"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        {name}
      </motion.h1>
    </motion.div>
  );
};

export { Preloader };