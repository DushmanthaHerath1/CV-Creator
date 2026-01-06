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
