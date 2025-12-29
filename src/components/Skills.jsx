import React from "react";
import { useFormContext, useFieldArray } from "react-hook-form";
import { PlusCircle, X } from "lucide-react";

const Skills = () => {
  const { register, control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "skills",
  });

  return (
    <div className="p-6 bg-white rounded-lg shadow-md border border-gray-200 mt-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Skills</h2>

      {/* The List of Chips */}
      <div className="flex flex-wrap gap-2 mb-4">
        {fields.map((item, index) => (
          <div
            key={item.id}
            className="flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full"
          >
            <input
              {...register(`skills.${index}.name`)}
              className="bg-transparent border-none outline-none w-24 text-sm font-medium"
              placeholder="Skill..."
            />
            <button
              type="button"
              onClick={() => remove(index)}
              className="ml-2 text-blue-400 hover:text-blue-600"
            >
              <X size={14} />
            </button>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={() => append({ name: "" })}
        className="flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-800"
      >
        <PlusCircle size={18} /> Add Skill
      </button>
    </div>
  );
};

export default Skills;
