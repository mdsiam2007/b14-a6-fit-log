import React from 'react';
import { Inter, Oswald } from "next/font/google";
import { HomePageLayoutProps } from "@/app/types/all_types";
import "./globals.css";
import Header from './component/shared/Header';
import Footer from './component/shared/Footer';
import { PlanProvider } from './context/PlanContext';
import { Toaster } from 'react-hot-toast';

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
});

const HomePageLayout = ({ children }: HomePageLayoutProps) => {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${oswald.variable} font-sans min-h-screen flex flex-col bg-[#0c0d10] text-white`}>
        <PlanProvider>
          <Toaster position="top-right" />
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </PlanProvider>
      </body>
    </html>
  );
};

export default HomePageLayout;
