import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegistrationPage from "./pages/RegistrationPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import TransporterPage from "./pages/TransporterPage.jsx";
import UserPage from "./pages/UserPage.jsx";
import { AppProvider } from "./context/AppContext";
import Sidebar from "./components/Sidebar.jsx";
import { IconTruck, IconMenu } from "./components/Icons";
import "./styles/App.css";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <AppProvider>
      <Router>
        <div className="app-layout">
          <div className="app-topbar">
            <div className="app-brand">
              <span className="brand-mark"><IconTruck size={18} /></span>
              <div>
                <div className="brand-name">Saathi</div>
                <div className="brand-tag">Transport, made simple</div>
              </div>
            </div>
            <button className="menu-toggle" onClick={() => setSidebarOpen((s) => !s)} aria-label="Open menu">
              <IconMenu size={20} />
            </button>
          </div>

          <Sidebar mobileOpen={sidebarOpen} setMobileOpen={setSidebarOpen} />

          <div className="main-content" onClick={() => sidebarOpen && setSidebarOpen(false)}>
            <Routes>
              <Route path="/" element={<RegistrationPage />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/transporter" element={<TransporterPage />} />
              <Route path="/user" element={<UserPage />} />
            </Routes>
          </div>
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;
