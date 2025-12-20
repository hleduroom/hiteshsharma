import { NextRequest, NextResponse } from "next/server";
import { emailService } from "@/lib/server/email";

// Temporary in-memory storage for development
let orders: any[] = [];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Normalize customer - support both nested and older flattened payload
    const customer = body.customer || {
      email: body.email,
      firstName: body.firstName,
      lastName: body.lastName || "",
      phone: body.phone,
      address: body.address,
      city: body.city,
      postalCode: body.postalCode || "",
    };

    const orderId = body.orderId || `ORD-${Date.now()}`;

    const rawItems = body.items || [];

    const normalizedItems = rawItems.map((item: any) => {
      // item may be { id, quantity, book: {...} } or older flattened structures
      const bookSource = item.book || item;
      const format = bookSource.format || bookSource.bookFormat || "ebook";
      const price = bookSource.price || (bookSource.formats && bookSource.formats[format] && bookSource.formats[format].price) || 0;
      return {
        book: {
          title: bookSource.title || "Unknown Title",
          author: bookSource.author || "Hitesh Sharma",
          price,
          format,
        },
        quantity: item.quantity || 1,
      };
    });

    const total = body.total || normalizedItems.reduce((acc: number, it: any) => acc + (it.book.price * it.quantity), 0);

    const newOrder = {
      id: Date.now().toString(),
      orderId,
      customerEmail: customer.email,
      customerName: `${customer.firstName || ""} ${customer.lastName || ""}`.trim(),
      customerPhone: customer.phone,
      shippingAddress: customer.address ? `${customer.address}, ${customer.city || ""}, ${customer.postalCode || ""}` : "Digital Delivery",
      totalAmount: total,
      paymentMethod: body.paymentMethod || "unknown",
      transactionId: body.transactionId || "",
      status: "PENDING",
      items: normalizedItems,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    orders.push(newOrder);

    const firstItem = newOrder.items[0] || { book: { title: "N/A", format: "ebook" } };
    const format = firstItem.book.format || "ebook";
    const formatName = format.charAt(0).toUpperCase() + format.slice(1);

    // Try sending emails; failures shouldn't break the API response for the order creation
    try {
      await emailService.sendOrderConfirmation({
        customerEmail: customer.email,
        customerName: `${customer.firstName || ""} ${customer.lastName || ""}`.trim(),
        orderId,
        bookTitle: firstItem.book.title,
        format: formatName,
        price: total,
        currency: "NPR",
        transactionId: body.transactionId || "",
        paymentMethod: getPaymentMethodName(body.paymentMethod || ""),
      });

      await emailService.sendAdminNotification({
        customerEmail: customer.email,
        customerName: `${customer.firstName || ""} ${customer.lastName || ""}`.trim(),
        customerPhone: customer.phone,
        shippingAddress: newOrder.shippingAddress,
        orderId,
        bookTitle: firstItem.book.title,
        format: formatName,
        price: total,
        currency: "NPR",
        transactionId: body.transactionId || "",
        paymentMethod: getPaymentMethodName(body.paymentMethod || ""),
      });
    } catch (err) {
      console.error("Email sending failed:", err);
    }

    return NextResponse.json({
      success: true,
      orderId: newOrder.orderId,
      message: "Order processed successfully",
    });
  } catch (error) {
    console.error("Order processing error:", error);
    return NextResponse.json({ error: "Failed to process order" }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const status = searchParams.get("status");

    let filteredOrders = [...orders];

    if (status) {
      filteredOrders = filteredOrders.filter((order) => order.status === status);
    }

    // Apply pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedOrders = filteredOrders.slice(startIndex, endIndex);

    return NextResponse.json({
      orders: paginatedOrders,
      pagination: {
        page,
        limit,
        total: filteredOrders.length,
        pages: Math.ceil(filteredOrders.length / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
  }
}

function getPaymentMethodName(method: string): string {
  const methods: { [key: string]: string } = {
    card: "Credit/Debit Card",
    esewa: "eSewa",
    khalti: "Khalti",
    bank_transfer: "Bank Transfer",
    bank: "Bank",
  };
  return methods[method] || method || "Unknown";
}
