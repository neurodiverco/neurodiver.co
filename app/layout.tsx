import type { Metadata } from "next";
import { Atkinson_Hyperlegible_Next, Domine } from "next/font/google";
import "./globals.css";
import "./style.css";

const fontSans = Atkinson_Hyperlegible_Next({
  fallback: ["system-ui", "-apple-system", "sans-serif"],
  subsets: ["latin"],
  variable: "--font-sans",
});

const fontSerif = Domine({
  fallback: ["Georgia", "Times New Roman", "serif"],
  subsets: ["latin"],
  variable: "--font-serif",
});

export const metadata: Metadata = {
  title: "NeuroDiver",
  description: "A productivity toolkit for neurodivergent working adults. Built by ND, for ND.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
    >
      <body className={`${fontSans.variable} ${fontSerif.variable} antialiased min-h-full flex flex-col overflow-x-hidden scroll-smooth`}>{children}</body>
    </html>
  );
}
