import { useNavigate } from 'react-router-dom';
import { useCanvas } from '../../../context/CanvasContext';
import { useCanvasSave } from '../../../hooks/useCanvasSave';
import { useFirebaseArchive } from '../../../hooks/useFirebaseArchive';
import styles from './slides.module.css';

export default function SlideCreate() {
  const { feeling, desires, phrase, passionLevel, intentionSize, motifColor, era, canvasRef, setPanelOpen } = useCanvas();
  const { saveCanvas, saving } = useCanvasSave(canvasRef);
  const { saveImage } = useFirebaseArchive();
  const navigate = useNavigate();

  async function handleSave() {
    const imageData = await saveCanvas();
    if (imageData) {
      await saveImage(imageData);
      navigate('/archive');
    }
  }

  return (
    <div className={styles.createSlide}>
      <div className={styles.slideTitle}>Your composition</div>

      <div className={styles.summaryList}>
        <div className={styles.summaryItem}>
          <span className={styles.summaryKey}>Meaning</span>
          <span>{desires.length > 0 ? desires.map(d => d.label).join(', ') : '—'}</span>
        </div>
        <div className={styles.summaryItem}>
          <span className={styles.summaryKey}>Era</span>
          <span>{era ? era.label : '—'}</span>
        </div>
        <div className={styles.summaryItem}>
          <span className={styles.summaryKey}>Phrase</span>
          <span className={styles.summaryArabic}>{phrase ? phrase.arabic : '—'}</span>
        </div>
        <div className={styles.summaryItem}>
          <span className={styles.summaryKey}>Size</span>
          <span>{intentionSize}%</span>
        </div>
        <div className={styles.summaryItem}>
          <span className={styles.summaryKey}>Boldness</span>
          <span>{passionLevel}%</span>
        </div>
        <div className={styles.summaryItem}>
          <span className={styles.summaryKey}>Feeling</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            {feeling ? feeling.label : '—'}
            <span
              title="Background color"
              style={{
                display: 'inline-block',
                width: 14,
                height: 14,
                borderRadius: '50%',
                backgroundColor: feeling ? feeling.hex : 'transparent',
                border: '1px solid rgba(0,0,0,0.2)',
              }}
            />
            <span
              title="Motif color"
              style={{
                display: 'inline-block',
                width: 14,
                height: 14,
                borderRadius: '50%',
                backgroundColor: motifColor,
                border: '1px solid rgba(0,0,0,0.2)',
              }}
            />
          </span>
        </div>
      </div>

      <button className={styles.createBtn} onClick={handleSave} disabled={saving}>
        {saving ? 'Saving...' : 'Save to Archive'}
      </button>

      <br />
      <button className={styles.keepEditing} onClick={() => setPanelOpen(false)}>
        Keep editing
      </button>
    </div>
  );
}
