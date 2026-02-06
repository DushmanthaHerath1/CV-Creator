import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from "react";
import { useFormContext } from "react-hook-form";
import { useDebounce } from "use-debounce";
import { pdf } from "@react-pdf/renderer";
import { Document, Page, pdfjs } from "react-pdf";
import CVDocument from "../pdf/CVDocument.jsx";
import { Download, Loader2, ZoomIn, ZoomOut, CheckCircle2 } from "lucide-react";
import { THEMES, ELEGANT_THEMES, CREATIVE_THEMES } from "../../data/themes";
import { TEMPLATES } from "../pdf/templates/index.jsx";

// ✅ WORKER SETUP
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";

const PDF_OPTIONS = {
  cMapUrl: `https://unpkg.com/pdfjs-dist@${pdfjs.version}/cmaps/`,
  cMapPacked: true,
};

// ═══════════════════════════════════════════════════════════════════════════
// 🎯 CUSTOM HOOKS (From Research)
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Hook to detect when element becomes visible in viewport
 * Crucial for fixing the "Stuck Tab" issue.
 */
const useVisibilityObserver = (ref) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.01 } // Trigger as soon as 1% is visible
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [ref]);

  return isVisible;
};

/**
 * Hook to get container width using ResizeObserver
 * Handles the "0px width" bug when tabs are hidden.
 */
const useContainerWidth = (ref, isVisible) => {
  const [width, setWidth] = useState(600); // Default safe width

  // Logic to calculate safe width
  const calculateWidth = useCallback(() => {
    if (!ref.current) return;

    // Get the real width
    const newWidth =
      ref.current.offsetWidth || ref.current.getBoundingClientRect().width;

    if (newWidth > 0) {
      // Mobile logic: If screen < 768px, ensure minimum 320px readability
      // Desktop logic: subtract padding (80px for safety)
      const computedWidth =
        newWidth > 400 ? newWidth - 80 : Math.max(newWidth - 16, 300);
      setWidth(computedWidth);
    }
  }, [ref]);

  // 1. Watch for Size Changes (ResizeObserver)
  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const resizeObserver = new ResizeObserver((entries) => {
      window.requestAnimationFrame(() => {
        calculateWidth();
      });
    });

    resizeObserver.observe(element);
    return () => resizeObserver.disconnect();
  }, [ref, calculateWidth]);

  // 2. Watch for Visibility Changes (Tab Switching)
  useEffect(() => {
    if (isVisible) {
      // Small delay to let browser finish animation/layout
      const timer = setTimeout(calculateWidth, 100);
      return () => clearTimeout(timer);
    }
  }, [isVisible, calculateWidth]);

  return width;
};

// ═══════════════════════════════════════════════════════════════════════════
// 📄 MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════════════



const CVPreview = ({ activeSections = [], isActive = true }) => {
  const { watch, setValue } = useFormContext(); // 🟢 Get setValue
  const formData = watch();
  const themeColor = formData.themeColor || "blue"; // 🟢 Get current theme
  const templateId = formData.templateId || "modern"; // 🟢 Get current template
  const currentTemplate = TEMPLATES[templateId] || TEMPLATES.modern;
  
  // ... rest of component

  const [debouncedDataString] = useDebounce(JSON.stringify(formData), 1000);
  const debouncedData = useMemo(
    () => JSON.parse(debouncedDataString),
    [debouncedDataString]
  );

  const [pdfUrl, setPdfUrl] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [scale, setScale] = useState(1.0);

  // Refs
  const containerRef = useRef(null);
  const scrollContainerRef = useRef(null);

  // 🧠 SMART TRACKING
  const isVisible = useVisibilityObserver(containerRef);
  const containerWidth = useContainerWidth(scrollContainerRef, isVisible);

  // 🧠 THE FIX: Force Remount key
  const [documentKey, setDocumentKey] = useState(0);

  useEffect(() => {
    if (isVisible) {
      setDocumentKey((prev) => prev + 1);
    }
  }, [isVisible]);

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

  const pageWidth = containerWidth * scale;

  return (
    <div
      ref={containerRef}
      className="flex flex-col h-full bg-gray-100 border-l border-gray-300 relative" // 🟢 Relative for floating UI
      style={{ contain: "layout style" }}
    >
      {/* 🛠️ TOOLBAR */}
      <div className="z-10 flex items-center justify-between p-3 bg-white border-b border-gray-200 shadow-sm shrink-0">
        <div className="flex items-center gap-2">
          <h2 className="hidden text-sm font-bold tracking-wide text-gray-700 uppercase md:block">
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
          <span className="hidden w-12 font-mono text-xs text-center md:block">
            {(scale * 100).toFixed(0)}%
          </span>
          <button
            onClick={() => setScale((s) => Math.min(2.0, s + 0.1))}
            className="p-1.5 hover:bg-gray-100 rounded text-gray-600"
          >
            <ZoomIn size={16} />
          </button>
          <div className="hidden w-px h-4 mx-1 bg-gray-300 md:block" />
          <button
            onClick={handleDownload}
            disabled={!pdfUrl}
            className="flex items-center gap-1.5 bg-gray-900 hover:bg-black text-white px-3 md:px-4 py-1.5 rounded text-sm font-bold transition disabled:opacity-50"
          >
            <Download size={14} />
            <span className="hidden md:inline">Download PDF</span>
          </button>
        </div>
      </div>

      {/* 📄 PDF VIEWER CONTAINER */}
      <div
        ref={scrollContainerRef}
        className="flex-1 p-4 md:p-8 bg-slate-200"
        style={{
          overflow: "auto",
          WebkitOverflowScrolling: "touch",
          overscrollBehavior: "contain",
          touchAction: "pan-x pan-y",
          position: "relative",
        }}
      >
        <div className="flex justify-center w-full pb-24">
          {" "}
          {/* 🟢 Added padding-bottom for floating picker */}
          {pdfUrl ? (
            <Document
              key={`pdf-doc-${documentKey}`}
              file={pdfUrl}
              options={PDF_OPTIONS}
              onLoadSuccess={({ numPages }) => setNumPages(numPages)}
              loading={
                <div className="flex items-center justify-center py-20">
                  <Loader2 className="text-gray-400 animate-spin" size={32} />
                </div>
              }
              className="flex flex-col gap-6"
            >
              {Array.from(new Array(numPages || 0), (_, index) => (
                <div
                  key={`page_${index + 1}_${documentKey}`}
                  className="transition-all duration-200 bg-white shadow-xl"
                >
                  <Page
                    pageNumber={index + 1}
                    width={pageWidth}
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
            <div className="flex flex-col items-center justify-center h-full py-20 text-gray-400">
              <Loader2 className="mb-3 animate-spin" size={32} />
              <p className="text-sm font-medium">Initializing Engine...</p>
            </div>
          )}
        </div>
      </div>

      {/* 🎨 FLOATING COLOR PICKER */}
      {/* 🎨 FLOATING COLOR PICKER */}
      {currentTemplate.hasColorVariants && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg border border-gray-200 flex items-center gap-3 z-30 transition-transform hover:scale-105">
          {(() => {
            // 🟢 Select correct themes based on template ID
            let activeThemes = THEMES;
            if (currentTemplate.id === "elegant") activeThemes = ELEGANT_THEMES;
            if (currentTemplate.id === "creative") activeThemes = CREATIVE_THEMES;

            return Object.values(activeThemes).map((theme) => (
              <button
                key={theme.id}
                type="button"
                onClick={() => setValue("themeColor", theme.id)}
                className={`w-8 h-8 rounded-full border-2 transition-all ${
                  themeColor === theme.id
                    ? "border-gray-900 scale-110 shadow-md"
                    : "border-transparent hover:scale-110"
                }`}
                style={{ backgroundColor: theme.colors.sidebarBg }}
                title={theme.name}
              >
                {/* Inner dot for contrast */}
                <div
                  className="w-full h-full rounded-full border border-black/5 flex items-center justify-center"
                >
                   {themeColor === theme.id && <div className="w-2 h-2 rounded-full bg-white shadow-sm" />}
                </div>
              </button>
            ));
          })()}
        </div>
      )}
    </div>
  );
};

export default CVPreview;
