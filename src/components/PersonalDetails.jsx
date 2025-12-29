import React from "react";
import { useFormContext } from "react-hook-form";
import PhotoUpload from "./PhotoUpload";

const PersonalDetails = () => {
  // We access the "register" function from the parent form
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-md">
      <h2 className="mb-4 text-xl font-bold text-gray-800">Personal Details</h2>
      <PhotoUpload />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* Full Name */}
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Full Name
          </label>
          <input
            {...register("personalInfo.fullName")}
            placeholder="John Doe"
            className={`w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none ${
              errors.personalInfo?.fullName
                ? "border-red-500"
                : "border-gray-300"
            }`}
          />
          {errors.personalInfo?.fullName && (
            <p className="mt-1 text-xs text-red-500">
              {errors.personalInfo.fullName.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            {...register("personalInfo.email")}
            placeholder="john@example.com"
            className={`w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none ${
              errors.personalInfo?.email ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.personalInfo?.email && (
            <p className="mt-1 text-xs text-red-500">
              {errors.personalInfo.email.message}
            </p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Phone
          </label>
          <input
            {...register("personalInfo.phone")}
            placeholder="+94 77 123 4567"
            className={`w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none ${
              errors.personalInfo?.phone ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.personalInfo?.phone && (
            <p className="mt-1 text-xs text-red-500">
              {errors.personalInfo.phone.message}
            </p>
          )}
        </div>

        {/* Job Title */}
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Job Title
          </label>
          <input
            {...register("personalInfo.role")}
            placeholder="Software Engineer"
            className={`w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none ${
              errors.personalInfo?.role ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.personalInfo?.role && (
            <p className="mt-1 text-xs text-red-500">
              {errors.personalInfo.role.message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PersonalDetails;
