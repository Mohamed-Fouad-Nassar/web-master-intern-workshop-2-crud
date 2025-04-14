import React from "react";

const FormInput = ({ label, type, name, value, onChange }) => {
  return (
    <div className="flex flex-col mb-7 gap-2 max-w-[50%]">
      <label className="text-xl font-medium text-[var(--color-primary-txt)]">
        {label}
      </label>
      <input
        type={type}
        name={name}
        placeholder={`Enter ${label}`}
        required
        value={value}
        onChange={(e) => onChange(e.target.name, e.target.value)}
        className="p-2 border-[1px] focus:border-[1px]  outline-none focus:border-[var(--color-primary-btn-bg)] rounded-md border-[var(--color-secondary-txt)] transition-all duration-300 ease-in-out"
      />
    </div>
  );
};

export default FormInput;
