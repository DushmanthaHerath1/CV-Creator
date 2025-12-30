import React from "react";
import { useFormContext } from "react-hook-form";
import PhotoUpload from "./PhotoUpload";

const PersonalDetails = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="p-6 space-y-6 bg-white border border-gray-200 rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-gray-800">Personal Details</h2>

      <PhotoUpload />

      {/* --- 1. HEADER DATA (Digital Contact Only) --- */}
      <div className="pb-6 border-b">
        <h3 className="mb-3 text-sm font-bold text-blue-600 uppercase">
          1. Header Information
        </h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="md:col-span-2">
            <label className="label">Full Name</label>
            <input
              {...register("personalInfo.fullName")}
              className="input"
              placeholder="e.g. Dushmantha Herath"
            />
            {errors.personalInfo?.fullName && (
              <p className="error">{errors.personalInfo.fullName.message}</p>
            )}
          </div>
          <div>
            <label className="label">Job Title</label>
            <input
              {...register("personalInfo.role")}
              className="input"
              placeholder="e.g. Software Engineer"
            />
            {errors.personalInfo?.role && (
              <p className="error">{errors.personalInfo.role.message}</p>
            )}
          </div>
          <div>
            <label className="label">Email</label>
            <input {...register("personalInfo.email")} className="input" />
            {errors.personalInfo?.email && (
              <p className="error">{errors.personalInfo.email.message}</p>
            )}
          </div>
          <div>
            <label className="label">Phone</label>
            <input {...register("personalInfo.phone")} className="input" />
            {errors.personalInfo?.phone && (
              <p className="error">{errors.personalInfo.phone.message}</p>
            )}
          </div>
          {/* Socials moved up to fill the gap */}
          <div>
            <label className="label">LinkedIn (Optional)</label>
            <input
              {...register("personalInfo.linkedin")}
              className="input"
              placeholder="linkedin.com/in/..."
            />
          </div>
          <div>
            <label className="label">GitHub / Website (Optional)</label>
            <input
              {...register("personalInfo.github")}
              className="input"
              placeholder="github.com/..."
            />
          </div>
        </div>

        <div className="mt-4">
          <label className="label">Professional Summary</label>
          <textarea
            {...register("personalInfo.summary")}
            className="h-24 input"
            placeholder="Briefly describe your career goal..."
          />
        </div>
      </div>

      {/* --- 2. BOTTOM DATA (Physical & Bio Data) --- */}
      <div className="pt-2">
        <h3 className="mb-3 text-sm font-bold text-gray-500 uppercase">
          2. Personal Information (Bottom Section)
        </h3>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {/* Address moved here */}
          <div className="col-span-2 md:col-span-3">
            <label className="label">Address / City</label>
            <input
              {...register("personalInfo.address")}
              className="input"
              placeholder="e.g. Colombo, Sri Lanka"
            />
          </div>

          <div>
            <label className="label">Date of Birth</label>
            <input
              {...register("personalInfo.dob")}
              className="input"
              placeholder="YYYY-MM-DD"
            />
          </div>
          <div>
            <label className="label">Gender</label>
            <select
              {...register("personalInfo.gender")}
              className="bg-white input"
            >
              <option value="">Select...</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div>
            <label className="label">Nationality</label>
            <input
              {...register("personalInfo.nationality")}
              className="input"
            />
          </div>
          <div>
            <label className="label">Marital Status</label>
            <select
              {...register("personalInfo.maritalStatus")}
              className="bg-white input"
            >
              <option value="">Select...</option>
              <option value="Single">Single</option>
              <option value="Married">Married</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <label className="label">NIC / Passport No.</label>
            <input {...register("personalInfo.idNumber")} className="input" />
          </div>
        </div>
      </div>

      <style>{`
        .label { display: block; font-size: 0.75rem; font-weight: 700; color: #6b7280; text-transform: uppercase; margin-bottom: 0.25rem; }
        .input { width: 100%; padding: 0.5rem; border: 1px solid #e5e7eb; border-radius: 0.25rem; font-size: 0.875rem; }
        .input:focus { outline: none; border-color: #2563eb; ring: 2px; ring-color: #bfdbfe; }
        .error { color: #ef4444; font-size: 0.75rem; margin-top: 0.25rem; }
      `}</style>
    </div>
  );
};

export default PersonalDetails;
