"use client";

import React from "react";
import Image from "next/image";
import { Dictionary } from "@/lib/types/definitions";
import { useSearchParams } from "next/navigation";
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
  const { filterFormRef, handleSearch } = useFormsContext();

  const query = Object.fromEntries(searchParams);
  const queryAmmenities = query.ammenities?.split(",") || [];

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
            className="block w-full bg-transparent py-2.5 sm:py-1 border-b-dark-3 border-0 border-b text-dark-5"
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
            className="block w-full bg-transparent py-2.5 sm:py-1 border-b-dark-3 border-0 border-b text-dark-5"
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
                  <div className="w-4 h-4 relative mr-2.5">
                    <Image
                      unoptimized
                      src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}${(ammenity.icon as Icon).url}`}
                      fill
                      style={{
                        objectFit: "cover",
                      }}
                      alt=""
                    />
                  </div>
                  <label
                    htmlFor={ammenity.id}
                    className={"text-[18px] leading-8 "}
                  >
                    {ammenity.ammenity}
                  </label>
                </div>
                <input
                  type="checkbox"
                  id={ammenity.id}
                  name={ammenity.id}
                  defaultChecked={queryAmmenities.includes(ammenity.id)}
                  className="h-4 w-4 focus:ring-dark-3 appearance-none rounded border border-dark-3 checked:bg-dark-3 checked:border-transparent cursor-pointer"
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
