import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import CartDrawer from "@/components/CartDrawer";
import { CartProvider } from "@/context/CartContext";

import Analytics from "@/components/Analytics";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant"
});

export const metadata: Metadata = {
  metadataBase: new URL('https://shopauralume.com'),
  title: "AuraLume | Manifest With Unbreakable Light",
  description: "Ethically grown, high-frequency lab diamonds. The ultimate amplifier for your soul's intention.",
  openGraph: {
    title: "AuraLume | Manifest With Unbreakable Light",
    description: "Ethically grown, high-frequency lab diamonds. The ultimate amplifier for your soul's intention.",
    url: 'https://shopauralume.com',
    siteName: 'AuraLume',
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${cormorant.variable} antialiased bg-cosmos text-starlight selection:bg-gold-500/30 selection:text-gold-200 font-sans`}
      >
        <Analytics />
        <CartProvider>
          <div className="relative min-h-screen flex flex-col">
            <Navbar />
            <CartDrawer />
            <main className="flex-grow flex flex-col">
              {children}
            </main>
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
