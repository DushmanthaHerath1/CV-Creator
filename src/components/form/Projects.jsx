import React from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { FolderGit2, Trash2 } from "lucide-react";
import FormSection from "../ui/FormSection.jsx";
import FormInput from "../ui/FormInput.jsx";
import FormTextArea from "../ui/FormTextArea.jsx";
import FormCheckbox from "../ui/FormCheckbox.jsx";

const Projects = () => {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "projects",
  });

  return (
    <FormSection
      title="Projects"
      icon={FolderGit2}
      onAdd={() =>
        append({ title: "", link: "", technologies: "", description: "" })
      }
      addButtonLabel="Add Project"
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
              name={`projects.${index}.title`}
              label="Project Title"
              placeholder="e.g. E-Commerce App"
            />
            <FormInput
              name={`projects.${index}.link`}
              label="Project Link"
              placeholder="github.com/my-project"
            />
            <div className="md:col-span-2">
              <FormInput
                name={`projects.${index}.technologies`}
                label="Technologies Used"
                placeholder="e.g. React, Node.js, MongoDB"
              />
            </div>
            <div className="md:col-span-2">
              <FormCheckbox
                name={`projects.${index}.isCurrent`}
                label="I am currently working on this project (Ongoing)"
              />
            </div>
          </div>

          <FormTextArea
            name={`projects.${index}.description`}
            label="Description"
            placeholder="Describe what you built..."
            rows={3}
          />
        </div>
      ))}
    </FormSection>
  );
};

export default Projects;
