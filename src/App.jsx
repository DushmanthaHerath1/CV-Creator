import React, { useEffect } from "react"; // Import useEffect
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cvSchema } from "./schemas/cvSchema";
import PersonalDetails from "./components/PersonalDetails";
import Experience from "./components/Experience";
import Education from "./components/Education";
import Skills from "./components/Skills";
import CVPreview from "./components/CVPreview";

// 1. HELPER: Load saved data safely
const loadSavedData = () => {
  try {
    const saved = localStorage.getItem("cvData");
    return saved ? JSON.parse(saved) : null;
  } catch (e) {
    console.error("Failed to load save data", e);
    return null;
  }
};

function App() {
  // 2. Load defaults (Saved Data OR Empty Data)
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

  // 3. AUTO-SAVE LOGIC (The Watcher)
  // We subscribe to the form changes
  useEffect(() => {
    const subscription = methods.watch((value) => {
      // Save to LocalStorage instantly
      localStorage.setItem("cvData", JSON.stringify(value));
    });
    return () => subscription.unsubscribe();
  }, [methods]); // <--- This is cleaner and safer

  return (
    <div className="min-h-screen bg-gray-100">
      <FormProvider {...methods}>
        {/* ... (Rest of your JSX is exactly the same) ... */}
        <div className="flex flex-col md:flex-row">
          <div className="w-full h-screen p-8 pb-32 overflow-y-auto md:w-1/2">
            {/* Header with Reset Button (Optional UX Fix) */}
            <div className="flex items-center justify-between mb-6">
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
                className="text-xs text-red-500 underline hover:text-red-700"
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
          <div className="w-full bg-gray-800 md:w-1/2">
            <CVPreview />
          </div>
        </div>
      </FormProvider>
    </div>
  );
}
export default App;
