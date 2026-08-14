import { useCanvas } from '../../../context/CanvasContext';
import styles from './slides.module.css';

export default function Slide4Passion() {
  const { passionLevel, setPassionLevel, intentionSize, setIntentionSize } = useCanvas();

  return (
    <div className={styles.passionWrapper}>
      <div className={styles.slideTitle}>How much do these intentions mean to you?</div>
      <div className={styles.slideHint}>Drag to set the size of your motifs.</div>

      <div className={styles.sliderRow}>
        <span className={styles.sliderLabel}>Small</span>
        <input
          type="range"
          min="0"
          max="100"
          value={intentionSize}
          onChange={e => setIntentionSize(Number(e.target.value))}
          className={styles.slider}
        />
        <span className={styles.sliderLabel}>Large</span>
      </div>

      <div className={styles.passionValue}>{intentionSize}%</div>

      <div className={styles.sliderDivider} />

      <div className={styles.slideTitle}>How strongly should it stand out?</div>
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
