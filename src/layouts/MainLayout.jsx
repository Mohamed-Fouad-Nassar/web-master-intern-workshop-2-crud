import { Outlet } from "react-router";

import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

export default function MainLayout() {
  return (
    <div className="grid grid-cols-[auto_1fr] grid-rows-[auto_1fr] h-screen">
      <Header />
      <Sidebar />
      <main className="overflow-y-auto">
        <div className="px-8 py-6 container mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
