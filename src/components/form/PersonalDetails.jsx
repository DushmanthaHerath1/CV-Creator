import React from "react";
import { User } from "lucide-react";
import PhotoUpload from "./PhotoUpload.jsx";
import FormSection from "../ui/FormSection.jsx";
import FormInput from "../ui/FormInput.jsx";
import FormTextArea from "../ui/FormTextArea.jsx";
import FormSelect from "../ui/FormSelect.jsx";

const PersonalDetails = () => {
  return (
    <FormSection title="Personal Details" icon={User}>
      {/* 📸 Photo Upload stays at the top */}
      <div className="flex justify-center mb-6">
        <PhotoUpload />
      </div>

      {/* 🟢 GROUP 1: Header Info */}
      <div className="space-y-4">
        <h3 className="pb-2 text-xs font-bold text-blue-600 uppercase border-b border-blue-100">
          1. Header Information
        </h3>

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

          <FormTextArea
            name="personalInfo.summary"
            label="Professional Summary"
            placeholder="Briefly describe your career goal..."
            className="md:col-span-2"
          />
        </div>
      </div>

      {/* 🟢 GROUP 2: Personal Info */}
      <div className="pt-2 space-y-4">
        <h3 className="pb-2 text-xs font-bold text-gray-500 uppercase border-b border-gray-100">
          2. Personal Information (Bio Data)
        </h3>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          <FormInput
            name="personalInfo.address"
            label="Address / City"
            placeholder="e.g. Colombo"
            className="md:col-span-3"
          />

          <FormInput
            name="personalInfo.dob"
            label="Date of Birth"
            placeholder="YYYY-MM-DD"
            type="date"
          />

          <FormSelect
            name="personalInfo.gender"
            label="Gender"
            options={["Male", "Female", "Other"]}
          />

          <FormInput
            name="personalInfo.nationality"
            label="Nationality"
            placeholder="e.g. Sri Lankan"
          />

          <FormSelect
            name="personalInfo.maritalStatus"
            label="Marital Status"
            options={["Single", "Married"]}
          />

          <FormInput
            name="personalInfo.idNumber"
            label="NIC / Passport No"
            className="md:col-span-2"
          />
        </div>
      </div>
    </FormSection>
  );
};

export default PersonalDetails;
