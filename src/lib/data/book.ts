export interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  formats: {
    ebook: {
      price: number;
      features: string[];
    };
    paperback: {
      price: number;
      features: string[];
    };
    hardcover: {
      price: number;
      features: string[];
    };
  };
  currency: string;
  coverImage: string;
  previewPdf: string;
  fullPdf: string;
  ebookPassword: string;
  pages: number;
  isbn: string;
  publisher: string;
  publishedDate: string;
  genre: string[];
  language: string;
  rating: number;
  reviews: number;
}

export const bookData: Book = {
  id: "3am-confessions",
  title: "3 AM Confessions: My Life as an Overthinker",
  author: "Hitesh Sharma",
  description: "A profound journey through midnight thoughts and revelations. Published daily at 3 AM, this book explores the life of an overthinker through intimate confessions and philosophical insights about life, dreams, and the human condition.",
  formats: {
    ebook: {
      price: 399,
      features: [
        "Instant PDF download",
        "Mobile-friendly format",
        "Lifetime access to updates",
        "Printable version included"
      ]
    },
    paperback: {
      price: 599,
      features: [
        "High-quality print",
        "Free shipping in Nepal",
        "5-7 days delivery",
        "Signed copy available"
      ]
    },
    hardcover: {
      price: 899,
      features: [
        "Premium hardcover",
        "Free shipping in Nepal",
        "Signed by author",
        "Collector's edition",
        "5-7 days delivery"
      ]
    }
  },
  currency: "NPR",
  coverImage: "/book_cover_img.png",
  previewPdf: "/3AM-Confessions-Preview.pdf",
  fullPdf: "/3AM-Confessions-Full.pdf",
  ebookPassword: "HLEDUROOM2024",
  pages: 196,
  isbn: "9789937-1-9247-7",
  publisher: "H.L.-Eduroom Publications",
  publishedDate: "2024-10-21",
  genre: ["Self-Help", "Psychology", "Personal Development", "Philosophy"],
  language: "English",
  rating: 4.8,
  reviews: 127
};