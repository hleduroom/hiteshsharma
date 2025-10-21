import {
  Award,
  BookOpen,
  BrainCircuit,
  Code,
  PenLine,
  Mic2,
  Sparkles,
  Heart,
  Moon,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Section } from "./section";
import { Dancing_Script } from "next/font/google";

const dancing = Dancing_Script({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const skills = [
  {
    icon: <Code className="h-8 w-8 text-primary" />,
    name: "Web Development",
    description:
      "Turning caffeine and chaos into clean, beautiful code. I make the internet a prettier, faster, and funnier place — one div at a time.",
  },
  {
    icon: <BrainCircuit className="h-8 w-8 text-primary" />,
    name: "3D & Graphics",
    description:
      "Because flat design is boring — I bring visuals to life that breathe, move, and occasionally break physics.",
  },
  {
    icon: <BookOpen className="h-8 w-8 text-primary" />,
    name: "Education",
    description:
      "Teaching with purpose and punchlines — because the best lessons are the ones you actually remember.",
  },
  {
    icon: <PenLine className="h-8 w-8 text-primary" />,
    name: "Book Writing",
    description:
      "Writing words that sound like heartbeats — blending emotion, truth, and midnight coffee in every page.",
  },
  {
    icon: <Heart className="h-8 w-8 text-primary" />,
    name: "Romantic Creativity",
    description:
      "Half developer, half poet — turning feelings into pixels and code into confessions. Logic meets love here.",
  },
  {
    icon: <Mic2 className="h-8 w-8 text-primary" />,
    name: "BakBak (Talking)",
    description:
      "Expert in creative conversation — from deep life theories to bad jokes that somehow make sense.",
  },
  {
    icon: <Sparkles className="h-8 w-8 text-primary" />,
    name: "Creative Chaos Management",
    description:
      "Balancing projects, playlists, and procrastination — because chaos can be beautiful if you dance with it.",
  },
  {
    icon: <Moon className="h-8 w-8 text-primary" />,
    name: "Late-Night Philosopher",
    description:
      "Debugging code and emotions at 3 AM — sipping tea, questioning existence, and sometimes finding the bug in life itself.",
  },
];

export function About() {
  return (
    <Section id="about" className="bg-secondary relative overflow-hidden">
      <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
        <div className="space-y-3">
          <h2
            className={`text-4xl md:text-5xl font-bold tracking-tighter font-headline ${dancing.className} text-primary`}
          >
            About Me
          </h2>
          <p className="mx-auto max-w-[750px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            I’m a developer, educator, and storyteller who codes with logic and
            writes with love. From building{" "}
            <span className="font-semibold text-foreground">H.L.-Eduroom</span>{" "}
            to crafting words that keep readers awake at 3 AM, I believe in
            creating things that *feel* — whether it's a website, a line of
            code, or a verse from the heart.
          </p>

          <p
            className={`mt-2 text-lg text-primary/90 ${dancing.className}`}
          >
            “Code with logic, write with emotion, and live like poetry.”
          </p>
        </div>

        <div className="mx-auto grid max-w-6xl gap-6 pt-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {skills.map((skill) => (
            <Card
              key={skill.name}
              className="text-left transition-transform duration-300 hover:-translate-y-2 hover:shadow-lg hover:bg-background/80 backdrop-blur-sm"
            >
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle
                  className={`text-lg font-medium font-headline ${dancing.className}`}
                >
                  {skill.name}
                </CardTitle>
                {skill.icon}
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
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