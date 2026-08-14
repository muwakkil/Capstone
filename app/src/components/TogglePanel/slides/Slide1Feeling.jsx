import { useCanvas } from '../../../context/CanvasContext';
import { FEELINGS, MOTIF_COLORS } from '../../../data/toggleData';
import styles from './slides.module.css';

export default function Slide1Feeling() {
  const { feeling, setFeeling, motifColor, setMotifColor } = useCanvas();

  return (
    <div>
      <div className={styles.slideTitle}>How do you feel?</div>
      <div className={styles.slideHint}>Choose the feeling closest to you right now.</div>
      <div className={styles.feelingGrid}>
        {FEELINGS.map(f => (
          <div
            key={f.id}
            className={`${styles.feelingCard} ${feeling?.id === f.id ? styles.selected : ''}`}
            style={{ backgroundColor: f.hex }}
            onClick={() => setFeeling(f)}
          >
            <span className={styles.feelingLabel}>{f.label}</span>
            <span className={styles.arabicLabel}>{f.arabicContext}</span>
          </div>
        ))}
      </div>

      <div className={styles.sliderDivider} />

      <div className={styles.slideTitle}>Motif color</div>
      <div className={styles.slideHint}>Choose the color of your motifs.</div>
      <div className={styles.colorDotGrid}>
        {MOTIF_COLORS.map(c => (
          <button
            key={c.id}
            className={`${styles.colorDot} ${motifColor === c.hex ? styles.colorDotSelected : ''}`}
            style={{ backgroundColor: c.hex }}
            onClick={() => setMotifColor(c.hex)}
            aria-label={c.label}
            title={c.label}
          />
        ))}
      </div>
    </div>
  );
}
