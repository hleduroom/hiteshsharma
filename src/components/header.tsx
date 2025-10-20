"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

export function Header() {
  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/cart", label: "Cart" },
    { href: "/book", label: "Book" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-white/10 backdrop-blur-lg supports-[backdrop-filter]:bg-white/5 shadow-md">
      {/* Updated Container:
        - Replaced 'justify-between' with 'justify-center' to center the primary content (the name).
        - Added 'md:justify-between' to revert to the original layout on desktop for a balanced look.
        - Added 'relative' to allow absolute positioning of the side elements if a true center is needed, 
          but for simplicity, we'll use a centered flex layout.
      */}
      <div className="container flex h-14 items-center justify-between md:justify-center relative">

        {/* --- Left: Navigation (Desktop) --- */}
        {/* Placed at the start of the flex container. We'll hide it to let the name center on small screens. */}
        <nav className="hidden md:flex items-center gap-6 absolute left-4 lg:left-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        
        {/* --- Center: Name in Signature Font --- */}
        {/* This element is now the visually centered item. */}
        <div className="flex items-center gap-3">
          <Link 
            href="/" 
            className="text-3xl font-bold font-signature text-foreground tracking-wide"
          >
            hitesh sharma
          </Link>
        </div>

        {/* --- Right: Theme toggle + Mobile menu --- */}
        {/* Placed at the end of the flex container. Uses absolute positioning on desktop 
           to keep it on the far right while the name remains centered. */}
        <div className="flex items-center gap-3 absolute right-4 lg:right-8">
          <ThemeToggle />

          {/* Mobile Navigation */}
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-white/20"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[200px] bg-white/10 backdrop-blur-xl border-white/20">
              <nav className="flex flex-col gap-4 mt-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
