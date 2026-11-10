import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Inter, JetBrains_Mono, Space_Grotesk, Unbounded } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/data/siteConfig";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const unbounded = Unbounded({
  variable: "--font-unbounded",
  subsets: ["latin"],
  display: "swap",
  weight: ["800", "900"],
});

export const metadata: Metadata = {
  title: `${siteConfig.brandName} — ${siteConfig.ownerName} | Web Developer Portfolio`,
  description: siteConfig.metaDescription,
  authors: [{ name: siteConfig.ownerName }],
  creator: siteConfig.ownerName,
  keywords: [
    "Kenaltaher",
    "Taher Daeng Matora",
    "Web Developer Indonesia",
    "Frontend Developer",
    "Next.js Developer",
    "Portofolio Web",
    "Jasa Pembuatan Website",
  ],
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://kenaltaher.vercel.app",
    title: `${siteConfig.brandName} — ${siteConfig.ownerName} | Web Developer Portfolio`,
    description: siteConfig.metaDescription,
    siteName: siteConfig.brandName,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.brandName} — ${siteConfig.ownerName}`,
    description: siteConfig.metaDescription,
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "256x256" },
    ],
    apple: [{ url: "/icon.png", sizes: "256x256", type: "image/png" }],
    shortcut: ["/favicon.ico"],
  },
};

export const viewport: Viewport = {
  themeColor: "#08080a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${inter.variable} ${jetbrainsMono.variable} ${spaceGrotesk.variable} ${unbounded.variable} h-full antialiased dark`}
      suppressHydrationWarning
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <Script
          id="kenaltaher-theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("kenaltaher_theme");if(t==="light"){document.documentElement.classList.remove("dark");document.documentElement.classList.add("light");}}catch(e){}})();`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans transition-colors duration-200">
        {children}
      </body>
    </html>
  );
}
