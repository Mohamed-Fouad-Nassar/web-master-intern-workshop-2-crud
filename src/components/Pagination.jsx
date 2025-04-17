import { useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { VscArrowRight, VscArrowLeft } from "react-icons/vsc";
import { getProducts } from "../services/productsAPI";

const API = "https://api.escuelajs.co/api/v1";
const itemsPerPage = 10;

export default function Pagination({ setData }) {
  const { pathname } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const offsetFromURL = Number(searchParams.get("offset")) || 0;
  const limitFromURL = Number(searchParams.get("limit")) || itemsPerPage;

  const [totalPages, setTotalPages] = useState(1);
  // sync URL param to current page
  const [currPage, setCurrPage] = useState(
    Math.floor(offsetFromURL / itemsPerPage) + 1
  );

  const offsetParam = (currPage - 1) * itemsPerPage;

  // get total items to calculate total pages
  useEffect(() => {
    async function getFullData() {
      try {
        const fullData = await getProducts();
        setTotalPages(Math.ceil(fullData.length / itemsPerPage));
      } catch (err) {
        console.error("Failed to fetch total product count:", err);
      }
    }

    getFullData();
  }, [pathname]);

  // fetch data when page changes
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `${API}${pathname}?offset=${offsetParam}&limit=${limitFromURL}`
        );
        const result = await res.json();
        setData(result);
      } catch (err) {
        console.error("Pagination fetch error:", err.message);
      }
    };

    fetchData();

    // update URL params
    const newParams = new URLSearchParams(searchParams);
    newParams.set("offset", offsetParam);
    newParams.set("limit", limitFromURL);
    setSearchParams(newParams);
  }, [currPage, pathname]);

  // handle prev and next buttons
  const handlePrev = () => {
    if (currPage > 1) setCurrPage(currPage - 1);
  };

  const handleNext = () => {
    if (currPage < totalPages) setCurrPage(currPage + 1);
  };

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
              onClick={() => setCurrPage(i + 1)}
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
