"use client";

import React from "react";
import { Slider as SliderClient } from "react-scroll-snap-anime-slider";
import { useSliderContext } from "@/components/slider/Carousel";

export const Slider = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const { sliderRef } = useSliderContext();
  return (
    <SliderClient ref={sliderRef} className={className}>
      {children}
    </SliderClient>
  );
};
