"use client";

import React from "react";
import Image from "next/image";
import { Dictionary } from "@/lib/types/definitions";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useFormsContext } from "@/components/providers/FormsProvider";

import WalletSVG from "@/public/wallet.svg";
import MinusSVG from "@/public/minus.svg";
import GoalsSVG from "@/public/goals.svg";
import { AmmenityItem, Icon } from "@/lib/types/payload-types";

const FilterForm = ({
  t,
  ammenities,
}: {
  t: Dictionary["Search"];
  ammenities: AmmenityItem[];
}) => {
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

    // filterFormData.keys().forEach((key) => {
    //   const newValue = filterFormData.get(key) || "";
    //   params.set(key, newValue.toString());
    // });

    // filterFormData
    const minPrice = filterFormData.get("minPrice") || "";
    const maxPrice = filterFormData.get("maxPrice") || "";

    params.set("minPrice", minPrice.toString());
    params.set("maxPrice", maxPrice.toString());

    const ammenities = Array.from(filterFormData.keys())
      .map((key) => {
        if (!["minPrice", "maxPrice"].includes(key)) return key;
      })
      .filter((key) => key != undefined);

    // params.set("ammenities", ammenities.join(","));
    // params.set("page", "1");

    params.delete("page");

    const newURL = `${pathname}?${params.toString()}&ammenities=${ammenities.join(",")}&page=1`;

    // replace(`${pathname}?${params.toString()}`);
    replace(newURL);
  };

  return (
    <form
      onSubmit={handleSearch}
      ref={filterFormRef}
      className="p-5 flex flex-col gap-5 bg-light-1 text-dark-3 border border-dark-5 border-opacity-50 shadow-drop-shadow-1"
    >
      <h2 className="font-serif text-xl text-dark-5">{t.filter}</h2>
      <div className="flex items-center">
        <div className="w-6 h-6 relative">
          <Image
            unoptimized
            src={WalletSVG}
            alt={"Price icon"}
            fill
            style={{ objectFit: "cover" }}
          />
        </div>

        <div className="ml-2.5">{t.pricePerNight}</div>
      </div>
      <div className="flex gap-2.5 items-center">
        <div>
          <label htmlFor="minPrice">{t.minimum}</label>
          <input
            type="number"
            id={"minPrice"}
            name="minPrice"
            className="block w-full bg-transparent py-2.5 border-b-dark-3 border-0 border-b text-dark-5"
            placeholder="0"
            defaultValue={query.minPrice}
          />
        </div>
        <div className="w-5 h-5 relative">
          {" "}
          <Image
            unoptimized
            src={MinusSVG}
            alt={""}
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
        <div>
          <label htmlFor="maxPrice">{t.maximum}</label>
          <input
            type="number"
            id={"maxPrice"}
            name="maxPrice"
            className="block w-full bg-transparent py-2.5 border-b-dark-3 border-0 border-b text-dark-5"
            placeholder="0"
            defaultValue={query.maxPrice}
          />
        </div>
      </div>
      <div className="flex items-center">
        <div className="w-6 h-6 relative">
          <Image
            unoptimized
            src={GoalsSVG}
            alt={"Amenities icon"}
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="ml-2.5">{t.amenities}</div>
      </div>
      <div>
        {ammenities &&
          ammenities.map((ammenity) => {
            return (
              <div
                key={ammenity.id}
                className="flex justify-between items-center"
              >
                <div className="flex items-center">
                  <div className="w-3 h-3 relative mr-2.5">
                    <Image
                      unoptimized
                      src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL_ONE_ONLY}${(ammenity.icon as Icon).url}`}
                      fill
                      style={{
                        objectFit: "cover",
                      }}
                      alt=""
                    />
                  </div>
                  <label htmlFor={ammenity.id}>{ammenity.ammenity}</label>
                </div>
                <input
                  type="checkbox"
                  id={ammenity.id}
                  name={ammenity.id}
                  defaultChecked={query[ammenity.id] === "on"}
                />
              </div>
            );
          })}
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

export default FilterForm;
