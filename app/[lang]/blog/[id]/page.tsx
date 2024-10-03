import Banner from "@/components/Banner";
import { SupportedLanguage } from "@/lib/types/definitions";
import Navbar from "@/components/Navbar";
import { formatDate, getDictionary } from "@/lib/utils";
import Image from "next/image";
import NeedHelp from "@/components/NeedHelp";
import Footer from "@/components/Footer";
import { getBlogData } from "@/lib/data";
import { Photo } from "@/lib/types/payload-types";
import { serializeCMSContent } from "@/lib/cms-helpers";

const Page = async ({
  params: { lang },
}: {
  params: { lang: SupportedLanguage; id: string };
}) => {
  const t = await getDictionary(lang);
  const blog = await getBlogData();
  return (
    <div className={"bg-light-3"}>
      <Banner lang={lang} />
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
        <Image
          unoptimized
          src={`${process.env.IMAGE_BASE_URL}${(blog.photo as Photo).url}`}
          alt={`${blog.title} blog photo`}
          width={(blog.photo as Photo).width!}
          height={(blog.photo as Photo).height!}
          className="aspect-video object-cover"
          priority
        />
        <div className="mt-8">{serializeCMSContent(blog.content)}</div>
      </div>
      <NeedHelp lang={lang} />
      <Footer lang={lang} />
    </div>
  );
};

export default Page;
