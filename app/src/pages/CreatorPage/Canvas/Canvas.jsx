import { useMemo } from 'react';
import { useCanvas } from '../../../context/CanvasContext';
import { generatePlacements } from '../../../utils/placements';
import MotifSvg from '../../../components/MotifSvg/MotifSvg';
import styles from './Canvas.module.css';

export default function Canvas() {
  const { canvasConfig, canvasRef, feeling, desires, phrase, era } = useCanvas();
  const placements = useMemo(() => generatePlacements(canvasConfig), [canvasConfig]);

  const { backgroundImage, backgroundColor, eraImage } = canvasConfig;
  const showPlaceholder = !feeling && desires.length === 0 && !phrase && !era;

  return (
    <div className={styles.wrapper}>
      <div
        ref={canvasRef}
        id="canvasArea"
        className={styles.canvas}
        style={{ backgroundImage, backgroundColor }}
      >
        {eraImage && (
          <div
            className={styles.eraOverlay}
            style={{ backgroundImage: `url(${import.meta.env.BASE_URL}${eraImage})` }}
          />
        )}

        {showPlaceholder && (
          <div className={styles.placeholder}>
            begin your design
          </div>
        )}

        {placements.map((p, i) => (
          <MotifSvg
            key={`${p.motif}-${i}`}
            iconId={p.motif}
            color={p.color}
            size={p.size}
            x={p.x}
            y={p.y}
            rotation={p.rotation}
            opacity={p.opacity}
            strokeWidth={p.strokeWidth}
          />
        ))}
      </div>
    </div>
  );
}
