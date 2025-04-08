import { Outlet } from "react-router";

import Header from "../components/Header";
import Footer from "../components/Footer";

export default function MainLayout() {
  return (
    <>
      <Header />
      <main className="min-h-[calc(100dvh-115px)] py-4 container mx-auto">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
