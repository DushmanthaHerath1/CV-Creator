import React from "react";
import { Document } from "@react-pdf/renderer";
import { getTemplate } from "./templates";

const CVDocument = ({ data, activeSections }) => {
  // 🧠 THE SWITCHER LOGIC
  // If data.templateId exists, use it. Otherwise default to 'modern'.
  const templateId = data.templateId || "modern";
  console.log("Selected Template ID:", templateId); // 🐞 DEBUG
  const SelectedTemplate = getTemplate(templateId).component;

  return (
    <Document>
      <SelectedTemplate data={data} activeSections={activeSections} />
    </Document>
  );
};

export default CVDocument;
