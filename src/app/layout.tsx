import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Providers } from "./providers";
import { Toaster } from "@/components/ui/toaster";
import { CartProvider } from "@/lib/context/CartContext";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Hitesh Sharma | Portfolio",
  description:
    "Explore Hitesh Sharma's personal portfolio featuring projects, skills, and expertise in technology, development, and education.",
  icons: {
    icon: "/favicon.ico", // ✅ Standard favicon
  },
  openGraph: {
    title: "Hitesh Sharma | Portfolio",
    description:
      "Explore Hitesh Sharma's work, projects, and expertise in technology and innovation.",
    url: "https://hiteshsharma.com.np", // 🔧 Replace with your actual domain
    siteName: "Hitesh Sharma Portfolio",
    images: [
      {
        url: "/favicon.ico", // ✅ Using favicon as the preview image
        width: 512,
        height: 512,
        alt: "Hitesh Sharma Portfolio Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hitesh Sharma | Portfolio",
    description:
      "Explore Hitesh Sharma's work, projects, and expertise in technology and innovation.",
    images: ["/favicon.ico"], // ✅ Same favicon for Twitter preview
    creator: "@your_twitter_handle", // 🔧 Optional: replace if you have one
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=Space+Grotesk:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={cn("font-body antialiased", inter.variable)}>
        <Providers>
          <CartProvider>
            {children}
            <Toaster />
          </CartProvider>
        </Providers>
      </body>
    </html>
  );
}