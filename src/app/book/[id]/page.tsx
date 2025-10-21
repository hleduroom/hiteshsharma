"use client";

import { useState, useEffect } from 'react';
import { allBooks, type Book } from '@/lib/data/book';
import { notFound, useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, BookOpen, Download, Eye, Share2, Clock, CheckCircle, Sparkles, Zap, Bookmark, Users, Award, Shield, FileText } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { AddToCartButton } from '@/components/ui/add-to-cart-button';

export default function BookDetailsPage() {
  const params = useParams();
  const id = params.id as string;
  
  const [activeFormat, setActiveFormat] = useState<'ebook' | 'paperback' | 'hardcover'>('ebook');
  const [isLoading, setIsLoading] = useState(true);
  const [showShareTooltip, setShowShareTooltip] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'preview' | 'reviews'>('overview');

  // Find the book
  const book = allBooks.find(b => b.id === id);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
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
            <div className="w-20 h-20 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <BookOpen className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          <div>
            <p className="text-lg font-semibold text-foreground mb-2">Loading Masterpiece</p>
            <p className="text-sm text-muted-foreground">Preparing your reading experience...</p>
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
    { label: "Pages", value: book.pages, icon: "📄" },
    { label: "Language", value: book.language, icon: "🌐" },
    { label: "Publisher", value: book.publisher, icon: "🏢" },
    { label: "ISBN", value: book.isbn, icon: "🔖" },
    { label: "Published", value: new Date(book.publishedDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }), icon: "📅" },
    { label: "Genre", value: book.genre.join(' • '), icon: "🏷️" }
  ];

  const formatIcons = {
    ebook: "📱",
    paperback: "📖", 
    hardcover: "🏆"
  };

  const formatDelivery = {
    ebook: "Instant Access",
    paperback: "2-3 Business Days",
    hardcover: "2-3 Business Days"
  };

  const formatBadges = {
    ebook: "Most Popular",
    paperback: "Reader's Choice",
    hardcover: "Collector's Edition"
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-blue-950/20">
      {/* Glass Header */}
      <div className="sticky top-0 z-50 border-b border-white/20 dark:border-slate-800/50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl supports-backdrop-blur:bg-white/60">
        <div className="container mx-auto px-6 py-4">
          <nav className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <Link href="/" className="group">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
                    <BookOpen className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-xl font-semibold text-foreground font-handwriting bg-gradient-to-r from-slate-900 to-slate-700 dark:from-slate-100 dark:to-slate-300 bg-clip-text text-transparent">
                    {book.author.split(' ')[0]}
                  </span>
                </div>
              </Link>
              <div className="hidden md:flex items-center space-x-6 text-sm">
                <Link href="/books" className="text-muted-foreground hover:text-foreground transition-colors duration-200 font-medium">Library</Link>
                <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors duration-200 font-medium">Author</Link>
                <Link href="/blog" className="text-muted-foreground hover:text-foreground transition-colors duration-200 font-medium">Insights</Link>
              </div>
            </div>
            <Button variant="ghost" size="sm" className="glass-effect border border-white/20">
              <Bookmark className="w-4 h-4 mr-2" />
              Save
            </Button>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        {/* Glass Breadcrumb */}
        <nav className="mb-12">
          <div className="glass-effect rounded-2xl px-6 py-4 border border-white/20 shadow-sm">
            <div className="flex items-center space-x-3 text-sm text-muted-foreground">
              <Link href="/" className="hover:text-foreground transition-colors duration-200 font-medium">Home</Link>
              <div className="w-1 h-1 bg-muted-foreground/30 rounded-full"></div>
              <Link href="/books" className="hover:text-foreground transition-colors duration-200 font-medium">Books</Link>
              <div className="w-1 h-1 bg-muted-foreground/30 rounded-full"></div>
              <span className="text-foreground font-semibold truncate max-w-xs">{book.title}</span>
            </div>
          </div>
        </nav>

        <div className="grid xl:grid-cols-3 gap-16 items-start">
          {/* Book Cover with Glass Effect */}
          <div className="xl:col-span-1 flex justify-center">
            <div className="relative group">
              <div className="glass-effect rounded-3xl p-8 border border-white/20 shadow-2xl backdrop-blur-sm">
                <Image
                  src={book.coverImage}
                  alt={book.title}
                  width={400}
                  height={500}
                  className="w-full h-auto rounded-2xl shadow-2xl transform transition-all duration-700 group-hover:scale-105"
                  priority
                />
              </div>
              
              {/* Glass Badges */}
              <div className="absolute -top-4 -left-4">
                <div className="glass-effect px-4 py-2 rounded-full text-sm font-semibold shadow-xl border border-amber-400/20 backdrop-blur-sm">
                  🏆 Bestseller
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4">
                <div className="glass-effect px-4 py-2 rounded-full text-sm font-semibold shadow-xl border border-emerald-400/20 backdrop-blur-sm">
                  ⭐ {book.rating}/5
                </div>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="xl:col-span-2 space-y-8">
            {/* Header Section */}
            <div className="space-y-6">
              <div className="glass-effect rounded-2xl p-8 border border-white/20 backdrop-blur-sm">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Badge className="glass-effect border border-blue-400/20 text-blue-700 dark:text-blue-300 px-3 py-1.5">
                      {book.genre[0]}
                    </Badge>
                    <div className="flex items-center space-x-1 text-amber-500">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="text-sm font-semibold">{book.rating}</span>
                      <span className="text-sm text-muted-foreground">({book.reviews} reviews)</span>
                    </div>
                  </div>
                  
                  <h1 className="text-5xl lg:text-6xl font-bold leading-tight font-handwriting bg-gradient-to-r from-slate-900 via-blue-900 to-purple-900 dark:from-slate-100 dark:via-blue-100 dark:to-purple-100 bg-clip-text text-transparent">
                    {book.title}
                  </h1>
                  
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-slate-600 to-slate-800 rounded-full flex items-center justify-center shadow-lg">
                        <span className="text-white text-sm font-semibold">
                          {book.author.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <p className="text-lg text-muted-foreground">by</p>
                        <p className="text-xl font-semibold text-foreground">{book.author}</p>
                      </div>
                    </div>
                    <div className="h-8 w-px bg-border/50"></div>
                    <div className="flex items-center space-x-2 text-muted-foreground">
                      <Users className="w-4 h-4" />
                      <span className="text-sm">Join {Math.floor(book.reviews * 2.5)}+ readers</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Glass Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {stats.map((stat, index) => (
                  <div key={stat.label} className="glass-effect rounded-xl p-4 border border-white/20 backdrop-blur-sm">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{stat.icon}</span>
                      <div>
                        <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
                        <p className="text-foreground font-semibold">{stat.value}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Glass Navigation Tabs */}
            <div className="glass-effect rounded-2xl p-2 border border-white/20 backdrop-blur-sm">
              <nav className="flex space-x-2">
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
                      className={`flex items-center space-x-2 px-6 py-3 rounded-xl transition-all duration-200 flex-1 text-center justify-center ${
                        activeTab === tab.id
                          ? 'bg-white/80 dark:bg-slate-800/80 shadow-sm text-blue-600'
                          : 'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="font-medium">{tab.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Tab Content */}
            <div className="space-y-8">
              {/* Overview Tab */}
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  <div className="glass-effect rounded-2xl p-8 border border-white/20 backdrop-blur-sm">
                    <div className="prose prose-lg dark:prose-invert max-w-none">
                      <h3 className="flex items-center text-2xl font-semibold mb-4">
                        <Sparkles className="w-6 h-6 mr-3 text-blue-500" />
                        About This Masterpiece
                      </h3>
                      <p className="text-xl leading-relaxed text-foreground/90">
                        {book.description}
                      </p>
                    </div>
                  </div>

                  {/* Format Selection */}
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-2xl font-semibold text-foreground">Choose Your Edition</h3>
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <Shield className="w-4 h-4" />
                        <span>Secure Payment • 30-Day Guarantee</span>
                      </div>
                    </div>

                    <div className="grid gap-4">
                      {(['ebook', 'paperback', 'hardcover'] as const).map((format) => (
                        <div
                          key={format}
                          onClick={() => setActiveFormat(format)}
                          className={`glass-effect rounded-2xl p-6 border-2 cursor-pointer transition-all duration-300 transform hover:scale-[1.02] backdrop-blur-sm ${
                            activeFormat === format
                              ? 'border-blue-500/50 bg-blue-50/50 dark:bg-blue-900/20 shadow-lg'
                              : 'border-white/20 hover:border-blue-300/50'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <div className="text-3xl">{formatIcons[format]}</div>
                              <div>
                                <div className="flex items-center space-x-3">
                                  <h4 className="text-lg font-semibold capitalize">{format}</h4>
                                  <Badge className="glass-effect border border-amber-400/20 text-amber-700 dark:text-amber-300">
                                    {formatBadges[format]}
                                  </Badge>
                                </div>
                                <p className="text-sm text-muted-foreground">{formatDelivery[format]}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-2xl font-bold text-foreground">
                                {book.currency} {book.formats[format].price}
                              </div>
                            </div>
                          </div>
                          
                          {/* Features */}
                          <div className="mt-4 grid grid-cols-2 gap-2">
                            {book.formats[format].features.map((feature, index) => (
                              <div key={feature} className="flex items-center space-x-2 text-sm">
                                <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                                <span className="text-foreground/80">{feature}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Glass CTA Section */}
                    <div className="glass-effect rounded-2xl p-8 border border-white/20 backdrop-blur-sm">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-xl font-semibold mb-2">Ready to Begin Your Journey?</h4>
                          <p className="text-muted-foreground">Join thousands of readers who have transformed their perspective</p>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="text-right">
                            <div className="text-2xl font-bold text-foreground">
                              {book.currency} {book.formats[activeFormat].price}
                            </div>
                            <div className="text-sm text-muted-foreground">{formatDelivery[activeFormat]}</div>
                          </div>
                          <AddToCartButton book={{ ...book, bookFormat: activeFormat }} />
                          <Button
                            onClick={handleShare}
                            variant="outline"
                            size="lg"
                            className="glass-effect border border-white/20"
                          >
                            <Share2 className="w-4 h-4 mr-2" />
                            Share
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Preview Tab */}
              {activeTab === 'preview' && (
                <div className="glass-effect rounded-2xl p-12 border border-white/20 backdrop-blur-sm text-center">
                  <BookOpen className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-2xl font-semibold mb-2">Preview Available</h3>
                  <p className="text-muted-foreground mb-6">Read the first chapter and experience the writing style</p>
                  <Button className="glass-effect border border-white/20" asChild>
                    <Link href={`/preview/${book.id}`}>
                      <Eye className="w-4 h-4 mr-2" />
                      Read Preview
                    </Link>
                  </Button>
                </div>
              )}

              {/* Reviews Tab */}
              {activeTab === 'reviews' && (
                <div className="glass-effect rounded-2xl p-12 border border-white/20 backdrop-blur-sm text-center">
                  <Star className="w-16 h-16 text-amber-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-semibold mb-2">Reader Reviews</h3>
                  <p className="text-muted-foreground mb-2">Rated {book.rating} out of 5 stars</p>
                  <p className="text-muted-foreground mb-6">Based on {book.reviews} verified reviews</p>
                  <Button className="glass-effect border border-white/20" variant="outline">
                    Write a Review
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Related Books */}
        {allBooks.filter(b => b.id !== id).length > 0 && (
          <section className="mt-24">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-foreground mb-4 font-handwriting">More from {book.author}</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">Discover other transformative works from the author's collection</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {allBooks.filter(b => b.id !== id).slice(0, 3).map((relatedBook) => (
                <div key={relatedBook.id} className="group">
                  <div className="glass-effect rounded-2xl border border-white/20 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 backdrop-blur-sm">
                    <Link href={`/book/${relatedBook.id}`}>
                      <div className="relative overflow-hidden">
                        <Image
                          src={relatedBook.coverImage}
                          alt={relatedBook.title}
                          width={300}
                          height={400}
                          className="w-full h-64 object-cover transform transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                    </Link>
                    
                    <div className="p-6">
                      <div className="space-y-3">
                        <Badge className="glass-effect border border-white/20 text-xs">
                          {relatedBook.genre[0]}
                        </Badge>
                        <Link href={`/book/${relatedBook.id}`}>
                          <h3 className="font-semibold text-lg hover:text-blue-600 transition-colors cursor-pointer line-clamp-2 leading-tight">
                            {relatedBook.title}
                          </h3>
                        </Link>
                        <p className="text-sm text-muted-foreground">by {relatedBook.author}</p>
                        
                        <div className="flex items-center justify-between pt-2">
                          <div className="text-foreground font-bold text-lg">
                            {relatedBook.currency} {relatedBook.formats.ebook.price}
                          </div>
                          <Button size="sm" className="glass-effect border border-white/20 hover:scale-105 transition-transform">
                            <Link href={`/book/${relatedBook.id}`}>
                              Explore
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

      {/* Glass Footer */}
      <footer className="border-t border-white/20 mt-24">
        <div className="glass-effect backdrop-blur-sm">
          <div className="container mx-auto px-6 py-12">
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
                  <BookOpen className="w-4 h-4 text-white" />
                </div>
                <span className="text-xl font-semibold font-handwriting bg-gradient-to-r from-slate-900 to-slate-700 dark:from-slate-100 dark:to-slate-300 bg-clip-text text-transparent">
                  {book.author}
                </span>
              </div>
              <p className="text-muted-foreground max-w-md mx-auto">
                Transforming perspectives through the power of words and wisdom.
              </p>
              <div className="flex items-center justify-center space-x-6 text-sm text-muted-foreground">
                <span>© 2024 {book.publisher}</span>
                <span>•</span>
                <span>All rights reserved</span>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Glass Effect CSS */}
      <style jsx>{`
        .glass-effect {
          background: rgba(255, 255, 255, 0.25);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
        }
        .dark .glass-effect {
          background: rgba(15, 23, 42, 0.25);
        }
      `}</style>
    </div>
  );
}