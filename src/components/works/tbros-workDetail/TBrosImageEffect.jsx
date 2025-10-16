import { useState, useRef, useEffect } from "react";
import LazyImage from "@components/common/LazyImage";
import controllIcon from "@assets/icon/controll.svg";
import "./TBrosImageEffect.css";

const TBrosImageEffect = ({
  src,
  alt,
  beforeSrc,
  afterSrc,
  beforeColor,
  afterColor,
  className = ""
}) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const sliderRef = useRef(null);
  const isDraggingRef = useRef(false);

  const updatePosition = (e) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleMouseDown = (e) => {
    e.preventDefault();
    isDraggingRef.current = true;
    updatePosition(e);
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDraggingRef.current) return;
      updatePosition(e);
    };

    const handleMouseUp = () => {
      isDraggingRef.current = false;
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  // If beforeColor and afterColor are provided, use color slider effect
  if (beforeColor && afterColor) {
    return (
      <div className={`tbros-image-effect tbros-slider-effect ${className}`}>
        <div className="tbros-image-effect-wrapper">
          {/* Before Color (Base) */}
          <div
            className="tbros-before-layer"
            style={{ backgroundColor: beforeColor }}
          />

          {/* After Color (Overlay) */}
          <div
            className="tbros-after-layer"
            style={{
              backgroundColor: afterColor,
              clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`
            }}
          />

          {/* Slider Control */}
          <div className="tbros-slider-track" ref={sliderRef}>
            <img
              src={controllIcon}
              alt="Slider control"
              className="tbros-slider-thumb"
              style={{ left: `${sliderPosition}%` }}
              onMouseDown={handleMouseDown}
            />
          </div>
        </div>
      </div>
    );
  }

  // If beforeSrc and afterSrc are provided, use image slider effect
  if (beforeSrc && afterSrc) {
    return (
      <div className={`tbros-image-effect tbros-slider-effect ${className}`}>
        <div className="tbros-image-effect-wrapper">
          {/* Before Image (Base) */}
          <div className="tbros-before-image">
            <LazyImage
              src={beforeSrc}
              alt={`${alt} - Before`}
              className="tbros-image-effect-img"
              effect="blur"
            />
          </div>

          {/* After Image (Overlay) */}
          <div
            className="tbros-after-image"
            style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
          >
            <LazyImage
              src={afterSrc}
              alt={`${alt} - After`}
              className="tbros-image-effect-img"
              effect="blur"
            />
          </div>

          {/* Slider Control */}
          <div className="tbros-slider-track" ref={sliderRef}>
            <img
              src={controllIcon}
              alt="Slider control"
              className="tbros-slider-thumb"
              style={{ left: `${sliderPosition}%` }}
              onMouseDown={handleMouseDown}
            />
          </div>
        </div>
      </div>
    );
  }

  // Default: single image
  return (
    <div className={`tbros-image-effect ${className}`}>
      <div className="tbros-image-effect-wrapper">
        <LazyImage
          src={src}
          alt={alt}
          className="tbros-image-effect-img"
          effect="blur"
        />
      </div>
    </div>
  );
};

export default TBrosImageEffect;
