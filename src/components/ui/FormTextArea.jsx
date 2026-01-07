import React from "react";
import { useFormContext } from "react-hook-form";

const FormTextArea = ({
  label,
  name,
  placeholder,
  rows = 3,
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
      <textarea
        {...(name ? register(name) : {})}
        placeholder={placeholder}
        rows={rows}
        className={`w-full px-3 py-2.5 text-sm font-medium text-gray-700 bg-white border rounded-lg outline-none transition-all duration-200 resize-none
          ${
            error
              ? "border-red-500 focus:ring-2 focus:ring-red-200 bg-red-50"
              : "border-gray-200 hover:border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          }
        `}
      />
      {error && (
        <p className="mt-1.5 text-xs font-semibold text-red-500 flex items-center gap-1">
          ⚠️ {error.message}
        </p>
      )}
    </div>
  );
};

export default FormTextArea;
