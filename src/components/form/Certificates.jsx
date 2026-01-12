import React from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { BadgeCheck, Trash2 } from "lucide-react";
import FormSection from "../ui/FormSection.jsx";
import FormInput from "../ui/FormInput.jsx";

const Certificates = () => {
  const { control } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "certificates",
  });

  return (
    <FormSection
      title="Certificates"
      icon={BadgeCheck} // 👈 Your new icon goes here
      onAdd={() => append({ name: "", issuer: "", date: "" })}
      addButtonLabel="Add Certificate"
    >
      {fields.map((field, index) => (
        <div
          key={field.id}
          className="relative p-5 transition-all border border-gray-100 rounded-xl bg-gray-50/50 hover:bg-gray-50 hover:border-gray-200 group"
        >
          {/* 🗑️ Remove Button */}
          <button
            type="button"
            onClick={() => remove(index)}
            className="absolute text-gray-300 transition-colors opacity-0 top-4 right-4 hover:text-red-500 group-hover:opacity-100"
            title="Remove Certificate"
          >
            <Trash2 size={18} />
          </button>

          {/* 📝 The Grid */}
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <FormInput
              name={`certificates.${index}.name`}
              label="Certificate Name"
              placeholder="e.g. AWS Certified Solutions Architect"
              className="md:col-span-2"
            />

            <FormInput
              name={`certificates.${index}.issuer`}
              label="Issuer / Organization"
              placeholder="e.g. Amazon Web Services"
            />

            <FormInput
              name={`certificates.${index}.date`}
              label="Date Received"
              placeholder="e.g. 2024"
            />
          </div>
        </div>
      ))}

      {/* Empty State */}
      {fields.length === 0 && (
        <div className="p-8 text-center text-gray-400 border-2 border-gray-200 border-dashed rounded-xl">
          <p className="text-sm font-medium">No certificates added yet.</p>
          <p className="mt-1 text-xs">
            Add certifications to showcase your expertise.
          </p>
        </div>
      )}
    </FormSection>
  );
};

export default Certificates;
