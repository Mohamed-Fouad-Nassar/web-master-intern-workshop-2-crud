import { Outlet } from "react-router";

export default function AuthLayout() {
  return (
    <div className="min-h-screen py-4 container mx-auto flex justify-center items-center">
      <Outlet />
    </div>
  );
}
