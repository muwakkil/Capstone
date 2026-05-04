import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useCurtain } from '../context/CurtainContext';

const IDLE_MS = 60_000; // 1 minute

export default function useIdleRedirect() {
  const { curtainNavigate } = useCurtain();
  const { pathname } = useLocation();
  const timer = useRef(null);

  useEffect(() => {
    // Only run on non-landing pages — landing page has its own curtain logic
    if (pathname === '/') return;

    const reset = () => {
      clearTimeout(timer.current);
      timer.current = setTimeout(() => {
        curtainNavigate('/');
      }, IDLE_MS);
    };

    const events = ['mousemove', 'mousedown', 'keydown', 'touchstart', 'scroll'];
    events.forEach(e => document.addEventListener(e, reset, { passive: true }));
    reset(); // start the timer immediately on page load

    return () => {
      clearTimeout(timer.current);
      events.forEach(e => document.removeEventListener(e, reset));
    };
  }, [pathname, curtainNavigate]);
}
