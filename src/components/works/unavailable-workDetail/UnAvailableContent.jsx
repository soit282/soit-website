import { useEffect, useState, useRef } from "react";
import LazyImage from "@components/common/LazyImage";
import "./UnAvailableContent.css";
import "@styles/grid-system.css";

const UnAvailableContent = () => {
  const [visibleItems, setVisibleItems] = useState(new Set());
  const observerRef = useRef(null);

  // Define all UnAvailable assets in order with grid positions
  const unavailableAssets = [
    {
      id: 1,
      src: "/2_Workspage/2_Works page/UnAvailable/UnAvailable_1.jpg",
      type: "image",
      title: "UnAvailable 1",
      description: "Brand visual 1",
      gridColumn: "1 / span 12",
    },
    {
      id: 2,
      src: "/2_Workspage/2_Works page/UnAvailable/UnAvailable_2 (COVER).jpg",
      type: "image",
      title: "Cover Image",
      description: "Brand cover visual",
      gridColumn: "1 / span 12",
    },
    {
      id: 3,
      src: "/2_Workspage/2_Works page/UnAvailable/UnAvailable_3.jpg",
      type: "image",
      title: "UnAvailable 3",
      description: "Brand visual 3",
      gridColumn: "1 / span 12",
    },
    {
      id: 4,
      src: "/2_Workspage/2_Works page/UnAvailable/UnAvailable_4.jpg",
      type: "image",
      title: "UnAvailable 4",
      description: "Brand visual 4",
      gridColumn: "1 / span 12",
    },
    {
      id: 5,
      src: "/2_Workspage/2_Works page/UnAvailable/UnAvailable_5.jpg",
      type: "image",
      title: "UnAvailable 5",
      description: "Brand visual 5",
      gridColumn: "1 / span 12",
    },
    {
      id: 6,
      src: "/2_Workspage/2_Works page/UnAvailable/UnAvailable_6.jpg",
      type: "image",
      title: "UnAvailable 6",
      description: "Brand visual 6",
      gridColumn: "1 / span 12",
    },
    {
      id: 7,
      src: "/2_Workspage/2_Works page/UnAvailable/UnAvailable_7.jpg",
      type: "image",
      title: "UnAvailable 7",
      description: "Brand visual 7",
      gridColumn: "1 / span 12",
    },
    {
      id: 8,
      src: "/2_Workspage/2_Works page/UnAvailable/UnAvailable_8.jpg",
      type: "image",
      title: "UnAvailable 8",
      description: "Brand visual 8",
      gridColumn: "1 / span 12",
    },
    {
      id: 9,
      src: "/2_Workspage/2_Works page/UnAvailable/UnAvailable_9.jpg",
      type: "image",
      title: "UnAvailable 9",
      description: "Brand visual 9",
      gridColumn: "1 / span 12",
    },
    {
      id: 10,
      src: "/2_Workspage/2_Works page/UnAvailable/UnAvailable_10.jpg",
      type: "image",
      title: "UnAvailable 10",
      description: "Brand visual 10",
      gridColumn: "1 / span 12",
    },
    {
      id: 11,
      src: "/2_Workspage/2_Works page/UnAvailable/UnAvailable_11 (HOVER).jpg",
      type: "image",
      title: "UnAvailable 11",
      description: "Brand visual 11",
      gridColumn: "1 / span 12",
      hoverSrc: "/2_Workspage/2_Works page/UnAvailable/UnAvailable_2 (COVER).jpg",
      hoverType: "image",
    },
    {
      id: 12,
      src: "/2_Workspage/2_Works page/UnAvailable/UnAvailable_12.jpg",
      type: "image",
      title: "UnAvailable 12",
      description: "Brand visual 12",
      gridColumn: "1 / span 12",
    },
  ];

  // Set up intersection observer for lazy loading
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const itemId = parseInt(entry.target.dataset.id);
            setVisibleItems((prev) => new Set([...prev, itemId]));
          }
        });
      },
      { threshold: 0.01, rootMargin: "100px" } // Optimized for smoother loading
    );

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  // Setup observer for each item
  const setupObserver = (element, itemId) => {
    if (element && observerRef.current) {
      element.dataset.id = itemId;
      observerRef.current.observe(element);
    }
  };

  const renderMediaItem = (asset) => {
    const isVisible = visibleItems.has(asset.id);
    const hasHover = asset.hoverSrc && asset.hoverType;

    return (
      <div
        key={asset.id}
        className={`unavailable-media-item ${hasHover ? 'has-hover' : ''}`}
        ref={(el) => setupObserver(el, asset.id)}
        data-id={asset.id}
        data-visible={isVisible}
        style={{ gridColumn: asset.gridColumn }}
      >
        <div
          className="unavailable-media-wrapper"
          style={
            asset.customAspectRatio
              ? { aspectRatio: asset.customAspectRatio }
              : { aspectRatio: "3/2" }
          }
        >
          {isVisible ? (
            <>
              {/* Default media */}
              <LazyImage
                src={asset.src}
                alt={asset.title}
                className={`unavailable-media ${hasHover ? 'unavailable-media-default' : ''}`}
                effect="blur"
              />

              {/* Hover media */}
              {hasHover && (
                <img
                  src={asset.hoverSrc}
                  alt={`${asset.title} Hover`}
                  className="unavailable-media unavailable-media-hover"
                  loading="lazy"
                />
              )}
            </>
          ) : (
            <div className="unavailable-media-placeholder" />
          )}
        </div>
      </div>
    );
  };

  return (
    <section className="unavailable-content">
      <div className="grid-container unavailable-media-grid">
        {unavailableAssets.map(renderMediaItem)}
      </div>
    </section>
  );
};

export default UnAvailableContent;
