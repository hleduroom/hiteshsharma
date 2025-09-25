import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Section } from "./section";

const projects = PlaceHolderImages;

export function Projects() {
  return (
    <Section id="projects">
      <div className="container space-y-12 px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">
              Featured Projects
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              A selection of my work that showcases my skills in web development, design, and education.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-sm items-start gap-8 sm:max-w-4xl sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-3">
          {projects.map((project) => (
            <Card key={project.id} className="overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
              <CardHeader className="p-0">
                <div className="relative h-48 w-full">
                  <Image
                    src={project.imageUrl}
                    alt={project.description}
                    fill
                    className="object-cover"
                    data-ai-hint={project.imageHint}
                  />
                </div>
              </CardHeader>
              <CardContent className="grid gap-2 p-6">
                 <CardTitle className="font-headline">Project {project.id.split('-')[1]}</CardTitle>
                 <CardDescription>{project.description}</CardDescription>
              </CardContent>
              <CardFooter className="p-6 pt-0">
                 <Button asChild variant="outline" className="w-full">
                    <Link href="#">
                      View Project <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                 </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </Section>
  );
}
