import { useCanvas } from '../../../context/CanvasContext';
import { FEELINGS } from '../../../data/toggleData';
import styles from './slides.module.css';

export default function Slide1Feeling() {
  const { feeling, setFeeling } = useCanvas();

  return (
    <div>
      <div className={styles.slideTitle}>How do you feel?</div>
      <div className={styles.slideHint}>Choose the feeling closest to you right now.</div>
      <div className={styles.feelingGrid}>
        {FEELINGS.map(f => (
          <div
            key={f.id}
            className={`${styles.feelingCard} ${feeling?.id === f.id ? styles.selected : ''}`}
            onClick={() => setFeeling(f)}
          >
            <div className={styles.colorCircle} style={{ background: f.hex }} />
            <span className={styles.feelingLabel}>{f.label}</span>
            <span className={styles.arabicLabel}>{f.arabicContext}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
