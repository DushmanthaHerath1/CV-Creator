import React from "react";
import { useFormContext } from "react-hook-form";

const FormInput = ({
  label,
  name,
  placeholder,
  type = "text",
  className = "",
  ...props
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

      <input
        type={type}
        {...(name ? register(name) : {})}
        placeholder={placeholder}
        className={`w-full px-3 py-2.5 text-sm font-medium text-gray-700 bg-white border rounded-lg outline-none transition-all duration-200
          ${
            error
              ? "border-red-500 focus:ring-2 focus:ring-red-200 bg-red-50"
              : "border-gray-200 hover:border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          }
        `}
        {...props}
      />

      {error && (
        <p className="mt-1.5 text-xs font-semibold text-red-500 flex items-center gap-1">
          ⚠️ {error.message}
        </p>
      )}
    </div>
  );
};

export default FormInput;
