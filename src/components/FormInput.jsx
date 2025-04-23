import React from "react";

const FormInput = ({ label, type, name, value, onChange }) => {
  return (
    <div className="flex flex-col mt-6 mb-1 gap-2">
      <label className="text-primary-txt dark:text-primary-txt-dark">
        {label}
      </label>
      <input
        required
        type={type}
        name={name}
        value={value}
        placeholder={`Enter ${label}`}
        onChange={(e) => onChange(e.target.name, e.target.value)}
        className="py-2 px-4 border outline-none focus:border-primary-btn-bg rounded-md border-secondary-txt transition-all duration-300 ease-in-out dark:text-secondary-txt"
      />
    </div>
  );
};

export default FormInput;
