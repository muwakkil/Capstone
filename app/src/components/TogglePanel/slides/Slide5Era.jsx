import { useCanvas } from '../../../context/CanvasContext';
import { ERAS } from '../../../data/toggleData';
import styles from './slides.module.css';

export default function Slide5Era() {
  const { era, setEra } = useCanvas();

  return (
    <div>
      <div className={styles.slideTitle}>What Syrian Visual Context connects to you?</div>
      <div className={styles.slideHint}>This layers an image from that period behind your motifs.</div>
      <div className={styles.eraList}>
        {ERAS.map(e => (
          <div
            key={e.id}
            className={`${styles.eraCard} ${era?.id === e.id ? styles.selected : ''}`}
            onClick={() => setEra(e)}
            style={era?.id === e.id ? { borderColor: 'var(--color-dark)', background: e.bgTint } : {}}
          >
            <div className={styles.eraPeriod}>{e.period}</div>
            <div className={styles.eraName}>{e.label}</div>
            <div className={styles.eraDesc}>{e.description}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
