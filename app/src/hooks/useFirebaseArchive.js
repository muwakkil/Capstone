import { useState, useEffect } from 'react';
import {
  collection, addDoc, getDocs, deleteDoc,
  doc, query, orderBy
} from 'firebase/firestore';
import { db } from '../firebase';

const COLLECTION = 'creations';

export function useFirebaseArchive() {
  const [images, setImages]   = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadImages();
  }, []);

  async function loadImages() {
    try {
      const q        = query(collection(db, COLLECTION), orderBy('timestamp', 'desc'));
      const snapshot = await getDocs(q);
      const items    = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
      setImages(items);
    } catch (err) {
      console.error('Failed to load archive:', err);
    } finally {
      setLoading(false);
    }
  }

  async function saveImage(imageData) {
    const now    = new Date().toISOString();
    const docRef = await addDoc(collection(db, COLLECTION), {
      image:     imageData,
      timestamp: now,
    });
    setImages(prev => [{ id: docRef.id, image: imageData, timestamp: now }, ...prev]);
  }

  async function clearImages(password) {
    if (password !== 'Leya2003') throw new Error('Incorrect password');
    const snapshot = await getDocs(collection(db, COLLECTION));
    await Promise.all(snapshot.docs.map(d => deleteDoc(doc(db, COLLECTION, d.id))));
    setImages([]);
  }

  return { images, loading, saveImage, clearImages };
}
