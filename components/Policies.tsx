import { Dictionary } from "@/lib/types/definitions";
import { Icon, Listing } from "@/lib/types/payload-types";
import Image from "next/image";

const Policies = ({
  title,
  policies,
}: {
  title: Dictionary["Listing"]["policies"];
  policies: Listing["policies"];
}) => {
  return (
    <div>
      <h2 className="text-xl font-serif mb-5">{title}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-1 p-5 gap-5 bg-light-1 border border-dark-5 border-opacity-50 shadow-drop-shadow-1">
        {policies.map((policy) => {
          return (
            <div key={policy.id} className="flex items-center">
              <Image
                unoptimized
                src={`${process.env.IMAGE_BASE_URL}${(policy.icon as Icon).url}`}
                alt={`${(policy.icon as Icon).iconName} icon`}
                width={24}
                height={24}
                style={{ objectFit: "contain" }}
              />
              <p className="ml-2.5">{policy.text}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Policies;
