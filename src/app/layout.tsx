import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { CartProvider } from "@/context/CartContext";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant"
});

export const metadata: Metadata = {
  title: "AuraLume | Manifest With Unbreakable Light",
  description: "Ethically grown, high-frequency lab diamonds. The ultimate amplifier for your soul's intention.",
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
        <CartProvider>
          <div className="relative min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow flex flex-col">
              {children}
            </main>
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
