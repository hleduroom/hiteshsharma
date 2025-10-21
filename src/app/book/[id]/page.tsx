"use client";

import { useState, useEffect } from 'react';
import { allBooks, type Book } from '@/lib/data/book';
import { notFound, useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Star, 
  BookOpen, 
  Download, 
  Eye, 
  Share2, 
  Bookmark, 
  Users, 
  Shield, 
  FileText,
  Sparkles,
  Zap,
  CheckCircle,
  Clock,
  Award,
  Crown,
  Gem,
  BookText,
  Library,
  PenTool,
  Globe,
  Calendar,
  Hash,
  Tag,
  Menu,
  X
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { AddToCartButton } from '@/components/ui/add-to-cart-button';

interface BookWithFormat extends Book {
  bookFormat?: 'ebook' | 'paperback' | 'hardcover';
}

// Try different import patterns for header and footer
let Header, Footer;

try {
  // Try named imports first
  ({ Header } = require('@/components/header'));
  ({ Footer } = require('@/components/footer'));
} catch (error) {
  // Fallback: Create simple header and footer components
  Header = function SimpleHeader() {
    return (
      <header className="sticky top-0 z-50 border-b border-white/20 dark:border-slate-800/50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl supports-backdrop-blur:bg-white/60">
        <div className="container mx-auto px-4 sm:px-6 py-4">
          <nav className="flex items-center justify-between">
            <Link href="/" className="group transform transition-all duration-300 hover:scale-105">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                  <PenTool className="w-4 h-4 text-white" />
                </div>
                <span className="text-xl font-semibold text-foreground font-handwriting bg-gradient-to-r from-slate-900 to-slate-700 dark:from-slate-100 dark:to-slate-300 bg-clip-text text-transparent">
                  Hitesh Sharma
                </span>
              </div>
            </Link>
            <div className="hidden md:flex items-center space-x-6 text-sm">
              <Link href="/books" className="text-muted-foreground hover:text-foreground transition-all duration-300 hover:scale-105 font-medium">Books</Link>
              <Link href="/about" className="text-muted-foreground hover:text-foreground transition-all duration-300 hover:scale-105 font-medium">About</Link>
              <Link href="/blog" className="text-muted-foreground hover:text-foreground transition-all duration-300 hover:scale-105 font-medium">Blog</Link>
            </div>
            <Button variant="ghost" size="sm" className="glass-effect border border-white/20 hover:scale-105 transition-all duration-300 group md:hidden">
              <Menu className="w-4 h-4" />
            </Button>
          </nav>
        </div>
      </header>
    );
  };

  Footer = function SimpleFooter() {
    return (
      <footer className="border-t border-white/20 mt-12 sm:mt-16 md:mt-20 lg:mt-24">
        <div className="glass-effect backdrop-blur-sm shadow-lg">
          <div className="container mx-auto px-6 py-8 sm:py-12">
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center space-x-3 group hover:scale-105 transition-transform duration-300">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                  <PenTool className="w-4 h-4 text-white" />
                </div>
                <span className="text-xl font-semibold font-handwriting bg-gradient-to-r from-slate-900 to-slate-700 dark:from-slate-100 dark:to-slate-300 bg-clip-text text-transparent">
                  Hitesh Sharma
                </span>
              </div>
              <p className="text-muted-foreground max-w-md mx-auto text-sm sm:text-base">
                Transforming perspectives through the power of words and wisdom.
              </p>
              <div className="flex items-center justify-center space-x-4 sm:space-x-6 text-xs sm:text-sm text-muted-foreground">
                <span>© 2024 H.L. Eduroom</span>
                <span>•</span>
                <span>All rights reserved</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  };
}

export default function BookDetailsPage() {
  const params = useParams();
  const id = params.id as string;
  
  const [activeFormat, setActiveFormat] = useState<'ebook' | 'paperback' | 'hardcover'>('ebook');
  const [isLoading, setIsLoading] = useState(true);
  const [showShareTooltip, setShowShareTooltip] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'preview' | 'reviews'>('overview');
  const [isVisible, setIsVisible] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Find the book
  const book = allBooks.find(b => b.id === id);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      setIsVisible(true);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  if (!book) {
    notFound();
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-blue-950/20 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="relative">
            <div className="w-16 h-16 md:w-20 md:h-20 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <BookText className="w-6 h-6 md:w-8 md:h-8 text-blue-600 animate-pulse" />
            </div>
          </div>
          <div>
            <p className="text-base md:text-lg font-semibold text-foreground mb-2 animate-pulse">Loading Masterpiece</p>
            <p className="text-xs md:text-sm text-muted-foreground">Preparing your reading experience...</p>
          </div>
        </div>
      </div>
    );
  }

  const handleShare = async () => {
    const shareText = `Discover "${book.title}" by ${book.author}\n\n${book.description.substring(0, 120)}...\n\nJoin thousands of readers who have transformed their perspective.`;
    const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${book.title} by ${book.author}`,
          text: shareText,
          url: shareUrl,
        });
      } catch (error) {
        // User cancelled share
      }
    } else {
      await navigator.clipboard.writeText(`${shareText}\n\nGet your copy: ${shareUrl}`);
      setShowShareTooltip(true);
      setTimeout(() => setShowShareTooltip(false), 3000);
    }
  };

  const stats = [
    { label: "Pages", value: book.pages, icon: BookText, color: "text-blue-600" },
    { label: "Language", value: book.language, icon: Globe, color: "text-green-600" },
    { label: "Publisher", value: book.publisher, icon: Library, color: "text-purple-600" },
    { label: "ISBN", value: book.isbn, icon: Hash, color: "text-orange-600" },
    { label: "Published", value: new Date(book.publishedDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }), icon: Calendar, color: "text-red-600" },
    { label: "Genre", value: book.genre.join(' • '), icon: Tag, color: "text-pink-600" }
  ];

  const formatIcons = {
    ebook: { icon: Download, color: "text-blue-600", bg: "bg-blue-100 dark:bg-blue-900/30" },
    paperback: { icon: BookOpen, color: "text-green-600", bg: "bg-green-100 dark:bg-green-900/30" }, 
    hardcover: { icon: Crown, color: "text-amber-600", bg: "bg-amber-100 dark:bg-amber-900/30" }
  };

  const formatDelivery = {
    ebook: "Instant Access",
    paperback: "2-3 Business Days",
    hardcover: "2-3 Business Days"
  };

  const formatBadges = {
    ebook: { text: "Most Popular", color: "bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-500/20" },
    paperback: { text: "Reader's Choice", color: "bg-green-500/10 text-green-700 dark:text-green-300 border-green-500/20" },
    hardcover: { text: "Collector's Edition", color: "bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/20" }
  };

  // Create book with format for AddToCartButton
  const bookWithFormat: BookWithFormat = {
    ...book,
    bookFormat: activeFormat
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-blue-950/20">
      {/* Header Component */}
      <Header />
      
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden" onClick={() => setIsMobileMenuOpen(false)}>
          <div className="absolute top-4 right-4 left-4 bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-2xl border border-white/20">
            <div className="flex justify-between items-center mb-6">
              <span className="text-lg font-semibold">Menu</span>
              <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)}>
                <X className="w-5 h-5" />
              </Button>
            </div>
            <nav className="space-y-4">
              <Link href="/books" className="block py-3 px-4 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors font-medium">
                Library
              </Link>
              <Link href="/about" className="block py-3 px-4 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors font-medium">
                Author
              </Link>
              <Link href="/blog" className="block py-3 px-4 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors font-medium">
                Insights
              </Link>
            </nav>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 sm:px-6 py-8">
        {/* Enhanced Glass Breadcrumb with Mobile Optimization */}
        <nav className={`mb-8 sm:mb-12 transition-all duration-700 delay-100 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <div className="glass-effect rounded-2xl px-4 sm:px-6 py-3 sm:py-4 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-500 backdrop-blur-sm">
            <div className="flex items-center space-x-2 sm:space-x-3 text-xs sm:text-sm text-muted-foreground overflow-x-auto">
              <Link href="/" className="hover:text-foreground transition-all duration-300 hover:scale-105 font-medium flex items-center whitespace-nowrap">
                <span>Home</span>
              </Link>
              <div className="w-1 h-1 bg-muted-foreground/30 rounded-full flex-shrink-0"></div>
              <Link href="/books" className="hover:text-foreground transition-all duration-300 hover:scale-105 font-medium flex items-center whitespace-nowrap">
                <span>Books</span>
              </Link>
              <div className="w-1 h-1 bg-muted-foreground/30 rounded-full flex-shrink-0"></div>
              <span className="text-foreground font-semibold truncate flex items-center whitespace-nowrap">
                <BookText className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 text-blue-600 flex-shrink-0" />
                <span className="truncate">{book.title}</span>
              </span>
            </div>
          </div>
        </nav>

        <div className="grid lg:grid-cols-3 gap-8 xl:gap-16 items-start">
          {/* Enhanced Book Cover with Mobile Optimization */}
          <div className={`lg:col-span-1 flex justify-center transition-all duration-1000 delay-200 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'}`}>
            <div className="relative group w-full max-w-xs sm:max-w-sm">
              <div className="glass-effect rounded-3xl p-4 sm:p-6 md:p-8 border border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-700 backdrop-blur-sm transform group-hover:rotate-[-1deg]">
                <div className="relative overflow-hidden rounded-2xl">
                  <Image
                    src={book.coverImage}
                    alt={book.title}
                    width={400}
                    height={500}
                    className="w-full h-auto rounded-2xl shadow-2xl transform transition-all duration-700 group-hover:scale-110"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/0 via-transparent to-black/0 opacity-0 group-hover:opacity-100 transition-all duration-500" />
                </div>
              </div>
              
              {/* Enhanced Floating Badges with Mobile Optimization */}
              <div className="absolute -top-2 -left-2 sm:-top-3 sm:-left-3 animate-float-slow">
                <div className="glass-effect px-3 py-1 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-semibold shadow-2xl border border-amber-400/20 backdrop-blur-sm flex items-center space-x-1 sm:space-x-2 group hover:scale-110 transition-transform duration-300">
                  <Crown className="w-3 h-3 sm:w-4 sm:h-4 text-amber-600" />
                  <span className="hidden xs:inline">Bestseller</span>
                  <span className="xs:hidden">Best</span>
                </div>
              </div>
              <div className="absolute -bottom-2 -right-2 sm:-bottom-3 sm:-right-3 animate-float-slow" style={{ animationDelay: '1s' }}>
                <div className="glass-effect px-3 py-1 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-semibold shadow-2xl border border-emerald-400/20 backdrop-blur-sm flex items-center space-x-1 sm:space-x-2 group hover:scale-110 transition-transform duration-300">
                  <Gem className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-600" />
                  <span>{book.rating}/5</span>
                </div>
              </div>
            </div>
          </div>

          {/* Content Section with Mobile Optimization */}
          <div className={`lg:col-span-2 space-y-6 sm:space-y-8 transition-all duration-1000 delay-300 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'}`}>
            {/* Enhanced Header Section */}
            <div className="space-y-4 sm:space-y-6">
              <div className="glass-effect rounded-2xl p-4 sm:p-6 md:p-8 border border-white/20 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-500">
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                    <Badge className="glass-effect border border-blue-400/20 text-blue-700 dark:text-blue-300 px-2 py-1 sm:px-3 sm:py-1.5 flex items-center space-x-1 sm:space-x-2 hover:scale-105 transition-transform duration-300 text-xs sm:text-sm">
                      <Tag className="w-2 h-2 sm:w-3 sm:h-3" />
                      <span className="truncate">{book.genre[0]}</span>
                    </Badge>
                    <div className="flex items-center space-x-1 text-amber-500 group">
                      <Star className="w-3 h-3 sm:w-4 sm:h-4 fill-current group-hover:scale-110 transition-transform duration-300" />
                      <span className="text-xs sm:text-sm font-semibold">{book.rating}</span>
                      <span className="text-xs sm:text-sm text-muted-foreground">({book.reviews})</span>
                    </div>
                  </div>
                  
                  <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight font-handwriting bg-gradient-to-r from-slate-900 via-blue-900 to-purple-900 dark:from-slate-100 dark:via-blue-100 dark:to-purple-100 bg-clip-text text-transparent animate-gradient break-words">
                    {book.title}
                  </h1>
                  
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                    <div className="flex items-center space-x-2 group hover:scale-105 transition-transform duration-300">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-slate-600 to-slate-800 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300 flex-shrink-0">
                        <PenTool className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm sm:text-lg text-muted-foreground">by</p>
                        <p className="text-base sm:text-xl font-semibold text-foreground truncate">{book.author}</p>
                      </div>
                    </div>
                    <div className="hidden sm:block h-6 sm:h-8 w-px bg-border/50"></div>
                    <div className="flex items-center space-x-2 text-muted-foreground group hover:scale-105 transition-transform duration-300">
                      <Users className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span className="text-xs sm:text-sm">Join {Math.floor(book.reviews * 2.5)}+ readers</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Enhanced Glass Stats Grid - Mobile Responsive */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3 md:gap-4">
                {stats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <div 
                      key={stat.label} 
                      className={`glass-effect rounded-lg sm:rounded-xl p-2 sm:p-3 md:p-4 border border-white/20 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 hover:scale-105 group cursor-pointer delay-${index * 100} ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
                      style={{ transitionDelay: `${index * 100}ms` }}
                    >
                      <div className="flex items-center space-x-2 sm:space-x-3">
                        <div className={`p-1 sm:p-2 rounded sm:rounded-lg ${stat.color} bg-opacity-10 group-hover:scale-110 transition-transform duration-300 flex-shrink-0`}>
                          <Icon className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-xs sm:text-sm text-muted-foreground font-medium truncate">{stat.label}</p>
                          <p className="text-sm sm:text-base text-foreground font-semibold truncate">{stat.value}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Enhanced Glass Navigation Tabs - Mobile Responsive */}
            <div className="glass-effect rounded-2xl p-1 sm:p-2 border border-white/20 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-500">
              <nav className="flex space-x-1 sm:space-x-2">
                {[
                  { id: 'overview', label: 'Overview', icon: FileText },
                  { id: 'preview', label: 'Preview', icon: Eye },
                  { id: 'reviews', label: 'Reviews', icon: Star }
                ].map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`flex items-center space-x-1 sm:space-x-2 px-3 sm:px-4 md:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl transition-all duration-300 flex-1 text-center justify-center group text-xs sm:text-sm ${
                        activeTab === tab.id
                          ? 'bg-white/80 dark:bg-slate-800/80 shadow-sm text-blue-600 scale-105'
                          : 'text-muted-foreground hover:text-foreground hover:scale-105'
                      }`}
                    >
                      <Icon className={`w-3 h-3 sm:w-4 sm:h-4 transition-all duration-300 ${activeTab === tab.id ? 'scale-110' : 'group-hover:scale-110'}`} />
                      <span className="font-medium truncate">{tab.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Enhanced Tab Content - Mobile Responsive */}
            <div className="space-y-6 sm:space-y-8">
              {/* Overview Tab */}
              {activeTab === 'overview' && (
                <div className="space-y-4 sm:space-y-6">
                  <div className="glass-effect rounded-2xl p-4 sm:p-6 md:p-8 border border-white/20 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-500">
                    <div className="prose prose-sm sm:prose-lg dark:prose-invert max-w-none">
                      <h3 className="flex items-center text-lg sm:text-xl md:text-2xl font-semibold mb-3 sm:mb-4 group">
                        <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 mr-2 sm:mr-3 text-blue-500 group-hover:scale-110 transition-transform duration-300" />
                        About This Masterpiece
                      </h3>
                      <p className="text-sm sm:text-base md:text-xl leading-relaxed text-foreground/90">
                        {book.description}
                      </p>
                    </div>
                  </div>

                  {/* Enhanced Format Selection - Mobile Responsive */}
                  <div className="space-y-4 sm:space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0">
                      <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-foreground flex items-center group">
                        <Zap className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 mr-2 sm:mr-3 text-yellow-500 group-hover:scale-110 transition-transform duration-300" />
                        Choose Your Edition
                      </h3>
                      <div className="flex items-center space-x-2 text-xs sm:text-sm text-muted-foreground group hover:scale-105 transition-transform duration-300">
                        <Shield className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span>Secure Payment • 30-Day Guarantee</span>
                      </div>
                    </div>

                    <div className="grid gap-3 sm:gap-4">
                      {(['ebook', 'paperback', 'hardcover'] as const).map((format, index) => {
                        const FormatIcon = formatIcons[format].icon;
                        return (
                          <div
                            key={format}
                            onClick={() => setActiveFormat(format)}
                            className={`glass-effect rounded-xl sm:rounded-2xl p-4 sm:p-6 border-2 cursor-pointer transition-all duration-500 transform hover:scale-[1.02] backdrop-blur-sm shadow-lg hover:shadow-xl delay-${index * 150} ${
                              activeFormat === format
                                ? `border-blue-500/50 ${formatIcons[format].bg} scale-105 shadow-xl`
                                : 'border-white/20 hover:border-blue-300/50'
                            } ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
                            style={{ transitionDelay: `${index * 150}ms` }}
                          >
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0">
                              <div className="flex items-center space-x-3 sm:space-x-4">
                                <div className={`p-2 sm:p-3 rounded-lg sm:rounded-xl ${formatIcons[format].bg} group-hover:scale-110 transition-transform duration-300 flex-shrink-0`}>
                                  <FormatIcon className={`w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 ${formatIcons[format].color}`} />
                                </div>
                                <div className="min-w-0 flex-1">
                                  <div className="flex flex-col xs:flex-row xs:items-center gap-2 xs:gap-3">
                                    <h4 className="text-base sm:text-lg font-semibold capitalize truncate">{format}</h4>
                                    <Badge className={`glass-effect border ${formatBadges[format].color} hover:scale-105 transition-transform duration-300 text-xs w-fit`}>
                                      {formatBadges[format].text}
                                    </Badge>
                                  </div>
                                  <p className="text-xs sm:text-sm text-muted-foreground flex items-center mt-1">
                                    <Clock className="w-3 h-3 mr-1" />
                                    {formatDelivery[format]}
                                  </p>
                                </div>
                              </div>
                              <div className="text-left sm:text-right">
                                <div className="text-xl sm:text-2xl font-bold text-foreground">
                                  {book.currency} {book.formats[format].price}
                                </div>
                              </div>
                            </div>
                            
                            {/* Enhanced Features - Mobile Responsive */}
                            <div className="mt-3 sm:mt-4 grid grid-cols-1 xs:grid-cols-2 gap-2">
                              {book.formats[format].features.map((feature, featureIndex) => (
                                <div 
                                  key={feature} 
                                  className="flex items-center space-x-2 text-xs sm:text-sm group hover:scale-105 transition-transform duration-300"
                                  style={{ transitionDelay: `${featureIndex * 50}ms` }}
                                >
                                  <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                                  <span className="text-foreground/80 truncate">{feature}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Enhanced Glass CTA Section - Mobile Responsive */}
                    <div className="glass-effect rounded-2xl p-4 sm:p-6 md:p-8 border border-white/20 backdrop-blur-sm shadow-2xl hover:shadow-3xl transition-all duration-500">
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 lg:gap-0">
                        <div className="flex-1">
                          <h4 className="text-lg sm:text-xl font-semibold mb-2 flex items-center group">
                            <Award className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-green-500 group-hover:scale-110 transition-transform duration-300" />
                            Ready to Begin Your Journey?
                          </h4>
                          <p className="text-sm sm:text-base text-muted-foreground">Join thousands of readers who have transformed their perspective</p>
                        </div>
                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
                          <div className="text-center sm:text-right">
                            <div className="text-xl sm:text-2xl font-bold text-foreground">
                              {book.currency} {book.formats[activeFormat].price}
                            </div>
                            <div className="text-xs sm:text-sm text-muted-foreground flex items-center justify-center sm:justify-end">
                              <Clock className="w-3 h-3 mr-1" />
                              {formatDelivery[activeFormat]}
                            </div>
                          </div>
                          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                            {/* Enhanced AddToCartButton with proper typing */}
                            <AddToCartButton book={bookWithFormat} />
                            <div className="relative">
                              <Button
                                onClick={handleShare}
                                variant="outline"
                                size="lg"
                                className="glass-effect border border-white/20 hover:scale-105 transition-all duration-300 group w-full sm:w-auto"
                              >
                                <Share2 className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-300" />
                                <span className="hidden xs:inline">Share</span>
                                <span className="xs:hidden">Share</span>
                              </Button>
                              {showShareTooltip && (
                                <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 glass-effect px-3 py-2 rounded-lg text-sm border border-green-400/20 backdrop-blur-sm animate-bounce">
                                  ✅ Link copied!
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Enhanced Preview Tab - Mobile Responsive */}
              {activeTab === 'preview' && (
                <div className="glass-effect rounded-2xl p-6 sm:p-8 md:p-12 border border-white/20 backdrop-blur-sm text-center shadow-lg hover:shadow-xl transition-all duration-500 transform hover:scale-105">
                  <BookOpen className="w-12 h-12 sm:w-16 sm:h-16 text-blue-600 mx-auto mb-3 sm:mb-4 animate-pulse" />
                  <h3 className="text-xl sm:text-2xl font-semibold mb-2">Preview Available</h3>
                  <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6">Read the first chapter and experience the writing style</p>
                  <Button className="glass-effect border border-white-20 hover:scale-105 transition-all duration-300 group w-full sm:w-auto" asChild>
                    <Link href={`/preview/${book.id}`}>
                      <Eye className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-300" />
                      Read Preview
                    </Link>
                  </Button>
                </div>
              )}

              {/* Enhanced Reviews Tab - Mobile Responsive */}
              {activeTab === 'reviews' && (
                <div className="glass-effect rounded-2xl p-6 sm:p-8 md:p-12 border border-white/20 backdrop-blur-sm text-center shadow-lg hover:shadow-xl transition-all duration-500 transform hover:scale-105">
                  <Star className="w-12 h-12 sm:w-16 sm:h-16 text-amber-500 mx-auto mb-3 sm:mb-4 animate-pulse" />
                  <h3 className="text-xl sm:text-2xl font-semibold mb-2">Reader Reviews</h3>
                  <p className="text-sm sm:text-base text-muted-foreground mb-1 sm:mb-2">Rated {book.rating} out of 5 stars</p>
                  <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6">Based on {book.reviews} verified reviews</p>
                  <Button className="glass-effect border border-white/20 hover:scale-105 transition-all duration-300 group w-full sm:w-auto" variant="outline">
                    <PenTool className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-300" />
                    Write a Review
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Enhanced Related Books - Mobile Responsive */}
        {allBooks.filter(b => b.id !== id).length > 0 && (
          <section className={`mt-12 sm:mt-16 md:mt-20 lg:mt-24 transition-all duration-1000 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3 sm:mb-4 font-handwriting bg-gradient-to-r from-slate-900 to-slate-700 dark:from-slate-100 dark:to-slate-300 bg-clip-text text-transparent">
                More from {book.author}
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto px-4">Discover other transformative works from the author's collection</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
              {allBooks.filter(b => b.id !== id).slice(0, 3).map((relatedBook, index) => (
                <div 
                  key={relatedBook.id} 
                  className={`group transition-all duration-500 delay-${index * 150} ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  <div className="glass-effect rounded-xl sm:rounded-2xl border border-white/20 overflow-hidden shadow-lg hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-1 sm:hover:-translate-y-2 backdrop-blur-sm h-full">
                    <Link href={`/book/${relatedBook.id}`}>
                      <div className="relative overflow-hidden">
                        <Image
                          src={relatedBook.coverImage}
                          alt={relatedBook.title}
                          width={300}
                          height={400}
                          className="w-full h-48 sm:h-56 md:h-64 object-cover transform transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                    </Link>
                    
                    <div className="p-4 sm:p-6">
                      <div className="space-y-2 sm:space-y-3">
                        <Badge className="glass-effect border border-white/20 text-xs hover:scale-105 transition-transform duration-300 w-fit">
                          {relatedBook.genre[0]}
                        </Badge>
                        <Link href={`/book/${relatedBook.id}`}>
                          <h3 className="font-semibold text-base sm:text-lg hover:text-blue-600 transition-all duration-300 cursor-pointer line-clamp-2 leading-tight group-hover:scale-105 min-h-[2.5rem] sm:min-h-[3rem]">
                            {relatedBook.title}
                          </h3>
                        </Link>
                        <p className="text-xs sm:text-sm text-muted-foreground flex items-center">
                          <PenTool className="w-3 h-3 mr-1" />
                          by {relatedBook.author}
                        </p>
                        
                        <div className="flex items-center justify-between pt-2">
                          <div className="text-foreground font-bold text-base sm:text-lg">
                            {relatedBook.currency} {relatedBook.formats.ebook.price}
                          </div>
                          <Button size="sm" className="glass-effect border border-white/20 hover:scale-110 transition-all duration-300 group" asChild>
                            <Link href={`/book/${relatedBook.id}`}>
                              <Eye className="w-3 h-3 mr-1 group-hover:scale-110 transition-transform duration-300" />
                              <span className="hidden xs:inline">Explore</span>
                              <span className="xs:hidden">View</span>
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Footer Component */}
      <Footer />

      {/* Enhanced CSS Animations */}
      <style jsx>{`
        .glass-effect {
          background: rgba(255, 255, 255, 0.25);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
        }
        .dark .glass-effect {
          background: rgba(15, 23, 42, 0.25);
        }
        
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        .animate-float-slow {
          animation: float-slow 3s ease-in-out infinite;
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 6s ease infinite;
        }
        
        .shadow-3xl {
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        }
        
        .hover\\:shadow-3xl:hover {
          box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.3);
        }

        /* Mobile-first responsive design */
        @media (max-width: 640px) {
          .container {
            padding-left: 1rem;
            padding-right: 1rem;
          }
        }

        @media (max-width: 480px) {
          .text-2xl {
            font-size: 1.5rem;
            line-height: 2rem;
          }
        }
      `}</style>
    </div>
  );
}