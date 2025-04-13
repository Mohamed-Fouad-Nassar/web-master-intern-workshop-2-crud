import { useEffect, useState } from "react";
import FormInput from "./FormInput";
import axios from "axios";
import { useNavigate } from "react-router";



const ProductForms = ({use}) => {
const [formData, setFormData] = useState({
  title: "",
  description: "",
  price: null,
  discount: null,
  img: "",
});
const handleChange = (name, value) => {
  setFormData((prev) => ({
    ...prev,
    [name]: value,
  }));
};
const navigate = useNavigate();
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
      });
  }
}, [use]);
// for handeling the submit button
  function handleSubmit(e) {
    e.preventDefault();
    if (use === "Create") {
      axios.post(
        `https://web-master-intern-workshop-2-crud-backend.vercel.app/products`,
        formData
      );
    } else if (use === "Edit") {
      const id = window.location.pathname.split("/")[2];
      console.log("ID:", id);
      axios.put(
        `https://web-master-intern-workshop-2-crud-backend.vercel.app/products/${id}`,
        formData
      );
    }
    navigate("/");
  };

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
          className="bg-[var(--color-primary-btn-bg)] text-[var(--color-primary-txt)] font-md text-xl px-4 py-2 rounded-md cursor-pointer filter hover:brightness-90 transition-all duration-300 ease-in-out"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ProductForms;
