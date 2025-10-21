"use client";

import { useState } from 'react';
import { mainBook, allBooks } from '@/lib/data/books';
import { notFound, useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Lock, Download, Eye, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function EbookPage() {
  const params = useParams();
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState('');

  const id = params.id as string;

  if (id !== bookData.id) {
    notFound();
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === bookData.ebookPassword) {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Invalid password. Please try again.');
    }
  };

  const downloadEbook = () => {
    // In a real app, this would trigger the download
    const link = document.createElement('a');
    link.href = bookData.fullPdf;
    link.download = `${bookData.title}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900 flex items-center justify-center">
        <div className="container mx-auto px-4 max-w-md">
          <Card>
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <Lock className="w-12 h-12 text-muted-foreground" />
              </div>
              <CardTitle>Access Your E-book</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-6 text-center">
                Enter the password provided in your purchase confirmation email to access your e-book.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Input
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                {error && (
                  <Alert variant="destructive">
                    <AlertCircle className="w-4 h-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <Button type="submit" className="w-full">
                  Unlock E-book
                </Button>
              </form>

              <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                <h4 className="font-semibold mb-2">Need help?</h4>
                <p className="text-sm text-muted-foreground">
                  If you've lost your password, please contact us at{' '}
                  <a href="mailto:hleduroom@gmail.com" className="text-primary underline">
                    hleduroom@gmail.com
                  </a>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">{bookData.title}</h1>
            <p className="text-muted-foreground">by {bookData.author}</p>
          </div>

          <Card>
            <CardContent className="p-8">
              <div className="text-center space-y-6">
                <div className="bg-green-100 dark:bg-green-900 rounded-full p-4 w-16 h-16 mx-auto flex items-center justify-center">
                  <Eye className="w-8 h-8 text-green-600 dark:text-green-400" />
                </div>

                <div>
                  <h2 className="text-xl font-semibold mb-2">
                    E-book Access Granted
                  </h2>
                  <p className="text-muted-foreground">
                    You now have full access to your purchased e-book.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button onClick={downloadEbook} className="flex items-center">
                    <Download className="w-4 h-4 mr-2" />
                    Download PDF
                  </Button>
                  <Button variant="outline" asChild>
                    <a href={bookData.fullPdf} target="_blank" rel="noopener noreferrer">
                      <Eye className="w-4 h-4 mr-2" />
                      Read Online
                    </a>
                  </Button>
                </div>

                <div className="bg-muted/50 rounded-lg p-4 mt-6">
                  <h4 className="font-semibold mb-2">Your E-book Details</h4>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <p>• Format: PDF</p>
                    <p>• Pages: {bookData.pages}</p>
                    <p>• File Size: ~5MB</p>
                    <p>• Language: {bookData.language}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}