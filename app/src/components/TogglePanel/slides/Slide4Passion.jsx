import { useCanvas } from '../../../context/CanvasContext';
import styles from './slides.module.css';

export default function Slide4Passion() {
  const { passionLevel, setPassionLevel } = useCanvas();

  return (
    <div className={styles.passionWrapper}>
      <div className={styles.slideTitle}>How bold?</div>
      <div className={styles.slideHint}>Drag to set the intensity of your composition.</div>

      <div className={styles.sliderRow}>
        <span className={styles.sliderLabel}>Subtle</span>
        <input
          type="range"
          min="0"
          max="100"
          value={passionLevel}
          onChange={e => setPassionLevel(Number(e.target.value))}
          className={styles.slider}
        />
        <span className={styles.sliderLabel}>Bold</span>
      </div>

      <div className={styles.passionValue}>{passionLevel}%</div>
    </div>
  );
}
