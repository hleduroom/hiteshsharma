import { NextResponse } from 'next/server';

// Temporary data for development
const stats = {
  totalOrders: 156,
  totalRevenue: 85600,
  totalBooks: 3,
  pendingOrders: 12
};

export async function GET() {
  try {
    return NextResponse.json(stats);
  } catch (error) {
    console.error('Error fetching stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch stats' },
      { status: 500 }
    );
  }
}