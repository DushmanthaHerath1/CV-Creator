import React, { useRef } from "react";
import { useFormContext } from "react-hook-form";
import { Camera, X } from "lucide-react";

const PhotoUpload = () => {
  const { setValue, watch } = useFormContext();
  const fileInputRef = useRef(null);

  // Watch the current photo value to show a preview
  const photoURL = watch("personalInfo.photo");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // 1. Create a FileReader to read the file
      const reader = new FileReader();

      // 2. When reading finishes, update the Form State
      reader.onloadend = () => {
        setValue("personalInfo.photo", reader.result);
      };

      // 3. Start reading the file as a Data URL (Base64)
      reader.readAsDataURL(file);
    }
  };

  const handleRemove = () => {
    setValue("personalInfo.photo", "");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="flex items-center gap-4 mb-6">
      {/* Hidden File Input */}
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />

      {/* The Visual Circle */}
      <div
        className="relative flex items-center justify-center w-24 h-24 overflow-hidden transition border-2 border-gray-300 border-dashed rounded-full cursor-pointer bg-gray-50 group hover:border-blue-500"
        onClick={() => !photoURL && fileInputRef.current.click()}
      >
        {photoURL ? (
          <>
            <img
              src={photoURL}
              alt="Profile"
              className="object-cover w-full h-full"
            />
            {/* Hover Overlay to Edit */}
            <div
              className="absolute inset-0 items-center justify-center hidden text-xs font-bold text-white bg-black/50 group-hover:flex"
              onClick={() => fileInputRef.current.click()}
            >
              Change
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center text-gray-400">
            <Camera size={24} />
            <span className="text-[10px] uppercase font-bold mt-1">Upload</span>
          </div>
        )}
      </div>

      {/* Helper Text / Remove Button */}
      <div>
        <h3 className="text-sm font-bold text-gray-700">Profile Picture</h3>
        <p className="mb-2 text-xs text-gray-500">Max file size: 2MB</p>

        {photoURL && (
          <button
            type="button"
            onClick={handleRemove}
            className="flex items-center gap-1 text-xs font-bold text-red-500 hover:text-red-700"
          >
            <X size={12} /> Remove Photo
          </button>
        )}
      </div>
    </div>
  );
};

export default PhotoUpload;
