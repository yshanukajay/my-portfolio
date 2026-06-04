import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/components/LenisProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Yohan Shanuka | ML & Data Engineer",
  description: "Portfolio of Yohan Shanuka, specializing in scalable Machine Learning systems, Data Engineering, and MLOps.",
  openGraph: {
    title: "Yohan Shanuka | ML & Data Engineer",
    description: "Building scalable machine learning workflows and production-grade data pipelines.",
    url: "https://yohanshanuka.com",
    siteName: "Yohan Shanuka Portfolio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Yohan Shanuka | ML & Data Engineer",
    description: "Building scalable machine learning workflows and production-grade data pipelines.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${outfit.variable} antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col selection:bg-cyan-100 selection:text-cyan-900">
        <LenisProvider>
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
