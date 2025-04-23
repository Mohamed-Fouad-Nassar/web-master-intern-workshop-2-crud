import { Outlet } from "react-router";

import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Modal from "../components/modals/Modal";

export default function MainLayout() {
  return (
    <div className="grid grid-cols-[auto_1fr] grid-rows-[auto_1fr] w-full h-full ">
      <Header />
      <Sidebar />
      <main className="overflow-y-auto bg-secondary-bg dark:bg-secondary-bg-dark">
        <div className="px-4 py-2 container mx-auto relative">
          <Outlet />
          <Modal />
        </div>
      </main>
    </div>
  );
}
