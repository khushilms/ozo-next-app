import type { Metadata } from "next";
import { Poppins } from "next/font/google";
const poppins = Poppins({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });

import "./globals.css";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';


export const metadata: Metadata = {
  title: "Ozo",
  description: "We develop and manufacture a range of specialized, eco-friendly cleaning and maintenance solutions designed to conserve water and maximize efficiency. Our products are uniquely formulated to address specific cleaning challenges across various industries, from descaling and degreasing to drain care and general maintenance.",
  openGraph: {
    title: "Ozo",
    description: "We develop and manufacture a range of specialized, eco-friendly cleaning and maintenance solutions designed to conserve water and maximize efficiency. Our products are uniquely formulated to address specific cleaning challenges across various industries, from descaling and degreasing to drain care and general maintenance.",
    url: "https://odofree.com/",
    images: [
      {
        url: "/ozo-white-leaf.svg",
        width: 800,
        height: 600,
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.className} antialiased`}
      >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
