import type { Metadata } from "next";
import "./globals.css";
import { Montserrat, Playfair_Display } from "next/font/google";

// Have to finish metadata
export const metadata: Metadata = {
  title: {
    template: "%s | TST Touristik",
    default: "TST Touristik",
  },
};

const montserrat = Montserrat({
  subsets: ["latin-ext"],
  variable: "--font-montserrat",
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin-ext"],
  variable: "--font-playfair-display",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/*antialiased is added extra, might be removed*/}
      <body
        className={`${montserrat.variable} ${playfairDisplay.variable} font-sans text-dark-5 antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
