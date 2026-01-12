import React from "react";
import { useFormContext } from "react-hook-form";
import { LayoutTemplate, Check, X } from "lucide-react";
import { TEMPLATES } from "../components/pdf/templates/index.jsx"; // 👈 Ensures we load from your registry

const TemplateGallery = ({ isOpen, onClose }) => {
  const { setValue, watch } = useFormContext();
  const currentTemplate = watch("templateId") || "modern";

  if (!isOpen) return null;

  return (
    // Backdrop
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
      {/* Modal Container */}
      <div
        className="w-full max-w-5xl bg-white rounded-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden animate-in zoom-in-95"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 bg-white border-b border-gray-100 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
              <LayoutTemplate size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                Choose Template
              </h2>
              <p className="text-sm text-gray-500">
                Select a layout that fits your style.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 transition-colors rounded-full hover:bg-gray-100"
          >
            <X size={24} />
          </button>
        </div>

        {/* Gallery Grid (Scrollable) */}
        <div className="grid grid-cols-1 gap-6 p-8 overflow-y-auto bg-gray-50/50 sm:grid-cols-2 lg:grid-cols-3">
          {Object.values(TEMPLATES).map((template) => (
            <button
              key={template.id}
              onClick={() => setValue("templateId", template.id)}
              className={`group relative flex flex-col overflow-hidden rounded-xl border-2 transition-all duration-300 text-left ${
                currentTemplate === template.id
                  ? "border-blue-600 ring-4 ring-blue-600/10 shadow-xl scale-[1.02]"
                  : "border-gray-200 bg-white hover:border-blue-300 hover:shadow-lg hover:-translate-y-1"
              }`}
            >
              {/* Abstract Preview */}
              <div
                className={`w-full aspect-[210/297] bg-white relative border-b border-gray-100`}
              >
                {/* Visual Mockups of the templates */}
                {template.id === "modern" ? (
                  <div className="flex w-full h-full">
                    <div className="w-[30%] h-full bg-slate-100 border-r border-slate-200"></div>
                    <div className="w-[70%] h-full p-4 space-y-2">
                      <div className="w-1/2 h-4 bg-blue-100 rounded"></div>
                      <div className="w-full h-2 rounded bg-slate-100"></div>
                      <div className="w-full h-2 rounded bg-slate-100"></div>
                    </div>
                  </div>
                ) : (
                  <div className="w-full h-full p-6 space-y-3">
                    <div className="w-full h-px mb-4 bg-slate-300"></div>
                    <div className="w-1/3 h-4 rounded bg-slate-800"></div>
                    <div className="w-full h-2 rounded bg-slate-100"></div>
                  </div>
                )}

                {/* Selected Badge */}
                {currentTemplate === template.id && (
                  <div className="absolute top-3 right-3 bg-blue-600 text-white p-1.5 rounded-full shadow-lg z-10">
                    <Check size={16} strokeWidth={3} />
                  </div>
                )}
              </div>

              {/* Template Info */}
              <div className="w-full p-4 bg-white">
                <div className="flex items-start justify-between mb-1">
                  <h3 className="font-bold text-gray-900">{template.name}</h3>
                  {template.isNew && (
                    <span className="text-[10px] font-bold bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                      NEW
                    </span>
                  )}
                </div>
                <p className="mb-3 text-xs text-gray-500 line-clamp-2">
                  {template.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1">
                  {template.tags?.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] px-2 py-1 bg-gray-100 text-gray-600 rounded-md font-medium border border-gray-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TemplateGallery;
