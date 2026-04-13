import { NavLink } from 'react-router-dom';
import styles from './NavBar.module.css';

export default function NavBar() {
  return (
    <nav className={styles.nav}>
      <NavLink to="/create"  className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link}>Create</NavLink>
      <NavLink to="/archive" className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link}>Archive</NavLink>
      <NavLink to="/learn"   className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link}>Learn</NavLink>
    </nav>
  );
}
