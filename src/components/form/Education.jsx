import React from "react";
import { useFieldArray, useFormContext, useWatch } from "react-hook-form";
import { Trash2, GraduationCap } from "lucide-react";
import FormSection from "../ui/FormSection.jsx";
import FormInput from "../ui/FormInput.jsx";
import FormCheckbox from "../ui/FormCheckbox.jsx";
import FormTextArea from "../ui/FormTextArea.jsx";

const EducationItem = ({ index, remove }) => {
  const isCurrent = useWatch({ name: `education.${index}.isCurrent` });

  return (
    <div className="relative p-5 transition-all border border-gray-100 rounded-xl bg-gray-50/50 hover:bg-gray-50 hover:border-gray-200 group">
      {/* 🗑️ Remove Button (Only visible on hover) */}
      <button
        type="button"
        onClick={() => remove(index)}
        className="absolute text-gray-300 transition-colors opacity-0 top-4 right-4 hover:text-red-500 group-hover:opacity-100"
        title="Remove Entry"
      >
        <Trash2 size={18} />
      </button>

      {/* 📝 The Grid */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {/* Using the Pro Component - Spanning 2 columns */}
        <FormInput
          name={`education.${index}.school`}
          label="School / University"
          placeholder="e.g. University of Moratuwa"
          className="col-span-1 md:col-span-2"
        />

        <FormInput
          name={`education.${index}.degree`}
          label="Degree / Course"
          placeholder="e.g. BSc in Computer Science"
        />

        <div className="grid grid-cols-2 gap-4 md:col-span-2">
          <FormInput
            name={`education.${index}.startDate`}
            label="Start Date"
            placeholder="e.g. 2020"
          />
          <FormInput
            name={`education.${index}.endDate`}
            label="End Date" // or Graduation Date
            placeholder="e.g. 2024"
            disabled={isCurrent}
          />
          <div className="col-span-2">
            <FormCheckbox
              name={`education.${index}.isCurrent`}
              label="Currently studying here"
            />
          </div>
        </div>

        <FormTextArea
          name={`education.${index}.description`}
          label="Description (Optional)"
          placeholder="e.g. First Class Honours, GPA 3.8, Thesis on AI..."
          rows={3}
          className="md:col-span-2"
        />
      </div>
    </div>
  );
};

const Education = () => {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "education",
  });

  return (
    <FormSection
      title="Education"
      icon={GraduationCap}
      onAdd={() =>
        append({
          school: "",
          degree: "",
          startDate: "",
          endDate: "",
          isCurrent: false,
          description: "",
        })
      }
      addButtonLabel="Add School"
    >
      {fields.map((field, index) => (
        <EducationItem key={field.id} index={index} remove={remove} />
      ))}

      {fields.length === 0 && (
        <div className="p-8 text-center text-gray-400 border-2 border-gray-200 border-dashed rounded-xl">
          <p className="text-sm font-medium">No education history added yet.</p>
          <p className="mt-1 text-xs">
            Click the "+ Add School" button above to get started.
          </p>
        </div>
      )}
    </FormSection>
  );
};

export default Education;
