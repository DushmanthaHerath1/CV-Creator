import React from "react";
import { useFormContext, useFieldArray } from "react-hook-form";
import { PlusCircle, Trash2 } from "lucide-react";

const Education = () => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "education",
  });

  return (
    <div className="p-6 bg-white rounded-lg shadow-md border border-gray-200 mt-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">Education</h2>
        <button
          type="button"
          onClick={() => append({ school: "", degree: "", date: "" })}
          className="flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-800"
        >
          <PlusCircle size={18} /> Add School
        </button>
      </div>

      <div className="space-y-4">
        {fields.map((item, index) => (
          <div
            key={item.id}
            className="p-4 bg-gray-50 rounded border border-gray-200 relative"
          >
            <button
              type="button"
              onClick={() => remove(index)}
              className="absolute top-4 right-4 text-red-400 hover:text-red-600"
            >
              <Trash2 size={18} />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mr-8">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
                  University / School
                </label>
                <input
                  {...register(`education.${index}.school`)}
                  className="w-full p-2 border rounded bg-white"
                  placeholder="University of Colombo"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
                  Degree
                </label>
                <input
                  {...register(`education.${index}.degree`)}
                  className="w-full p-2 border rounded bg-white"
                  placeholder="BSc Computer Science"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
                  Graduation Year
                </label>
                <input
                  {...register(`education.${index}.date`)}
                  className="w-full p-2 border rounded bg-white"
                  placeholder="2024"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Education;
