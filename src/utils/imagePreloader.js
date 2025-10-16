/**
 * Global image preloader utility to avoid duplicate preloading
 * across multiple components
 */

const preloadedImages = new Set();
const preloadingImages = new Map();

/**
 * Preload images with deduplication
 * @param {string[]} urls - Array of image URLs to preload
 * @param {number} delay - Delay in ms before starting preload (default: 0)
 * @returns {Promise<void>}
 */
export const preloadImages = (urls, delay = 0) => {
  return new Promise((resolve) => {
    const executePreload = () => {
      const promises = urls.map(url => {
        // Skip if already preloaded
        if (preloadedImages.has(url)) {
          return Promise.resolve();
        }

        // Return existing promise if currently preloading
        if (preloadingImages.has(url)) {
          return preloadingImages.get(url);
        }

        // Create new preload promise
        const promise = new Promise((resolveImg, rejectImg) => {
          const img = new Image();
          img.onload = () => {
            preloadedImages.add(url);
            preloadingImages.delete(url);
            resolveImg();
          };
          img.onerror = () => {
            preloadingImages.delete(url);
            rejectImg(new Error(`Failed to preload image: ${url}`));
          };
          img.src = url;
        });

        preloadingImages.set(url, promise);
        return promise;
      });

      Promise.allSettled(promises).then(() => resolve());
    };

    if (delay > 0) {
      if ('requestIdleCallback' in window) {
        requestIdleCallback(executePreload, { timeout: delay });
      } else {
        setTimeout(executePreload, delay);
      }
    } else {
      executePreload();
    }
  });
};

/**
 * Check if an image is already preloaded
 * @param {string} url - Image URL
 * @returns {boolean}
 */
export const isPreloaded = (url) => {
  return preloadedImages.has(url);
};

/**
 * Clear preload cache (useful for testing or memory management)
 */
export const clearPreloadCache = () => {
  preloadedImages.clear();
  preloadingImages.clear();
};
