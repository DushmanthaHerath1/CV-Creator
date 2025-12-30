import React, { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cvSchema } from "./schemas/cvSchema";
import { saveCVData, loadCVData } from "./db"; // 👈 Import new DB tools
import { Loader2 } from "lucide-react"; // Import a spinner icon

import PersonalDetails from "./components/PersonalDetails";
import Experience from "./components/Experience";
import Education from "./components/Education";
import Skills from "./components/Skills";
import CVPreview from "./components/CVPreview";

function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  // 1. Setup Form with Empty Defaults initially
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
    },
  });

  const { watch, reset } = methods;

  // 2. LOAD DATA (One time on mount)
  useEffect(() => {
    const initData = async () => {
      const savedData = await loadCVData();
      if (savedData) {
        // Update form with saved data
        reset(savedData);
      }
      setIsLoaded(true); // Ready to show UI
    };
    initData();
  }, [reset]);

  // 3. SAVE DATA (Watch for changes)
  useEffect(() => {
    if (!isLoaded) return; // Don't save while still loading!

    const subscription = watch((value) => {
      saveCVData(value); // Saves to IndexedDB
    });
    return () => subscription.unsubscribe();
  }, [watch, isLoaded]);

  // 4. Loading Screen (Prevents empty form flashing)
  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-500 bg-gray-100">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="text-blue-600 animate-spin" size={48} />
          <p className="font-medium">Loading your CV...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <FormProvider {...methods}>
        <div className="flex flex-col md:flex-row">
          {/* EDITOR SECTION */}
          <div className="w-full h-screen p-8 pb-32 overflow-y-auto md:w-1/2">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-3xl font-bold text-gray-800">
                CV Builder Engine
              </h1>
              <button
                onClick={async () => {
                  if (confirm("Are you sure? This will clear your data.")) {
                    // Clear IndexedDB manually if needed, or just reset form
                    await saveCVData(null);
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

          {/* PREVIEW SECTION */}
          <div className="w-full bg-gray-800 md:w-1/2">
            <CVPreview />
          </div>
        </div>
      </FormProvider>
    </div>
  );
}

export default App;
