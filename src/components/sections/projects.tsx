import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Section } from "./section";
// Import Next.js Script component for JSON-LD
import Script from 'next/script'; 

// --- Project Data with URL (Type Mockup) ---

// Define the structure of a project item
interface ProjectItem {
  id: string;
  imageUrl: string;
  description: string;
  imageHint: string;
  url: string; // Added for Schema and Link activation
  name: string; // Added for Schema
  tags: string[]; // Added for SEO/Tags
}

// Mocking the PlaceholderImages data to ensure required fields (name, url, tags) exist
const projects: ProjectItem[] = PlaceHolderImages.map((p, index) => ({
  ...p,
  id: `project-${index + 1}`, // Ensure unique ID for Schema
  name: `Featured Project ${index + 1}`,
  url: `https://yourdomain.com/projects/${p.id}`, // REPLACE with your actual domain/URLs
  tags: ["Web Development", "Education", "Next.js", "Tailwind CSS"], // Example tags
}));


export function Projects() {
  return (
    <Section id="projects">
      {/* 1. JSON-LD Schema.org Markup for Projects */}
      {projects.map((project) => (
        <Script
          key={`schema-${project.id}`}
          id={`schema-project-${project.id}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication", // A good type for technical projects
              "name": project.name,
              "description": project.description,
              "url": project.url,
              "applicationCategory": "DeveloperApplication",
              "image": project.imageUrl,
              "keywords": project.tags.join(', '),
              "dateCreated": new Date().toISOString().split('T')[0], // Use the creation date
              "author": {
                "@type": "Person",
                "name": "Hitesh Sharma" // REPLACE with your full name
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
                {/* 2. Circular Image with Shadow Effect */}
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
