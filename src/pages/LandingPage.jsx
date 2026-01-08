import React from "react";
import { Link } from "react-router-dom";
import { FileText, CheckCircle, Zap } from "lucide-react";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-4 border-b border-gray-100">
        <div className="flex items-center gap-2 text-2xl font-bold text-blue-600">
          <FileText /> CVGenius
        </div>
        <div className="space-x-6 text-sm font-medium text-gray-600">
          <a href="#" className="hover:text-blue-600">
            Features
          </a>
          <a href="#" className="hover:text-blue-600">
            Pricing
          </a>
          <Link
            to="/app"
            className="px-4 py-2 text-white bg-blue-600 rounded-full hover:bg-blue-700"
          >
            Open App
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center px-6 py-20 text-center">
        <h1 className="mb-6 text-5xl font-extrabold tracking-tight text-gray-900">
          Build a Professional CV <br />
          <span className="text-blue-600">in Minutes, Not Hours.</span>
        </h1>
        <p className="max-w-2xl mx-auto mb-10 text-lg text-gray-500">
          Our AI-powered engine formats your resume perfectly. No design skills
          needed. Just fill in the blanks and export to PDF.
        </p>

        <div className="flex gap-4">
          <Link
            to="/app"
            className="px-8 py-4 text-lg font-bold text-white transition-all bg-blue-600 rounded-lg shadow-lg hover:bg-blue-700 hover:shadow-xl"
          >
            Start Building for Free
          </Link>
          <button className="px-8 py-4 text-lg font-bold text-gray-700 transition-all bg-gray-100 rounded-lg hover:bg-gray-200">
            View Templates
          </button>
        </div>

        {/* Trust Signals */}
        <div className="grid grid-cols-1 gap-8 mt-16 text-left md:grid-cols-3">
          <div className="flex flex-col items-center p-4">
            <Zap className="mb-2 text-yellow-500" size={32} />
            <h3 className="font-bold">Lightning Fast</h3>
            <p className="text-sm text-center text-gray-500">
              Real-time preview updates as you type.
            </p>
          </div>
          <div className="flex flex-col items-center p-4">
            <CheckCircle className="mb-2 text-green-500" size={32} />
            <h3 className="font-bold">ATS Friendly</h3>
            <p className="text-sm text-center text-gray-500">
              Optimized layouts for hiring algorithms.
            </p>
          </div>
          <div className="flex flex-col items-center p-4">
            <FileText className="mb-2 text-purple-500" size={32} />
            <h3 className="font-bold">PDF Export</h3>
            <p className="text-sm text-center text-gray-500">
              High-quality vector exports.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
