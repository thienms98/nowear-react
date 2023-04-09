import { useState, useEffect } from 'react';

export default function useDebounce(value, delay) {
  const [debounce, setDebounce] = useState('');

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebounce(value);
    }, delay);
    return () => {
      clearTimeout(timeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return debounce;
}
