import React from "react";
import { AlignLeft } from "lucide-react"; // Matching style
import FormTextArea from "../ui/FormTextArea.jsx";

const SummarySection = () => {
  return (
    // 🟢 1. The Card Wrapper
    <div className="p-6 transition-shadow bg-white border border-gray-200 shadow-sm rounded-xl hover:shadow-md">
      {/* 🟢 2. The Header */}
      <div className="flex items-center gap-3 pb-4 mb-6 border-b border-gray-100">
        <div className="p-2 rounded-lg bg-blue-50">
          <AlignLeft size={20} className="text-blue-600" />
        </div>
        <h2 className="text-lg font-bold tracking-wide text-gray-800 uppercase">
          Professional Summary
        </h2>
      </div>

      {/* 📝 Content */}
      <FormTextArea
        name="personalInfo.summary"
        label="Summary"
        placeholder="Briefly describe your career goals and professional background..."
        rows={4}
      />
    </div>
  );
};

export default SummarySection;
