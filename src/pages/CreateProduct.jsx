import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import Spinner from "../components/Spinner";
import ProductForms from "../components/ProductForms";

import { createNewProduct } from "../api/products";

import useProductFormValidation from "../hooks/useProductFormValidation";

export default function CreateProduct() {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const error = useSelector((state) => state.products.error);
  const isLoading = useSelector((state) => state.products.isLoading);

  const [formData, setFormData] = useState({
    title: "",
    price: "",
    description: "",
    categoryId: "",
    images: [],
  });

  const { errors, validate } = useProductFormValidation();

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValide = validate(formData);
    if (isValide) {
      dispatch(createNewProduct(formData))
        .unwrap()
        .then(() => {
          toast.success("Product created successfully!");
          navigate("/products");
        })
        .catch((err) => {
          toast.err("Something went wrong!");
          console.error("Error creating product:", err);
        });
    }
  };

  return (
    <>
      {isLoading && (
        <div className="absolute top-0 left-0 w-full min-h-[90vh] bg-secondary-bg dark:bg-secondary-bg-dark flex items-center justify-center z-50">
          <Spinner size="size-14" />
        </div>
      )}

      <ProductForms
        use="Create"
        setFormData={setFormData}
        formData={formData}
        handleSubmit={handleSubmit}
        error={error}
        validateErrors={errors}
      />
    </>
  );
}
