import { useLocation } from "react-router";
import { useContext, useState } from "react";
import { VscLoading, VscEye, VscEyeClosed } from "react-icons/vsc";

import useGetData from "../hooks/useGetData";
import { useCloseModal } from "../hooks/useModal";

import AppContext from "../context/AppContext";

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
      <div className="bg-primary-bg dark:bg-primary-bg-dark px-10 py-4 min-w-1/2 min-h-1/2 max-w-7xl absolute rounded-md flex flex-col justify-between">
        {/* modal header */}
        <div className="flex justify-between items-center text-primary-txt dark:text-white">
          <h1 className="text-xl font-semibold">
            {pathname === "/users" ? "User" : "Product"}
          </h1>
          <button
            onClick={handelClose}
            className="font-semibold cursor-pointer"
          >
            x
          </button>
        </div>

        {/* modal body */}
        <div className="flex flex-col mt-5">
          {data ? (
            pathname === "/users" ? (
              <User data={data} />
            ) : (
              <Porduct data={data} />
            )
          ) : (
            <div className="flex justify-center items-center animate-spin text-3xl dark:text-white">
              <VscLoading />
            </div>
          )}
        </div>
      </div>

      {/* overlay */}
      <div
        className="bg-gray-800/50 dark:bg-gray-800/85 w-full h-full"
        onClick={handelClose}
      ></div>
    </div>
  );
}

// product daata modal
const Porduct = ({ data }) => {
  const { img, images, ...rest } = data;

  return (
    <div className="flex flex-col">
      {img && <img src={img} alt="product" className="size-40 rounded-md" />}
      {Object.entries(rest).map(([key, value]) => (
        <div key={key} className="flex my-2">
          <span className="font-semibold mr-1 text-primary-txt dark:text-white">
            {key}:
          </span>
          <span className="text-secondary-txt">{value}</span>
        </div>
      ))}

      {images && images.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-4">
          {images.map((img, i) => (
            <img
              key={i}
              src={img}
              alt={`product-image-${i}`}
              className="size-60 rounded-md border border-gray-300"
            />
          ))}
        </div>
      )}
    </div>
  );
};

// user data modal
const User = ({ data }) => {
  const { avatar, ...rest } = data; // destructure the avatar from the data
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      {/* display avatar if it exists */}
      {avatar && (
        <img src={avatar} alt="avatar" className="size-20 rounded-full" />
      )}
      {/* display the rest of the data */}
      {Object.entries(rest).map(([key, value]) => (
        <div key={key} className="flex my-2">
          <span className="font-semibold mr-1 text-primary-txt dark:text-white">
            {key}:
          </span>
          <div className="flex items-center justify-between w-full">
            <span className="text-secondary-txt">
              {key === "password"
                ? showPassword
                  ? value
                  : "************"
                : value}
            </span>
            {key === "password" && (
              <button
                className="cursor-pointer text-2xl text-primary-txt dark:text-white"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <VscEye /> : <VscEyeClosed />}
              </button>
            )}
          </div>
        </div>
      ))}
    </>
  );
};
