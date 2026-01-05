import React from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { Users, Plus, Trash2 } from "lucide-react";

const References = () => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "references",
  });

  return (
    <div className="p-6 mt-6 bg-white border border-gray-200 rounded-lg shadow-md">
      <h2 className="flex items-center gap-2 mb-4 text-xl font-bold text-gray-800">
        <Users className="text-blue-600" /> References
      </h2>
      <div className="space-y-6">
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="relative p-4 border border-gray-200 rounded bg-gray-50"
          >
            <button
              type="button"
              onClick={() => remove(index)}
              className="absolute text-red-500 top-2 right-2 hover:text-red-700"
            >
              <Trash2 size={16} />
            </button>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="md:col-span-2">
                <label className="label">Reference Name</label>
                <input
                  {...register(`references.${index}.name`)}
                  className="input"
                  placeholder="e.g. John Doe"
                />
                {errors.references?.[index]?.name && (
                  <p className="error">
                    {errors.references[index].name.message}
                  </p>
                )}
              </div>
              <div>
                <label className="label">Position / Designation</label>
                <input
                  {...register(`references.${index}.position`)}
                  className="input"
                  placeholder="e.g. Senior Manager"
                />
              </div>
              <div>
                <label className="label">Company</label>
                <input
                  {...register(`references.${index}.company`)}
                  className="input"
                  placeholder="e.g. Tech Corp"
                />
              </div>
              <div className="md:col-span-2">
                <label className="label">Location (City)</label>
                <input
                  {...register(`references.${index}.location`)}
                  className="input"
                  placeholder="e.g. Colombo"
                />
              </div>
              <div>
                <label className="label">Phone</label>
                <input
                  {...register(`references.${index}.phone`)}
                  className="input"
                  placeholder="+94..."
                />
              </div>
              <div>
                <label className="label">Email</label>
                <input
                  {...register(`references.${index}.email`)}
                  className="input"
                  placeholder="john@example.com"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={() =>
          append({
            name: "",
            position: "",
            company: "",
            location: "",
            phone: "",
            email: "",
          })
        }
        className="flex items-center gap-2 mt-4 text-sm font-bold text-blue-600 hover:text-blue-800"
      >
        <Plus size={16} /> Add Reference
      </button>
      <style>{`.label { display: block; font-size: 0.75rem; font-weight: 700; color: #6b7280; text-transform: uppercase; margin-bottom: 0.25rem; } .input { width: 100%; padding: 0.5rem; border: 1px solid #e5e7eb; border-radius: 0.25rem; font-size: 0.875rem; } .error { color: #ef4444; font-size: 0.75rem; margin-top: 0.25rem; }`}</style>
    </div>
  );
};
export default References;
