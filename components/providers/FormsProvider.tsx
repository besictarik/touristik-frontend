"use client";

import React, { createContext, useContext, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";

type FormsContextProviderType = {
  searchFormRef: React.RefObject<HTMLFormElement>;
  filterFormRef: React.RefObject<HTMLFormElement>;
  handleSearch: (e: React.FormEvent<HTMLFormElement>) => void;
};

const FormsContext = createContext<FormsContextProviderType | undefined>(
  undefined,
);

export const FormsProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const pathname = usePathname();
  const { replace } = useRouter();

  const searchFormRef = useRef<HTMLFormElement>(null);
  const filterFormRef = useRef<HTMLFormElement>(null);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const params = new URLSearchParams();

    const searchFormData = new FormData(searchFormRef.current!);
    const filterFormData = new FormData(filterFormRef.current!);

    // Update params from search form
    Array.from(searchFormData.keys()).forEach((key) => {
      const newValue = searchFormData.get(key);
      if (newValue) params.set(key, newValue.toString());
    });

    // Update params from filter form
    const minPrice = filterFormData.get("minPrice");
    const maxPrice = filterFormData.get("maxPrice");

    if (minPrice) params.set("minPrice", minPrice.toString());
    if (maxPrice) params.set("maxPrice", maxPrice.toString());

    const ammenities = Array.from(filterFormData.keys())
      .map((key) => {
        if (!["minPrice", "maxPrice"].includes(key)) return key;
      })
      .filter((key) => key != undefined);

    if (ammenities.length) params.set("ammenities", ammenities.join(","));

    if (params.size) params.set("page", "1");

    replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <FormsContext.Provider
      value={{ searchFormRef, filterFormRef, handleSearch }}
    >
      {children}
    </FormsContext.Provider>
  );
};

export const useFormsContext = () => {
  const context = useContext(FormsContext);
  if (!context) {
    throw new Error("useFormsContext must be used within FormsProvider");
  }
  return context;
};
