import { useNavigate } from 'react-router-dom';
import { useCanvas } from '../../../context/CanvasContext';
import { useCanvasSave } from '../../../hooks/useCanvasSave';
import { useIndexedDB } from '../../../hooks/useIndexedDB';
import styles from './slides.module.css';

export default function SlideSave() {
  const { canvasRef, setPanelOpen } = useCanvas();
  const { saveCanvas, saving } = useCanvasSave(canvasRef);
  const { saveImage } = useIndexedDB();
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
      <div className={styles.slideTitle}>Save your work</div>
      <p className={styles.saveHint}>Happy with your composition? Save it to your archive.</p>

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
