import React from "react";

const FormInput = ({ label, type, name, value, onChange }) => {
  return (
    <div className="flex flex-col mb-2 gap-2">
      <label className="font-medium text-primary-txt">{label}</label>
      <input
        required
        type={type}
        name={name}
        value={value}
        placeholder={`Enter ${label}`}
        onChange={(e) => onChange(e.target.name, e.target.value)}
        className="px-4 py-2 border outline-none focus:border-primary-btn-bg rounded-md border-secondary-txt transition-all duration-300 ease-in-out"
      />
    </div>
  );
};

export default FormInput;
