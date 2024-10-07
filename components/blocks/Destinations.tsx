import { Index, Photo } from "@/lib/types/payload-types";
import Link from "next/link";
import Image from "next/image";

type BlockType = Extract<
  Index["blocks"][number],
  { blockType: "destinations" }
>;

const Destinations = ({ block }: { block: BlockType }) => {
  return (
    <div className="bg-dark-3">
      <div className="flex flex-col gap-5 w-full max-w-screen-xl sm:w-10/12 mx-auto py-20">
        <div className="flex sm:flex-col gap-5 items-center">
          <div className="h-[5px] w-[100px] sm:w-full bg-dark-1" />
          <h2 className="text-light-3 text-3xl font-serif font-bold">
            {block.title}
          </h2>
        </div>
        <p className="text-light-1">{block.subtitle}</p>
        <div className="grid grid-cols-4 sm:grid-cols-1 gap-5">
          {block.destinationsList.map((destination) => {
            return (
              <Link key={destination.id} href={`${destination.link}`}>
                <div className="relative h-[300px]">
                  <Image
                    src={`${process.env.IMAGE_BASE_URL}${(destination.photo as Photo).url}`}
                    alt={`${destination.location} photo`}
                    fill
                    sizes={"600px"}
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <h2 className="block bg-light-1 p-5">{`${destination.location}`}</h2>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Destinations;
