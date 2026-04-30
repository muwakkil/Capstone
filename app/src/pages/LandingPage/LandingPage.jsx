import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './LandingPage.module.css';

export default function LandingPage() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);

  const handleStart = () => {
    setClosing(true);
    setOpen(false);
    // After landing curtains close, navigate — global curtain auto-opens on new page
    setTimeout(() => navigate('/create'), 1400);
  };

  useEffect(() => {
    let initialX = null;
    let initialY = null;

    const handleMove = (e) => {
      if (initialX === null) {
        initialX = e.clientX;
        initialY = e.clientY;
        return;
      }
      if (Math.abs(e.clientX - initialX) > 60 || Math.abs(e.clientY - initialY) > 60) {
        setOpen(true);
        document.removeEventListener('mousemove', handleMove);
      }
    };

    const timer = setTimeout(() => {
      document.addEventListener('mousemove', handleMove);
    }, 800);

    // Failsafe: auto-open after 8 seconds if user hasn't moved the mouse
    const failsafe = setTimeout(() => {
      setOpen(true);
      document.removeEventListener('mousemove', handleMove);
    }, 8000);

    return () => {
      clearTimeout(timer);
      clearTimeout(failsafe);
      document.removeEventListener('mousemove', handleMove);
    };
  }, []);

  return (
    <div className={styles.page}>
      {/* Landing-page-only curtains — reactive, shows slivers when open */}
      <div className={`${styles.curtainPanel} ${styles.curtainLeft} ${open && !closing ? styles.curtainOpen : ''}`}>
        <img src={`${import.meta.env.BASE_URL}installation_ill.3.svg`} alt="" />
      </div>
      <div className={`${styles.curtainPanel} ${styles.curtainRight} ${open && !closing ? styles.curtainOpen : ''}`}>
        <img src={`${import.meta.env.BASE_URL}installation_ill.3.svg`} alt="" style={{ transform: 'scaleX(-1)' }} />
      </div>

      <div className={styles.content}>
        <img src={`${import.meta.env.BASE_URL}icons/icon-03.svg`} alt="" className={`${styles.ornament} spin-icon`} />
        <h1 className={styles.title}>Speaking<br />in Motifs</h1>
        <p className={styles.subtitle}>Syrian Cultural Art Creator</p>
        <p className={styles.arabic}>تكلّم بالزخارف</p>
        <button className={styles.enterBtn} onClick={handleStart}>
          Start
        </button>
      </div>
    </div>
  );
}
