import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { VscArrowRight, VscArrowLeft } from "react-icons/vsc";

const API = "https://api.escuelajs.co/api/v1";

export default function Pagination({ data }) {
  const { pathname } = useLocation();

  const itemsPerPage = 10;
  const [currPage, setCurrPage] = useState(1);

  const offset = (currPage - 1) * itemsPerPage;
  const totalPages = Math.ceil(100 / itemsPerPage); //change the static number to data.length

  // fetch the date from the server and save it in a state
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `${API}${pathname}?offset=${offset}&limit=${itemsPerPage}`
        );
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await res.json();
        // set the data state with the result
        console.log(result);
      } catch (err) {
        console.log(err.message);
      }
    };

    fetchData();
  }, [currPage]);

  // handle next and prev page in pagination btns
  const handlePrev = () => {
    if (currPage > 1) {
      setCurrPage(currPage - 1);
    }
  };

  const handleNext = () => {
    if (currPage < totalPages) {
      setCurrPage(currPage + 1);
    }
  };

  return (
    <div className="flex flex-col gap-4 items-center justify-center overflow-auto">
      <div className="flex justify-center gap-4">
        <button
          className="text-black text-xl dark:text-white cursor-pointer"
          onClick={handlePrev}
        >
          <VscArrowLeft />
        </button>
        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            className={`p-2 rounded-lg cursor-pointer transition-all hover:bg-gray-400 ${
              currPage === i + 1
                ? "bg-gray-600 text-white hover:bg-gray-600"
                : "bg-gray-300"
            }`}
            key={i + 1}
            onClick={() => setCurrPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
        <button
          className="text-black text-xl dark:text-white cursor-pointer"
          onClick={handleNext}
        >
          <VscArrowRight />
        </button>
      </div>

      <p className="text-black dark:text-white">
        Page {currPage} of {totalPages}
      </p>
    </div>
  );
}
