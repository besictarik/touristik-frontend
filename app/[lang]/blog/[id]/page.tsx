import { SupportedLanguage } from "@/lib/types/definitions";
import Navbar from "@/components/Navbar";
import { formatDate, getDictionary, locales } from "@/lib/utils";
import Image from "next/image";
import { getBlogData, getBlogsData } from "@/lib/data";
import { Photo } from "@/lib/types/payload-types";
import { serializeCMSContent } from "@/lib/cms-helpers";
import { Metadata } from "next";

export const generateMetadata = async ({
  params: { lang, id },
}: {
  params: { lang: SupportedLanguage; id: string };
}): Promise<Metadata> => {
  const blog = await getBlogData(lang, id);
  return {
    title: blog.title,
    openGraph: {
      title: blog.title,
      images: `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}${(blog.photo as Photo).url}`,
      type: "website",
      locale: lang,
    },
    alternates: {
      languages: {
        ...Object.fromEntries(
          locales.map((locale) => [locale, `/${locale}/blog/${id}`]),
        ),
        "x-default": `/blog/${id}`,
      },
    },
  };
};

export const generateStaticParams = async ({
  params: { lang },
}: {
  params: { lang: SupportedLanguage };
}) => {
  const { docs: blogs } = await getBlogsData(lang);

  return blogs.map((blog) => {
    return locales.map((locale) => ({
      lang: locale,
      id: blog.id,
    }));
  });
};

const Page = async ({
  params: { lang, id },
}: {
  params: { lang: SupportedLanguage; id: string };
}) => {
  const t = await getDictionary(lang);
  const blog = await getBlogData(lang, id);
  return (
    <>
      <div className="relative">
        <Navbar t={t} lang={lang} variant={"dark"} />
      </div>
      <div className="pt-36 pb-16 sm:pt-20 w-full sm:w-10/12 max-w-screen-xl mx-auto">
        <div className="my-10">
          <h1 className="font-serif text-4xl mb-5 sm:text-pretty">
            {blog.title}
          </h1>
          {!blog.hiddenPost && (
            <h3 className="mt-5 text-dark-3 text-pretty">
              {t.Blog.published}: {formatDate(blog.createdAt)}
            </h3>
          )}
        </div>
        <div className={"relative block aspect-video"}>
          <Image
            src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}${(blog.photo as Photo).url}`}
            alt={`${blog.title} blog photo`}
            fill
            sizes={"(min-width: 1280px) 1280px, 100vw"}
            style={{
              objectFit: "cover",
            }}
            priority
          />
        </div>

        <div className="mt-8">{serializeCMSContent(blog.content)}</div>
      </div>
    </>
  );
};

export default Page;
