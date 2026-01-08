import React from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { Globe, Trash2 } from "lucide-react";
import FormSection from "./ui/FormSection";
import FormInput from "./ui/FormInput.jsx";
import FormSelect from "./ui/FormSelect.jsx";

const Languages = () => {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "languages",
  });

  return (
    <FormSection
      title="Languages"
      icon={Globe}
      onAdd={() => append({ language: "", proficiency: "" })}
      addButtonLabel="Add Language"
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {fields.map((item, index) => (
          <div
            key={item.id}
            className="relative p-4 border border-gray-200 rounded-lg bg-gray-50 group"
          >
            <button
              type="button"
              onClick={() => remove(index)}
              className="absolute text-gray-400 transition-colors top-2 right-2 hover:text-red-500"
            >
              <Trash2 size={14} />
            </button>
            <div className="space-y-3">
              <FormInput
                name={`languages.${index}.language`}
                label="Language"
                placeholder="e.g. English"
              />
              <FormSelect
                name={`languages.${index}.proficiency`}
                label="Proficiency"
                placeholder="Select Level"
                options={[
                  "Native",
                  "Fluent",
                  "Professional",
                  "Intermediate",
                  "Basic",
                ]}
              />
            </div>
          </div>
        ))}
      </div>
    </FormSection>
  );
};

export default Languages;
