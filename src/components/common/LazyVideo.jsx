import { useEffect, useRef, useState } from 'react';

const LazyVideo = ({
  src,
  className = '',
  autoPlay = true,
  muted = true,
  loop = true,
  playsInline = true,
  poster = null,
  ...props
}) => {
  const videoRef = useRef(null);
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
};

export default LazyVideo;