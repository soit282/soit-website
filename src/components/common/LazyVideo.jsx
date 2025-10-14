import { useEffect, useRef, useState, forwardRef } from 'react';

const LazyVideo = forwardRef(({
  src,
  className = '',
  autoPlay = true,
  muted = true,
  loop = true,
  playsInline = true,
  poster = null,
  ...props
}, ref) => {
  const internalRef = useRef(null);
  const videoRef = ref || internalRef;
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isInView) {
          setIsInView(true);
        }
      },
      { threshold: 0.1, rootMargin: '100px' }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, [isInView]);

  useEffect(() => {
    if (isInView && videoRef.current) {
      videoRef.current.load();
      setIsLoaded(true);
    }
  }, [isInView]);

  return (
    <video
      ref={videoRef}
      className={`${className} ${!isLoaded ? 'lazy-video-loading' : ''}`}
      autoPlay={isInView && autoPlay}
      muted={muted}
      loop={loop}
      playsInline={playsInline}
      poster={poster}
      {...props}
    >
      {isInView && <source src={src} />}
    </video>
  );
});

LazyVideo.displayName = 'LazyVideo';

export default LazyVideo;