"use client";

import { motion } from "framer-motion";
import { Button } from "../ui/button";
import Link from "next/link";
import ThreeDModel from "../threed-model";

export function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section id="home" className="relative w-full overflow-hidden">
      <div className="container grid min-h-[calc(100vh-3.5rem)] grid-cols-1 items-center gap-8 md:grid-cols-2">
        <motion.div
          className="flex flex-col items-start gap-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl font-headline"
            variants={itemVariants}
          >
            HLEduRoom
          </motion.h1>
          <motion.p
            className="max-w-[600px] text-muted-foreground md:text-xl"
            variants={itemVariants}
          >
            Empowering the next generation of developers and creators through
            technology and education. Welcome to my digital space.
          </motion.p>
          <motion.div
            className="flex flex-col gap-2 min-[400px]:flex-row"
            variants={itemVariants}
          >
            <Button size="lg" asChild>
              <Link href="#projects">View My Work</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="#contact">Get In Touch</Link>
            </Button>
          </motion.div>
        </motion.div>
        <div className="relative h-full min-h-[300px] w-full md:min-h-[500px]">
           <ThreeDModel />
        </div>
      </div>
    </section>
  );
}
