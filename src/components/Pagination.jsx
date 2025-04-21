import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { HiArrowRight, HiArrowLeft } from "react-icons/hi2";

import Button from "./Button";

import { getProductsCount } from "../services/productsAPI";

import { ITEMS_PER_PAGE } from "../utils/helpers";

export default function Pagination() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [currPage, setCurrPage] = useState(
    Math.floor(searchParams.get("page")) || 1
  );
  const [totalPages, setTotalPages] = useState(1);

  // Fetch total items to calculate total pages
  useEffect(() => {
    const minPrice = searchParams.get("price_min");
    const maxPrice = searchParams.get("price_max");
    const category = searchParams.get("category");

    const query = searchParams.get("query");

    // set current page to 1 if not set in url params
    setCurrPage(Math.floor(searchParams.get("page")) || 1);

    async function getFullProductsCount() {
      try {
        const fullProductsCount = await getProductsCount(
          { minPrice, maxPrice, category },
          query
        );
        setTotalPages(Math.ceil(fullProductsCount / ITEMS_PER_PAGE));
      } catch (err) {
        console.error("Failed to fetch total product count:", err);
      }
    }
    getFullProductsCount();
  }, [searchParams]);

  // Handle page change and update search params
  const handlePageChange = (page) => {
    setCurrPage(page);
    const newParams = new URLSearchParams(searchParams);
    newParams.set("page", page);
    setSearchParams(newParams);
  };

  // handle previous and next page actions
  const handlePrev = () => {
    if (currPage > 1) handlePageChange(currPage - 1);
  };

  const handleNext = () => {
    if (currPage < totalPages) handlePageChange(currPage + 1);
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex flex-col gap-4 items-center justify-center overflow-auto">
      <div className="flex justify-center gap-4 mt-4">
        <Button onClick={handlePrev} className="!p-3 !text-base">
          <HiArrowLeft />
        </Button>

        <div className="max-lg:hidden flex items-center gap-2">
          {Array.from({ length: totalPages }).map((_, i) => (
            <Button
              key={i}
              className="!p-3 !text-base"
              onClick={() => handlePageChange(i + 1)}
              variation={currPage === i + 1 ? "primary" : "secondary"}
            >
              {i + 1}
            </Button>
          ))}
        </div>
        <div className="lg:hidden text-black dark:text-white">
          <p className="py-3 px-2">{currPage}</p>
        </div>

        <Button onClick={handleNext} className="!p-3 !text-base">
          <HiArrowRight />
        </Button>
      </div>
      <p className="text-black dark:text-white mt-2">
        Page {currPage} of {totalPages}
      </p>
    </div>
  );
}
