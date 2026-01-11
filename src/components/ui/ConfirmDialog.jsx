import React from "react";
import { AlertTriangle, X } from "lucide-react";

const ConfirmDialog = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Are you sure?",
  message = "This action cannot be undone.",
  confirmText = "Delete",
  confirmColor = "bg-red-600 hover:bg-red-700", // Flexible color (red for delete, blue for other actions)
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-md duration-200 bg-white border border-gray-100 shadow-2xl rounded-2xl animate-in zoom-in-95"
        role="alertdialog"
      >
        {/* Close X Button */}
        <button
          onClick={onClose}
          className="absolute p-1 text-gray-400 transition-colors rounded-full top-4 right-4 hover:bg-gray-100 hover:text-gray-600"
        >
          <X size={20} />
        </button>

        <div className="p-6 text-center sm:text-left">
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
            {/* Warning Icon Container */}
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-50 shrink-0">
              <AlertTriangle className="text-red-600" size={24} />
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-bold text-slate-900">{title}</h3>
              <p className="text-sm leading-relaxed text-slate-500">
                {message}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col-reverse gap-3 mt-8 sm:flex-row sm:justify-end">
            <button
              onClick={onClose}
              className="px-5 py-2.5 text-sm font-semibold text-slate-600 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 hover:text-slate-900 transition-all active:scale-95"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                onConfirm();
                onClose();
              }}
              className={`px-5 py-2.5 text-sm font-bold text-white rounded-xl shadow-md transition-all active:scale-95 ${confirmColor}`}
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
