import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
// import { VscArrowRight, VscArrowLeft } from "react-icons/vsc";
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

  // // update `currPage` based on `offset` and `limit` from the URL
  // useEffect(() => {
  //   setCurrPage(Math.floor(searchParams.get("page") || currPage));
  // }, [searchParams]);

  // Fetch total items to calculate total pages
  useEffect(() => {
    const minPrice = searchParams.get("price_min");
    const maxPrice = searchParams.get("price_max");

    async function getFullData() {
      try {
        const fullData = await getProductsCount({ minPrice, maxPrice });
        setTotalPages(Math.ceil(fullData.length / ITEMS_PER_PAGE));
      } catch (err) {
        console.error("Failed to fetch total product count:", err);
      }
    }
    getFullData();
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
    if (currPage > 1) {
      handlePageChange(currPage - 1);
    }
  };

  const handleNext = () => {
    if (currPage < totalPages) {
      handlePageChange(currPage + 1);
    }
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex flex-col gap-4 items-center justify-center overflow-auto">
      <div className="flex justify-center gap-4 mt-4">
        <Button onClick={handlePrev} className="!p-3 !text-base">
          <HiArrowLeft />
        </Button>
        {/* <button
          className="text-black text-xl dark:text-white cursor-pointer"
          onClick={handlePrev}
        >
          <HiArrowLeft />
        </button> */}
        <div className="max-lg:hidden flex items-center gap-2">
          {Array.from({ length: totalPages }).map((_, i) => (
            <Button
              key={i}
              // className={`cursor-pointer p-2 rounded-lg transition-all hover:bg-gray-400 ${
              //   currPage === i + 1
              //     ? "bg-gray-600 text-white"
              //     : "bg-gray-300 text-black"
              // }`}
              variation={currPage === i + 1 ? "primary" : "secondary"}
              className="!p-3 !text-base"
              onClick={() => handlePageChange(i + 1)}
            >
              {i + 1}
            </Button>
          ))}
        </div>
        {/* <div className="max-lg:hidden flex items-center gap-4">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              className={`cursor-pointer p-2 rounded-lg transition-all hover:bg-gray-400 ${
                currPage === i + 1
                  ? "bg-gray-600 text-white"
                  : "bg-gray-300 text-black"
              }`}
              onClick={() => handlePageChange(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </div> */}
        <div className="lg:hidden text-black dark:text-white">
          <p className="py-3 px-2">{currPage}</p>
        </div>
        <Button onClick={handleNext} className="!p-3 !text-base">
          <HiArrowRight />
        </Button>
        {/* <button
          className="text-black text-xl dark:text-white cursor-pointer"
          onClick={handleNext}
        >
          <HiArrowRight />
        </button> */}
      </div>

      <p className="text-black dark:text-white mt-2">
        Page {currPage} of {totalPages}
      </p>
    </div>
  );
}
