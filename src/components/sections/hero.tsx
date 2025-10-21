"use client";

import { motion } from "framer-motion";
import { Button } from "../ui/button";
import Link from "next/link";
import Image from "next/image";
import { Facebook, Linkedin, Mail, BookOpen } from "lucide-react";
import { useTypewriter } from "react-simple-typewriter";
import { Analytics } from "@vercel/analytics/next";

// WhatsApp Icon Component
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
      <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
      <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1Z" />
      <path d="M14 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1Z" />
      <path d="M9.5 13c.5.5 1 .5 1.5.5s1 0 1.5-.5" />
    </svg>
  );
}

const user = {
  name: "Hitesh Sharma",
  image:
    "https://res.cloudinary.com/dgxoe15jd/image/upload/v1756232910/retouch_2025080121291186_hcbobr.jpg",
  tagline: [
    "Educator & Author",
    "Founder of H.L.-Eduroom",
    "Normal Human Experiencing Life 🍃",
  ],
  bio: "Founder of H.L.-Eduroom and The Hitesh Sir Platform. Lead educator for +2 Exams, helping students build strong conceptual foundations.",
  socials: {
    facebook: "https://www.facebook.com/thehiteshsir",
    linkedin: "https://www.linkedin.com/in/hitesh-sharma-8a3366329",
    email: "mailto:hleduroom@gmail.com",
    whatsapp:
      "https://wa.me/9779827728726?text=Hello%20Hitesh%20Sir,%20I’d%20like%20to%20know%20more%20about%20your%20courses.",
  },
};

export default function Hero() {
  const [text] = useTypewriter({
    words: user.tagline,
    loop: true,
    delaySpeed: 2000,
  });

  return (
    <>
      <Analytics />
      <section className="relative w-full min-h-screen flex items-center justify-center bg-cover bg-center bg-[url('/book_cover_img.png')]">
        <div className="absolute inset-0 bg-white/80 dark:bg-slate-950/85 backdrop-blur-md"></div>

        <div className="relative z-10 text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="flex flex-col items-center"
          >
            <div className="relative h-32 w-32 md:h-36 md:w-36 rounded-full overflow-hidden shadow-xl border-4 border-white/40 dark:border-slate-800/50">
              <Image
                src={user.image}
                alt={user.name}
                fill
                className="object-cover"
                priority
              />
            </div>

            <h1 className="mt-6 text-4xl md:text-6xl font-bold tracking-tight text-slate-900 dark:text-white font-headline">
              {user.name}
            </h1>

            <p className="mt-3 text-lg md:text-xl font-medium text-slate-600 dark:text-slate-300 h-6">
              <span className="text-primary font-semibold">{text}</span>
              <span className="animate-pulse">|</span>
            </p>

            <p className="mt-6 max-w-2xl text-sm md:text-base text-muted-foreground leading-relaxed">
              {user.bio}
            </p>

            <div className="mt-8 flex gap-3">
              <Button
                asChild
                className="bg-slate-900 hover:bg-slate-800 text-white px-5 py-2 rounded-full text-sm font-medium"
              >
                <Link href="/3AM-Confessions-Preview.pdf" target="_blank">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Read My Book
                </Link>
              </Button>
              <Button
                variant="outline"
                asChild
                className="rounded-full border-slate-300 dark:border-slate-700"
              >
                <Link href={user.socials.whatsapp} target="_blank">
                  Contact Me
                </Link>
              </Button>
            </div>

            <div className="mt-10 flex gap-2">
              <SocialButton href={user.socials.facebook}>
                <Facebook className="h-4 w-4" />
              </SocialButton>
              <SocialButton href={user.socials.linkedin}>
                <Linkedin className="h-4 w-4" />
              </SocialButton>
              <SocialButton href={user.socials.email}>
                <Mail className="h-4 w-4" />
              </SocialButton>
              <SocialButton href={user.socials.whatsapp}>
                <WhatsappIcon className="h-4 w-4" />
              </SocialButton>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}

function SocialButton({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Button
      variant="ghost"
      size="icon"
      className="h-10 w-10 rounded-full bg-white/60 dark:bg-slate-800/60 hover:bg-white dark:hover:bg-slate-700 backdrop-blur-sm shadow-sm"
      asChild
    >
      <Link href={href} target="_blank">
        {children}
      </Link>
    </Button>
  );
}