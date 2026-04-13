import { useEffect, useState, useRef } from 'react';
import styles from './MotifSvg.module.css';

const svgCache = {};

export default function MotifSvg({ iconId, color = '#000', size = 60, x = 0, y = 0, rotation = 0, opacity = 1 }) {
  const [svgHtml, setSvgHtml] = useState('');
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;
    const url = `/icons/${iconId}.svg`;

    if (svgCache[url]) {
      setSvgHtml(colorize(svgCache[url], color));
      return;
    }

    fetch(url)
      .then(r => r.text())
      .then(raw => {
        svgCache[url] = raw;
        if (mounted.current) setSvgHtml(colorize(raw, color));
      })
      .catch(() => {});

    return () => { mounted.current = false; };
  }, [iconId]);

  // Re-colorize when color changes (SVG already cached)
  useEffect(() => {
    const url = `/icons/${iconId}.svg`;
    if (svgCache[url]) setSvgHtml(colorize(svgCache[url], color));
  }, [color, iconId]);

  return (
    <span
      className={styles.wrapper}
      style={{
        left:      `${x}%`,
        top:       `${y}%`,
        width:     size,
        height:    size,
        transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
        opacity,
      }}
      dangerouslySetInnerHTML={{ __html: svgHtml }}
    />
  );
}

function colorize(svgText, color) {
  // Replace stroke color on all path/polygon/polyline/rect elements
  return svgText
    .replace(/stroke:\s*#[0-9a-fA-F]{3,6}/g, `stroke: ${color}`)
    .replace(/stroke="#[0-9a-fA-F]{3,6}"/g, `stroke="${color}"`);
}
