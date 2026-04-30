import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useCurtain } from '../../context/CurtainContext';
import styles from './CurtainOverlay.module.css';

export default function CurtainOverlay() {
  const { curtainOpen, openCurtain } = useCurtain();
  const { pathname } = useLocation();

  // Auto-open on every non-landing page — must be before early return
  useEffect(() => {
    if (pathname !== '/') {
      // Double rAF: guarantees the browser paints the closed state first
      // so the CSS transition plays smoothly from closed → open
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          openCurtain();
        });
      });
    }
  }, [pathname]);

  if (pathname === '/') return null;

  return (
    <>
      <div className={`${styles.curtainPanel} ${styles.curtainLeft} ${curtainOpen ? styles.curtainOpen : ''}`}>
        <img src={`${import.meta.env.BASE_URL}installation_ill.3.svg`} alt="" />
      </div>
      <div className={`${styles.curtainPanel} ${styles.curtainRight} ${curtainOpen ? styles.curtainOpen : ''}`}>
        <img src={`${import.meta.env.BASE_URL}installation_ill.3.svg`} alt="" style={{ transform: 'scaleX(-1)' }} />
      </div>
    </>
  );
}
