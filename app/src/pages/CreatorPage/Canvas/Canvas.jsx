import { useMemo } from 'react';
import { useCanvas } from '../../../context/CanvasContext';
import { generatePlacements } from '../../../utils/placements';
import MotifSvg from '../../../components/MotifSvg/MotifSvg';
import styles from './Canvas.module.css';

export default function Canvas() {
  const { canvasConfig, canvasRef } = useCanvas();
  const placements = useMemo(() => generatePlacements(canvasConfig), [canvasConfig]);

  const { backgroundImage, backgroundColor, bgTint, textureClass } = canvasConfig;

  return (
    <div className={styles.wrapper}>
      <div
        ref={canvasRef}
        id="canvasArea"
        className={`${styles.canvas} ${textureClass}`}
        style={{ backgroundImage, backgroundColor }}
      >
        <div className={styles.tint} style={{ background: bgTint }} />

        {placements.length === 0 || canvasConfig.motifs[0] === 'icon-01' && canvasConfig.desires?.length === 0 ? (
          <div className={styles.placeholder}>
            choose your desires to begin
          </div>
        ) : null}

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
          />
        ))}
      </div>
    </div>
  );
}
