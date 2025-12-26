import type { Metadata } from "next";
import { Providers } from "./providers";
import { ClientInit } from "@/components/ClientInit";
import "./globals.css";

export const metadata: Metadata = {
  title: "Your Investment Position",
  description: "Discover your investment decision-making profile with privacy-preserving assessment",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-white">
        <ClientInit>
          <Providers>{children}</Providers>
        </ClientInit>
      </body>
    </html>
  );
}

