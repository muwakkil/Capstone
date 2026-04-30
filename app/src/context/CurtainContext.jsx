import { createContext, useContext, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const CurtainContext = createContext();

export function CurtainProvider({ children }) {
  const [curtainOpen, setCurtainOpen] = useState(false);
  const navigate = useNavigate();

  const curtainNavigate = useCallback((path) => {
    setCurtainOpen(false); // close curtains
    setTimeout(() => {
      navigate(path);
      // rAF in CurtainOverlay handles the open — just ensure closed state is set
    }, 1400);
  }, [navigate]);

  // Called by CurtainOverlay on mount (non-landing pages)
  const openCurtain = useCallback(() => {
    setCurtainOpen(true);
  }, []);

  return (
    <CurtainContext.Provider value={{ curtainOpen, curtainNavigate, openCurtain }}>
      {children}
    </CurtainContext.Provider>
  );
}

export function useCurtain() {
  return useContext(CurtainContext);
}
