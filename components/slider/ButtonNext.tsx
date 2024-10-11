"use client";

import React from "react";
import { ButtonNext as ButtonNextClient } from "react-scroll-snap-anime-slider";

export const ButtonNext = ({ children }: { children: React.ReactNode }) => {
  return <ButtonNextClient>{children}</ButtonNextClient>;
};
