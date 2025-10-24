"use client";

import {
  Award,
  BookOpen,
  BrainCircuit,
  Code,
  Heart,
  MessageCircle,
  Coffee,
  Palette,
  PenTool,
  Mic,
  HeartCrack,
  Sparkles,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Section } from "./section";

const skills = [
  {
    icon: <Code className="h-8 w-8 text-primary" />,
    name: "Web Development",
    description: "I turn caffeine into code and dreams into deploys.",
    floatingIcons: [
      { icon: Coffee, className: "top-2 left-2 text-amber-600" },
      { icon: Sparkles, className: "bottom-4 right-3 text-yellow-500" },
    ]
  },
  {
    icon: <BrainCircuit className="h-8 w-8 text-primary" />,
    name: "3D & Graphics",
    description: "Making pixels dance and 3D worlds come alive!",
    floatingIcons: [
      { icon: Palette, className: "top-1 right-4 text-purple-500" },
      { icon: Sparkles, className: "bottom-2 left-4 text-pink-500" },
    ]
  },
  {
    icon: <BookOpen className="h-8 w-8 text-primary" />,
    name: "Book Writing",
    description: "Pouring late-night thoughts into poetic chaos. #3AMConfessions",
    floatingIcons: [
      { icon: PenTool, className: "top-3 right-2 text-green-600" },
      { icon: Coffee, className: "bottom-1 left-3 text-amber-700" },
    ]
  },
  {
    icon: <Award className="h-8 w-8 text-primary" />,
    name: "UI/UX Design",
    description: "Designing experiences smoother than your crush's smile.",
    floatingIcons: [
      { icon: Heart, className: "top-4 left-4 text-red-400" },
      { icon: Sparkles, className: "bottom-3 right-2 text-blue-400" },
    ]
  },
  {
    icon: <MessageCircle className="h-8 w-8 text-primary" />,
    name: "BakBak & Talks",
    description: "Certified chatterbox. Can discuss from JavaScript to Jalebi.",
    floatingIcons: [
      { icon: Mic, className: "top-2 right-2 text-orange-500" },
      { icon: Sparkles, className: "bottom-4 left-2 text-green-400" },
    ]
  },
  {
    icon: <Heart className="h-8 w-8 text-primary" />,
    name: "Romantic Coding",
    description: "Writing code and love letters—both with equal syntax errors.",
    floatingIcons: [
      { icon: HeartCrack, className: "top-3 left-3 text-pink-500" },
      { icon: Sparkles, className: "bottom-2 right-4 text-red-300" },
    ]
  },
];

// Floating Icon Component
function FloatingIcon({ icon: Icon, className }: { icon: any, className: string }) {
  return (
    <div className={`absolute text-lg animate-float ${className}`}>
      <Icon className="w-4 h-4" />
    </div>
  );
}

// Paper Corner Fold Component
function PaperCorner() {
  return (
    <div className="absolute top-0 right-0 w-8 h-8">
      <div className="absolute top-0 right-0 w-0 h-0 border-l-[16px] border-l-transparent border-b-[16px] border-b-gray-300 dark:border-b-gray-600" />
      <div className="absolute top-0 right-0 w-0 h-0 border-l-[14px] border-l-transparent border-b-[14px] border-b-gray-100 dark:border-b-gray-700" />
    </div>
  );
}

export function About() {
  return (
    <Section
      id="about"
      className="relative bg-cover bg-center bg-no-repeat py-20 bg-[url('/background.jpg')]"
    >
      {/* Enhanced Glass Overlay */}
      <div className="absolute inset-0 bg-white/15 dark:bg-black/25 backdrop-blur-[2px] border border-white/30 dark:border-black/40 rounded-2xl" />
      
      {/* Paper Texture Overlay */}
      <div 
        className="absolute inset-0 opacity-30 dark:opacity-20"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='0.4' fill-rule='evenodd'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative container grid items-center justify-center gap-8 px-4 text-center md:px-6 z-10">
        {/* Heading with Enhanced Contrast */}
        <div className="space-y-4 relative">
          <div className="relative inline-block">
            {/* Paper background for heading */}
            <div className="absolute -inset-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl rotate-1 transform shadow-lg" />
            <div className="absolute -inset-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl -rotate-1 transform shadow-lg" />
            <h2 className="relative text-4xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white font-[Pacifico] bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm py-4 px-8 rounded-2xl border-2 border-amber-200 dark:border-amber-800 shadow-lg">
              About Me <span className="text-yellow-400 animate-bounce">💫</span>
            </h2>
          </div>
          <p className="mx-auto max-w-[700px] text-gray-800 dark:text-gray-200 md:text-xl lg:text-lg leading-relaxed font-[Poppins] bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm py-4 px-6 rounded-xl border border-amber-100 dark:border-amber-900/50 shadow-md">
            A developer, writer, and dreamer who loves building digital worlds,
            penning midnight poetry, and cracking jokes that only half the dev
            team understands. If art meets logic — that's where you'll find me.
          </p>
        </div>

        {/* Skills Grid with Paper Craft Style */}
        <div className="mx-auto grid max-w-5xl gap-8 pt-12 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((skill) => (
            <div key={skill.name} className="relative">
              {/* Floating Icons */}
              {skill.floatingIcons.map((floatingIcon, index) => (
                <FloatingIcon
                  key={index}
                  icon={floatingIcon.icon}
                  className={floatingIcon.className}
                />
              ))}
              
              <Card className="group relative bg-white/85 dark:bg-gray-800/85 backdrop-blur-sm border-2 border-amber-200 dark:border-amber-800 text-left transition-all duration-500 hover:-translate-y-3 hover:rotate-1 hover:shadow-2xl rounded-2xl overflow-hidden">
                {/* Paper Corner Fold */}
                <PaperCorner />
                
                {/* Staple Effects */}
                <div className="absolute top-4 -left-2 w-4 h-8 bg-amber-600/60 dark:bg-amber-400/60 rounded-r-lg opacity-70" />
                <div className="absolute top-16 -left-2 w-4 h-4 bg-amber-600/40 dark:bg-amber-400/40 rounded-r-lg opacity-50" />
                
                {/* Hand-drawn border effect */}
                <div className="absolute inset-0 border-2 border-dashed border-amber-300/50 dark:border-amber-600/50 rounded-2xl opacity-40 pointer-events-none" />
                
                <CardHeader className="flex flex-row items-center justify-between pb-3 relative z-10">
                  <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white font-[Pacifico]">
                    {skill.name}
                  </CardTitle>
                  <div className="p-2 rounded-xl bg-amber-100/80 dark:bg-amber-900/50 group-hover:bg-amber-200/80 dark:group-hover:bg-amber-900/70 transition-colors shadow-inner border border-amber-200 dark:border-amber-700">
                    {skill.icon}
                  </div>
                </CardHeader>
                <CardContent className="relative z-10">
                  <p className="text-sm text-gray-800 dark:text-gray-200 leading-relaxed font-[Poppins]">
                    {skill.description}
                  </p>
                </CardContent>
                
                {/* Paper shadow effect */}
                <div className="absolute -bottom-2 -right-2 w-full h-full bg-amber-500/10 dark:bg-amber-400/10 rounded-2xl -z-10 transition-all group-hover:bg-amber-500/15 dark:group-hover:bg-amber-400/15" />
              </Card>
            </div>
          ))}
        </div>
      </div>

      {/* Add floating animation to tailwind config */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-8px) rotate(3deg); }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        
        /* Different animation delays for variety */
        .animate-float:nth-child(odd) {
          animation-delay: 0.5s;
        }
        .animate-float:nth-child(even) {
          animation-delay: 1s;
        }
      `}</style>
    </Section>
  );
}