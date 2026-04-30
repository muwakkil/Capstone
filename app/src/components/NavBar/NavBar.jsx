import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useCanvas } from '../../context/CanvasContext';
import { useCurtain } from '../../context/CurtainContext';
import styles from './NavBar.module.css';

export default function NavBar() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const { resetAll } = useCanvas();
  const { curtainNavigate } = useCurtain();

  const handleNav = (path) => {
    setOpen(false);
    if (pathname !== path) {
      curtainNavigate(path);
    }
  };

  return (
    <>
      {/* Top bar */}
      <header className={styles.topBar}>
        <button
          className={styles.hamburger}
          onClick={() => setOpen(o => !o)}
          aria-label="Toggle navigation"
        >
          <span /><span /><span />
        </button>
        <button className={styles.title} onClick={() => handleNav('/')}>Speaking in Motifs</button>
        {pathname === '/create' && (
          <button className={styles.resetBtn} onClick={resetAll}>Reset</button>
        )}
      </header>

      {/* Overlay */}
      {open && <div className={styles.overlay} onClick={() => setOpen(false)} />}

      {/* Left sidebar */}
      <nav className={`${styles.sidebar} ${open ? styles.sidebarOpen : ''}`}>
        <div className={styles.sidebarHeader}>
          <button className={styles.closeBtn} onClick={() => setOpen(false)} aria-label="Close navigation">✕</button>
        </div>
        <button
          className={`${styles.link} ${pathname === '/create' ? styles.active : ''}`}
          onClick={() => handleNav('/create')}
        >
          Create
        </button>
        <button
          className={`${styles.link} ${pathname === '/archive' ? styles.active : ''}`}
          onClick={() => handleNav('/archive')}
        >
          Archive
        </button>
        <button
          className={`${styles.link} ${pathname === '/learn' ? styles.active : ''}`}
          onClick={() => handleNav('/learn')}
        >
          Learn
        </button>
      </nav>
    </>
  );
}
