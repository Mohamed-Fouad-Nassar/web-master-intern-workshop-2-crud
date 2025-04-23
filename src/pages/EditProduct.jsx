import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import Spinner from "../components/Spinner";
import ProductForms from "../components/ProductForms";

import { getProductByID, updateProduct } from "../api/products";

import useProductFormValidation from "../hooks/useProductFormValidation";
import toast from "react-hot-toast";

export default function EditProduct() {
  const dispatch = useDispatch();
  const { productId } = useParams();

  const error = useSelector((state) => state.products.error);
  const product = useSelector((state) => state.products.product);
  const isLoading = useSelector((state) => state.products.isLoading);

  const [formData, setFormData] = useState({
    id: "",
    title: "",
    price: "",
    description: "",
    categoryId: "",
    images: [],
  });

  const navigate = useNavigate();
  const { errors, validate } = useProductFormValidation();

  // for getting data from API
  useEffect(() => {
    dispatch(getProductByID(productId));
  }, [productId, dispatch]);

  // for setting the old values for inputs
  useEffect(() => {
    if (product && product.title) {
      setFormData({
        id: product.id,
        title: product.title,
        price: product.price,
        images: product.images,
        description: product.description,
        categoryId: product.category.id,
      });
    }
  }, [product]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValide = validate(formData);
    if (isValide) {
      dispatch(updateProduct(formData))
        .unwrap()
        .then(() => {
          toast.success("Product updated successfully!");
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
        use="Edit"
        error={error}
        formData={formData}
        validateErrors={errors}
        setFormData={setFormData}
        handleSubmit={handleSubmit}
      />
    </>
  );
}
