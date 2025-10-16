import { useState, useEffect } from "react";
import LazyVideo from "@components/common/LazyVideo";
import "./TBros8HoverEffect.css";

const TBros8HoverEffect = ({
  defaultSrc,
  defaultType = "image",
  hoverSrc,
  hoverType = "image",
  alt = "TBROS 8",
  className = "",
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [hoverImageLoaded, setHoverImageLoaded] = useState(false);

  // Preload hover image
  useEffect(() => {
    if (hoverSrc && hoverType === "image") {
      const img = new Image();
      img.onload = () => setHoverImageLoaded(true);
      img.src = hoverSrc;
    }
  }, [hoverSrc, hoverType]);

  return (
    <div
      className={`tbros8-hover-effect ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="tbros8-hover-wrapper">
        {/* Default State */}
        {defaultType === "video" ? (
          <LazyVideo
            src={defaultSrc}
            className={`tbros8-media tbros8-media-default ${isHovered ? "hidden" : ""}`}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          />
        ) : (
          <img
            src={defaultSrc}
            alt={alt}
            className={`tbros8-media tbros8-media-default ${isHovered ? "hidden" : ""}`}
          />
        )}

        {/* Hover State */}
        {hoverSrc && (
          <>
            {hoverType === "video" ? (
              <LazyVideo
                src={hoverSrc}
                className={`tbros8-media tbros8-media-hover ${isHovered ? "visible" : ""}`}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
              />
            ) : (
              <img
                src={hoverSrc}
                alt={`${alt} - Hover`}
                className={`tbros8-media tbros8-media-hover ${isHovered ? "visible" : ""}`}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default TBros8HoverEffect;
