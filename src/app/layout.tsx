import type { Metadata, Viewport } from "next";
import "./globals.css";
import { display, displaySerif, sans } from "./fonts";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "PURRMURE — мини-бренд сумок-конструкторов",
  description:
    "Семейная мастерская: мы с мамой шьём сумки, авоськи, мешки, ремни и кошельки. Собери свою сумку из основы, мешка, ремня и декора.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0a0a0a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      className={`${sans.variable} ${display.variable} ${displaySerif.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
