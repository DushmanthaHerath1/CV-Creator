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
  Eye, // 🆕 For FAB
  Pencil, // 🆕 For FAB
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
import CVPreview from "../components/preview/CVPreview.jsx"; // 👈 Ensure file is in /preview folder

// 📝 Form Sections
import HeaderSection from "../components/HeaderSection.jsx";
import SummarySection from "../components/SummarySection.jsx";
import BioSection from "../components/BioSection.jsx";

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
  const [showMobilePreview, setShowMobilePreview] = useState(false); // 📱 1. Mobile State

  // 1️⃣ INITIAL STATE
  const [activeSections, setActiveSections] = useState([
    { id: "experience" },
    { id: "education" },
  ]);

  const [expandedSection, setExpandedSection] = useState("experience");

  // 2️⃣ Section Configuration
  const SECTION_CONFIG = {
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

      if (sectionId === "bio") {
        setValue("personalInfo.address", "");
        setValue("personalInfo.dob", "");
        setValue("personalInfo.gender", "");
        setValue("personalInfo.nationality", "");
        setValue("personalInfo.maritalStatus", "");
        setValue("personalInfo.idNumber", "");
      } else {
        setValue(sectionId, []);
      }
    }
  };

  const toggleSection = (id) => {
    setExpandedSection((prev) => (prev === id ? null : id));
  };

  useEffect(() => {
    const initData = async () => {
      const savedData = await loadCVData();
      if (savedData) {
        const { sectionOrder, ...formData } = savedData;
        reset(formData);

        if (
          sectionOrder &&
          Array.isArray(sectionOrder) &&
          sectionOrder.length > 0
        ) {
          setActiveSections(sectionOrder);
        } else {
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
            if (savedData[id]?.length > 0 && !sectionsToActivate.includes(id)) {
              sectionsToActivate.push(id);
            }
          });

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
          if (hasBioData) sectionsToActivate.push("bio");

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
    const subscription = watch(save);
    save();
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
          {/* 🟢 EDITOR COLUMN */}
          {/* Mobile Logic: Hidden if showing preview, Block if showing editor. Always block on Desktop. */}
          <div
            className={`w-full h-full p-4 md:p-8 pb-32 overflow-y-auto md:w-1/2 scrollbar-hide bg-gray-50/50 ${
              showMobilePreview ? "hidden md:block" : "block"
            }`}
          >
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
              <HeaderSection />
              <SummarySection />

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

              {/* Added pb-20 for FAB clearance on mobile */}
              <div className="pt-4 pb-24 md:pb-0">
                <h4 className="mb-3 text-xs font-bold tracking-wider text-gray-400 uppercase">
                  Add More Sections
                </h4>
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

          {/* 🟢 PREVIEW COLUMN */}
          {/* Mobile Logic: Flex if showing preview, Hidden if showing editor. Always flex on Desktop. */}
          <div
            className={`w-full h-full bg-gray-100 border-l border-gray-200 md:w-1/2 flex-col ${
              showMobilePreview ? "flex" : "hidden md:flex"
            }`}
          >
            <CVPreview activeSections={activeSections} />
          </div>

          {/* 📱 3. FLOATING ACTION BUTTON (Visible only on Mobile) */}
          <div className="fixed z-50 bottom-6 right-6 md:hidden">
            <button
              type="button"
              onClick={() => setShowMobilePreview(!showMobilePreview)}
              className="flex items-center justify-center gap-2 px-6 py-3 font-bold text-white transition-all bg-gray-900 rounded-full shadow-lg active:scale-95 hover:bg-black hover:shadow-xl"
            >
              {showMobilePreview ? (
                <>
                  <Pencil size={20} /> Edit Editor
                </>
              ) : (
                <>
                  <Eye size={20} /> Preview PDF
                </>
              )}
            </button>
          </div>
        </div>
      </FormProvider>
    </div>
  );
};

export default BuilderPage;
