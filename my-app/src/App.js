

// // App.js

// App.js
import { useRef } from 'react';
import './App.css';
import LiquidEther from './components/liquid_ether/LiquidEther';
import VariableProximity from './components/Variable_Proximity/VariableProximity';

function App() {
  const containerRef = useRef(null);

  return (
    <div className="App" style={{ width: '100vw', height: '100vh', position: 'relative' }}>
      {/* LiquidEther background */}
      <LiquidEther
        className="liquid-ether-background"
        style={{ width: '100%', height: '100%' }}
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

      {/* Overlay container for text */}
      <div
        ref={containerRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          pointerEvents: 'none', // mouse goes through to LiquidEther
        }}
      >
        <VariableProximity
          label="Hi! My name is Sasha Khajanchi. Let's create something amazing together."
          className="variable-proximity-demo"
          fromFontVariationSettings="'wght' 500, 'opsz' 100"
          toFontVariationSettings="'wght' 1000, 'opsz' 900"
          containerRef={containerRef}
          radius={150}
          falloff="linear"
        />
      </div>
    </div>
  );
}

export default App;
