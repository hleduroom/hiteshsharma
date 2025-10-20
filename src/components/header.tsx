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
    <header className="sticky top-0 z-50 w-full border-b border-white/20 bg-white/5 backdrop-blur-xl supports-[backdrop-filter]:bg-white/5 shadow-lg">
      <div className="container flex h-16 items-center justify-between md:justify-center relative">

        {/* Left: Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 absolute left-6 lg:left-12">
          {navLinks.slice(0, 2).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-foreground/90 hover:text-primary transition-all duration-300 hover:scale-105 px-3 py-2 rounded-lg hover:bg-white/10"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Center: Signature with Enhanced Styling */}
        <div className="flex items-center gap-3">
          <Link 
            href="/" 
            className="flex flex-col items-center group"
          >
            <span className="text-4xl font-bold font-signature text-foreground tracking-wider bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
              hitesh sharma
            </span>
            <div className="h-0.5 w-0 bg-primary group-hover:w-full transition-all duration-500 ease-out mt-1" />
          </Link>
        </div>

        {/* Right: Desktop Navigation + Theme Toggle */}
        <nav className="hidden md:flex items-center gap-8 absolute right-6 lg:right-12">
          {navLinks.slice(2).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-foreground/90 hover:text-primary transition-all duration-300 hover:scale-105 px-3 py-2 rounded-lg hover:bg-white/10"
            >
              {link.label}
            </Link>
          ))}
          
          <div className="w-px h-6 bg-white/20 mx-2" />
          
          <ThemeToggle />
        </nav>

        {/* Mobile: Right Side Controls */}
        <div className="flex items-center gap-3 md:hidden">
          <ThemeToggle />

          {/* Mobile Navigation Sheet */}
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-white/20 transition-all duration-300 border border-white/10"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent 
              side="right" 
              className="w-[280px] bg-white/10 backdrop-blur-2xl border-white/20"
            >
              {/* Profile Section */}
              <div className="flex items-center gap-4 p-4 mb-6 rounded-lg bg-white/5 border border-white/10">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 border border-white/10 flex items-center justify-center">
                  <span className="text-lg font-signature text-foreground">hs</span>
                </div>
                <div>
                  <p className="font-signature text-xl text-foreground">hitesh sharma</p>
                  <p className="text-xs text-foreground/60">Welcome back</p>
                </div>
              </div>

              {/* Navigation Links */}
              <nav className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="flex items-center px-4 py-3 text-sm font-medium text-foreground/90 hover:text-primary transition-all duration-300 hover:bg-white/10 rounded-lg border border-transparent hover:border-white/10"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>

              {/* Footer in Mobile Menu */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="w-full h-px bg-white/10 mb-4" />
                <p className="text-xs text-foreground/50 text-center">
                  Professional Portfolio
                </p>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}