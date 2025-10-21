'use client';

import { allBooks, type Book } from '@/lib/data/book';
import { notFound } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AddToCartButton } from '@/components/ui/add-to-cart-button';
import { Star, Eye, ShoppingCart, Share2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState } from 'react';

interface BookDetailsPageProps {
  params: Promise<{ id: string }>;
}

export default async function BookDetailsPage({ params }: BookDetailsPageProps) {
  const { id } = await params;
  const book = allBooks.find((b) => b.id === id);

  if (!book) notFound();

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-slate-50 dark:from-slate-950 dark:to-slate-900 py-12">
      <div className="container mx-auto px-4 space-y-12">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-8">
          <Link href="/" className="hover:text-foreground">Home</Link>
          <span>/</span>
          <Link href="/book" className="hover:text-foreground">Books</Link>
          <span>/</span>
          <span className="text-foreground">{book.title}</span>
        </nav>

        {/* Main Layout */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Book Cover */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center"
          >
            <div className="relative w-80 h-96 rounded-3xl overflow-hidden shadow-2xl backdrop-blur-lg bg-white/30 border border-white/20 group hover:scale-[1.02] transition-all">
              <Image
                src={book.coverImage}
                alt={book.title}
                width={320}
                height={384}
                className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          </motion.div>

          {/* Book Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="backdrop-blur-xl bg-white/50 dark:bg-slate-800/40 border border-white/30 rounded-3xl shadow-xl p-6 space-y-6"
          >
            {/* Header */}
            <div>
              <Badge variant="secondary" className="mb-3">{book.genre[0]}</Badge>
              <h1 className="text-4xl font-bold mb-2">{book.title}</h1>
              <p className="text-lg text-muted-foreground mb-3">by {book.author}</p>

              {/* Rating */}
              <div className="flex items-center gap-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(book.rating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
                <span className="text-sm text-muted-foreground">
                  {book.rating} ({book.reviews} reviews)
                </span>
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold mb-1">About the Book</h3>
              <p className="text-muted-foreground leading-relaxed">{book.description}</p>
            </div>

            {/* Book Details */}
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div><strong>Pages:</strong> {book.pages}</div>
              <div><strong>Language:</strong> {book.language}</div>
              <div><strong>Publisher:</strong> {book.publisher}</div>
              <div><strong>ISBN:</strong> {book.isbn}</div>
              <div><strong>Published:</strong> {new Date(book.publishedDate).toLocaleDateString()}</div>
              <div><strong>Genre:</strong> {book.genre.join(', ')}</div>
            </div>

            {/* Formats */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Available Formats</h3>
              <div className="grid md:grid-cols-3 gap-4">
                {Object.entries(book.formats).map(([format, data]) => (
                  <motion.div
                    key={format}
                    whileHover={{ scale: 1.04 }}
                    transition={{ type: 'spring', stiffness: 200 }}
                    className="p-4 rounded-2xl bg-gradient-to-br from-white/80 to-white/40 dark:from-slate-700/50 dark:to-slate-800/30 border border-white/20 shadow-sm"
                  >
                    <h4 className="font-semibold capitalize mb-1">{format}</h4>
                    <p className="text-xl font-bold mb-2">
                      {book.currency} {data.price.toFixed(2)}
                    </p>
                    <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
                      {data.features.map((feature, i) => (
                        <li key={i}>{feature}</li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              {/* 🛍 Buy Now */}
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                <Button
                  asChild
                  size="lg"
                  className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold shadow-lg hover:shadow-2xl transition-all rounded-xl px-6 py-3"
                >
                  <Link href={`/checkout/${book.id}`}>
                    <ShoppingCart className="w-4 h-4" />
                    Buy Now
                  </Link>
                </Button>
              </motion.div>

              {/* 🧺 Add to Cart */}
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                <AddToCartButton book={book} />
              </motion.div>

              {/* 👁 Preview */}
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                <Button asChild variant="outline" size="lg" className="flex-1 border-sky-300/60 hover:bg-sky-100/30 rounded-xl">
                  <Link href={`/preview/${book.id}`}>
                    <Eye className="w-4 h-4 mr-2" />
                    Read Preview
                  </Link>
                </Button>
              </motion.div>
            </div>

            {/* 🔗 Share */}
            <ShareButton title={book.title} id={book.id} />
          </motion.div>
        </div>
      </div>
    </div>
  );
}

/* ---------------------- SHARE BUTTON ---------------------- */
function ShareButton({ title, id }: { title: string; id: string }) {
  const [copied, setCopied] = useState(false);
  const link =
    typeof window !== 'undefined'
      ? `${window.location.origin}/book/${id}`
      : '';

  const handleShare = async () => {
    const text = `📖 I’m reading "${title}" — it’s amazing! Check it out here: ${link}`;
    if (navigator.share) {
      await navigator.share({ title, text, url: link });
    } else {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="pt-2 flex justify-start"
    >
      <Button
        variant="secondary"
        size="sm"
        onClick={handleShare}
        className="flex items-center gap-2 rounded-xl shadow-sm hover:shadow-md transition"
      >
        <Share2 className="w-4 h-4" />
        {copied ? 'Link Copied!' : 'Share Book'}
      </Button>
    </motion.div>
  );
}