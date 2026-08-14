// Seeded pseudo-random (for reproducible 'scattered' layouts)
function seededRandom(seed) {
  let s = seed;
  return function () {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

export function generatePlacements(canvasConfig) {
  const { motifs, layoutMode, density, contrastOpacity, primaryColor, strokeWidth = 1, motifBaseSize = 100 } = canvasConfig;
  if (!motifs || motifs.length === 0) return [];
  const placements = [];
  const rand = seededRandom(42);

  for (let i = 0; i < density; i++) {
    const motif    = motifs[i % motifs.length];
    const isSecondary = motifs.length > 1 && i % motifs.length !== 0;
    const size     = isSecondary ? motifBaseSize * 0.72 : motifBaseSize;
    const opacity  = isSecondary ? contrastOpacity * 0.85 : contrastOpacity;
    let x, y, rotation;

    switch (layoutMode) {
      case 'radial': {
        // Single evenly-spaced ring — no overlap, clean circular arrangement
        const angle = (i / density) * 2 * Math.PI;
        const radius = 30;
        x = 50 + radius * Math.cos(angle);
        y = 50 + radius * Math.sin(angle);
        rotation = (angle * 180) / Math.PI;
        break;
      }
      case 'scattered': {
        // Jittered grid: divide canvas into cells, one icon per cell with random offset
        // 4 cols × 3 rows = 12 cells, each cell 20% wide × 27% tall
        const cols      = 4;
        const rows      = Math.ceil(density / cols);
        const col       = i % cols;
        const row       = Math.floor(i / cols);
        const cellW     = 76 / cols;   // usable width split into cols
        const cellH     = 76 / rows;   // usable height split into rows
        const jitterX   = (rand() - 0.5) * cellW * 0.5;
        const jitterY   = (rand() - 0.5) * cellH * 0.5;
        x = 12 + col * cellW + cellW / 2 + jitterX;
        y = 12 + row * cellH + cellH / 2 + jitterY;
        rotation = rand() * 360;
        break;
      }
      case 'fruitoflife': {
        // Fruit of Life: 1 center + 6 inner ring + 6 outer ring (13 nodes total)
        // y-radius is scaled by 16/9 to compensate for the 16:9 canvas so rings look circular
        const folPositions = (() => {
          const cx = 50, cy = 50;
          const xr1 = 12, yr1 = xr1 * (16 / 9); // inner ring
          const xr2 = 24, yr2 = xr2 * (16 / 9); // outer ring
          const pts = [[cx, cy]];
          for (let k = 0; k < 6; k++) {
            const a = (k / 6) * 2 * Math.PI;
            pts.push([cx + xr1 * Math.cos(a), cy + yr1 * Math.sin(a)]);
          }
          for (let k = 0; k < 6; k++) {
            const a = (k / 6) * 2 * Math.PI;
            pts.push([cx + xr2 * Math.cos(a), cy + yr2 * Math.sin(a)]);
          }
          return pts;
        })();
        [x, y] = folPositions[i % folPositions.length];
        rotation = 0;
        break;
      }
      case 'dense': {
        const cols = Math.ceil(Math.sqrt(density * 1.8));
        const col  = i % cols;
        const row  = Math.floor(i / cols);
        x = (col / (cols - 1 || 1)) * 90 + 5;
        y = (row / (Math.ceil(density / cols) - 1 || 1)) * 85 + 5;
        rotation = (i % 4) * 90;
        break;
      }
      case 'grid':
      default: {
        const cols = Math.ceil(Math.sqrt(density));
        const col  = i % cols;
        const row  = Math.floor(i / cols);
        x = (col / (cols - 1 || 1)) * 84 + 8;
        y = (row / (Math.ceil(density / cols) - 1 || 1)) * 80 + 8;
        rotation = 0;
        break;
      }
    }

    placements.push({ motif, x, y, size, rotation, opacity, color: primaryColor, strokeWidth });
  }

  return placements;
}
