import { useLocation } from "react-router";
import { useContext } from "react";
import { VscLoading, VscChromeClose } from "react-icons/vsc";

import useGetData from "../../hooks/useGetData";
import { useCloseModal } from "../../hooks/useModal";

import AppContext from "../../context/AppContext";
import ProductModal from "./productModal";
import UserModal from "./UserModal";

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
      <div className="bg-primary-bg dark:bg-primary-bg-dark px-10 py-8 min-w-1/2 min-h-1/2 max-w-7xl absolute rounded-md flex flex-col">
        {/* modal header */}
        <div className="flex justify-end text-primary-txt dark:text-white">
          <button onClick={handelClose} className="text-2xl cursor-pointer">
            <VscChromeClose />
          </button>
        </div>

        {/* modal body */}
        <div className="flex flex-1 justify-center items-center mt-4">
          {data === undefined ? (
            <div className="text-black dark:text-white">
              no item was found with this id
            </div>
          ) : data === null ? (
            <div className="animate-spin text-4xl dark:text-white">
              <VscLoading />
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
