"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

const Pagination = ({ totalPages }: { totalPages: number }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const prevPage = page > 1 ? page - 1 : null;
  const nextPage = page < totalPages ? page + 1 : null;

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  return (
    <div className="grid grid-cols-3 mx-auto">
      {prevPage && <Link href={createPageURL(prevPage)}>←</Link>}
      <ul className="flex gap-2 flex-wrap">
        {[...Array(totalPages)].map((_, index) => {
          const pageNumber = index + 1;
          return (
            <li key={index}>
              <Link
                className={`${page === pageNumber && "underline"}`}
                href={createPageURL(pageNumber)}
              >
                {pageNumber}
              </Link>
            </li>
          );
        })}
      </ul>
      {nextPage && (
        <Link className={"text-center"} href={createPageURL(nextPage)}>
          →
        </Link>
      )}
    </div>
  );
};

export default Pagination;
