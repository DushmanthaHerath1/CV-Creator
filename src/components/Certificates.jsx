import React from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { Award, Plus, Trash2 } from "lucide-react";

const Certificates = () => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "certificates",
  });

  return (
    <div className="p-6 mt-6 bg-white border border-gray-200 rounded-lg shadow-md">
      <h2 className="flex items-center gap-2 mb-4 text-xl font-bold text-gray-800">
        <Award className="text-blue-600" /> Certificates
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
                <label className="label">Certificate Name</label>
                <input
                  {...register(`certificates.${index}.name`)}
                  className="input"
                  placeholder="e.g. AWS Certified Solutions Architect"
                />
                {errors.certificates?.[index]?.name && (
                  <p className="error">
                    {errors.certificates[index].name.message}
                  </p>
                )}
              </div>
              <div>
                <label className="label">Issuer / Organization</label>
                <input
                  {...register(`certificates.${index}.issuer`)}
                  className="input"
                  placeholder="e.g. Amazon Web Services"
                />
              </div>
              <div>
                <label className="label">Date</label>
                <input
                  {...register(`certificates.${index}.date`)}
                  className="input"
                  placeholder="e.g. 2024"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={() => append({ name: "", issuer: "", date: "" })}
        className="flex items-center gap-2 mt-4 text-sm font-bold text-blue-600 hover:text-blue-800"
      >
        <Plus size={16} /> Add Certificate
      </button>

      <style>{`
        .label { display: block; font-size: 0.75rem; font-weight: 700; color: #6b7280; text-transform: uppercase; margin-bottom: 0.25rem; }
        .input { width: 100%; padding: 0.5rem; border: 1px solid #e5e7eb; border-radius: 0.25rem; font-size: 0.875rem; }
        .error { color: #ef4444; font-size: 0.75rem; margin-top: 0.25rem; }
      `}</style>
    </div>
  );
};

export default Certificates;
