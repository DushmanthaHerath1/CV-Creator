import React from "react";
import { User } from "lucide-react"; // Matching style
import FormInput from "../ui/FormInput.jsx";
import PhotoUpload from "./PhotoUpload.jsx";

const HeaderSection = () => {
  return (
    // 🟢 1. The Card Wrapper (Same as FormSection)
    <div className="p-6 transition-shadow bg-white border border-gray-200 shadow-sm rounded-xl hover:shadow-md">
      {/* 🟢 2. The Header (Same as FormSection Header) */}
      <div className="flex items-center gap-3 pb-4 mb-6 border-b border-gray-100">
        <div className="p-2 rounded-lg bg-blue-50">
          <User size={20} className="text-blue-600" />
        </div>
        <h2 className="text-lg font-bold tracking-wide text-gray-800 uppercase">
          Header Information
        </h2>
      </div>

      {/* 📸 Photo Upload */}
      <div className="flex justify-center p-4 mb-8 border border-gray-200 border-dashed bg-gray-50/50 rounded-xl">
        <PhotoUpload />
      </div>

      {/* 📝 Fields Grid */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <FormInput
          name="personalInfo.fullName"
          label="Full Name"
          placeholder="e.g. Dushmantha Herath"
          className="md:col-span-2"
        />

        <FormInput
          name="personalInfo.role"
          label="Job Title"
          placeholder="e.g. Software Engineer"
        />

        <FormInput
          name="personalInfo.email"
          label="Email"
          placeholder="name@example.com"
        />

        <FormInput
          name="personalInfo.phone"
          label="Phone"
          placeholder="+94 7..."
        />

        <FormInput
          name="personalInfo.linkedin"
          label="LinkedIn (Optional)"
          placeholder="linkedin.com/in/..."
        />

        <FormInput
          name="personalInfo.github"
          label="GitHub (Optional)"
          placeholder="github.com/..."
        />

        <FormInput
          name="personalInfo.website"
          label="Website / Portfolio (Optional)"
          placeholder="mysite.com"
          className="md:col-span-2"
        />
      </div>
    </div>
  );
};

export default HeaderSection;
