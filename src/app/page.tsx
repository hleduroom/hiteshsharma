"use client";

import { motion } from "framer-motion";
import { Facebook, Linkedin, Mail } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

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
    socials: {
      facebook: "https://www.facebook.com/thehiteshsir",
      linkedin: "https://www.linkedin.com/in/hitesh-sharma-8a3366329",
      email: "mailto:hleduroom@gmail.com",
      whatsapp: "https://wa.me/9779827728726?text=Hello%20Hitesh%20Sir,%20I'd%20like%20to%20know%20more%20about%20your%20courses.",
    },
};

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4 text-center">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col items-center"
      >
        <motion.h1
          className="text-5xl font-bold tracking-tighter sm:text-6xl md:text-7xl lg:text-8xl font-headline text-primary"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          Hitesh Sharma
        </motion.h1>

        <motion.p
            className="mt-4 text-2xl font-semibold text-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
                delay: 0.5,
                duration: 0.8,
            }}
        >
          Coming Soon
        </motion.p>
        
        <motion.div
          className="mt-2 h-1 w-24 bg-primary"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          style={{
            boxShadow: '0 0 8px hsl(var(--primary)), 0 0 16px hsl(var(--primary))',
          }}
        />

        <motion.p
          className="mt-6 max-w-xl text-lg text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          My professional portfolio is currently under construction, but I'm excited to share it with you soon. It will be live in a few days!
        </motion.p>
      </motion.div>

      <motion.div
        className="mt-8 flex items-center gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        <Button variant="ghost" size="icon" asChild>
          <Link href={userDetails.socials.facebook} target="_blank" aria-label="Facebook">
            <Facebook className="h-6 w-6" />
          </Link>
        </Button>
        <Button variant="ghost" size="icon" asChild>
          <Link href={userDetails.socials.linkedin} target="_blank" aria-label="LinkedIn">
            <Linkedin className="h-6 w-6" />
          </Link>
        </Button>
        <Button variant="ghost" size="icon" asChild>
          <Link href={userDetails.socials.email} aria-label="Email">
            <Mail className="h-6 w-6" />
          </Link>
        </Button>
        <Button variant="ghost" size="icon" asChild>
          <Link href={userDetails.socials.whatsapp} target="_blank" aria-label="WhatsApp">
            <WhatsappIcon className="h-6 w-6" />
          </Link>
        </Button>
      </motion.div>

       <motion.div
        className="absolute inset-0 z-[-1] overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      >
        <div className="absolute h-full w-full bg-grid-primary/10 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        <div 
          className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-3xl"
          style={{
             animation: 'pulse 5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
          }}
        />
      </motion.div>
      <style jsx global>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 0.7;
            transform: scale(1);
          }
          50% {
            opacity: 0.3;
            transform: scale(1.2);
          }
        }
      `}</style>
    </div>
  );
}
