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
    description: "I turn caffeine into code and dreams into deploys.",
  },
  {
    icon: <BrainCircuit className="h-8 w-8 text-primary" />,
    name: "3D & Graphics",
    description: "Making pixels dance and 3D worlds come alive!",
  },
  {
    icon: <BookOpen className="h-8 w-8 text-primary" />,
    name: "Book Writing",
    description: "Pouring late-night thoughts into poetic chaos. #3AMConfessions",
  },
  {
    icon: <Award className="h-8 w-8 text-primary" />,
    name: "UI/UX Design",
    description: "Designing experiences smoother than your crush’s smile.",
  },
  {
    icon: <MessageCircle className="h-8 w-8 text-primary" />,
    name: "BakBak & Talks",
    description: "Certified chatterbox. Can discuss from JavaScript to Jalebi.",
  },
  {
    icon: <Heart className="h-8 w-8 text-primary" />,
    name: "Romantic Coding",
    description: "Writing code and love letters—both with equal syntax errors.",
  },
];

export function About() {
  return (
    <Section
      id="about"
      className="relative bg-cover bg-center bg-no-repeat py-20 bg-[url('/background.jpg')]"
    >
      {/* Glass overlay */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-md" />

      <div className="relative container grid items-center justify-center gap-4 px-4 text-center md:px-6 z-10">
        {/* Heading */}
        <div className="space-y-3">
          <h2
            className="text-4xl md:text-5xl font-bold tracking-tight text-white font-[Pacifico]"
            style={{ textShadow: "0 2px 10px rgba(255,255,255,0.3)" }}
          >
            About Me 
          </h2>
          <p className="mx-auto max-w-[700px] text-gray-200 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed font-[Poppins]">
            A developer, writer, and dreamer who loves building digital worlds,
            penning midnight poetry, and cracking jokes that only half the dev
            team understands. If art meets logic — that’s where you’ll find me.
          </p>
        </div>

        {/* Skills */}
        <div className="mx-auto grid max-w-5xl gap-6 pt-12 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((skill) => (
            <Card
              key={skill.name}
              className="bg-white/10 backdrop-blur-lg border border-white/20 text-left text-white transition-transform duration-300 hover:-translate-y-2 hover:bg-white/20"
            >
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg font-[Pacifico]">
                  {skill.name}
                </CardTitle>
                {skill.icon}
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-200">{skill.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Section>
  );
}