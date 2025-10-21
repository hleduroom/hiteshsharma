export interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  price: number;
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
  price: 399,
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
    description: "Practical techniques to calm an overactive mind.",
    price: 299,
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
  }
];