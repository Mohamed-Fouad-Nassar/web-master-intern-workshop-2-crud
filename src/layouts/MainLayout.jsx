import { Outlet } from "react-router";

import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Modal from "../components/modals/Modal";

export default function MainLayout() {
  return (
    <div className="grid grid-cols-[auto_1fr] grid-rows-[auto_1fr] max-w-full">
      <Header />
      <Sidebar />
      <main className="overflow-x-hidden bg-secondary-bg dark:bg-secondary-bg-dark">
        <div className="px-4 py-2 container mx-auto">
          <Outlet />
          <Modal />
        </div>
      </main>
    </div>
  );
}
