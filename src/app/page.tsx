"use client";

import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/sections/hero";
import { Preloader } from "@/components/preloader";
import { About } from "@/components/sections/about";
import { Projects } from "@/components/sections/projects";
import { Contact } from "@/components/sections/contact";

const userDetails = {
  name: "Hitesh Sharma",
  image:
    "https://res.cloudinary.com/dgxoe15jd/image/upload/v1756232910/retouch_2025080121291186_hcbobr.jpg",
};

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      document.body.style.overflow = "auto";
    }, 3000); // Preloader duration

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && (
          <Preloader
            userImage={userDetails.image}
            userName={userDetails.name}
          />
        )}
      </AnimatePresence>

      {!isLoading && (
        <div className="flex min-h-screen flex-col bg-background text-foreground">
          <Header />
          <main className="flex-1">
            <Hero />
            
            {/* Canva Presentation - Hidden from source but embedded */}
            <div className="w-full px-4 md:px-8">
              <div style={{ 
                position: 'relative', 
                width: '100%', 
                height: '0', 
                paddingTop: '56.2500%',
                paddingBottom: '0', 
                boxShadow: '0 2px 8px 0 rgba(63,69,81,0.16)', 
                marginTop: '1.6em', 
                marginBottom: '0.9em', 
                overflow: 'hidden',
                borderRadius: '8px', 
                willChange: 'transform'
              }}>
                <iframe 
                  loading="lazy" 
                  style={{
                    position: 'absolute', 
                    width: '100%', 
                    height: '100%', 
                    top: '0', 
                    left: '0', 
                    border: 'none', 
                    padding: '0',
                    margin: '0'
                  }}
                  src="https://www.canva.com/design/DAG2mmKhlQc/po_pdJN5-4vUE_BdX8xvHg/view?embed" 
                  allowFullScreen={true}
                  allow="fullscreen"
                  title="Cream and Green Aesthetic Scrapbook Self Introduction Presentation"
                >
                </iframe>
              </div>
            </div>

            <div className="space-y-16 py-12">
              <About />
              <Projects />
              <Contact />
            </div>
          </main>
          <Footer />
        </div>
      )}
    </>
  );
}