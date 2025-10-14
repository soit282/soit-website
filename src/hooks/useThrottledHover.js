import { useState, useRef, useCallback } from 'react';

/**
 * RAF-throttled hover hook to prevent interrupting smooth scroll
 * Batches hover state changes to next animation frame
 */
export const useThrottledHover = (initialState = false) => {
  const [isHovered, setIsHovered] = useState(initialState);
  const rafIdRef = useRef(null);
  const pendingStateRef = useRef(null);

  const handleMouseEnter = useCallback(() => {
    pendingStateRef.current = true;

    // Cancel previous RAF if exists
    if (rafIdRef.current !== null) {
      cancelAnimationFrame(rafIdRef.current);
    }

    // Schedule state update for next frame
    rafIdRef.current = requestAnimationFrame(() => {
      setIsHovered(pendingStateRef.current);
      rafIdRef.current = null;
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    pendingStateRef.current = false;

    // Cancel previous RAF if exists
    if (rafIdRef.current !== null) {
      cancelAnimationFrame(rafIdRef.current);
    }

    // Schedule state update for next frame
    rafIdRef.current = requestAnimationFrame(() => {
      setIsHovered(pendingStateRef.current);
      rafIdRef.current = null;
    });
  }, []);

  // Cleanup on unmount
  const cleanup = useCallback(() => {
    if (rafIdRef.current !== null) {
      cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = null;
    }
  }, []);

  return [isHovered, handleMouseEnter, handleMouseLeave, cleanup];
};

export default useThrottledHover;
