import { useEffect, useState } from "react";
import { VscArrowRight, VscArrowLeft } from "react-icons/vsc";
import { useLocation, useSearchParams } from "react-router";
import { getProductsCount } from "../services/productsAPI";

const itemsPerPage = 10; // Number of items per page

export default function Pagination() {
  const { pathname } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const [currPage, setCurrPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // update `currPage` based on `offset` and `limit` from the URL
  useEffect(() => {
    setCurrPage(
      Math.floor(
        (searchParams.get("offset") || 0) /
          (searchParams.get("limit") || itemsPerPage)
      ) + 1
    );
  }, [searchParams]);

  // Fetch total items to calculate total pages
  useEffect(() => {
    const minPrice = searchParams.get("price_min");
    const maxPrice = searchParams.get("price_max");

    async function getFullData() {
      try {
        const fullData = await getProductsCount({ minPrice, maxPrice });
        setTotalPages(Math.ceil(fullData.length / itemsPerPage));
      } catch (err) {
        console.error("Failed to fetch total product count:", err);
      }
    }
    getFullData();
  }, [pathname, searchParams]);

  // Handle page change and update search params
  const handlePageChange = (page) => {
    setCurrPage(page);

    const newParams = new URLSearchParams(searchParams);
    newParams.set("offset", (page - 1) * itemsPerPage);
    newParams.set("limit", itemsPerPage);
    setSearchParams(newParams);
  };

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
        <button
          className="text-black text-xl dark:text-white cursor-pointer"
          onClick={handlePrev}
        >
          <VscArrowLeft />
        </button>
        <div className="max-lg:hidden flex items-center gap-4">
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
        </div>
        <div className="lg:hidden text-black dark:text-white">
          <button>{currPage}</button>
        </div>
        <button
          className="text-black text-xl dark:text-white cursor-pointer"
          onClick={handleNext}
        >
          <VscArrowRight />
        </button>
      </div>

      <p className="text-black dark:text-white mt-2">
        Page {currPage} of {totalPages}
      </p>
    </div>
  );
}
