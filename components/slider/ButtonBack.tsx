"use client";

import React from "react";
import { ButtonBack as ButtonBackClient } from "react-scroll-snap-anime-slider";

export const ButtonBack = ({ children }: { children: React.ReactNode }) => {
  return <ButtonBackClient>{children}</ButtonBackClient>;
};
