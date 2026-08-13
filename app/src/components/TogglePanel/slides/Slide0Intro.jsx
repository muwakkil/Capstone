import styles from './slides.module.css';

export default function Slide0Intro() {
  return (
    <div className={styles.introSlide}>
      <div className={styles.slideTitle}>Intro</div>
      <p className={styles.introBody}>
        Syrian motifs are more than decoration. Through symbols, patterns, color,
        and composition, visual elements can carry meaning and reflect the history,
        culture, and environments that inspired them. As you move through each
        section, you'll learn about these elements and use them to build a creation
        of your own.
      </p>
    </div>
  );
}
