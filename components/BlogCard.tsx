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
      <Image
        unoptimized
        src={`${process.env.IMAGE_BASE_URL}${(blog.photo as Photo).url}`}
        alt={`${blog.title} blog photo`}
        width={(blog.photo as Photo).width!}
        height={(blog.photo as Photo).height!}
        className="aspect-video object-cover"
      />
      <h3 className="mt-5 text-dark-3 text-pretty">
        {t.Blog.published}: {formatDate(blog.createdAt)}
      </h3>
      <h2 className="mt-2.5 font-serif text-2xl">{blog.title}</h2>
    </div>
  );
};

export default BlogCard;
