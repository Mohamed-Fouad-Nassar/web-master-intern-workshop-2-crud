import { useEffect, useState } from "react";
import ProductForms from "../components/ProductForms";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import Spinner from "../components/Spinner";
import { getProductByID, updateProduct } from "../api/products";
import useProductFormValidation from "../hooks/useProductFormValidation";

export default function EditProduct() {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.products.isLoading);
  const error = useSelector((state) => state.products.error);
  const product = useSelector((state) => state.products.product);
  const { productId } = useParams();
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
        description: product.description,
        categoryId: product.category.id,
        images: product.images,
      });
    }
  }, [product]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValide = validate(formData);
    if (isValide) {
      dispatch(updateProduct(formData))
        .unwrap()
        .then(() => navigate("/products"))
        .catch((err) => {
          console.error("Error creating product:", err);
        });
    }
  };

  return (
    <>
      {isLoading && (
        <div className="absolute top-0 left-0 w-full min-h-[90vh] dark:bg-black bg-white flex items-center justify-center z-50">
          <Spinner size="size-14" />
        </div>
      )}
      <ProductForms
        use="Edit"
        setFormData={setFormData}
        formData={formData}
        handleSubmit={handleSubmit}
        error={error}
        validateErrors={errors}
      />
    </>
  );
}
