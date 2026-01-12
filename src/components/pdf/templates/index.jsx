// src/pdf/templates/index.js
import ModernTemplate from "./ModernTemplate";
import MinimalTemplate from "./MinimalTemplate";

export const TEMPLATES = {
  modern: {
    id: "modern",
    name: "Modern Blue",
    component: ModernTemplate,
    description: "Professional layout with blue accents and sidebar.",
    tags: ["Tech", "Corporate", "Visual"],
    isNew: false,
  },
  minimal: {
    id: "minimal",
    name: "Classic Minimal",
    component: MinimalTemplate,
    description: "Clean, ATS-optimized layout with no graphics.",
    tags: ["ATS-Friendly", "Academic", "Legal"],
    isNew: true,
  },
};

export const getTemplate = (id) => {
  return TEMPLATES[id] || TEMPLATES.modern;
};
