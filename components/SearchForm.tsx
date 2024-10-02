"use client";

import React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Dictionary } from "@/lib/types/definitions";
import { useFormsContext } from "@/components/providers/FormsProvider";

const SearchForm = ({ t }: { t: Dictionary["Search"] }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const { searchFormRef, filterFormRef } = useFormsContext();

  const query = Object.fromEntries(searchParams);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);

    const searchFormData = new FormData(searchFormRef.current!);
    const filterFormData = new FormData(filterFormRef.current!);

    searchFormData.keys().forEach((key) => {
      const newValue = searchFormData.get(key) || "";
      params.set(key, newValue.toString());
    });

    filterFormData.keys().forEach((key) => {
      const newValue = filterFormData.get(key) || "";
      params.set(key, newValue.toString());
    });

    replace(`${pathname}/${params.toString()}`);
  };

  // Fix unnecessary HTML code
  return (
    <form
      onSubmit={handleSearch}
      ref={searchFormRef}
      className="p-5 grid grid-cols-5 sm:grid-cols-1 gap-5 items-end bg-light-1 text-dark-3 border border-dark-5 border-opacity-50 shadow-drop-shadow-1"
    >
      <div>
        <div>
          <div></div>
          <label htmlFor="location">{t.location}</label>
        </div>
        <input
          type="text"
          id={"location"}
          name="location"
          className="sm:rounded-none block w-full bg-transparent py-2.5 border-b-dark-3 border-0 border-b"
          defaultValue={query.location}
        />
      </div>
      <div>
        <div>
          <div></div>
          <label htmlFor="rooms">{t.rooms}</label>
        </div>
        <input
          type="number"
          id={"rooms"}
          name="rooms"
          className="sm:rounded-none block w-full bg-transparent py-2.5 border-b-dark-3 border-0 border-b"
          defaultValue={query.rooms}
        />
      </div>
      <div>
        <div>
          <div></div>
          <label htmlFor="bathrooms">{t.bathrooms}</label>
        </div>
        <input
          type="number"
          id={"bathrooms"}
          name="bathrooms"
          className="sm:rounded-none block w-full bg-transparent py-2.5 border-b-dark-3 border-0 border-b"
          defaultValue={query.bathrooms}
        />
      </div>
      <div>
        <div>
          <div></div>
          <label htmlFor="guests">{t.guests}</label>
        </div>
        <input
          type="number"
          id={"guests"}
          name="guests"
          className="sm:rounded-none block w-full bg-transparent py-2.5 border-b-dark-3 border-0 border-b"
          defaultValue={query.guests}
        />
      </div>
      <button
        type="submit"
        className="flex p-5 justify-center items-center bg-dark-3 text-white"
      >
        {t.search}
      </button>
    </form>
  );
};

export default SearchForm;
