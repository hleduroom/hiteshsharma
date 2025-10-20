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
    { href: "https://facebook.com/thehiteshsir", label: "Facebook", icon: Facebook, username: "@thehiteshsir" },
    { href: "https://instagram.com/thehiteshsir", label: "Instagram", icon: Instagram, username: "@thehiteshsir" },
    { href: "https://thehiteshsir.com", label: "Website", icon: Globe, username: "thehiteshsir.com" },
    { href: "mailto:thehiteshsir@gmail.com", label: "Email", icon: MessageCircle, username: "thehiteshsir@gmail.com" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/20 bg-white/5 backdrop-blur-2xl supports-[backdrop-filter]:bg-white/5 shadow-2xl">
      <div className="container flex h-16 md:h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Left: Desktop Navigation */}
        <nav className="hidden xl:flex items-center gap-1">
          {navLinks.slice(0, 2).map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                className="group flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-foreground/90 hover:text-primary transition-all duration-300 hover:scale-105 hover:bg-white/10 border border-transparent hover:border-white/20 shadow-lg hover:shadow-primary/10"
              >
                <Icon className="h-4 w-4 transition-transform group-hover:scale-110" />
                <span className="bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                  {link.label}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* Center: Signature - Responsive sizing */}
        <div className="flex items-center justify-center flex-1 lg:flex-none">
          <Link 
            href="/" 
            className="group relative flex flex-col items-center"
          >
            {/* Animated background effect */}
            <div className="absolute inset-0 -z-10 rounded-xl bg-gradient-to-r from-primary/10 via-transparent to-primary/10 opacity-0 group-hover:opacity-100 blur-lg transition-opacity duration-500" />
            
            {/* Responsive signature text */}
            <div className="relative">
              <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold font-signature bg-gradient-to-r from-foreground via-foreground/90 to-foreground bg-clip-text text-transparent tracking-wide lg:tracking-widest drop-shadow-lg">
                hitesh sharma
              </span>
              
              {/* Animated underline */}
              <div className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent w-0 group-hover:w-full transition-all duration-500 ease-out" />
            </div>

            {/* Professional badge - Hidden on mobile */}
            <div className="hidden md:block absolute -top-2 right-2 lg:right-4 px-2 py-1 bg-gradient-to-r from-primary to-primary/80 rounded-full text-xs font-medium text-primary-foreground shadow-lg transform translate-y-0 group-hover:-translate-y-1 transition-transform duration-300">
              Portfolio
            </div>
          </Link>
        </div>

        {/* Right: Desktop Navigation & Controls */}
        <div className="hidden xl:flex items-center gap-1">
          {navLinks.slice(2).map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                className="group flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-foreground/90 hover:text-primary transition-all duration-300 hover:scale-105 hover:bg-white/10 border border-transparent hover:border-white/20 shadow-lg hover:shadow-primary/10"
              >
                <Icon className="h-4 w-4 transition-transform group-hover:scale-110" />
                <span className="bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                  {link.label}
                </span>
              </Link>
            );
          })}
          
          {/* Separator */}
          <div className="w-px h-6 bg-gradient-to-b from-transparent via-white/20 to-transparent mx-3" />
          
          {/* Theme Toggle */}
          <div className="p-1 rounded-xl bg-white/5 border border-white/10 shadow-lg">
            <ThemeToggle />
          </div>
        </div>

        {/* Mobile: Compact Navigation & Social */}
        <div className="flex items-center gap-2 xl:hidden">
          {/* Theme Toggle for mobile */}
          <div className="p-1.5 rounded-lg bg-white/5 border border-white/10 shadow-lg">
            <ThemeToggle />
          </div>

          {/* Mobile Navigation Sheet */}
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 hover:bg-white/20 transition-all duration-300 border border-white/10 shadow-lg rounded-xl group"
              >
                <Menu className="h-4 w-4 transition-transform group-hover:scale-110" />
              </Button>
            </SheetTrigger>
            <SheetContent 
              side="left" 
              className="w-[85vw] max-w-md bg-white/10 backdrop-blur-3xl border-white/20 shadow-2xl flex flex-col"
            >
              {/* Profile Section */}
              <div className="flex items-center gap-3 p-4 mb-4 rounded-xl bg-gradient-to-br from-white/5 to-white/10 border border-white/20 shadow-lg">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/30 to-primary/10 border border-white/20 flex items-center justify-center shadow-lg">
                  <span className="text-lg font-signature text-foreground">hs</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-signature text-lg sm:text-xl text-foreground bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent truncate">
                    hitesh sharma
                  </p>
                  <p className="text-xs text-foreground/60 flex items-center gap-1 truncate">
                    <Sparkles className="h-3 w-3 text-primary flex-shrink-0" />
                    Professional Portfolio
                  </p>
                </div>
              </div>

              {/* Main Navigation */}
              <nav className="flex flex-col gap-2 mb-6">
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="group flex items-center gap-3 px-3 py-3 text-sm font-medium text-foreground/90 hover:text-primary transition-all duration-300 hover:bg-white/10 rounded-lg border border-transparent hover:border-white/20 shadow-lg"
                    >
                      <div className="p-1.5 rounded-md bg-white/5 group-hover:bg-primary/10 transition-colors duration-300">
                        <Icon className="h-4 w-4 transition-transform group-hover:scale-110" />
                      </div>
                      <span className="bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                        {link.label}
                      </span>
                    </Link>
                  );
                })}
              </nav>

              {/* Social Links Section */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-foreground/80 mb-3 px-2 flex items-center gap-2">
                  <MessageCircle className="h-4 w-4 text-primary" />
                  Connect With Me
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {socialLinks.map((social) => {
                    const Icon = social.icon;
                    return (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex flex-col items-center p-2 rounded-lg bg-white/5 border border-white/10 hover:border-primary/30 transition-all duration-300 hover:bg-white/10 shadow-lg"
                      >
                        <div className="p-1.5 rounded-md bg-white/5 group-hover:bg-primary/10 transition-colors duration-300 mb-1">
                          <Icon className="h-3 w-3 text-foreground/80 group-hover:text-primary transition-colors" />
                        </div>
                        <span className="text-xs font-medium text-foreground/80 group-hover:text-primary transition-colors text-center leading-tight">
                          {social.label}
                        </span>
                        <span className="text-[10px] text-foreground/60 text-center mt-0.5 truncate w-full px-1">
                          {social.username}
                        </span>
                      </a>
                    );
                  })}
                </div>
              </div>

              {/* Footer Social Links */}
              <div className="mt-auto pt-3 border-t border-white/10">
                <div className="flex items-center justify-center gap-2 mb-2">
                  {socialLinks.slice(0, 3).map((social) => {
                    const Icon = social.icon;
                    return (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-md bg-white/5 border border-white/10 hover:border-primary/30 transition-all duration-300 hover:scale-110 hover:bg-white/10"
                      >
                        <Icon className="h-3 w-3 text-foreground/70 hover:text-primary transition-colors" />
                      </a>
                    );
                  })}
                </div>
                <p className="text-xs text-foreground/50 text-center flex items-center justify-center gap-1">
                  <Sparkles className="h-3 w-3 text-primary" />
                  @thehiteshsir
                </p>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Tablet: Simplified Navigation (lg breakpoint) */}
        <nav className="hidden lg:flex xl:hidden items-center gap-1">
          {navLinks.slice(0, 3).map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center justify-center p-2.5 rounded-xl text-foreground/80 hover:text-primary transition-all duration-300 hover:scale-105 hover:bg-white/10 border border-transparent hover:border-white/20 shadow-lg"
                title={link.label}
              >
                <Icon className="h-4 w-4" />
              </Link>
            );
          })}
          <div className="w-px h-4 bg-white/20 mx-1" />
          <div className="p-1 rounded-lg bg-white/5 border border-white/10 shadow-lg">
            <ThemeToggle />
          </div>
        </nav>
      </div>
    </header>
  );
}