import { useEffect, useState, useRef } from 'react';
import styles from './MotifSvg.module.css';

const svgCache = {};

export default function MotifSvg({ iconId, color = '#000', size = 60, x = 0, y = 0, rotation = 0, opacity = 1, strokeWidth = 1 }) {
  const [svgHtml, setSvgHtml] = useState('');
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;
    const url = `/icons/${iconId}.svg`;

    if (svgCache[url]) {
      setSvgHtml(stylize(svgCache[url], color, strokeWidth));
      return;
    }

    fetch(url)
      .then(r => r.text())
      .then(raw => {
        svgCache[url] = raw;
        if (mounted.current) setSvgHtml(stylize(raw, color, strokeWidth));
      })
      .catch(() => {});

    return () => { mounted.current = false; };
  }, [iconId]);

  // Re-stylize when color or strokeWidth changes (SVG already cached)
  useEffect(() => {
    const url = `/icons/${iconId}.svg`;
    if (svgCache[url]) setSvgHtml(stylize(svgCache[url], color, strokeWidth));
  }, [color, strokeWidth, iconId]);

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

function stylize(svgText, color, strokeWidth) {
  const sw = strokeWidth.toFixed(2);

  // 1. Replace stroke color in the CSS <style> block
  let result = svgText
    .replace(/stroke:\s*#[0-9a-fA-F]{3,6}/g, `stroke: ${color}`)
    .replace(/stroke="#[0-9a-fA-F]{3,6}"/g, `stroke="${color}"`);

  // 2. Add inline style="stroke-width:Xpx" to every drawing element.
  //    Inline styles always beat class rules in SVG, so this is guaranteed to work.
  result = result.replace(
    /<(polygon|polyline|path|rect|circle|ellipse|line)(\s[^>]*?)?(\s*\/?>)/g,
    (match, tag, attrs = '', close) => {
      // Strip any existing inline style so we don't double-up
      const cleaned = attrs.replace(/\s*style="[^"]*"/, '');
      return `<${tag}${cleaned} style="stroke-width:${sw}px"${close}`;
    }
  );

  return result;
}
