"use client";

import { motion } from "framer-motion";
import { Button } from "../ui/button";
import Link from "next/link";
import Image from "next/image";
import { Facebook, Linkedin, Mail } from "lucide-react";
import { BackgroundAnimation } from "../background-animation";

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
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
      <path d="M14.05 16.95A5.5 5.5 0 0 0 16 11.5c0-3.04-2.46-5.5-5.5-5.5S5 8.46 5 11.5c0 1.51.61 2.88 1.6 3.88" />
      <path d="m16 14-2 2-2-2" />
    </svg>
  );
}

const userDetails = {
  name: "Hitesh Sharma",
  role: "Founder & Educator",
  image: "https://res.cloudinary.com/dgxoe15jd/image/upload/v1756232910/retouch_2025080121291186_hcbobr.jpg",
  bio: "Founder of H.L.-Eduroom and The Hitesh Sir Platform lead educator for +2 Exams. Passionate about guiding students toward their dream careers in medicine.",
  socials: {
    facebook: "https://www.facebook.com/thehiteshsir",
    linkedin: "https://www.linkedin.com/in/hitesh-sharma-8a3366329",
    email: "mailto:hleduroom@gmail.com",
    whatsapp: "https://wa.me/9779827728726?text=Hello%20Hitesh%20Sir,%20I'd%20like%20to%20know%20more%20about%20your%20courses.",
  },
};

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
      <BackgroundAnimation />
      <div className="container relative z-10 grid min-h-[calc(100vh-3.5rem)] grid-cols-1 items-center gap-8 md:grid-cols-2">
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
            Hitesh Sharma
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
        <motion.div 
          className="relative flex h-full min-h-[300px] w-full flex-col items-center justify-center md:min-h-[500px]"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
        >
           <div className="relative h-48 w-48 overflow-hidden rounded-full shadow-2xl md:h-64 md:w-64">
             <Image
              src={userDetails.image}
              alt={userDetails.name}
              fill
              className="object-cover"
              />
           </div>
           <h3 className="mt-6 text-2xl font-bold font-headline">{userDetails.name}</h3>
           <p className="text-muted-foreground">{userDetails.role}</p>
            <p className="mt-2 max-w-sm text-center text-sm text-muted-foreground">{userDetails.bio}</p>
           <div className="mt-4 flex items-center gap-4">
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
            </div>
        </motion.div>
      </div>
    </section>
  );
}
