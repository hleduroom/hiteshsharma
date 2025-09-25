import { Award, BookOpen, BrainCircuit, Code } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Section } from "./section";

const skills = [
  { icon: <Code className="h-8 w-8 text-primary" />, name: "Web Development", description: "Building modern, responsive websites and applications." },
  { icon: <BrainCircuit className="h-8 w-8 text-primary" />, name: "3D & Graphics", description: "Creating interactive 3D experiences with WebGL and Three.js." },
  { icon: <BookOpen className="h-8 w-8 text-primary" />, name: "Education", description: "Teaching and mentoring aspiring developers and designers." },
  { icon: <Award className="h-8 w-8 text-primary" />, name: "UI/UX Design", description: "Designing intuitive and engaging user interfaces." },
];

export function About() {
  return (
    <Section id="about" className="bg-secondary">
      <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
        <div className="space-y-3">
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight font-headline">
            About Me
          </h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            I am a dedicated developer, educator, and lifelong learner with a passion for building beautiful and functional digital products. My goal is to use my skills to create a positive impact and help others succeed.
          </p>
        </div>
        <div className="mx-auto grid max-w-5xl gap-6 pt-12 sm:grid-cols-2 lg:grid-cols-4">
          {skills.map((skill) => (
            <Card key={skill.name} className="text-left transition-transform duration-300 hover:-translate-y-2">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg font-medium font-headline">{skill.name}</CardTitle>
                {skill.icon}
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{skill.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Section>
  );
}
