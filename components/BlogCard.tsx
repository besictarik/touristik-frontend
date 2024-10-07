import React from "react";
import Image from "next/image";
import { Blog, Photo } from "@/lib/types/payload-types";
import { formatDate, getDictionary } from "@/lib/utils";
import { SupportedLanguage } from "@/lib/types/definitions";

const BlogCard = async ({
  lang,
  blog,
}: {
  lang: SupportedLanguage;
  blog: Blog;
}) => {
  const t = await getDictionary(lang);
  return (
    <div>
      <div className={"relative block aspect-video"}>
        <Image
          src={`${process.env.IMAGE_BASE_URL}${(blog.photo as Photo).url}`}
          alt={`${blog.title} blog photo`}
          fill
          sizes={"(max-width: 640px) 100vw, 630px"}
          style={{
            objectFit: "cover",
          }}
        />
      </div>

      <h3 className="mt-5 text-dark-3 text-pretty">
        {t.Blog.published}: {formatDate(blog.createdAt)}
      </h3>
      <h2 className="mt-2.5 font-serif text-2xl">{blog.title}</h2>
    </div>
  );
};

export default BlogCard;
