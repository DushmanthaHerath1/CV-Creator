// src/pdf/templates/index.js
import ModernTemplate from "./ModernTemplate";
import MinimalTemplate from "./MinimalTemplate";
import ProfessionalTemplate from "./ProfessionalTemplate";
import ElegantTemplate from "./ElegantTemplate";
import CreativeTemplate from "./CreativeTemplate";

export const TEMPLATES = {
  modern: {
    id: "modern",
    name: "Modern Blue",
    component: ModernTemplate,
    description: "Professional layout with blue accents and sidebar.",
    tags: ["Tech", "Corporate", "Visual"],
    isNew: false,
    hasColorVariants: false, // 🚫 No Variants
  },
  minimal: {
    id: "minimal",
    name: "Classic Minimal",
    component: MinimalTemplate,
    description: "Clean, ATS-optimized layout with no graphics.",
    tags: ["ATS-Friendly", "Academic", "Legal"],
    isNew: false,
    hasColorVariants: false, // 🚫 No Variants
  },
  professional: {
    id: "professional",
    name: "The Executive",
    component: ProfessionalTemplate,
    thumbnail: "/templates/professional.jpg", // Placeholder for now
    description: "High-contrast two-column layout with a dark sidebar.",
    tags: ["Executive", "Management", "Modern"],
    isNew: false,
    hasColorVariants: true, // ✅ Customizable Colors
  },
  elegant: {
    id: "elegant",
    name: "Elegant Minimal",
    component: ElegantTemplate,
    description: "Sophisticated layout with timeline-style experience section.",
    tags: ["Creative", "Modern", "Design"],
    isNew: true,
    hasColorVariants: true, // ✅ Customizable Dark Theme
  },
  creative: {
    id: "creative",
    name: "Creative Modern",
    component: CreativeTemplate,
    description: "Contemporary two-column layout with gray sidebar and bold typography.",
    tags: ["Creative", "Designer", "Modern"],
    isNew: true,
    hasColorVariants: false, // 🚫 Fixed Gray Theme
  },
};

export const getTemplate = (id) => {
  return TEMPLATES[id] || TEMPLATES.modern;
};
