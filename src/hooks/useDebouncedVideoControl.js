import { useRef, useEffect } from 'react';

/**
 * Debounced video control to prevent interrupting smooth scroll
 * Only pause/play video after hover has been stable for a delay
 */
export const useDebouncedVideoControl = (videoRef, delay = 150) => {
  const timeoutRef = useRef(null);
  const isHoveredRef = useRef(false);

  const handleMouseEnter = () => {
    isHoveredRef.current = true;

    // Clear existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Debounce: only pause after delay
    timeoutRef.current = setTimeout(() => {
      if (isHoveredRef.current && videoRef.current) {
        videoRef.current.pause();
      }
    }, delay);
  };

  const handleMouseLeave = () => {
    isHoveredRef.current = false;

    // Clear existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Debounce: only play after delay
    timeoutRef.current = setTimeout(() => {
      if (!isHoveredRef.current && videoRef.current) {
        videoRef.current.play().catch(() => {
          // Ignore play errors
        });
      }
    }, delay);
  };

  // Cleanup
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return { handleMouseEnter, handleMouseLeave };
};

export default useDebouncedVideoControl;
