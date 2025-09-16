import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const LazyImage = ({
  src,
  alt,
  className = '',
  placeholderSrc = null,
  effect = 'blur',
  ...props
}) => {
  const defaultPlaceholder = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1"%3E%3Crect width="1" height="1" fill="%23f0f0f0"/%3E%3C/svg%3E';

  return (
    <LazyLoadImage
      alt={alt}
      src={src}
      className={className}
      placeholderSrc={placeholderSrc || defaultPlaceholder}
      effect={effect}
      threshold={100}
      {...props}
    />
  );
};

export default LazyImage;