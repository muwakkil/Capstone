import { createContext, useContext, useState, useMemo, useRef } from 'react';
import { FEELING_TO_BG } from '../data/toggleData';

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

  const TOTAL_SLIDES = 5; // 0-4 are toggles, pressing Next on 4 goes to create (5)

  const canvasConfig = useMemo(() => {
    const primaryColor     = feeling ? feeling.hex : '#cecccc';
    const motifs           = desires.length > 0 ? desires.map(d => d.icon) : ['icon-01'];
    const layoutMode       = phrase ? phrase.layoutMode : 'grid';
    const contrastOpacity  = 0.2 + (passionLevel / 100) * 0.8;
    const density          = Math.round(6 + (passionLevel / 100) * 18);
    const bgIndex          = feeling ? FEELING_TO_BG[feeling.id] : 3;
    const backgroundColor  = '#ddd';
    const backgroundImage  = `url(/bgimages/bgi${bgIndex}.png)`;
    const textureClass     = era ? era.textureClass : '';
    const bgTint           = era ? era.bgTint : 'transparent';

    return {
      primaryColor,
      motifs,
      layoutMode,
      contrastOpacity,
      density,
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
