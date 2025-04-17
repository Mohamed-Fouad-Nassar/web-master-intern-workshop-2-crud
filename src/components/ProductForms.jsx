import axios from "axios";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";

import FormInput from "./FormInput";

const ProductForms = ({ use }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    discount: "",
    img: "",
  });
  const handleChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  // Fetching data for edit form
  useEffect(() => {
    if (use === "Edit") {
      const id = window.location.pathname.split("/")[2];
      axios
        .get(
          `https://web-master-intern-workshop-2-crud-backend.vercel.app/products/${id}`
        )
        .then((res) => {
          setFormData(res.data);
        })
        .catch((err) => {
          console.error("Error fetching product data:", err);
          setError("Failed to fetch product data. Please try again later.");
        });
    }
  }, [use]);
  // for handeling the submit button
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (use === "Create") {
        await axios.post(
          `https://web-master-intern-workshop-2-crud-backend.vercel.app/products`,
          formData
        );
      } else if (use === "Edit") {
        const id = window.location.pathname.split("/")[2];
        await axios.put(
          `https://web-master-intern-workshop-2-crud-backend.vercel.app/products/${id}`,
          formData
        );
      }
      navigate("/");
    } catch (err) {
      console.error("Error submitting form:", err);
      setError("Something went wrong. Please try again later.");
    }
  }

  return (
    <div className="productForms">
      <h1 className="relative text-3xl font-bold pl-2 mb-7">{use} Product</h1>
      <form onSubmit={handleSubmit} className="ml-3">
        <FormInput
          label="Title"
          type="text"
          name="title"
          onChange={handleChange}
          value={formData.title}
        />
        <FormInput
          label="Description"
          type="text"
          name="description"
          onChange={handleChange}
          value={formData.description}
        />
        <div className="flex gap-5 max-w-[50%]">
          <FormInput
            label="Price"
            type="number"
            name="price"
            onChange={handleChange}
            value={formData.price}
          />
          <FormInput
            label="Discount"
            type="number"
            name="discount"
            onChange={handleChange}
            value={formData.discount}
          />
        </div>
        <FormInput
          label="Image URL"
          type="text"
          name="img"
          onChange={handleChange}
          value={formData.img}
        />

        <button
          type="submit"
          disabled={error && use === "Edit" ? true : false}
          className={`${
            error && use === "Edit" ? "grayscale opacity-50" : ""
          } bg-[var(--color-primary-btn-bg)] text-[var(--color-primary-txt)] font-md text-xl px-4 py-2 rounded-md cursor-pointer filter hover:brightness-90 transition-all duration-300 ease-in-out`}
        >
          {use === "Create" ? "Create" : "Edit"} a product
        </button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </form>
    </div>
  );
};

export default ProductForms;
