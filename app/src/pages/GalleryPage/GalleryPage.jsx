import { useIndexedDB } from '../../hooks/useIndexedDB';
import styles from './GalleryPage.module.css';

export default function GalleryPage() {
  const { images, loading, clearImages } = useIndexedDB();

  function handleClear() {
    const pw = prompt('Enter password to clear the archive:');
    if (!pw) return;
    clearImages(pw).catch(() => alert('Incorrect password.'));
  }

  function formatDate(iso) {
    return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  }

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <h1 className={styles.title}>Archive</h1>
        <button className={styles.clearBtn} onClick={handleClear}>Clear Gallery</button>
      </div>

      {loading && <div className={styles.loading}>Loading...</div>}

      {!loading && images.length === 0 && (
        <div className={styles.empty}>No creations yet. Go make something.</div>
      )}

      <div className={styles.grid}>
        {images.map(item => (
          <div key={item.id} className={styles.card}>
            <img src={item.image} alt="creation" className={styles.cardImg} />
            <div className={styles.cardFooter}>
              <span className={styles.timestamp}>{formatDate(item.timestamp)}</span>
              <a
                href={item.image}
                download={`speaking-in-motifs-${item.id}.png`}
                className={styles.downloadBtn}
              >
                Download
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
