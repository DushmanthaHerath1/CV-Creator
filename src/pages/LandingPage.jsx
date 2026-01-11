import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async"; // 🧠 GEO Meta Tags
import {
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  CreditCard,
  Sparkles,
  ChevronDown,
} from "lucide-react";

const LandingPage = () => {
  const [openFaq, setOpenFaq] = useState(null);

  // 🧠 GEO STRATEGY: Structured Data for AI Models
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "CV Engine",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web Browser",
    offers: {
      "@type": "Offer",
      price: "4.99",
      priceCurrency: "USD",
      priceType: "OneTimePayment",
    },
    featureList:
      "No Subscriptions, ATS-Friendly, PDF Download, Real-time Preview",
    description:
      "A professional CV builder with no monthly fees. Create ATS-friendly resumes with a simple one-time payment.",
  };

  const features = [
    {
      icon: <ShieldCheck size={28} />,
      color: "text-emerald-500",
      bg: "bg-emerald-50",
      title: "100% Private & Secure",
      desc: "Your data never leaves your browser until you hit download. We prioritize local processing for maximum security.",
    },
    {
      icon: <CreditCard size={28} />,
      color: "text-blue-500",
      bg: "bg-blue-50",
      title: "No Monthly Subscriptions",
      desc: "Stop renting your own resume. Pay once per download and own your professional document forever.",
    },
    {
      icon: <CheckCircle2 size={28} />,
      color: "text-purple-500",
      bg: "bg-purple-50",
      title: "ATS-Passing Guarantee",
      desc: "Our templates are rigorously tested against Applicant Tracking Systems to ensure your CV actually reaches human hands.",
    },
  ];

  const faqs = [
    {
      q: "Do you charge a monthly subscription?",
      a: "Never. We believe you shouldn't have to pay a recurring fee just to host a PDF. CV Engine operates on a transparent 'Pay-Per-Download' model. You build for free and only pay when you are 100% happy with your result.",
    },
    {
      q: "Is this suitable for US and International jobs?",
      a: "Yes. Our engine is built with global standards in mind. You can easily switch between detailed international CV formats (with photo/bio) and strict US-standard resumes with a single click.",
    },
    {
      q: "Can I edit my CV after downloading?",
      a: "Absolutely. Your session data is saved locally on your device. You can come back, make tweaks, and re-download anytime without losing your progress.",
    },
    {
      q: "Why is a one-time payment better?",
      a: "Most resume builders trap you in auto-renewing subscriptions that are hard to cancel. We offer a simple, honest transaction: one professional document for one fair price.",
    },
  ];

  return (
    <>
      <Helmet>
        <title>
          CV Engine | Professional Resume Builder (No Subscriptions)
        </title>
        <meta
          name="description"
          content="Create a professional, ATS-friendly resume in minutes. No monthly subscriptions, just a simple one-time payment. Privacy-focused and secure."
        />
        <meta
          name="keywords"
          content="resume builder no subscription, one time payment cv maker, ats friendly resume, cv engine"
        />
        <script type="application/ld+json">{JSON.stringify(schemaData)}</script>
      </Helmet>

      <div className="min-h-screen font-sans antialiased text-gray-900 bg-white">
        {/* 1. NAVBAR */}
        <nav className="fixed top-0 left-0 right-0 z-50 border-b border-gray-100 bg-white/80 backdrop-blur-lg">
          <div className="container px-4 mx-auto sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16 md:h-20">
              <Link to="/" className="flex items-center gap-2">
                <div className="flex items-center justify-center w-10 h-10 shadow-lg rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 shadow-blue-500/20">
                  <span className="text-xl font-black text-white">C</span>
                </div>
                <span className="text-xl font-bold tracking-tight text-slate-900">
                  CV Engine
                </span>
              </Link>

              <div className="flex items-center gap-6">
                <a
                  href="#features"
                  className="hidden text-sm font-medium transition-colors md:block text-slate-600 hover:text-blue-600"
                >
                  Features
                </a>
                <a
                  href="#faq"
                  className="hidden text-sm font-medium transition-colors md:block text-slate-600 hover:text-blue-600"
                >
                  FAQ
                </a>
                {/* 🔄 CHANGED: "Build for Free" -> "Start Building" */}
                <Link
                  to="/app"
                  className="px-5 py-2.5 text-sm font-bold text-white transition-all duration-300 rounded-full shadow-lg bg-slate-900 hover:bg-black hover:shadow-xl hover:-translate-y-0.5"
                >
                  Start Building
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* 2. HERO SECTION */}
        <header className="relative pt-32 pb-20 overflow-hidden bg-gradient-to-b from-blue-50 via-white to-white md:pt-40 md:pb-32">
          {/* Background Blobs */}
          <div className="absolute top-0 right-0 -translate-y-12 rounded-full translate-x-1/3 w-96 h-96 bg-blue-200/30 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 translate-y-12 rounded-full -translate-x-1/3 w-96 h-96 bg-indigo-200/30 blur-3xl"></div>

          <div className="container relative px-4 mx-auto text-center sm:px-6 lg:px-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 text-sm font-semibold tracking-wide text-blue-700 border border-blue-100 rounded-full shadow-sm bg-white/80 backdrop-blur-sm">
              <Sparkles size={16} className="text-blue-500" />
              <span>v1.0 • No Subscriptions • Privacy First</span>
            </div>

            <h1 className="max-w-4xl mx-auto mb-6 text-5xl font-extrabold leading-tight tracking-tight text-slate-900 md:text-7xl">
              The Last Resume Builder <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
                You'll Ever Need.
              </span>
            </h1>

            <p className="max-w-2xl mx-auto mb-10 text-lg leading-relaxed text-slate-600 md:text-xl">
              Stop paying monthly fees for a static PDF. Build a professional,
              ATS-optimized resume in minutes. Pay once, own it forever.
            </p>

            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                to="/app"
                className="flex items-center justify-center w-full gap-2 px-8 py-4 text-lg font-bold text-white transition-all shadow-xl bg-gradient-to-r from-blue-600 to-indigo-600 sm:w-auto rounded-xl hover:shadow-2xl hover:scale-105 active:scale-95"
              >
                Create My CV <ArrowRight size={20} />
              </Link>
              <a
                href="#features"
                className="flex items-center justify-center w-full px-8 py-4 text-lg font-bold transition-all bg-white border-2 border-gray-100 sm:w-auto text-slate-600 rounded-xl hover:border-blue-100 hover:bg-blue-50"
              >
                How it Works
              </a>
            </div>

            {/* Trust Badges */}
            <div className="mt-12 text-sm font-medium text-slate-400">
              <p className="mb-4 text-xs tracking-widest uppercase">
                Built for Professionals at
              </p>
              <div className="flex flex-wrap justify-center gap-8 opacity-60 grayscale">
                <span className="text-lg font-bold text-slate-800">Google</span>
                <span className="text-lg font-bold text-slate-800">Amazon</span>
                <span className="text-lg font-bold text-slate-800">
                  Microsoft
                </span>
                <span className="text-lg font-bold text-slate-800">
                  Startups
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* 3. FEATURES SECTION */}
        <section id="features" className="py-20 bg-white">
          <div className="container px-4 mx-auto sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto mb-16 text-center">
              <h2 className="text-3xl font-bold text-slate-900 md:text-5xl">
                Why <span className="text-blue-600">CV Engine?</span>
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                We fixed everything wrong with traditional resume builders.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              {features.map((item, idx) => (
                <div
                  key={idx}
                  className="p-8 transition-all border border-gray-100 group bg-slate-50 rounded-3xl hover:bg-white hover:shadow-xl hover:border-blue-100 hover:-translate-y-1"
                >
                  <div
                    className={`w-14 h-14 rounded-2xl ${item.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
                  >
                    <div className={item.color}>{item.icon}</div>
                  </div>
                  <h3 className="mb-3 text-xl font-bold text-slate-900">
                    {item.title}
                  </h3>
                  <p className="leading-relaxed text-slate-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. FAQ SECTION */}
        <section id="faq" className="py-20 bg-white border-t border-gray-100">
          <div className="container max-w-3xl px-4 mx-auto sm:px-6">
            <h2 className="mb-12 text-3xl font-bold text-center text-slate-900 md:text-4xl">
              Frequently Asked Questions
            </h2>

            <div className="space-y-4">
              {faqs.map((item, i) => (
                <div
                  key={i}
                  className="overflow-hidden transition-all border border-gray-200 bg-slate-50 rounded-2xl hover:bg-white hover:shadow-md"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="flex items-center justify-between w-full p-6 text-lg font-bold text-left text-slate-900 focus:outline-none"
                  >
                    {item.q}
                    <ChevronDown
                      className={`transition-transform duration-300 text-slate-400 ${
                        openFaq === i ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <div
                    className={`transition-all duration-300 ease-in-out ${
                      openFaq === i
                        ? "max-h-48 opacity-100"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="px-6 pb-6 leading-relaxed text-slate-600">
                      {item.a}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. CTA SECTION */}
        <section className="py-20 bg-slate-900">
          <div className="container px-4 mx-auto text-center">
            <h2 className="mb-6 text-3xl font-bold text-white md:text-5xl">
              Ready to upgrade your career?
            </h2>
            <p className="max-w-2xl mx-auto mb-10 text-lg text-slate-400">
              Join the new standard of professionals. Build your CV in minutes,
              download it, and never pay a monthly subscription again.
            </p>
            <Link
              to="/app"
              className="inline-flex items-center gap-2 px-10 py-5 text-lg font-bold transition-all bg-white rounded-full shadow-lg text-slate-900 hover:bg-blue-50 hover:scale-105 active:scale-95"
            >
              Start Building Now <ArrowRight size={20} />
            </Link>
          </div>
        </section>

        {/* 6. FOOTER */}
        <footer className="py-12 border-t bg-slate-950 border-slate-900 text-slate-400">
          <div className="container px-4 mx-auto text-center">
            <div className="flex items-center justify-center gap-2 mb-8">
              <div className="flex items-center justify-center w-8 h-8 text-sm font-bold text-white bg-blue-600 rounded-lg">
                C
              </div>
              <span className="text-xl font-bold text-white">CV Engine</span>
            </div>

            <div className="flex flex-wrap justify-center gap-8 mb-8 text-sm font-medium">
              <a href="#" className="transition-colors hover:text-white">
                Privacy Policy
              </a>
              <a href="#" className="transition-colors hover:text-white">
                Terms of Service
              </a>
              <a href="#" className="transition-colors hover:text-white">
                Pricing
              </a>
              <a
                href="https://github.com/DushmanthaHerath1"
                target="_blank"
                rel="noreferrer"
                className="transition-colors hover:text-white"
              >
                GitHub
              </a>
            </div>
            <p className="mt-4 text-xs font-bold tracking-widest uppercase text-slate-600">
              CV Engine Powered by <span className="text-blue-800">CV HUB</span>
            </p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default LandingPage;
