import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  try {
    const [
      totalOrders,
      totalRevenue,
      totalBooks,
      pendingOrders
    ] = await Promise.all([
      prisma.order.count(),
      prisma.order.aggregate({
        _sum: {
          totalAmount: true
        }
      }),
      prisma.book.count(),
      prisma.order.count({
        where: {
          status: 'PENDING'
        }
      })
    ]);

    return NextResponse.json({
      totalOrders,
      totalRevenue: totalRevenue._sum.totalAmount || 0,
      totalBooks,
      pendingOrders
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch stats' },
      { status: 500 }
    );
  }
}