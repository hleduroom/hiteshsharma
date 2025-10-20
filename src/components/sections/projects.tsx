import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
// Import the data structure defined in "@/lib/placeholder-images"
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Section } from "./section";
import Script from 'next/script'; 

// --- Component Data Setup ---

// 1. We now use the imported data directly, as it contains 'name', 'url', and 'tags'.
// The 'PlaceHolderImages' export from the lib file already contains the correct array.
const projects = PlaceHolderImages;


export function Projects() {
  return (
    <Section id="projects">
      {/* 1. JSON-LD Schema.org Markup for Projects */}
      {/* This section now correctly uses the fields available on the imported 'projects' data */}
      {projects.map((project) => (
        <Script
          key={`schema-${project.id}`}
          id={`schema-project-${project.id}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication", 
              "name": project.name,
              "description": project.description,
              "url": project.url,
              "applicationCategory": "DeveloperApplication",
              "image": project.imageUrl,
              "keywords": project.tags.join(', '),
              "dateCreated": "2024-01-01", // Use a fixed/actual project creation date, not runtime date
              "author": {
                "@type": "Person",
                "name": "Hitesh Sharma" 
              }
            }),
          }}
        />
      ))}

      <div className="container space-y-12 px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">
              Featured Projects
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              A selection of my work that showcases my skills in web development, design, and education. Each project demonstrates a commitment to modern technology and professional execution.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-sm items-start gap-8 sm:max-w-4xl sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-3">
          {projects.map((project) => (
            <Card key={project.id} className="overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 group">
              <CardHeader className="flex justify-center items-center p-6 pb-0">
                {/* Circular Image with Shadow Effect */}
                <div className="relative h-36 w-36 rounded-full shadow-lg transition-shadow duration-300 group-hover:shadow-primary/50 group-hover:shadow-2xl overflow-hidden border-4 border-background ring-4 ring-primary/20">
                  <Image
                    src={project.imageUrl}
                    alt={project.description}
                    fill
                    className="object-cover"
                    data-ai-hint={project.imageHint}
                  />
                </div>
              </CardHeader>
              <CardContent className="grid gap-2 p-6 text-center">
                 <CardTitle className="font-headline text-lg font-semibold">{project.name}</CardTitle>
                 <CardDescription className="text-sm">{project.description}</CardDescription>
              </CardContent>
              <CardFooter className="p-6 pt-0">
                 <Button asChild variant="default" className="w-full font-semibold">
                    <Link href={project.url} target="_blank" rel="noopener noreferrer">
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
