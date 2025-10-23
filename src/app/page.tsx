"use client";

import { useState, useEffect, useRef } from "react";
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
  const [autoSlideEnabled, setAutoSlideEnabled] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const autoSlideTimerRef = useRef<NodeJS.Timeout | null>(null);

  const startAutoSlide = () => {
    if (!autoSlideEnabled) return;
    
    stopAutoSlide();
    
    autoSlideTimerRef.current = setInterval(() => {
      // Focus the iframe and simulate spacebar for next slide
      if (iframeRef.current) {
        const iframe = iframeRef.current;
        iframe.focus();
        
        // Try spacebar for next slide (common in presentations)
        const spaceEvent = new KeyboardEvent('keydown', {
          key: ' ',
          code: 'Space',
          keyCode: 32,
          which: 32,
          bubbles: true
        });
        
        iframe.dispatchEvent(spaceEvent);
      }
    }, 7000);
  };

  const stopAutoSlide = () => {
    if (autoSlideTimerRef.current) {
      clearInterval(autoSlideTimerRef.current);
      autoSlideTimerRef.current = null;
    }
  };

  const toggleAutoSlide = () => {
    setAutoSlideEnabled(!autoSlideEnabled);
    if (!autoSlideEnabled) {
      startAutoSlide();
    } else {
      stopAutoSlide();
    }
  };

  const handleManualNavigation = (direction: 'left' | 'right') => {
    stopAutoSlide();
    
    if (iframeRef.current) {
      const iframe = iframeRef.current;
      iframe.focus();
      
      const key = direction === 'right' ? 'ArrowRight' : 'ArrowLeft';
      const keyCode = direction === 'right' ? 39 : 37;
      
      const keyEvent = new KeyboardEvent('keydown', {
        key,
        code: key,
        keyCode,
        which: keyCode,
        bubbles: true
      });
      
      iframe.dispatchEvent(keyEvent);
    }
    
    // Restart auto-slide after 7 seconds if enabled
    if (autoSlideEnabled) {
      setTimeout(startAutoSlide, 7000);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      document.body.style.overflow = "auto";
    }, 3000);

    return () => {
      clearTimeout(timer);
      stopAutoSlide();
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleIframeLoad = () => {
    if (autoSlideEnabled) {
      setTimeout(startAutoSlide, 2000);
    }
  };

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
            
            {/* Canva Presentation with Enhanced Controls */}
            <div className="w-full px-4 md:px-8">
              {/* Enhanced Navigation Controls */}
              <div className="flex justify-between items-center mb-4 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => handleManualNavigation('left')}
                    className="bg-white hover:bg-gray-100 text-gray-800 font-bold py-2 px-4 rounded-lg border border-gray-300 transition-colors duration-200 shadow-sm"
                    aria-label="Previous slide"
                  >
                    ← Previous
                  </button>
                  <button
                    onClick={() => handleManualNavigation('right')}
                    className="bg-white hover:bg-gray-100 text-gray-800 font-bold py-2 px-4 rounded-lg border border-gray-300 transition-colors duration-200 shadow-sm"
                    aria-label="Next slide"
                  >
                    Next →
                  </button>
                </div>
                
                <button
                  onClick={toggleAutoSlide}
                  className={`flex items-center gap-2 py-2 px-4 rounded-lg font-medium transition-colors duration-200 ${
                    autoSlideEnabled 
                      ? 'bg-green-500 hover:bg-green-600 text-white' 
                      : 'bg-gray-300 hover:bg-gray-400 text-gray-700'
                  }`}
                >
                  <div className={`w-2 h-2 rounded-full ${autoSlideEnabled ? 'bg-white' : 'bg-gray-600'}`}></div>
                  Auto-slide {autoSlideEnabled ? 'ON' : 'OFF'}
                </button>
              </div>

              <div 
                style={{ 
                  position: 'relative', 
                  width: '100%', 
                  height: '0', 
                  paddingTop: '56.2500%',
                  paddingBottom: '0', 
                  boxShadow: '0 2px 8px 0 rgba(63,69,81,0.16)', 
                  marginTop: '0', 
                  marginBottom: '0.9em', 
                  overflow: 'hidden',
                  borderRadius: '8px', 
                  willChange: 'transform'
                }}
                onMouseEnter={stopAutoSlide}
                onMouseLeave={() => {
                  if (autoSlideEnabled) startAutoSlide();
                }}
              >
                <iframe 
                  ref={iframeRef}
                  loading="lazy" 
                  style={{
                    position: 'absolute', 
                    width: '100%', 
                    height: '100%', 
                    top: '0', 
                    left: '0', 
                    border: 'none', 
                    padding: '0',
                    margin: '0',
                    cursor: 'pointer'
                  }}
                  src="https://www.canva.com/design/DAG2mmKhlQc/po_pdJN5-4vUE_BdX8xvHg/view?embed" 
                  allowFullScreen={true}
                  allow="fullscreen"
                  title="Cream and Green Aesthetic Scrapbook Self Introduction Presentation"
                  onLoad={handleIframeLoad}
                />
              </div>

              <div className="text-center text-sm text-gray-500 mt-2">
                {autoSlideEnabled ? 
                  "Slides advance every 7 seconds • Click navigation buttons or hover to pause" : 
                  "Auto-slide paused • Use navigation buttons to control slides"
                }
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