import React from "react";

const FormSection = ({
  icon: Icon,
  title,
  children,
  onAdd,
  addButtonLabel,
}) => {
  return (
    <div className="p-6 transition-shadow duration-300 bg-white border border-gray-200 shadow-sm rounded-xl hover:shadow-md">
      {/* 🟢 Header Area */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="flex items-center gap-3 text-lg font-bold tracking-wide text-gray-800 uppercase">
          {Icon && <Icon size={20} className="text-blue-600" />}
          {title}
        </h2>

        {onAdd && (
          <button
            type="button"
            onClick={onAdd}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-full transition-colors"
          >
            <span className="text-lg leading-none">+</span>
            {addButtonLabel || "Add"}
          </button>
        )}
      </div>

      {/* 🟢 Content Area - This is where your schools/jobs go */}
      <div className="space-y-6">{children}</div>
    </div>
  );
};

export default FormSection;
