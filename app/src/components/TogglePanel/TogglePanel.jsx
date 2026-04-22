import { useCanvas } from '../../context/CanvasContext';
import Slide1Feeling  from './slides/Slide1Feeling';
import Slide2Desire   from './slides/Slide2Desire';
import Slide3Phrase   from './slides/Slide3Phrase';
import Slide4Passion  from './slides/Slide4Passion';
import Slide5Era      from './slides/Slide5Era';
import SlideCreate    from './slides/SlideCreate';
import styles from './TogglePanel.module.css';

const SLIDES = [
  Slide1Feeling,
  Slide2Desire,
  Slide3Phrase,
  Slide4Passion,
  Slide5Era,
  SlideCreate,
];

const SLIDE_LABELS = ['Feeling', 'Desire', 'Phrase', 'Boldness', 'Era', 'Create'];

export default function TogglePanel() {
  const { currentSlide, panelOpen, setPanelOpen, goNext, goBack, TOTAL_SLIDES } = useCanvas();

  const SlideComponent = SLIDES[currentSlide];
  const isLast = currentSlide === TOTAL_SLIDES;

  if (!panelOpen) {
    return (
      <button className={styles.openBtn} onClick={() => setPanelOpen(true)}>
        Open Panel
      </button>
    );
  }

  return (
    <div className={styles.panel}>
      <div className={styles.header}>
        <span className={styles.progress}>
          {SLIDE_LABELS[currentSlide]}  {currentSlide + 1} / {TOTAL_SLIDES + 1}
        </span>
        <button className={styles.closeBtn} onClick={() => setPanelOpen(false)} aria-label="Close">✕</button>
      </div>

      <div className={styles.body}>
        <SlideComponent />
      </div>

      <div className={styles.footer}>
        <button className={styles.btn} onClick={goBack} disabled={currentSlide === 0}>
          ← Back
        </button>
        {!isLast && (
          <button className={`${styles.btn} ${styles.btnPrimary}`} onClick={goNext}>
            Next →
          </button>
        )}
      </div>
    </div>
  );
}
