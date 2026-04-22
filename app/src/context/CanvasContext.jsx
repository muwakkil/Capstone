import { createContext, useContext, useState, useMemo, useRef } from 'react';

const CanvasContext = createContext(null);

export function CanvasProvider({ children }) {
  const [feeling, setFeeling]           = useState(null);
  const [desires, setDesires]           = useState([]);
  const [phrase, setPhrase]             = useState(null);
  const [passionLevel, setPassionLevel] = useState(50);
  const [era, setEra]                   = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [panelOpen, setPanelOpen]       = useState(true);

  const canvasRef = useRef(null);

  const TOTAL_SLIDES = 5; // 0-4 are toggles, 5 is Create

  const canvasConfig = useMemo(() => {
    const primaryColor     = feeling ? feeling.hex : '#1a1a1a';
    const motifs           = desires.map(d => d.icon);
    const layoutMode       = phrase ? phrase.layoutMode : 'grid';
    const contrastOpacity  = 0.95;
    const density          = 12;
    const strokeWidth      = 1 + (passionLevel / 100) * 14; // 1px (subtle) → 15px (bold)
    const backgroundColor  = feeling ? feeling.hex : '#f5f5f5';
    const backgroundImage  = 'none';
    const textureClass     = era ? era.textureClass : '';
    const bgTint           = era ? era.bgTint : 'transparent';

    return {
      primaryColor,
      motifs,
      layoutMode,
      contrastOpacity,
      density,
      strokeWidth,
      backgroundColor,
      backgroundImage,
      textureClass,
      bgTint,
    };
  }, [feeling, desires, phrase, passionLevel, era]);

  function toggleDesire(desire) {
    setDesires(prev => {
      const exists = prev.find(d => d.id === desire.id);
      if (exists) return prev.filter(d => d.id !== desire.id);
      if (prev.length >= 3) return [...prev.slice(1), desire];
      return [...prev, desire];
    });
  }

  function resetAll() {
    setFeeling(null);
    setDesires([]);
    setPhrase(null);
    setPassionLevel(50);
    setEra(null);
    setCurrentSlide(0);
    setPanelOpen(true);
  }

  function goNext() {
    setCurrentSlide(s => Math.min(s + 1, TOTAL_SLIDES));
  }

  function goBack() {
    setCurrentSlide(s => Math.max(s - 1, 0));
  }

  return (
    <CanvasContext.Provider value={{
      feeling, setFeeling,
      desires, toggleDesire,
      phrase, setPhrase,
      passionLevel, setPassionLevel,
      era, setEra,
      currentSlide, setCurrentSlide,
      panelOpen, setPanelOpen,
      canvasConfig,
      canvasRef,
      goNext, goBack, resetAll,
      TOTAL_SLIDES,
    }}>
      {children}
    </CanvasContext.Provider>
  );
}

export function useCanvas() {
  const ctx = useContext(CanvasContext);
  if (!ctx) throw new Error('useCanvas must be used inside CanvasProvider');
  return ctx;
}
