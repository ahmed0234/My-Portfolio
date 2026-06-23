import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins, Manrope } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Navbar, Footer, FloatingCTA } from "@/components/navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-manrope",
});

export const metadata: Metadata = {
  title: "Ahmed | Web Developer & Website Creator Portfolio",
  description:
    "I'm Ahmed, a professional web developer and website creator specializing in React, Next.js, and modern UI technologies. I deliver high-performance, responsive web applications and custom websites. Currently open to freelance web development services and full-time work opportunities.",
  keywords: [
    "Ahmed",
    "Web Developer",
    "Website Creator",
    "Frontend Developer",
    "React Developer",
    "Next.js Developer",
    "Freelance Web Developer",
    "Full-time Software Engineer",
    "Full time Software Engineer",
    "Web Development Services",
    "Portfolio",
    "Ahmed Portfolio",
  ],
  icons: {
    icon: [
      { url: "/CodingSigns/coding.png" },
    ],
    shortcut: [
      { url: "/CodingSigns/coding.png" },
    ],
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
      className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} ${manrope.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col justify-between">
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-7KG9RRLTCF"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-7KG9RRLTCF');
          `}
        </Script>

        <div className="flex-1 flex flex-col">
          <Navbar />
          {children}
        </div>
        <Footer />
        <FloatingCTA />
      </body>
    </html>
  );
}
