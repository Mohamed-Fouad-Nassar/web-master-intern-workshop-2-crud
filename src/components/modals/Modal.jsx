import { useContext } from "react";
import { useLocation } from "react-router";
import { HiOutlineXMark } from "react-icons/hi2";

import Spinner from "../Spinner";
import UserModal from "./UserModal";
import ProductModal from "./productModal";

import useGetData from "../../hooks/useGetData";
import { useCloseModal } from "../../hooks/useModal";

import AppContext from "../../contexts/AppContext";

export default function Modal() {
  const { pathname } = useLocation();
  const handelClose = useCloseModal();
  const { modalOpen, selectedId } = useContext(AppContext);

  // get the selected user || product data
  const { data } = useGetData(selectedId);

  return (
    <div
      className={`fixed inset-0 z-50 flex justify-center items-center transition-all ${
        modalOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      {/* modal */}
      <div className="bg-primary-bg dark:bg-primary-bg-dark pb-8 pt-0 min-w-1/2 min-h-1/2 max-w-5xl w-[90%] max-h-[90%] overflow-auto absolute rounded-md flex flex-col">
        {/* modal header */}
        <div className="py-4 px-10 bg-primary-bg dark:bg-primary-bg-dark z-50 sticky top-0 flex justify-between items-center text-primary-txt dark:text-white">
          <h2 className="text-xl font-medium">
            {pathname === "/users" ? "User" : "Product"} Details
          </h2>
          <button onClick={handelClose} className="text-2xl cursor-pointer">
            <HiOutlineXMark />
          </button>
        </div>

        {/* modal body */}
        <div className="px-10 flex flex-1 justify-center items-center mt-4">
          {data === undefined ? (
            <div className="text-black dark:text-white">
              no item was found with this id
            </div>
          ) : data === null ? (
            <div className="animate-spin text-4xl dark:text-white">
              <Spinner />
            </div>
          ) : (
            data &&
            (pathname === "/users" ? (
              <UserModal data={data} />
            ) : (
              <ProductModal data={data} />
            ))
          )}
        </div>
      </div>

      {/* overlay */}
      <div
        className="bg-black/60 dark:bg-[#2a2929]/80 w-full h-full"
        onClick={handelClose}
      ></div>
    </div>
  );
}
