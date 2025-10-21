import { allBooks, type Book } from '@/lib/data/book';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, BookOpen, Download, Eye, Share2, CheckCircle, Package, Layers } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { AddToCartButton } from '@/components/ui/add-to-cart-button';
// Assuming cn utility exists in your project for merging Tailwind classes
// If you don't have it, you can replace 'cn' with a simple template literal
// or install 'clsx' and 'tailwind-merge' for robust class merging.
// import { cn } from '@/lib/utils'; 

// Placeholder for cn function if you don't have a utility file
const cn = (...classes) => classes.filter(Boolean).join(' '); 

// --- Helper Components for professional aesthetic ---

/**
 * Glassmorphism Card Wrapper
 * Applies the translucent, frosted glass effect.
 */
const GlassCard = ({ className, children }) => (
  <div
    className={cn(
      'p-6 rounded-3xl backdrop-blur-xl bg-white/10 dark:bg-black/10 shadow-2xl border border-white/30 dark:border-white/5 transition-all duration-500 hover:shadow-3xl',
      className
    )}
  >
    {children}
  </div>
);

/**
 * Format Card Component
 * Displays price, features, and a clear CTA for each format.
 */
const FormatCard = ({ format, price, features, currency, icon: Icon }) => (
  <GlassCard 
    className="flex flex-col items-start space-y-4 h-full transform hover:scale-[1.03] transition-transform duration-500 cursor-pointer border-cyan-400/20 hover:border-cyan-400/50 shadow-cyan-900/10"
  >
    <div className="flex items-center space-x-3 text-white dark:text-cyan-300">
      <Icon className="w-6 h-6 animate-pulse-slow" /> {/* Cute Simple Animation */}
      <h4 className="text-xl font-bold">{format}</h4>
    </div>
    <p className="text-4xl font-extrabold text-foreground">
      {currency} {price.toFixed(2)}
    </p>
    <ul className="text-sm space-y-2 text-muted-foreground flex-grow">
      <h5 className="font-semibold text-white/80 mt-2">Key Features:</h5>
      {features.map((feature, index) => (
        <li key={index} className="flex items-start text-sm">
          <CheckCircle className="w-4 h-4 mr-2 mt-0.5 text-green-500 flex-shrink-0" />
          <span className='italic'>{feature}</span>
        </li>
      ))}
    </ul>
    <Button 
      variant="default" 
      size="lg"
      className="w-full mt-auto bg-cyan-600 hover:bg-cyan-700 transition-colors duration-300 shadow-lg shadow-cyan-500/50"
    >
      Select & Add to Cart
    </Button>
  </GlassCard>
);

// --- Main Component ---

// FIX: Corrected the interface to match Next.js App Router PageProps (params is an object, not a Promise)
interface BookDetailsPageProps {
  params: {
    id: string;
  };
}

export default async function BookDetailsPage({ params }: BookDetailsPageProps) {
  // FIX: Destructuring 'id' directly from 'params'
  const { id } = params;
  
  // Find the book
  const book: Book | undefined = allBooks.find(b => b.id === id);

  if (!book) {
    notFound();
  }

  // Cute & Simple Share Logic (simulated using browser native share API)
  const bookLink = `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/book/${book.id}`;
  const shareMessage = `💖 **A Must-Read Recommendation!** 📚 I'm captivated by "${book.title}" by the brilliant ${book.author}. Dive into the magic and grab your copy here:`;

  const handleShare = () => {
    if (typeof navigator !== 'undefined' && navigator.share) {
      navigator.share({
        title: book.title,
        text: shareMessage,
        url: bookLink,
      })
      .catch((error) => console.error('Error sharing:', error));
    } else {
      // Fallback for browsers without native share API
      navigator.clipboard.writeText(`${shareMessage} ${bookLink}`);
      alert(`🎉 Share link and message copied to clipboard!\n\n${shareMessage}`);
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 to-slate-800 py-16 text-white">
      <div className="container mx-auto px-4">
        
        {/* Professional Breadcrumb */}
        <nav className="mb-12">
          <div className="flex items-center space-x-2 text-sm text-gray-400">
            <Link href="/" className="hover:text-cyan-300 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/books" className="hover:text-cyan-300 transition-colors">Books Collection</Link>
            <span>/</span>
            <span className="text-white font-medium">{book.title}</span>
          </div>
        </nav>

        {/* Main Content: Glassmorphism Effect */}
        <GlassCard className="p-8 md:p-12">
          <div className="grid lg:grid-cols-3 xl:grid-cols-4 gap-12 items-start">
            
            {/* Column 1: Book Cover & Preview */}
            <div className="lg:col-span-1 flex flex-col items-center space-y-6">
              <div className="relative group w-64 h-80 md:w-80 md:h-96">
                {/* Cute Simple Animation on Cover */}
                <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl transition-all duration-500 ease-in-out group-hover:shadow-3xl group-hover:scale-[1.05]">
                  <Image
                    src={book.coverImage}
                    alt={book.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col space-y-3 w-full max-w-sm">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full text-lg border-white/30 text-white hover:bg-white/20 transition-all duration-300"
                  asChild
                >
                  <Link href={`/preview/${book.id}`}>
                    <Eye className="w-5 h-5 mr-2" />
                    Read Sample Preview
                  </Link>
                </Button>

                {/* Beautiful Share Button with message */}
                <Button
                  variant="ghost"
                  size="lg"
                  className="w-full text-lg text-cyan-300 hover:bg-cyan-600/20 transition-all duration-300"
                  onClick={handleShare}
                >
                  <Share2 className="w-5 h-5 mr-2 animate-spin-slow" />
                  Spread the Word!
                </Button>
              </div>
            </div>

            {/* Column 2: Details & Description */}
            <div className="lg:col-span-2 xl:col-span-3 space-y-8">
              <div>
                <Badge className="mb-4 text-sm px-4 py-1 bg-cyan-600/30 text-cyan-300 border border-cyan-500/50">
                  {book.genre.join(' / ')}
                </Badge>
                <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-3 leading-tight tracking-wide">
                  {book.title}
                </h1>
                <p className="text-xl text-gray-300 font-medium italic">by {book.author}</p>

                {/* Rating & Review */}
                <div className="flex items-center space-x-3 my-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 transition-colors duration-200 ${
                          i < Math.floor(book.rating)
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-600'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-400 font-semibold">
                    {book.rating.toFixed(1)}/5.0 ({book.reviews} Ratings)
                  </span>
                </div>
              </div>

              {/* Description */}
              <div className="max-w-3xl">
                <h3 className="text-2xl font-bold mb-3 border-b pb-2 border-cyan-400/20 text-white">Summary</h3>
                <p className="text-lg text-gray-300 leading-relaxed italic">
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
                    <item.icon className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                    <span className="font-semibold">{item.label}:</span>
                    <span className="text-gray-400 truncate">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </GlassCard>

        {/* --- Format & Pricing Section (Professional Layout) --- */}
        <section className="mt-20">
          <h2 className="text-3xl md:text-5xl font-extrabold text-center mb-12 text-white">
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
        </section>

        {/* Centralized Add To Cart & Download (Optional CTA) */}
        <div className="flex justify-center mt-16 space-x-6">
            <AddToCartButton book={book} /> 
            {/* Note: AddToCartButton would ideally be a client component that handles state and the actual cart logic */}
        </div>
        
        {/* You Might Also Like Section (If you uncomment the relatedBooks logic) */}
        {/* Your original related books section can be placed here */}

      </div>
    </div>
  );
}
