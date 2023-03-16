import { useState, useEffect } from 'react';

export function useMoving(el) {
  const [moving, setMoving] = useState(false);

  useEffect(() => {
    if (!el) {
      return;
    }
    const event = (_) => {
      setMoving(true);
    };
    el.addEventListener('mousedown', event);
    return () => {
      el.removeEventListener('mousedown', event);
    };
  }, [el]);

  useEffect(() => {
    const event = (_) => {
      setMoving(false);
    };
    document.addEventListener('mouseup', event);
    return () => {
      document.removeEventListener('mouseup', event);
    };
  }, []);

  return { moving };
}
