import { useState } from "react";
import ProductForms from "../components/ProductForms";
import { useDispatch, useSelector } from "react-redux";
import { createNewProduct } from "../api/products";
import { useNavigate } from "react-router";
import Spinner from "../components/Spinner";
import useProductFormValidation from "../hooks/useProductFormValidation";

export default function CreateProduct() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.products.isLoading);
  const error = useSelector((state) => state.products.error);
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    description: "",
    categoryId: "",
    images: [],
  });
  const { errors, validate } = useProductFormValidation();
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const isValide = validate(formData);
    if (isValide) {
      dispatch(createNewProduct(formData))
        .unwrap()
        .then(() => navigate("/products"))
        .catch((err) => {
          console.error("Error creating product:", err);
        });
    }
  };

  return (
    <>
      {loading && (
        <div className="absolute top-0 left-0 w-full min-h-[90vh] dark:bg-black bg-orange-100  flex items-center justify-center z-50">
          <Spinner size="size-50" />
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
