import { useCanvas } from '../../../context/CanvasContext';
import { PHRASES } from '../../../data/toggleData';
import styles from './slides.module.css';

export default function Slide3Phrase() {
  const { phrase, setPhrase } = useCanvas();

  return (
    <div>
      <div className={styles.slideTitle}>A phrase for today</div>
      <div className={styles.slideHint}>Your choice shapes how your motifs arrange themselves.</div>
      <div className={styles.phraseList}>
        {PHRASES.map(p => (
          <div
            key={p.id}
            className={`${styles.phraseCard} ${phrase?.id === p.id ? styles.selected : ''}`}
            onClick={() => setPhrase(p)}
          >
            <div className={styles.phraseArabic}>{p.arabic}</div>
            <div className={styles.phraseTranslit}>{p.transliteration}</div>
            <div className={styles.phraseTranslation}>{p.translation}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
