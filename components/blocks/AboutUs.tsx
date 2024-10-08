import { Index, Photo } from "@/lib/types/payload-types";
import Image from "next/image";

type BlockType = Extract<Index["blocks"][number], { blockType: "about-us" }>;

const AboutUs = ({ block }: { block: BlockType }) => {
  return (
    <div className="m-20 sm:m-0 sm:my-10">
      <div className="w-full max-w-screen-xl sm:w-10/12 mx-auto">
        <div className="flex flex-col">
          <div className="sticky top-10 flex sm:flex-col items-center gap-5">
            <div className="h-[5px] w-[100px] bg-dark-1" />
            <h2 className="text-dark-3 text-4xl font-serif font-bold">
              {block.title}
            </h2>
          </div>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-1 mt-10 gap-10">
          <p className={"text-[17px] leading-[28px]"}>{block.paragraph}</p>
          {block.employees.map((employee) => {
            return (
              <div key={employee.id}>
                <div className="w-full sm:h-[300px] h-[500px] relative ">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}${(employee.photo as Photo).url}`}
                    alt={`${employee.employeeName} photo`}
                    fill
                    sizes={"(max-width: 640px) 100vw, 400px"}
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <h3 className="mt-5 text-2xl">{employee.employeeName}</h3>
                <span className={"italic"}>CEO</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
