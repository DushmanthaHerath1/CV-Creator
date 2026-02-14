import React from "react";
import { useFormContext, useFieldArray, useWatch } from "react-hook-form";
import { Trash2, Briefcase } from "lucide-react"; // 👈 Using Briefcase icon
import FormSection from "../ui/FormSection.jsx";
import FormInput from "../ui/FormInput.jsx";
import FormCheckbox from "../ui/FormCheckbox.jsx";
import FormTextArea from "../ui/FormTextArea.jsx";

const ExperienceItem = ({ index, remove }) => {
  const isCurrent = useWatch({ name: `experience.${index}.isCurrent` });

  return (
    <div className="relative p-5 transition-all border border-gray-100 rounded-xl bg-gray-50/50 hover:bg-gray-50 hover:border-gray-200 group">
      {/* 🗑️ Remove Button (Consistent with Education) */}
      <button
        type="button"
        onClick={() => remove(index)}
        className="absolute text-gray-300 transition-colors opacity-0 top-4 right-4 hover:text-red-500 group-hover:opacity-100"
        title="Remove Job"
      >
        <Trash2 size={18} />
      </button>

      {/* 📝 The Grid */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <FormInput
          name={`experience.${index}.role`}
          label="Job Title"
          placeholder="e.g. Senior Developer"
          className="md:col-span-2" // Spans full width
        />

        <FormInput
          name={`experience.${index}.company`}
          label="Company"
          placeholder="e.g. Tech Corp"
        />

        {/* Dates: Using type="month" for a cleaner picker, or "text" if you prefer */}
        <div className="grid grid-cols-2 gap-4 md:col-span-1">
          <FormInput
            name={`experience.${index}.startDate`}
            label="Start Date"
            type="month"
          />
          <FormInput
            name={`experience.${index}.endDate`}
            label="End Date"
            type="month"
            disabled={isCurrent}
          />
          <div className="col-span-2">
            <FormCheckbox
              name={`experience.${index}.isCurrent`}
              label="Currently working here"
            />
          </div>
        </div>

        <FormTextArea
          name={`experience.${index}.description`}
          label="Description"
          placeholder="Describe your key responsibilities and achievements..."
          rows={3}
          className="md:col-span-2"
        />
      </div>
    </div>
  );
};

const Experience = () => {
  const { control } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "experience",
  });

  return (
    <FormSection
      title="Work Experience"
      icon={Briefcase}
      onAdd={() =>
        append({
          role: "",
          company: "",
          startDate: "",
          endDate: "",
          description: "",
        })
      }
      addButtonLabel="Add Job"
    >
      {fields.map((item, index) => (
        <ExperienceItem key={item.id} index={index} remove={remove} />
      ))}

      {/* Empty State */}
      {fields.length === 0 && (
        <div className="p-8 text-center text-gray-400 border-2 border-gray-200 border-dashed rounded-xl">
          <p className="text-sm font-medium">No work experience added yet.</p>
          <p className="mt-1 text-xs">
            Click the "+ Add Job" button above to get started.
          </p>
        </div>
      )}
    </FormSection>
  );
};

export default Experience;
