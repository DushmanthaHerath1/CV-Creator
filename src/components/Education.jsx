import React from "react";
import { useFormContext, useFieldArray } from "react-hook-form";
import { Plus, Trash2, GraduationCap } from "lucide-react";

const Education = () => {
  // We grab 'errors' here
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
    <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h2 className="flex items-center gap-2 text-xl font-bold text-gray-800">
          <GraduationCap size={20} /> Education
        </h2>
        <button
          type="button"
          onClick={() => append({ school: "", degree: "", date: "" })}
          className="flex items-center gap-1 text-sm font-bold text-blue-600 hover:text-blue-800"
        >
          <Plus size={16} /> Add School
        </button>
      </div>

      <div className="space-y-6">
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="relative p-4 border border-gray-200 rounded bg-gray-50 group"
          >
            <button
              type="button"
              onClick={() => remove(index)}
              className="absolute text-gray-400 transition-opacity opacity-0 top-4 right-4 hover:text-red-500 group-hover:opacity-100"
            >
              <Trash2 size={18} />
            </button>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {/* School Name */}
              <div className="col-span-2">
                <label className="block mb-1 text-xs font-bold text-gray-500 uppercase">
                  School / University
                </label>
                <input
                  {...register(`education.${index}.school`)}
                  placeholder="e.g. University of Moratuwa"
                  className={`w-full p-2 border rounded ${
                    errors.education?.[index]?.school
                      ? "border-red-500"
                      : "bg-white"
                  }`}
                />
                {/* 👇 FIX: Display the error message */}
                {errors.education?.[index]?.school && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.education[index].school.message}
                  </p>
                )}
              </div>

              {/* Degree */}
              <div>
                <label className="block mb-1 text-xs font-bold text-gray-500 uppercase">
                  Degree / Course
                </label>
                <input
                  {...register(`education.${index}.degree`)}
                  placeholder="e.g. BSc in Computer Science"
                  className={`w-full p-2 border rounded ${
                    errors.education?.[index]?.degree
                      ? "border-red-500"
                      : "bg-white"
                  }`}
                />
                {/* 👇 FIX: Display the error message */}
                {errors.education?.[index]?.degree && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.education[index].degree.message}
                  </p>
                )}
              </div>

              {/* Date */}
              <div>
                <label className="block mb-1 text-xs font-bold text-gray-500 uppercase">
                  Graduation Year
                </label>
                <input
                  {...register(`education.${index}.date`)}
                  placeholder="e.g. 2024"
                  className="w-full p-2 bg-white border rounded"
                />
              </div>
            </div>
          </div>
        ))}

        {fields.length === 0 && (
          <div className="p-6 text-center text-gray-400 border-2 border-gray-300 border-dashed rounded-lg">
            <p className="text-sm">No education added yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Education;
