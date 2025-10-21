import { bookData, relatedBooks, type Book } from '@/lib/data/book';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, BookOpen, ShoppingCart, Download, Eye } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { AddToCartButton } from '@/components/ui/add-to-cart-button';

interface BookDetailsPageProps {
  params: {
    id: string;
  };
}

export default function BookDetailsPage({ params }: BookDetailsPageProps) {
  const book = params.id === bookData.id ? bookData : 
    relatedBooks.find(b => b.id === params.id);

  if (!book) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground">Home</Link>
            <span>/</span>
            <Link href="/book" className="hover:text-foreground">Book</Link>
            <span>/</span>
            <span className="text-foreground">{book.title}</span>
          </div>
        </nav>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Book Cover */}
          <div className="flex justify-center">
            <div className="relative group">
              <div className="relative w-80 h-96 rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src={book.coverImage}
                  alt={book.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            </div>
          </div>

          {/* Book Details */}
          <div className="space-y-6">
            <div>
              <Badge variant="secondary" className="mb-4">
                {book.genre[0]}
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground font-shooting-star mb-4">
                {book.title}
              </h1>
              <p className="text-xl text-muted-foreground mb-2">by {book.author}</p>
              
              {/* Rating */}
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex items-center">
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
                </div>
                <span className="text-sm text-muted-foreground">
                  {book.rating} ({book.reviews} reviews)
                </span>
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold mb-2">About the Book</h3>
              <p className="text-muted-foreground leading-relaxed">
                {book.description}
              </p>
            </div>

            {/* Book Details */}
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-semibold">Pages:</span> {book.pages}
              </div>
              <div>
                <span className="font-semibold">Language:</span> {book.language}
              </div>
              <div>
                <span className="font-semibold">Publisher:</span> {book.publisher}
              </div>
              <div>
                <span className="font-semibold">ISBN:</span> {book.isbn}
              </div>
              <div>
                <span className="font-semibold">Published:</span> {new Date(book.publishedDate).toLocaleDateString()}
              </div>
              <div>
                <span className="font-semibold">Genre:</span> {book.genre.join(', ')}
              </div>
            </div>

            {/* Price & CTA */}
            <div className="space-y-4">
              <div className="flex items-baseline space-x-2">
                <span className="text-3xl font-bold text-foreground">
                  {book.currency} {book.price}
                </span>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <AddToCartButton book={book} />
                <Button
                  variant="outline"
                  size="lg"
                  className="flex-1"
                  asChild
                >
                  <Link href={`/preview/${book.id}`}>
                    <Eye className="w-4 h-4 mr-2" />
                    Read Preview
                  </Link>
                </Button>
              </div>

              <div className="flex gap-4">
                <Button
                  variant="ghost"
                  size="sm"
                  asChild
                >
                  <Link href={`/ebook/${book.id}`} className="flex items-center">
                    <Download className="w-4 h-4 mr-2" />
                    Download E-book
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}