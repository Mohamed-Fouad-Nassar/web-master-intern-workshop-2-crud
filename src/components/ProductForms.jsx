import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Button from "./Button";
import FormInput from "./FormInput";
import FormValidator from "./FormValidator";

import { getAllCategories } from "../api/products";

const ProductForms = ({
  use,
  handleSubmit,
  setFormData,
  formData,
  error,
  validateErrors,
}) => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.products.categories);
  const handleChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "images" ? value.split(",").map((img) => img.trim()) : value,
    }));
  };
  //for getting the categories for the select
  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  return (
    <div className="productForms p-2">
      <h1 className="relative text-3xl font-bold pl-2 mb-7 dark:text-primary-txt-dark">
        {use} Product
      </h1>
      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
        <FormInput
          label="Title"
          type="text"
          name="title"
          onChange={handleChange}
          value={formData.title}
        />
        <FormValidator error={validateErrors?.title} />
        <FormInput
          label="Description"
          type="text"
          name="description"
          onChange={handleChange}
          value={formData.description}
        />
        <FormValidator error={validateErrors?.description} />
        <FormInput
          label="Price"
          type="number"
          name="price"
          onChange={handleChange}
          value={formData.price}
        />
        <FormValidator error={validateErrors?.price} />
        <div className="flex flex-col mt-6 mb-1 gap-2">
          <label
            htmlFor="categories"
            className="font-medium text-primary-txt dark:text-primary-txt-dark"
          >
            Categories
          </label>
          <select
            id="categories"
            name="categoryId"
            onChange={(e) => handleChange("categoryId", e.target.value)}
            value={formData.categoryId}
            className="cursor-pointer p-2 border border-secondary-txt focus:border-primary-btn-bg rounded-md outline-none transition-all duration-300 ease-in-out text-primary-txt dark:text-white"
          >
            <option
              hidden
              disabled
              value=""
              className="dark:bg-primary-bg-dark cursor-pointer"
            >
              Choose category
            </option>

            {categories.map((category) => (
              <option
                key={category.id}
                value={category.id}
                className="dark:bg-primary-bg-dark cursor-pointer"
              >
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <FormValidator error={validateErrors?.categoryId} />
        <FormInput
          label="Image URL"
          type="text"
          name="images"
          onChange={handleChange}
          value={formData.images.join(", ")}
        />
        <FormValidator error={validateErrors?.images} />
        <Button
          type="submit"
          disabled={error && use === "Edit" ? true : false}
          className={`mt-8 block ml-auto ${
            error && use === "Edit" ? "grayscale opacity-50" : ""
          }`}
        >
          {use === "Create" ? "Create" : "Edit"} a product
        </Button>
        {error && (
          <p className="text-red-500 mt-2">Oops, Something Went Wrong</p>
        )}
      </form>
    </div>
  );
};

export default ProductForms;
