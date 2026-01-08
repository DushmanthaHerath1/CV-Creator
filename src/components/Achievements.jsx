import React from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { Trophy, Trash2 } from "lucide-react";
import FormSection from "./ui/FormSection.jsx";
import FormInput from "./ui/FormInput.jsx";
import FormTextArea from "./ui/FormTextArea.jsx";

const Achievements = () => {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "achievements",
  });

  return (
    <FormSection
      title="Achievements & Awards"
      icon={Trophy}
      onAdd={() => append({ title: "", date: "", description: "" })}
      addButtonLabel="Add Achievement"
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

          <div className="grid grid-cols-1 gap-4 mb-4 md:grid-cols-3">
            <div className="md:col-span-2">
              <FormInput
                name={`achievements.${index}.title`}
                label="Achievement Title"
                placeholder="e.g. Best Developer Award"
              />
            </div>
            <FormInput
              name={`achievements.${index}.date`}
              label="Date"
              placeholder="e.g. 2024"
            />
          </div>

          <FormTextArea
            name={`achievements.${index}.description`}
            label="Description (Optional)"
            placeholder="Brief details about the award..."
            rows={2}
          />
        </div>
      ))}
    </FormSection>
  );
};

export default Achievements;
