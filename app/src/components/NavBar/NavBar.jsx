import { useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { useCanvas } from '../../context/CanvasContext';
import styles from './NavBar.module.css';

export default function NavBar() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const { resetAll } = useCanvas();

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
        <Link to="/" className={styles.title}>Speaking in Motifs</Link>
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
        <NavLink
          to="/create"
          className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link}
          onClick={() => setOpen(false)}
        >
          Create
        </NavLink>
        <NavLink
          to="/archive"
          className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link}
          onClick={() => setOpen(false)}
        >
          Archive
        </NavLink>
        <NavLink
          to="/learn"
          className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link}
          onClick={() => setOpen(false)}
        >
          Learn
        </NavLink>
      </nav>
    </>
  );
}
