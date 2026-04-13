import { useState, useEffect, useRef } from 'react';

const DB_NAME    = 'SyrianDesignArchive';
const DB_VERSION = 1;
const STORE_NAME = 'creations';

export function useIndexedDB() {
  const [images, setImages]   = useState([]);
  const [loading, setLoading] = useState(true);
  const dbRef                 = useRef(null);

  useEffect(() => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => {
      console.error('IndexedDB open error');
      setLoading(false);
    };

    request.onupgradeneeded = (e) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
        store.createIndex('timestamp', 'timestamp', { unique: false });
      }
    };

    request.onsuccess = (e) => {
      dbRef.current = e.target.result;
      loadImages(e.target.result);
    };
  }, []);

  function loadImages(db) {
    const tx    = db.transaction([STORE_NAME], 'readonly');
    const store = tx.objectStore(STORE_NAME);
    const req   = store.getAll();

    req.onsuccess = () => {
      setImages(req.result.reverse()); // newest first
      setLoading(false);
    };
    req.onerror = () => setLoading(false);
  }

  function saveImage(imageData) {
    return new Promise((resolve, reject) => {
      const db    = dbRef.current;
      const tx    = db.transaction([STORE_NAME], 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req   = store.add({ image: imageData, timestamp: new Date().toISOString() });

      req.onsuccess = () => {
        loadImages(db);
        resolve();
      };
      req.onerror = () => reject(req.error);
    });
  }

  function clearImages(password) {
    if (password !== 'Leya2003') return Promise.reject(new Error('Incorrect password'));

    return new Promise((resolve, reject) => {
      const db    = dbRef.current;
      const tx    = db.transaction([STORE_NAME], 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req   = store.clear();

      req.onsuccess = () => {
        setImages([]);
        resolve();
      };
      req.onerror = () => reject(req.error);
    });
  }

  return { images, loading, saveImage, clearImages };
}
