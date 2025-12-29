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
  const data = watch(); // Live Data! No waiting!

  return (
    <div className="sticky top-0 h-screen p-4 overflow-y-auto bg-gray-100 border-l border-gray-200">
      {/* HEADER: Actions */}
      <div className="flex justify-between items-center mb-4 px-2 max-w-[210mm] mx-auto">
        <h2 className="text-lg font-bold text-gray-800">Live Preview</h2>
        <button
          onClick={() => window.print()}
          className="px-4 py-2 text-sm font-bold text-white transition bg-blue-600 rounded shadow-sm hover:bg-blue-700"
        >
          Download PDF
        </button>
      </div>

      {/* THE A4 PAPER */}
      {/* 210mm x 297mm is the standard A4 size */}
      <div
        className="bg-white shadow-2xl mx-auto p-[15mm] min-h-[297mm] w-[210mm]"
        id="cv-print-area"
      >
        {/* --- HEADER SECTION --- */}
        <header className="flex items-center gap-6 pb-6 mb-6 border-b-2 border-gray-800">
          {/* 1. PHOTO SECTION */}
          {data.personalInfo.photo && (
            <img
              src={data.personalInfo.photo}
              alt="Profile"
              className="w-[35mm] h-[35mm] rounded-full object-cover border-2 border-gray-200"
            />
          )}

          {/* 2. TEXT SECTION */}
          <div className="flex-1">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 uppercase">
              {data.personalInfo.fullName || "Your Name"}
            </h1>
            <p className="mt-1 text-xl font-medium text-gray-600">
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
              <p className="mt-4 text-sm leading-relaxed text-gray-700">
                {data.personalInfo.summary}
              </p>
            )}
          </div>
        </header>

        {/* --- EXPERIENCE SECTION --- */}
        {data.experience?.length > 0 && (
          <section className="mb-8">
            <h3 className="flex items-center gap-2 pb-1 mb-4 text-lg font-bold text-gray-800 uppercase border-b border-gray-300">
              <Briefcase size={18} /> Experience
            </h3>

            <div className="space-y-5">
              {data.experience.map((job, index) => (
                <div key={index}>
                  <div className="flex items-baseline justify-between">
                    <h4 className="font-bold text-gray-900">{job.role}</h4>
                    <span className="text-sm font-medium text-gray-500 whitespace-nowrap">
                      {job.startDate} — {job.endDate}
                    </span>
                  </div>
                  <p className="mb-1 text-sm font-medium text-blue-600">
                    {job.company}
                  </p>
                  <p className="text-sm leading-relaxed text-gray-700 whitespace-pre-line">
                    {job.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* --- EDUCATION SECTION --- */}
        {data.education?.length > 0 && (
          <section className="mb-8">
            <h3 className="flex items-center gap-2 pb-1 mb-4 text-lg font-bold text-gray-800 uppercase border-b border-gray-300">
              <GraduationCap size={18} /> Education
            </h3>

            <div className="space-y-4">
              {data.education.map((edu, index) => (
                <div key={index} className="flex items-start justify-between">
                  <div>
                    <h4 className="font-bold text-gray-900">{edu.school}</h4>
                    <p className="text-sm text-gray-600">{edu.degree}</p>
                  </div>
                  <span className="text-sm font-medium text-gray-500">
                    {edu.date}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* --- SKILLS SECTION --- */}
        {data.skills?.length > 0 && (
          <section>
            <h3 className="flex items-center gap-2 pb-1 mb-4 text-lg font-bold text-gray-800 uppercase border-b border-gray-300">
              <Wrench size={18} /> Skills
            </h3>
            <div className="flex flex-wrap gap-2">
              {data.skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 text-sm font-medium text-gray-800 bg-gray-200 rounded"
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
