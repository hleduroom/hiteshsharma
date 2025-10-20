"use client";

import Link from "next/link";
import { Analytics } from "@vercel/analytics/next";
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
  ArrowRight,
} from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export function Header() {
  const navLinks = [
    { href: "/", label: "Home", icon: Home, external: false },
    { href: "#about", label: "About", icon: User, external: false },
    { href: "https://www.hleduroom.com/instructor/hitesh", label: "Book", icon: BookOpen, external: true },
    { href: "/cart", label: "Cart", icon: ShoppingCart, external: false },
    { href: "https://hleduroom.com/contact", label: "Contact", icon: Mail, external: true },
  ];

  const socialLinks = [
    { href: "https://facebook.com/thehiteshsir", icon: Facebook },
    { href: "https://instagram.com/thehiteshsir", icon: Instagram },
    { href: "https://thehiteshsir.com", icon: Globe },
    { href: "mailto:thehiteshsir@gmail.com", icon: Mail },
  ];

  const [isMenuOpen, setMenuOpen] = useState(false);

  const handleLinkClick = () => setMenuOpen(false);

  const renderNavLink = (link: typeof navLinks[0]) => {
    const Icon = link.icon;
    return (
      <Link
        key={link.href}
        href={link.href}
        target={link.external ? "_blank" : "_self"}
        rel={link.external ? "noopener noreferrer" : ""}
        className="group flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-foreground/70 hover:text-primary transition-colors duration-200 hover:bg-primary/5"
        onClick={handleLinkClick}
      >
        <Icon className="h-3.5 w-3.5 transition-transform group-hover:scale-105" />
        <span>{link.label}</span>
        {link.external && <ArrowRight className="h-3 w-3 ml-auto opacity-50 group-hover:opacity-100 transition-opacity" />}
      </Link>
    );
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/10 dark:bg-slate-900/30 backdrop-blur-md border-b border-white/20 shadow-lg">
      <div className="container h-16 flex items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left - Desktop Navigation */}
        <nav className="hidden xl:flex items-center gap-1">
          {navLinks.slice(0, 2).map(renderNavLink)}
        </nav>

        {/* Center - Signature */}
        <div className="flex items-center justify-center flex-1 lg:flex-none">
          <Link href="/" className="group relative flex flex-col items-center">
            <motion.span
              className="text-3xl sm:text-4xl md:text-5xl font-[Great_Vibes] bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent drop-shadow-md"
              style={{ fontFamily: "'Great Vibes', cursive" }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              Hitesh Sharma
            </motion.span>
            <motion.div
              className="mt-0.5 h-[2px] w-0 bg-primary/80 rounded-full"
              animate={{ width: ["0%", "50%", "0%"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
          </Link>
        </div>

        {/* Right - Desktop Nav + Theme */}
        <div className="hidden xl:flex items-center gap-1">
          {navLinks.slice(2).map(renderNavLink)}
          <div className="w-px h-6 bg-white/20 mx-3" />
          <div className="p-1 rounded-lg border border-white/20">
            <ThemeToggle />
          </div>
        </div>

        {/* Mobile Menu */}
        <div className="flex items-center gap-2 xl:hidden">
          <div className="p-1.5 rounded-lg border border-white/20">
            <ThemeToggle />
          </div>

          <Sheet open={isMenuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="h-10 w-10 border border-white/20 hover:bg-primary/5 rounded-lg transition-all duration-300"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>

            <AnimatePresence>
              {isMenuOpen && (
                <SheetContent
                  side="right"
                  className="w-[85vw] max-w-sm bg-white/10 dark:bg-slate-900/30 backdrop-blur-lg border-l border-white/20 shadow-2xl flex flex-col pt-10"
                  asChild
                >
                  <motion.div
                    initial={{ x: "100%" }}
                    animate={{ x: 0 }}
                    exit={{ x: "100%" }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="flex flex-col h-full"
                  >
                    {/* Header */}
                    <div className="flex flex-col items-center p-4 mb-6 border-b border-white/20">
                      <span
                        className="text-4xl font-[Great_Vibes] text-foreground"
                        style={{ fontFamily: "'Great Vibes', cursive" }}
                      >
                        hitesh sharma
                      </span>
                      <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                        <Sparkles className="h-3 w-3 text-primary" /> Author & Developer
                      </p>
                    </div>

                    {/* Navigation */}
                    <nav className="flex flex-col gap-1 mb-6">
                      {navLinks.map(renderNavLink)}
                    </nav>

                    {/* Social Links */}
                    <div className="mt-auto pt-4 border-t border-white/20">
                      <div className="flex items-center justify-center gap-4 mb-4">
                        {socialLinks.map((social, idx) => {
                          const Icon = social.icon;
                          return (
                            <a
                              key={idx}
                              href={social.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2 rounded-full border border-white/20 hover:border-primary hover:bg-primary/5 transition-all duration-300 hover:scale-110 shadow-sm"
                            >
                              <Icon className="h-3.5 w-3.5 text-foreground/70 hover:text-primary transition-colors" />
                            </a>
                          );
                        })}
                      </div>
                      <p className="text-xs text-muted-foreground text-center flex items-center justify-center gap-1">
                        <Sparkles className="h-3 w-3 text-primary" /> Crafted by Hitesh Sharma
                      </p>
                    </div>
                  </motion.div>
                </SheetContent>
              )}
            </AnimatePresence>
          </Sheet>
        </div>
      </div>
    </header>
  );
}