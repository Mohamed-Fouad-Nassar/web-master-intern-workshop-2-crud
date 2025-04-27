import { Outlet } from "react-router";

export default function AuthLayout() {
  return (
    <div className="relative min-h-screen bg-linear-to-r from-amber-500 to-amber-300 flex justify-center items-center">
      <div className="absolute inset-0 dark:bg-primary-bg-dark/40"></div>
      <div className="relative z-10 mx-6 px-4 py-8 md:px-8 max-w-xl container sm:mx-auto flex flex-col justify-center items-center bg-primary-bg dark:bg-primary-bg-dark text-primary-txt dark:text-primary-txt-dark rounded-xl">
        <h1 className="w-fit font-bold text-3xl sm:text-4xl pl-3 uppercase tracking-wide flex justify-center items-center border-l-4 border-third-txt dark:border-third-txt-dark">
          crud operation
        </h1>
        <Outlet />
      </div>
    </div>
  );
}
