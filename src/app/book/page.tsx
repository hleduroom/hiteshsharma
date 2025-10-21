import { mainBook, relatedBooks } from '@/lib/data/books';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, BookOpen, ArrowRight, Share2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { AddToCartButton } from '@/components/ui/add-to-cart-button';

export default function BookPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground">Home</Link>
            <span>/</span>
            <span className="text-foreground">Book</span>
          </div>
        </nav>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Book Cover */}
          <div className="flex justify-center">
            <div className="relative group">
              <div className="relative w-80 h-96 rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src={mainBook.coverImage}
                  alt={mainBook.title}
                  width={320}
                  height={384}
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="absolute -top-3 -right-3">
                <Badge className="bg-red-600 text-white px-3 py-1 text-sm font-semibold">
                  Bestseller
                </Badge>
              </div>
            </div>
          </div>

          {/* Book Details */}
          <div className="space-y-6">
            <div>
              <Badge variant="secondary" className="mb-4">
                {mainBook.genre[0]}
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground font-shooting-star mb-4">
                {mainBook.title}
              </h1>
              <p className="text-xl text-muted-foreground mb-2">by {mainBook.author}</p>
              
              {/* Rating */}
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(mainBook.rating)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  {mainBook.rating} ({mainBook.reviews} reviews)
                </span>
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold mb-2">About the Book</h3>
              <p className="text-muted-foreground leading-relaxed">
                {mainBook.description}
              </p>
            </div>

            {/* Book Details */}
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-semibold">Pages:</span> {mainBook.pages}
              </div>
              <div>
                <span className="font-semibold">Language:</span> {mainBook.language}
              </div>
              <div>
                <span className="font-semibold">Publisher:</span> {mainBook.publisher}
              </div>
              <div>
                <span className="font-semibold">ISBN:</span> {mainBook.isbn}
              </div>
            </div>

            {/* Price & CTA */}
            <div className="space-y-4">
              <div className="flex items-baseline space-x-2">
                <span className="text-3xl font-bold text-foreground">
                  Starting at {mainBook.currency} {mainBook.formats.ebook.price}
                </span>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <AddToCartButton book={mainBook} />
                <Button
                  variant="outline"
                  size="lg"
                  className="flex-1"
                  asChild
                >
                  <Link href={`/preview/${mainBook.id}`}>
                    <BookOpen className="w-4 h-4 mr-2" />
                    Read Preview
                  </Link>
                </Button>
                <Button variant="ghost" size="icon" className="shrink-0">
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Features */}
            <div className="bg-muted/50 rounded-lg p-4">
              <h4 className="font-semibold mb-2">What you'll get:</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center">
                  <BookOpen className="w-4 h-4 mr-2 text-green-600" />
                  Complete eBook in PDF format
                </li>
                <li className="flex items-center">
                  <BookOpen className="w-4 h-4 mr-2 text-green-600" />
                  Lifetime access to updates
                </li>
                <li className="flex items-center">
                  <BookOpen className="w-4 h-4 mr-2 text-green-600" />
                  Mobile-friendly format
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Related Books */}
        <section className="mt-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">Related Books</h2>
            <Button variant="ghost" asChild>
              <Link href="/books">
                View All
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedBooks.map((book) => (
              <div key={book.id} className="bg-card rounded-lg border shadow-sm hover:shadow-md transition-shadow">
                <div className="p-4">
                  <Image
                    src={book.coverImage}
                    alt={book.title}
                    width={200}
                    height={300}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                  <h3 className="font-semibold mb-2">{book.title}</h3>
                  <p className="text-sm text-muted-foreground mb-2">by {book.author}</p>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-foreground">
                      {book.currency} {book.formats.ebook.price}
                    </span>
                    <Button size="sm" asChild>
                      <Link href={`/book/${book.id}`}>
                        View Details
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}