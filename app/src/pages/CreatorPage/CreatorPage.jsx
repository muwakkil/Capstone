import Canvas from './Canvas/Canvas';
import TogglePanel from '../../components/TogglePanel/TogglePanel';
import styles from './CreatorPage.module.css';

export default function CreatorPage() {

  return (
    <div className={styles.page}>
      <Canvas />
      <TogglePanel />
    </div>
  );
}
