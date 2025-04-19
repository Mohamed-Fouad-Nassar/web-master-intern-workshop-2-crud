// import { useState } from "react";
import {
  HiOutlineHome,
  HiOutlineUserGroup,
  HiOutlineClipboardDocumentList,
  HiOutlineArrowRightOnRectangle,
} from "react-icons/hi2";
import { NavLink, useLocation } from "react-router";
// import { IoIosArrowDropleft } from "react-icons/io";

import Button from "./Button";

import profile from "../assets/profile.png";

const PathLinksNavBar = [
  {
    id: 1,
    title: "Home",
    icon: HiOutlineHome,
    path: "/",
  },
  {
    id: 2,
    title: "Products",
    icon: HiOutlineClipboardDocumentList,
    path: "/products",
  },
  {
    id: 3,
    title: "Users",
    icon: HiOutlineUserGroup,
    path: "/users",
  },
];

export default function Sidebar() {
  // const [changeStyle, setChangeStyle] = useState(false);
  // const menuToggle = () => {
  //   setChangeStyle(!changeStyle);
  // };
  const { pathname } = useLocation();

  return (
    <nav
      // className={`${
      //   changeStyle ? "changestyle" : ""
      // } row-span-full p-4 bg-gray-100 md:w-3xs !py-2 relative transition-[!100s]`}

      className="w-28 md:w-3xs row-span-full px-4 bg-primary-bg dark:bg-primary-bg-dark text-primary-txt dark:text-primary-txt-dark relative"
    >
      <div className="container w-full h-dvh py-6 sticky top-0 flex flex-col justify-between items-center">
        <h1 className="font-bold text-xs pl-2 md:text-xl w-[90%] uppercase flex justify-center items-center border-l-4 border-third-txt dark:border-third-txt-dark">
          crud operation
        </h1>

        <div className="sm:py-10 w-full flex flex-col gap-4 items-center">
          <img
            src={profile}
            alt="profile-image"
            className="w-16 md:w-36 h-16 md:h-36 rounded-full object-cover"
          />
          <div className="details-person w-full h-auto flex flex-col gap-2 justify-center items-center">
            <h1 className="font-bold text-xl text-center">Karthi Madesh</h1>
            <p className="text-third-txt dark:text-third-txt-dark">Admin</p>
          </div>
        </div>

        <ul className="w-full flex-1 py-10 flex flex-col gap-4 items-start">
          {PathLinksNavBar?.map(({ title, icon: Icon, path }, index) => (
            <li key={index} className="w-full flex justify-center items-center">
              <NavLink
                to={path}
                className={`${
                  path === pathname
                    ? "bg-primary-btn-bg dark:bg-primary-btn-bg-dark"
                    : "hover:bg-primary-btn-bg/10 dark:hover:bg-primary-btn-bg-dark/10"
                } w-full flex gap-4 justify-center md:justify-start items-center px-4 py-2 rounded`}
              >
                <Icon className="text-2xl" />
                <span className="hidden md:inline">{title}</span>
              </NavLink>
            </li>
          ))}
        </ul>
        <Button
          variation="ghost"
          className="w-full flex justify-center md:justify-start items-center gap-4"
        >
          <HiOutlineArrowRightOnRectangle className="text-xl" />
          <span className="hidden md:inline">Logout</span>
        </Button>
      </div>

      {/* <button
        onClick={() => menuToggle()}
        className="arrow absolute top-[2%] right-[-10%] text-2xl text-[#C4C4C4] cursor-pointer"
      >
        <IoIosArrowDropleft />
      </button> */}
    </nav>
  );
}
