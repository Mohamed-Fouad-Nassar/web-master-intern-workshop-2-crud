import {
  HiOutlineHome,
  HiOutlineUserGroup,
  HiOutlineClipboardDocumentList,
  HiOutlineArrowRightOnRectangle,
} from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useLocation, useNavigate } from "react-router";

import Button from "./Button";

import { persistor } from "../store/store";
import { logout } from "../store/auth/authSlice";

import profile from "../assets/avatar-placeholder.png";

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
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    persistor.purge();
    navigate("/login");
  };

  return (
    <nav className="w-24 lg:w-3xs row-span-full px-1 lg:px-4 bg-primary-bg dark:bg-primary-bg-dark text-primary-txt dark:text-primary-txt-dark relative border-r border-third-bg dark:border-third-bg-dark">
      <div className="container w-full h-dvh py-6 sticky top-0 flex flex-col justify-between items-center">
        <h1 className="font-bold text-xs pl-2 lg:text-xl w-[90%] uppercase flex justify-center items-center border-l-4 border-third-txt dark:border-third-txt-dark">
          crud operation
        </h1>

        <div className="pt-10 lg:py-10 w-full flex flex-col gap-4 items-center">
          <img
            src={user?.avatar ?? profile}
            alt={user?.name ?? ""}
            className="w-16 lg:w-36 h-16 lg:h-36 rounded-full object-cover"
          />
          <div className="details-person w-full h-auto flex flex-col gap-2 justify-center items-center">
            <h1 className="font-bold text-xl text-center">
              {user?.name ?? "No access"}
            </h1>
            <p className="text-third-txt dark:text-third-txt-dark">
              {user?.role ?? "admin"}
            </p>
          </div>
        </div>

        <ul className="w-full flex-1 py-10 flex flex-col gap-2 lg:gap-4 items-start">
          {PathLinksNavBar?.map(({ title, icon: Icon, path }, index) => (
            <li key={index} className="w-full flex justify-center items-center">
              <NavLink
                to={path}
                className={`${
                  path === pathname
                    ? "bg-primary-btn-bg/60 dark:bg-primary-btn-bg-dark/60"
                    : "hover:bg-primary-btn-bg/10 dark:hover:bg-primary-btn-bg-dark/10"
                } mx-2 w-full flex gap-4 justify-center lg:justify-start items-center px-4 py-2 rounded`}
              >
                <Icon className="text-2xl" />
                <span className="hidden lg:inline">{title}</span>
              </NavLink>
            </li>
          ))}
        </ul>
        <Button
          onClick={handleLogout}
          variation="ghost"
          className="w-full flex justify-center lg:justify-start items-center gap-4"
        >
          <HiOutlineArrowRightOnRectangle className="text-xl" />
          <span className="hidden lg:inline">Logout</span>
        </Button>
      </div>
    </nav>
  );
}
