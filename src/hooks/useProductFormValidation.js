import { useState } from "react";

const useProductFormValidation = () => {
  const [errors, setErrors] = useState({});

  const validate = (formData) => {
    const newErrors = {};

    if (
      !formData.title ||
      formData.title.length < 3 ||
      formData.title.length > 100
    ) {
      newErrors.title = "Title must be between 3 and 100 characters.";
    }

    if (
      !formData.description ||
      formData.description.length < 10 ||
      formData.description.length > 500
    ) {
      newErrors.description =
        "Description must be between 10 and 500 characters.";
    }

    if (
      !formData.price ||
      isNaN(formData.price) ||
      Number(formData.price) <= 0
    ) {
      newErrors.price = "Price must be a number greater than 0.";
    }

    if (!formData.categoryId) {
      newErrors.categoryId = "Please select a category.";
    }

    if (!formData.images || formData.images.length === 0) {
      newErrors.images = "At least one image URL is required.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  return { errors, validate };
};

export default useProductFormValidation;
