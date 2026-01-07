import React from "react";
import { useFormContext, useFieldArray } from "react-hook-form";
import { Lightbulb, X } from "lucide-react"; // 👈 Using Lightbulb icon
import FormSection from "./ui/FormSection.jsx";

const Skills = () => {
  const { register, control } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "skills",
  });

  return (
    <FormSection
      title="Skills"
      icon={Lightbulb}
      onAdd={() => append({ name: "" })}
      addButtonLabel="Add Skill"
    >
      {/* 🏷️ The Chip Container */}
      <div className="flex flex-wrap gap-3">
        {fields.map((item, index) => (
          <div
            key={item.id}
            className="flex items-center gap-2 px-4 py-2 text-blue-800 transition-all border border-blue-100 rounded-full bg-blue-50 hover:bg-blue-100 hover:shadow-sm group"
          >
            {/* ✍️ Transparent Input */}
            <input
              {...register(`skills.${index}.name`)}
              className="bg-transparent border-none outline-none text-sm font-semibold text-blue-900 placeholder-blue-300 w-24 sm:w-auto min-w-[60px]"
              placeholder="Skill..."
              autoFocus={fields.length > 1 && index === fields.length - 1} // Auto-focus new chips
            />

            {/* ❌ Remove Icon */}
            <button
              type="button"
              onClick={() => remove(index)}
              className="text-blue-300 transition-colors hover:text-red-500"
              title="Remove Skill"
            >
              <X size={14} strokeWidth={3} />
            </button>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {fields.length === 0 && (
        <div className="p-8 text-center text-gray-400 border-2 border-gray-200 border-dashed rounded-xl">
          <p className="text-sm font-medium">No skills listed.</p>
          <p className="mt-1 text-xs">
            Add tools, languages, or frameworks you excel at.
          </p>
        </div>
      )}
    </FormSection>
  );
};

export default Skills;
