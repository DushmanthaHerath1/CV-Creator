import React from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { Users, Trash2 } from "lucide-react";
import FormSection from "./ui/FormSection.jsx";
import FormInput from "./ui/FormInput.jsx";

const References = () => {
  const { control } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "references",
  });

  return (
    <FormSection
      title="References"
      icon={Users}
      onAdd={() =>
        append({
          name: "",
          position: "",
          company: "",
          location: "",
          phone: "",
          email: "",
        })
      }
      addButtonLabel="Add Reference"
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
            title="Remove Reference"
          >
            <Trash2 size={18} />
          </button>

          {/* 📝 The Grid */}
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <FormInput
              name={`references.${index}.name`}
              label="Reference Name"
              placeholder="e.g. Dr. John Doe"
              className="md:col-span-2"
            />

            <FormInput
              name={`references.${index}.position`}
              label="Position / Designation"
              placeholder="e.g. Senior Lecturer"
            />

            <FormInput
              name={`references.${index}.company`}
              label="Company / Institute"
              placeholder="e.g. University of Moratuwa"
            />

            <FormInput
              name={`references.${index}.location`}
              label="Location (City)"
              placeholder="e.g. Colombo"
              className="md:col-span-2"
            />

            <FormInput
              name={`references.${index}.phone`}
              label="Phone"
              placeholder="+94 7..."
            />

            <FormInput
              name={`references.${index}.email`}
              label="Email"
              placeholder="john@example.com"
            />
          </div>
        </div>
      ))}

      {/* Empty State */}
      {fields.length === 0 && (
        <div className="p-8 text-center text-gray-400 border-2 border-gray-200 border-dashed rounded-xl">
          <p className="text-sm font-medium">No references listed.</p>
          <p className="mt-1 text-xs">
            Add professional contacts who can vouch for your work.
          </p>
        </div>
      )}
    </FormSection>
  );
};

export default References;
