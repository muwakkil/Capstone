import { Routes, Route, useLocation } from 'react-router-dom';
import { CanvasProvider } from './context/CanvasContext';
import { CurtainProvider } from './context/CurtainContext';
import CurtainOverlay from './components/CurtainOverlay/CurtainOverlay';
import NavBar       from './components/NavBar/NavBar';
import LandingPage  from './pages/LandingPage/LandingPage';
import CreatorPage  from './pages/CreatorPage/CreatorPage';
import GalleryPage  from './pages/GalleryPage/GalleryPage';
import LearnPage    from './pages/LearnPage/LearnPage';
function AppRoutes() {
  const { pathname } = useLocation();
  const showNav = pathname !== '/';

  return (
    <>
      <CurtainOverlay />
      {showNav && <NavBar />}
      <Routes>
        <Route path="/"        element={<LandingPage />} />
        <Route path="/create"  element={<CreatorPage />} />
        <Route path="/archive" element={<GalleryPage />} />
        <Route path="/learn"   element={<LearnPage />} />
      </Routes>
    </>
  );
}

function AppInner() {
  return (
    <CurtainProvider>
      <AppRoutes />
    </CurtainProvider>
  );
}

export default function App() {
  return (
    <CanvasProvider>
      <AppInner />
    </CanvasProvider>
  );
}
