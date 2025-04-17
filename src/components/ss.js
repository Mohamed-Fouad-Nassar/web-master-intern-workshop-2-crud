import { useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { VscArrowRight, VscArrowLeft } from "react-icons/vsc";

const API = "https://api.escuelajs.co/api/v1";

export default function Pagination({ setData }) {
  const { pathname } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const itemsPerPage = 10;
  const [currPage, setCurrPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [offset, setOffset] = useState((currPage - 1) * itemsPerPage);

  const offsetParam = offset || searchParams.get("offset");
  const limitParam = itemsPerPage || searchParams.get("limit");

  // fetch to get total items from the data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${API}${pathname}`);
        const fullData = await res.json();
        setTotalPages(Math.ceil(fullData.length / itemsPerPage));
      } catch (err) {
        console.log("Pagination fetch error:", err.message);
      }
    };
    fetchData();
  }, [pathname]);

  // Fetch data for curr selcted pagiantion page
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `${API}${pathname}?offset=${offsetParam}&limit=${limitParam}`
        );
        const result = await res.json();
        setData(result);
        console.log(result);
      } catch (err) {
        console.log("Pagination fetch error:", err.message);
      }
    };

    fetchData();

    // Update URL with new search params

    const newParams = new URLSearchParams(searchParams);
    newParams.set("offset", offset);
    newParams.set("limit", itemsPerPage);

    setSearchParams(newParams);
  }, [offsetParam, pathname, currPage]);

  const handlePrev = () => {
    if (currPage > 1) {
      setCurrPage(currPage - 1);
      setOffset((currPage - 1) * itemsPerPage);
    }
  };

  const handleNext = () => {
    if (currPage < totalPages) {
      setCurrPage(currPage + 1);
      setOffset((currPage - 1) * itemsPerPage);
    }
  };

  return (
    <div className="flex flex-col gap-4 items-center justify-center overflow-auto">
      {/* Pagination Controls */}
      <div className="flex justify-center gap-4 mt-4">
        <button
          className="text-black text-xl dark:text-white cursor-pointer"
          onClick={handlePrev}
        >
          <VscArrowLeft />
        </button>
        {/* remove from small screens */}
        <div className="max-lg:hidden flex items-center gap-4">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              className={`cursor-pointer p-2 rounded-lg transition-all hover:bg-gray-400 ${
                currPage === i + 1
                  ? "bg-gray-600 text-white"
                  : "bg-gray-300 text-black"
              }`}
              onClick={() => {
                setCurrPage(i + 1);

              }}
            >
              {i + 1}
            </button>
          ))}
        </div>
        {/* on small screens */}
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
