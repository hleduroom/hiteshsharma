
"use client";

import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/sections/hero";
import { Preloader } from "@/components/preloader";
import { About } from "@/components/sections/about";
import { Projects } from "@/components/sections/projects";
import { TerminalSection } from "@/components/sections/terminal-section";
import { Contact } from "@/components/sections/contact";

const userDetails = {
  name: "Hitesh Sharma",
  image: "https://res.cloudinary.com/dgxoe15jd/image/upload/v1756232910/retouch_2025080121291186_hcbobr.jpg",
};

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      document.body.style.overflow = "auto";
    }, 3000); 

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <Preloader userImage={userDetails.image} userName={userDetails.name} />}
      </AnimatePresence>

      {!isLoading && (
        <div className="flex min-h-screen flex-col bg-background">
          <Header />
          <main className="flex-1">
            <Hero />
            <About />
            <Projects />
            <TerminalSection />
            <Contact />
          </main>
          <Footer />
        </div>
      )}
    </>
  );
}
