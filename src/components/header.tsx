import Link from "next/link";
import Image from "next/image";
import { Code2, Menu } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

export function Header() {
  const navLinks = [
    { href: "#home", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#projects", label: "Projects" },
    { href: "#terminal", label: "Terminal" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-auto flex items-center gap-4">
          <Link href="/" className="flex items-center space-x-2">
            <Code2 className="h-6 w-6 text-primary" />
            <span className="hidden font-bold sm:inline-block font-headline">
              Hitesh Sharma
            </span>
          </Link>
          <div className="hidden items-center gap-4 md:flex">
              <a href="https://hleduroom.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary">
                <Image src="https://hleduroom.com/favicon.ico" alt="HLEduroom Logo" width={16} height={16} />
                <span className="hidden md:inline">HLEduroom</span>
              </a>
              <a href="https://www.thehiteshsir.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary">
                <Image src="https://www.thehiteshsir.com/favicon.ico" alt="The Hitesh Sir Logo" width={16} height={16} />
                <span className="hidden md:inline">The Hitesh Sir</span>
              </a>
          </div>
        </div>
        
        <div className="flex items-center justify-end space-x-2">
           <div className="flex items-center gap-2 md:hidden">
              <a href="https://hleduroom.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-primary">
                <Image src="https://hleduroom.com/favicon.ico" alt="HLEduroom Logo" width={16} height={16} />
              </a>
              <a href="https://www.thehiteshsir.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-primary">
                <Image src="https://www.thehiteshsir.com/favicon.ico" alt="The Hitesh Sir Logo" width={16} height={16} />
              </a>
          </div>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
