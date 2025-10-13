
// App.js
import React, { useRef, useState } from "react";
import { BrowserRouter, Routes, Route, useLocation, NavLink } from "react-router-dom";
import { createPortal } from "react-dom";
import "./App.css";

// Components
import LiquidEther from "./components/liquid_ether/LiquidEther";
import VariableProximity from "./components/Variable_Proximity/VariableProximity";
import StaggeredMenu from "./components/staggered_menu/StaggeredMenu";

// Pages
import Fun from "./Fun";
import About from "./About";
import Projects from "./Projects";
import ResumeRedirect from "./ResumeRedirect";
/**
 * Render the menu into document.body so it is not clipped by transforms/stacking contexts.
 */
function MenuPortal({ children }) {
  return createPortal(children, document.body);
}

function Shell() {
  const containerRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  const menuItems = [
    { label: "Home", ariaLabel: "Go to home page", link: "/" },
    { label: "About", ariaLabel: "Learn about us", link: "/about" },
    { label: "Fun", ariaLabel: "Learn about us", link: "/fun" },

    { label: "Projects", ariaLabel: "View our projects", link: "/projects" },
    { label: "Resume", ariaLabel: "view my resume", link: "/resume" }
    // { label: "Contact", ariaLabel: "Get in touch", link: "/contact" }
  ];

  const socialItems = [
    { label: "Email", link: "mailto:sasha.khajanchi@berkeley.edu" },
    { label: "LinkedIn", link: "https://www.linkedin.com/in/sasha-khajanchi/" },
  ];

  return (
    <div className="App" style={{ width: "100vw", position: "relative" }}>
      {/* Background */}
      <LiquidEther
        className="liquid-ether-background"
        style={{ width: "100%", height: "100%", position: "absolute", top: 0, left: 0, zIndex: 0 }}
        mouseForce={20}
        cursorSize={100}
        isViscous={false}
        viscous={30}
        iterationsViscous={32}
        iterationsPoisson={32}
        resolution={0.5}
        isBounce={false}
        autoDemo={true}
        autoSpeed={0.5}
        autoIntensity={2.2}
        takeoverDuration={0.25}
        autoResumeDelay={3000}
        autoRampDuration={0.6}
      />

      {/* Hero only on Home */}
      {isHome && (
        <div
          ref={containerRef}
          style={{
            position: "absolute",
            top: "50%",
            left: "250px",
            transform: "translateY(-50%)",
            pointerEvents: "none",
            zIndex: 1,
          }}
        >
          <div
            style={{
              transition: "transform 0.5s ease",
              transform: isMenuOpen ? "translateX(-150px)" : "translateX(0)",
              textAlign: "center",
            }}
          >
            <div style={{ size: "700px", color: "#fff", display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
              <VariableProximity
                label="Hi! My name is Sasha Khajanchi."
                className="variable-proximity-demo"
                style={{ fontSize: 60, lineHeight: 1.1 }}
                fromFontVariationSettings="'wght' 500, 'opsz' 100"
                toFontVariationSettings="'wght' 1000, 'opsz' 900"
                containerRef={containerRef}
                radius={150}
                falloff="linear"
              />
              <VariableProximity
               
                label="Let's create something amazing together."
                className="variable-proximity-demo"
                style={{ fontSize: 60, lineHeight: 1.1 }}
                fromFontVariationSettings="'wght' 500, 'opsz' 100"
                toFontVariationSettings="'wght' 1000, 'opsz' 900"
                containerRef={containerRef}
                radius={150}
                falloff="linear"
              />
            </div>
          </div>
        </div>
      )}

      {/* Route outlet */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          height: "100%",
          pointerEvents: "auto",
          background: "transparent",
        }}
      >
        <Routes>
          <Route path="/" element={<main style={{ color: "#ffffffff", textSize:25,padding: 24 }}>Home</main>} />
          <Route path="/fun" element={<Fun />} />
          <Route path="/projects" element={<Projects />} />
          {/* <Route path="/contact" element={<Contact />} /> */}
          <Route path="/about" element={<About />} />
          <Route path="/resume" element={<ResumeRedirect />} />

        </Routes>
      </div>

      {/* Menu in a portal to avoid clipping/stacking issues */}
      <MenuPortal>
        <div
          style={{
            position: "fixed",
            top: 0,
            right: 0,
            height: "100vh",
            width: "clamp(280px, 30vw, 420px)",
            zIndex: 1,
            pointerEvents: "auto",
            isolation: "isolate",
          }}
        >
          <StaggeredMenu
            position="right"
            items={menuItems}
            socialItems={socialItems}
            displaySocials
            displayItemNumbering
            menuButtonColor="#140b0bff"
            openMenuButtonColor="#4a1919ff"
            changeMenuColorOnOpen
            colors={["#B19EEF", "#6147cbff"]}
            logoUrl="/path-to-your-logo.svg"
            accentColor="#e278e1ff"
            onMenuOpen={() => setIsMenuOpen(true)}
            onMenuClose={() => setIsMenuOpen(false)}
            // This only takes effect if your StaggeredMenu implements the linkComponent prop
            linkComponent={(item, content) => (
              <NavLink to={item.link} aria-label={item.ariaLabel} onClick={() => setIsMenuOpen(false)}>
                {content ?? item.label}
              </NavLink>
            )}
          />
        </div>
      </MenuPortal>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter basename="/sasha_website">
      <Shell />
    </BrowserRouter>
  );
}

