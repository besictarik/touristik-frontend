import React from "react";
import { getBlogsData } from "@/lib/data";
import { SupportedLanguage } from "@/lib/types/definitions";
import Banner from "@/components/Banner";
import Navbar from "@/components/Navbar";
import { getDictionary, locales } from "@/lib/utils";
import Link from "next/link";
import BlogCard from "@/components/BlogCard";
import NeedHelp from "@/components/NeedHelp";
import Footer from "@/components/Footer";
import { Metadata } from "next";

export const generateMetadata = async ({
  params: { lang },
}: {
  params: { lang: SupportedLanguage };
}): Promise<Metadata> => {
  const t = await getDictionary(lang);
  return {
    title: "Blog",
    description: t.Blog.description,
    openGraph: {
      title: "Blog",
      description: t.Blog.description,
      type: "website",
      locale: lang,
    },
    alternates: {
      languages: {
        ...Object.fromEntries(
          locales.map((locale) => [locale, `/${locale}/blog`]),
        ),
        "x-default": "/blog",
      },
    },
  };
};

export const generateStaticParams = async () => {
  return locales.map((locale) => ({
    lang: locale,
  }));
};

const Page = async ({
  params: { lang },
}: {
  params: { lang: SupportedLanguage };
}) => {
  const t = await getDictionary(lang);
  const data = await getBlogsData(lang);

  return (
    <div className={"bg-light-3"}>
      <Banner lang={lang} />
      <div className={"relative"}>
        <Navbar t={t} lang={lang} variant={"dark"} />
      </div>
      <div className="pt-36 pb-16 sm:pt-20 w-full sm:w-10/12 max-w-screen-xl mx-auto">
        <div className="my-10">
          <h1 className="font-serif text-4xl mb-5 sm:text-pretty">Blog</h1>
          <p className="w-1/2 text-dark-3 sm:w-full sm:text-pretty">
            {t.Blog.description}
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-1 gap-10">
          {data.docs.map((doc) => {
            return (
              <Link key={doc.id} href={`/blog/${doc.id}`}>
                <BlogCard lang={lang} blog={doc} />
              </Link>
            );
          })}
        </div>
      </div>
      <NeedHelp lang={lang} />
      <Footer lang={lang} />
    </div>
  );
};

export default Page;
