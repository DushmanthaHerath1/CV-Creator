import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Trash2, ChevronDown } from "lucide-react";

const SortableSection = ({
  id,
  title,
  icon: Icon,
  children,
  onRemove,
  isOpen,
  onToggle,
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : "auto",
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`bg-white border rounded-xl shadow-sm transition-all duration-200 mb-4 overflow-hidden ${
        isOpen
          ? "border-blue-500 ring-1 ring-blue-500 shadow-md"
          : "border-gray-200 hover:border-gray-300"
      }`}
    >
      {/* HEADER (Click to Toggle) */}
      <div
        className="flex items-center justify-between p-4 bg-white cursor-pointer select-none group"
        onClick={onToggle}
      >
        <div className="flex items-center gap-3">
          {/* 1. DRAG HANDLE (Fixed) */}
          <button
            type="button" // 👈 CRITICAL FIX
            {...attributes}
            {...listeners}
            className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded cursor-grab active:cursor-grabbing touch-none"
            onClick={(e) => e.stopPropagation()}
          >
            <GripVertical size={18} />
          </button>

          {/* Icon & Title */}
          <div className="flex items-center gap-2">
            {Icon && (
              <Icon
                size={18}
                className={isOpen ? "text-blue-600" : "text-gray-500"}
              />
            )}
            <span
              className={`font-bold text-sm uppercase tracking-wide ${
                isOpen ? "text-gray-900" : "text-gray-600"
              }`}
            >
              {title}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          {/* 2. CHEVRON (Fixed) */}
          <button
            type="button" // 👈 CRITICAL FIX
            className={`p-1 rounded-full transition-transform duration-200 ${
              isOpen ? "rotate-180 bg-gray-100 text-gray-900" : "text-gray-400"
            }`}
          >
            <ChevronDown size={18} />
          </button>

          {/* 3. REMOVE BUTTON (Fixed) */}
          <button
            type="button" // 👈 CRITICAL FIX
            onClick={(e) => {
              e.stopPropagation();
              onRemove();
            }}
            className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
            title="Remove Section"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      {/* BODY (Accordion Content) */}
      {isOpen && (
        <div
          className="p-4 duration-200 border-t border-gray-100 cursor-default animate-in slide-in-from-top-2 fade-in"
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      )}
    </div>
  );
};

export default SortableSection;
