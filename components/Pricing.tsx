import { Listing } from "@/lib/types/payload-types";
import { Dictionary } from "@/lib/types/definitions";

const Pricing = ({
  t,
  pricing,
}: {
  t: Dictionary["Listing"];
  pricing: Listing["pricing"];
}) => {
  return (
    <div>
      <h2 className="text-xl font-serif mb-5">{t.pricing}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-1 gap-5">
        {pricing.map((pricingItem) => {
          return (
            <div
              className="p-5 bg-light-1 border border-dark-5 border-opacity-50 shadow-drop-shadow-1"
              key={pricingItem.id}
            >
              <div className="flex justify-between">
                <span className="text-lg font-bold basis-1/2">
                  {pricingItem.periodName}
                </span>
                <span className="text-right basis-1/2">
                  €{pricingItem.price}{" "}
                  {pricingItem.priceType === "night"
                    ? `/ ${t.night}`
                    : `/ ${t.week}`}
                </span>
              </div>
              <div>{pricingItem.period}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Pricing;
