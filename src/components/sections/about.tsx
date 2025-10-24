"use client";

import {
  Award,
  BookOpen,
  BrainCircuit,
  Code,
  Heart,
  MessageCircle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Section } from "./section";

const skills = [
  {
    icon: <Code className="h-8 w-8 text-primary" />,
    name: "Web Development",
    description:
      "I turn caffeine into code and dreams into deploys. Sometimes bugs too—free of charge.",
  },
  {
    icon: <BrainCircuit className="h-8 w-8 text-primary" />,
    name: "3D & Graphics",
    description:
      "Making pixels dance and 3D worlds come alive like a Pixar intern on Red Bull.",
  },
  {
    icon: <BookOpen className="h-8 w-8 text-primary" />,
    name: "Book Writing",
    description:
      "Pouring late-night thoughts into poetic chaos. #3AMConfessions",
  },
  {
    icon: <Award className="h-8 w-8 text-primary" />,
    name: "UI/UX Design",
    description: "Designing experiences smoother than your crush’s smile.",
  },
  {
    icon: <MessageCircle className="h-8 w-8 text-primary" />,
    name: "BakBak & Talks",
    description:
      "Certified chatterbox. Can discuss from JavaScript to Jalebi with equal passion.",
  },
  {
    icon: <Heart className="h-8 w-8 text-primary" />,
    name: "Romantic Coding",
    description:
      "Writing code and love letters—both full of syntax errors but pure intent.",
  },
];

export function About() {
  return (
    <Section
      id="about"
      className="relative py-20 bg-cover bg-center bg-no-repeat bg-[url('/background.jpg')] rounded-2xl"
    >
      {/* Glow Overlay for Light & Dark Mode */}
      <div className="absolute inset-0 rounded-2xl">
        <div className="absolute inset-0 bg-white/30 backdrop-blur-lg dark:hidden" />
        <div className="absolute inset-0 bg-black/40 backdrop-blur-md hidden dark:block" />
      </div>

      {/* Content */}
      <div className="relative container mx-auto z-10 px-4 md:px-6 text-center">
        {/* Heading */}
        <div className="space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-gray-100 font-[Pacifico] shadow-sm">
            About Me 💫
          </h2>
          <p className="mx-auto max-w-[700px] text-gray-700 dark:text-gray-300 md:text-xl leading-relaxed font-[Poppins]">
            A developer, writer, and dreamer who loves building digital worlds,
            penning midnight poetry, and cracking jokes that only half the dev
            team understands. If art meets logic — that’s where you’ll find me.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="mx-auto grid max-w-5xl gap-6 pt-12 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((skill) => (
            <Card
              key={skill.name}
              className="bg-white/40 dark:bg-black/30 backdrop-blur-md border border-white/30 dark:border-black/40 shadow-md hover:shadow-xl text-left text-gray-900 dark:text-gray-100 transition-transform duration-300 hover:-translate-y-2 rounded-2xl"
            >
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg font-[Pacifico]">
                  {skill.name}
                </CardTitle>
                {skill.icon}
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-700 dark:text-gray-300">
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