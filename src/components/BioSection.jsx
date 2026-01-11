import React from "react";
import FormInput from "./ui/FormInput.jsx";
import FormSelect from "./ui/FormSelect.jsx";

const BioSection = () => {
  return (
    <div className="space-y-6">
      {/* Helper Text (Styled like your sub-headers) */}
      <div className="p-3 border border-blue-100 rounded-lg bg-blue-50">
        <p className="text-xs font-medium text-blue-700">
          ℹ These details (Age, Gender, Address) are optional but often required
          for some CV formats.
        </p>
      </div>

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
          placeholder="Select Gender"
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
          placeholder="Select Status"
        />

        <FormInput
          name="personalInfo.idNumber"
          label="NIC / Passport No"
          className="md:col-span-2"
        />
      </div>
    </div>
  );
};

export default BioSection;
