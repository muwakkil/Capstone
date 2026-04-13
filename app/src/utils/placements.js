// Seeded pseudo-random (for reproducible 'scattered' layouts)
function seededRandom(seed) {
  let s = seed;
  return function () {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

export function generatePlacements(canvasConfig) {
  const { motifs, layoutMode, density, contrastOpacity, primaryColor } = canvasConfig;
  const placements = [];
  const rand = seededRandom(42);

  for (let i = 0; i < density; i++) {
    const motif    = motifs[i % motifs.length];
    const isSecondary = motifs.length > 1 && i % motifs.length !== 0;
    const size     = isSecondary ? 38 : 54;
    const opacity  = isSecondary ? contrastOpacity * 0.65 : contrastOpacity;
    let x, y, rotation;

    switch (layoutMode) {
      case 'radial': {
        const angle  = (i / density) * 2 * Math.PI;
        const radius = 28 + (i % 3) * 8;
        x = 50 + radius * Math.cos(angle);
        y = 50 + radius * Math.sin(angle);
        rotation = (angle * 180) / Math.PI;
        break;
      }
      case 'scattered': {
        x        = 5 + rand() * 90;
        y        = 5 + rand() * 90;
        rotation = rand() * 360;
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

    placements.push({ motif, x, y, size, rotation, opacity, color: primaryColor });
  }

  return placements;
}
