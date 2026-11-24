import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Newsreader, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import NextAuthSessionProvider from "@/components/SessionProvider";
import { LogoProvider } from "@/components/ui/Logo";

const sans = Plus_Jakarta_Sans({
  variable: "--font-sans-main",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const serif = Newsreader({
  variable: "--font-serif-display",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const mono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FolioIn | Award-Winning Portfolio Engine",
  description: "Create an exceptional portfolio website that gets you noticed. Award-winning design, zero-hallucination intake, and instant custom domains.",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${sans.variable} ${serif.variable} ${mono.variable} h-full antialiased`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,600;0,700;0,800;1,400&family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&family=Space+Grotesk:wght@500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body suppressHydrationWarning className="min-h-full flex flex-col font-sans">
        <NextAuthSessionProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem={false}
            disableTransitionOnChange
          >
            <LogoProvider>
              {children}
            </LogoProvider>
          </ThemeProvider>
        </NextAuthSessionProvider>
      </body>
    </html>
  );
}
