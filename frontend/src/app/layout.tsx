"use client";
import localFont from "next/font/local";
import "./globals.css";
import { Navigation } from "./components/navigation";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useEffect(() => {
    document.title = "ReadSwap";
  }, []);
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <header className="bg-slate-900 text-white p-4 text-center">
          <Navigation />
        </header>
        <Toaster position="bottom-right" />
        {children}
        <footer className="bg-slate-900 text-white p-4 text-center mt-auto fixed bottom-0 w-full">
          <p>Footer</p>
        </footer>
      </body>
    </html>
  );
}
