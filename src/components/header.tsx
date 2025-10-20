"use client";

import Link from "next/link";
import Image from "next/image"; // Import Image for favicon
import { useState } from "react"; // Import useState for Sheet state
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
  ArrowRight, // For external link indicator
} from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { motion } from "framer-motion";

// Vercel Analytics import is still excluded from this component, as it belongs in app/layout.tsx

export function Header() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Home", icon: Home, external: false },
    { href: "/about", label: "About", icon: User, external: false },
    { href: "https://www.hleduroom.com/instructor/hitesh", label: "Book", icon: BookOpen, external: true },
    { href: "https://thehiteshsir.com", label: "Website", icon: Globe, external: true },
    { href: "/cart", label: "Cart", icon: ShoppingCart, external: false },
    { href: "https://hleduroom.com/contact", label: "Contact", icon: Mail, external: true },
  ];

  const socialLinks = [
    { href: "https://facebook.com/thehiteshsir", icon: Facebook },
    { href: "https://instagram.com/thehiteshsir", icon: Instagram },
    { href: "https://thehiteshsir.com", icon: Globe },
    { href: "mailto:thehiteshsir@gmail.com", icon: Mail },
  ];

  // Function to close the sheet on link click (for mobile navigation)
  const handleLinkClick = () => {
    setIsSheetOpen(false);
  };

  // --- Animation Variants for Mobile Menu ---
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0 },
  };
  // -----------------------------------------

  // Professional desktop navigation link renderer
  const renderDesktopNavLink = (link: typeof navLinks[0]) => {
    const Icon = link.icon;
    const commonClasses = "group flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-foreground/70 hover:text-primary transition-colors duration-200 hover:bg-primary/5";

    return (
      <Link
        key={link.href}
        href={link.href}
        className={commonClasses}
        target={link.external ? "_blank" : "_self"}
        rel={link.external ? "noopener noreferrer" : ""}
      >
        <Icon className="h-3.5 w-3.5 transition-transform group-hover:scale-105" />
        <span className="tracking-wide">{link.label}</span>
      </Link>
    );
  };


  return (
    // GLASS EFFECT: backdrop-blur-xl and reduced background opacity
    <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-background/70 border-b border-border/50 shadow-lg">
      <div className="container h-16 md:h-18 flex items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* Left - Desktop Navigation (Home, About) */}
        <nav className="hidden xl:flex items-center gap-1">
          {navLinks.slice(0, 2).map(renderDesktopNavLink)}
        </nav>

        {/* Center - Professional Logo/Branding with Favicon */}
        <div className="flex items-center justify-center flex-1 lg:flex-none">
          <Link href="/" className="group relative flex items-center gap-2">
             {/* Favicon Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="relative h-6 w-6 rounded-full overflow-hidden shadow-md"
            >
              {/* Using Image component for the favicon */}
              <Image src="/favicon.ico" alt="Hitesh Sharma Logo" width={24} height={24} priority />
            </motion.div>

            {/* Signature Text - Clean, bold, and professional */}
            <motion.span
              className="text-2xl sm:text-3xl font-bold tracking-tight bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent drop-shadow-sm"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              Hitesh Sharma
            </motion.span>
          </Link>
        </div>

        {/* Right - Desktop Nav + Controls */}
        <div className="hidden xl:flex items-center gap-1">
          {navLinks.slice(2).map(renderDesktopNavLink)}

          {/* Divider */}
          <div className="w-px h-6 bg-border mx-3 opacity-60" />

          <div className="p-1 rounded-lg border border-border">
            <ThemeToggle />
          </div>
        </div>

        {/* Mobile Menu */}
        <div className="flex items-center gap-2 xl:hidden">
          <div className="p-1.5 rounded-lg border border-border">
            <ThemeToggle />
          </div>
          
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}> {/* BIND STATE */}
            <SheetTrigger asChild>
              <Button 
                variant="outline" 
                size="icon" 
                className="h-10 w-10 border-border hover:bg-primary/5 transition-all duration-300 rounded-lg" 
              >
                {/* Menu Icon remains h-5 w-5 for touch target */}
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>

            {/* SHEET GLASS EFFECT & PROFESSIONAL STYLING */}
            <SheetContent
              side="left" // Changed to left side for modern feel
              className="w-[85vw] max-w-sm bg-background/80 backdrop-blur-2xl border-r border-primary/20 shadow-2xl flex flex-col pt-10"
            >
              {/* Header Section (Branded) */}
              <div className="flex flex-col items-center p-4 mb-6 border-b border-border/50">
                <div className="relative h-12 w-12 mb-2 rounded-full overflow-hidden shadow-lg border border-primary/20">
                  <Image src="/favicon.ico" alt="Hitesh Sharma Logo" width={48} height={48} />
                </div>
                <span className="text-3xl font-bold tracking-tight text-foreground" >
                  Hitesh Sharma
                </span>
                <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                  <Sparkles className="h-3 w-3 text-primary" /> Author & Developer
                </p>
              </div>

              {/* Navigation with professional staggered animation */}
              <motion.nav 
                className="flex flex-col gap-1 mb-6"
                variants={containerVariants}
                initial="hidden"
                animate="show"
              >
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <motion.div key={link.href} variants={itemVariants}>
                      <Link
                        href={link.href}
                        className="group flex items-center gap-3 px-3 py-3 text-sm font-medium text-foreground hover:text-primary transition-all duration-300 hover:bg-primary/5 rounded-lg"
                        target={link.external ? "_blank" : "_self"}
                        rel={link.external ? "noopener noreferrer" : ""}
                        onClick={handleLinkClick} // CLOSE SHEET ON CLICK
                      >
                        {/* H-4 W-4 for better touch target and visibility */}
                        <Icon className="h-4 w-4 text-foreground/70 group-hover:text-primary" />
                        <span>{link.label}</span>
                        {/* External link indicator */}
                        {link.external && <ArrowRight className="h-3 w-3 ml-auto opacity-50 group-hover:opacity-100 transition-opacity" />}
                      </Link>
                    </motion.div>
                  );
                })}
              </motion.nav>

              {/* Footer Social Links */}
              <div className="mt-auto pt-4 border-t border-border/50">
                <div className="flex items-center justify-center gap-4 mb-4">
                  {socialLinks.map((social, idx) => {
                    const Icon = social.icon;
                    return (
                      <a
                        key={idx}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-full border border-border hover:border-primary transition-all duration-300 hover:bg-primary/5 hover:scale-110 shadow-sm"
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
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
