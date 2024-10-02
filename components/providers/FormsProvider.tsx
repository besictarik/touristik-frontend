"use client";

import { createContext, useContext, useRef } from "react";

type FormsContextProviderType = {
  searchFormRef: React.RefObject<HTMLFormElement>;
  filterFormRef: React.RefObject<HTMLFormElement>;
};

const FormsContext = createContext<FormsContextProviderType | undefined>(
  undefined,
);

export const FormsProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const searchFormRef = useRef<HTMLFormElement>(null);
  const filterFormRef = useRef<HTMLFormElement>(null);

  return (
    <FormsContext.Provider value={{ searchFormRef, filterFormRef }}>
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
