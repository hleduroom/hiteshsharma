import nodemailer from 'nodemailer';

interface EmailData {
  to: string;
  subject: string;
  html: string;
  bcc?: string[];
}

interface OrderEmailData {
  customerEmail: string;
  customerName: string;
  orderId: string;
  bookTitle: string;
  format: string;
  price: number;
  currency: string;
  transactionId?: string;
  paymentMethod: string;
}

class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransporter({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });
  }

  private async sendEmail({ to, subject, html, bcc }: EmailData) {
    try {
      const mailOptions = {
        from: `"The Hitesh Sir" <${process.env.GMAIL_USER}>`,
        to,
        bcc: bcc || ['hleduroom@gmail.com'],
        subject,
        html,
      };

      const result = await this.transporter.sendMail(mailOptions);
      console.log('Email sent successfully:', result.messageId);
      return { success: true, messageId: result.messageId };
    } catch (error) {
      console.error('Error sending email:', error);
      return { success: false, error };
    }
  }

  async sendOrderConfirmation(data: OrderEmailData) {
    const { customerEmail, customerName, orderId, bookTitle, format, price, currency, transactionId, paymentMethod } = data;

    const subject = `Order Confirmation - ${orderId}`;
    
    const html = `
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
        .order-details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #667eea; }
        .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
        .highlight { color: #667eea; font-weight: bold; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🎉 Order Confirmed!</h1>
            <p>Thank you for your purchase, ${customerName}!</p>
        </div>
        <div class="content">
            <h2>Order Details</h2>
            <div class="order-details">
                <p><strong>Order ID:</strong> <span class="highlight">${orderId}</span></p>
                <p><strong>Book:</strong> ${bookTitle}</p>
                <p><strong>Format:</strong> ${format}</p>
                <p><strong>Amount Paid:</strong> ${currency} ${price}</p>
                <p><strong>Payment Method:</strong> ${paymentMethod}</p>
                ${transactionId ? `<p><strong>Transaction ID:</strong> ${transactionId}</p>` : ''}
                <p><strong>Order Date:</strong> ${new Date().toLocaleDateString()}</p>
            </div>

            ${format === 'ebook' ? `
            <div style="background: #e8f5e8; padding: 15px; border-radius: 8px; margin: 20px 0;">
                <h3 style="color: #2e7d32; margin-top: 0;">📚 E-book Access</h3>
                <p>Your e-book will be delivered manually within 24 hours. You'll receive a separate email with download instructions and access password.</p>
                <p><em>For security reasons, e-book passwords are sent manually after verification.</em></p>
            </div>
            ` : `
            <div style="background: #fff3e0; padding: 15px; border-radius: 8px; margin: 20px 0;">
                <h3 style="color: #ef6c00; margin-top: 0;">📦 Shipping Information</h3>
                <p>Your ${format.toLowerCase()} will be shipped within 2-3 business days. You'll receive tracking information once your order is dispatched.</p>
                <p><strong>Delivery Time:</strong> 5-7 business days within Nepal</p>
            </div>
            `}

            <div style="background: #e3f2fd; padding: 15px; border-radius: 8px; margin: 20px 0;">
                <h3 style="color: #1565c0; margin-top: 0;">📞 Need Help?</h3>
                <p>If you have any questions about your order, please contact us:</p>
                <p>📧 Email: hleduroom@gmail.com<br>
                   📱 WhatsApp: +977-9827728726<br>
                   🌐 Website: thehiteshsir.com</p>
            </div>
        </div>
        <div class="footer">
            <p>Thank you for choosing H.L.-Eduroom Publications!</p>
            <p>Follow us for updates:<br>
            <a href="https://facebook.com/thehiteshsir">Facebook</a> | 
            <a href="https://linkedin.com/in/hitesh-sharma-8a3366329">LinkedIn</a></p>
        </div>
    </div>
</body>
</html>
    `;

    return this.sendEmail({
      to: customerEmail,
      subject,
      html,
      bcc: ['hleduroom@gmail.com', customerEmail] // BCC to admin and customer
    });
  }

  async sendAdminNotification(data: OrderEmailData & { customerEmail: string; customerPhone?: string; shippingAddress?: string }) {
    const { customerEmail, customerName, orderId, bookTitle, format, price, currency, transactionId, paymentMethod, customerPhone, shippingAddress } = data;

    const subject = `🛒 NEW ORDER: ${orderId} - ${bookTitle} (${format})`;
    
    const html = `
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%); color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 10px 10px; }
        .order-details { background: white; padding: 15px; border-radius: 8px; margin: 15px 0; border-left: 4px solid #ff6b6b; }
        .customer-info { background: #e8f5e8; padding: 15px; border-radius: 8px; margin: 15px 0; }
        .action-required { background: #fff3e0; padding: 15px; border-radius: 8px; margin: 15px 0; border: 2px dashed #ff9800; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🛒 New Order Received!</h1>
            <p>Order ID: ${orderId}</p>
        </div>
        <div class="content">
            <div class="order-details">
                <h3>Order Information</h3>
                <p><strong>Book:</strong> ${bookTitle}</p>
                <p><strong>Format:</strong> ${format}</p>
                <p><strong>Amount:</strong> ${currency} ${price}</p>
                <p><strong>Payment Method:</strong> ${paymentMethod}</p>
                ${transactionId ? `<p><strong>Transaction ID:</strong> ${transactionId}</p>` : ''}
                <p><strong>Order Time:</strong> ${new Date().toLocaleString()}</p>
            </div>

            <div class="customer-info">
                <h3>Customer Information</h3>
                <p><strong>Name:</strong> ${customerName}</p>
                <p><strong>Email:</strong> ${customerEmail}</p>
                ${customerPhone ? `<p><strong>Phone:</strong> ${customerPhone}</p>` : ''}
                ${shippingAddress ? `<p><strong>Shipping Address:</strong> ${shippingAddress}</p>` : ''}
            </div>

            ${format === 'ebook' ? `
            <div class="action-required">
                <h3>🔐 Action Required: E-book Delivery</h3>
                <p>Please send the e-book download link and password to the customer within 24 hours.</p>
                <p><strong>E-book Password:</strong> HLEDUROOM2024</p>
                <p><strong>Download Link:</strong> https://thehiteshsir.com/ebook/3am-confessions</p>
                <p><em>Remember to verify the payment before sending credentials.</em></p>
            </div>
            ` : `
            <div class="action-required">
                <h3>📦 Action Required: Physical Book Shipping</h3>
                <p>Please prepare the ${format.toLowerCase()} for shipping and update the customer with tracking information.</p>
                <p><strong>Shipping Address provided above.</strong></p>
            </div>
            `}

            <div style="text-align: center; margin-top: 20px;">
                <a href="https://thehiteshsir.com/admin/orders" style="background: #ee5a24; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">
                    View Order in Admin Panel
                </a>
            </div>
        </div>
    </div>
</body>
</html>
    `;

    return this.sendEmail({
      to: 'hleduroom@gmail.com',
      subject,
      html
    });
  }
}

export const emailService = new EmailService();