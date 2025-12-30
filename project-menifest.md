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
