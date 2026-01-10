import React, { useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import { Camera, X, Loader2 } from "lucide-react";

const PhotoUpload = () => {
  const { setValue, watch } = useFormContext();
  const fileInputRef = useRef(null);
  const photoURL = watch("personalInfo.photo");
  const [isCompressing, setIsCompressing] = useState(false);

  // ⚙️ THE COMPRESSOR ENGINE
  const compressImage = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;

        img.onload = () => {
          // Resize to max 300px
          const canvas = document.createElement("canvas");
          const MAX_WIDTH = 300;
          const scaleSize = MAX_WIDTH / img.width;

          canvas.width = MAX_WIDTH;
          canvas.height = img.height * scaleSize;

          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

          // Convert to JPEG at 70% quality (~20KB)
          const compressedBase64 = canvas.toDataURL("image/jpeg", 0.7);
          resolve(compressedBase64);
        };
      };
    });
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setIsCompressing(true);
      try {
        const compressedPhoto = await compressImage(file);
        setValue("personalInfo.photo", compressedPhoto);
      } catch (error) {
        console.error("Image compression error:", error);
        alert("Failed to process image. Try a different file.");
      } finally {
        setIsCompressing(false);
      }
    }
  };

  const handleRemove = () => {
    setValue("personalInfo.photo", "");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="flex items-center gap-4">
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />

      <div
        className="relative flex items-center justify-center w-24 h-24 overflow-hidden transition border-2 border-gray-300 border-dashed rounded-full cursor-pointer bg-gray-50 group hover:border-blue-500"
        onClick={() => !photoURL && fileInputRef.current.click()}
      >
        {isCompressing ? (
          <Loader2 className="text-blue-500 animate-spin" size={24} />
        ) : photoURL ? (
          <>
            <img
              src={photoURL}
              alt="Profile"
              className="object-cover w-full h-full"
            />
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

      <div>
        <h3 className="text-sm font-bold text-gray-700">Profile Picture</h3>
        <p className="mb-2 text-xs text-gray-500">
          {isCompressing ? "Compressing..." : "Auto-compressed & optimized"}
        </p>

        {photoURL && !isCompressing && (
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
