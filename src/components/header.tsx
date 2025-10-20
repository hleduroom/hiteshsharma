"use client";

import Link from "next/link";
import { Analytics } from "@vercel/analytics/next"
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
  Monitor, // Using Monitor for "Website"
} from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { motion } from "framer-motion";

export function Header() {
  const navLinks = [
    { href: "/", label: "Home", icon: Home, external: false },
    { href: "#about", label: "About", icon: User, external: false },
    { href: "https://www.hleduroom.com/instructor/hitesh", label: "Book", icon: BookOpen, external: true },
    { href: "/cart", label: "Cart", icon: ShoppingCart, external: false },
    { href: "hleduroom.com/contact", label: "Contact", icon: Mail, external: true },
  ];

  const socialLinks = [
    { href: "https://facebook.com/thehiteshsir", icon: Facebook },
    { href: "https://instagram.com/thehiteshsir", icon: Instagram },
    // Ensured Globe points to the main website
    { href: "https://thehiteshsir.com", icon: Globe }, 
    { href: "mailto:thehiteshsir@gmail.com", icon: Mail },
  ];

  const renderNavLink = (link: typeof navLinks[0]) => {
    const Icon = link.icon;
    const commonClasses = "group flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-foreground/70 hover:text-primary transition-colors duration-200 hover:bg-primary/5";
    
    return (
      <Link 
        key={link.href} 
        href={link.href} 
        className={commonClasses}
        target={link.external ? "_blank" : "_self"} // Handle external links
        rel={link.external ? "noopener noreferrer" : ""}
      >
        {/* Reduced Icon Size to h-3.5 w-3.5 */}
        <Icon className="h-3.5 w-3.5 transition-transform group-hover:scale-105" />
        <span className="tracking-wide">{link.label}</span>
      </Link>
    );
  };


  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-background/80 border-b border-border/50 shadow-sm">
      <div className="container h-16 flex items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* Left - Desktop Navigation (Home, About) */} 
        <nav className="hidden xl:flex items-center gap-1"> 
          {navLinks.slice(0, 2).map(renderNavLink)} 
        </nav> 

        {/* Center - Animated Signature */} 
        <div className="flex items-center justify-center flex-1 lg:flex-none"> 
          <Link href="/" className="group relative flex flex-col items-center"> 
            {/* Signature Text */} 
            <motion.span 
              className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-[Great_Vibes] bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent drop-shadow-md" 
              style={{ fontFamily: "'Great Vibes', cursive" }} 
              initial={{ opacity: 0, y: 10 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 1, ease: "easeOut" }} 
            > 
              Hitesh Sharma 
            </motion.span> 
            {/* Underline Animation */} 
            <motion.div 
              className="mt-0.5 h-[2px] w-0 bg-primary/80 rounded-full" 
              animate={{ width: ["0%", "50%", "0%"] }} 
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} 
            /> 
          </Link> 
        </div> 

        {/* Right - Desktop Nav + Controls (Book, Website, Cart, Contact) */} 
        <div className="hidden xl:flex items-center gap-1"> 
          {navLinks.slice(2).map(renderNavLink)}
          
          {/* Divider */} 
          <div className="w-px h-6 bg-border mx-3" /> 
          
          <div className="p-1 rounded-lg border border-border"> 
            <ThemeToggle /> 
          </div> 
        </div> 

        {/* Mobile Menu */} 
        <div className="flex items-center gap-2 xl:hidden"> 
          <div className="p-1.5 rounded-lg border border-border"> 
            <ThemeToggle /> 
          </div> 
          <Sheet> 
            <SheetTrigger asChild> 
              <Button variant="outline" size="icon" className="h-10 w-10 border-border hover:bg-primary/5 transition-all duration-300 rounded-lg" > 
                <Menu className="h-5 w-5" /> 
              </Button> 
            </SheetTrigger> 
            
            <SheetContent side="right" className="w-[85vw] max-w-sm bg-background/95 backdrop-blur-lg border-l border-border/70 shadow-2xl flex flex-col pt-10" > 
              
              {/* Header Section (Simplified) */} 
              <div className="flex flex-col items-center p-4 mb-6 border-b border-border/50"> 
                <span className="text-4xl font-[Great_Vibes] text-foreground" style={{ fontFamily: "'Great Vibes', cursive" }}> 
                  hitesh sharma 
                </span> 
                <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1"> 
                  <Sparkles className="h-3 w-3 text-primary" /> Author & Developer Portfolio
                </p> 
              </div> 

              {/* Navigation */} 
              <nav className="flex flex-col gap-1 mb-6"> 
                {navLinks.map((link) => { 
                  const Icon = link.icon; 
                  return ( 
                    <Link 
                      key={link.href} 
                      href={link.href} 
                      className="group flex items-center gap-3 px-3 py-3 text-sm font-medium text-foreground hover:text-primary transition-all duration-300 hover:bg-primary/5 rounded-lg" 
                      target={link.external ? "_blank" : "_self"}
                      rel={link.external ? "noopener noreferrer" : ""}
                    > 
                      {/* Reduced Icon Size to h-4 w-4 (keeping this slightly larger for mobile) */}
                      <Icon className="h-4 w-4 text-foreground/70 group-hover:text-primary" /> 
                      <span>{link.label}</span> 
                      {link.external && <ArrowRight className="h-3 w-3 ml-auto opacity-50 group-hover:opacity-100 transition-opacity" />}
                    </Link> 
                  ); 
                })} 
              </nav> 

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
                        {/* Reduced Icon Size to h-3.5 w-3.5 */}
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
