import React from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { Tent, Trash2 } from "lucide-react";
import FormSection from "../ui/FormSection.jsx";
import FormInput from "../ui/FormInput.jsx";
import FormTextArea from "../ui/FormTextArea.jsx";

const Extracurricular = () => {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "extracurricular",
  });

  return (
    <FormSection
      title="Extracurricular Activities"
      icon={Tent}
      onAdd={() =>
        append({ role: "", organization: "", date: "", description: "" })
      }
      addButtonLabel="Add Activity"
    >
      {fields.map((item, index) => (
        <div
          key={item.id}
          className="relative p-4 border border-gray-200 rounded-lg bg-gray-50 group"
        >
          <button
            type="button"
            onClick={() => remove(index)}
            className="absolute text-gray-400 transition-colors top-4 right-4 hover:text-red-500"
          >
            <Trash2 size={16} />
          </button>

          <div className="grid grid-cols-1 gap-4 mb-4 md:grid-cols-2">
            <FormInput
              name={`extracurricular.${index}.role`}
              label="Role"
              placeholder="e.g. Volunteer"
            />
            <FormInput
              name={`extracurricular.${index}.organization`}
              label="Organization"
              placeholder="e.g. Red Cross"
            />
            <div className="md:col-span-2">
              <FormInput
                name={`extracurricular.${index}.date`}
                label="Date / Duration"
                placeholder="e.g. 2023 - Present"
              />
            </div>
          </div>

          <FormTextArea
            name={`extracurricular.${index}.description`}
            label="Description"
            placeholder="What did you do?"
            rows={3}
          />
        </div>
      ))}
    </FormSection>
  );
};

export default Extracurricular;
