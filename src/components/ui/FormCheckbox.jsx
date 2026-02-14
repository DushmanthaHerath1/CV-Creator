import React from "react";
import { useFormContext } from "react-hook-form";

const FormCheckbox = ({ name, label, className }) => {
  const { register } = useFormContext();

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <input
        type="checkbox"
        id={name}
        {...register(name)}
        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 accent-blue-600"
      />
      <label
        htmlFor={name}
        className="text-sm font-medium text-gray-700 cursor-pointer select-none whitespace-nowrap"
      >
        {label}
      </label>
    </div>
  );
};

export default FormCheckbox;
