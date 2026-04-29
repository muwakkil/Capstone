import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import styles from './LandingPage.module.css';

export default function LandingPage() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

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

    // Wait 800ms after mount before listening so phantom load events are ignored
    const timer = setTimeout(() => {
      document.addEventListener('mousemove', handleMove);
    }, 800);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('mousemove', handleMove);
    };
  }, []);

  return (
    <div className={styles.page}>
      <div className={`${styles.curtainPanel} ${styles.curtainLeft} ${open ? styles.curtainOpen : ''}`}>
        <img src={`${import.meta.env.BASE_URL}installation_ill-01.svg`} alt="" />
      </div>
      <div className={`${styles.curtainPanel} ${styles.curtainRight} ${open ? styles.curtainOpen : ''}`}>
        <img src={`${import.meta.env.BASE_URL}installation_ill-02.svg`} alt="" />
      </div>
<div className={styles.content}>
        <img src={`${import.meta.env.BASE_URL}icons/icon-03.svg`} alt="" className={`${styles.ornament} spin-icon`} />
        <h1 className={styles.title}>Speaking<br />in Motifs</h1>
        <p className={styles.subtitle}>Syrian Cultural Art Creator</p>
        <p className={styles.arabic}>تكلّم بالزخارف</p>
        <button className={styles.enterBtn} onClick={() => navigate('/create')}>
          Start
        </button>
      </div>
    </div>
  );
}
