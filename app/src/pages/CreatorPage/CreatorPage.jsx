import { useCanvas } from '../../context/CanvasContext';
import Canvas from './Canvas/Canvas';
import TogglePanel from '../../components/TogglePanel/TogglePanel';
import styles from './CreatorPage.module.css';

export default function CreatorPage() {
  const { resetAll } = useCanvas();

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <span className={styles.headerTitle}>Speaking in Motifs</span>
        <button className={styles.resetBtn} onClick={resetAll}>Reset</button>
      </div>
      <Canvas />
      <TogglePanel />
    </div>
  );
}
