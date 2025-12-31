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

// --- 1. CONFIGURATION ---
const A4_HEIGHT_PX = 1123; // Standard A4 height at 96 DPI
const PAGE_MARGIN = 100; // Vertical padding (top + bottom)
const USABLE_HEIGHT = A4_HEIGHT_PX - PAGE_MARGIN;

// Helper: Section Header
const SectionHeader = ({ icon: Icon, title }) => (
  <h3 className="flex items-center gap-2 pb-1 mb-4 mt-6 text-lg font-bold text-gray-800 uppercase border-b-2 border-gray-300">
    <Icon size={18} className="text-gray-700" /> {title}
  </h3>
);

const CVPreview = () => {
  const { watch } = useFormContext();
  const data = watch();
  const [isGenerating, setIsGenerating] = useState(false);

  // State for Page Layout
  const ghostRef = useRef(null);
  const [pageLayout, setPageLayout] = useState([]);

  const hasBioData =
    data.personalInfo.address ||
    data.personalInfo.dob ||
    data.personalInfo.gender ||
    data.personalInfo.nationality ||
    data.personalInfo.maritalStatus ||
    data.personalInfo.idNumber;

  // --- 2. THE RENDER MAP ---
  const contentBlocks = useMemo(
    () => [
      {
        id: "header",
        render: () => (
          <header className="flex items-start gap-6 pb-6 mb-2 border-b-2 border-gray-800">
            {data.personalInfo.photo && (
              <img
                src={data.personalInfo.photo}
                alt="Profile"
                className="w-[35mm] h-[35mm] rounded-full object-cover border-2 border-gray-200"
              />
            )}
            <div className="flex-1 pt-2">
              <h1 className="text-4xl font-extrabold leading-none tracking-tight text-gray-900 uppercase">
                {data.personalInfo.fullName || "Your Name"}
              </h1>
              <p className="mt-2 text-xl font-medium text-gray-600">
                {data.personalInfo.role || "Job Title"}
              </p>
              <div className="flex flex-wrap mt-4 text-sm text-gray-700 gap-x-6 gap-y-2">
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
                {data.personalInfo.linkedin && (
                  <div className="flex items-center gap-1 text-blue-700">
                    <Linkedin size={14} /> LinkedIn
                  </div>
                )}
              </div>
            </div>
          </header>
        ),
      },
      ...(data.personalInfo.summary
        ? [
            {
              id: "summary",
              render: () => (
                <section>
                  <SectionHeader icon={FileText} title="Professional Summary" />
                  <p className="text-sm leading-relaxed text-justify text-gray-700 whitespace-pre-line">
                    {data.personalInfo.summary}
                  </p>
                </section>
              ),
            },
          ]
        : []),
      ...(data.experience?.length > 0
        ? [
            {
              id: "exp-header",
              render: () => (
                <SectionHeader icon={Briefcase} title="Experience" />
              ),
            },
            ...data.experience.map((job, index) => ({
              id: `exp-${index}`,
              render: () => (
                <div className="mb-5">
                  <div className="flex items-baseline justify-between">
                    <h4 className="font-bold text-gray-900 text-md">
                      {job.role}
                    </h4>
                    <span className="text-sm font-medium text-gray-500 whitespace-nowrap">
                      {job.startDate} — {job.endDate}
                    </span>
                  </div>
                  <p className="mb-1 text-sm font-medium text-blue-600">
                    {job.company}
                  </p>
                  <p className="text-sm leading-relaxed text-justify text-gray-700 whitespace-pre-line">
                    {job.description}
                  </p>
                </div>
              ),
            })),
          ]
        : []),
      ...(data.education?.length > 0
        ? [
            {
              id: "edu-header",
              render: () => (
                <SectionHeader icon={GraduationCap} title="Education" />
              ),
            },
            ...data.education.map((edu, index) => ({
              id: `edu-${index}`,
              render: () => (
                <div className="mb-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-bold text-gray-900">{edu.school}</h4>
                      <p className="text-sm text-gray-600">{edu.degree}</p>
                    </div>
                    <span className="text-sm font-medium text-gray-500 whitespace-nowrap">
                      {edu.date}
                    </span>
                  </div>
                </div>
              ),
            })),
          ]
        : []),
      ...(data.skills?.length > 0
        ? [
            {
              id: "skills",
              render: () => (
                <section>
                  <SectionHeader icon={Wrench} title="Skills" />
                  <div className="flex flex-wrap gap-2">
                    {data.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 text-sm font-medium text-gray-800 bg-gray-100 border border-gray-300 rounded"
                      >
                        {skill.name}
                      </span>
                    ))}
                  </div>
                </section>
              ),
            },
          ]
        : []),
      ...(hasBioData
        ? [
            {
              id: "personal",
              render: () => (
                <section>
                  <SectionHeader icon={User} title="Personal Information" />
                  <div className="grid grid-cols-1 text-sm md:grid-cols-2 gap-x-12 gap-y-3">
                    {data.personalInfo.address && (
                      <div className="grid grid-cols-[140px_1fr] border-b border-gray-100 pb-1">
                        <span className="text-xs font-semibold tracking-wide text-gray-500 uppercase">
                          Address
                        </span>
                        <span className="font-medium text-gray-900">
                          {data.personalInfo.address}
                        </span>
                      </div>
                    )}
                    {data.personalInfo.nationality && (
                      <div className="grid grid-cols-[140px_1fr] border-b border-gray-100 pb-1">
                        <span className="text-xs font-semibold tracking-wide text-gray-500 uppercase">
                          Nationality
                        </span>
                        <span className="font-medium text-gray-900">
                          {data.personalInfo.nationality}
                        </span>
                      </div>
                    )}
                    {data.personalInfo.dob && (
                      <div className="grid grid-cols-[140px_1fr] border-b border-gray-100 pb-1">
                        <span className="text-xs font-semibold tracking-wide text-gray-500 uppercase">
                          DOB
                        </span>
                        <span className="font-medium text-gray-900">
                          {data.personalInfo.dob}
                        </span>
                      </div>
                    )}
                    {data.personalInfo.gender && (
                      <div className="grid grid-cols-[140px_1fr] border-b border-gray-100 pb-1">
                        <span className="text-xs font-semibold tracking-wide text-gray-500 uppercase">
                          Gender
                        </span>
                        <span className="font-medium text-gray-900">
                          {data.personalInfo.gender}
                        </span>
                      </div>
                    )}
                    {data.personalInfo.maritalStatus && (
                      <div className="grid grid-cols-[140px_1fr] border-b border-gray-100 pb-1">
                        <span className="text-xs font-semibold tracking-wide text-gray-500 uppercase">
                          Status
                        </span>
                        <span className="font-medium text-gray-900">
                          {data.personalInfo.maritalStatus}
                        </span>
                      </div>
                    )}
                    {data.personalInfo.idNumber && (
                      <div className="grid grid-cols-[140px_1fr] border-b border-gray-100 pb-1">
                        <span className="text-xs font-semibold tracking-wide text-gray-500 uppercase">
                          ID
                        </span>
                        <span className="font-medium text-gray-900">
                          {data.personalInfo.idNumber}
                        </span>
                      </div>
                    )}
                  </div>
                </section>
              ),
            },
          ]
        : []),
    ],
    [data, hasBioData]
  );

  // --- 3. THE "GHOST" MEASURER (SAFE VERSION) 👻 ---
  useLayoutEffect(() => {
    if (!ghostRef.current) return;

    const pages = [[]]; // Start with Page 1
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

    // 🛑 CRITICAL FIX: Only update state if the layout CHANGED
    if (JSON.stringify(pages) !== JSON.stringify(pageLayout)) {
      setPageLayout(pages);
    }
  }, [contentBlocks, pageLayout]); // Dependencies

  // --- 4. DOWNLOAD LOGIC ---
  const handleDownload = async () => {
    setIsGenerating(true);
    try {
      const breaks = {};
      pageLayout.forEach((pageItems, pageIndex) => {
        if (pageIndex > 0 && pageItems.length > 0) {
          const firstItemId = pageItems[0];
          breaks[firstItemId] = true;
        }
      });

      const blob = await pdf(
        <CVDocument data={data} breaks={breaks} />
      ).toBlob();
      saveAs(blob, `${data.personalInfo.fullName || "CV"}.pdf`);
    } catch (error) {
      console.error("PDF Error", error);
      alert("Error generating PDF");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="sticky top-0 h-screen overflow-y-auto bg-gray-100 border-l border-gray-200">
      {/* HEADER CONTROLS */}
      <div className="sticky top-0 z-50 bg-gray-100/95 backdrop-blur-sm p-4 border-b border-gray-200 mb-6">
        <div className="flex justify-between items-center max-w-[210mm] mx-auto">
          <h2 className="text-lg font-bold text-gray-800">Live Preview</h2>
          <button
            onClick={handleDownload}
            disabled={isGenerating}
            className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-white transition bg-blue-600 rounded shadow-sm hover:bg-blue-700 disabled:opacity-50"
          >
            {isGenerating ? (
              <Loader2 className="animate-spin" size={16} />
            ) : (
              <Download size={16} />
            )}
            {isGenerating ? "Generating..." : "Download PDF"}
          </button>
        </div>
      </div>

      {/* --- 👻 GHOST CONTAINER (Hidden Measurement Layer) --- */}
      <div
        ref={ghostRef}
        className="absolute top-0 left-0 w-[210mm] invisible pointer-events-none"
        aria-hidden="true"
      >
        {contentBlocks.map((block) => (
          <div key={block.id} data-id={block.id} className="p-1">
            {block.render()}
          </div>
        ))}
      </div>

      {/* --- 📄 VISIBLE PAGES --- */}
      <div className="flex flex-col items-center gap-8 pb-20">
        {pageLayout.map((pageItems, pageIndex) => (
          <div
            key={pageIndex}
            className="bg-white shadow-xl w-[210mm] min-h-[297mm] p-[15mm] relative"
          >
            {/* Page Number Badge */}
            <div className="absolute top-2 right-[-40px] text-gray-400 font-bold text-xs rotate-90 origin-left">
              PAGE {pageIndex + 1}
            </div>

            {/* Render Items for this Page */}
            {pageItems.map((itemId) => {
              const block = contentBlocks.find((b) => b.id === itemId);
              return block ? <div key={itemId}>{block.render()}</div> : null;
            })}
          </div>
        ))}

        {pageLayout.length === 0 && (
          <div className="bg-white shadow-xl w-[210mm] h-[297mm] flex items-center justify-center text-gray-400">
            <Loader2 className="animate-spin mb-2" /> Initializing Preview...
          </div>
        )}
      </div>
    </div>
  );
};

export default CVPreview;
