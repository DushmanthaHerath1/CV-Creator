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
      // Desktop logic: subtract padding (40px)
      const computedWidth =
        newWidth > 400 ? newWidth - 40 : Math.max(newWidth - 16, 300);
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

  // Refs
  const containerRef = useRef(null);
  const scrollContainerRef = useRef(null);

  // 🧠 SMART TRACKING
  const isVisible = useVisibilityObserver(containerRef);
  const containerWidth = useContainerWidth(scrollContainerRef, isVisible);

  // 🧠 THE FIX: Force Remount key
  // We increment this whenever the tab becomes visible to wipe glitches.
  const [documentKey, setDocumentKey] = useState(0);

  useEffect(() => {
    if (isVisible) {
      // Force PDF reload when tab becomes visible
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
      className="flex flex-col h-full bg-gray-100 border-l border-gray-300"
      style={{ contain: "layout style" }} // Optimization
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
          overflow: "auto", // Allow X and Y scroll
          WebkitOverflowScrolling: "touch", // Smooth iOS Scroll
          overscrollBehavior: "contain", // Prevent parent scrolling
          touchAction: "pan-x pan-y", // Enable finger drag
          position: "relative",
        }}
      >
        <div className="flex justify-center min-w-min">
          {pdfUrl ? (
            <Document
              key={`pdf-doc-${documentKey}`} // 🔧 KEY FIX: Force Remount on Tab Switch
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
    </div>
  );
};

export default CVPreview;
