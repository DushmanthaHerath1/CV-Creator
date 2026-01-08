import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import BuilderPage from "./pages/BuilderPage";

function App() {
  return (
    <Router>
      <Routes>
        {/* Route 1: The Landing Page (localhost:5173/) */}
        <Route path="/" element={<LandingPage />} />

        {/* Route 2: The App/Builder (localhost:5173/app) */}
        <Route path="/app" element={<BuilderPage />} />

        {/* Future Routes */}
        {/* <Route path="/pricing" element={<PricingPage />} /> */}
        {/* <Route path="/login" element={<LoginPage />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
