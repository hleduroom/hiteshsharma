import React, { useState, useEffect } from 'react';
import {
  Award,
  BookOpen,
  BrainCircuit,
  Code,
  Heart,
  MessageCircle,
  Sun,
  Moon,
} from "lucide-react";

// --- Mock UI Components (Simplified for Single-File Use) ---

// Card Component Structure (Simplified Shadcn/ui look)
const Card = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={`rounded-xl border p-6 shadow-md transition-all duration-300 ${className}`}
    {...props}
  />
));
Card.displayName = "Card";

const CardHeader = ({ className, ...props }) => (
  <div className={`flex flex-col space-y-1.5 ${className}`} {...props} />
);

const CardTitle = ({ className, ...props }) => (
  <h3 className={`text-2xl font-semibold leading-none tracking-tight ${className}`} {...props} />
);

const CardContent = ({ className, ...props }) => (
  <div className={`pt-0 ${className}`} {...props} />
);

// Section Component (Simple Wrapper)
const Section = ({ className, id, children }) => (
  <section id={id} className={`w-full ${className}`}>
    {children}
  </section>
);

// --- Data (Restored to Original Casual Content) ---
const skills = [
  {
    icon: <Code className="h-8 w-8 text-blue-600 dark:text-cyan-400" />,
    name: "Web Development",
    description: "I turn caffeine into code and dreams into deploys.",
  },
  {
    icon: <BrainCircuit className="h-8 w-8 text-blue-600 dark:text-cyan-400" />,
    name: "3D & Graphics",
    description: "Making pixels dance and 3D worlds come alive!",
  },
  {
    icon: <BookOpen className="h-8 w-8 text-blue-600 dark:text-cyan-400" />,
    name: "Book Writing",
    description: "Pouring late-night thoughts into poetic chaos. #3AMConfessions",
  },
  {
    icon: <Award className="h-8 w-8 text-blue-600 dark:text-cyan-400" />,
    name: "UI/UX Design",
    description: "Designing experiences smoother than your crush’s smile.",
  },
  {
    icon: <MessageCircle className="h-8 w-8 text-blue-600 dark:text-cyan-400" />,
    name: "BakBak & Talks",
    description: "Certified chatterbox. Can discuss from JavaScript to Jalebi.",
  },
  {
    icon: <Heart className="h-8 w-8 text-blue-600 dark:text-cyan-400" />,
    name: "Romantic Coding",
    description: "Writing code and love letters—both with equal syntax errors.",
  },
];

// --- About Component (Updated for Glassmorphism & Casual Content) ---
export function About() {
  return (
    <Section
      id="about"
      // Adaptive background color for depth/contrast (no fixed image for dark mode compatibility)
      className="py-24 transition-colors duration-500 bg-gray-200 dark:bg-gray-900" 
    >
      {/* Open Glass Overlay: Provides blur effect and transparent background for the section */}
      <div className="absolute inset-0 backdrop-blur-md bg-white/60 dark:bg-black/50 border border-white/40 dark:border-black/50" />

      <div className="relative container mx-auto grid items-center justify-center gap-12 px-4 text-center md:px-6 z-10">
        
        {/* Heading Block (Restored to Original Casual Content) */}
        <div className="space-y-4">
          <h2
            className="text-4xl md:text-5xl font-bold tracking-tight 
                       text-gray-900 dark:text-white transition-colors duration-500 font-[Pacifico]"
          >
            About Me 💫
          </h2>
          <p className="mx-auto max-w-3xl text-lg font-medium 
                        text-gray-700 dark:text-gray-300 transition-colors duration-500 font-[Poppins]">
            A developer, writer, and dreamer who loves building digital worlds,
            penning midnight poetry, and cracking jokes that only half the dev
            team understands. If art meets logic — that’s where you’ll find me.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="mx-auto grid max-w-5xl gap-6 pt-6 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((skill) => (
            <Card
              key={skill.name}
              // Professional Glassmorphism style for cards
              className="bg-white/70 dark:bg-gray-800/70 
                         border-white/80 dark:border-gray-700/80 
                         shadow-xl dark:shadow-black/50 
                         backdrop-blur-sm rounded-2xl
                         text-left 
                         text-gray-900 dark:text-white 
                         transition-transform duration-300 hover:scale-[1.03] hover:bg-white/90 dark:hover:bg-gray-800/90"
            >
              <CardHeader className="flex flex-row items-center justify-between pb-3">
                <CardTitle className="text-xl font-bold font-[Poppins] text-gray-900 dark:text-white">
                  {skill.name}
                </CardTitle>
                {/* Icon uses adaptive colors defined in data array */}
                {skill.icon} 
              </CardHeader>
              <CardContent>
                <p className="text-sm font-light text-gray-600 dark:text-gray-300">
                  {skill.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Section>
  );
}


// --- Main Application Wrapper ---
export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Apply initial dark mode based on state
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };

  return (
    // Utility to load Tailwind and custom fonts
    <>
      <script src="https://cdn.tailwindcss.com"></script>
      <link href="https://fonts.googleapis.com/css2?family=Pacifico&family=Poppins:wght@300;400;600;700&display=swap" rel="stylesheet" />
      
      {/* Dark Mode Toggle Button */}
      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={toggleDarkMode}
          className="p-3 rounded-full bg-blue-600 dark:bg-cyan-500 text-white shadow-xl transition-all duration-300 hover:bg-blue-700 dark:hover:bg-cyan-600"
          aria-label="Toggle dark mode"
        >
          {isDarkMode ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />}
        </button>
      </div>

      <div className="min-h-screen">
        <About />
      </div>
    </>
  );
}

