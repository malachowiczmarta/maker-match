import { useState, useEffect } from "react";
import classNames from "classnames";
import Link from "next/link";

type PaginationProps = {
  pagesCount: number;
  href: string;
  currentPage?: string;
  filters?: string[];
};

const Pagination = ({
  pagesCount,
  href,
  currentPage = "1",
  filters = [],
}: PaginationProps) => {
  const [pages, setPages] = useState<number[]>([]);

  const paginationUrl = (page: number) => {
    let url = `${href}?page=${page}`;
    filters.forEach((fil) => (url = `${url}&${fil}`));

    return url;
  };

  useEffect(() => {
    const tmpPages = [];
    for (let i = 0; i < pagesCount; i++) {
      tmpPages.push(i + 1);
    }
    setPages(tmpPages);
  }, [pagesCount]);

  return (
    <ul className="flex mt-5 justify-center">
      {pages.map((page) => {
        return (
          <li
            key={page}
            className={classNames(
              "mx-1 px-3 py-2 text-gray-700 hover:bg-gray-700 hover:text-gray-200 rounded-lg",
              {
                "bg-gray-200": Number(currentPage) !== page,
                "bg-gray-400": Number(currentPage) === page,
              }
            )}
          >
            <Link href={paginationUrl(page)} className="font-bold">
              {page}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default Pagination;
