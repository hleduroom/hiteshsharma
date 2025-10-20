"use client";

import Link from "next/link";
import { Menu, Sparkles, BookOpen, User, ShoppingCart, Home, Mail, Facebook, Instagram, Globe, MessageCircle } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

interface NavLink {
  href: string;
  label: string;
  icon: React.ComponentType<any>;
}

interface SocialLink {
  href: string;
  label: string;
  icon: React.ComponentType<any>;
  username: string;
}

export function Header() {
  const navLinks: NavLink[] = [
    { href: "/", label: "Home", icon: Home },
    { href: "/about", label: "About", icon: User },
    { href: "/cart", label: "Cart", icon: ShoppingCart },
    { href: "/book", label: "Book", icon: BookOpen },
    { href: "/contact", label: "Contact", icon: Mail },
  ];

  const socialLinks: SocialLink[] = [
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
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 md:h-16 items-center justify-between px-4 sm:px-6">
        
        {/* Desktop Navigation Left */}
        <nav className="hidden lg:flex items-center gap-4">
          {navLinks.slice(0, 2).map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium transition-colors hover:text-primary flex items-center gap-2"
              >
                <Icon className="h-4 w-4" />
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Center Logo */}
        <div className="flex items-center justify-center flex-1 lg:flex-none">
          <Link href="/" className="flex items-center space-x-2">
            <div className="flex flex-col items-center">
              <span className="text-xl sm:text-2xl font-bold font-signature text-foreground">
                hitesh sharma
              </span>
              <div className="h-0.5 w-8 bg-primary mt-0.5" />
            </div>
          </Link>
        </div>

        {/* Desktop Navigation Right */}
        <div className="hidden lg:flex items-center gap-4">
          {navLinks.slice(2).map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium transition-colors hover:text-primary flex items-center gap-2"
              >
                <Icon className="h-4 w-4" />
                {link.label}
              </Link>
            );
          })}
          <ThemeToggle />
        </div>

        {/* Mobile Navigation */}
        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <Menu className="h-4 w-4" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col h-full">
                {/* Profile Section */}
                <div className="flex items-center gap-3 p-4 border-b">
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                    <span className="font-signature text-lg">hs</span>
                  </div>
                  <div>
                    <p className="font-signature text-lg font-semibold">hitesh sharma</p>
                    <p className="text-sm text-muted-foreground">Portfolio</p>
                  </div>
                </div>

                {/* Navigation Links */}
                <nav className="flex-1 py-6">
                  <div className="flex flex-col space-y-1">
                    {navLinks.map((link) => {
                      const Icon = link.icon;
                      return (
                        <Link
                          key={link.href}
                          href={link.href}
                          className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg hover:bg-muted transition-colors"
                        >
                          <Icon className="h-4 w-4" />
                          {link.label}
                        </Link>
                      );
                    })}
                  </div>
                </nav>

                {/* Social Links */}
                <div className="border-t pt-4">
                  <p className="text-sm font-medium px-3 mb-3 text-muted-foreground">
                    Connect with me
                  </p>
                  <div className="grid grid-cols-2 gap-2 px-3">
                    {socialLinks.map((social) => {
                      const Icon = social.icon;
                      return (
                        <a
                          key={social.label}
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 p-2 text-sm rounded-lg border hover:bg-muted transition-colors"
                        >
                          <Icon className="h-4 w-4" />
                          <span className="flex-1">{social.label}</span>
                        </a>
                      );
                    })}
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}