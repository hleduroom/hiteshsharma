import { NextRequest, NextResponse } from 'next/server';

// Temporary in-memory storage for development
let books: any[] = [
  {
    id: "1",
    title: "3 AM Confessions: My Life as an Overthinker",
    author: "Hitesh Sharma",
    description: "A profound journey through midnight thoughts and revelations.",
    coverImage: "/book_cover_img.png",
    previewPdf: "/3AM-Confessions-Preview.pdf",
    fullPdf: "/3AM-Confessions-Full.pdf",
    ebookPassword: "HLEDUROOM2024",
    pages: 196,
    isbn: "9789937-1-9247-7",
    publisher: "H.L.-Eduroom Publications",
    publishedDate: "2024-10-21T00:00:00.000Z",
    language: "English",
    rating: 4.8,
    reviews: 127,
    formats: [
      { type: "ebook", price: 299 },
      { type: "paperback", price: 599 },
      { type: "hardcover", price: 899 }
    ],
    genres: [
      { name: "Self-Help" },
      { name: "Psychology" },
      { name: "Personal Development" }
    ]
  }
];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const genre = searchParams.get('genre');
    const search = searchParams.get('search');

    let filteredBooks = [...books];

    // Apply filters
    if (genre) {
      filteredBooks = filteredBooks.filter(book => 
        book.genres.some((g: any) => g.name === genre)
      );
    }

    if (search) {
      const searchLower = search.toLowerCase();
      filteredBooks = filteredBooks.filter(book =>
        book.title.toLowerCase().includes(searchLower) ||
        book.author.toLowerCase().includes(searchLower) ||
        book.description.toLowerCase().includes(searchLower)
      );
    }

    // Apply pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedBooks = filteredBooks.slice(startIndex, endIndex);

    return NextResponse.json({
      books: paginatedBooks,
      pagination: {
        page,
        limit,
        total: filteredBooks.length,
        pages: Math.ceil(filteredBooks.length / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching books:', error);
    return NextResponse.json(
      { error: 'Failed to fetch books' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const newBook = {
      id: Date.now().toString(),
      ...body,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    books.push(newBook);

    return NextResponse.json({ 
      success: true, 
      book: newBook,
      message: 'Book created successfully' 
    });
  } catch (error) {
    console.error('Book creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create book' },
      { status: 500 }
    );
  }
}