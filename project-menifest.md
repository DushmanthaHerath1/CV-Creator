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
