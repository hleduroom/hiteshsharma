import { bookData } from '@/lib/data/book';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Download, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface PreviewPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function PreviewPage({ params }: PreviewPageProps) {
  const { id } = await params;

  if (id !== bookData.id) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <Button variant="ghost" asChild>
              <Link href={`/book/${id}`} className="flex items-center">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Book
              </Link>
            </Button>
            <Button asChild>
              <a href={bookData.previewPdf} download className="flex items-center">
                <Download className="w-4 h-4 mr-2" />
                Download Preview
              </a>
            </Button>
          </div>

          {/* Preview Content */}
          <Card>
            <CardContent className="p-0">
              <div className="aspect-[3/4] w-full">
                <iframe
                  src={bookData.previewPdf}
                  className="w-full h-full rounded-lg"
                  title={`${bookData.title} Preview`}
                />
              </div>
            </CardContent>
          </Card>

          {/* Preview Info */}
          <div className="mt-6 text-center">
            <p className="text-muted-foreground">
              This is a preview of the first few chapters. Purchase the full book to get complete access.
            </p>
            <Button className="mt-4" asChild>
              <Link href={`/book/${id}`}>
                Purchase Full Book
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}