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
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <Code2 className="h-6 w-6 text-primary" />
          <span className="hidden font-bold sm:inline-block font-headline">
            Hitesh Sharma
          </span>
        </Link>
        <div className="flex items-center gap-4">
            <a href="https://hleduroom.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary">
              <Image src="https://hleduroom.com/favicon.ico" alt="HLEduroom Logo" width={16} height={16} />
              <span className="hidden md:inline">HLEduroom</span>
            </a>
            <a href="https://www.thehiteshsir.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary">
              <Image src="https://www.thehiteshsir.com/favicon.ico" alt="The Hitesh Sir Logo" width={16} height={16} />
              <span className="hidden md:inline">The Hitesh Sir</span>
            </a>
        </div>
        <nav className="hidden flex-1 items-center justify-center space-x-4 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <div className="flex flex-col gap-4 p-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-lg font-medium text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
