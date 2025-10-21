'use client';

import { allBooks, type Book } from '@/lib/data/book';
import { notFound } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
// NOTE: Assuming this component's type definition is fixed (see explanation below)
import { AddToCartButton } from '@/components/ui/add-to-cart-button'; 
import { Star, Eye, ShoppingCart, Share2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Header } from "@/components/header";
import { useCart } from '@/lib/context/CartContext';

interface BookDetailsPageProps {
  params: Promise<{ id: string }>;
}

export default async function BookDetailsPage({ params }: BookDetailsPageProps) {
  const { id } = await params;
  const book = allBooks.find((b) => b.id === id);
  if (!book) notFound();

  const { dispatch } = useCart();
  const [selectedFormat, setSelectedFormat] = useState<'ebook' | 'paperback' | 'hardcover'>('ebook');

  const handleBuyNow = () => {
  dispatch({
    type: 'ADD_TO_CART',
    payload: {
      id: book.id,
      title: book.title,
      price: book.formats[selectedFormat].price,
      currency: book.currency,
      quantity: 1,
      format: selectedFormat,
      coverImage: book.coverImage,
    },
  });
  window.location.href = '/checkout';
};

  const relatedBooks = allBooks.filter(
    (b) => b.id !== id && b.genre.some((g) => book.genre.includes(g))
  );

  // --- FIX APPLIED HERE ---
  // We explicitly construct the cart item object to ensure it has all required properties 
  // (like price and format) that the AddToCartButton component expects.
  const cartItemPayload = {
    id: book.id,
    title: book.title,
    price: book.formats[selectedFormat].price,
    currency: book.currency,
    quantity: 1,
    format: selectedFormat,
    coverImage: book.coverImage,
    // Note: The original attempt was to pass '{ ...book, bookFormat: selectedFormat }'. 
    // This was wrong because `...book` does not contain the dynamic `price` and 
    // the `AddToCartButton` likely expects a structured object.
  };
  // --- END FIX ---


  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <Image
          src={book.coverImage}
          alt={book.title}
          fill
          priority
          className="object-cover opacity-30 blur-xl scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-white/60 to-white dark:from-slate-950/70 dark:via-slate-900/60 dark:to-slate-900/80 backdrop-blur-md" />
      </div>

      {/* Header */}
      <Header />

      <div className="container mx-auto px-4 py-16">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="flex flex-col lg:flex-row items-center gap-12"
        >
          {/* Cover Image */}
          <div className="relative w-full lg:w-1/2 flex justify-center">
            <div className="relative w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl border border-white/20 backdrop-blur-md group">
              <Image
                src={book.coverImage}
                alt={book.title}
                width={600}
                height={800}
                className="object-cover w-full h-[70vh] sm:h-[80vh] rounded-3xl transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </div>

          {/* Info Section */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full lg:w-1/2 backdrop-blur-xl bg-white/60 dark:bg-slate-800/40 border border-white/20 rounded-3xl shadow-lg p-6 md:p-8 space-y-6"
          >
            <HeaderSection book={book} />

            {/* Format Selector */}
            <div className="space-y-3">
              <h3 className="text-base font-semibold">Choose Format</h3>
              <div className="flex gap-2 flex-wrap">
                {(['ebook', 'paperback', 'hardcover'] as const).map((format) => (
                  <Button
                    key={format}
                    onClick={() => setSelectedFormat(format)}
                    variant={selectedFormat === format ? 'default' : 'outline'}
                    className={`capitalize text-xs sm:text-sm rounded-xl ${
                      selectedFormat === format ? 'bg-blue-500 text-white' : ''
                    }`}
                  >
                    {format}
                  </Button>
                ))}
              </div>
              <div className="p-4 rounded-2xl bg-white/60 dark:bg-slate-800/30 border border-white/20 shadow-sm">
                <h4 className="font-semibold capitalize text-sm mb-1">{selectedFormat}</h4>
                <p className="text-lg font-bold mb-2">
                  {book.currency} {book.formats[selectedFormat].price.toFixed(2)}
                </p>
                <ul className="text-xs text-muted-foreground list-disc pl-5 space-y-1">
                  {book.formats[selectedFormat].features.map((feature, i) => (
                    <li key={i}>{feature}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mt-4">
              <Button
                size="lg"
                className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold shadow-md hover:shadow-xl transition-all rounded-xl px-6 py-3"
                onClick={handleBuyNow}
              >
                <ShoppingCart className="w-4 h-4" />
                Buy Now
              </Button>

              {/* APPLYING THE FIX HERE: Pass the explicit cart item payload */}
              <AddToCartButton book={cartItemPayload} />

              <Button asChild variant="outline" size="lg" className="flex-1 border-sky-300/60 hover:bg-sky-100/30 rounded-xl text-xs sm:text-sm">
                <Link href={`/preview/${book.id}`}>
                  <Eye className="w-4 h-4 mr-2" />
                  Read Preview
                </Link>
              </Button>
            </div>

            <ShareButton title={book.title} id={book.id} />
          </motion.div>
        </motion.div>

        {/* Related Books */}
        {relatedBooks.length > 0 && <RelatedBooksSection relatedBooks={relatedBooks} />}
      </div>
    </div>
  );
}

/* ---------------- HEADER SECTION ---------------- */
function HeaderSection({ book }: { book: Book }) {
  return (
    <>
      <div>
        <Badge variant="secondary" className="mb-2 text-xs">{book.genre[0]}</Badge>
        <h1 className="text-3xl font-bold mb-1">{book.title}</h1>
        <p className="text-base text-muted-foreground mb-2">by {book.author}</p>

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
          <span className="text-xs text-muted-foreground">
            {book.rating} ({book.reviews} reviews)
          </span>
        </div>
      </div>

      <div>
        <h3 className="text-base font-semibold mb-1">About the Book</h3>
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-5">
          {book.description}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 text-xs sm:text-sm">
        <div><strong>Pages:</strong> {book.pages}</div>
        <div><strong>Language:</strong> {book.language}</div>
        <div><strong>Publisher:</strong> {book.publisher}</div>
        <div><strong>ISBN:</strong> {book.isbn}</div>
        <div><strong>Published:</strong> {new Date(book.publishedDate).toLocaleDateString()}</div>
        <div><strong>Genre:</strong> {book.genre.join(', ')}</div>
      </div>
    </>
  );
}

/* ---------------- SHARE BUTTON ---------------- */
function ShareButton({ title, id }: { title: string; id: string }) {
  const [copied, setCopied] = useState(false);
  // Safely get window.location.origin
  const link = typeof window !== 'undefined' ? `${window.location.origin}/book/${id}` : '';

  const handleShare = async () => {
    const text = `📚 Check out "${title}" – an amazing read! → ${link}`;
    if (navigator.share) {
      await navigator.share({ title, text, url: link });
    } else {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <motion.div whileHover={{ scale: 1.05 }} className="pt-2 flex justify-start">
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

/* ---------------- RELATED BOOKS ---------------- */
function RelatedBooksSection({ relatedBooks }: { relatedBooks: Book[] }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mt-20"
    >
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl font-bold">You Might Also Like</h2>
        <Button variant="ghost" asChild>
          <Link href="/books">View All</Link>
        </Button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {relatedBooks.map((relatedBook) => (
          <motion.div
            key={relatedBook.id}
            whileHover={{ scale: 1.03 }}
            className="bg-white/60 dark:bg-slate-800/40 rounded-2xl border border-white/20 shadow-md hover:shadow-lg transition overflow-hidden"
          >
            <div className="p-4">
              <Image
                src={relatedBook.coverImage}
                alt={relatedBook.title}
                width={200}
                height={300}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="font-semibold text-sm mb-1">{relatedBook.title}</h3>
              <p className="text-xs text-muted-foreground mb-2">by {relatedBook.author}</p>
              <div className="flex items-center justify-between">
                <span className="font-bold text-foreground text-sm">
                  {relatedBook.currency} {relatedBook.formats.ebook.price}
                </span>
                <Button size="sm" asChild>
                  <Link href={`/book/${relatedBook.id}`}>View</Link>
                </Button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
