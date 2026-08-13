import { useCanvas } from '../../../context/CanvasContext';
import { DESIRES } from '../../../data/toggleData';
import styles from './slides.module.css';

export default function Slide2Desire() {
  const { desires, toggleDesire } = useCanvas();
  const selected = desires.map(d => d.id);

  return (
    <div>
      <div className={styles.slideTitle}>What meaning do you want your creation to carry?</div>
      <div className={styles.slideHint}>Choose up to 3. Each shapes your composition.</div>
      <div className={styles.desireGrid}>
        {DESIRES.map(d => (
          <div
            key={d.id}
            className={`${styles.desireCard} ${selected.includes(d.id) ? styles.selected : ''}`}
            onClick={() => toggleDesire(d)}
          >
            <img src={`${import.meta.env.BASE_URL}icons/${d.icon}.svg`} alt={d.label} className={styles.desireIcon} />
            <span className={styles.desireLabel}>{d.label}</span>
            <span className={styles.arabicLabel}>{d.arabicLabel}</span>
            <span className={styles.desireMeaning}>{d.meaning}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
