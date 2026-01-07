import React from "react";
import { useFormContext } from "react-hook-form";

const FormSelect = ({
  label,
  name,
  options = [],
  placeholder = "Select...",
  className = "",
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const getError = (obj, path) => {
    if (!path || !obj) return undefined;
    return path.split(".").reduce((acc, part) => acc && acc[part], obj);
  };

  const error = getError(errors, name);

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className="block mb-1.5 text-xs font-bold text-gray-500 uppercase tracking-wider">
          {label}
        </label>
      )}
      <div className="relative">
        <select
          {...(name ? register(name) : {})}
          className={`w-full px-3 py-2.5 text-sm font-medium text-gray-700 bg-white border rounded-lg outline-none transition-all duration-200 appearance-none
            ${
              error
                ? "border-red-500 focus:ring-2 focus:ring-red-200 bg-red-50"
                : "border-gray-200 hover:border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            }
          `}
        >
          <option value="">{placeholder}</option>
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        {/* Chevron Icon */}
        <div className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 pointer-events-none">
          <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
            <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
          </svg>
        </div>
      </div>
      {error && (
        <p className="mt-1.5 text-xs font-semibold text-red-500 flex items-center gap-1">
          ⚠️ {error.message}
        </p>
      )}
    </div>
  );
};

export default FormSelect;
