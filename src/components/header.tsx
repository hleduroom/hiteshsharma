"use client";

import Link from "next/link";
import { Menu, Sparkles, BookOpen, User, ShoppingCart, Home, Mail, Facebook, Instagram, Globe, MessageCircle } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

export function Header() {
  const navLinks = [
    { href: "/", label: "Home", icon: Home },
    { href: "/about", label: "About", icon: User },
    { href: "/cart", label: "Cart", icon: ShoppingCart },
    { href: "/book", label: "Book", icon: BookOpen },
    { href: "/contact", label: "Contact", icon: Mail },
  ];

  const socialLinks = [
    { 
      href: "https://facebook.com/thehiteshsir", 
      label: "Facebook", 
      icon: Facebook, 
      username: "@thehiteshsir" 
    },
    { 
      href: "https://instagram.com/thehiteshsir", 
      label: "Instagram", 
      icon: Instagram, 
      username: "@thehiteshsir" 
    },
    { 
      href: "https://thehiteshsir.com", 
      label: "Website", 
      icon: Globe, 
      username: "thehiteshsir.com" 
    },
    { 
      href: "mailto:thehiteshsir@gmail.com", 
      label: "Email", 
      icon: MessageCircle, 
      username: "thehiteshsir@gmail.com" 
    },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 md:h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Left: Desktop Navigation */}
        <nav className="hidden xl:flex items-center gap-2">
          {navLinks.slice(0, 2).map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-foreground/80 hover:text-foreground transition-colors duration-200 hover:bg-accent/50"
              >
                <Icon className="h-4 w-4" />
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Center: Signature */}
        <div className="flex items-center justify-center flex-1 lg:flex-none">
          <Link 
            href="/" 
            className="group relative flex flex-col items-center"
          >
            <div className="relative">
              <span className="text-2xl sm:text-3xl md:text-4xl font-bold font-signature text-foreground tracking-wide">
                hitesh sharma
              </span>
              <div className="absolute -bottom-1 left-0 h-0.5 bg-primary w-0 group-hover:w-full transition-all duration-300 ease-out" />
            </div>
            <div className="hidden md:block absolute -top-2 right-2 px-2 py-1 bg-primary rounded-full text-xs font-medium text-primary-foreground">
              Portfolio
            </div>
          </Link>
        </div>

        {/* Right: Desktop Navigation & Controls */}
        <div className="hidden xl:flex items-center gap-2">
          {navLinks.slice(2).map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-foreground/80 hover:text-foreground transition-colors duration-200 hover:bg-accent/50"
              >
                <Icon className="h-4 w-4" />
                {link.label}
              </Link>
            );
          })}
          
          <div className="w-px h-6 bg-border mx-2" />
          <ThemeToggle />
        </div>

        {/* Mobile & Tablet */}
        <div className="flex items-center gap-2 xl:hidden">
          <ThemeToggle />
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9"
              >
                <Menu className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[350px]">
              {/* Profile */}
              <div className="flex items-center gap-3 p-4 mb-6 rounded-lg bg-accent/50">
                <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <span className="text-lg font-signature text-foreground">hs</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-signature text-lg text-foreground truncate">
                    hitesh sharma
                  </p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <Sparkles className="h-3 w-3 text-primary" />
                    Professional Portfolio
                  </p>
                </div>
              </div>

              {/* Navigation */}
              <nav className="flex flex-col gap-1 mb-8">
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="flex items-center gap-3 px-3 py-3 text-sm font-medium text-foreground/80 hover:text-foreground transition-colors rounded-lg hover:bg-accent/50"
                    >
                      <Icon className="h-4 w-4" />
                      {link.label}
                    </Link>
                  );
                })}
              </nav>

              {/* Social Links */}
              <div className="mt-auto border-t pt-4">
                <div className="grid grid-cols-4 gap-2 mb-3">
                  {socialLinks.map((social) => {
                    const Icon = social.icon;
                    return (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col items-center p-2 rounded-lg hover:bg-accent/50 transition-colors"
                        title={social.label}
                      >
                        <Icon className="h-4 w-4 text-muted-foreground mb-1" />
                        <span className="text-[10px] text-muted-foreground text-center">
                          {social.username.includes('@') 
                            ? social.username.split('@')[1]?.split('.')[0] || social.username
                            : social.username.replace('thehiteshsir.', '')
                          }
                        </span>
                      </a>
                    );
                  })}
                </div>
                <p className="text-xs text-muted-foreground text-center">
                  Connect with me
                </p>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Tablet Navigation */}
        <nav className="hidden lg:flex xl:hidden items-center gap-1">
          {navLinks.slice(0, 3).map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center justify-center p-2 rounded-lg text-foreground/80 hover:text-foreground transition-colors"
                title={link.label}
              >
                <Icon className="h-4 w-4" />
              </Link>
            );
          })}
          <div className="w-px h-4 bg-border mx-1" />
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}