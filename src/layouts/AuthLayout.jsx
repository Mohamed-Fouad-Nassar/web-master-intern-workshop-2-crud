import { Outlet } from "react-router";

export default function AuthLayout() {
  return (
    <div className="min-h-screen bg-linear-to-r from-amber-400 to-amber-300 flex justify-center items-center">
      <div className="mx-6 px-4 py-8 md:px-8 max-w-xl container sm:mx-auto flex flex-col justify-center items-center bg-white rounded-xl">
        <h1 className="w-fit font-bold text-3xl sm:text-4xl pl-3 uppercase tracking-wide flex justify-center items-center border-l-4 border-third-txt dark:border-third-txt-dark">
          crud operation
        </h1>
        <Outlet />
      </div>
    </div>
  );
}
