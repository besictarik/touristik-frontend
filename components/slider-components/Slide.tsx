"use client";

import React from "react";
import { Slide as SlideClient } from "react-scroll-snap-anime-slider";

export const Slide = ({ children }: { children: React.ReactNode }) => {
  return <SlideClient>{children}</SlideClient>;
};
