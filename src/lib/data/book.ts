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

export const mainBook: Book = {
  id: "3am-confessions",
  title: "3 AM Confessions: My Life as an Overthinker",
  author: "Hitesh Sharma",
  description: "A profound journey through midnight thoughts and revelations. Published daily at 3 AM, this book explores the life of an overthinker through intimate confessions and philosophical insights about life, dreams, and the human condition.",
  formats: {
    ebook: {
      price: 299,
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

export const relatedBooks: Book[] = [
  {
    id: "mindfulness-guide",
    title: "Mindfulness for Overthinkers",
    author: "Dr. Sarah Johnson",
    description: "Practical techniques to calm an overactive mind and find peace in the present moment.",
    formats: {
      ebook: {
        price: 249,
        features: [
          "Instant PDF download",
          "Practical exercises",
          "Audio guided meditations"
        ]
      },
      paperback: {
        price: 499,
        features: [
          "High-quality print",
          "Free shipping in Nepal"
        ]
      },
      hardcover: {
        price: 799,
        features: [
          "Premium hardcover",
          "Free shipping in Nepal"
        ]
      }
    },
    currency: "NPR",
    coverImage: "/related-book-1.jpg",
    previewPdf: "/preview-1.pdf",
    fullPdf: "/full-1.pdf",
    ebookPassword: "MINDFUL2024",
    pages: 180,
    isbn: "9789937-1-9248-4",
    publisher: "Mindful Publications",
    publishedDate: "2024-09-15",
    genre: ["Self-Help", "Psychology"],
    language: "English",
    rating: 4.5,
    reviews: 89
  },
  {
    id: "digital-detox",
    title: "Digital Detox: Reclaim Your Time",
    author: "Alex Thompson",
    description: "Learn how to break free from digital distractions and reclaim your focus and productivity.",
    formats: {
      ebook: {
        price: 279,
        features: [
          "Instant PDF download",
          "30-day challenge plan",
          "Productivity templates"
        ]
      },
      paperback: {
        price: 549,
        features: [
          "High-quality print",
          "Free shipping in Nepal"
        ]
      },
      hardcover: {
        price: 849,
        features: [
          "Premium hardcover",
          "Free shipping in Nepal"
        ]
      }
    },
    currency: "NPR",
    coverImage: "/related-book-2.jpg",
    previewPdf: "/preview-2.pdf",
    fullPdf: "/full-2.pdf",
    ebookPassword: "DETOX2024",
    pages: 220,
    isbn: "9789937-1-9249-1",
    publisher: "Productivity Press",
    publishedDate: "2024-08-20",
    genre: ["Self-Help", "Productivity", "Technology"],
    language: "English",
    rating: 4.6,
    reviews: 134
  }
];

// Export all books for easy access
export const allBooks: Book[] = [mainBook, ...relatedBooks];

// Helper function to find book by ID
export function getBookById(id: string): Book | undefined {
  return allBooks.find(book => book.id === id);
}