// /app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/navigation/Navigation";
import { DACEProvider } from "@/components/providers/DACEProvider";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { QueryProvider } from "@/components/providers/QueryProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ideatorium Hub | Deterministic App Creation Engine",
  description: "Turn ideas into production apps in minutes. No code. No hallucinations. Just results.",
  keywords: ["DACE", "app builder", "no code", "deterministic", "interpretation", "litigation", "legal tech", "AI"],
  authors: [{ name: "Ideatorium Hub" }],
  openGraph: {
    type: "website",
    title: "Ideatorium Hub DACE Engine",
    description: "Deterministic App Creation Engine for Legal Tech & Beyond",
    siteName: "Ideatorium Hub",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={`${inter.className} antialiased bg-gray-50 dark:bg-gray-900 transition-colors duration-300`}>
        <ThemeProvider>
          <QueryProvider>
            <DACEProvider>
              <Navigation />
              <main className="min-h-screen pt-16">
                {children}
              </main>
              <footer className="border-t border-gray-200 dark:border-gray-800 py-6 text-center text-gray-500 dark:text-gray-400 text-sm bg-white dark:bg-gray-900">
                <div className="container mx-auto px-4">
                  <p>© {new Date().getFullYear()} Ideatorium Hub DACE Engine v1.0</p>
                  <p className="mt-1">
                    Deterministic App Creation Engine | 100% Template-based | No AI Hallucinations
                  </p>
                  <div className="flex justify-center gap-4 mt-4">
                    <a href="/privacy" className="hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
                      Privacy
                    </a>
                    <a href="/terms" className="hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
                      Terms
                    </a>
                    <a href="/docs" className="hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
                      Documentation
                    </a>
                    <a href="/contact" className="hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
                      Contact
                    </a>
                  </div>
                </div>
              </footer>
            </DACEProvider>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}