"use client";

import { allBooks } from '@/lib/data/book';
import Image from 'next/image';
import Link from 'next/link';

// Check if your header and footer are named exports
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

// If the above doesn't work, try these alternatives:
// import Header from '@/components/layout/header';
// import Footer from '@/components/layout/footer';
// or
// import { MainHeader as Header } from '@/components/header';
// import { MainFooter as Footer } from '@/components/footer';

export default function BooksPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Simple Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 font-handwriting">
            My Books
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto font-body text-lg">
            Click on any book cover to explore the details and begin your reading journey
          </p>
        </div>

        {/* Books Grid - Simple & Clean */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 md:gap-8">
          {allBooks.map((book) => (
            <div key={book.id} className="group text-center">
              <Link href={`/book/${book.id}`}>
                <div className="relative mb-4 cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                  <Image
                    src={book.coverImage}
                    alt={book.title}
                    width={200}
                    height={300}
                    className="w-full h-auto rounded-lg shadow-lg border-2 border-gray-200 dark:border-gray-700 group-hover:border-blue-500 transition-colors"
                  />
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 rounded-lg transition-all duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="bg-white dark:bg-gray-800 rounded-full p-2 shadow-lg">
                        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
              
              {/* Book Title */}
              <Link href={`/book/${book.id}`}>
                <h3 className="font-semibold text-foreground hover:text-blue-600 transition-colors cursor-pointer line-clamp-2 text-sm md:text-base font-body">
                  {book.title}
                </h3>
              </Link>
              
              {/* Author */}
              <p className="text-muted-foreground text-xs md:text-sm mt-1 font-body">
                by Hitesh Sharma
              </p>
            </div>
          ))}
        </div>

        {/* Simple Footer Note */}
        <div className="text-center mt-16 border-t border-gray-200 dark:border-gray-800 pt-8">
          <p className="text-muted-foreground font-body">
            Each book is a journey. Thank you for being part of mine.
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}