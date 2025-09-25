"use client";

import React, { useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';

const BackgroundAnimation = () => {
  const numShapes = 15;
  const controls = useAnimation();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const animateShapes = async () => {
      if (!containerRef.current) return;
      const { offsetWidth, offsetHeight } = containerRef.current;
      
      await controls.start((i) => ({
        x: Math.random() * offsetWidth,
        y: Math.random() * offsetHeight,
        scale: Math.random() * 0.5 + 0.5,
        opacity: Math.random() * 0.3 + 0.1,
        transition: {
          duration: Math.random() * 10 + 10,
          repeat: Infinity,
          repeatType: 'mirror',
          ease: 'easeInOut',
        },
      }));
    };

    animateShapes();
  }, [controls]);

  return (
    <div ref={containerRef} className="absolute inset-0 z-0 overflow-hidden">
      {Array.from({ length: numShapes }).map((_, i) => (
        <motion.div
          key={i}
          custom={i}
          animate={controls}
          className="absolute rounded-full bg-primary/20 dark:bg-primary/30"
          style={{
            width: Math.random() * 100 + 50,
            height: Math.random() * 100 + 50,
            top: -50,
            left: -50,
          }}
        />
      ))}
    </div>
  );
};

export { BackgroundAnimation };
