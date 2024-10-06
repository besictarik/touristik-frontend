"use client";

import Image from "next/image";
import ArrowBack from "@/public/001-back.svg";
import ArrowNext from "@/public/002-next.svg";
import {
  ButtonBack,
  ButtonNext,
  Carousel,
  Slide,
  Slider,
} from "react-scroll-snap-anime-slider";
import React, { useEffect, useState, useRef } from "react";

export const SliderProvider = ({
  title,
  total,
  visible,
  step,
  children,
}: {
  title: string;
  total: number;
  visible: number;
  step: number;
  children: React.ReactNode;
}) => {
  const sliderRef = useRef<Slider>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const slider = sliderRef.current;
      if (slider) {
        const maxSlideIndex = total - visible;
        let nextSlideIndex = currentSlide + 1;
        nextSlideIndex = nextSlideIndex > maxSlideIndex ? 0 : nextSlideIndex;
        slider.slideTo(nextSlideIndex);
        setCurrentSlide(nextSlideIndex); // Update current slide
      }
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, [currentSlide, total, visible]);

  return (
    <Carousel
      totalSlides={total}
      visibleSlides={visible}
      step={step}
      currentSlide={currentSlide}
      onSlide={({ currentSlide }) => {
        setCurrentSlide(currentSlide); // Update state when slide changes
      }}
    >
      <div className="sm:text-balance w-full max-w-screen-xl sm:w-10/12 mx-auto mt-10 mb-5 flex justify-between uppercase font-bold text-light-5">
        <h2>{title}</h2>
        <div className="flex gap-5">
          <ButtonBack>
            <Image
              src={ArrowBack}
              alt={"Go back to the previous image"}
              width={16}
              height={16}
            />
          </ButtonBack>
          <ButtonNext>
            <Image
              src={ArrowNext}
              alt={"Go to the next image"}
              width={16}
              height={16}
            />
          </ButtonNext>
        </div>
      </div>
      <div className={"absolute min-h-full h-0 w-full"}>
        <Slider
          ref={sliderRef}
          className={"max-w-screen-xl mx-auto sm:w-10/12"}
        >
          {children}
        </Slider>
      </div>
    </Carousel>
  );
};

export const SlideServer = ({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element => {
  return <Slide>{children}</Slide>;
};
