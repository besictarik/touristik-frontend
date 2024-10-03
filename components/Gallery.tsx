"use client";

import { Listing, Photo } from "@/lib/types/payload-types";
import { useEffect } from "react";
import PhotoSwipeLightbox from "photoswipe/lightbox";
import "photoswipe/style.css";

const Gallery = ({
  text,
  photos,
}: {
  text: string;
  photos: Listing["photos"];
}) => {
  useEffect(() => {
    let lightbox: PhotoSwipeLightbox | null = new PhotoSwipeLightbox({
      gallery: "#gallery",
      children: "a",
      showHideAnimationType: "none",
      pswpModule: () => import("photoswipe"),
    });
    lightbox.init();

    return () => {
      lightbox!.destroy();
      lightbox = null;
    };
  }, []);

  return (
    <div id="gallery">
      <a
        href={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL_ONE_ONLY}${(photos[0].photo as Photo).url}`}
        data-pswp-width={(photos[0].photo as Photo).width}
        data-pswp-height={(photos[0].photo as Photo).height}
        target="_blank"
      >
        <div className="bg-dark-5 inline-block text-light-1 p-4 bg-opacity-50 border border-dark-5 border-opacity-50 underline">
          {text}
        </div>
      </a>
      {photos.slice(1).map((photo) => (
        <a
          key={photo.id}
          href={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL_ONE_ONLY}${(photo.photo as Photo).url}`}
          data-pswp-width={`${(photo.photo as Photo).width}`}
          data-pswp-height={`${(photo.photo as Photo).height}`}
          target="_blank"
        ></a>
      ))}
    </div>
  );
};

export default Gallery;
