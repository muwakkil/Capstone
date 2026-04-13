import { LEARN_SECTIONS } from '../../data/learnData';
import styles from './LearnPage.module.css';

export default function LearnPage() {
  return (
    <div className={styles.page}>
      {LEARN_SECTIONS.map(section => (
        <div key={section.id} className={styles.section}>
          <h2 className={styles.sectionTitle}>{section.title}</h2>

          {section.body && <p className={styles.body}>{section.body}</p>}
          {section.attribution && <p className={styles.attribution}>{section.attribution}</p>}

          {section.motifs && (
            <div className={styles.motifsList}>
              {section.motifs.map(m => (
                <div key={m.icon} className={styles.motifRow}>
                  <img src={`/icons/${m.icon}.svg`} alt={m.name} className={styles.motifIcon} />
                  <div>
                    <div className={styles.motifName}>{m.name}</div>
                    <div className={styles.motifDesc}>{m.description}</div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {section.links && (
            <div className={styles.linkList}>
              {section.links.map(l => (
                <a key={l.label} href={l.url} target="_blank" rel="noopener noreferrer" className={styles.link}>
                  {l.label}
                </a>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
