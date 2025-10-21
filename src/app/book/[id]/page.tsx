import { allBooks, type Book } from '@/lib/data/book';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, BookOpen, Download, Eye, Share2, CheckCircle, Package, Layers } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { AddToCartButton } from '@/components/ui/add-to-cart-button';
import { cn } from '@/lib/utils'; // Assuming you have a utility for class names

// --- Helper Components for professional aesthetic ---

// Glassmorphism Card Wrapper
const GlassCard = ({ className, children }) => (
  <div
    className={cn(
      'p-6 rounded-3xl backdrop-blur-md bg-white/10 dark:bg-black/10 shadow-xl border border-white/20 dark:border-white/5 transition-all duration-300 hover:shadow-2xl',
      className
    )}
  >
    {children}
  </div>
);

// Format Card Component
const FormatCard = ({ format, price, features, currency, icon: Icon }) => (
  <GlassCard className="flex flex-col items-start space-y-4 h-full transform hover:scale-[1.02] transition-transform duration-300 cursor-pointer">
    <div className="flex items-center space-x-3 text-white dark:text-cyan-300">
      <Icon className="w-6 h-6" />
      <h4 className="text-xl font-semibold">{format}</h4>
    </div>
    <p className="text-3xl font-bold text-foreground">
      {currency} {price.toFixed(2)}
    </p>
    <ul className="text-sm space-y-2 text-muted-foreground flex-grow">
      {features.slice(0, 3).map((feature, index) => (
        <li key={index} className="flex items-start">
          <CheckCircle className="w-4 h-4 mr-2 mt-0.5 text-green-500 flex-shrink-0" />
          <span>{feature}</span>
        </li>
      ))}
    </ul>
    <Button variant="default" className="w-full mt-auto">
      Select {format}
    </Button>
  </GlassCard>
);

// --- Main Component ---

interface BookDetailsPageProps {
  params: {
    id: string;
  };
}

export default async function BookDetailsPage({ params }: BookDetailsPageProps) {
  const { id } = params;
  const book: Book | undefined = allBooks.find(b => b.id === id);

  if (!book) {
    notFound();
  }

  // Cute & Simple Share Logic (simulated)
  const bookLink = `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/book/${book.id}`;
  const shareMessage = `📖 Just discovered "${book.title}" by ${book.author} and it looks incredible! Check it out here: ${bookLink} #MustRead`;

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: book.title,
        text: shareMessage,
        url: bookLink,
      })
      .catch(console.error);
    } else {
      // Fallback for browsers without native share API
      alert(`Share message copied!\n\n${shareMessage}`);
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900 py-16">
      <div className="container mx-auto px-4">
        {/* Professional Breadcrumb */}
        <nav className="mb-12">
          <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
            <Link href="/" className="hover:text-primary dark:hover:text-cyan-300 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/books" className="hover:text-primary dark:hover:text-cyan-300 transition-colors">Books Collection</Link>
            <span>/</span>
            <span className="text-foreground font-medium">{book.title}</span>
          </div>
        </nav>

        {/* Main Content: Glassmorphism Effect */}
        <GlassCard className="p-8 md:p-12">
          <div className="grid lg:grid-cols-3 xl:grid-cols-4 gap-12 items-start">
            {/* Column 1: Book Cover & Preview */}
            <div className="lg:col-span-1 flex flex-col items-center space-y-6">
              <div className="relative group w-64 h-80 md:w-80 md:h-96">
                {/* Cute Simple Animation on Cover */}
                <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl transition-all duration-500 ease-in-out group-hover:shadow-3xl group-hover:scale-[1.02]">
                  <Image
                    src={book.coverImage}
                    alt={book.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Preview & Share Buttons */}
              <div className="flex flex-col space-y-3 w-full max-w-sm">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full text-lg shadow-md hover:shadow-lg transition-shadow"
                  asChild
                >
                  <Link href={`/preview/${book.id}`}>
                    <Eye className="w-5 h-5 mr-2" />
                    Read Sample Preview
                  </Link>
                </Button>

                {/* Beautiful Share Button */}
                <Button
                  variant="ghost"
                  size="lg"
                  className="w-full text-lg text-primary dark:text-cyan-300 hover:bg-white/10 dark:hover:bg-black/20"
                  onClick={handleShare}
                >
                  <Share2 className="w-5 h-5 mr-2" />
                  Share This Book
                </Button>
              </div>
            </div>

            {/* Column 2: Details & Description */}
            <div className="lg:col-span-2 xl:col-span-3 space-y-8">
              <div>
                <Badge variant="secondary" className="mb-4 text-sm px-3 py-1 bg-cyan-600/20 text-cyan-500">
                  {book.genre.join(' / ')}
                </Badge>
                <h1 className="text-4xl md:text-6xl font-extrabold text-foreground mb-3 leading-tight">
                  {book.title}
                </h1>
                <p className="text-xl text-muted-foreground/80 font-medium italic">by {book.author}</p>

                {/* Rating & Review */}
                <div className="flex items-center space-x-3 my-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 transition-colors duration-200 ${
                          i < Math.floor(book.rating)
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-400 dark:text-gray-600'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground/90 font-semibold">
                    {book.rating.toFixed(1)}/5.0 ({book.reviews} Ratings)
                  </span>
                </div>
              </div>

              {/* Description */}
              <div className="max-w-3xl">
                <h3 className="text-2xl font-bold mb-3 border-b pb-2 border-primary/20">Summary</h3>
                <p className="text-lg text-muted-foreground leading-relaxed italic">
                  {book.description}
                </p>
              </div>

              {/* Professional Metadata */}
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-6 text-sm">
                {[
                  { label: 'Pages', value: book.pages, icon: BookOpen },
                  { label: 'Language', value: book.language, icon: Layers },
                  { label: 'Publisher', value: book.publisher, icon: Package },
                  { label: 'ISBN', value: book.isbn, icon: BookOpen },
                  { label: 'Published', value: new Date(book.publishedDate).toLocaleDateString(), icon: Layers },
                  { label: 'Genre', value: book.genre.join(', '), icon: Package },
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <item.icon className="w-4 h-4 text-primary dark:text-cyan-400 flex-shrink-0" />
                    <span className="font-semibold">{item.label}:</span>
                    <span className="text-muted-foreground truncate">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </GlassCard>

        {/* --- Format & Pricing Section (Professional Layout) --- */}
        <section className="mt-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-10 text-foreground">
            Choose Your Format
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Ebook Format */}
            <FormatCard
              format="Ebook (Digital)"
              price={book.formats.ebook.price}
              features={book.formats.ebook.features}
              currency={book.currency}
              icon={Download}
            />

            {/* Paperback Format */}
            <FormatCard
              format="Paperback (Print)"
              price={book.formats.paperback.price}
              features={book.formats.paperback.features}
              currency={book.currency}
              icon={BookOpen}
            />

            {/* Hardcover Format */}
            <FormatCard
              format="Hardcover (Premium)"
              price={book.formats.hardcover.price}
              features={book.formats.hardcover.features}
              currency={book.currency}
              icon={Package}
            />
          </div>
          
          {/* Centralized Add To Cart & Download */}
          <div className="flex justify-center mt-12 space-x-6">
            <AddToCartButton book={book} />
            <Button
              variant="secondary"
              size="lg"
              asChild
              className="text-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <Link href={book.fullPdf ? `/download/${book.id}` : '#'} onClick={(e) => {if (!book.fullPdf) e.preventDefault();}}>
                <Download className="w-5 h-5 mr-2" />
                Buy & Get Instant Ebook
              </Link>
            </Button>
          </div>
        </section>

        {/* You Might Also Like Section (Optional based on data) */}
        {/* Placeholder for related books functionality from original code, kept simple */}
        {/*
        {relatedBooks.length > 0 && (
          <section className="mt-20">
            <h2 className="text-2xl font-bold mb-8 text-center">You Might Also Like</h2>
            {/* ... related books grid ... }
          </section>
        )}
        */}

      </div>
    </div>
  );
}
