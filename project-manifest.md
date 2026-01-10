### 💾 PROJECT MANIFEST (Save Point)

**Instructions:** If this chat ends, copy and paste **everything below this line** into the new chat. It contains the full DNA of your project.

---

**PROJECT: CV Builder Engine (React + Vite)**
**Status:** Feature Complete (Form, Validation, HTML Preview, Print-to-PDF).
**Next Step:** Add Image Upload for Profile Picture.

**Tech Stack:**

- React + Vite
- Tailwind CSS (Styling)
- React Hook Form (State Management)
- Zod (Validation)
- Lucide React (Icons)

**Current File Structure:**

```text
src/
├── components/
│   ├── PersonalDetails.jsx  (Inputs)
│   ├── Experience.jsx       (Dynamic List)
│   ├── Education.jsx        (Dynamic List)
│   ├── Skills.jsx           (Tags Input)
│   └── CVPreview.jsx        (HTML Preview + Print Logic)
├── schemas/
│   └── cvSchema.js          (Zod Rules)
├── hooks/
│   └── useDebounce.js       (Performance Helper - currently unused but kept)
├── App.jsx                  (Main Layout)
├── index.css                (Tailwind + Print Media Queries)
└── main.jsx                 (Entry Point)

```

---

#### 1. The Styles (`src/index.css`)

_Contains the critical Print Logic to hide the UI and fix margins._

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* --- PRINT STYLES --- */
@media print {
  html,
  body {
    margin: 0;
    padding: 0;
    height: 100%;
    overflow: hidden;
  }

  body * {
    visibility: hidden;
  }

  #cv-print-area,
  #cv-print-area * {
    visibility: visible;
  }

  #cv-print-area {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    margin: 0;
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
    box-shadow: none !important;
    border: none !important;
  }

  @page {
    size: A4;
    margin: 0mm;
  }
}
```

#### 2. The Preview Engine (`src/components/CVPreview.jsx`)

_The "JobSeeker Style" HTML preview that prints perfectly._

```jsx
import React from "react";
import { useFormContext } from "react-hook-form";
import {
  Mail,
  Phone,
  MapPin,
  Briefcase,
  GraduationCap,
  Wrench,
} from "lucide-react";

const CVPreview = () => {
  const { watch } = useFormContext();
  const data = watch();

  return (
    <div className="h-screen sticky top-0 p-4 border-l border-gray-200 bg-gray-100 overflow-y-auto">
      <div className="flex justify-between items-center mb-4 px-2 max-w-[210mm] mx-auto">
        <h2 className="font-bold text-gray-800 text-lg">Live Preview</h2>
        <button
          onClick={() => window.print()}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm font-bold shadow-sm transition"
        >
          Download PDF
        </button>
      </div>

      <div
        className="bg-white shadow-2xl mx-auto p-[15mm] min-h-[297mm] w-[210mm]"
        id="cv-print-area"
      >
        <header className="border-b-2 border-gray-800 pb-6 mb-6">
          <h1 className="text-4xl font-extrabold text-gray-900 uppercase tracking-tight">
            {data.personalInfo.fullName || "Your Name"}
          </h1>
          <p className="text-xl text-gray-600 font-medium mt-1">
            {data.personalInfo.role || "Job Title"}
          </p>
          <div className="flex flex-wrap gap-4 mt-4 text-sm text-gray-600">
            {data.personalInfo.email && (
              <div className="flex items-center gap-1">
                <Mail size={14} /> {data.personalInfo.email}
              </div>
            )}
            {data.personalInfo.phone && (
              <div className="flex items-center gap-1">
                <Phone size={14} /> {data.personalInfo.phone}
              </div>
            )}
          </div>
          {data.personalInfo.summary && (
            <p className="mt-4 text-gray-700 leading-relaxed text-sm">
              {data.personalInfo.summary}
            </p>
          )}
        </header>

        {/* Experience Section */}
        {data.experience?.length > 0 && (
          <section className="mb-8">
            <h3 className="text-lg font-bold text-gray-800 uppercase border-b border-gray-300 pb-1 mb-4 flex items-center gap-2">
              <Briefcase size={18} /> Experience
            </h3>
            <div className="space-y-5">
              {data.experience.map((job, index) => (
                <div key={index}>
                  <div className="flex justify-between items-baseline">
                    <h4 className="font-bold text-gray-900">{job.role}</h4>
                    <span className="text-sm text-gray-500 font-medium whitespace-nowrap">
                      {job.startDate} — {job.endDate}
                    </span>
                  </div>
                  <p className="text-blue-600 font-medium text-sm mb-1">
                    {job.company}
                  </p>
                  <p className="text-sm text-gray-700 whitespace-pre-line leading-relaxed">
                    {job.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education Section */}
        {data.education?.length > 0 && (
          <section className="mb-8">
            <h3 className="text-lg font-bold text-gray-800 uppercase border-b border-gray-300 pb-1 mb-4 flex items-center gap-2">
              <GraduationCap size={18} /> Education
            </h3>
            <div className="space-y-4">
              {data.education.map((edu, index) => (
                <div key={index} className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-gray-900">{edu.school}</h4>
                    <p className="text-sm text-gray-600">{edu.degree}</p>
                  </div>
                  <span className="text-sm text-gray-500 font-medium">
                    {edu.date}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills Section */}
        {data.skills?.length > 0 && (
          <section>
            <h3 className="text-lg font-bold text-gray-800 uppercase border-b border-gray-300 pb-1 mb-4 flex items-center gap-2">
              <Wrench size={18} /> Skills
            </h3>
            <div className="flex flex-wrap gap-2">
              {data.skills.map((skill, index) => (
                <span
                  key={index}
                  className="bg-gray-200 text-gray-800 px-3 py-1 rounded text-sm font-medium"
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};
export default CVPreview;
```

#### 3. The Main App (`src/App.jsx`)

_Connects the Form Provider to the UI components._

```jsx
import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cvSchema } from "./schemas/cvSchema";
import PersonalDetails from "./components/PersonalDetails";
import Experience from "./components/Experience";
import Education from "./components/Education";
import Skills from "./components/Skills";
import CVPreview from "./components/CVPreview";

function App() {
  const methods = useForm({
    resolver: zodResolver(cvSchema),
    mode: "onChange",
    defaultValues: {
      personalInfo: {
        fullName: "",
        email: "",
        phone: "",
        role: "",
        summary: "",
      },
      experience: [],
      education: [],
      skills: [],
    },
  });

  return (
    <div className="min-h-screen bg-gray-100">
      <FormProvider {...methods}>
        <div className="flex flex-col md:flex-row">
          {/* LEFT: Editor */}
          <div className="w-full md:w-1/2 p-8 overflow-y-auto h-screen pb-32">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">
              CV Builder Engine
            </h1>
            <form className="space-y-6">
              <PersonalDetails />
              <Experience />
              <Education />
              <Skills />
            </form>
          </div>
          {/* RIGHT: Preview */}
          <div className="w-full md:w-1/2 bg-gray-800">
            <CVPreview />
          </div>
        </div>
      </FormProvider>
    </div>
  );
}
export default App;
```

#### 4. The Validation Rules (`src/schemas/cvSchema.js`)

```javascript
import { z } from "zod";

export const cvSchema = z.object({
  personalInfo: z.object({
    fullName: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(10, "Phone number is too short"),
    role: z.string().min(2, "Job title is required"),
    summary: z.string().optional(),
  }),
  experience: z
    .array(
      z.object({
        role: z.string().min(2, "Role required"),
        company: z.string().min(2, "Company required"),
        startDate: z.string().optional(),
        endDate: z.string().optional(),
        description: z.string().optional(),
      })
    )
    .optional(),
  education: z
    .array(
      z.object({
        school: z.string().min(2, "School required"),
        degree: z.string().min(2, "Degree required"),
        date: z.string().optional(),
      })
    )
    .optional(),
  skills: z
    .array(
      z.object({
        name: z.string().min(1, "Skill cannot be empty"),
      })
    )
    .optional(),
});
```

## 12/30/2025 - 04.02AM

### 💾 MANIFEST UPDATE (Brick 5: Photo & Auto-Save)

**Status:** Profile Picture Upload (Base64), Auto-Save (LocalStorage), and Print Layout fixed.

#### 1. The Schema (`src/schemas/cvSchema.js`)

_Added the `photo` field to the validation rules._

```javascript
import { z } from "zod";

export const cvSchema = z.object({
  personalInfo: z.object({
    fullName: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(10, "Phone number is too short"),
    role: z.string().min(2, "Job title is required"),
    summary: z.string().optional(),
    photo: z.string().optional(), // <--- NEW FIELD
  }),
  experience: z
    .array(
      z.object({
        role: z.string().min(2, "Role required"),
        company: z.string().min(2, "Company required"),
        startDate: z.string().optional(),
        endDate: z.string().optional(),
        description: z.string().optional(),
      })
    )
    .optional(),
  education: z
    .array(
      z.object({
        school: z.string().min(2, "School required"),
        degree: z.string().min(2, "Degree required"),
        date: z.string().optional(),
      })
    )
    .optional(),
  skills: z
    .array(
      z.object({
        name: z.string().min(1, "Skill cannot be empty"),
      })
    )
    .optional(),
});
```

#### 2. New Component (`src/components/PhotoUpload.jsx`)

_Handles file selection, Base64 conversion, and 500KB limit._

```jsx
import React, { useRef } from "react";
import { useFormContext } from "react-hook-form";
import { Camera, X } from "lucide-react";

const PhotoUpload = () => {
  const { setValue, watch } = useFormContext();
  const fileInputRef = useRef(null);
  const photoURL = watch("personalInfo.photo");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 500000) {
        alert("Image is too big! Please use an image under 500KB.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setValue("personalInfo.photo", reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemove = () => {
    setValue("personalInfo.photo", "");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="flex items-center gap-4 mb-6">
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />
      <div
        className="w-24 h-24 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-50 overflow-hidden relative group cursor-pointer hover:border-blue-500 transition"
        onClick={() => !photoURL && fileInputRef.current.click()}
      >
        {photoURL ? (
          <>
            <img
              src={photoURL}
              alt="Profile"
              className="w-full h-full object-cover"
            />
            <div
              className="absolute inset-0 bg-black/50 hidden group-hover:flex items-center justify-center text-white text-xs font-bold"
              onClick={() => fileInputRef.current.click()}
            >
              Change
            </div>
          </>
        ) : (
          <div className="text-gray-400 flex flex-col items-center">
            <Camera size={24} />
            <span className="text-[10px] uppercase font-bold mt-1">Upload</span>
          </div>
        )}
      </div>
      <div>
        <h3 className="text-sm font-bold text-gray-700">Profile Picture</h3>
        <p className="text-xs text-gray-500 mb-2">Max file size: 500KB</p>
        {photoURL && (
          <button
            type="button"
            onClick={handleRemove}
            className="text-red-500 text-xs font-bold flex items-center gap-1 hover:text-red-700"
          >
            <X size={12} /> Remove Photo
          </button>
        )}
      </div>
    </div>
  );
};
export default PhotoUpload;
```

#### 3. Personal Details Update (`src/components/PersonalDetails.jsx`)

_Added the PhotoUpload component._

```jsx
import React from "react";
import { useFormContext } from "react-hook-form";
import PhotoUpload from "./PhotoUpload";

const PersonalDetails = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="p-6 bg-white rounded-lg shadow-md border border-gray-200">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Personal Details</h2>
      <PhotoUpload />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* ... Inputs for Name, Email, Phone, Role, Summary ... */}
        {/* (Refer to previous manifest for inputs if needed, they haven't changed) */}
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
            Full Name
          </label>
          <input
            {...register("personalInfo.fullName")}
            className={`w-full p-2 border rounded ${
              errors.personalInfo?.fullName ? "border-red-500" : "bg-white"
            }`}
          />
          {errors.personalInfo?.fullName && (
            <p className="text-red-500 text-xs mt-1">
              {errors.personalInfo.fullName.message}
            </p>
          )}
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
            Email
          </label>
          <input
            {...register("personalInfo.email")}
            className={`w-full p-2 border rounded ${
              errors.personalInfo?.email ? "border-red-500" : "bg-white"
            }`}
          />
          {errors.personalInfo?.email && (
            <p className="text-red-500 text-xs mt-1">
              {errors.personalInfo.email.message}
            </p>
          )}
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
            Phone
          </label>
          <input
            {...register("personalInfo.phone")}
            className={`w-full p-2 border rounded ${
              errors.personalInfo?.phone ? "border-red-500" : "bg-white"
            }`}
          />
          {errors.personalInfo?.phone && (
            <p className="text-red-500 text-xs mt-1">
              {errors.personalInfo.phone.message}
            </p>
          )}
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
            Job Title
          </label>
          <input
            {...register("personalInfo.role")}
            className={`w-full p-2 border rounded ${
              errors.personalInfo?.role ? "border-red-500" : "bg-white"
            }`}
          />
          {errors.personalInfo?.role && (
            <p className="text-red-500 text-xs mt-1">
              {errors.personalInfo.role.message}
            </p>
          )}
        </div>
        <div className="col-span-1 md:col-span-2">
          <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
            Professional Summary
          </label>
          <textarea
            {...register("personalInfo.summary")}
            className="w-full p-2 border rounded bg-white h-24"
          />
        </div>
      </div>
    </div>
  );
};
export default PersonalDetails;
```

#### 4. The App Logic (`src/App.jsx`)

_Includes Auto-Save to LocalStorage and Reset Button._

```jsx
import React, { useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cvSchema } from "./schemas/cvSchema";
import PersonalDetails from "./components/PersonalDetails";
import Experience from "./components/Experience";
import Education from "./components/Education";
import Skills from "./components/Skills";
import CVPreview from "./components/CVPreview";

const loadSavedData = () => {
  try {
    const saved = localStorage.getItem("cvData");
    return saved ? JSON.parse(saved) : null;
  } catch (e) {
    return null;
  }
};

function App() {
  const savedData = loadSavedData();
  const methods = useForm({
    resolver: zodResolver(cvSchema),
    mode: "onChange",
    defaultValues: savedData || {
      personalInfo: {
        fullName: "",
        email: "",
        phone: "",
        role: "",
        summary: "",
        photo: "",
      },
      experience: [],
      education: [],
      skills: [],
    },
  });

  useEffect(() => {
    const subscription = methods.watch((value) => {
      localStorage.setItem("cvData", JSON.stringify(value));
    });
    return () => subscription.unsubscribe();
  }, [methods]);

  return (
    <div className="min-h-screen bg-gray-100">
      <FormProvider {...methods}>
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/2 p-8 overflow-y-auto h-screen pb-32">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold text-gray-800">
                CV Builder Engine
              </h1>
              <button
                onClick={() => {
                  if (confirm("Are you sure? This will clear your data.")) {
                    localStorage.removeItem("cvData");
                    window.location.reload();
                  }
                }}
                className="text-xs text-red-500 hover:text-red-700 underline"
              >
                Reset Form
              </button>
            </div>
            <form className="space-y-6">
              <PersonalDetails />
              <Experience />
              <Education />
              <Skills />
            </form>
          </div>
          <div className="w-full md:w-1/2 bg-gray-800">
            <CVPreview />
          </div>
        </div>
      </FormProvider>
    </div>
  );
}
export default App;
```

12/31/2025 - 03.46AM
Here are the specific updates you need to make to your `project-menifest.md` to reflect the **PDF Engine**, **Image Compressor**, and **Extended Details** we just built.

Copy these blocks and replace the corresponding sections in your manifest file.

### 1. Update "Tech Stack" & "File Structure"

_Add the new PDF library and the new PDF component file._

```markdown
**Tech Stack:**

- React + Vite
- Tailwind CSS (Styling)
- React Hook Form (State Management)
- Zod (Validation)
- Lucide React (Icons)
- @react-pdf/renderer (PDF Generation) 🆕

**Current File Structure:**
src/
├── components/
│ ├── pdf/
│ │ └── CVDocument.jsx (PDF Template Engine) 🆕
│ ├── PersonalDetails.jsx (Inputs + Extended Fields)
│ ├── PhotoUpload.jsx (Compression Logic)
│ ├── Experience.jsx
│ ├── Education.jsx
│ ├── Skills.jsx
│ └── CVPreview.jsx (Download Button & Web View)
├── schemas/
│ └── cvSchema.js (Zod Rules)
├── App.jsx
├── index.css
├── index.html (Buffer Polyfill)
└── main.jsx
```

---

### 2. Update "The Schema (`src/schemas/cvSchema.js`)"

_Replace the old schema block with this one (includes the new Location/Socials/BioData fields)._

```javascript
import { z } from "zod";

export const cvSchema = z.object({
  personalInfo: z.object({
    fullName: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(10, "Phone number is too short"),
    role: z.string().min(2, "Job title is required"),
    summary: z.string().optional(),
    photo: z.string().optional(),

    // --- NEW EXTENDED FIELDS ---
    address: z.string().optional(),
    linkedin: z.string().optional(),
    github: z.string().optional(),
    dob: z.string().optional(),
    gender: z.string().optional(),
    nationality: z.string().optional(),
    maritalStatus: z.string().optional(),
    idNumber: z.string().optional(),
  }),
  experience: z
    .array(
      z.object({
        role: z.string().min(2, "Role required"),
        company: z.string().min(2, "Company required"),
        startDate: z.string().optional(),
        endDate: z.string().optional(),
        description: z.string().optional(),
      })
    )
    .optional(),
  education: z
    .array(
      z.object({
        school: z.string().min(2, "School required"),
        degree: z.string().min(2, "Degree required"),
        date: z.string().optional(),
      })
    )
    .optional(),
  skills: z
    .array(
      z.object({
        name: z.string().min(1, "Skill cannot be empty"),
      })
    )
    .optional(),
});
```

---

### 3. Update "Photo Upload (`src/components/PhotoUpload.jsx`)"

_Reflects the new **Canvas Compression** logic._

```jsx
import React, { useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import { Camera, X, Loader2 } from "lucide-react";

const PhotoUpload = () => {
  const { setValue, watch } = useFormContext();
  const fileInputRef = useRef(null);
  const photoURL = watch("personalInfo.photo");
  const [isCompressing, setIsCompressing] = useState(false);

  const compressImage = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const MAX_WIDTH = 300;
          const scaleSize = MAX_WIDTH / img.width;
          canvas.width = MAX_WIDTH;
          canvas.height = img.height * scaleSize;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          resolve(canvas.toDataURL("image/jpeg", 0.7));
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
    <div className="flex items-center gap-4 mb-6">
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />
      <div
        className="w-24 h-24 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-50 overflow-hidden relative group cursor-pointer hover:border-blue-500 transition"
        onClick={() => !photoURL && fileInputRef.current.click()}
      >
        {isCompressing ? (
          <Loader2 className="animate-spin text-blue-500" size={24} />
        ) : photoURL ? (
          <>
            <img
              src={photoURL}
              alt="Profile"
              className="w-full h-full object-cover"
            />
            <div
              className="absolute inset-0 bg-black/50 hidden group-hover:flex items-center justify-center text-white text-xs font-bold"
              onClick={() => fileInputRef.current.click()}
            >
              Change
            </div>
          </>
        ) : (
          <div className="text-gray-400 flex flex-col items-center">
            <Camera size={24} />
            <span className="text-[10px] uppercase font-bold mt-1">Upload</span>
          </div>
        )}
      </div>
    </div>
  );
};
export default PhotoUpload;
```

---

### 4. Update "The Preview Engine (`src/components/CVPreview.jsx`)"

_Reflects the switch to `PDFDownloadLink`._

```jsx
import React from "react";
import { useFormContext } from "react-hook-form";
import { PDFDownloadLink } from "@react-pdf/renderer";
import CVDocument from "./pdf/CVDocument";
import { Download } from "lucide-react";
// ... (Imports for icons used in web preview: Mail, Phone, etc.)

const CVPreview = () => {
  const { watch } = useFormContext();
  const data = watch();

  return (
    <div className="sticky top-0 h-screen p-4 overflow-y-auto bg-gray-100 border-l border-gray-200">
      <div className="flex justify-between items-center mb-4 px-2 max-w-[210mm] mx-auto">
        <h2 className="text-lg font-bold text-gray-800">Live Preview</h2>

        {/* DOWNLOAD BUTTON */}
        <PDFDownloadLink
          document={<CVDocument data={data} />}
          fileName={`${data.personalInfo.fullName || "resume"}.pdf`}
          className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-white transition bg-blue-600 rounded shadow-sm hover:bg-blue-700 no-underline"
        >
          {({ loading }) => (
            <>
              <Download size={16} />
              {loading ? "Generating..." : "Download PDF"}
            </>
          )}
        </PDFDownloadLink>
      </div>

      {/* WEB VIEW (Visual Only) */}
      <div
        className="bg-white shadow-2xl mx-auto p-[15mm] w-[210mm] min-h-[297mm]"
        id="cv-print-area"
      >
        {/* ... (Existing HTML Structure for Web Preview) ... */}
      </div>
    </div>
  );
};
export default CVPreview;
```

---

### 5. ADD NEW SECTION: "The PDF Engine (`src/components/pdf/CVDocument.jsx`)"

_This is the new critical file that generates the actual PDF._

```jsx
import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image, Link } from '@react-pdf/renderer';

// Standard Helvetica Font (Safe Mode)
const styles = StyleSheet.create({
  page: { padding: 30, fontSize: 10, lineHeight: 1.5, fontFamily: 'Helvetica', color: '#374151' },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 20, borderBottomWidth: 1, borderBottomColor: '#1f2937', paddingBottom: 15 },
  photo: { width: 60, height: 60, borderRadius: 30, objectFit: 'cover' },
  headerRight: { marginLeft: 20, flex: 1 },
  name: { fontSize: 22, fontWeight: 'bold', textTransform: 'uppercase', color: '#111827', marginBottom: 4, lineHeight: 1.2 },
  // ... (Full styles for sections, grid layout, skills)
});

const CVDocument = ({ data }) => {
  const hasBioData = data.personalInfo.address || data.personalInfo.dob || ...; // Check logic

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header, Summary, Experience, Education, Skills, Bio Grid */}
        {/* ... (Full PDF XML Structure) ... */}
      </Page>
    </Document>
  );
};
export default CVDocument;

```

---

### 6. ADD NEW SECTION: "Buffer Polyfill (`index.html`)"

_Critical for allowing PDF generation in the browser._

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <script type="module">
      import { Buffer } from "buffer";
      window.Buffer = Buffer;
      window.global = window;
    </script>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

## 01/01/2026 - 03.50AM

### 💾 1. PROJECT MANIFEST UPDATE (Brick 6 & 7: PDF Engine & Smart Pagination)

**Status:** Advanced PDF Generation (Client-Side), Smart Pagination (Ghost Measurement), Multi-Page "Jobseeker" Preview.

#### A. Tech Stack Update

_Add these to your stack list:_

- **@react-pdf/renderer**: For generating the actual PDF binary.
- **file-saver**: For triggering the manual download.

#### B. The Smart Preview (`src/components/CVPreview.jsx`)

_This is the new "Brain" that splits content into pages visually._

```jsx
import React, { useState, useLayoutEffect, useRef, useMemo } from "react";
import { useFormContext } from "react-hook-form";
import { pdf } from "@react-pdf/renderer";
import { saveAs } from "file-saver";
import CVDocument from "./pdf/CVDocument";
import {
  Mail,
  Phone,
  Briefcase,
  GraduationCap,
  Wrench,
  Linkedin,
  Github,
  User,
  FileText,
  Download,
  Loader2,
} from "lucide-react";

// CONFIGURATION
const A4_HEIGHT_PX = 1123;
const PAGE_MARGIN = 100;
const USABLE_HEIGHT = A4_HEIGHT_PX - PAGE_MARGIN;

// ... (SectionHeader Helper) ...

const CVPreview = () => {
  const { watch } = useFormContext();
  const data = watch();
  const [isGenerating, setIsGenerating] = useState(false);

  const ghostRef = useRef(null);
  const [pageLayout, setPageLayout] = useState([]);

  // ... (contentBlocks definition with useMemo) ...

  // --- THE GHOST MEASURER ---
  useLayoutEffect(() => {
    if (!ghostRef.current) return;

    const pages = [[]];
    let currentPageHeight = 0;
    let currentPageIndex = 0;

    const elements = Array.from(ghostRef.current.children);

    elements.forEach((el) => {
      const height = el.offsetHeight;
      const blockId = el.getAttribute("data-id");

      if (currentPageHeight + height > USABLE_HEIGHT) {
        currentPageIndex++;
        pages[currentPageIndex] = [];
        currentPageHeight = 0;
      }

      pages[currentPageIndex].push(blockId);
      currentPageHeight += height;
    });

    if (JSON.stringify(pages) !== JSON.stringify(pageLayout)) {
      setPageLayout(pages);
    }
  }, [contentBlocks, pageLayout]);

  // ... (handleDownload function) ...

  return (
    <div className="sticky top-0 h-screen overflow-y-auto bg-gray-100 border-l border-gray-200">
      {/* ... Controls ... */}

      {/* GHOST LAYER */}
      <div
        ref={ghostRef}
        className="absolute top-0 left-0 w-[210mm] invisible pointer-events-none"
      >
        {contentBlocks.map((block) => (
          <div key={block.id} data-id={block.id} className="p-1">
            {block.render()}
          </div>
        ))}
      </div>

      {/* VISIBLE PAGES */}
      <div className="flex flex-col items-center gap-8 pb-20">
        {pageLayout.map((pageItems, pageIndex) => (
          <div
            key={pageIndex}
            className="bg-white shadow-xl w-[210mm] min-h-[297mm] p-[15mm] relative"
          >
            {/* ... Page Content ... */}
          </div>
        ))}
      </div>
    </div>
  );
};
export default CVPreview;
```

#### C. The PDF Template (`src/components/pdf/CVDocument.jsx`)

_The print instructions that receive the "Breaks" map._

```jsx
import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
  Link,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 10,
    lineHeight: 1.5,
    fontFamily: "Helvetica",
    color: "#374151",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#1f2937",
    paddingBottom: 15,
  },
  photo: { width: 100, height: 100, borderRadius: 50, objectFit: "cover" }, // Enlarged Photo
  headerRight: { marginLeft: 30, flex: 1 },
  // ... (Rest of styles)
});

const CVDocument = ({ data, breaks = {} }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* ... (View structures with {breaks['id'] && <View break />} logic) ... */}
      </Page>
    </Document>
  );
};
export default CVDocument;
```

---

## 06/01/2026 - 04.09AM

### 🧱 Brick 9: The "Type C" Architecture (PDF-First Engine)

**Status:** 🌟 GOLD STANDARD (Stable)
**Core Concept:** "True WYSIWYG" — The Preview _is_ the PDF.
**Problem Solved:** Eliminated "Layout Shift" between HTML preview and PDF export. The browser's CSS engine and the PDF's Yoga engine no longer fight; we strictly use the PDF engine for both.

**Technical Stack:**

- **Generator:** `@react-pdf/renderer` (Headless `usePDF` hook) to create binary Blobs.
- **Renderer:** `react-pdf` (Mozilla's PDF.js) to paint those Blobs onto an HTML Canvas.
- **Throttler:** `use-debounce` to prevent UI freezing during typing.

**Critical Files:**

- `src/components/CVPreview.jsx`: The orchestrator. Manages the "Blob-to-Canvas" pipeline, handles debouncing (via `JSON.stringify` to prevent loops), and manages the zoom/responsive width.
- `src/components/pdf/CVDocument.jsx`: The pure PDF template. Contains the layout logic and the custom icon library.

`src/components/CVPreview.jsx`
import React, { useState, useEffect, useRef, useMemo } from "react";
import { useFormContext } from "react-hook-form";
import { useDebounce } from "use-debounce";
import { pdf } from "@react-pdf/renderer";
import { Document, Page, pdfjs } from "react-pdf";
import CVDocument from "./pdf/CVDocument";
import { Download, Loader2, ZoomIn, ZoomOut } from "lucide-react";

// ✅ 1. STABLE WORKER SETUP
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";

// 🛑 FIX: Define options OUTSIDE the component to prevent infinite re-loading
const PDF_OPTIONS = {
cMapUrl: `https://unpkg.com/pdfjs-dist@${pdfjs.version}/cmaps/`,
cMapPacked: true,
};

const CVPreview = () => {
const { watch } = useFormContext();
const formData = watch();

// 1. DEBOUNCE LOGIC (Prevents typing lag)
const [debouncedDataString] = useDebounce(JSON.stringify(formData), 1000);
const debouncedData = useMemo(
() => JSON.parse(debouncedDataString),
[debouncedDataString]
);

const [pdfBlob, setPdfBlob] = useState(null);
const [numPages, setNumPages] = useState(null);
const [isGenerating, setIsGenerating] = useState(false);
const [scale, setScale] = useState(1.0);

// 📏 RESPONSIVE WIDTH LOGIC
const containerRef = useRef(null);
const [containerWidth, setContainerWidth] = useState(600);

useEffect(() => {
const updateWidth = () => {
if (containerRef.current) {
setContainerWidth(containerRef.current.offsetWidth - 40);
}
};
updateWidth();
window.addEventListener("resize", updateWidth);
return () => window.removeEventListener("resize", updateWidth);
}, []);

// 📝 GENERATOR
useEffect(() => {
const generatePdf = async () => {
setIsGenerating(true);
try {
const blob = await pdf(<CVDocument data={debouncedData} />).toBlob();
setPdfBlob(blob);
} catch (error) {
console.error("PDF Gen Error:", error);
} finally {
setIsGenerating(false);
}
};

    if (debouncedData) generatePdf();

}, [debouncedData]);

const handleDownload = () => {
if (!pdfBlob) return;
const url = URL.createObjectURL(pdfBlob);
const link = document.createElement("a");
link.href = url;
link.download = `${debouncedData.personalInfo.fullName || "CV"}.pdf`;
link.click();
};

return (

<div className="flex flex-col h-screen bg-gray-100 border-l border-gray-300">
{/_ TOOLBAR _/}
<div className="z-10 flex items-center justify-between p-3 bg-white border-b border-gray-200 shadow-sm">
<div className="flex items-center gap-2">
<h2 className="text-sm font-bold tracking-wide text-gray-700 uppercase">
Live Preview
</h2>
{isGenerating ? (
<span className="flex items-center gap-1 text-xs text-blue-600 font-medium bg-blue-50 px-2 py-0.5 rounded-full animate-pulse">
<Loader2 size={10} className="animate-spin" /> Updating...
</span>
) : (
<span className="text-xs text-green-600 font-medium bg-green-50 px-2 py-0.5 rounded-full">
✓ Ready
</span>
)}
</div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setScale((s) => Math.max(0.5, s - 0.1))}
            className="p-1.5 hover:bg-gray-100 rounded text-gray-600"
          >
            <ZoomOut size={16} />
          </button>
          <span className="w-12 font-mono text-xs text-center">
            {(scale * 100).toFixed(0)}%
          </span>
          <button
            onClick={() => setScale((s) => Math.min(2.0, s + 0.1))}
            className="p-1.5 hover:bg-gray-100 rounded text-gray-600"
          >
            <ZoomIn size={16} />
          </button>

          <div className="w-px h-4 mx-1 bg-gray-300"></div>

          <button
            onClick={handleDownload}
            disabled={!pdfBlob}
            className="flex items-center gap-1.5 bg-gray-900 hover:bg-black text-white px-4 py-1.5 rounded text-sm font-bold transition disabled:opacity-50"
          >
            <Download size={14} /> Download PDF
          </button>
        </div>
      </div>

      {/* 🖼️ PREVIEW AREA */}
      <div
        ref={containerRef}
        className="flex justify-center flex-1 p-8 overflow-y-auto bg-slate-200 scroll-smooth"
      >
        {pdfBlob ? (
          <Document
            file={pdfBlob}
            options={PDF_OPTIONS} // 👈 USING STABLE CONSTANT HERE
            onLoadSuccess={({ numPages }) => setNumPages(numPages)}
            loading={null}
            className="flex flex-col gap-6"
          >
            {Array.from(new Array(numPages), (_, index) => (
              <div key={`page_${index + 1}`} className="shadow-xl">
                <Page
                  pageNumber={index + 1}
                  width={containerWidth * scale}
                  renderTextLayer={true}
                  renderAnnotationLayer={false}
                  className="bg-white"
                />
                <div className="text-center mt-2 text-[10px] text-gray-400 font-bold tracking-widest uppercase">
                  Page {index + 1}
                </div>
              </div>
            ))}
          </Document>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-gray-400">
            <Loader2 className="mb-3 animate-spin" size={32} />
            <p className="text-sm font-medium">Initializing Engine...</p>
          </div>
        )}
      </div>
    </div>

);
};

export default CVPreview;

```


`src/components/pdf/CVDocument.jsx`
import React from "react";
import {
 Page,
 Text,
 View,
 Document,
 StyleSheet,
 Image,
 Link,
 Svg,
 Path,
} from "@react-pdf/renderer";

// --- 🛠️ ICON LIBRARY (Safe Path-Only Versions of Lucide Icons) ---

// 1. CONTACT ICONS
const IconMail = () => (
 <Svg width={10} height={10} viewBox="0 0 24 24">
   {/* Path for Envelope Flap */}
   <Path
     d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"
     stroke="#374151"
     strokeWidth={2}
     fill="none"
     strokeLinecap="round"
     strokeLinejoin="round"
   />
   {/* Rect converted to Path for Envelope Body */}
   <Path
     d="M4 4 h16 a2 2 0 0 1 2 2 v12 a2 2 0 0 1 -2 2 h-16 a2 2 0 0 1 -2 -2 v-12 a2 2 0 0 1 2 -2 z"
     stroke="#374151"
     strokeWidth={2}
     fill="none"
     strokeLinecap="round"
     strokeLinejoin="round"
   />
 </Svg>
);

const IconPhone = () => (
 <Svg width={10} height={10} viewBox="0 0 24 24">
   <Path
     d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384"
     stroke="#374151"
     strokeWidth={2}
     fill="none"
     strokeLinecap="round"
     strokeLinejoin="round"
   />
 </Svg>
);

const IconLinkedin = () => (
 <Svg width={10} height={10} viewBox="0 0 24 24">
   <Path
     d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"
     stroke="#2563eb"
     strokeWidth={2}
     fill="none"
     strokeLinecap="round"
     strokeLinejoin="round"
   />
   {/* Rect converted to Path */}
   <Path
     d="M2 9 h4 v12 h-4 z"
     stroke="#2563eb"
     strokeWidth={2}
     fill="none"
     strokeLinecap="round"
     strokeLinejoin="round"
   />
   {/* Circle converted to Path */}
   <Path
     d="M4 2 a2 2 0 1 1 0 4 a2 2 0 0 1 0 -4 z"
     stroke="#2563eb"
     strokeWidth={2}
     fill="none"
     strokeLinecap="round"
     strokeLinejoin="round"
   />
 </Svg>
);

const IconGithub = () => (
 <Svg width={10} height={10} viewBox="0 0 24 24">
   <Path
     d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"
     stroke="#374151"
     strokeWidth={2}
     fill="none"
     strokeLinecap="round"
     strokeLinejoin="round"
   />
   <Path
     d="M9 18c-4.51 2-5-2-7-2"
     stroke="#374151"
     strokeWidth={2}
     fill="none"
     strokeLinecap="round"
     strokeLinejoin="round"
   />
 </Svg>
);

const IconMapPin = () => (
 <Svg width={8} height={8} viewBox="0 0 24 24">
   <Path
     d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"
     stroke="#6b7280"
     strokeWidth={2}
     fill="none"
     strokeLinecap="round"
     strokeLinejoin="round"
   />
   {/* Circle converted to Path */}
   <Path
     d="M12 7 a3 3 0 1 1 0 6 a3 3 0 0 1 0 -6 z"
     stroke="#6b7280"
     strokeWidth={2}
     fill="none"
     strokeLinecap="round"
     strokeLinejoin="round"
   />
 </Svg>
);

// 2. SECTION ICONS (Lucide Designs - Path Only)

// Summary (User)
const IconSummary = () => (
 <Svg width={12} height={12} viewBox="0 0 24 24">
   <Path
     d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"
     stroke="#1f2937"
     strokeWidth={2}
     fill="none"
     strokeLinecap="round"
     strokeLinejoin="round"
   />
   {/* Circle converted to Path */}
   <Path
     d="M12 3 a4 4 0 1 1 0 8 a4 4 0 0 1 0 -8 z"
     stroke="#1f2937"
     strokeWidth={2}
     fill="none"
     strokeLinecap="round"
     strokeLinejoin="round"
   />
 </Svg>
);

// Experience (Briefcase Business)
const IconExperience = () => (
 <Svg width={12} height={12} viewBox="0 0 24 24">
   <Path
     d="M12 12h.01"
     stroke="#1f2937"
     strokeWidth={2}
     fill="none"
     strokeLinecap="round"
     strokeLinejoin="round"
   />
   <Path
     d="M16 6V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"
     stroke="#1f2937"
     strokeWidth={2}
     fill="none"
     strokeLinecap="round"
     strokeLinejoin="round"
   />
   <Path
     d="M22 13a18.15 18.15 0 0 1-20 0"
     stroke="#1f2937"
     strokeWidth={2}
     fill="none"
     strokeLinecap="round"
     strokeLinejoin="round"
   />
   {/* Rect converted to Path */}
   <Path
     d="M4 6 h16 a2 2 0 0 1 2 2 v10 a2 2 0 0 1 -2 2 h-16 a2 2 0 0 1 -2 -2 v-10 a2 2 0 0 1 2 -2 z"
     stroke="#1f2937"
     strokeWidth={2}
     fill="none"
     strokeLinecap="round"
     strokeLinejoin="round"
   />
 </Svg>
);

// Education (Graduation Cap)
const IconEducation = () => (
 <Svg width={12} height={12} viewBox="0 0 24 24">
   <Path
     d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"
     stroke="#1f2937"
     strokeWidth={2}
     fill="none"
     strokeLinecap="round"
     strokeLinejoin="round"
   />
   <Path
     d="M22 10v6"
     stroke="#1f2937"
     strokeWidth={2}
     fill="none"
     strokeLinecap="round"
     strokeLinejoin="round"
   />
   <Path
     d="M6 12.5V16a6 3 0 0 0 12 0v-3.5"
     stroke="#1f2937"
     strokeWidth={2}
     fill="none"
     strokeLinecap="round"
     strokeLinejoin="round"
   />
 </Svg>
);

// Skills (Lightbulb)
const IconSkills = () => (
 <Svg width={12} height={12} viewBox="0 0 24 24">
   <Path
     d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"
     stroke="#1f2937"
     strokeWidth={2}
     fill="none"
     strokeLinecap="round"
     strokeLinejoin="round"
   />
   <Path
     d="M9 18h6"
     stroke="#1f2937"
     strokeWidth={2}
     fill="none"
     strokeLinecap="round"
     strokeLinejoin="round"
   />
   <Path
     d="M10 22h4"
     stroke="#1f2937"
     strokeWidth={2}
     fill="none"
     strokeLinecap="round"
     strokeLinejoin="round"
   />
 </Svg>
);

// Certificates (Badge Check)
const IconCert = () => (
 <Svg width={12} height={12} viewBox="0 0 24 24">
   <Path
     d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"
     stroke="#1f2937"
     strokeWidth={2}
     fill="none"
     strokeLinecap="round"
     strokeLinejoin="round"
   />
   <Path
     d="m9 12 2 2 4-4"
     stroke="#1f2937"
     strokeWidth={2}
     fill="none"
     strokeLinecap="round"
     strokeLinejoin="round"
   />
 </Svg>
);

// References (Users - Multiple)
const IconUsers = () => (
 <Svg width={12} height={12} viewBox="0 0 24 24">
   <Path
     d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"
     stroke="#1f2937"
     strokeWidth={2}
     fill="none"
     strokeLinecap="round"
     strokeLinejoin="round"
   />
   <Path
     d="M16 3.128a4 4 0 0 1 0 7.744"
     stroke="#1f2937"
     strokeWidth={2}
     fill="none"
     strokeLinecap="round"
     strokeLinejoin="round"
   />
   <Path
     d="M22 21v-2a4 4 0 0 0-3-3.87"
     stroke="#1f2937"
     strokeWidth={2}
     fill="none"
     strokeLinecap="round"
     strokeLinejoin="round"
   />
   {/* Circle converted to Path */}
   <Path
     d="M9 3 a4 4 0 1 1 0 8 a4 4 0 0 1 0 -8 z"
     stroke="#1f2937"
     strokeWidth={2}
     fill="none"
     strokeLinecap="round"
     strokeLinejoin="round"
   />
 </Svg>
);

// Personal Info - Single User
const IconUser = IconSummary;

const styles = StyleSheet.create({
 page: {
   padding: 30,
   fontSize: 10,
   lineHeight: 1.5,
   fontFamily: "Helvetica",
   color: "#374151",
 },
 header: {
   flexDirection: "row",
   alignItems: "center",
   marginBottom: 20,
   borderBottomWidth: 1,
   borderBottomColor: "#1f2937",
   paddingBottom: 15,
 },
 photo: { width: 100, height: 100, borderRadius: 50, objectFit: "cover" },
 headerRight: { marginLeft: 30, flex: 1 },
 name: {
   fontSize: 22,
   fontWeight: "bold",
   textTransform: "uppercase",
   color: "#111827",
   marginBottom: 4,
   lineHeight: 1.2,
 },
 role: {
   fontSize: 11,
   color: "#4b5563",
   marginBottom: 6,
   textTransform: "uppercase",
   letterSpacing: 1,
 },
 contactRow: { flexDirection: "row", flexWrap: "wrap", gap: 12 },
 contactItem: {
   flexDirection: "row",
   alignItems: "center",
   fontSize: 9,
   color: "#374151",
 },
 link: { color: "#2563eb", textDecoration: "none" },

 section: { marginBottom: 10 },
 sectionTitleRow: {
   flexDirection: "row",
   alignItems: "center",
   borderBottomWidth: 1,
   borderBottomColor: "#e5e7eb",
   paddingBottom: 4,
   marginBottom: 8,
   marginTop: 5,
 },
 sectionTitle: {
   fontSize: 11,
   fontWeight: "bold",
   textTransform: "uppercase",
   color: "#1f2937",
   marginLeft: 6,
 },

 jobBlock: { marginBottom: 10 },
 jobHeader: {
   flexDirection: "row",
   justifyContent: "space-between",
   alignItems: "flex-start",
 },
 jobRole: {
   fontWeight: "bold",
   fontSize: 10,
   color: "#000000",
   maxWidth: "70%",
 },
 jobDate: { fontSize: 9, color: "#6b7280", textAlign: "right" },
 company: {
   color: "#2563eb",
   fontWeight: "bold",
   fontSize: 9,
   marginTop: 1,
   marginBottom: 3,
 },
 description: { fontSize: 9, textAlign: "justify", color: "#4b5563" },

 skillBadge: {
   backgroundColor: "#f3f4f6",
   paddingVertical: 3,
   paddingHorizontal: 8,
   borderRadius: 4,
   marginRight: 6,
   marginBottom: 6,
   fontSize: 8,
   color: "#1f2937",
   border: "1pt solid #e5e7eb",
 },
 skillsContainer: { flexDirection: "row", flexWrap: "wrap" },

 refGrid: { flexDirection: "row", flexWrap: "wrap", gap: 15 },
 refItem: { width: "45%", marginBottom: 10 },

 infoRow: {
   flexDirection: "row",
   borderBottomWidth: 1,
   borderBottomColor: "#f3f4f6",
   paddingVertical: 4,
   alignItems: "center",
 },
 infoLabel: {
   width: "30%",
   fontSize: 8,
   color: "#6b7280",
   textTransform: "uppercase",
   fontWeight: "bold",
 },
 infoValue: { width: "70%", fontSize: 9, color: "#111827" },
});

const CVDocument = ({ data, breaks = {} }) => {
 const hasBioData =
   data.personalInfo.address ||
   data.personalInfo.dob ||
   data.personalInfo.gender ||
   data.personalInfo.nationality ||
   data.personalInfo.maritalStatus ||
   data.personalInfo.idNumber;

 return (
   <Document>
     <Page size="A4" style={styles.page}>
       {/* HEADER */}
       <View wrap={false}>
         <View style={styles.header}>
           {data.personalInfo.photo && (
             <Image src={data.personalInfo.photo} style={styles.photo} />
           )}
           <View style={styles.headerRight}>
             <Text style={styles.name}>
               {data.personalInfo.fullName || "Your Name"}
             </Text>
             <Text style={styles.role}>
               {data.personalInfo.role || "Job Title"}
             </Text>

             <View style={styles.contactRow}>
               {data.personalInfo.email && (
                 <View style={styles.contactItem}>
                   <IconMail />
                   <Text style={{ marginLeft: 4 }}>
                     {data.personalInfo.email}
                   </Text>
                 </View>
               )}
               {data.personalInfo.phone && (
                 <View style={styles.contactItem}>
                   <IconPhone />
                   <Text style={{ marginLeft: 4 }}>
                     {data.personalInfo.phone}
                   </Text>
                 </View>
               )}
               {data.personalInfo.linkedin && (
                 <View style={styles.contactItem}>
                   <IconLinkedin />
                   <Link
                     src={data.personalInfo.linkedin}
                     style={{ marginLeft: 4, ...styles.link }}
                   >
                     LinkedIn
                   </Link>
                 </View>
               )}
               {data.personalInfo.github && (
                 <View style={styles.contactItem}>
                   <IconGithub />
                   <Link
                     src={data.personalInfo.github}
                     style={{ marginLeft: 4, ...styles.link }}
                   >
                     GitHub
                   </Link>
                 </View>
               )}
             </View>
           </View>
         </View>
       </View>

       {/* SUMMARY */}
       {data.personalInfo.summary && (
         <View wrap={false} style={styles.section}>
           {breaks["summary"] && <View break />}
           <View style={styles.sectionTitleRow}>
             <IconSummary />
             <Text style={styles.sectionTitle}>Professional Summary</Text>
           </View>
           <Text style={styles.description}>{data.personalInfo.summary}</Text>
         </View>
       )}

       {/* EXPERIENCE */}
       {data.experience?.length > 0 && (
         <View style={styles.section}>
           {breaks["exp-header"] && <View break />}
           <View style={styles.sectionTitleRow}>
             <IconExperience />
             <Text style={styles.sectionTitle}>Experience</Text>
           </View>

           {data.experience.map((job, index) => (
             <View key={index} style={styles.jobBlock} wrap={false}>
               {breaks[`exp-${index}`] && <View break />}
               <View style={styles.jobHeader}>
                 <Text style={styles.jobRole}>{job.role}</Text>
                 <Text style={styles.jobDate}>
                   {job.startDate} — {job.endDate}
                 </Text>
               </View>
               <Text style={styles.company}>{job.company}</Text>
               <Text style={styles.description}>{job.description}</Text>
             </View>
           ))}
         </View>
       )}

       {/* EDUCATION */}
       {data.education?.length > 0 && (
         <View style={styles.section}>
           {breaks["edu-header"] && <View break />}
           <View style={styles.sectionTitleRow}>
             <IconEducation />
             <Text style={styles.sectionTitle}>Education</Text>
           </View>
           {data.education.map((edu, index) => (
             <View key={index} style={styles.jobBlock} wrap={false}>
               {breaks[`edu-${index}`] && <View break />}
               <View style={styles.jobHeader}>
                 <Text style={styles.jobRole}>{edu.school}</Text>
                 <Text style={styles.jobDate}>{edu.date}</Text>
               </View>
               <Text style={styles.description}>{edu.degree}</Text>
             </View>
           ))}
         </View>
       )}

       {/* SKILLS */}
       {data.skills?.length > 0 && (
         <View wrap={false} style={styles.section}>
           {breaks["skills"] && <View break />}
           <View style={styles.sectionTitleRow}>
             <IconSkills />
             <Text style={styles.sectionTitle}>Skills</Text>
           </View>
           <View style={styles.skillsContainer}>
             {data.skills.map((skill, index) => (
               <Text key={index} style={styles.skillBadge}>
                 {skill.name}
               </Text>
             ))}
           </View>
         </View>
       )}

       {/* CERTIFICATES */}
       {data.certificates?.length > 0 && (
         <View style={styles.section}>
           {breaks["cert-header"] && <View break />}
           <View style={styles.sectionTitleRow}>
             <IconCert />
             <Text style={styles.sectionTitle}>Certificates</Text>
           </View>
           {data.certificates.map((cert, index) => (
             <View key={index} style={styles.jobBlock} wrap={false}>
               {breaks[`cert-${index}`] && <View break />}
               <View style={styles.jobHeader}>
                 <Text style={styles.jobRole}>{cert.name}</Text>
                 <Text style={styles.jobDate}>{cert.date}</Text>
               </View>
               <Text style={styles.description}>{cert.issuer}</Text>
             </View>
           ))}
         </View>
       )}

       {/* REFERENCES (Grid) */}
       {data.references?.length > 0 && (
         <View style={styles.section}>
           {breaks["ref-header"] && <View break />}
           <View style={styles.sectionTitleRow}>
             <IconUsers />
             <Text style={styles.sectionTitle}>References</Text>
           </View>
           <View style={styles.refGrid}>
             {data.references.map((ref, index) => (
               <View key={index} style={styles.refItem} wrap={false}>
                 {breaks[`ref-${index}`] && <View break />}
                 <Text
                   style={{ fontWeight: "bold", fontSize: 10, color: "#000" }}
                 >
                   {ref.name}
                 </Text>
                 <Text
                   style={{
                     fontSize: 9,
                     fontWeight: "medium",
                     color: "#1f2937",
                   }}
                 >
                   {ref.position}
                 </Text>
                 <Text style={{ fontSize: 9, color: "#374151" }}>
                   {ref.company}
                 </Text>
                 {ref.location && (
                   <View
                     style={{
                       flexDirection: "row",
                       alignItems: "center",
                       marginTop: 1,
                     }}
                   >
                     <IconMapPin />
                     <Text
                       style={{ fontSize: 8, color: "#6b7280", marginLeft: 2 }}
                     >
                       {ref.location}
                     </Text>
                   </View>
                 )}

                 <View style={{ marginTop: 4 }}>
                   {ref.phone && (
                     <View
                       style={{
                         flexDirection: "row",
                         alignItems: "center",
                         marginBottom: 1,
                       }}
                     >
                       <IconPhone />
                       <Text
                         style={{
                           fontSize: 9,
                           color: "#374151",
                           marginLeft: 4,
                         }}
                       >
                         {ref.phone}
                       </Text>
                     </View>
                   )}
                   {ref.email && (
                     <View
                       style={{ flexDirection: "row", alignItems: "center" }}
                     >
                       <IconMail />
                       <Text
                         style={{
                           fontSize: 9,
                           color: "#374151",
                           marginLeft: 4,
                         }}
                       >
                         {ref.email}
                       </Text>
                     </View>
                   )}
                 </View>
               </View>
             ))}
           </View>
         </View>
       )}

       {/* PERSONAL INFO */}
       {hasBioData && (
         <View wrap={false} style={styles.section}>
           {breaks["personal"] && <View break />}
           <View style={styles.sectionTitleRow}>
             <IconUser />
             <Text style={styles.sectionTitle}>Personal Information</Text>
           </View>
           <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
             <View style={{ width: "50%", paddingRight: 10 }}>
               {data.personalInfo.address && (
                 <View style={styles.infoRow}>
                   <Text style={styles.infoLabel}>Address</Text>
                   <Text style={styles.infoValue}>
                     {data.personalInfo.address}
                   </Text>
                 </View>
               )}
               {data.personalInfo.dob && (
                 <View style={styles.infoRow}>
                   <Text style={styles.infoLabel}>DOB</Text>
                   <Text style={styles.infoValue}>
                     {data.personalInfo.dob}
                   </Text>
                 </View>
               )}
               {data.personalInfo.gender && (
                 <View style={styles.infoRow}>
                   <Text style={styles.infoLabel}>Gender</Text>
                   <Text style={styles.infoValue}>
                     {data.personalInfo.gender}
                   </Text>
                 </View>
               )}
               {data.personalInfo.maritalStatus && (
                 <View style={styles.infoRow}>
                   <Text style={styles.infoLabel}>Status</Text>
                   <Text style={styles.infoValue}>
                     {data.personalInfo.maritalStatus}
                   </Text>
                 </View>
               )}
             </View>
             <View style={{ width: "50%", paddingLeft: 10 }}>
               {data.personalInfo.nationality && (
                 <View style={styles.infoRow}>
                   <Text style={styles.infoLabel}>Nationality</Text>
                   <Text style={styles.infoValue}>
                     {data.personalInfo.nationality}
                   </Text>
                 </View>
               )}
               {data.personalInfo.idNumber && (
                 <View style={styles.infoRow}>
                   <Text style={styles.infoLabel}>NIC/ID</Text>
                   <Text style={styles.infoValue}>
                     {data.personalInfo.idNumber}
                   </Text>
                 </View>
               )}
             </View>
           </View>
         </View>
       )}
     </Page>
   </Document>
 );
};

export default CVDocument;
```

### 🎨 Brick 10: The "Pure Path" Icon System

**Status:** ✅ Solved (Crash-Proof)
**Problem:** Standard React Icon libraries (Lucide) crash the PDF engine. Native SVG shapes (`<Rect>`, `<Circle>`) caused strict-mode crashes in the renderer.
**Solution:**

1. **Manual SVG Definition:** We manually define icons using the `@react-pdf/renderer` primitives (`Svg`, `Path`).
2. **Pure Path Strategy:** We converted all geometric shapes (circles, rects) into raw mathematical `<Path d="..." />` commands.
3. **Attribute Placement:** All styling props (`stroke`, `fill`, `strokeWidth`) are applied directly to the `<Path>` tag, not the parent `<Svg>`, ensuring visibility.

### ⚙️ Key Configurations

1. **Vite Worker Fix:** `pdf.worker.min.mjs` is loaded from a CDN (or public folder) to bypass Vite's hashing issues.
2. **Infinite Loop Prevention:** We use `JSON.stringify(formData)` in the debounce dependency array to ensure the PDF only regenerates when the _content_ changes, not just the object reference.

---

```

```

## 07/01/2026 - 04.04AM

### 💎 Brick 11: Engine Hardening & Visual Polish

**Status:** ✅ COMPLETED (Production Ready)
**Focus:** Stability, Crash Prevention, and UI Consistency.

**1. The "Anti-Crash" Engine Update:**

- **Problem:** The PDF Engine was crashing with `Detached ArrayBuffer` errors because React re-rendered while the PDF was still generating.
- **Solution:**
  - Switched from passing raw `Blob` objects to `URL.createObjectURL(blob)`. The browser now manages the memory lifecycle safely.
  - Removed `CVDocument` from the `useEffect` dependency array. We now trade "Hot Template Reloading" for "Application Stability." Data changes auto-refresh; Code changes require a manual refresh.
  - Memoized `PDF_OPTIONS` to prevent console warnings and unnecessary re-initializations.

**2. Iconography V2 (Standardized):**

- **Uniformity:** All icons (Header & References) enforced to `width={10} height={10}`.
- **Correction:** Fixed the "Alien" MapPin issue by matching the stroke width and viewBox of the other icons.
- **Alignment:** Implemented a flexible `style` prop for icons to handle slight vertical drifts (`translateY`) between different Flexbox contexts (Header vs. Grid).

**3. Visual Enhancements:**

- **Skill Badges:** Moved from simple Text backgrounds to a **Container Pattern** (`View` wrapper + `Text` child). This allows for perfect vertical and horizontal centering, creating a modern "Pill" aesthetic.
- **Reference Section:** Aligned contact details (Phone/Email/Location) using specific style overrides to match the Header's visual weight.

```
`src/components/pdf/CVDocument.jsx`
import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
  Link,
  Svg,
  Path,
} from "@react-pdf/renderer";

// --- 🛠️ ICON LIBRARY (ALL Size 10, ALL Color #374151 or Accent) ---

// 1. CONTACT ICONS
const IconMail = ({ style }) => (
  <Svg
    width={10}
    height={10}
    viewBox="0 0 24 24"
    style={style || { transform: "translateY(-0.5)" }}
  >
    <Path
      d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"
      stroke="#374151"
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M4 4 h16 a2 2 0 0 1 2 2 v12 a2 2 0 0 1 -2 2 h-16 a2 2 0 0 1 -2 -2 v-12 a2 2 0 0 1 2 -2 z"
      stroke="#374151"
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const IconPhone = ({ style }) => (
  <Svg
    width={10}
    height={10}
    viewBox="0 0 24 24"
    style={style || { transform: "translateY(-0.5)" }}
  >
    <Path
      d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384"
      stroke="#374151"
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const IconLinkedin = ({ style }) => (
  <Svg
    width={10}
    height={10}
    viewBox="0 0 24 24"
    style={style || { transform: "translateY(-0.5)" }}
  >
    <Path
      d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"
      stroke="#2563eb"
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M2 9 h4 v12 h-4 z"
      stroke="#2563eb"
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M4 2 a2 2 0 1 1 0 4 a2 2 0 0 1 0 -4 z"
      stroke="#2563eb"
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const IconGithub = ({ style }) => (
  <Svg
    width={10}
    height={10}
    viewBox="0 0 24 24"
    style={style || { transform: "translateY(-0.5)" }}
  >
    <Path
      d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"
      stroke="#374151" // Fixed to dark gray
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M9 18c-4.51 2-5-2-7-2"
      stroke="#374151" // Fixed to dark gray
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// 🛑 THE ALIEN FIX: Size 10, Color #374151 (Dark Gray)
const IconMapPin = ({ style }) => (
  <Svg
    width={10}
    height={10}
    viewBox="0 0 24 24"
    style={style || { transform: "translateY(-0.5)" }}
  >
    <Path
      d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"
      stroke="#374151" // Dark Gray
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M12 7 a3 3 0 1 1 0 6 a3 3 0 0 1 0 -6 z"
      stroke="#374151" // Dark Gray
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// 2. SECTION ICONS
const IconSummary = () => (
  <Svg
    width={12}
    height={12}
    viewBox="0 0 24 24"
    style={{ transform: "translateY(-2)" }}
  >
    <Path
      d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"
      stroke="#1f2937"
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M12 3 a4 4 0 1 1 0 8 a4 4 0 0 1 0 -8 z"
      stroke="#1f2937"
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const IconExperience = () => (
  <Svg
    width={12}
    height={12}
    viewBox="0 0 24 24"
    style={{ transform: "translateY(-2)" }}
  >
    <Path
      d="M12 12h.01"
      stroke="#1f2937"
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M16 6V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"
      stroke="#1f2937"
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M22 13a18.15 18.15 0 0 1-20 0"
      stroke="#1f2937"
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M4 6 h16 a2 2 0 0 1 2 2 v10 a2 2 0 0 1 -2 2 h-16 a2 2 0 0 1 -2 -2 v-10 a2 2 0 0 1 2 -2 z"
      stroke="#1f2937"
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const IconEducation = () => (
  <Svg
    width={12}
    height={12}
    viewBox="0 0 24 24"
    style={{ transform: "translateY(-2)" }}
  >
    <Path
      d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"
      stroke="#1f2937"
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M22 10v6"
      stroke="#1f2937"
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M6 12.5V16a6 3 0 0 0 12 0v-3.5"
      stroke="#1f2937"
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const IconSkills = () => (
  <Svg
    width={12}
    height={12}
    viewBox="0 0 24 24"
    style={{ transform: "translateY(-2)" }}
  >
    <Path
      d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"
      stroke="#1f2937"
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M9 18h6"
      stroke="#1f2937"
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M10 22h4"
      stroke="#1f2937"
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const IconCert = () => (
  <Svg
    width={12}
    height={12}
    viewBox="0 0 24 24"
    style={{ transform: "translateY(-2)" }}
  >
    <Path
      d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"
      stroke="#1f2937"
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="m9 12 2 2 4-4"
      stroke="#1f2937"
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const IconUsers = () => (
  <Svg
    width={12}
    height={12}
    viewBox="0 0 24 24"
    style={{ transform: "translateY(-2)" }}
  >
    <Path
      d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"
      stroke="#1f2937"
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M16 3.128a4 4 0 0 1 0 7.744"
      stroke="#1f2937"
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M22 21v-2a4 4 0 0 0-3-3.87"
      stroke="#1f2937"
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M9 3 a4 4 0 1 1 0 8 a4 4 0 0 1 0 -8 z"
      stroke="#1f2937"
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const IconUser = IconSummary;

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 10,
    lineHeight: 1.5,
    fontFamily: "Helvetica",
    color: "#374151",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#1f2937",
    paddingBottom: 15,
  },
  photo: { width: 100, height: 100, borderRadius: 50, objectFit: "cover" },
  headerRight: { marginLeft: 30, flex: 1 },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    textTransform: "uppercase",
    color: "#111827",
    marginBottom: 4,
    lineHeight: 1.2,
  },
  role: {
    fontSize: 11,
    color: "#4b5563",
    marginBottom: 6,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  contactRow: { flexDirection: "row", flexWrap: "wrap", gap: 12 },
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
    fontSize: 9,
    color: "#374151",
    lineHeight: 1.2,
  },
  link: { color: "#2563eb", textDecoration: "none" },

  section: { marginBottom: 10 },
  sectionTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
    paddingBottom: 4,
    marginBottom: 8,
    marginTop: 5,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: "bold",
    textTransform: "uppercase",
    color: "#1f2937",
    marginLeft: 6,
  },

  jobBlock: { marginBottom: 10 },
  jobHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  jobRole: {
    fontWeight: "bold",
    fontSize: 10,
    color: "#000000",
    maxWidth: "70%",
  },
  jobDate: { fontSize: 9, color: "#6b7280", textAlign: "right" },
  company: {
    color: "#2563eb",
    fontWeight: "bold",
    fontSize: 9,
    marginTop: 1,
    marginBottom: 3,
  },
  description: { fontSize: 9, textAlign: "justify", color: "#4b5563" },

  skillBadge: {
    backgroundColor: "#f3f4f6",
    borderRadius: 12,
    paddingVertical: 5,
    paddingHorizontal: 14,
    marginRight: 6,
    marginBottom: 6,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  skillText: {
    fontSize: 9,
    fontWeight: "bold",
    color: "#374151",
    lineHeight: 1,
  },
  skillsContainer: { flexDirection: "row", flexWrap: "wrap" },

  refGrid: { flexDirection: "row", flexWrap: "wrap", gap: 15 },
  refItem: { width: "45%", marginBottom: 10 },

  infoRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
    paddingVertical: 4,
    alignItems: "center",
    lineHeight: 1.2,
  },
  infoLabel: {
    width: "30%",
    fontSize: 8,
    color: "#6b7280",
    textTransform: "uppercase",
    fontWeight: "bold",
  },
  infoValue: { width: "70%", fontSize: 9, color: "#111827" },

  // 📐 ICON ALIGNMENT (Nudge up for perfect centering)
  refIcon: {
    transform: "translateY(-1.5)",
  },
});

const CVDocument = ({ data, breaks = {} }) => {
  const hasBioData =
    data.personalInfo.address ||
    data.personalInfo.dob ||
    data.personalInfo.gender ||
    data.personalInfo.nationality ||
    data.personalInfo.maritalStatus ||
    data.personalInfo.idNumber;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* HEADER */}
        <View wrap={false}>
          <View style={styles.header}>
            {data.personalInfo.photo && (
              <Image src={data.personalInfo.photo} style={styles.photo} />
            )}
            <View style={styles.headerRight}>
              <Text style={styles.name}>
                {data.personalInfo.fullName || "Your Name"}
              </Text>
              <Text style={styles.role}>
                {data.personalInfo.role || "Job Title"}
              </Text>

              <View style={styles.contactRow}>
                {data.personalInfo.email && (
                  <View style={styles.contactItem}>
                    <IconMail />
                    <Text style={{ marginLeft: 4 }}>
                      {data.personalInfo.email}
                    </Text>
                  </View>
                )}
                {data.personalInfo.phone && (
                  <View style={styles.contactItem}>
                    <IconPhone />
                    <Text style={{ marginLeft: 4 }}>
                      {data.personalInfo.phone}
                    </Text>
                  </View>
                )}
                {data.personalInfo.linkedin && (
                  <View style={styles.contactItem}>
                    <IconLinkedin />
                    <Link
                      src={data.personalInfo.linkedin}
                      style={{ marginLeft: 4, ...styles.link }}
                    >
                      LinkedIn
                    </Link>
                  </View>
                )}
                {data.personalInfo.github && (
                  <View style={styles.contactItem}>
                    <IconGithub />
                    <Link
                      src={data.personalInfo.github}
                      style={{ marginLeft: 4, ...styles.link }}
                    >
                      GitHub
                    </Link>
                  </View>
                )}
              </View>
            </View>
          </View>
        </View>

        {/* SUMMARY */}
        {data.personalInfo.summary && (
          <View wrap={false} style={styles.section}>
            {breaks["summary"] && <View break />}
            <View style={styles.sectionTitleRow}>
              <IconSummary />
              <Text style={styles.sectionTitle}>Professional Summary</Text>
            </View>
            <Text style={styles.description}>{data.personalInfo.summary}</Text>
          </View>
        )}

        {/* EXPERIENCE */}
        {data.experience?.length > 0 && (
          <View style={styles.section}>
            {breaks["exp-header"] && <View break />}
            <View style={styles.sectionTitleRow}>
              <IconExperience />
              <Text style={styles.sectionTitle}>Experience</Text>
            </View>

            {data.experience.map((job, index) => (
              <View key={index} style={styles.jobBlock} wrap={false}>
                {breaks[`exp-${index}`] && <View break />}
                <View style={styles.jobHeader}>
                  <Text style={styles.jobRole}>{job.role}</Text>
                  <Text style={styles.jobDate}>
                    {job.startDate} — {job.endDate}
                  </Text>
                </View>
                <Text style={styles.company}>{job.company}</Text>
                <Text style={styles.description}>{job.description}</Text>
              </View>
            ))}
          </View>
        )}

        {/* EDUCATION */}
        {data.education?.length > 0 && (
          <View style={styles.section}>
            {breaks["edu-header"] && <View break />}
            <View style={styles.sectionTitleRow}>
              <IconEducation />
              <Text style={styles.sectionTitle}>Education</Text>
            </View>
            {data.education.map((edu, index) => (
              <View key={index} style={styles.jobBlock} wrap={false}>
                {breaks[`edu-${index}`] && <View break />}
                <View style={styles.jobHeader}>
                  <Text style={styles.jobRole}>{edu.school}</Text>
                  <Text style={styles.jobDate}>{edu.date}</Text>
                </View>
                <Text style={styles.description}>{edu.degree}</Text>
              </View>
            ))}
          </View>
        )}

        {/* SKILLS */}
        {data.skills?.length > 0 && (
          <View wrap={false} style={styles.section}>
            {breaks["skills"] && <View break />}
            <View style={styles.sectionTitleRow}>
              <IconSkills />
              <Text style={styles.sectionTitle}>Skills</Text>
            </View>
            <View style={styles.skillsContainer}>
              {data.skills.map((skill, index) => (
                <View key={index} style={styles.skillBadge}>
                  <Text style={styles.skillText}>{skill.name}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* CERTIFICATES */}
        {data.certificates?.length > 0 && (
          <View style={styles.section}>
            {breaks["cert-header"] && <View break />}
            <View style={styles.sectionTitleRow}>
              <IconCert />
              <Text style={styles.sectionTitle}>Certificates</Text>
            </View>
            {data.certificates.map((cert, index) => (
              <View key={index} style={styles.jobBlock} wrap={false}>
                {breaks[`cert-${index}`] && <View break />}
                <View style={styles.jobHeader}>
                  <Text style={styles.jobRole}>{cert.name}</Text>
                  <Text style={styles.jobDate}>{cert.date}</Text>
                </View>
                <Text style={styles.description}>{cert.issuer}</Text>
              </View>
            ))}
          </View>
        )}

        {/* REFERENCES (Grid) */}
        {data.references?.length > 0 && (
          <View style={styles.section}>
            {breaks["ref-header"] && <View break />}
            <View style={styles.sectionTitleRow}>
              <IconUsers />
              <Text style={styles.sectionTitle}>References</Text>
            </View>
            <View style={styles.refGrid}>
              {data.references.map((ref, index) => (
                <View key={index} style={styles.refItem} wrap={false}>
                  {breaks[`ref-${index}`] && <View break />}
                  <Text
                    style={{ fontWeight: "bold", fontSize: 10, color: "#000" }}
                  >
                    {ref.name}
                  </Text>
                  <Text
                    style={{
                      fontSize: 9,
                      fontWeight: "medium",
                      color: "#1f2937",
                    }}
                  >
                    {ref.position}
                  </Text>
                  <Text style={{ fontSize: 9, color: "#374151" }}>
                    {ref.company}
                  </Text>

                  {/* Location Icon (Corrected Size & Color) */}
                  {ref.location && (
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginTop: 1,
                      }}
                    >
                      <IconMapPin style={styles.refIcon} />
                      <Text
                        style={{ fontSize: 9, color: "#374151", marginLeft: 4 }}
                      >
                        {ref.location}
                      </Text>
                    </View>
                  )}

                  <View style={{ marginTop: 4 }}>
                    {/* Phone Icon */}
                    {ref.phone && (
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          marginBottom: 1,
                        }}
                      >
                        <IconPhone style={styles.refIcon} />
                        <Text
                          style={{
                            fontSize: 9,
                            color: "#374151",
                            marginLeft: 4,
                          }}
                        >
                          {ref.phone}
                        </Text>
                      </View>
                    )}
                    {/* Email Icon */}
                    {ref.email && (
                      <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                      >
                        <IconMail style={styles.refIcon} />
                        <Text
                          style={{
                            fontSize: 9,
                            color: "#374151",
                            marginLeft: 4,
                          }}
                        >
                          {ref.email}
                        </Text>
                      </View>
                    )}
                  </View>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* PERSONAL INFO */}
        {hasBioData && (
          <View wrap={false} style={styles.section}>
            {breaks["personal"] && <View break />}
            <View style={styles.sectionTitleRow}>
              <IconUser />
              <Text style={styles.sectionTitle}>Personal Information</Text>
            </View>
            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
              <View style={{ width: "50%", paddingRight: 10 }}>
                {data.personalInfo.address && (
                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Address</Text>
                    <Text style={styles.infoValue}>
                      {data.personalInfo.address}
                    </Text>
                  </View>
                )}
                {data.personalInfo.dob && (
                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>DOB</Text>
                    <Text style={styles.infoValue}>
                      {data.personalInfo.dob}
                    </Text>
                  </View>
                )}
                {data.personalInfo.gender && (
                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Gender</Text>
                    <Text style={styles.infoValue}>
                      {data.personalInfo.gender}
                    </Text>
                  </View>
                )}
                {data.personalInfo.maritalStatus && (
                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Status</Text>
                    <Text style={styles.infoValue}>
                      {data.personalInfo.maritalStatus}
                    </Text>
                  </View>
                )}
              </View>
              <View style={{ width: "50%", paddingLeft: 10 }}>
                {data.personalInfo.nationality && (
                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Nationality</Text>
                    <Text style={styles.infoValue}>
                      {data.personalInfo.nationality}
                    </Text>
                  </View>
                )}
                {data.personalInfo.idNumber && (
                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>NIC/ID</Text>
                    <Text style={styles.infoValue}>
                      {data.personalInfo.idNumber}
                    </Text>
                  </View>
                )}
              </View>
            </View>
          </View>
        )}
      </Page>
    </Document>
  );
};

export default CVDocument;

`src/components/pdf/CVPreview.jsx`

import React, { useState, useEffect, useRef, useMemo } from "react";
import { useFormContext } from "react-hook-form";
import { useDebounce } from "use-debounce";
import { pdf } from "@react-pdf/renderer";
import { Document, Page, pdfjs } from "react-pdf";
import CVDocument from "./pdf/CVDocument";
import { Download, Loader2, ZoomIn, ZoomOut } from "lucide-react";

// ✅ 1. STABLE WORKER SETUP
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";

// 🛑 CRITICAL FIX: Define options OUTSIDE the component.
// This prevents the "Options prop changed" warning and unnecessary reloads.
const PDF_OPTIONS = {
  cMapUrl: `https://unpkg.com/pdfjs-dist@${pdfjs.version}/cmaps/`,
  cMapPacked: true,
};

const CVPreview = () => {
  const { watch } = useFormContext();
  const formData = watch();

  // 1. DEBOUNCE LOGIC
  const [debouncedDataString] = useDebounce(JSON.stringify(formData), 1000);
  const debouncedData = useMemo(
    () => JSON.parse(debouncedDataString),
    [debouncedDataString]
  );

  // 🛑 CRITICAL FIX: Store the URL string, not the Blob object.
  // Storing the raw Blob causes "Detached ArrayBuffer" errors when React re-renders.
  const [pdfUrl, setPdfUrl] = useState(null);

  const [numPages, setNumPages] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [scale, setScale] = useState(1.0);

  // 📏 RESPONSIVE WIDTH LOGIC
  const containerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(600);

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth - 40);
      }
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  // 📝 GENERATOR ENGINE
  useEffect(() => {
    // Flag to prevent race conditions
    let isMounted = true;

    const generatePdf = async () => {
      setIsGenerating(true);
      try {
        // Generate Blob
        const blob = await pdf(<CVDocument data={debouncedData} />).toBlob();

        if (isMounted) {
          // Convert Blob to URL (This is safer for the Viewer than the raw blob)
          const url = URL.createObjectURL(blob);
          setPdfUrl((prevUrl) => {
            // Revoke old URL to free memory
            if (prevUrl) URL.revokeObjectURL(prevUrl);
            return url;
          });
        }
      } catch (error) {
        console.error("PDF Gen Error:", error);
      } finally {
        if (isMounted) setIsGenerating(false);
      }
    };

    if (debouncedData) generatePdf();

    // Cleanup function
    return () => {
      isMounted = false;
    };

    // 🛑 FIXED: Removed 'CVDocument' from dependency array to satisfy ESLint
    // and prevent the infinite render loop that caused the crash.
  }, [debouncedData]);

  const handleDownload = () => {
    if (!pdfUrl) return;
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = `${debouncedData.personalInfo.fullName || "CV"}.pdf`;
    link.click();
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100 border-l border-gray-300">
      {/* TOOLBAR */}
      <div className="z-10 flex items-center justify-between p-3 bg-white border-b border-gray-200 shadow-sm">
        <div className="flex items-center gap-2">
          <h2 className="text-sm font-bold tracking-wide text-gray-700 uppercase">
            Live Preview
          </h2>
          {isGenerating ? (
            <span className="flex items-center gap-1 text-xs text-blue-600 font-medium bg-blue-50 px-2 py-0.5 rounded-full animate-pulse">
              <Loader2 size={10} className="animate-spin" /> Updating...
            </span>
          ) : (
            <span className="text-xs text-green-600 font-medium bg-green-50 px-2 py-0.5 rounded-full">
              ✓ Ready
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setScale((s) => Math.max(0.5, s - 0.1))}
            className="p-1.5 hover:bg-gray-100 rounded text-gray-600"
          >
            <ZoomOut size={16} />
          </button>
          <span className="w-12 font-mono text-xs text-center">
            {(scale * 100).toFixed(0)}%
          </span>
          <button
            onClick={() => setScale((s) => Math.min(2.0, s + 0.1))}
            className="p-1.5 hover:bg-gray-100 rounded text-gray-600"
          >
            <ZoomIn size={16} />
          </button>

          <div className="w-px h-4 mx-1 bg-gray-300"></div>

          <button
            onClick={handleDownload}
            disabled={!pdfUrl}
            className="flex items-center gap-1.5 bg-gray-900 hover:bg-black text-white px-4 py-1.5 rounded text-sm font-bold transition disabled:opacity-50"
          >
            <Download size={14} /> Download PDF
          </button>
        </div>
      </div>

      {/* 🖼️ PREVIEW AREA */}
      <div
        ref={containerRef}
        className="flex justify-center flex-1 p-8 overflow-y-auto bg-slate-200 scroll-smooth"
      >
        {pdfUrl ? (
          <Document
            file={pdfUrl} // 👈 Using URL string instead of Blob object
            options={PDF_OPTIONS} // 👈 Using stable options object
            onLoadSuccess={({ numPages }) => setNumPages(numPages)}
            loading={null}
            className="flex flex-col gap-6"
          >
            {Array.from(new Array(numPages), (_, index) => (
              <div key={`page_${index + 1}`} className="shadow-xl">
                <Page
                  pageNumber={index + 1}
                  width={containerWidth * scale}
                  renderTextLayer={true}
                  renderAnnotationLayer={false}
                  className="bg-white"
                />
                <div className="text-center mt-2 text-[10px] text-gray-400 font-bold tracking-widest uppercase">
                  Page {index + 1}
                </div>
              </div>
            ))}
          </Document>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-gray-400">
            <Loader2 className="mb-3 animate-spin" size={32} />
            <p className="text-sm font-medium">Initializing Engine...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CVPreview;


```

### 🧱 Brick 12: The "Embedded Header" Layout Strategy

**Status:** ✅ SOLVED (Layout Proof)
**Problem:** The "Orphan Header" Bug. The PDF engine was calculating page breaks based on available height, occasionally leaving a Section Header at the bottom of Page 1 while pushing its first content item to Page 2.
**Failed Attempt:** Used `minPresenceAhead={60}`. The engine treated this as a "hint" rather than a rule and ignored it when space was tight.

**The Solution: Structural Coupling**
Instead of rendering Headers and Items as siblings, we mechanically bond them:

1.  **Experience / Education / Certificates:** We moved the Section Header _inside_ the mapping loop. It strictly renders as part of the **First Item's** (`index === 0`) wrapper view.
    - _Result:_ The Header cannot exist without Item 1. If Item 1 moves to Page 2, it drags the Header with it.
2.  **References / Skills / Summary:** These use a simpler strategy where the **Entire Section** is wrapped in `wrap={false}`, treating the whole block as an indivisible unit.

**Outcome:** Zero orphaned headers, guaranteed semantic flow across page breaks.

```
`src/components/pdf/CVDocument.jsx`

import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
  Link,
  Svg,
  Path,
} from "@react-pdf/renderer";

// --- 🛠️ ICON LIBRARY (Standardized Size 10x10 & Uniform Colors) ---

// 1. CONTACT ICONS
const IconMail = ({ style }) => (
  <Svg
    width={10}
    height={10}
    viewBox="0 0 24 24"
    style={style || { transform: "translateY(-0.5)" }}
  >
    <Path
      d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"
      stroke="#374151"
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M4 4 h16 a2 2 0 0 1 2 2 v12 a2 2 0 0 1 -2 2 h-16 a2 2 0 0 1 -2 -2 v-12 a2 2 0 0 1 2 -2 z"
      stroke="#374151"
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const IconPhone = ({ style }) => (
  <Svg
    width={10}
    height={10}
    viewBox="0 0 24 24"
    style={style || { transform: "translateY(-0.5)" }}
  >
    <Path
      d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384"
      stroke="#374151"
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const IconLinkedin = ({ style }) => (
  <Svg
    width={10}
    height={10}
    viewBox="0 0 24 24"
    style={style || { transform: "translateY(-0.5)" }}
  >
    <Path
      d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"
      stroke="#2563eb"
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M2 9 h4 v12 h-4 z"
      stroke="#2563eb"
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M4 2 a2 2 0 1 1 0 4 a2 2 0 0 1 0 -4 z"
      stroke="#2563eb"
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const IconGithub = ({ style }) => (
  <Svg
    width={10}
    height={10}
    viewBox="0 0 24 24"
    style={style || { transform: "translateY(-0.5)" }}
  >
    <Path
      d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"
      stroke="#374151"
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M9 18c-4.51 2-5-2-7-2"
      stroke="#374151"
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const IconMapPin = ({ style }) => (
  <Svg
    width={10}
    height={10}
    viewBox="0 0 24 24"
    style={style || { transform: "translateY(-0.5)" }}
  >
    <Path
      d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"
      stroke="#374151"
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M12 7 a3 3 0 1 1 0 6 a3 3 0 0 1 0 -6 z"
      stroke="#374151"
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// 2. SECTION ICONS
const IconSummary = () => (
  <Svg
    width={12}
    height={12}
    viewBox="0 0 24 24"
    style={{ transform: "translateY(-2)" }}
  >
    <Path
      d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"
      stroke="#1f2937"
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M12 3 a4 4 0 1 1 0 8 a4 4 0 0 1 0 -8 z"
      stroke="#1f2937"
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const IconExperience = () => (
  <Svg
    width={12}
    height={12}
    viewBox="0 0 24 24"
    style={{ transform: "translateY(-2)" }}
  >
    <Path
      d="M12 12h.01"
      stroke="#1f2937"
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M16 6V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"
      stroke="#1f2937"
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M22 13a18.15 18.15 0 0 1-20 0"
      stroke="#1f2937"
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M4 6 h16 a2 2 0 0 1 2 2 v10 a2 2 0 0 1 -2 2 h-16 a2 2 0 0 1 -2 -2 v-10 a2 2 0 0 1 2 -2 z"
      stroke="#1f2937"
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const IconEducation = () => (
  <Svg
    width={12}
    height={12}
    viewBox="0 0 24 24"
    style={{ transform: "translateY(-2)" }}
  >
    <Path
      d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"
      stroke="#1f2937"
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M22 10v6"
      stroke="#1f2937"
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M6 12.5V16a6 3 0 0 0 12 0v-3.5"
      stroke="#1f2937"
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const IconSkills = () => (
  <Svg
    width={12}
    height={12}
    viewBox="0 0 24 24"
    style={{ transform: "translateY(-2)" }}
  >
    <Path
      d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"
      stroke="#1f2937"
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M9 18h6"
      stroke="#1f2937"
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M10 22h4"
      stroke="#1f2937"
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const IconCert = () => (
  <Svg
    width={12}
    height={12}
    viewBox="0 0 24 24"
    style={{ transform: "translateY(-2)" }}
  >
    <Path
      d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"
      stroke="#1f2937"
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="m9 12 2 2 4-4"
      stroke="#1f2937"
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const IconUsers = () => (
  <Svg
    width={12}
    height={12}
    viewBox="0 0 24 24"
    style={{ transform: "translateY(-2)" }}
  >
    <Path
      d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"
      stroke="#1f2937"
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M16 3.128a4 4 0 0 1 0 7.744"
      stroke="#1f2937"
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M22 21v-2a4 4 0 0 0-3-3.87"
      stroke="#1f2937"
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M9 3 a4 4 0 1 1 0 8 a4 4 0 0 1 0 -8 z"
      stroke="#1f2937"
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const IconUser = IconSummary;

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 10,
    lineHeight: 1.5,
    fontFamily: "Helvetica",
    color: "#374151",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#1f2937",
    paddingBottom: 15,
  },
  photo: { width: 100, height: 100, borderRadius: 50, objectFit: "cover" },
  headerRight: { marginLeft: 30, flex: 1 },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    textTransform: "uppercase",
    color: "#111827",
    marginBottom: 4,
    lineHeight: 1.2,
  },
  role: {
    fontSize: 11,
    color: "#4b5563",
    marginBottom: 6,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  contactRow: { flexDirection: "row", flexWrap: "wrap", gap: 12 },
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
    fontSize: 9,
    color: "#374151",
    lineHeight: 1.2,
  },
  link: { color: "#2563eb", textDecoration: "none" },

  section: { marginBottom: 10 },
  sectionTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
    paddingBottom: 4,
    marginBottom: 8,
    marginTop: 5,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: "bold",
    textTransform: "uppercase",
    color: "#1f2937",
    marginLeft: 6,
  },

  jobBlock: { marginBottom: 10 },
  jobHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  jobRole: {
    fontWeight: "bold",
    fontSize: 10,
    color: "#000000",
    maxWidth: "70%",
  },
  jobDate: { fontSize: 9, color: "#6b7280", textAlign: "right" },
  company: {
    color: "#2563eb",
    fontWeight: "bold",
    fontSize: 9,
    marginTop: 1,
    marginBottom: 3,
  },
  description: { fontSize: 9, textAlign: "justify", color: "#4b5563" },

  // 💎 CUTE SKILL BADGES
  skillBadge: {
    backgroundColor: "#f3f4f6",
    borderRadius: 12,
    paddingVertical: 5,
    paddingHorizontal: 14,
    marginRight: 6,
    marginBottom: 6,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  skillText: {
    fontSize: 9,
    fontWeight: "bold",
    color: "#374151",
    lineHeight: 1,
  },
  skillsContainer: { flexDirection: "row", flexWrap: "wrap" },

  refGrid: { flexDirection: "row", flexWrap: "wrap", gap: 15 },
  refItem: { width: "45%", marginBottom: 10 },

  infoRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
    paddingVertical: 4,
    alignItems: "center",
    lineHeight: 1.2,
  },
  infoLabel: {
    width: "30%",
    fontSize: 8,
    color: "#6b7280",
    textTransform: "uppercase",
    fontWeight: "bold",
  },
  infoValue: { width: "70%", fontSize: 9, color: "#111827" },

  refIcon: {
    transform: "translateY(-1.5)",
  },
});

const CVDocument = ({ data, breaks = {} }) => {
  const hasBioData =
    data.personalInfo.address ||
    data.personalInfo.dob ||
    data.personalInfo.gender ||
    data.personalInfo.nationality ||
    data.personalInfo.maritalStatus ||
    data.personalInfo.idNumber;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* HEADER */}
        <View wrap={false}>
          <View style={styles.header}>
            {data.personalInfo.photo && (
              <Image src={data.personalInfo.photo} style={styles.photo} />
            )}
            <View style={styles.headerRight}>
              <Text style={styles.name}>
                {data.personalInfo.fullName || "Your Name"}
              </Text>
              <Text style={styles.role}>
                {data.personalInfo.role || "Job Title"}
              </Text>

              <View style={styles.contactRow}>
                {data.personalInfo.email && (
                  <View style={styles.contactItem}>
                    <IconMail />
                    <Text style={{ marginLeft: 4 }}>
                      {data.personalInfo.email}
                    </Text>
                  </View>
                )}
                {data.personalInfo.phone && (
                  <View style={styles.contactItem}>
                    <IconPhone />
                    <Text style={{ marginLeft: 4 }}>
                      {data.personalInfo.phone}
                    </Text>
                  </View>
                )}
                {data.personalInfo.linkedin && (
                  <View style={styles.contactItem}>
                    <IconLinkedin />
                    <Link
                      src={data.personalInfo.linkedin}
                      style={{ marginLeft: 4, ...styles.link }}
                    >
                      LinkedIn
                    </Link>
                  </View>
                )}
                {data.personalInfo.github && (
                  <View style={styles.contactItem}>
                    <IconGithub />
                    <Link
                      src={data.personalInfo.github}
                      style={{ marginLeft: 4, ...styles.link }}
                    >
                      GitHub
                    </Link>
                  </View>
                )}
              </View>
            </View>
          </View>
        </View>

        {/* SUMMARY (Wraps Whole Section) */}
        {data.personalInfo.summary && (
          <View wrap={false} style={styles.section}>
            {breaks["summary"] && <View break />}
            <View style={styles.sectionTitleRow}>
              <IconSummary />
              <Text style={styles.sectionTitle}>Professional Summary</Text>
            </View>
            <Text style={styles.description}>{data.personalInfo.summary}</Text>
          </View>
        )}

        {/* EXPERIENCE (Embedded Header Strategy) */}
        {data.experience?.length > 0 && (
          <View style={styles.section}>
            {data.experience.map((job, index) => (
              <View key={index} style={styles.jobBlock} wrap={false}>
                {/* Manual Breaks */}
                {index === 0 && breaks["exp-header"] && <View break />}
                {index > 0 && breaks[`exp-${index}`] && <View break />}

                {/* 🔒 HEADER EMBEDDED IN FIRST ITEM */}
                {index === 0 && (
                  <View style={styles.sectionTitleRow}>
                    <IconExperience />
                    <Text style={styles.sectionTitle}>Experience</Text>
                  </View>
                )}

                <View style={styles.jobHeader}>
                  <Text style={styles.jobRole}>{job.role}</Text>
                  <Text style={styles.jobDate}>
                    {job.startDate} — {job.endDate}
                  </Text>
                </View>
                <Text style={styles.company}>{job.company}</Text>
                <Text style={styles.description}>{job.description}</Text>
              </View>
            ))}
          </View>
        )}

        {/* EDUCATION (Embedded Header Strategy) */}
        {data.education?.length > 0 && (
          <View style={styles.section}>
            {data.education.map((edu, index) => (
              <View key={index} style={styles.jobBlock} wrap={false}>
                {index === 0 && breaks["edu-header"] && <View break />}
                {index > 0 && breaks[`edu-${index}`] && <View break />}

                {/* 🔒 HEADER EMBEDDED IN FIRST ITEM */}
                {index === 0 && (
                  <View style={styles.sectionTitleRow}>
                    <IconEducation />
                    <Text style={styles.sectionTitle}>Education</Text>
                  </View>
                )}

                <View style={styles.jobHeader}>
                  <Text style={styles.jobRole}>{edu.school}</Text>
                  <Text style={styles.jobDate}>{edu.date}</Text>
                </View>
                <Text style={styles.description}>{edu.degree}</Text>
              </View>
            ))}
          </View>
        )}

        {/* SKILLS (Wraps Whole Section) */}
        {data.skills?.length > 0 && (
          <View wrap={false} style={styles.section}>
            {breaks["skills"] && <View break />}
            <View style={styles.sectionTitleRow}>
              <IconSkills />
              <Text style={styles.sectionTitle}>Skills</Text>
            </View>
            <View style={styles.skillsContainer}>
              {data.skills.map((skill, index) => (
                <View key={index} style={styles.skillBadge}>
                  <Text style={styles.skillText}>{skill.name}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* CERTIFICATES (Embedded Header Strategy) */}
        {data.certificates?.length > 0 && (
          <View style={styles.section}>
            {data.certificates.map((cert, index) => (
              <View key={index} style={styles.jobBlock} wrap={false}>
                {index === 0 && breaks["cert-header"] && <View break />}
                {index > 0 && breaks[`cert-${index}`] && <View break />}

                {/* 🔒 HEADER EMBEDDED IN FIRST ITEM */}
                {index === 0 && (
                  <View style={styles.sectionTitleRow}>
                    <IconCert />
                    <Text style={styles.sectionTitle}>Certificates</Text>
                  </View>
                )}

                <View style={styles.jobHeader}>
                  <Text style={styles.jobRole}>{cert.name}</Text>
                  <Text style={styles.jobDate}>{cert.date}</Text>
                </View>
                <Text style={styles.description}>{cert.issuer}</Text>
              </View>
            ))}
          </View>
        )}

        {/* REFERENCES (Wraps Whole Section) */}
        {data.references?.length > 0 && (
          <View style={styles.section} wrap={false}>
            {breaks["ref-header"] && <View break />}
            <View style={styles.sectionTitleRow}>
              <IconUsers />
              <Text style={styles.sectionTitle}>References</Text>
            </View>
            <View style={styles.refGrid}>
              {data.references.map((ref, index) => (
                <View key={index} style={styles.refItem}>
                  {breaks[`ref-${index}`] && <View break />}
                  <Text
                    style={{ fontWeight: "bold", fontSize: 10, color: "#000" }}
                  >
                    {ref.name}
                  </Text>
                  <Text
                    style={{
                      fontSize: 9,
                      fontWeight: "medium",
                      color: "#1f2937",
                    }}
                  >
                    {ref.position}
                  </Text>
                  <Text style={{ fontSize: 9, color: "#374151" }}>
                    {ref.company}
                  </Text>

                  {ref.location && (
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginTop: 1,
                      }}
                    >
                      <IconMapPin style={styles.refIcon} />
                      <Text
                        style={{ fontSize: 9, color: "#374151", marginLeft: 4 }}
                      >
                        {ref.location}
                      </Text>
                    </View>
                  )}

                  <View style={{ marginTop: 4 }}>
                    {ref.phone && (
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          marginBottom: 1,
                        }}
                      >
                        <IconPhone style={styles.refIcon} />
                        <Text
                          style={{
                            fontSize: 9,
                            color: "#374151",
                            marginLeft: 4,
                          }}
                        >
                          {ref.phone}
                        </Text>
                      </View>
                    )}
                    {ref.email && (
                      <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                      >
                        <IconMail style={styles.refIcon} />
                        <Text
                          style={{
                            fontSize: 9,
                            color: "#374151",
                            marginLeft: 4,
                          }}
                        >
                          {ref.email}
                        </Text>
                      </View>
                    )}
                  </View>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* PERSONAL INFO (Wraps Whole Section) */}
        {hasBioData && (
          <View wrap={false} style={styles.section}>
            {breaks["personal"] && <View break />}
            <View style={styles.sectionTitleRow}>
              <IconUser />
              <Text style={styles.sectionTitle}>Personal Information</Text>
            </View>
            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
              <View style={{ width: "50%", paddingRight: 10 }}>
                {data.personalInfo.address && (
                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Address</Text>
                    <Text style={styles.infoValue}>
                      {data.personalInfo.address}
                    </Text>
                  </View>
                )}
                {data.personalInfo.dob && (
                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>DOB</Text>
                    <Text style={styles.infoValue}>
                      {data.personalInfo.dob}
                    </Text>
                  </View>
                )}
                {data.personalInfo.gender && (
                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Gender</Text>
                    <Text style={styles.infoValue}>
                      {data.personalInfo.gender}
                    </Text>
                  </View>
                )}
                {data.personalInfo.maritalStatus && (
                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Status</Text>
                    <Text style={styles.infoValue}>
                      {data.personalInfo.maritalStatus}
                    </Text>
                  </View>
                )}
              </View>
              <View style={{ width: "50%", paddingLeft: 10 }}>
                {data.personalInfo.nationality && (
                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Nationality</Text>
                    <Text style={styles.infoValue}>
                      {data.personalInfo.nationality}
                    </Text>
                  </View>
                )}
                {data.personalInfo.idNumber && (
                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>NIC/ID</Text>
                    <Text style={styles.infoValue}>
                      {data.personalInfo.idNumber}
                    </Text>
                  </View>
                )}
              </View>
            </View>
          </View>
        )}
      </Page>
    </Document>
  );
};

export default CVDocument;

```

## 07/01/2026 - 05.39AM

### 🧱 Brick 13: The Atomic UI Refactor

**Status:** ✅ COMPLETED (Systematized)
**Focus:** Code Maintainability, Visual Consistency, and Scalability.

**1. The Problem:**

- **Inconsistency:** Each form section (`Education`, `Experience`, etc.) had its own manual Tailwind classes. Changing a border color required editing 6 different files.
- **Repetition:** Error handling logic (`errors.education[index]?.school...`) was repeated hundreds of times.
- **Fragility:** Form components would crash if props were missing or `undefined`.

**2. The Solution: "The Atomic UI Kit"**
We created a reusable internal library in `src/components/ui/`:

- **`FormSection`:** The Master Shell. Handles the Card layout, Header styling, Icon placement, and the "Add" button logic.
- **`FormInput` / `FormTextArea` / `FormSelect`:** Smart input components that:
  - Auto-detect errors based on the `name` prop.
  - Include "Crash-Proof" guard clauses for undefined paths.
  - Enforce global styling (focus rings, padding, fonts).

**3. The Refactor:**
We rewrote **100%** of the form components to use this new system:

- `PersonalDetails.jsx`: Standardized grid layout + Photo Upload integration.
- `Education.jsx` & `Experience.jsx`: Cleaned up the field array loops.
- `Certificates.jsx`: Switched icon to `BadgeCheck` and standardized layout.
- `Skills.jsx`: implemented a custom "Chip/Tag" layout inside the standard `FormSection`.
- `References.jsx`: Fully standardized.

**Outcome:** Reduced boilerplate code by ~70%, guaranteed visual uniformity across the app, and established a framework for adding future sections in minutes.

```
`src/components/ui/Forminput.jsx`
import React from "react";
import { useFormContext } from "react-hook-form";

const FormInput = ({
  label,
  name,
  placeholder,
  type = "text",
  className = "",
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const getError = (obj, path) => {
    if (!path || !obj) return undefined;
    return path.split(".").reduce((acc, part) => acc && acc[part], obj);
  };

  const error = getError(errors, name);

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className="block mb-1.5 text-xs font-bold text-gray-500 uppercase tracking-wider">
          {label}
        </label>
      )}

      <input
        type={type}
        {...(name ? register(name) : {})}
        placeholder={placeholder}
        className={`w-full px-3 py-2.5 text-sm font-medium text-gray-700 bg-white border rounded-lg outline-none transition-all duration-200
          ${
            error
              ? "border-red-500 focus:ring-2 focus:ring-red-200 bg-red-50"
              : "border-gray-200 hover:border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          }
        `}
      />

      {error && (
        <p className="mt-1.5 text-xs font-semibold text-red-500 flex items-center gap-1">
          ⚠️ {error.message}
        </p>
      )}
    </div>
  );
};

export default FormInput;

`src/components/ui/FormSction.jsx`
import React from "react";

const FormSection = ({
  icon: Icon,
  title,
  children,
  onAdd,
  addButtonLabel,
}) => {
  return (
    <div className="p-6 transition-shadow duration-300 bg-white border border-gray-200 shadow-sm rounded-xl hover:shadow-md">
      {/* 🟢 Header Area */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="flex items-center gap-3 text-lg font-bold tracking-wide text-gray-800 uppercase">
          {Icon && <Icon size={20} className="text-blue-600" />}
          {title}
        </h2>

        {onAdd && (
          <button
            type="button"
            onClick={onAdd}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-full transition-colors"
          >
            <span className="text-lg leading-none">+</span>
            {addButtonLabel || "Add"}
          </button>
        )}
      </div>

      {/* 🟢 Content Area - This is where your schools/jobs go */}
      <div className="space-y-6">{children}</div>
    </div>
  );
};

export default FormSection;

`src/components/ui/FormSelect.jsx`
import React from "react";
import { useFormContext } from "react-hook-form";

const FormSelect = ({
  label,
  name,
  options = [],
  placeholder = "Select...",
  className = "",
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const getError = (obj, path) => {
    if (!path || !obj) return undefined;
    return path.split(".").reduce((acc, part) => acc && acc[part], obj);
  };

  const error = getError(errors, name);

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className="block mb-1.5 text-xs font-bold text-gray-500 uppercase tracking-wider">
          {label}
        </label>
      )}
      <div className="relative">
        <select
          {...(name ? register(name) : {})}
          className={`w-full px-3 py-2.5 text-sm font-medium text-gray-700 bg-white border rounded-lg outline-none transition-all duration-200 appearance-none
            ${
              error
                ? "border-red-500 focus:ring-2 focus:ring-red-200 bg-red-50"
                : "border-gray-200 hover:border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            }
          `}
        >
          <option value="">{placeholder}</option>
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        {/* Chevron Icon */}
        <div className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 pointer-events-none">
          <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
            <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
          </svg>
        </div>
      </div>
      {error && (
        <p className="mt-1.5 text-xs font-semibold text-red-500 flex items-center gap-1">
          ⚠️ {error.message}
        </p>
      )}
    </div>
  );
};

export default FormSelect;

`src/components/ui/FormTextArea.jsx`
import React from "react";
import { useFormContext } from "react-hook-form";

const FormTextArea = ({
  label,
  name,
  placeholder,
  rows = 3,
  className = "",
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const getError = (obj, path) => {
    if (!path || !obj) return undefined;
    return path.split(".").reduce((acc, part) => acc && acc[part], obj);
  };

  const error = getError(errors, name);

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className="block mb-1.5 text-xs font-bold text-gray-500 uppercase tracking-wider">
          {label}
        </label>
      )}
      <textarea
        {...(name ? register(name) : {})}
        placeholder={placeholder}
        rows={rows}
        className={`w-full px-3 py-2.5 text-sm font-medium text-gray-700 bg-white border rounded-lg outline-none transition-all duration-200 resize-none
          ${
            error
              ? "border-red-500 focus:ring-2 focus:ring-red-200 bg-red-50"
              : "border-gray-200 hover:border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          }
        `}
      />
      {error && (
        <p className="mt-1.5 text-xs font-semibold text-red-500 flex items-center gap-1">
          ⚠️ {error.message}
        </p>
      )}
    </div>
  );
};

export default FormTextArea;

```

You are absolutely right. This is the **most critical step** in software development: **The Save Point.** 💾

We have successfully rebuilt the engine with a "PDF-First" architecture, fixed the preview bugs, and implemented professional drag-and-drop reordering.

Here is your updated **Project Manifest**. Copy and paste this entirely into `project-menifest.md`.

---

### 💾 PROJECT MANIFEST (Save Point: "The Phoenix Update")

**Date:** 2026-01-08
**Status:** ✅ STABLE (Production Ready)
**Architecture:** Type C (PDF-First Engine) + Atomic UI + Dynamic Reordering.

---

#### 1. Tech Stack & Dependencies

- **Core:** React + Vite
- **Styling:** Tailwind CSS
- **State:** React Hook Form
- **Validation:** Zod
- **PDF Generation:** `@react-pdf/renderer` (The Engine)
- **PDF Rendering:** `react-pdf` (The Preview)
- **Drag & Drop:** `@dnd-kit/core`, `@dnd-kit/sortable`
- **Icons:** Lucide React (UI) + Custom SVG Paths (PDF)

#### 2. The File Structure

```
src/
├── components/
│   ├── pdf/
│   │   └── CVDocument.jsx      (The Master PDF Template)
│   ├── preview/
│   │   └── CVPreview.jsx       (The Preview Orchestrator) 🆕
│   ├── ui/
│   │   ├── FormSection.jsx     (Standardized Card Wrapper)
│   │   ├── SortableSection.jsx (Draggable Wrapper)
│   │   ├── FormInput.jsx       (Standard Input)
│   │   ├── FormTextArea.jsx    (Standard Text Area)
│   │   └── FormSelect.jsx      (Standard Dropdown)
│   ├── PersonalDetails.jsx
│   ├── Experience.jsx
│   ├── Education.jsx
│   ├── Skills.jsx
│   ├── Certificates.jsx
│   ├── References.jsx
│   └── PhotoUpload.jsx
├── pages/
│   └── BuilderPage.jsx         (The Controller Page)
├── schemas/
│   └── cvSchema.js             (Zod Validation Rules)
├── db.js                       (IndexedDB Storage)
├── App.jsx                     (Router)
└── main.jsx

```

---

#### 3. CRITICAL ENGINE FILES

**A. The PDF Template (`src/components/pdf/CVDocument.jsx`)**
_Handles layout, "Pure Path" icons to prevent crashes, and dynamic reordering._

```jsx
import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
  Link,
  Svg,
  Path,
} from "@react-pdf/renderer";

// --- 🛠️ ICON LIBRARY (Standardized Size 10x10 & Uniform Colors) ---

const IconMail = ({ style }) => (
  <Svg
    width={10}
    height={10}
    viewBox="0 0 24 24"
    style={style || { transform: "translateY(-0.5)" }}
  >
    <Path
      d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"
      stroke="#374151"
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M4 4 h16 a2 2 0 0 1 2 2 v12 a2 2 0 0 1 -2 2 h-16 a2 2 0 0 1 -2 -2 v-12 a2 2 0 0 1 2 -2 z"
      stroke="#374151"
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const IconPhone = ({ style }) => (
  <Svg
    width={10}
    height={10}
    viewBox="0 0 24 24"
    style={style || { transform: "translateY(-0.5)" }}
  >
    <Path
      d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384"
      stroke="#374151"
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const IconLinkedin = ({ style }) => (
  <Svg
    width={10}
    height={10}
    viewBox="0 0 24 24"
    style={style || { transform: "translateY(-0.5)" }}
  >
    <Path
      d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"
      stroke="#2563eb"
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M2 9 h4 v12 h-4 z"
      stroke="#2563eb"
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M4 2 a2 2 0 1 1 0 4 a2 2 0 0 1 0 -4 z"
      stroke="#2563eb"
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const IconGithub = ({ style }) => (
  <Svg
    width={10}
    height={10}
    viewBox="0 0 24 24"
    style={style || { transform: "translateY(-0.5)" }}
  >
    <Path
      d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"
      stroke="#374151"
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M9 18c-4.51 2-5-2-7-2"
      stroke="#374151"
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const IconMapPin = ({ style }) => (
  <Svg
    width={10}
    height={10}
    viewBox="0 0 24 24"
    style={style || { transform: "translateY(-0.5)" }}
  >
    <Path
      d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"
      stroke="#374151"
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M12 7 a3 3 0 1 1 0 6 a3 3 0 0 1 0 -6 z"
      stroke="#374151"
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// SECTION ICONS
const IconSummary = () => (
  <Svg
    width={12}
    height={12}
    viewBox="0 0 24 24"
    style={{ transform: "translateY(-2)" }}
  >
    <Path
      d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"
      stroke="#1f2937"
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M12 3 a4 4 0 1 1 0 8 a4 4 0 0 1 0 -8 z"
      stroke="#1f2937"
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
const IconExperience = () => (
  <Svg
    width={12}
    height={12}
    viewBox="0 0 24 24"
    style={{ transform: "translateY(-2)" }}
  >
    <Path
      d="M12 12h.01"
      stroke="#1f2937"
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M16 6V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"
      stroke="#1f2937"
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M22 13a18.15 18.15 0 0 1-20 0"
      stroke="#1f2937"
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M4 6 h16 a2 2 0 0 1 2 2 v10 a2 2 0 0 1 -2 2 h-16 a2 2 0 0 1 -2 -2 v-10 a2 2 0 0 1 2 -2 z"
      stroke="#1f2937"
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
const IconEducation = () => (
  <Svg
    width={12}
    height={12}
    viewBox="0 0 24 24"
    style={{ transform: "translateY(-2)" }}
  >
    <Path
      d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"
      stroke="#1f2937"
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M22 10v6"
      stroke="#1f2937"
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M6 12.5V16a6 3 0 0 0 12 0v-3.5"
      stroke="#1f2937"
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
const IconSkills = () => (
  <Svg
    width={12}
    height={12}
    viewBox="0 0 24 24"
    style={{ transform: "translateY(-2)" }}
  >
    <Path
      d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"
      stroke="#1f2937"
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M9 18h6"
      stroke="#1f2937"
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M10 22h4"
      stroke="#1f2937"
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
const IconCert = () => (
  <Svg
    width={12}
    height={12}
    viewBox="0 0 24 24"
    style={{ transform: "translateY(-2)" }}
  >
    <Path
      d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"
      stroke="#1f2937"
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="m9 12 2 2 4-4"
      stroke="#1f2937"
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
const IconUsers = () => (
  <Svg
    width={12}
    height={12}
    viewBox="0 0 24 24"
    style={{ transform: "translateY(-2)" }}
  >
    <Path
      d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"
      stroke="#1f2937"
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M16 3.128a4 4 0 0 1 0 7.744"
      stroke="#1f2937"
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M22 21v-2a4 4 0 0 0-3-3.87"
      stroke="#1f2937"
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M9 3 a4 4 0 1 1 0 8 a4 4 0 0 1 0 -8 z"
      stroke="#1f2937"
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
const IconUser = IconSummary;

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 10,
    lineHeight: 1.5,
    fontFamily: "Helvetica",
    color: "#374151",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#1f2937",
    paddingBottom: 15,
  },
  photo: { width: 100, height: 100, borderRadius: 50, objectFit: "cover" },
  headerRight: { marginLeft: 30, flex: 1 },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    textTransform: "uppercase",
    color: "#111827",
    marginBottom: 4,
    lineHeight: 1.2,
  },
  role: {
    fontSize: 11,
    color: "#4b5563",
    marginBottom: 6,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  contactRow: { flexDirection: "row", flexWrap: "wrap", gap: 12 },
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
    fontSize: 9,
    color: "#374151",
    lineHeight: 1.2,
  },
  link: { color: "#2563eb", textDecoration: "none" },
  section: { marginBottom: 10 },
  sectionTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
    paddingBottom: 4,
    marginBottom: 8,
    marginTop: 5,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: "bold",
    textTransform: "uppercase",
    color: "#1f2937",
    marginLeft: 6,
  },
  jobBlock: { marginBottom: 10 },
  jobHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  jobRole: {
    fontWeight: "bold",
    fontSize: 10,
    color: "#000000",
    maxWidth: "70%",
  },
  jobDate: { fontSize: 9, color: "#6b7280", textAlign: "right" },
  company: {
    color: "#2563eb",
    fontWeight: "bold",
    fontSize: 9,
    marginTop: 1,
    marginBottom: 3,
  },
  description: { fontSize: 9, textAlign: "justify", color: "#4b5563" },
  skillBadge: {
    backgroundColor: "#f3f4f6",
    borderRadius: 12,
    paddingVertical: 5,
    paddingHorizontal: 14,
    marginRight: 6,
    marginBottom: 6,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  skillText: {
    fontSize: 9,
    fontWeight: "bold",
    color: "#374151",
    lineHeight: 1,
  },
  skillsContainer: { flexDirection: "row", flexWrap: "wrap" },
  refGrid: { flexDirection: "row", flexWrap: "wrap", gap: 15 },
  refItem: { width: "45%", marginBottom: 10 },
  infoRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
    paddingVertical: 4,
    alignItems: "center",
    lineHeight: 1.2,
  },
  infoLabel: {
    width: "30%",
    fontSize: 8,
    color: "#6b7280",
    textTransform: "uppercase",
    fontWeight: "bold",
  },
  infoValue: { width: "70%", fontSize: 9, color: "#111827" },
  refIcon: { transform: "translateY(-1.5)" },
});

// --- HELPER COMPONENTS FOR DYNAMIC RENDERING ---
const ExperienceSection = ({ data }) => (
  <View style={styles.section}>
    {data.map((job, index) => (
      <View key={index} style={styles.jobBlock} wrap={false}>
        {index === 0 && (
          <View style={styles.sectionTitleRow}>
            <IconExperience />
            <Text style={styles.sectionTitle}>Experience</Text>
          </View>
        )}
        <View style={styles.jobHeader}>
          <Text style={styles.jobRole}>{job.role}</Text>
          <Text style={styles.jobDate}>
            {job.startDate} — {job.endDate}
          </Text>
        </View>
        <Text style={styles.company}>{job.company}</Text>
        <Text style={styles.description}>{job.description}</Text>
      </View>
    ))}
  </View>
);

const EducationSection = ({ data }) => (
  <View style={styles.section}>
    {data.map((edu, index) => (
      <View key={index} style={styles.jobBlock} wrap={false}>
        {index === 0 && (
          <View style={styles.sectionTitleRow}>
            <IconEducation />
            <Text style={styles.sectionTitle}>Education</Text>
          </View>
        )}
        <View style={styles.jobHeader}>
          <Text style={styles.jobRole}>{edu.school}</Text>
          <Text style={styles.jobDate}>{edu.date}</Text>
        </View>
        <Text style={styles.description}>{edu.degree}</Text>
      </View>
    ))}
  </View>
);

const SkillsSection = ({ data }) => (
  <View wrap={false} style={styles.section}>
    <View style={styles.sectionTitleRow}>
      <IconSkills />
      <Text style={styles.sectionTitle}>Skills</Text>
    </View>
    <View style={styles.skillsContainer}>
      {data.map((skill, index) => (
        <View key={index} style={styles.skillBadge}>
          <Text style={styles.skillText}>{skill.name}</Text>
        </View>
      ))}
    </View>
  </View>
);

const CertificatesSection = ({ data }) => (
  <View style={styles.section}>
    {data.map((cert, index) => (
      <View key={index} style={styles.jobBlock} wrap={false}>
        {index === 0 && (
          <View style={styles.sectionTitleRow}>
            <IconCert />
            <Text style={styles.sectionTitle}>Certificates</Text>
          </View>
        )}
        <View style={styles.jobHeader}>
          <Text style={styles.jobRole}>{cert.name}</Text>
          <Text style={styles.jobDate}>{cert.date}</Text>
        </View>
        <Text style={styles.description}>{cert.issuer}</Text>
      </View>
    ))}
  </View>
);

const ReferencesSection = ({ data }) => (
  <View style={styles.section} wrap={false}>
    <View style={styles.sectionTitleRow}>
      <IconUsers />
      <Text style={styles.sectionTitle}>References</Text>
    </View>
    <View style={styles.refGrid}>
      {data.map((ref, index) => (
        <View key={index} style={styles.refItem}>
          <Text style={{ fontWeight: "bold", fontSize: 10, color: "#000" }}>
            {ref.name}
          </Text>
          <Text style={{ fontSize: 9, fontWeight: "medium", color: "#1f2937" }}>
            {ref.position}
          </Text>
          <Text style={{ fontSize: 9, color: "#374151" }}>{ref.company}</Text>
          {ref.location && (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 1,
              }}
            >
              <IconMapPin style={styles.refIcon} />
              <Text style={{ fontSize: 9, color: "#374151", marginLeft: 4 }}>
                {ref.location}
              </Text>
            </View>
          )}
          <View style={{ marginTop: 4 }}>
            {ref.phone && (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 1,
                }}
              >
                <IconPhone style={styles.refIcon} />
                <Text style={{ fontSize: 9, color: "#374151", marginLeft: 4 }}>
                  {ref.phone}
                </Text>
              </View>
            )}
            {ref.email && (
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <IconMail style={styles.refIcon} />
                <Text style={{ fontSize: 9, color: "#374151", marginLeft: 4 }}>
                  {ref.email}
                </Text>
              </View>
            )}
          </View>
        </View>
      ))}
    </View>
  </View>
);

// --- MAIN DOCUMENT ---
const CVDocument = ({ data, activeSections = [] }) => {
  const hasBioData =
    data.personalInfo.address ||
    data.personalInfo.dob ||
    data.personalInfo.gender ||
    data.personalInfo.nationality ||
    data.personalInfo.maritalStatus ||
    data.personalInfo.idNumber;

  const RENDER_MAP = {
    experience: (d) => <ExperienceSection data={d.experience} />,
    education: (d) => <EducationSection data={d.education} />,
    skills: (d) => <SkillsSection data={d.skills} />,
    certificates: (d) => <CertificatesSection data={d.certificates} />,
    references: (d) => <ReferencesSection data={d.references} />,
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* HEADER (Always Top) */}
        <View wrap={false}>
          <View style={styles.header}>
            {data.personalInfo.photo && (
              <Image src={data.personalInfo.photo} style={styles.photo} />
            )}
            <View style={styles.headerRight}>
              <Text style={styles.name}>
                {data.personalInfo.fullName || "Your Name"}
              </Text>
              <Text style={styles.role}>
                {data.personalInfo.role || "Job Title"}
              </Text>
              <View style={styles.contactRow}>
                {data.personalInfo.email && (
                  <View style={styles.contactItem}>
                    <IconMail />
                    <Text style={{ marginLeft: 4 }}>
                      {data.personalInfo.email}
                    </Text>
                  </View>
                )}
                {data.personalInfo.phone && (
                  <View style={styles.contactItem}>
                    <IconPhone />
                    <Text style={{ marginLeft: 4 }}>
                      {data.personalInfo.phone}
                    </Text>
                  </View>
                )}
                {data.personalInfo.linkedin && (
                  <View style={styles.contactItem}>
                    <IconLinkedin />
                    <Link
                      src={data.personalInfo.linkedin}
                      style={{ marginLeft: 4, ...styles.link }}
                    >
                      LinkedIn
                    </Link>
                  </View>
                )}
                {data.personalInfo.github && (
                  <View style={styles.contactItem}>
                    <IconGithub />
                    <Link
                      src={data.personalInfo.github}
                      style={{ marginLeft: 4, ...styles.link }}
                    >
                      GitHub
                    </Link>
                  </View>
                )}
              </View>
            </View>
          </View>
        </View>

        {/* SUMMARY (Always Second) */}
        {data.personalInfo.summary && (
          <View wrap={false} style={styles.section}>
            <View style={styles.sectionTitleRow}>
              <IconSummary />
              <Text style={styles.sectionTitle}>Professional Summary</Text>
            </View>
            <Text style={styles.description}>{data.personalInfo.summary}</Text>
          </View>
        )}

        {/* DYNAMIC SECTIONS */}
        {activeSections.map((section) => {
          const renderFunc = RENDER_MAP[section.id];
          if (renderFunc && data[section.id] && data[section.id].length > 0) {
            return <View key={section.id}>{renderFunc(data)}</View>;
          }
          return null;
        })}

        {/* PERSONAL INFO (Always Last) */}
        {hasBioData && (
          <View wrap={false} style={styles.section}>
            <View style={styles.sectionTitleRow}>
              <IconUser />
              <Text style={styles.sectionTitle}>Personal Information</Text>
            </View>
            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
              <View style={{ width: "50%", paddingRight: 10 }}>
                {data.personalInfo.address && (
                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Address</Text>
                    <Text style={styles.infoValue}>
                      {data.personalInfo.address}
                    </Text>
                  </View>
                )}
                {data.personalInfo.dob && (
                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>DOB</Text>
                    <Text style={styles.infoValue}>
                      {data.personalInfo.dob}
                    </Text>
                  </View>
                )}
                {data.personalInfo.gender && (
                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Gender</Text>
                    <Text style={styles.infoValue}>
                      {data.personalInfo.gender}
                    </Text>
                  </View>
                )}
                {data.personalInfo.maritalStatus && (
                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Status</Text>
                    <Text style={styles.infoValue}>
                      {data.personalInfo.maritalStatus}
                    </Text>
                  </View>
                )}
              </View>
              <View style={{ width: "50%", paddingLeft: 10 }}>
                {data.personalInfo.nationality && (
                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Nationality</Text>
                    <Text style={styles.infoValue}>
                      {data.personalInfo.nationality}
                    </Text>
                  </View>
                )}
                {data.personalInfo.idNumber && (
                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>NIC/ID</Text>
                    <Text style={styles.infoValue}>
                      {data.personalInfo.idNumber}
                    </Text>
                  </View>
                )}
              </View>
            </View>
          </View>
        )}
      </Page>
    </Document>
  );
};
export default CVDocument;
```

**B. The Preview Manager (`src/components/CVPreview.jsx`)**
_Handles Blob generation, Toolbars, Download, and Pagination._

```jsx
import React, { useState, useEffect, useRef, useMemo } from "react";
import { useFormContext } from "react-hook-form";
import { useDebounce } from "use-debounce";
import { pdf } from "@react-pdf/renderer";
import { Document, Page, pdfjs } from "react-pdf";
import CVDocument from "./pdf/CVDocument";
import { Download, Loader2, ZoomIn, ZoomOut, CheckCircle2 } from "lucide-react";

// ✅ WORKER SETUP
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";

const PDF_OPTIONS = {
  cMapUrl: `https://unpkg.com/pdfjs-dist@${pdfjs.version}/cmaps/`,
  cMapPacked: true,
};

const CVPreview = ({ activeSections = [] }) => {
  const { watch } = useFormContext();
  const formData = watch();

  // Debounce (1s)
  const [debouncedDataString] = useDebounce(JSON.stringify(formData), 1000);
  const debouncedData = useMemo(
    () => JSON.parse(debouncedDataString),
    [debouncedDataString]
  );

  const [pdfUrl, setPdfUrl] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [scale, setScale] = useState(1.0);

  // Responsive Width
  const containerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(600);

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current)
        setContainerWidth(containerRef.current.offsetWidth - 40);
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  // ⚡ GENERATE PDF ENGINE
  useEffect(() => {
    let isMounted = true;
    const generatePdf = async () => {
      setIsGenerating(true);
      try {
        // 🔑 PASS activeSections TO THE PDF ENGINE
        const blob = await pdf(
          <CVDocument data={debouncedData} activeSections={activeSections} />
        ).toBlob();
        if (isMounted) {
          const url = URL.createObjectURL(blob);
          setPdfUrl((prev) => {
            if (prev) URL.revokeObjectURL(prev);
            return url;
          });
        }
      } catch (error) {
        console.error("PDF Gen Error:", error);
      } finally {
        if (isMounted) setIsGenerating(false);
      }
    };
    if (debouncedData) generatePdf();
    return () => {
      isMounted = false;
    };
  }, [debouncedData, activeSections]);

  const handleDownload = () => {
    if (!pdfUrl) return;
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = `${debouncedData.personalInfo.fullName || "CV"}.pdf`;
    link.click();
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100 border-l border-gray-300">
      {/* 🛠️ INTEGRATED TOOLBAR */}
      <div className="z-10 flex items-center justify-between p-3 bg-white border-b border-gray-200 shadow-sm">
        <div className="flex items-center gap-2">
          <h2 className="text-sm font-bold tracking-wide text-gray-700 uppercase">
            Preview
          </h2>
          {isGenerating ? (
            <span className="flex items-center gap-1 text-xs text-blue-600 font-medium bg-blue-50 px-2 py-0.5 rounded-full animate-pulse">
              <Loader2 size={10} className="animate-spin" /> Updating...
            </span>
          ) : (
            <span className="flex items-center gap-1 text-xs text-green-600 font-medium bg-green-50 px-2 py-0.5 rounded-full">
              <CheckCircle2 size={10} /> Ready
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setScale((s) => Math.max(0.5, s - 0.1))}
            className="p-1.5 hover:bg-gray-100 rounded text-gray-600"
          >
            <ZoomOut size={16} />
          </button>
          <span className="w-12 font-mono text-xs text-center">
            {(scale * 100).toFixed(0)}%
          </span>
          <button
            onClick={() => setScale((s) => Math.min(2.0, s + 0.1))}
            className="p-1.5 hover:bg-gray-100 rounded text-gray-600"
          >
            <ZoomIn size={16} />
          </button>
          <div className="w-px h-4 mx-1 bg-gray-300"></div>
          <button
            onClick={handleDownload}
            disabled={!pdfUrl}
            className="flex items-center gap-1.5 bg-gray-900 hover:bg-black text-white px-4 py-1.5 rounded text-sm font-bold transition disabled:opacity-50"
          >
            <Download size={14} /> Download PDF
          </button>
        </div>
      </div>

      {/* 📄 PDF VIEWER */}
      <div
        ref={containerRef}
        className="flex justify-center flex-1 p-8 overflow-y-auto bg-slate-200 scroll-smooth"
      >
        {pdfUrl ? (
          <Document
            file={pdfUrl}
            options={PDF_OPTIONS}
            onLoadSuccess={({ numPages }) => setNumPages(numPages)}
            loading={null}
            className="flex flex-col gap-6"
          >
            {Array.from(new Array(numPages), (_, index) => (
              <div key={`page_${index + 1}`} className="shadow-xl">
                <Page
                  pageNumber={index + 1}
                  width={containerWidth * scale}
                  renderTextLayer={true}
                  renderAnnotationLayer={false}
                  className="bg-white"
                />
                <div className="text-center mt-2 text-[10px] text-gray-400 font-bold tracking-widest uppercase">
                  Page {index + 1}
                </div>
              </div>
            ))}
          </Document>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-gray-400">
            <Loader2 className="mb-3 animate-spin" size={32} />
            <p className="text-sm font-medium">Initializing Engine...</p>
          </div>
        )}
      </div>
    </div>
  );
};
export default CVPreview;
```

**C. The Page Controller (`src/pages/BuilderPage.jsx`)**
_Manages the Layout State, Drag-and-Drop, and Data Persistence._

```jsx
import React, { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import {
  Loader2,
  ArrowLeft,
  Plus,
  Briefcase,
  GraduationCap,
  Lightbulb,
  BadgeCheck,
  Users,
} from "lucide-react";

// 🏎️ Drag & Drop Imports
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

// 🧱 Internal Imports
import { cvSchema } from "../schemas/cvSchema";
import { saveCVData, loadCVData } from "../db";
import SortableSection from "../components/ui/SortableSection";
import CVPreview from "../components/CVPreview";

// 📝 Form Sections
import PersonalDetails from "../components/PersonalDetails";
import Experience from "../components/Experience";
import Education from "../components/Education";
import Skills from "../components/Skills";
import Certificates from "../components/Certificates";
import References from "../components/References";

const BuilderPage = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  // 1️⃣ State for Dynamic Sections
  // This state controls the visual order in BOTH the Form and the PDF
  const [activeSections, setActiveSections] = useState([
    { id: "experience" },
    { id: "education" },
    { id: "skills" },
    { id: "certificates" },
    { id: "references" },
  ]);

  // 2️⃣ Section Configuration (The "Database" of sections)
  // Maps IDs to Titles, Icons, and actual Input Components
  const SECTION_CONFIG = {
    experience: {
      component: <Experience />,
      title: "Work Experience",
      icon: Briefcase,
    },
    education: {
      component: <Education />,
      title: "Education",
      icon: GraduationCap,
    },
    skills: { component: <Skills />, title: "Skills", icon: Lightbulb },
    certificates: {
      component: <Certificates />,
      title: "Certificates",
      icon: BadgeCheck,
    },
    references: { component: <References />, title: "References", icon: Users },
  };

  // 3️⃣ Available Sections List
  const allOptionalSections = Object.keys(SECTION_CONFIG).map((id) => ({
    id,
    title: SECTION_CONFIG[id].title,
  }));

  const methods = useForm({
    resolver: zodResolver(cvSchema),
    mode: "onChange",
    defaultValues: {
      personalInfo: {
        fullName: "",
        email: "",
        phone: "",
        role: "",
        summary: "",
        photo: "",
      },
      experience: [],
      education: [],
      skills: [],
      certificates: [],
      references: [],
    },
  });

  const { watch, reset } = methods;

  // 4️⃣ DnD Sensors
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  // 5️⃣ Handle Drag End (Reorder Logic)
  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return; // 🛡️ Crash protection

    if (active.id !== over.id) {
      setActiveSections((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  // 6️⃣ Add/Remove Logic
  const addSection = (sectionId) => {
    if (!activeSections.find((s) => s.id === sectionId)) {
      setActiveSections([...activeSections, { id: sectionId }]);
    }
  };

  const removeSection = (sectionId) => {
    if (confirm("Are you sure you want to remove this section?")) {
      setActiveSections(activeSections.filter((s) => s.id !== sectionId));
    }
  };

  // --- Data Loading & Saving ---
  useEffect(() => {
    const initData = async () => {
      const savedData = await loadCVData();
      if (savedData) reset(savedData);
      setIsLoaded(true);
    };
    initData();
  }, [reset]);

  useEffect(() => {
    if (!isLoaded) return;

    // Auto-save logic
    const subscription = watch((value) => {
      saveCVData(value);
    });

    return () => subscription.unsubscribe();
  }, [watch, isLoaded]);

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-500 bg-gray-100">
        <Loader2 className="text-blue-600 animate-spin" size={48} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <FormProvider {...methods}>
        <div className="flex flex-col h-screen overflow-hidden md:flex-row">
          {/* =========================================================
              LEFT COLUMN: EDITOR
          =========================================================== */}
          <div className="w-full h-full p-8 pb-32 overflow-y-auto md:w-1/2 scrollbar-hide bg-gray-50/50">
            <div className="flex items-center justify-between mb-6">
              <Link
                to="/"
                className="flex items-center gap-2 text-sm font-medium text-gray-500 transition-colors hover:text-blue-600"
              >
                <ArrowLeft size={16} /> Back to Home
              </Link>
              <h1 className="text-xl font-bold text-gray-800">CV Builder</h1>
            </div>

            <form className="space-y-6">
              {/* 🔒 FIXED SECTION: Personal Details */}
              <PersonalDetails />

              {/* 🔀 DYNAMIC SECTIONS */}
              <div className="pt-6 border-t border-gray-200">
                <h3 className="mb-4 text-xs font-bold tracking-wider text-gray-400 uppercase">
                  Sections (Drag to Reorder)
                </h3>

                <DndContext
                  sensors={sensors}
                  collisionDetection={closestCenter}
                  onDragEnd={handleDragEnd}
                >
                  <SortableContext
                    items={activeSections.map((s) => s.id)}
                    strategy={verticalListSortingStrategy}
                  >
                    {activeSections.map((section) => {
                      const config = SECTION_CONFIG[section.id];
                      return (
                        <SortableSection
                          key={section.id}
                          id={section.id}
                          title={config.title}
                          icon={config.icon}
                          onRemove={() => removeSection(section.id)}
                        >
                          {config.component}
                        </SortableSection>
                      );
                    })}
                  </SortableContext>
                </DndContext>
              </div>

              {/* ➕ ADD SECTION MENU */}
              <div className="pt-2">
                <div className="flex flex-wrap gap-3">
                  {allOptionalSections.map((section) => {
                    const isActive = activeSections.find(
                      (s) => s.id === section.id
                    );
                    if (isActive) return null;

                    return (
                      <button
                        key={section.id}
                        type="button"
                        onClick={() => addSection(section.id)}
                        className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-gray-600 transition-all bg-white border border-gray-300 border-dashed rounded-full shadow-sm hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600"
                      >
                        <Plus size={16} /> Add {section.title}
                      </button>
                    );
                  })}
                </div>
              </div>
            </form>
          </div>

          {/* =========================================================
              RIGHT COLUMN: PREVIEW WORKSPACE
          =========================================================== */}
          <div className="flex flex-col w-full h-full bg-gray-100 border-l border-gray-200 md:w-1/2">
            {/* We pass activeSections to CVPreview.
                CVPreview (Brick 9) now handles the PDF Generation, Toolbars, and Downloading.
            */}
            <CVPreview activeSections={activeSections} />
          </div>
        </div>
      </FormProvider>
    </div>
  );
};

export default BuilderPage;
```

### 💾 PROJECT MANIFEST (Save Point: "The Expanded Universe")

**Date:** 2026-01-09
**Status:** ✅ STABLE (Phoenix Architecture + Extended Sections)
**Architecture:** Type C (PDF-First) + Atomic UI + Smart State Management.

---

#### 1. The File Structure

```text
src/
├── components/
│   ├── pdf/
│   │   └── CVDocument.jsx      (The Master PDF Template - Updated with New Sections)
│   ├── preview/
│   │   └── CVPreview.jsx       (The Preview Orchestrator)
│   ├── ui/
│   │   ├── FormSection.jsx     (Card Wrapper - Add Button at Bottom)
│   │   ├── SortableSection.jsx (Accordion Wrapper - Fixed Submit Bug)
│   │   ├── FormInput.jsx       (Standard Input)
│   │   ├── FormTextArea.jsx    (Standard Text Area)
│   │   └── FormSelect.jsx      (Standard Dropdown)
│   ├── PersonalDetails.jsx
│   ├── Experience.jsx
│   ├── Education.jsx           (Updated with Description)
│   ├── Skills.jsx
│   ├── Certificates.jsx
│   ├── References.jsx
│   ├── Languages.jsx           (NEW)
│   ├── Projects.jsx            (NEW)
│   ├── Achievements.jsx        (NEW)
│   └── Extracurricular.jsx     (NEW)
├── pages/
│   └── BuilderPage.jsx         (The Controller - Smart Init, Capsules, Logic)
├── schemas/
│   └── cvSchema.js             (Zod Validation Rules - Updated)
├── db.js                       (IndexedDB Storage)
├── App.jsx                     (Router)
└── main.jsx

```

---

#### 3. CRITICAL SOURCE CODE

**A. The Controller (`src/pages/BuilderPage.jsx`)**
_Handles Smart Init, Capsules, Accordion Logic, and Data Persistence (Order + Content)._

```jsx
import React, { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import {
  Loader2,
  ArrowLeft,
  Plus,
  Briefcase,
  GraduationCap,
  Lightbulb,
  BadgeCheck,
  Users,
  Globe,
  FolderGit2,
  Trophy,
  Tent,
} from "lucide-react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { cvSchema } from "../schemas/cvSchema";
import { saveCVData, loadCVData } from "../db";
import SortableSection from "../components/ui/SortableSection";
import CVPreview from "../components/preview/CVPreview";

import PersonalDetails from "../components/PersonalDetails";
import Experience from "../components/Experience";
import Education from "../components/Education";
import Skills from "../components/Skills";
import Certificates from "../components/Certificates";
import References from "../components/References";
import Languages from "../components/Languages";
import Projects from "../components/Projects";
import Achievements from "../components/Achievements";
import Extracurricular from "../components/Extracurricular";

const BuilderPage = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeSections, setActiveSections] = useState([
    { id: "experience" },
    { id: "education" },
  ]);
  const [expandedSection, setExpandedSection] = useState("experience");

  const SECTION_CONFIG = {
    experience: {
      component: <Experience />,
      title: "Work Experience",
      icon: Briefcase,
    },
    education: {
      component: <Education />,
      title: "Education",
      icon: GraduationCap,
    },
    skills: { component: <Skills />, title: "Skills", icon: Lightbulb },
    certificates: {
      component: <Certificates />,
      title: "Certificates",
      icon: BadgeCheck,
    },
    references: { component: <References />, title: "References", icon: Users },
    languages: { component: <Languages />, title: "Languages", icon: Globe },
    projects: { component: <Projects />, title: "Projects", icon: FolderGit2 },
    achievements: {
      component: <Achievements />,
      title: "Achievements",
      icon: Trophy,
    },
    extracurricular: {
      component: <Extracurricular />,
      title: "Activities",
      icon: Tent,
    },
  };

  const allOptionalSections = Object.keys(SECTION_CONFIG).map((id) => ({
    id,
    title: SECTION_CONFIG[id].title,
    icon: SECTION_CONFIG[id].icon,
  }));

  const methods = useForm({
    resolver: zodResolver(cvSchema),
    mode: "onChange",
    defaultValues: {
      personalInfo: {
        fullName: "",
        email: "",
        phone: "",
        role: "",
        summary: "",
        photo: "",
      },
      experience: [],
      education: [],
      skills: [],
      certificates: [],
      references: [],
      languages: [],
      projects: [],
      achievements: [],
      extracurricular: [],
    },
  });

  const { watch, reset, setValue, getValues } = methods;
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    setActiveSections((items) => {
      const oldIndex = items.findIndex((item) => item.id === active.id);
      const newIndex = items.findIndex((item) => item.id === over.id);
      return arrayMove(items, oldIndex, newIndex);
    });
  };

  const addSection = (sectionId) => {
    if (!activeSections.find((s) => s.id === sectionId)) {
      setActiveSections([...activeSections, { id: sectionId }]);
      setExpandedSection(sectionId);
    }
  };

  const removeSection = (sectionId) => {
    if (confirm("Remove this section? All data in it will be lost.")) {
      setActiveSections(activeSections.filter((s) => s.id !== sectionId));
      setValue(sectionId, []); // Wipe data
    }
  };

  useEffect(() => {
    const initData = async () => {
      const savedData = await loadCVData();
      if (savedData) {
        const { sectionOrder, ...formData } = savedData;
        reset(formData);
        if (sectionOrder?.length > 0) {
          setActiveSections(sectionOrder);
        } else {
          // Smart Init Fallback
          const sectionsToActivate = ["experience", "education"];
          [
            "skills",
            "certificates",
            "references",
            "languages",
            "projects",
            "achievements",
            "extracurricular",
          ].forEach((id) => {
            if (savedData[id]?.length > 0 && !sectionsToActivate.includes(id))
              sectionsToActivate.push(id);
          });
          setActiveSections(sectionsToActivate.map((id) => ({ id })));
        }
      }
      setIsLoaded(true);
    };
    initData();
  }, [reset]);

  useEffect(() => {
    if (!isLoaded) return;
    const save = () =>
      saveCVData({ ...getValues(), sectionOrder: activeSections });
    const sub = watch(save);
    save(); // Also save on order change
    return () => sub.unsubscribe();
  }, [watch, isLoaded, activeSections, getValues]);

  if (!isLoaded)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="animate-spin" />
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-100">
      <FormProvider {...methods}>
        <div className="flex flex-col md:flex-row h-screen overflow-hidden">
          <div className="w-full md:w-1/2 h-full overflow-y-auto p-8 pb-32 scrollbar-hide bg-gray-50/50">
            <div className="flex items-center justify-between mb-6">
              <Link
                to="/"
                className="flex items-center gap-2 text-sm text-gray-500"
              >
                <ArrowLeft size={16} /> Back
              </Link>
              <h1 className="text-xl font-bold">CV Builder</h1>
            </div>
            <form className="space-y-6">
              <PersonalDetails />
              <div className="pt-6 border-t border-gray-200">
                <DndContext
                  sensors={sensors}
                  collisionDetection={closestCenter}
                  onDragEnd={handleDragEnd}
                >
                  <SortableContext
                    items={activeSections.map((s) => s.id)}
                    strategy={verticalListSortingStrategy}
                  >
                    {activeSections.map((section) => (
                      <SortableSection
                        key={section.id}
                        id={section.id}
                        title={SECTION_CONFIG[section.id].title}
                        icon={SECTION_CONFIG[section.id].icon}
                        onRemove={() => removeSection(section.id)}
                        isOpen={expandedSection === section.id}
                        onToggle={() =>
                          setExpandedSection((prev) =>
                            prev === section.id ? null : section.id
                          )
                        }
                      >
                        {SECTION_CONFIG[section.id].component}
                      </SortableSection>
                    ))}
                  </SortableContext>
                </DndContext>
              </div>
              <div className="pt-4 flex flex-wrap gap-3">
                {allOptionalSections.map(
                  (sec) =>
                    !activeSections.find((s) => s.id === sec.id) && (
                      <button
                        key={sec.id}
                        type="button"
                        onClick={() => addSection(sec.id)}
                        className="flex items-center gap-2 px-5 py-2 text-sm font-bold text-blue-700 bg-blue-50 border border-blue-200 rounded-full hover:bg-blue-100"
                      >
                        <Plus size={16} className="text-blue-500" /> {sec.title}
                      </button>
                    )
                )}
              </div>
            </form>
          </div>
          <div className="w-full md:w-1/2 h-full bg-gray-100 border-l border-gray-200">
            <CVPreview activeSections={activeSections} />
          </div>
        </div>
      </FormProvider>
    </div>
  );
};
export default BuilderPage;
```

**B. The PDF Engine (`src/components/pdf/CVDocument.jsx`)**
_Handles rendering of ALL sections (Core + New)._

```jsx
import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
  Link,
  Svg,
  Path,
} from "@react-pdf/renderer";

// ... (ICON DEFINITIONS: Mail, Phone, Linkedin, Github, MapPin, Experience, Education, Skills, Cert, Users) ...
// ... (NEW ICONS: Globe, Project, Trophy, Activity/Tent) ...

// ... (STYLES OBJECT) ...

// RENDER MAP
const RENDER_MAP = {
  experience: (d) => <ExperienceSection data={d.experience} />,
  education: (d) => <EducationSection data={d.education} />,
  skills: (d) => <SkillsSection data={d.skills} />,
  certificates: (d) => <CertificatesSection data={d.certificates} />,
  references: (d) => <ReferencesSection data={d.references} />,
  languages: (d) => <LanguagesSection data={d.languages} />,
  projects: (d) => <ProjectsSection data={d.projects} />,
  achievements: (d) => <AchievementsSection data={d.achievements} />,
  extracurricular: (d) => <ExtracurricularSection data={d.extracurricular} />,
};

const CVDocument = ({ data, activeSections = [] }) => {
  // ... (Header, Summary, Dynamic Rendering Loop, Personal Info) ...
};
export default CVDocument;
```

**C. The Validation Schema (`src/schemas/cvSchema.js`)**
_Updated for new sections and Education Description._

```javascript
import { z } from "zod";

export const cvSchema = z.object({
  personalInfo: z.object({
    /* ... */
  }),
  experience: z
    .array(
      z.object({
        /* ... */
      })
    )
    .optional(),
  education: z
    .array(
      z.object({
        school: z.string().min(2, "School required"),
        degree: z.string().min(2, "Degree required"),
        date: z.string().optional(),
        description: z.string().optional(), // 🆕 Added
      })
    )
    .optional(),
  // ... (Skills, Certs, References) ...
  languages: z
    .array(
      z.object({
        language: z.string().min(2),
        proficiency: z.string().optional(),
      })
    )
    .optional(),
  projects: z
    .array(
      z.object({
        title: z.string().min(2),
        link: z.string().optional(),
        technologies: z.string().optional(),
        description: z.string().optional(),
      })
    )
    .optional(),
  achievements: z
    .array(
      z.object({
        title: z.string().min(2),
        date: z.string().optional(),
        description: z.string().optional(),
      })
    )
    .optional(),
  extracurricular: z
    .array(
      z.object({
        role: z.string().min(2),
        organization: z.string().optional(),
        date: z.string().optional(),
        description: z.string().optional(),
      })
    )
    .optional(),
});
```

**D. The UI Wrapper (`src/components/ui/FormSection.jsx`)**
_Add button moved to footer._

```jsx
import React from "react";

const FormSection = ({
  icon: Icon,
  title,
  children,
  onAdd,
  addButtonLabel,
}) => {
  return (
    <div className="p-6 transition-shadow duration-300 bg-white border border-gray-200 shadow-sm rounded-xl hover:shadow-md">
      <div className="flex items-center justify-between mb-6">
        <h2 className="flex items-center gap-3 text-lg font-bold tracking-wide text-gray-800 uppercase">
          {Icon && <Icon size={20} className="text-blue-600" />} {title}
        </h2>
      </div>
      <div className="space-y-6">{children}</div>
      {onAdd && (
        <div className="mt-6">
          <button
            type="button"
            onClick={onAdd}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-full transition-colors"
          >
            <span className="text-lg leading-none">+</span>{" "}
            {addButtonLabel || "Add"}
          </button>
        </div>
      )}
    </div>
  );
};
export default FormSection;
```

## other updated files

**`src/components/preview/CVPreview.jsx`**

```jsx
import React, { useState, useEffect, useRef, useMemo } from "react";
import { useFormContext } from "react-hook-form";
import { useDebounce } from "use-debounce";
import { pdf } from "@react-pdf/renderer";
import { Document, Page, pdfjs } from "react-pdf";
import CVDocument from "./pdf/CVDocument.jsx"; // 👈 Ensure this path is correct!
import { Download, Loader2, ZoomIn, ZoomOut, CheckCircle2 } from "lucide-react";

// ✅ WORKER SETUP
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";

const PDF_OPTIONS = {
  cMapUrl: `https://unpkg.com/pdfjs-dist@${pdfjs.version}/cmaps/`,
  cMapPacked: true,
};

const CVPreview = ({ activeSections = [] }) => {
  const { watch } = useFormContext();
  const formData = watch();

  const [debouncedDataString] = useDebounce(JSON.stringify(formData), 1000);
  const debouncedData = useMemo(
    () => JSON.parse(debouncedDataString),
    [debouncedDataString]
  );

  const [pdfUrl, setPdfUrl] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [scale, setScale] = useState(1.0);
  const containerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(600);

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current)
        setContainerWidth(containerRef.current.offsetWidth - 40);
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  // 📝 PDF ENGINE
  useEffect(() => {
    let isMounted = true;
    const generatePdf = async () => {
      setIsGenerating(true);
      try {
        const blob = await pdf(
          <CVDocument data={debouncedData} activeSections={activeSections} />
        ).toBlob();
        if (isMounted) {
          const url = URL.createObjectURL(blob);
          setPdfUrl((prev) => {
            if (prev) URL.revokeObjectURL(prev);
            return url;
          });
        }
      } catch (error) {
        console.error("PDF Gen Error:", error);
      } finally {
        if (isMounted) setIsGenerating(false);
      }
    };
    if (debouncedData) generatePdf();
    return () => {
      isMounted = false;
    };
  }, [debouncedData, activeSections]);

  const handleDownload = () => {
    if (!pdfUrl) return;
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = `${debouncedData.personalInfo.fullName || "CV"}.pdf`;
    link.click();
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100 border-l border-gray-300">
      {/* TOOLBAR */}
      <div className="z-10 flex items-center justify-between p-3 bg-white border-b border-gray-200 shadow-sm">
        <div className="flex items-center gap-2">
          <h2 className="text-sm font-bold tracking-wide text-gray-700 uppercase">
            Preview
          </h2>
          {isGenerating ? (
            <span className="flex items-center gap-1 text-xs text-blue-600 font-medium bg-blue-50 px-2 py-0.5 rounded-full animate-pulse">
              <Loader2 size={10} className="animate-spin" /> Updating...
            </span>
          ) : (
            <span className="flex items-center gap-1 text-xs text-green-600 font-medium bg-green-50 px-2 py-0.5 rounded-full">
              <CheckCircle2 size={10} /> Ready
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setScale((s) => Math.max(0.5, s - 0.1))}
            className="p-1.5 hover:bg-gray-100 rounded text-gray-600"
          >
            <ZoomOut size={16} />
          </button>
          <span className="w-12 font-mono text-xs text-center">
            {(scale * 100).toFixed(0)}%
          </span>
          <button
            onClick={() => setScale((s) => Math.min(2.0, s + 0.1))}
            className="p-1.5 hover:bg-gray-100 rounded text-gray-600"
          >
            <ZoomIn size={16} />
          </button>
          <div className="w-px h-4 mx-1 bg-gray-300"></div>
          <button
            onClick={handleDownload}
            disabled={!pdfUrl}
            className="flex items-center gap-1.5 bg-gray-900 hover:bg-black text-white px-4 py-1.5 rounded text-sm font-bold transition disabled:opacity-50"
          >
            <Download size={14} /> Download PDF
          </button>
        </div>
      </div>

      {/* PDF VIEWER */}
      <div
        ref={containerRef}
        className="flex justify-center flex-1 p-8 overflow-y-auto bg-slate-200 scroll-smooth"
      >
        {pdfUrl ? (
          <Document
            file={pdfUrl}
            options={PDF_OPTIONS}
            onLoadSuccess={({ numPages }) => setNumPages(numPages)}
            loading={null}
            className="flex flex-col gap-6"
          >
            {Array.from(new Array(numPages), (_, index) => (
              <div key={`page_${index + 1}`} className="shadow-xl">
                <Page
                  pageNumber={index + 1}
                  width={containerWidth * scale}
                  renderTextLayer={true}
                  renderAnnotationLayer={false}
                  className="bg-white"
                />
                <div className="text-center mt-2 text-[10px] text-gray-400 font-bold tracking-widest uppercase">
                  Page {index + 1}
                </div>
              </div>
            ))}
          </Document>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-gray-400">
            <Loader2 className="mb-3 animate-spin" size={32} />
            <p className="text-sm font-medium">Initializing Engine...</p>
          </div>
        )}
      </div>
    </div>
  );
};
export default CVPreview;
```

**`src/components/pdf/CVDocument.jsx`**

```jsx
import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
  Link,
  Svg,
  Path,
} from "@react-pdf/renderer";

// --- 🛠️ ICONS (Core) ---
const IconMail = ({ style }) => (
  <Svg width={10} height={10} viewBox="0 0 24 24" style={style}>
    <Path
      d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"
      stroke="#374151"
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M4 4 h16 a2 2 0 0 1 2 2 v12 a2 2 0 0 1 -2 2 h-16 a2 2 0 0 1 -2 -2 v-12 a2 2 0 0 1 2 -2 z"
      stroke="#374151"
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
const IconPhone = ({ style }) => (
  <Svg width={10} height={10} viewBox="0 0 24 24" style={style}>
    <Path
      d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384"
      stroke="#374151"
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
const IconLinkedin = ({ style }) => (
  <Svg width={10} height={10} viewBox="0 0 24 24" style={style}>
    <Path
      d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"
      stroke="#2563eb"
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M2 9 h4 v12 h-4 z"
      stroke="#2563eb"
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M4 2 a2 2 0 1 1 0 4 a2 2 0 0 1 0 -4 z"
      stroke="#2563eb"
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
const IconGithub = ({ style }) => (
  <Svg width={10} height={10} viewBox="0 0 24 24" style={style}>
    <Path
      d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"
      stroke="#374151"
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M9 18c-4.51 2-5-2-7-2"
      stroke="#374151"
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
const IconMapPin = ({ style }) => (
  <Svg width={10} height={10} viewBox="0 0 24 24" style={style}>
    <Path
      d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"
      stroke="#374151"
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M12 7 a3 3 0 1 1 0 6 a3 3 0 0 1 0 -6 z"
      stroke="#374151"
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// --- 🛠️ ICONS (Sections) ---
const IconSummary = () => (
  <Svg
    width={12}
    height={12}
    viewBox="0 0 24 24"
    style={{ transform: "translateY(-2)" }}
  >
    <Path
      d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"
      stroke="#1f2937"
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M12 3 a4 4 0 1 1 0 8 a4 4 0 0 1 0 -8 z"
      stroke="#1f2937"
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
const IconExperience = () => (
  <Svg
    width={12}
    height={12}
    viewBox="0 0 24 24"
    style={{ transform: "translateY(-2)" }}
  >
    <Path
      d="M12 12h.01"
      stroke="#1f2937"
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M16 6V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"
      stroke="#1f2937"
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M22 13a18.15 18.15 0 0 1-20 0"
      stroke="#1f2937"
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M4 6 h16 a2 2 0 0 1 2 2 v10 a2 2 0 0 1 -2 2 h-16 a2 2 0 0 1 -2 -2 v-10 a2 2 0 0 1 2 -2 z"
      stroke="#1f2937"
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
const IconEducation = () => (
  <Svg
    width={12}
    height={12}
    viewBox="0 0 24 24"
    style={{ transform: "translateY(-2)" }}
  >
    <Path
      d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"
      stroke="#1f2937"
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M22 10v6"
      stroke="#1f2937"
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M6 12.5V16a6 3 0 0 0 12 0v-3.5"
      stroke="#1f2937"
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
const IconSkills = () => (
  <Svg
    width={12}
    height={12}
    viewBox="0 0 24 24"
    style={{ transform: "translateY(-2)" }}
  >
    <Path
      d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"
      stroke="#1f2937"
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M9 18h6"
      stroke="#1f2937"
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M10 22h4"
      stroke="#1f2937"
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
const IconCert = () => (
  <Svg
    width={12}
    height={12}
    viewBox="0 0 24 24"
    style={{ transform: "translateY(-2)" }}
  >
    <Path
      d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"
      stroke="#1f2937"
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="m9 12 2 2 4-4"
      stroke="#1f2937"
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
const IconUsers = () => (
  <Svg
    width={12}
    height={12}
    viewBox="0 0 24 24"
    style={{ transform: "translateY(-2)" }}
  >
    <Path
      d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"
      stroke="#1f2937"
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M16 3.128a4 4 0 0 1 0 7.744"
      stroke="#1f2937"
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M22 21v-2a4 4 0 0 0-3-3.87"
      stroke="#1f2937"
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M9 3 a4 4 0 1 1 0 8 a4 4 0 0 1 0 -8 z"
      stroke="#1f2937"
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// 🆕 NEW ICONS
const IconGlobe = () => (
  <Svg
    width={12}
    height={12}
    viewBox="0 0 24 24"
    style={{ transform: "translateY(-2)" }}
  >
    <Path
      d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2z"
      stroke="#1f2937"
      strokeWidth={2}
      fill="none"
    />
    <Path d="M2 12h20" stroke="#1f2937" strokeWidth={2} fill="none" />
    <Path
      d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"
      stroke="#1f2937"
      strokeWidth={2}
      fill="none"
    />
  </Svg>
);
const IconProject = () => (
  <Svg
    width={12}
    height={12}
    viewBox="0 0 24 24"
    style={{ transform: "translateY(-2)" }}
  >
    <Path
      d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 2H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z"
      stroke="#1f2937"
      strokeWidth={2}
      fill="none"
    />
    <Path d="m12 10 2 2-2 2" stroke="#1f2937" strokeWidth={2} fill="none" />
    <Path d="m17 10-2 2 2 2" stroke="#1f2937" strokeWidth={2} fill="none" />
  </Svg>
);
const IconTrophy = () => (
  <Svg
    width={12}
    height={12}
    viewBox="0 0 24 24"
    style={{ transform: "translateY(-2)" }}
  >
    <Path
      d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"
      stroke="#1f2937"
      strokeWidth={2}
      fill="none"
    />
    <Path
      d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"
      stroke="#1f2937"
      strokeWidth={2}
      fill="none"
    />
    <Path d="M4 22h16" stroke="#1f2937" strokeWidth={2} fill="none" />
    <Path
      d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"
      stroke="#1f2937"
      strokeWidth={2}
      fill="none"
    />
    <Path
      d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"
      stroke="#1f2937"
      strokeWidth={2}
      fill="none"
    />
    <Path
      d="M18 2H6v7a6 6 0 0 0 12 0V2Z"
      stroke="#1f2937"
      strokeWidth={2}
      fill="none"
    />
  </Svg>
);
const IconActivity = () => (
  <Svg
    width={12}
    height={12}
    viewBox="0 0 24 24"
    style={{ transform: "translateY(-2)" }}
  >
    <Path
      d="M3.5 21 14 3"
      stroke="#1f2937"
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M20.5 21 10 3"
      stroke="#1f2937"
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M15.5 21 12 15l-3.5 6"
      stroke="#1f2937"
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M2 21h20"
      stroke="#1f2937"
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
const IconUser = IconSummary;

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 10,
    lineHeight: 1.5,
    fontFamily: "Helvetica",
    color: "#374151",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#1f2937",
    paddingBottom: 15,
  },
  photo: { width: 100, height: 100, borderRadius: 50, objectFit: "cover" },
  headerRight: { marginLeft: 30, flex: 1 },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    textTransform: "uppercase",
    color: "#111827",
    marginBottom: 4,
    lineHeight: 1.2,
  },
  role: {
    fontSize: 11,
    color: "#4b5563",
    marginBottom: 6,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  contactRow: { flexDirection: "row", flexWrap: "wrap", gap: 12 },
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
    fontSize: 9,
    color: "#374151",
    lineHeight: 1.2,
  },
  link: { color: "#2563eb", textDecoration: "none" },
  section: { marginBottom: 10 },
  sectionTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
    paddingBottom: 4,
    marginBottom: 8,
    marginTop: 5,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: "bold",
    textTransform: "uppercase",
    color: "#1f2937",
    marginLeft: 6,
  },
  jobBlock: { marginBottom: 10 },
  jobHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  jobRole: {
    fontWeight: "bold",
    fontSize: 10,
    color: "#000000",
    maxWidth: "70%",
  },
  jobDate: { fontSize: 9, color: "#6b7280", textAlign: "right" },
  company: {
    color: "#2563eb",
    fontWeight: "bold",
    fontSize: 9,
    marginTop: 1,
    marginBottom: 3,
  },
  description: { fontSize: 9, textAlign: "justify", color: "#4b5563" },
  skillBadge: {
    backgroundColor: "#f3f4f6",
    borderRadius: 12,
    paddingVertical: 5,
    paddingHorizontal: 14,
    marginRight: 6,
    marginBottom: 6,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  skillText: {
    fontSize: 9,
    fontWeight: "bold",
    color: "#374151",
    lineHeight: 1,
  },
  skillsContainer: { flexDirection: "row", flexWrap: "wrap" },
  refGrid: { flexDirection: "row", flexWrap: "wrap", gap: 15 },
  refItem: { width: "45%", marginBottom: 10 },
  infoRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
    paddingVertical: 4,
    alignItems: "center",
    lineHeight: 1.2,
  },
  infoLabel: {
    width: "30%",
    fontSize: 8,
    color: "#6b7280",
    textTransform: "uppercase",
    fontWeight: "bold",
  },
  infoValue: { width: "70%", fontSize: 9, color: "#111827" },
  refIcon: { transform: "translateY(-1.5)" },
});

// --- RENDER HELPERS ---
const ExperienceSection = ({ data }) => (
  <View style={styles.section}>
    <View style={styles.sectionTitleRow}>
      <IconExperience />
      <Text style={styles.sectionTitle}>Experience</Text>
    </View>
    {data.map((job, index) => (
      <View key={index} style={styles.jobBlock} wrap={false}>
        <View style={styles.jobHeader}>
          <Text style={styles.jobRole}>{job.role}</Text>
          <Text style={styles.jobDate}>
            {job.startDate} — {job.endDate}
          </Text>
        </View>
        <Text style={styles.company}>{job.company}</Text>
        <Text style={styles.description}>{job.description}</Text>
      </View>
    ))}
  </View>
);

const EducationSection = ({ data }) => (
  <View style={styles.section}>
    <View style={styles.sectionTitleRow}>
      <IconEducation />
      <Text style={styles.sectionTitle}>Education</Text>
    </View>
    {data.map((edu, index) => (
      <View key={index} style={styles.jobBlock} wrap={false}>
        <View style={styles.jobHeader}>
          <Text style={styles.jobRole}>{edu.school}</Text>
          <Text style={styles.jobDate}>{edu.date}</Text>
        </View>

        {/* Upgrade Degree to "Company Style" (Blue) for better hierarchy */}
        <Text style={styles.company}>{edu.degree}</Text>

        {/* Render the new Description */}
        {edu.description && (
          <Text style={styles.description}>{edu.description}</Text>
        )}
      </View>
    ))}
  </View>
);

const SkillsSection = ({ data }) => (
  <View wrap={false} style={styles.section}>
    <View style={styles.sectionTitleRow}>
      <IconSkills />
      <Text style={styles.sectionTitle}>Skills</Text>
    </View>
    <View style={styles.skillsContainer}>
      {data.map((skill, index) => (
        <Text key={index} style={styles.skillBadge}>
          {skill.name}
        </Text>
      ))}
    </View>
  </View>
);

const CertificatesSection = ({ data }) => (
  <View style={styles.section}>
    <View style={styles.sectionTitleRow}>
      <IconCert />
      <Text style={styles.sectionTitle}>Certificates</Text>
    </View>
    {data.map((cert, index) => (
      <View key={index} style={styles.jobBlock} wrap={false}>
        <View style={styles.jobHeader}>
          <Text style={styles.jobRole}>{cert.name}</Text>
          <Text style={styles.jobDate}>{cert.date}</Text>
        </View>
        <Text style={styles.description}>{cert.issuer}</Text>
      </View>
    ))}
  </View>
);

const ReferencesSection = ({ data }) => (
  <View style={styles.section} wrap={false}>
    <View style={styles.sectionTitleRow}>
      <IconUsers />
      <Text style={styles.sectionTitle}>References</Text>
    </View>
    <View style={styles.refGrid}>
      {data.map((ref, index) => (
        <View key={index} style={styles.refItem}>
          <Text style={{ fontWeight: "bold", fontSize: 10, color: "#000" }}>
            {ref.name}
          </Text>
          <Text style={{ fontSize: 9, fontWeight: "medium", color: "#1f2937" }}>
            {ref.position}
          </Text>
          <Text style={{ fontSize: 9, color: "#374151" }}>{ref.company}</Text>
          {ref.location && (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 1,
              }}
            >
              <IconMapPin style={styles.refIcon} />
              <Text style={{ fontSize: 9, color: "#374151", marginLeft: 4 }}>
                {ref.location}
              </Text>
            </View>
          )}
          {ref.phone && (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 2,
              }}
            >
              <IconPhone style={styles.refIcon} />
              <Text style={{ fontSize: 9, color: "#374151", marginLeft: 4 }}>
                {ref.phone}
              </Text>
            </View>
          )}
          {ref.email && (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 1,
              }}
            >
              <IconMail style={styles.refIcon} />
              <Text style={{ fontSize: 9, color: "#374151", marginLeft: 4 }}>
                {ref.email}
              </Text>
            </View>
          )}
        </View>
      ))}
    </View>
  </View>
);

// 🆕 NEW SECTIONS RENDERING LOGIC
const LanguagesSection = ({ data }) => (
  <View style={styles.section} wrap={false}>
    <View style={styles.sectionTitleRow}>
      <IconGlobe />
      <Text style={styles.sectionTitle}>Languages</Text>
    </View>
    <View style={styles.skillsContainer}>
      {data.map((lang, index) => (
        <Text key={index} style={styles.skillBadge}>
          {lang.language} {lang.proficiency ? `(${lang.proficiency})` : ""}
        </Text>
      ))}
    </View>
  </View>
);

const ProjectsSection = ({ data }) => (
  <View style={styles.section}>
    <View style={styles.sectionTitleRow}>
      <IconProject />
      <Text style={styles.sectionTitle}>Projects</Text>
    </View>
    {data.map((item, index) => (
      <View key={index} style={styles.jobBlock} wrap={false}>
        <View style={styles.jobHeader}>
          <Text style={styles.jobRole}>{item.title}</Text>
          {item.technologies && (
            <Text style={styles.jobDate}>{item.technologies}</Text>
          )}
        </View>
        {item.link && (
          <Text style={{ ...styles.company, color: "#2563eb" }}>
            {item.link}
          </Text>
        )}
        <Text style={styles.description}>{item.description}</Text>
      </View>
    ))}
  </View>
);

const AchievementsSection = ({ data }) => (
  <View style={styles.section}>
    <View style={styles.sectionTitleRow}>
      <IconTrophy />
      <Text style={styles.sectionTitle}>Achievements</Text>
    </View>
    {data.map((item, index) => (
      <View key={index} style={styles.jobBlock} wrap={false}>
        <View style={styles.jobHeader}>
          <Text style={styles.jobRole}>{item.title}</Text>
          <Text style={styles.jobDate}>{item.date}</Text>
        </View>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    ))}
  </View>
);

const ExtracurricularSection = ({ data }) => (
  <View style={styles.section}>
    <View style={styles.sectionTitleRow}>
      <IconActivity />
      <Text style={styles.sectionTitle}>Extracurricular</Text>
    </View>
    {data.map((item, index) => (
      <View key={index} style={styles.jobBlock} wrap={false}>
        <View style={styles.jobHeader}>
          <Text style={styles.jobRole}>{item.role}</Text>
          <Text style={styles.jobDate}>{item.date}</Text>
        </View>
        <Text style={styles.company}>{item.organization}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    ))}
  </View>
);

// --- MAIN DOCUMENT ---
const CVDocument = ({ data, activeSections = [] }) => {
  const hasBioData =
    data.personalInfo.address ||
    data.personalInfo.dob ||
    data.personalInfo.gender ||
    data.personalInfo.nationality ||
    data.personalInfo.maritalStatus ||
    data.personalInfo.idNumber;

  const RENDER_MAP = {
    experience: (d) => <ExperienceSection data={d.experience} />,
    education: (d) => <EducationSection data={d.education} />,
    skills: (d) => <SkillsSection data={d.skills} />,
    certificates: (d) => <CertificatesSection data={d.certificates} />,
    references: (d) => <ReferencesSection data={d.references} />,
    // 🆕 MAP NEW SECTIONS
    languages: (d) => <LanguagesSection data={d.languages} />,
    projects: (d) => <ProjectsSection data={d.projects} />,
    achievements: (d) => <AchievementsSection data={d.achievements} />,
    extracurricular: (d) => <ExtracurricularSection data={d.extracurricular} />,
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* HEADER */}
        <View wrap={false}>
          <View style={styles.header}>
            {data.personalInfo.photo && (
              <Image src={data.personalInfo.photo} style={styles.photo} />
            )}
            <View style={styles.headerRight}>
              <Text style={styles.name}>
                {data.personalInfo.fullName || "Your Name"}
              </Text>
              <Text style={styles.role}>
                {data.personalInfo.role || "Job Title"}
              </Text>
              <View style={styles.contactRow}>
                {data.personalInfo.email && (
                  <View style={styles.contactItem}>
                    <IconMail style={{ transform: "translateY(-0.5)" }} />
                    <Text style={{ marginLeft: 4 }}>
                      {data.personalInfo.email}
                    </Text>
                  </View>
                )}
                {data.personalInfo.phone && (
                  <View style={styles.contactItem}>
                    <IconPhone style={{ transform: "translateY(-0.5)" }} />
                    <Text style={{ marginLeft: 4 }}>
                      {data.personalInfo.phone}
                    </Text>
                  </View>
                )}
                {data.personalInfo.linkedin && (
                  <View style={styles.contactItem}>
                    <IconLinkedin style={{ transform: "translateY(-0.5)" }} />
                    <Link
                      src={data.personalInfo.linkedin}
                      style={{ marginLeft: 4, ...styles.link }}
                    >
                      LinkedIn
                    </Link>
                  </View>
                )}
                {data.personalInfo.github && (
                  <View style={styles.contactItem}>
                    <IconGithub style={{ transform: "translateY(-0.5)" }} />
                    <Link
                      src={data.personalInfo.github}
                      style={{ marginLeft: 4, ...styles.link }}
                    >
                      GitHub
                    </Link>
                  </View>
                )}
              </View>
            </View>
          </View>
        </View>

        {/* SUMMARY */}
        {data.personalInfo.summary && (
          <View wrap={false} style={styles.section}>
            <View style={styles.sectionTitleRow}>
              <IconSummary />
              <Text style={styles.sectionTitle}>Professional Summary</Text>
            </View>
            <Text style={styles.description}>{data.personalInfo.summary}</Text>
          </View>
        )}

        {/* 🔀 DYNAMIC SECTIONS */}
        {activeSections.map((section) => {
          const renderFunc = RENDER_MAP[section.id];
          if (renderFunc && data[section.id] && data[section.id].length > 0) {
            return <View key={section.id}>{renderFunc(data)}</View>;
          }
          return null;
        })}

        {/* PERSONAL INFO */}
        {hasBioData && (
          <View wrap={false} style={styles.section}>
            <View style={styles.sectionTitleRow}>
              <IconUser />
              <Text style={styles.sectionTitle}>Personal Information</Text>
            </View>
            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
              <View style={{ width: "50%", paddingRight: 10 }}>
                {data.personalInfo.address && (
                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Address</Text>
                    <Text style={styles.infoValue}>
                      {data.personalInfo.address}
                    </Text>
                  </View>
                )}
                {data.personalInfo.dob && (
                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>DOB</Text>
                    <Text style={styles.infoValue}>
                      {data.personalInfo.dob}
                    </Text>
                  </View>
                )}
                {data.personalInfo.gender && (
                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Gender</Text>
                    <Text style={styles.infoValue}>
                      {data.personalInfo.gender}
                    </Text>
                  </View>
                )}
              </View>
              <View style={{ width: "50%", paddingLeft: 10 }}>
                {data.personalInfo.nationality && (
                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Nationality</Text>
                    <Text style={styles.infoValue}>
                      {data.personalInfo.nationality}
                    </Text>
                  </View>
                )}
                {data.personalInfo.idNumber && (
                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>NIC/ID</Text>
                    <Text style={styles.infoValue}>
                      {data.personalInfo.idNumber}
                    </Text>
                  </View>
                )}
              </View>
            </View>
          </View>
        )}
      </Page>
    </Document>
  );
};
export default CVDocument;
```

**Newly created**
**`src/components/ui/SortableSection.jsx`**

```jsx
import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Trash2, ChevronDown } from "lucide-react";

const SortableSection = ({
  id,
  title,
  icon: Icon,
  children,
  onRemove,
  isOpen,
  onToggle,
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : "auto",
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`bg-white border rounded-xl shadow-sm transition-all duration-200 mb-4 overflow-hidden ${
        isOpen
          ? "border-blue-500 ring-1 ring-blue-500 shadow-md"
          : "border-gray-200 hover:border-gray-300"
      }`}
    >
      {/* HEADER (Click to Toggle) */}
      <div
        className="flex items-center justify-between p-4 bg-white cursor-pointer select-none group"
        onClick={onToggle}
      >
        <div className="flex items-center gap-3">
          {/* 1. DRAG HANDLE (Fixed) */}
          <button
            type="button" // 👈 CRITICAL FIX
            {...attributes}
            {...listeners}
            className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded cursor-grab active:cursor-grabbing touch-none"
            onClick={(e) => e.stopPropagation()}
          >
            <GripVertical size={18} />
          </button>

          {/* Icon & Title */}
          <div className="flex items-center gap-2">
            {Icon && (
              <Icon
                size={18}
                className={isOpen ? "text-blue-600" : "text-gray-500"}
              />
            )}
            <span
              className={`font-bold text-sm uppercase tracking-wide ${
                isOpen ? "text-gray-900" : "text-gray-600"
              }`}
            >
              {title}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          {/* 2. CHEVRON (Fixed) */}
          <button
            type="button" // 👈 CRITICAL FIX
            className={`p-1 rounded-full transition-transform duration-200 ${
              isOpen ? "rotate-180 bg-gray-100 text-gray-900" : "text-gray-400"
            }`}
          >
            <ChevronDown size={18} />
          </button>

          {/* 3. REMOVE BUTTON (Fixed) */}
          <button
            type="button" // 👈 CRITICAL FIX
            onClick={(e) => {
              e.stopPropagation();
              onRemove();
            }}
            className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
            title="Remove Section"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      {/* BODY (Accordion Content) */}
      {isOpen && (
        <div
          className="p-4 duration-200 border-t border-gray-100 cursor-default animate-in slide-in-from-top-2 fade-in"
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      )}
    </div>
  );
};

export default SortableSection;
```

**`src/components/Archivements.jsx`**

```jsx
import React from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { Trophy, Trash2 } from "lucide-react";
import FormSection from "./ui/FormSection.jsx";
import FormInput from "./ui/FormInput.jsx";
import FormTextArea from "./ui/FormTextArea.jsx";

const Achievements = () => {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "achievements",
  });

  return (
    <FormSection
      title="Achievements & Awards"
      icon={Trophy}
      onAdd={() => append({ title: "", date: "", description: "" })}
      addButtonLabel="Add Achievement"
    >
      {fields.map((item, index) => (
        <div
          key={item.id}
          className="relative p-4 border border-gray-200 rounded-lg bg-gray-50 group"
        >
          <button
            type="button"
            onClick={() => remove(index)}
            className="absolute text-gray-400 transition-colors top-4 right-4 hover:text-red-500"
          >
            <Trash2 size={16} />
          </button>

          <div className="grid grid-cols-1 gap-4 mb-4 md:grid-cols-3">
            <div className="md:col-span-2">
              <FormInput
                name={`achievements.${index}.title`}
                label="Achievement Title"
                placeholder="e.g. Best Developer Award"
              />
            </div>
            <FormInput
              name={`achievements.${index}.date`}
              label="Date"
              placeholder="e.g. 2024"
            />
          </div>

          <FormTextArea
            name={`achievements.${index}.description`}
            label="Description (Optional)"
            placeholder="Brief details about the award..."
            rows={2}
          />
        </div>
      ))}
    </FormSection>
  );
};

export default Achievements;
```

**`src/components/Extracurricular.jsx`**

```jsx
import React from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { Tent, Trash2 } from "lucide-react";
import FormSection from "./ui/FormSection.jsx";
import FormInput from "./ui/FormInput.jsx";
import FormTextArea from "./ui/FormTextArea.jsx";

const Extracurricular = () => {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "extracurricular",
  });

  return (
    <FormSection
      title="Extracurricular Activities"
      icon={Tent}
      onAdd={() =>
        append({ role: "", organization: "", date: "", description: "" })
      }
      addButtonLabel="Add Activity"
    >
      {fields.map((item, index) => (
        <div
          key={item.id}
          className="relative p-4 border border-gray-200 rounded-lg bg-gray-50 group"
        >
          <button
            type="button"
            onClick={() => remove(index)}
            className="absolute text-gray-400 transition-colors top-4 right-4 hover:text-red-500"
          >
            <Trash2 size={16} />
          </button>

          <div className="grid grid-cols-1 gap-4 mb-4 md:grid-cols-2">
            <FormInput
              name={`extracurricular.${index}.role`}
              label="Role"
              placeholder="e.g. Volunteer"
            />
            <FormInput
              name={`extracurricular.${index}.organization`}
              label="Organization"
              placeholder="e.g. Red Cross"
            />
            <div className="md:col-span-2">
              <FormInput
                name={`extracurricular.${index}.date`}
                label="Date / Duration"
                placeholder="e.g. 2023 - Present"
              />
            </div>
          </div>

          <FormTextArea
            name={`extracurricular.${index}.description`}
            label="Description"
            placeholder="What did you do?"
            rows={3}
          />
        </div>
      ))}
    </FormSection>
  );
};

export default Extracurricular;
```

**`src/components/Projects.jsx`**

```jsx
import React from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { FolderGit2, Trash2 } from "lucide-react";
import FormSection from "./ui/FormSection.jsx";
import FormInput from "./ui/FormInput.jsx";
import FormTextArea from "./ui/FormTextArea.jsx";

const Projects = () => {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "projects",
  });

  return (
    <FormSection
      title="Projects"
      icon={FolderGit2}
      onAdd={() =>
        append({ title: "", link: "", technologies: "", description: "" })
      }
      addButtonLabel="Add Project"
    >
      {fields.map((item, index) => (
        <div
          key={item.id}
          className="relative p-4 border border-gray-200 rounded-lg bg-gray-50 group"
        >
          <button
            type="button"
            onClick={() => remove(index)}
            className="absolute text-gray-400 transition-colors top-4 right-4 hover:text-red-500"
          >
            <Trash2 size={16} />
          </button>

          <div className="grid grid-cols-1 gap-4 mb-4 md:grid-cols-2">
            <FormInput
              name={`projects.${index}.title`}
              label="Project Title"
              placeholder="e.g. E-Commerce App"
            />
            <FormInput
              name={`projects.${index}.link`}
              label="Project Link"
              placeholder="github.com/my-project"
            />
            <div className="md:col-span-2">
              <FormInput
                name={`projects.${index}.technologies`}
                label="Technologies Used"
                placeholder="e.g. React, Node.js, MongoDB"
              />
            </div>
          </div>

          <FormTextArea
            name={`projects.${index}.description`}
            label="Description"
            placeholder="Describe what you built..."
            rows={3}
          />
        </div>
      ))}
    </FormSection>
  );
};

export default Projects;
```

**`src/components/Languages.jsx`**

```jsx
import React from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { Globe, Trash2 } from "lucide-react";
import FormSection from "./ui/FormSection";
import FormInput from "./ui/FormInput.jsx";
import FormSelect from "./ui/FormSelect.jsx";

const Languages = () => {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "languages",
  });

  return (
    <FormSection
      title="Languages"
      icon={Globe}
      onAdd={() => append({ language: "", proficiency: "" })}
      addButtonLabel="Add Language"
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {fields.map((item, index) => (
          <div
            key={item.id}
            className="relative p-4 border border-gray-200 rounded-lg bg-gray-50 group"
          >
            <button
              type="button"
              onClick={() => remove(index)}
              className="absolute text-gray-400 transition-colors top-2 right-2 hover:text-red-500"
            >
              <Trash2 size={14} />
            </button>
            <div className="space-y-3">
              <FormInput
                name={`languages.${index}.language`}
                label="Language"
                placeholder="e.g. English"
              />
              <FormSelect
                name={`languages.${index}.proficiency`}
                label="Proficiency"
                placeholder="Select Level"
                options={[
                  "Native",
                  "Fluent",
                  "Professional",
                  "Intermediate",
                  "Basic",
                ]}
              />
            </div>
          </div>
        ))}
      </div>
    </FormSection>
  );
};

export default Languages;
```

**`src/pages/LandingPage.jsx`**

```jsx
import React from "react";
import { Link } from "react-router-dom";
import { FileText, CheckCircle, Zap } from "lucide-react";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-4 border-b border-gray-100">
        <div className="flex items-center gap-2 text-2xl font-bold text-blue-600">
          <FileText /> CVGenius
        </div>
        <div className="space-x-6 text-sm font-medium text-gray-600">
          <a href="#" className="hover:text-blue-600">
            Features
          </a>
          <a href="#" className="hover:text-blue-600">
            Pricing
          </a>
          <Link
            to="/app"
            className="px-4 py-2 text-white bg-blue-600 rounded-full hover:bg-blue-700"
          >
            Open App
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center px-6 py-20 text-center">
        <h1 className="mb-6 text-5xl font-extrabold tracking-tight text-gray-900">
          Build a Professional CV <br />
          <span className="text-blue-600">in Minutes, Not Hours.</span>
        </h1>
        <p className="max-w-2xl mx-auto mb-10 text-lg text-gray-500">
          Our AI-powered engine formats your resume perfectly. No design skills
          needed. Just fill in the blanks and export to PDF.
        </p>

        <div className="flex gap-4">
          <Link
            to="/app"
            className="px-8 py-4 text-lg font-bold text-white transition-all bg-blue-600 rounded-lg shadow-lg hover:bg-blue-700 hover:shadow-xl"
          >
            Start Building for Free
          </Link>
          <button className="px-8 py-4 text-lg font-bold text-gray-700 transition-all bg-gray-100 rounded-lg hover:bg-gray-200">
            View Templates
          </button>
        </div>

        {/* Trust Signals */}
        <div className="grid grid-cols-1 gap-8 mt-16 text-left md:grid-cols-3">
          <div className="flex flex-col items-center p-4">
            <Zap className="mb-2 text-yellow-500" size={32} />
            <h3 className="font-bold">Lightning Fast</h3>
            <p className="text-sm text-center text-gray-500">
              Real-time preview updates as you type.
            </p>
          </div>
          <div className="flex flex-col items-center p-4">
            <CheckCircle className="mb-2 text-green-500" size={32} />
            <h3 className="font-bold">ATS Friendly</h3>
            <p className="text-sm text-center text-gray-500">
              Optimized layouts for hiring algorithms.
            </p>
          </div>
          <div className="flex flex-col items-center p-4">
            <FileText className="mb-2 text-purple-500" size={32} />
            <h3 className="font-bold">PDF Export</h3>
            <p className="text-sm text-center text-gray-500">
              High-quality vector exports.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
```

## 2026-01-11 at 04.16AM

**updated Sturcture: saparated Header info, Proffetional summary, Bio section(personal details) to separate components to enhance flexibility**

_updated components:_

- `src/components/CVDocument.jsx`

```jsx
import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
  Link,
  Svg,
  Path,
} from "@react-pdf/renderer";

// --- 🛠️ ICONS (Core) ---
const IconMail = ({ style }) => (
  <Svg width={10} height={10} viewBox="0 0 24 24" style={style}>
    <Path
      d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"
      stroke="#374151"
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M4 4 h16 a2 2 0 0 1 2 2 v12 a2 2 0 0 1 -2 2 h-16 a2 2 0 0 1 -2 -2 v-12 a2 2 0 0 1 2 -2 z"
      stroke="#374151"
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
const IconPhone = ({ style }) => (
  <Svg width={10} height={10} viewBox="0 0 24 24" style={style}>
    <Path
      d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384"
      stroke="#374151"
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
const IconLinkedin = ({ style }) => (
  <Svg width={10} height={10} viewBox="0 0 24 24" style={style}>
    <Path
      d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"
      stroke="#2563eb"
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M2 9 h4 v12 h-4 z"
      stroke="#2563eb"
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M4 2 a2 2 0 1 1 0 4 a2 2 0 0 1 0 -4 z"
      stroke="#2563eb"
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
const IconGithub = ({ style }) => (
  <Svg width={10} height={10} viewBox="0 0 24 24" style={style}>
    <Path
      d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"
      stroke="#374151"
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M9 18c-4.51 2-5-2-7-2"
      stroke="#374151"
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
const IconMapPin = ({ style }) => (
  <Svg width={10} height={10} viewBox="0 0 24 24" style={style}>
    <Path
      d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"
      stroke="#374151"
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M12 7 a3 3 0 1 1 0 6 a3 3 0 0 1 0 -6 z"
      stroke="#374151"
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// --- 🛠️ ICONS (Sections) ---
const IconSummary = () => (
  <Svg
    width={12}
    height={12}
    viewBox="0 0 24 24"
    style={{ transform: "translateY(-2)" }}
  >
    <Path
      d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"
      stroke="#1f2937"
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M12 3 a4 4 0 1 1 0 8 a4 4 0 0 1 0 -8 z"
      stroke="#1f2937"
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
const IconExperience = () => (
  <Svg
    width={12}
    height={12}
    viewBox="0 0 24 24"
    style={{ transform: "translateY(-2)" }}
  >
    <Path
      d="M12 12h.01"
      stroke="#1f2937"
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M16 6V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"
      stroke="#1f2937"
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M22 13a18.15 18.15 0 0 1-20 0"
      stroke="#1f2937"
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M4 6 h16 a2 2 0 0 1 2 2 v10 a2 2 0 0 1 -2 2 h-16 a2 2 0 0 1 -2 -2 v-10 a2 2 0 0 1 2 -2 z"
      stroke="#1f2937"
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
const IconEducation = () => (
  <Svg
    width={12}
    height={12}
    viewBox="0 0 24 24"
    style={{ transform: "translateY(-2)" }}
  >
    <Path
      d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"
      stroke="#1f2937"
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M22 10v6"
      stroke="#1f2937"
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M6 12.5V16a6 3 0 0 0 12 0v-3.5"
      stroke="#1f2937"
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
const IconSkills = () => (
  <Svg
    width={12}
    height={12}
    viewBox="0 0 24 24"
    style={{ transform: "translateY(-2)" }}
  >
    <Path
      d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"
      stroke="#1f2937"
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M9 18h6"
      stroke="#1f2937"
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M10 22h4"
      stroke="#1f2937"
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
const IconCert = () => (
  <Svg
    width={12}
    height={12}
    viewBox="0 0 24 24"
    style={{ transform: "translateY(-2)" }}
  >
    <Path
      d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"
      stroke="#1f2937"
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="m9 12 2 2 4-4"
      stroke="#1f2937"
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
const IconUsers = () => (
  <Svg
    width={12}
    height={12}
    viewBox="0 0 24 24"
    style={{ transform: "translateY(-2)" }}
  >
    <Path
      d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"
      stroke="#1f2937"
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M16 3.128a4 4 0 0 1 0 7.744"
      stroke="#1f2937"
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M22 21v-2a4 4 0 0 0-3-3.87"
      stroke="#1f2937"
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M9 3 a4 4 0 1 1 0 8 a4 4 0 0 1 0 -8 z"
      stroke="#1f2937"
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// 🆕 NEW ICONS
const IconGlobe = () => (
  <Svg
    width={12}
    height={12}
    viewBox="0 0 24 24"
    style={{ transform: "translateY(-2)" }}
  >
    <Path
      d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2z"
      stroke="#1f2937"
      strokeWidth={2}
      fill="none"
    />
    <Path d="M2 12h20" stroke="#1f2937" strokeWidth={2} fill="none" />
    <Path
      d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"
      stroke="#1f2937"
      strokeWidth={2}
      fill="none"
    />
  </Svg>
);
const IconProject = () => (
  <Svg
    width={12}
    height={12}
    viewBox="0 0 24 24"
    style={{ transform: "translateY(-2)" }}
  >
    <Path
      d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 2H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z"
      stroke="#1f2937"
      strokeWidth={2}
      fill="none"
    />
    <Path d="m12 10 2 2-2 2" stroke="#1f2937" strokeWidth={2} fill="none" />
    <Path d="m17 10-2 2 2 2" stroke="#1f2937" strokeWidth={2} fill="none" />
  </Svg>
);
const IconTrophy = () => (
  <Svg
    width={12}
    height={12}
    viewBox="0 0 24 24"
    style={{ transform: "translateY(-2)" }}
  >
    <Path
      d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"
      stroke="#1f2937"
      strokeWidth={2}
      fill="none"
    />
    <Path
      d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"
      stroke="#1f2937"
      strokeWidth={2}
      fill="none"
    />
    <Path d="M4 22h16" stroke="#1f2937" strokeWidth={2} fill="none" />
    <Path
      d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"
      stroke="#1f2937"
      strokeWidth={2}
      fill="none"
    />
    <Path
      d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"
      stroke="#1f2937"
      strokeWidth={2}
      fill="none"
    />
    <Path
      d="M18 2H6v7a6 6 0 0 0 12 0V2Z"
      stroke="#1f2937"
      strokeWidth={2}
      fill="none"
    />
  </Svg>
);
const IconActivity = () => (
  <Svg
    width={12}
    height={12}
    viewBox="0 0 24 24"
    style={{ transform: "translateY(-2)" }}
  >
    <Path
      d="M3.5 21 14 3"
      stroke="#1f2937"
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M20.5 21 10 3"
      stroke="#1f2937"
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M15.5 21 12 15l-3.5 6"
      stroke="#1f2937"
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M2 21h20"
      stroke="#1f2937"
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// 🆕 BIO ICON (Proper User Icon)
const IconUser = () => (
  <Svg
    width={12}
    height={12}
    viewBox="0 0 24 24"
    style={{ transform: "translateY(-2)" }}
  >
    <Path
      d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"
      stroke="#1f2937"
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M12 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"
      stroke="#1f2937"
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 10,
    lineHeight: 1.5,
    fontFamily: "Helvetica",
    color: "#374151",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#1f2937",
    paddingBottom: 15,
  },
  photo: { width: 100, height: 100, borderRadius: 50, objectFit: "cover" },
  headerRight: { marginLeft: 30, flex: 1 },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    textTransform: "uppercase",
    color: "#111827",
    marginBottom: 4,
    lineHeight: 1.2,
  },
  role: {
    fontSize: 11,
    color: "#4b5563",
    marginBottom: 6,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  contactRow: { flexDirection: "row", flexWrap: "wrap", gap: 12 },
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
    fontSize: 9,
    color: "#374151",
    lineHeight: 1.2,
  },
  link: { color: "#2563eb", textDecoration: "none" },
  section: { marginBottom: 10 },
  sectionTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
    paddingBottom: 4,
    marginBottom: 8,
    marginTop: 5,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: "bold",
    textTransform: "uppercase",
    color: "#1f2937",
    marginLeft: 6,
  },
  jobBlock: { marginBottom: 10 },
  jobHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  jobRole: {
    fontWeight: "bold",
    fontSize: 10,
    color: "#000000",
    maxWidth: "70%",
  },
  jobDate: { fontSize: 9, color: "#6b7280", textAlign: "right" },
  company: {
    color: "#2563eb",
    fontWeight: "bold",
    fontSize: 9,
    marginTop: 1,
    marginBottom: 3,
  },
  description: { fontSize: 9, textAlign: "justify", color: "#4b5563" },
  skillBadge: {
    backgroundColor: "#f3f4f6",
    borderRadius: 12,
    paddingVertical: 5,
    paddingHorizontal: 14,
    marginRight: 6,
    marginBottom: 6,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  skillText: {
    fontSize: 9,
    fontWeight: "bold",
    color: "#374151",
    lineHeight: 1,
  },
  skillsContainer: { flexDirection: "row", flexWrap: "wrap" },
  refGrid: { flexDirection: "row", flexWrap: "wrap", gap: 15 },
  refItem: { width: "45%", marginBottom: 10 },
  infoRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
    paddingVertical: 4,
    alignItems: "center",
    lineHeight: 1.2,
  },
  infoLabel: {
    width: "30%",
    fontSize: 8,
    color: "#6b7280",
    textTransform: "uppercase",
    fontWeight: "bold",
  },
  infoValue: { width: "70%", fontSize: 9, color: "#111827" },
  refIcon: { transform: "translateY(-1.5)" },
});

// --- RENDER HELPERS ---
const ExperienceSection = ({ data }) => (
  <View style={styles.section}>
    <View style={styles.sectionTitleRow}>
      <IconExperience />
      <Text style={styles.sectionTitle}>Experience</Text>
    </View>
    {data.map((job, index) => (
      <View key={index} style={styles.jobBlock} wrap={false}>
        <View style={styles.jobHeader}>
          <Text style={styles.jobRole}>{job.role}</Text>
          <Text style={styles.jobDate}>
            {job.startDate} — {job.endDate}
          </Text>
        </View>
        <Text style={styles.company}>{job.company}</Text>
        <Text style={styles.description}>{job.description}</Text>
      </View>
    ))}
  </View>
);

const EducationSection = ({ data }) => (
  <View style={styles.section}>
    <View style={styles.sectionTitleRow}>
      <IconEducation />
      <Text style={styles.sectionTitle}>Education</Text>
    </View>
    {data.map((edu, index) => (
      <View key={index} style={styles.jobBlock} wrap={false}>
        <View style={styles.jobHeader}>
          <Text style={styles.jobRole}>{edu.school}</Text>
          <Text style={styles.jobDate}>{edu.date}</Text>
        </View>
        <Text style={styles.company}>{edu.degree}</Text>
        {edu.description && (
          <Text style={styles.description}>{edu.description}</Text>
        )}
      </View>
    ))}
  </View>
);

const SkillsSection = ({ data }) => (
  <View wrap={false} style={styles.section}>
    <View style={styles.sectionTitleRow}>
      <IconSkills />
      <Text style={styles.sectionTitle}>Skills</Text>
    </View>
    <View style={styles.skillsContainer}>
      {data.map((skill, index) => (
        <Text key={index} style={styles.skillBadge}>
          {skill.name}
        </Text>
      ))}
    </View>
  </View>
);

const CertificatesSection = ({ data }) => (
  <View style={styles.section}>
    <View style={styles.sectionTitleRow}>
      <IconCert />
      <Text style={styles.sectionTitle}>Certificates</Text>
    </View>
    {data.map((cert, index) => (
      <View key={index} style={styles.jobBlock} wrap={false}>
        <View style={styles.jobHeader}>
          <Text style={styles.jobRole}>{cert.name}</Text>
          <Text style={styles.jobDate}>{cert.date}</Text>
        </View>
        <Text style={styles.description}>{cert.issuer}</Text>
      </View>
    ))}
  </View>
);

const ReferencesSection = ({ data }) => (
  <View style={styles.section} wrap={false}>
    <View style={styles.sectionTitleRow}>
      <IconUsers />
      <Text style={styles.sectionTitle}>References</Text>
    </View>
    <View style={styles.refGrid}>
      {data.map((ref, index) => (
        <View key={index} style={styles.refItem}>
          <Text style={{ fontWeight: "bold", fontSize: 10, color: "#000" }}>
            {ref.name}
          </Text>
          <Text style={{ fontSize: 9, fontWeight: "medium", color: "#1f2937" }}>
            {ref.position}
          </Text>
          <Text style={{ fontSize: 9, color: "#374151" }}>{ref.company}</Text>
          {ref.location && (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 1,
              }}
            >
              <IconMapPin style={styles.refIcon} />
              <Text style={{ fontSize: 9, color: "#374151", marginLeft: 4 }}>
                {ref.location}
              </Text>
            </View>
          )}
          {ref.phone && (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 2,
              }}
            >
              <IconPhone style={styles.refIcon} />
              <Text style={{ fontSize: 9, color: "#374151", marginLeft: 4 }}>
                {ref.phone}
              </Text>
            </View>
          )}
          {ref.email && (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 1,
              }}
            >
              <IconMail style={styles.refIcon} />
              <Text style={{ fontSize: 9, color: "#374151", marginLeft: 4 }}>
                {ref.email}
              </Text>
            </View>
          )}
        </View>
      ))}
    </View>
  </View>
);

const LanguagesSection = ({ data }) => (
  <View style={styles.section} wrap={false}>
    <View style={styles.sectionTitleRow}>
      <IconGlobe />
      <Text style={styles.sectionTitle}>Languages</Text>
    </View>
    <View style={styles.skillsContainer}>
      {data.map((lang, index) => (
        <Text key={index} style={styles.skillBadge}>
          {lang.language} {lang.proficiency ? `(${lang.proficiency})` : ""}
        </Text>
      ))}
    </View>
  </View>
);

const ProjectsSection = ({ data }) => (
  <View style={styles.section}>
    <View style={styles.sectionTitleRow}>
      <IconProject />
      <Text style={styles.sectionTitle}>Projects</Text>
    </View>
    {data.map((item, index) => (
      <View key={index} style={styles.jobBlock} wrap={false}>
        <View style={styles.jobHeader}>
          <Text style={styles.jobRole}>{item.title}</Text>
          {item.technologies && (
            <Text style={styles.jobDate}>{item.technologies}</Text>
          )}
        </View>
        {item.link && (
          <Text style={{ ...styles.company, color: "#2563eb" }}>
            {item.link}
          </Text>
        )}
        <Text style={styles.description}>{item.description}</Text>
      </View>
    ))}
  </View>
);

const AchievementsSection = ({ data }) => (
  <View style={styles.section}>
    <View style={styles.sectionTitleRow}>
      <IconTrophy />
      <Text style={styles.sectionTitle}>Achievements</Text>
    </View>
    {data.map((item, index) => (
      <View key={index} style={styles.jobBlock} wrap={false}>
        <View style={styles.jobHeader}>
          <Text style={styles.jobRole}>{item.title}</Text>
          <Text style={styles.jobDate}>{item.date}</Text>
        </View>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    ))}
  </View>
);

const ExtracurricularSection = ({ data }) => (
  <View style={styles.section}>
    <View style={styles.sectionTitleRow}>
      <IconActivity />
      <Text style={styles.sectionTitle}>Extracurricular</Text>
    </View>
    {data.map((item, index) => (
      <View key={index} style={styles.jobBlock} wrap={false}>
        <View style={styles.jobHeader}>
          <Text style={styles.jobRole}>{item.role}</Text>
          <Text style={styles.jobDate}>{item.date}</Text>
        </View>
        <Text style={styles.company}>{item.organization}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    ))}
  </View>
);

// 🆕 BIO SECTION RENDERER (Previously hardcoded at bottom)
const BioSection = ({ data }) => (
  <View wrap={false} style={styles.section}>
    <View style={styles.sectionTitleRow}>
      <IconUser />
      <Text style={styles.sectionTitle}>Personal Details</Text>
    </View>
    <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
      <View style={{ width: "50%", paddingRight: 10 }}>
        {data.address && (
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Address</Text>
            <Text style={styles.infoValue}>{data.address}</Text>
          </View>
        )}
        {data.dob && (
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>DOB</Text>
            <Text style={styles.infoValue}>{data.dob}</Text>
          </View>
        )}
        {data.gender && (
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Gender</Text>
            <Text style={styles.infoValue}>{data.gender}</Text>
          </View>
        )}
      </View>
      <View style={{ width: "50%", paddingLeft: 10 }}>
        {data.nationality && (
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Nationality</Text>
            <Text style={styles.infoValue}>{data.nationality}</Text>
          </View>
        )}
        {data.maritalStatus && (
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Marital Status</Text>
            <Text style={styles.infoValue}>{data.maritalStatus}</Text>
          </View>
        )}
        {data.idNumber && (
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>NIC/ID</Text>
            <Text style={styles.infoValue}>{data.idNumber}</Text>
          </View>
        )}
      </View>
    </View>
  </View>
);

// --- MAIN DOCUMENT ---
const CVDocument = ({ data, activeSections = [] }) => {
  // Check if bio data actually exists to determine if we should render 'bio'
  const hasBioData =
    data.personalInfo.address ||
    data.personalInfo.dob ||
    data.personalInfo.gender ||
    data.personalInfo.nationality ||
    data.personalInfo.maritalStatus ||
    data.personalInfo.idNumber;

  const RENDER_MAP = {
    experience: (d) => <ExperienceSection data={d.experience} />,
    education: (d) => <EducationSection data={d.education} />,
    skills: (d) => <SkillsSection data={d.skills} />,
    certificates: (d) => <CertificatesSection data={d.certificates} />,
    references: (d) => <ReferencesSection data={d.references} />,
    languages: (d) => <LanguagesSection data={d.languages} />,
    projects: (d) => <ProjectsSection data={d.projects} />,
    achievements: (d) => <AchievementsSection data={d.achievements} />,
    extracurricular: (d) => <ExtracurricularSection data={d.extracurricular} />,
    // 🆕 Add Bio to the Map (Pass personalInfo object)
    bio: (d) => <BioSection data={d.personalInfo} />,
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* HEADER */}
        <View wrap={false}>
          <View style={styles.header}>
            {data.personalInfo.photo && (
              <Image src={data.personalInfo.photo} style={styles.photo} />
            )}
            <View style={styles.headerRight}>
              <Text style={styles.name}>
                {data.personalInfo.fullName || "Your Name"}
              </Text>
              <Text style={styles.role}>
                {data.personalInfo.role || "Job Title"}
              </Text>
              <View style={styles.contactRow}>
                {data.personalInfo.email && (
                  <View style={styles.contactItem}>
                    <IconMail style={{ transform: "translateY(-0.5)" }} />
                    <Text style={{ marginLeft: 4 }}>
                      {data.personalInfo.email}
                    </Text>
                  </View>
                )}
                {data.personalInfo.phone && (
                  <View style={styles.contactItem}>
                    <IconPhone style={{ transform: "translateY(-0.5)" }} />
                    <Text style={{ marginLeft: 4 }}>
                      {data.personalInfo.phone}
                    </Text>
                  </View>
                )}
                {data.personalInfo.linkedin && (
                  <View style={styles.contactItem}>
                    <IconLinkedin style={{ transform: "translateY(-0.5)" }} />
                    <Link
                      src={data.personalInfo.linkedin}
                      style={{ marginLeft: 4, ...styles.link }}
                    >
                      LinkedIn
                    </Link>
                  </View>
                )}
                {data.personalInfo.github && (
                  <View style={styles.contactItem}>
                    <IconGithub style={{ transform: "translateY(-0.5)" }} />
                    <Link
                      src={data.personalInfo.github}
                      style={{ marginLeft: 4, ...styles.link }}
                    >
                      GitHub
                    </Link>
                  </View>
                )}
              </View>
            </View>
          </View>
        </View>

        {/* SUMMARY */}
        {data.personalInfo.summary && (
          <View wrap={false} style={styles.section}>
            <View style={styles.sectionTitleRow}>
              <IconSummary />
              <Text style={styles.sectionTitle}>Professional Summary</Text>
            </View>
            <Text style={styles.description}>{data.personalInfo.summary}</Text>
          </View>
        )}

        {/* 🔀 DYNAMIC SECTIONS (Now includes Bio) */}
        {activeSections.map((section) => {
          const renderFunc = RENDER_MAP[section.id];

          // SPECIAL CHECK: Bio is an Object, others are Arrays
          if (section.id === "bio") {
            return hasBioData ? (
              <View key={section.id}>{renderFunc(data)}</View>
            ) : null;
          }

          // STANDARD CHECK: Arrays
          if (renderFunc && data[section.id] && data[section.id].length > 0) {
            return <View key={section.id}>{renderFunc(data)}</View>;
          }
          return null;
        })}
      </Page>
    </Document>
  );
};

export default CVDocument;
```

- `src/components/pages/BuilderPage.jsx`

```jsx
import React, { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import {
  Loader2,
  ArrowLeft,
  Plus,
  Briefcase,
  GraduationCap,
  Lightbulb,
  BadgeCheck,
  Users,
  Globe,
  FolderGit2,
  Trophy,
  Tent,
  User,
} from "lucide-react";

// 🏎️ Drag & Drop Imports
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

// 🧱 Internal Imports
import { cvSchema } from "../schemas/cvSchema.js";
import { saveCVData, loadCVData } from "../db.js";
import SortableSection from "../components/ui/SortableSection.jsx";
import CVPreview from "../components/CVPreview.jsx"; // 👈 Updated Path

// 📝 NEW Form Sections
import HeaderSection from "../components/HeaderSection.jsx"; // 🆕 Fixed Top
import SummarySection from "../components/SummarySection.jsx"; // 🆕 Fixed Top
import BioSection from "../components/BioSection.jsx"; // 🆕 Dynamic Capsule

import Experience from "../components/Experience.jsx";
import Education from "../components/Education.jsx";
import Skills from "../components/Skills.jsx";
import Certificates from "../components/Certificates.jsx";
import References from "../components/References.jsx";
import Languages from "../components/Languages.jsx";
import Projects from "../components/Projects.jsx";
import Achievements from "../components/Achievements.jsx";
import Extracurricular from "../components/Extracurricular.jsx";

const BuilderPage = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  // 1️⃣ INITIAL STATE
  // "Bio" is optional, so we start with just Experience & Education
  const [activeSections, setActiveSections] = useState([
    { id: "experience" },
    { id: "education" },
  ]);

  const [expandedSection, setExpandedSection] = useState("experience");

  // 2️⃣ Section Configuration
  const SECTION_CONFIG = {
    // 🆕 Bio is now a dynamic section!
    bio: { component: <BioSection />, title: "Personal Details", icon: User },

    experience: {
      component: <Experience />,
      title: "Work Experience",
      icon: Briefcase,
    },
    education: {
      component: <Education />,
      title: "Education",
      icon: GraduationCap,
    },
    skills: { component: <Skills />, title: "Skills", icon: Lightbulb },
    certificates: {
      component: <Certificates />,
      title: "Certificates",
      icon: BadgeCheck,
    },
    references: { component: <References />, title: "References", icon: Users },
    languages: { component: <Languages />, title: "Languages", icon: Globe },
    projects: { component: <Projects />, title: "Projects", icon: FolderGit2 },
    achievements: {
      component: <Achievements />,
      title: "Achievements",
      icon: Trophy,
    },
    extracurricular: {
      component: <Extracurricular />,
      title: "Activities",
      icon: Tent,
    },
  };

  const allOptionalSections = Object.keys(SECTION_CONFIG).map((id) => ({
    id,
    title: SECTION_CONFIG[id].title,
    icon: SECTION_CONFIG[id].icon,
  }));

  const methods = useForm({
    resolver: zodResolver(cvSchema),
    mode: "onChange",
    defaultValues: {
      personalInfo: {
        fullName: "",
        email: "",
        phone: "",
        role: "",
        summary: "",
        photo: "",
        // Bio fields
        address: "",
        dob: "",
        gender: "",
        nationality: "",
        maritalStatus: "",
        idNumber: "",
      },
      experience: [],
      education: [],
      skills: [],
      certificates: [],
      references: [],
      languages: [],
      projects: [],
      achievements: [],
      extracurricular: [],
    },
  });

  const { watch, reset, setValue, getValues } = methods;

  // 4️⃣ DnD Sensors
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    setActiveSections((items) => {
      const oldIndex = items.findIndex((item) => item.id === active.id);
      const newIndex = items.findIndex((item) => item.id === over.id);
      return arrayMove(items, oldIndex, newIndex);
    });
  };

  const addSection = (sectionId) => {
    if (!activeSections.find((s) => s.id === sectionId)) {
      setActiveSections([...activeSections, { id: sectionId }]);
      setExpandedSection(sectionId);
    }
  };

  // ⚡ UPDATED REMOVE LOGIC
  const removeSection = (sectionId) => {
    if (confirm("Remove this section? All data in it will be lost.")) {
      setActiveSections(activeSections.filter((s) => s.id !== sectionId));

      // Special logic for "Bio" because it's not an array
      if (sectionId === "bio") {
        setValue("personalInfo.address", "");
        setValue("personalInfo.dob", "");
        setValue("personalInfo.gender", "");
        setValue("personalInfo.nationality", "");
        setValue("personalInfo.maritalStatus", "");
        setValue("personalInfo.idNumber", "");
      } else {
        // Standard Array Wipe for other sections
        setValue(sectionId, []);
      }
    }
  };

  const toggleSection = (id) => {
    setExpandedSection((prev) => (prev === id ? null : id));
  };

  // --- 🧠 SMART DATA LOADING ---
  useEffect(() => {
    const initData = async () => {
      const savedData = await loadCVData();
      if (savedData) {
        const { sectionOrder, ...formData } = savedData;
        reset(formData);

        // 1. Check for Saved Order
        if (
          sectionOrder &&
          Array.isArray(sectionOrder) &&
          sectionOrder.length > 0
        ) {
          setActiveSections(sectionOrder);
        }
        // 2. Smart Init Fallback
        else {
          const sectionsToActivate = ["experience", "education"];

          // Check standard array sections
          [
            "skills",
            "certificates",
            "references",
            "languages",
            "projects",
            "achievements",
            "extracurricular",
          ].forEach((id) => {
            if (savedData[id]?.length > 0 && !sectionsToActivate.includes(id)) {
              sectionsToActivate.push(id);
            }
          });

          // 🆕 Check Bio Fields (If any bio field has data, activate the section)
          const bioFields = [
            "address",
            "dob",
            "gender",
            "nationality",
            "maritalStatus",
            "idNumber",
          ];
          const hasBioData = bioFields.some(
            (field) => savedData.personalInfo?.[field]
          );
          if (hasBioData) {
            sectionsToActivate.push("bio");
          }

          setActiveSections(sectionsToActivate.map((id) => ({ id })));
        }
      }
      setIsLoaded(true);
    };
    initData();
  }, [reset]);

  // --- 💾 AUTO-SAVE LOGIC ---
  useEffect(() => {
    if (!isLoaded) return;
    const save = () =>
      saveCVData({ ...getValues(), sectionOrder: activeSections });

    const subscription = watch(save);
    save(); // Also save immediately on order change

    return () => subscription.unsubscribe();
  }, [watch, isLoaded, activeSections, getValues]);

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-500 bg-gray-100">
        <Loader2 className="text-blue-600 animate-spin" size={48} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <FormProvider {...methods}>
        <div className="flex flex-col h-screen overflow-hidden md:flex-row">
          {/* EDITOR COLUMN */}
          <div className="w-full h-full p-8 pb-32 overflow-y-auto md:w-1/2 scrollbar-hide bg-gray-50/50">
            <div className="flex items-center justify-between mb-6">
              <Link
                to="/"
                className="flex items-center gap-2 text-sm font-medium text-gray-500 transition-colors hover:text-blue-600"
              >
                <ArrowLeft size={16} /> Back to Home
              </Link>
              <h1 className="text-xl font-bold text-gray-800">CV Builder</h1>
            </div>

            <form className="space-y-6">
              {/* 🔒 1. FIXED SECTIONS (Always Visible) */}
              <HeaderSection />
              <SummarySection />

              {/* 🔀 2. DYNAMIC SECTIONS (Draggable) */}
              <div className="pt-6 border-t border-gray-200">
                <h3 className="mb-4 text-xs font-bold tracking-wider text-gray-400 uppercase">
                  Sections (Drag to Reorder)
                </h3>

                <DndContext
                  sensors={sensors}
                  collisionDetection={closestCenter}
                  onDragEnd={handleDragEnd}
                >
                  <SortableContext
                    items={activeSections.map((s) => s.id)}
                    strategy={verticalListSortingStrategy}
                  >
                    {activeSections.map((section) => {
                      const config = SECTION_CONFIG[section.id];
                      return (
                        <SortableSection
                          key={section.id}
                          id={section.id}
                          title={config.title}
                          icon={config.icon}
                          onRemove={() => removeSection(section.id)}
                          isOpen={expandedSection === section.id}
                          onToggle={() => toggleSection(section.id)}
                        >
                          {config.component}
                        </SortableSection>
                      );
                    })}
                  </SortableContext>
                </DndContext>
              </div>

              {/* ➕ 3. CAPSULES (Add Options) */}
              <div className="pt-4">
                <h4 className="mb-3 text-xs font-bold tracking-wider text-gray-400 uppercase">
                  Add More Sections
                </h4>
                <div className="flex flex-wrap gap-3">
                  {allOptionalSections.map((section) => {
                    // Hide if already active
                    const isActive = activeSections.find(
                      (s) => s.id === section.id
                    );
                    if (isActive) return null;

                    return (
                      <button
                        key={section.id}
                        type="button"
                        onClick={() => addSection(section.id)}
                        className="flex items-center gap-2 px-5 py-2 text-sm font-bold text-blue-700 transition-all border border-blue-200 rounded-full shadow-sm bg-blue-50 hover:bg-blue-100 hover:shadow-md hover:scale-105 active:scale-95 group"
                      >
                        <Plus
                          size={16}
                          className="text-blue-500 group-hover:text-blue-700"
                        />
                        {section.title}
                      </button>
                    );
                  })}
                </div>
              </div>
            </form>
          </div>

          {/* PREVIEW COLUMN */}
          <div className="flex flex-col w-full h-full bg-gray-100 border-l border-gray-200 md:w-1/2">
            <CVPreview activeSections={activeSections} />
          </div>
        </div>
      </FormProvider>
    </div>
  );
};

export default BuilderPage;
```

_New components_

- `src/components/HeaderSection.jsx`

```jsx
import React from "react";
import { User } from "lucide-react"; // Matching style
import FormInput from "./ui/FormInput.jsx";
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
      </div>
    </div>
  );
};

export default HeaderSection;
```

- `src/components/SummarySection.jsx`

```jsx
import React from "react";
import { AlignLeft } from "lucide-react"; // Matching style
import FormTextArea from "./ui/FormTextArea.jsx";

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
```

- `src/components/BioSection.jsx`

```jsx
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
```
