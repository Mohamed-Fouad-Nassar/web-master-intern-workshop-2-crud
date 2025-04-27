import React from "react";
import { Field, ErrorMessage } from "formik";

const FormInput = ({ label, type, name }) => {
  return (
    <div className="flex flex-col mb-2 gap-2">
      <label
        className="font-medium text-primary-txt dark:text-primary-txt-dark"
        htmlFor={name}
      >
        {label}
      </label>

      <Field name={name}>
        {({ field }) => (
          <input
            {...field}
            id={name}
            type={type}
            placeholder={`Enter ${label}`}
            className="px-4 py-2 border outline-none focus:border-primary-btn-bg dark:focus:border-primary-btn-bg-dark rounded-md border-secondary-txt dark:border-secondary-txt-dark transition-all duration-300 ease-in-out"
          />
        )}
      </Field>

      <ErrorMessage
        name={name}
        component="div"
        className="text-red-500 text-sm"
      />
    </div>
  );
};

export default FormInput;
