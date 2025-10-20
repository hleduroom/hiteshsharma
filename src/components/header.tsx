"use client";

import Link from "next/link";
import {
  Menu,
  Sparkles,
  BookOpen,
  User,
  ShoppingCart,
  Home,
  Mail,
  Facebook,
  Instagram,
  Globe,
} from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { motion } from "framer-motion";

export function Header() {
  const navLinks = [
    { href: "/", label: "Home", icon: Home },
    { href: "/about", label: "About", icon: User },
    { href: "/book", label: "Book", icon: BookOpen },
    { href: "/cart", label: "Cart", icon: ShoppingCart },
    { href: "/contact", label: "Contact", icon: Mail },
  ];

  const socialLinks = [
    { href: "https://facebook.com/thehiteshsir", icon: Facebook },
    { href: "https://instagram.com/thehiteshsir", icon: Instagram },
    { href: "https://thehiteshsir.com", icon: Globe },
    { href: "mailto:thehiteshsir@gmail.com", icon: Mail },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/20 bg-white/10 backdrop-blur-2xl supports-[backdrop-filter]:bg-white/10 shadow-xl">
      <div className="container flex h-16 md:h-20 items-center justify-between px-4 sm:px-6 lg:px-10">

        {/* Left - Desktop Navigation */}
        <nav className="hidden xl:flex items-center gap-2">
          {navLinks.slice(0, 2).map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                className="group flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-foreground/80 hover:text-primary transition-all duration-300 hover:scale-105 hover:bg-white/10 border border-transparent hover:border-white/20"
              >
                <Icon className="h-4 w-4 transition-transform group-hover:rotate-6" />
                <span className="tracking-wide">{link.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Center - Animated Signature */}
        <div className="flex items-center justify-center flex-1 lg:flex-none">
          <Link href="/" className="group relative flex flex-col items-center">
            {/* Animated Background Glow */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.4, 0.2, 0.5] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-primary/30 via-white/5 to-primary/30 blur-xl"
            />

            {/* Signature Text */}
            <motion.span
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-[Great_Vibes] bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent drop-shadow-md"
              style={{ fontFamily: "'Great Vibes', cursive" }}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              hitesh sharma
            </motion.span>

            {/* Underline Animation */}
            <motion.div
              className="mt-1 h-[2px] w-0 bg-gradient-to-r from-transparent via-primary to-transparent rounded-full"
              animate={{ width: ["0%", "100%", "0%"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
          </Link>
        </div>

        {/* Right - Desktop Nav + Controls */}
        <div className="hidden xl:flex items-center gap-2">
          {navLinks.slice(2).map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                className="group flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-foreground/80 hover:text-primary transition-all duration-300 hover:scale-105 hover:bg-white/10 border border-transparent hover:border-white/20"
              >
                <Icon className="h-4 w-4 group-hover:-rotate-6 transition-transform" />
                <span className="tracking-wide">{link.label}</span>
              </Link>
            );
          })}

          {/* Divider */}
          <div className="w-px h-6 bg-gradient-to-b from-transparent via-white/20 to-transparent mx-3" />

          <div className="p-1 rounded-xl bg-white/5 border border-white/10 shadow-inner">
            <ThemeToggle />
          </div>
        </div>

        {/* Mobile Menu */}
        <div className="flex items-center gap-2 xl:hidden">
          <div className="p-1.5 rounded-lg bg-white/5 border border-white/10">
            <ThemeToggle />
          </div>

          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 hover:bg-white/20 transition-all duration-300 border border-white/10 rounded-xl"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>

            <SheetContent
              side="left"
              className="w-[85vw] max-w-md bg-white/10 backdrop-blur-3xl border-white/20 shadow-2xl flex flex-col"
            >
              {/* Header Section */}
              <div className="flex items-center gap-3 p-4 mb-4 rounded-xl bg-white/5 border border-white/10">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center">
                  <span className="text-lg font-[Great_Vibes]" style={{ fontFamily: "'Great Vibes', cursive" }}>
                    hs
                  </span>
                </div>
                <div>
                  <p
                    className="text-lg font-[Great_Vibes] text-foreground"
                    style={{ fontFamily: "'Great Vibes', cursive" }}
                  >
                    hitesh sharma
                  </p>
                  <p className="text-xs text-foreground/60 flex items-center gap-1">
                    <Sparkles className="h-3 w-3 text-primary" />
                    portfolio
                  </p>
                </div>
              </div>

              {/* Navigation */}
              <nav className="flex flex-col gap-2 mb-6">
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="group flex items-center gap-3 px-3 py-3 text-sm font-medium text-foreground/90 hover:text-primary transition-all duration-300 hover:bg-white/10 rounded-lg border border-transparent hover:border-white/20"
                    >
                      <Icon className="h-4 w-4" />
                      <span>{link.label}</span>
                    </Link>
                  );
                })}
              </nav>

              {/* Footer Social Links */}
              <div className="mt-auto pt-3 border-t border-white/10">
                <div className="flex items-center justify-center gap-3 mb-3">
                  {socialLinks.map((social, idx) => {
                    const Icon = social.icon;
                    return (
                      <a
                        key={idx}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-md bg-white/5 border border-white/10 hover:border-primary/30 hover:bg-white/10 transition-all duration-300 hover:scale-110"
                      >
                        <Icon className="h-4 w-4 text-foreground/70 hover:text-primary transition-colors" />
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
      </div>
    </header>
  );
}