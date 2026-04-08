import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import { cookies } from "next/headers";
import type { ReactNode } from "react";
import { ThemeProvider } from "./components/ThemeProvider";

import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-display",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://huardpaul.netlify.app"),
  title: "Paul Huard | Full-Stack & Data Science",
  description: "I build data-driven applications and intelligent solutions. Open to opportunities worldwide.",
  openGraph: {
    title: "Paul Huard | Software Engineer",
    description: "Ingénieur full-stack & data science. Je transforme la data en produits intelligents.",
    url: "https://huardpaul.netlify.app",
    siteName: "Paul Huard Portfolio",
    images: [
      {
        url: "/profile.jpg",
        width: 1200,
        height: 630,
        alt: "Paul Huard",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Paul Huard | Portfolio",
    description: "Ingénieur full-stack & data science. Découvrez mon parcours.",
    images: ["/profile.jpg"],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const cookieStore = await cookies();
  const lang = cookieStore.get("NEXT_LOCALE")?.value || "en";

  return (
    <html lang={lang} suppressHydrationWarning>
      <body className={`${manrope.variable} ${inter.variable}`}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
