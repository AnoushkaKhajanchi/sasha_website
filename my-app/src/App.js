

import { useRef, useState } from 'react';
import './App.css';
import LiquidEther from './components/liquid_ether/LiquidEther';
import VariableProximity from './components/Variable_Proximity/VariableProximity';
import StaggeredMenu  from './components/staggered_menu/StaggeredMenu';

function App() {
  const containerRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  

  const menuItems = [
  { label: 'Home', ariaLabel: 'Go to home page', link: '/' },
  { label: 'About', ariaLabel: 'Learn about us', link: '/about' },
  { label: 'Services', ariaLabel: 'View our services', link: '/services' },
  { label: 'Contact', ariaLabel: 'Get in touch', link: '/contact' }
];

const socialItems = [
  { label: 'Twitter', link: 'https://twitter.com' },
  { label: 'GitHub', link: 'https://github.com' },
  { label: 'LinkedIn', link: 'https://linkedin.com' }
];

  return (
    <div className="App" style={{ width: '100vw', height: '100vh', position: 'relative' }}>
      {/* LiquidEther background */}
      <LiquidEther
  className="liquid-ether-background"
  style={{
    width: '100%',
    height: '100%',
    position: 'absolute',  // make sure it's positioned
    top: 0,
    left: 0,
    zIndex: 0
  }}
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

{/* Text overlay */}
<div
  ref={containerRef}
  style={{
   position: 'absolute',   // fix: use absolute instead of 'flex'
    top: '50%',             // vertical centering
    left: '250px',           // distance from left edge
    transform: 'translateY(-50%)', // keep vertically centered
    pointerEvents: 'none',
    zIndex: 1
  }}
>
  <div
    style={{
      transition: 'transform 0.5s ease',
      transform: isMenuOpen ? 'translateX(-150px)' : 'translateX(0)',
      textAlign: 'center'
    }}
  >
 

  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
  <VariableProximity
    label="Hi! My name is Sasha Khajanchi."
    className="variable-proximity-demo"
    fromFontVariationSettings="'wght' 500, 'opsz' 100"
    toFontVariationSettings="'wght' 1000, 'opsz' 900"
    containerRef={containerRef}
    radius={150}
    falloff="linear"
  />
  <VariableProximity
    label="Let's create something amazing together."
    className="variable-proximity-demo"
    fromFontVariationSettings="'wght' 500, 'opsz' 100"
    toFontVariationSettings="'wght' 1000, 'opsz' 900"
    containerRef={containerRef}
    radius={150}
    falloff="linear"
  />
</div>
  </div>
</div>

{/* StaggeredMenu */}
<div style={{
    position: 'fixed',           // <-- pin to edges of .App (which is relative)
    top: 0,
    right:0,                      // <-- dock to right edge
    height: '100%',
    width: 'clamp(280px, 30vw, 420px)', // sensible responsive width
    zIndex: 2,                       // above background & text
    pointerEvents: 'auto',           // ensure it can be clicked
  }}>
  <StaggeredMenu
    position="right"
    items={menuItems}
    socialItems={socialItems}
    displaySocials={true}
    displayItemNumbering={true}
    menuButtonColor="#140b0bff"
    openMenuButtonColor="#4a1919ff"
    changeMenuColorOnOpen={true}
    colors={['#B19EEF', '#6147cbff']}
    logoUrl="/path-to-your-logo.svg"
    accentColor="#e278e1ff"
    onMenuOpen={() => setIsMenuOpen(true)}
    onMenuClose={() => setIsMenuOpen(false)}
  />
   </div>

    </div>
  );
}

export default App;
