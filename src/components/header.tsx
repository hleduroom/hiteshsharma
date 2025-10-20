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
      <div className="container flex h-20 items-center justify-between md:justify-center relative">

        {/* Left: Desktop Navigation with Icons */}
        <nav className="hidden lg:flex items-center gap-2 absolute left-8 xl:left-16">
          {navLinks.slice(0, 2).map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                className="group flex items-center gap-2 px-4 py-3 rounded-2xl text-sm font-medium text-foreground/90 hover:text-primary transition-all duration-500 hover:scale-105 hover:bg-white/10 border border-transparent hover:border-white/20 shadow-lg hover:shadow-primary/10"
              >
                <Icon className="h-4 w-4 transition-transform group-hover:scale-110" />
                <span className="bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                  {link.label}
                </span>
                <Sparkles className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-primary" />
              </Link>
            );
          })}
        </nav>

        {/* Center: Enhanced Signature with Badge */}
        <div className="flex items-center gap-4">
          <Link 
            href="/" 
            className="group relative flex flex-col items-center"
          >
            {/* Animated background effect */}
            <div className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-r from-primary/10 via-transparent to-primary/10 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />
            
            {/* Main signature */}
            <div className="relative">
              <span className="text-5xl font-bold font-signature bg-gradient-to-r from-foreground via-foreground/90 to-foreground bg-clip-text text-transparent tracking-widest drop-shadow-lg">
                hitesh sharma
              </span>
              
              {/* Animated underline */}
              <div className="absolute -bottom-2 left-0 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent w-0 group-hover:w-full transition-all duration-700 ease-out" />
              
              {/* Floating particles */}
              <div className="absolute -top-2 -right-2 w-2 h-2 bg-primary rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping duration-1000" />
              <div className="absolute -bottom-2 -left-2 w-1.5 h-1.5 bg-primary rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping duration-1000 delay-300" />
            </div>

            {/* Professional badge */}
            <div className="absolute -top-3 right-4 px-2 py-1 bg-gradient-to-r from-primary to-primary/80 rounded-full text-xs font-medium text-primary-foreground shadow-lg transform translate-y-0 group-hover:-translate-y-1 transition-transform duration-300">
              Portfolio
            </div>
          </Link>
        </div>

        {/* Right: Desktop Navigation + Enhanced Theme Toggle */}
        <nav className="hidden lg:flex items-center gap-2 absolute right-8 xl:right-16">
          {navLinks.slice(2).map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                className="group flex items-center gap-2 px-4 py-3 rounded-2xl text-sm font-medium text-foreground/90 hover:text-primary transition-all duration-500 hover:scale-105 hover:bg-white/10 border border-transparent hover:border-white/20 shadow-lg hover:shadow-primary/10"
              >
                <Icon className="h-4 w-4 transition-transform group-hover:scale-110" />
                <span className="bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                  {link.label}
                </span>
                <Sparkles className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-primary" />
              </Link>
            );
          })}
          
          {/* Enhanced separator */}
          <div className="w-px h-8 bg-gradient-to-b from-transparent via-white/30 to-transparent mx-4" />
          
          {/* Enhanced Theme Toggle with glass effect */}
          <div className="p-1 rounded-2xl bg-white/5 border border-white/10 shadow-lg">
            <ThemeToggle />
          </div>
        </nav>

        {/* Mobile: Enhanced Controls */}
        <div className="flex items-center gap-4 lg:hidden">
          {/* Enhanced Theme Toggle for mobile */}
          <div className="p-2 rounded-xl bg-white/5 border border-white/10 shadow-lg">
            <ThemeToggle />
          </div>

          {/* Enhanced Mobile Navigation Sheet */}
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-12 w-12 hover:bg-white/20 transition-all duration-300 border border-white/10 shadow-lg rounded-2xl group"
              >
                <Menu className="h-5 w-5 transition-transform group-hover:scale-110 group-hover:rotate-90 duration-300" />
              </Button>
            </SheetTrigger>
            <SheetContent 
              side="right" 
              className="w-[340px] bg-white/10 backdrop-blur-3xl border-white/20 shadow-2xl flex flex-col"
            >
              {/* Enhanced Profile Section */}
              <div className="flex items-center gap-4 p-6 mb-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/10 border border-white/20 shadow-lg">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/30 to-primary/10 border border-white/20 flex items-center justify-center shadow-lg">
                  <span className="text-2xl font-signature text-foreground">hs</span>
                </div>
                <div className="flex-1">
                  <p className="font-signature text-2xl text-foreground bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                    hitesh sharma
                  </p>
                  <p className="text-sm text-foreground/60 flex items-center gap-1">
                    <Sparkles className="h-3 w-3 text-primary" />
                    Professional Portfolio
                  </p>
                </div>
              </div>

              {/* Enhanced Navigation Links */}
              <nav className="flex flex-col gap-3 mb-6">
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="group flex items-center gap-3 px-4 py-4 text-sm font-medium text-foreground/90 hover:text-primary transition-all duration-500 hover:scale-105 hover:bg-white/10 rounded-xl border border-transparent hover:border-white/20 shadow-lg"
                    >
                      <div className="p-2 rounded-lg bg-white/5 group-hover:bg-primary/10 transition-colors duration-300">
                        <Icon className="h-4 w-4 transition-transform group-hover:scale-110" />
                      </div>
                      <span className="bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                        {link.label}
                      </span>
                      <Sparkles className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-primary ml-auto" />
                    </Link>
                  );
                })}
              </nav>

              {/* Social Links Section */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-foreground/80 mb-4 px-2 flex items-center gap-2">
                  <MessageCircle className="h-4 w-4 text-primary" />
                  Connect With Me
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {socialLinks.map((social) => {
                    const Icon = social.icon;
                    return (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex flex-col items-center p-3 rounded-xl bg-white/5 border border-white/10 hover:border-primary/30 transition-all duration-300 hover:scale-105 hover:bg-white/10 shadow-lg"
                      >
                        <div className="p-2 rounded-lg bg-white/5 group-hover:bg-primary/10 transition-colors duration-300 mb-2">
                          <Icon className="h-4 w-4 text-foreground/80 group-hover:text-primary transition-colors" />
                        </div>
                        <span className="text-xs font-medium text-foreground/80 group-hover:text-primary transition-colors text-center">
                          {social.label}
                        </span>
                        <span className="text-[10px] text-foreground/60 text-center mt-1 truncate w-full">
                          {social.username}
                        </span>
                      </a>
                    );
                  })}
                </div>
              </div>

              {/* Enhanced Footer in Mobile Menu */}
              <div className="mt-auto pt-4 border-t border-white/10">
                <div className="flex items-center justify-center gap-3 mb-3">
                  {socialLinks.slice(0, 3).map((social) => {
                    const Icon = social.icon;
                    return (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-white/5 border border-white/10 hover:border-primary/30 transition-all duration-300 hover:scale-110 hover:bg-white/10"
                      >
                        <Icon className="h-4 w-4 text-foreground/70 hover:text-primary transition-colors" />
                      </a>
                    );
                  })}
                </div>
                <p className="text-xs text-foreground/50 text-center flex items-center justify-center gap-2">
                  <Sparkles className="h-3 w-3 text-primary" />
                  @thehiteshsir
                </p>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}