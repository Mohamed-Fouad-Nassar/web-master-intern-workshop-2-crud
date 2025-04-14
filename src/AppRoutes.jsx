import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { Route, Routes, useLocation } from "react-router";

import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";

import Error from "./pages/Error";
import Login from "./pages/Login";
import Users from "./pages/Users";
import Register from "./pages/Register";
import Products from "./pages/Products";
import Dashboard from "./pages/Dashboard";
import CreateUser from "./pages/CreateUser";
import EditProduct from "./pages/EditProduct";
import CreateProduct from "./pages/CreateProduct";

import { useCloseModal } from "./hooks/useModal";

import { DarkModeProvider } from "./contexts/DarkModeContext";

export default function AppRoutes() {
  const { pathname } = useLocation();
  const closeModal = useCloseModal();

  // Close modal if the user navigates to a different page
  useEffect(() => {
    closeModal();
  }, [pathname]);

  return (
    <DarkModeProvider>
      <>
        <Toaster position="top-right" />
        <Routes>
          {/* Main Layout */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<Dashboard />} />

            <Route path="products" element={<Products />} />
            <Route path="products/create" element={<CreateProduct />} />
            <Route path="products/:productId/edit" element={<EditProduct />} />

            <Route path="users" element={<Users />} />
            <Route path="users/create" element={<CreateUser />} />
          </Route>

          {/* Auth Layout */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

          {/* Error Page or Not Found Page */}
          <Route path="*" element={<Error />} />
        </Routes>
      </>
    </DarkModeProvider>
  );
}
