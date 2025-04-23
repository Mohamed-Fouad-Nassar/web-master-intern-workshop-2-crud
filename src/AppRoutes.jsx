import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { Route, Routes, useLocation } from "react-router";

import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";

import ProtectedRoute from "./components/ProtectedRoute";

import Error from "./pages/Error";
import Login from "./pages/Login";
import Users from "./pages/Users";
import Register from "./pages/Register";
import Products from "./pages/Products";
import Dashboard from "./pages/Dashboard";
import CreateUser from "./pages/CreateUser";
import EditProduct from "./pages/EditProduct";
import CreateProduct from "./pages/CreateProduct";
import SearchResults from "./pages/SearchResults";

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
      <Toaster position="top-right" />
      <Routes>
        {/* Public Routes */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* Protected Routes */}
        <Route
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/" element={<Dashboard />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="products" element={<Products />} />
          <Route path="products/create" element={<CreateProduct />} />
          <Route path="products/:productId/edit" element={<EditProduct />} />
          <Route path="users" element={<Users />} />
          <Route path="users/create" element={<CreateUser />} />
        </Route>

        {/* Error Page */}
        <Route path="*" element={<Error />} />
      </Routes>
    </DarkModeProvider>
  );
}
