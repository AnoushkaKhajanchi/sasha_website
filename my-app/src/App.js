

// import { useRef, useState } from 'react';
// import { BrowserRouter, Routes, Route, useLocation, NavLink } from 'react-router-dom';
// import './App.css';
// import LiquidEther from './components/liquid_ether/LiquidEther';
// import VariableProximity from './components/Variable_Proximity/VariableProximity';
// import StaggeredMenu  from './components/staggered_menu/StaggeredMenu';
// import Contact from './Contact';  // your (currently empty) file—export a component

// function App() {
//   const containerRef = useRef(null);
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
  

//   const menuItems = [
//   { label: 'Home', ariaLabel: 'Go to home page', link: '/' },
//   { label: 'About', ariaLabel: 'Learn about us', link: '/about' },
//   { label: 'Services', ariaLabel: 'View our services', link: '/services' },
//   { label: 'Contact', ariaLabel: 'Get in touch', link: '/contact' }
// ];

// const socialItems = [
//   { label: 'Twitter', link: 'https://twitter.com' },
//   { label: 'GitHub', link: 'https://github.com' },
//   { label: 'LinkedIn', link: 'https://linkedin.com' }
// ];

//   return (
//     <div className="App" style={{ width: '100vw', height: '100vh', position: 'relative' }}>
//       {/* LiquidEther background */}
//       <LiquidEther
//   className="liquid-ether-background"
//   style={{
//     width: '100%',
//     height: '100%',
//     position: 'absolute',  // make sure it's positioned
//     top: 0,
//     left: 0,
//     zIndex: 0
//   }}
//   mouseForce={20}
//   cursorSize={100}
//   isViscous={false}
//   viscous={30}
//   iterationsViscous={32}
//   iterationsPoisson={32}
//   resolution={0.5}
//   isBounce={false}
//   autoDemo={true}
//   autoSpeed={0.5}
//   autoIntensity={2.2}
//   takeoverDuration={0.25}
//   autoResumeDelay={3000}
//   autoRampDuration={0.6}
// />

// {/* Text overlay */}
// <div
//   ref={containerRef}
//   style={{
//    position: 'absolute',   // fix: use absolute instead of 'flex'
//     top: '50%',             // vertical centering
//     left: '250px',           // distance from left edge
//     transform: 'translateY(-50%)', // keep vertically centered
//     pointerEvents: 'none',
//     zIndex: 1
//   }}
// >
//   <div
//     style={{
//       transition: 'transform 0.5s ease',
//       transform: isMenuOpen ? 'translateX(-150px)' : 'translateX(0)',
//       textAlign: 'center'
//     }}
//   >
 

//   <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
//   <VariableProximity
//     label="Hi! My name is Sasha Khajanchi."
//     className="variable-proximity-demo"
//     fromFontVariationSettings="'wght' 500, 'opsz' 100"
//     toFontVariationSettings="'wght' 1000, 'opsz' 900"
//     containerRef={containerRef}
//     radius={150}
//     falloff="linear"
//   />
//   <VariableProximity
//     label="Let's create something amazing together."
//     className="variable-proximity-demo"
//     fromFontVariationSettings="'wght' 500, 'opsz' 100"
//     toFontVariationSettings="'wght' 1000, 'opsz' 900"
//     containerRef={containerRef}
//     radius={150}
//     falloff="linear"
//   />
// </div>
//   </div>
// </div>

// {/* StaggeredMenu */}
// <div style={{
//     position: 'fixed',           // <-- pin to edges of .App (which is relative)
//     top: 0,
//     right:0,                      // <-- dock to right edge
//     height: '100%',
//     width: 'clamp(280px, 30vw, 420px)', // sensible responsive width
//     zIndex: 2,                       // above background & text
//     pointerEvents: 'auto',           // ensure it can be clicked
//   }}>
//   <StaggeredMenu
//     position="right"
//     items={menuItems}
//     socialItems={socialItems}
//     displaySocials={true}
//     displayItemNumbering={true}
//     menuButtonColor="#140b0bff"
//     openMenuButtonColor="#4a1919ff"
//     changeMenuColorOnOpen={true}
//     colors={['#B19EEF', '#6147cbff']}
//     logoUrl="/path-to-your-logo.svg"
//     accentColor="#e278e1ff"
//     onMenuOpen={() => setIsMenuOpen(true)}
//     onMenuClose={() => setIsMenuOpen(false)}
//   />
//    </div>

//     </div>
//   );
// }

// export default App;
// App.js
import { useRef, useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation, NavLink } from 'react-router-dom';
import './App.css';
import LiquidEther from './components/liquid_ether/LiquidEther';
import VariableProximity from './components/Variable_Proximity/VariableProximity';
import StaggeredMenu  from './components/staggered_menu/StaggeredMenu';

// ✨ Your page components
// import Home from './pages/Home';        // make a simple component
import About from './About';
import Projects from './Projects';
import Contact from './Contact';  // your (currently empty) file—export a component

function Shell() {
  const containerRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { pathname } = useLocation();
  const isHome = pathname === '/';

  const menuItems = [
     { label: 'Home', ariaLabel: 'Go to home page', link: '/' },
    { label: 'About', ariaLabel: 'Learn about us', link: '/about' },
    { label: 'Projects', ariaLabel: 'View our services', link: '/projects' },
    { label: 'Contact', ariaLabel: 'Get in touch', link: '/contact' }
  ];

  const socialItems = [
    { label: 'Twitter', link: 'https://twitter.com' },
    { label: 'GitHub', link: 'https://github.com' },
    { label: 'LinkedIn', link: 'https://linkedin.com' }
  ];

  return (
    <div className="App" style={{ width: '100vw', height: '100vh', position: 'relative' }}>
      {/* Background */}
      <LiquidEther
        className="liquid-ether-background"
        style={{ width:'100%', height:'100%', position:'absolute', top:0, left:0, zIndex:0 }}
        mouseForce={20} cursorSize={100} isViscous={false} viscous={30}
        iterationsViscous={32} iterationsPoisson={32} resolution={0.5}
        isBounce={false} autoDemo={true} autoSpeed={0.5} autoIntensity={2.2}
        takeoverDuration={0.25} autoResumeDelay={3000} autoRampDuration={0.6}
      />

      {/* Show hero only on home */}
      {isHome && (
        <div
          ref={containerRef}
          style={{
            position:'absolute', top:'50%', left:'250px', transform:'translateY(-50%)',
            pointerEvents:'none', zIndex:1
          }}
        >
          <div
            style={{
              transition:'transform 0.5s ease',
              transform: isMenuOpen ? 'translateX(-150px)' : 'translateX(0)',
              textAlign:'center'
            }}
          >
            <div style={{ display:'flex', flexDirection:'column', alignItems:'flex-start' }}>
              <VariableProximity
                label="Hi! My name is Sasha Khajanchi."
                className="variable-proximity-demo"
                fromFontVariationSettings="'wght' 500, 'opsz' 100"
                toFontVariationSettings="'wght' 1000, 'opsz' 900"
                containerRef={containerRef} radius={150} falloff="linear"
              />
              <VariableProximity
                label="Let's create something amazing together."
                className="variable-proximity-demo"
                fromFontVariationSettings="'wght' 500, 'opsz' 100"
                toFontVariationSettings="'wght' 1000, 'opsz' 900"
                containerRef={containerRef} radius={150} falloff="linear"
              />
            </div>
          </div>
        </div>
      )}

      {/* Route outlet */}
      <div style={{ position:'relative', zIndex:1, width:'100%', height:'100%', pointerEvents:'auto', background:'transparent' }}>
        <Routes>
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<main style={{ padding:24 }}>Home</main>} />
        </Routes>
      </div>

      {/* Menu (render real links) */}
      <div style={{ position:'fixed', top:0, right:0, height:'100%', width:'clamp(280px,30vw,420px)', zIndex:2, pointerEvents:'auto' }}>
        <StaggeredMenu
          position="right"
          items={menuItems}
          socialItems={socialItems}
          displaySocials
          displayItemNumbering
          menuButtonColor="#140b0bff"
          openMenuButtonColor="#4a1919ff"
          changeMenuColorOnOpen
          colors={['#B19EEF', '#6147cbff']}
          logoUrl="/path-to-your-logo.svg"
          accentColor="#e278e1ff"
          onMenuOpen={() => setIsMenuOpen(true)}
          onMenuClose={() => setIsMenuOpen(false)}
          // If your StaggeredMenu accepts a custom renderer, great.
          // Otherwise, inside StaggeredMenu, render <NavLink to={item.link}> instead of <a href="./contact">
          linkComponent={(item) => (
            <NavLink to={item.link} aria-label={item.ariaLabel} onClick={() => setIsMenuOpen(false)}>
              {item.label}
            </NavLink>
          )}
        />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Shell />
    </BrowserRouter>
  );
}
