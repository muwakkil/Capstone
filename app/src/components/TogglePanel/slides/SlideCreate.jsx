import { useCanvas } from '../../../context/CanvasContext';
import styles from './slides.module.css';

export default function SlideCreate() {
  const { feeling, desires, phrase, passionLevel, era, goNext, setPanelOpen } = useCanvas();

  return (
    <div className={styles.createSlide}>
      <div className={styles.slideTitle}>Your composition</div>

      <div className={styles.summaryList}>
        <div className={styles.summaryItem}>
          <span className={styles.summaryKey}>Feeling</span>
          <span>{feeling ? feeling.label : '—'}</span>
        </div>
        <div className={styles.summaryItem}>
          <span className={styles.summaryKey}>Desires</span>
          <span>{desires.length > 0 ? desires.map(d => d.label).join(', ') : '—'}</span>
        </div>
        <div className={styles.summaryItem}>
          <span className={styles.summaryKey}>Phrase</span>
          <span>{phrase ? phrase.arabic : '—'}</span>
        </div>
        <div className={styles.summaryItem}>
          <span className={styles.summaryKey}>Intensity</span>
          <span>{passionLevel}%</span>
        </div>
        <div className={styles.summaryItem}>
          <span className={styles.summaryKey}>Era</span>
          <span>{era ? era.label : '—'}</span>
        </div>
      </div>

      <button className={styles.createBtn} onClick={goNext}>
        Create
      </button>

      <br />
      <button className={styles.keepEditing} onClick={() => setPanelOpen(false)}>
        Keep editing
      </button>
    </div>
  );
}
