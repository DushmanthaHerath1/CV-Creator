import React from "react";
import { useFormContext, useFieldArray } from "react-hook-form";
import { PlusCircle, Trash2 } from "lucide-react";

const Experience = () => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();

  // This magic hook manages the list for us
  const { fields, append, remove } = useFieldArray({
    control,
    name: "experience",
  });

  return (
    <div className="p-6 bg-white rounded-lg shadow-md border border-gray-200 mt-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">Work Experience</h2>

        {/* The Magic Button */}
        <button
          type="button"
          // When clicked, push a new empty object to the array
          onClick={() =>
            append({
              role: "",
              company: "",
              startDate: "",
              endDate: "",
              description: "",
            })
          }
          className="flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-800"
        >
          <PlusCircle size={18} /> Add Job
        </button>
      </div>

      <div className="space-y-6">
        {fields.map((item, index) => (
          <div
            key={item.id}
            className="p-4 bg-gray-50 rounded border border-gray-200 relative"
          >
            {/* Delete Button (Top Right) */}
            <button
              type="button"
              onClick={() => remove(index)}
              className="absolute top-4 right-4 text-red-400 hover:text-red-600 transition"
              title="Remove this job"
            >
              <Trash2 size={18} />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mr-8">
              {/* Role */}
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
                  Job Title
                </label>
                <input
                  {...register(`experience.${index}.role`)}
                  placeholder="Senior Developer"
                  className={`w-full p-2 border rounded bg-white ${
                    errors.experience?.[index]?.role
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                />
                {/* Specific Error for this item */}
                {errors.experience?.[index]?.role && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.experience[index].role.message}
                  </p>
                )}
              </div>

              {/* Company */}
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
                  Company
                </label>
                <input
                  {...register(`experience.${index}.company`)}
                  placeholder="Tech Corp"
                  className={`w-full p-2 border rounded bg-white ${
                    errors.experience?.[index]?.company
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                />
                {errors.experience?.[index]?.company && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.experience[index].company.message}
                  </p>
                )}
              </div>

              {/* Dates - Using type="month" for nice browser picker */}
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
                  Start Date
                </label>
                <input
                  type="month"
                  {...register(`experience.${index}.startDate`)}
                  className="w-full p-2 border rounded bg-white border-gray-300"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
                  End Date
                </label>
                <input
                  type="month"
                  {...register(`experience.${index}.endDate`)}
                  className="w-full p-2 border rounded bg-white border-gray-300"
                />
              </div>
            </div>

            {/* Description */}
            <div className="mt-4">
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
                Description
              </label>
              <textarea
                {...register(`experience.${index}.description`)}
                placeholder="Describe your responsibilities..."
                rows="3"
                className="w-full p-2 border rounded bg-white border-gray-300"
              />
            </div>
          </div>
        ))}

        {/* Empty State Helper */}
        {fields.length === 0 && (
          <p className="text-center text-gray-400 italic py-4">
            No experience added yet. Click "Add Job" to start.
          </p>
        )}
      </div>
    </div>
  );
};

export default Experience;
