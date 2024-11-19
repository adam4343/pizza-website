"use client";
import { Nunito } from "next/font/google";
import { Header } from "@/components/shared/header";
import "./globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";

const nunito = Nunito({
  subsets: ["cyrillic"],
  variable: "--font-nunito",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const query = new QueryClient();
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>{/* <link data-rh="true" rel="icon" href="/logo.png" /> */}</head>

      <body className={nunito.className}>
        <QueryClientProvider client={query}>
          <Toaster position="bottom-right" />
          <Header />
          <main className="min-h-screen overflow-x-hidden">{children}</main>
        </QueryClientProvider>
      </body>
    </html>
  );
}
