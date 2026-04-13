import { useNavigate } from 'react-router-dom';
import styles from './LandingPage.module.css';

export default function LandingPage() {
  const navigate = useNavigate();
  return (
    <div className={styles.page}>
<div className={styles.content}>
        <img src="/icons/icon-03.svg" alt="" className={`${styles.ornament} spin-icon`} />
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
