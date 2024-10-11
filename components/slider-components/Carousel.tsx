"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  Carousel as CarouselClient,
  Slider,
} from "react-scroll-snap-anime-slider";

type SliderContextProviderType = {
  sliderRef: React.RefObject<Slider>;
};

const SliderContext = createContext<SliderContextProviderType | undefined>(
  undefined,
);

export const Carousel = ({
  children,
  autoscroll,
  totalSlides,
  visible,
  step,
  slideMargin,
  trayPadding,
}: Readonly<{
  children: React.ReactNode;
  autoscroll?: boolean;
  totalSlides: number;
  visible: number;
  step: number;
  slideMargin?: string;
  trayPadding?: string;
}>) => {
  const sliderRef = useRef<Slider>(null);
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  useEffect(() => {
    if (!autoscroll) return;
    const interval = setInterval(() => {
      const slider = sliderRef.current;
      if (slider) {
        const maxSlideIndex = totalSlides - visible;
        let nextSlideIndex = currentSlide + 1;
        nextSlideIndex = nextSlideIndex > maxSlideIndex ? 0 : nextSlideIndex;
        slider.slideTo(nextSlideIndex);
        setCurrentSlide(nextSlideIndex); // Update current slide
      }
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, [autoscroll, currentSlide, totalSlides, visible]);

  return (
    <CarouselClient
      totalSlides={totalSlides}
      visibleSlides={visible}
      step={step}
      slideMargin={slideMargin}
      trayPadding={trayPadding}
      currentSlide={currentSlide}
      onSlide={({ currentSlide }) => {
        setCurrentSlide(currentSlide); // Update state when slide changes
      }}
    >
      <SliderContext.Provider value={{ sliderRef }}>
        {children}
      </SliderContext.Provider>
    </CarouselClient>
  );
};

export const useSliderContext = () => {
  const context = useContext(SliderContext);
  if (!context) {
    throw new Error("useSliderContext must be used within SliderProvider");
  }
  return context;
};
