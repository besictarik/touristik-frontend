import type { Metadata } from "next";
import "./globals.css";
import { Montserrat, Playfair_Display } from "next/font/google";
import { GoogleTagManager } from "@next/third-parties/google";
import AcceptPolicy from "@/components/AcceptPolicy";
import { SupportedLanguage } from "@/lib/types/definitions";
import Banner from "@/components/Banner";
import NeedHelp from "@/components/NeedHelp";
import Footer from "@/components/Footer";
import DiscountPopup from "@/components/DiscountPopup";

// Have to finish metadata
export const metadata: Metadata = {
  title: {
    template: "%s | TST Touristik",
    default: "TST Touristik",
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || ""),
  openGraph: {
    title: {
      template: "%s | TST Touristik",
      default: "TST Touristik",
    },
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
  params: { lang },
  children,
}: Readonly<{
  params: { lang: SupportedLanguage };
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/*antialiased is added extra, might be removed*/}
      <GoogleTagManager gtmId={"GTM-MH46K9H4"} />
      <body
        className={`${montserrat.variable} ${playfairDisplay.variable} font-sans text-dark-5 antialiased`}
      >
        <div className={"bg-light-3"}>
          <Banner lang={lang} />
          {children}
          <NeedHelp lang={lang} />
          <Footer lang={lang} />
        </div>

        <AcceptPolicy />
        <DiscountPopup />
      </body>
    </html>
  );
}
