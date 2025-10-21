import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const genre = searchParams.get('genre');
    const search = searchParams.get('search');

    const skip = (page - 1) * limit;

    const where: any = {};
    
    if (genre) {
      where.genres = {
        some: {
          name: genre
        }
      };
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { author: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } }
      ];
    }

    const [books, total] = await Promise.all([
      prisma.book.findMany({
        where,
        include: {
          formats: true,
          genres: true
        },
        orderBy: {
          createdAt: 'desc'
        },
        skip,
        take: limit
      }),
      prisma.book.count({ where })
    ]);

    return NextResponse.json({
      books,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
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
    const {
      title,
      author,
      description,
      coverImage,
      previewPdf,
      fullPdf,
      ebookPassword,
      pages,
      isbn,
      publisher,
      publishedDate,
      language,
      formats,
      genres
    } = body;

    const book = await prisma.book.create({
      data: {
        title,
        author,
        description,
        coverImage,
        previewPdf,
        fullPdf,
        ebookPassword,
        pages: parseInt(pages),
        isbn,
        publisher,
        publishedDate: new Date(publishedDate),
        language,
        formats: {
          create: formats.map((format: any) => ({
            type: format.type,
            price: parseFloat(format.price),
            features: format.features
          }))
        },
        genres: {
          create: genres.map((genre: string) => ({
            name: genre
          }))
        }
      },
      include: {
        formats: true,
        genres: true
      }
    });

    return NextResponse.json({ 
      success: true, 
      book,
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