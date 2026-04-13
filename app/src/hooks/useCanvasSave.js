import { useState } from 'react';
import html2canvas from 'html2canvas';

export function useCanvasSave(canvasRef) {
  const [saving, setSaving] = useState(false);

  async function saveCanvas() {
    if (!canvasRef.current) return null;
    setSaving(true);
    try {
      const canvas = await html2canvas(canvasRef.current, {
        backgroundColor: '#ffffff',
        scale: 2,
        useCORS: true,
      });

      return new Promise((resolve, reject) => {
        canvas.toBlob(blob => {
          const reader     = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.onerror   = reject;
          reader.readAsDataURL(blob);
        }, 'image/png');
      });
    } finally {
      setSaving(false);
    }
  }

  return { saveCanvas, saving };
}
