import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DinoSite - AI Website Builder",
  description: "Build beautiful websites in seconds with AI. No code required.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
