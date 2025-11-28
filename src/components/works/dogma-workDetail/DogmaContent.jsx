import { useEffect, useState, useRef } from "react";
import LazyImage from "@components/common/LazyImage";
import LazyVideo from "@components/common/LazyVideo";
import "./DogmaContent.css";
import "@styles/grid-system.css";

const DogmaContent = () => {
  // Initialize with first 3 items visible to avoid IntersectionObserver issues on production
  const [visibleItems, setVisibleItems] = useState(new Set([1, 2, 3]));
  const [preloadedVideos, setPreloadedVideos] = useState(new Set());
  const observerRef = useRef(null);

  // Define all DOGMA assets in order with grid positions
  const dogmaAssets = [
    {
      id: 1,
      src: "/2_Workspage/2_Works page/Dogma/3. Final upload/Dogma_1_Namecard.jpg",
      type: "image",
      title: "Business Card",
      description: "Professional identity materials",
      gridColumn: "1 / span 12",
    },
    {
      id: 2,
      src: "/2_Workspage/2_Works page/Dogma/3. Final upload/Dogma_2_Logo.jpg",
      type: "image",
      title: "Logo Design",
      description: "Brand mark and logomark system",
      gridColumn: "1 / span 12",
    },
    {
      id: 3,
      src: "/2_Workspage/2_Works page/Dogma/3. Final upload/Dogma_3_Logo rationale.mp4",
      type: "video",
      title: "Logo Rationale",
      description: "Brand identity concept and development",
      gridColumn: "1 / span 12",
    },
    {
      id: 4,
      src: "/2_Workspage/2_Works page/Dogma/3. Final upload/Dogma_4_Stationery (HOVER).jpg",
      type: "image",
      title: "Stationery System",
      description: "Complete stationery design",
      gridColumn: "1 / span 12",
      hoverSrc: "/2_Workspage/2_Works page/Dogma/3. Final upload/Dogma_10_Poster_1 (COVER).mp4",
      hoverType: "video",
    },
    {
      id: 5,
      src: "/2_Workspage/2_Works page/Dogma/3. Final upload/Dogma_5_Colors.jpg",
      type: "image",
      title: "Color Palette",
      description: "Brand color system",
      gridColumn: "1 / span 12",
      customAspectRatio: "3/1",
    },
    {
      id: 6,
      src: "/2_Workspage/2_Works page/Dogma/3. Final upload/Dogma_6_Colors.mp4",
      type: "video",
      title: "Color Exploration",
      description: "Brand color exploration and system",
      gridColumn: "1 / span 12",
    },
    {
      id: 7,
      src: "/2_Workspage/2_Works page/Dogma/3. Final upload/Dogma_7_Typeface.mp4",
      type: "video",
      title: "Typography System",
      description: "Custom typography design",
      gridColumn: "1 / span 12",
    },
    {
      id: 8,
      src: "/2_Workspage/2_Works page/Dogma/3. Final upload/Dogma_8_Sub logo.jpg",
      type: "image",
      title: "Sub Logo",
      description: "Secondary logo variations",
      gridColumn: "1 / span 12",
    },
    {
      id: 9,
      src: "/2_Workspage/2_Works page/Dogma/3. Final upload/Dogma_9_Shelf system.mp4",
      type: "video",
      title: "Shelf System",
      description: "Product display and merchandising",
      gridColumn: "1 / span 12",
    },
    {
      id: 10,
      src: "/2_Workspage/2_Works page/Dogma/3. Final upload/Dogma_10_Poster_1 (COVER).mp4",
      type: "video",
      title: "Poster Design",
      description: "Brand communication materials",
      gridColumn: "1 / span 12",
    },
    {
      id: 11,
      src: "/2_Workspage/2_Works page/Dogma/3. Final upload/Dogma_11a_Mock up.jpg",
      type: "image",
      title: "Mockup - Part A",
      description: "Brand application mockups",
      gridColumn: "1 / span 6",
      customAspectRatio: "155/208",
    },
    {
      id: 12,
      src: "/2_Workspage/2_Works page/Dogma/3. Final upload/Dogma_11b_Mock up.jpg",
      type: "image",
      title: "Mockup - Part B",
      description: "Additional brand applications",
      gridColumn: "7 / span 6",
      customAspectRatio: "155/208",
    },
    {
      id: 14,
      src: "/2_Workspage/2_Works page/Dogma/3. Final upload/Dogma_12_Stamp.mp4",
      type: "video",
      title: "Brand Stamp",
      description: "Brand stamp animation",
      gridColumn: "1 / span 12",
    },
    {
      id: 15,
      src: "/2_Workspage/2_Works page/Dogma/3. Final upload/Dogma_13_Megaphone graphic_1.mp4",
      type: "video",
      title: "Graphic Element 1",
      description: "Brand graphic system",
      gridColumn: "1 / span 12",
    },
    {
      id: 16,
      src: "/2_Workspage/2_Works page/Dogma/3. Final upload/Dogma_14_Megaphone graphic_2.mp4",
      type: "video",
      title: "Graphic Element 2",
      description: "Additional graphic elements",
      gridColumn: "1 / span 12",
    },
    {
      id: 17,
      src: "/2_Workspage/2_Works page/Dogma/3. Final upload/Dogma_15_Story.mp4",
      type: "video",
      title: "Brand Story",
      description: "Brand narrative and storytelling",
      gridColumn: "1 / span 12",
    },
    {
      id: 18,
      src: "/2_Workspage/2_Works page/Dogma/3. Final upload/Dogma_16_Insta.jpg",
      type: "image",
      title: "Social Media",
      description: "Instagram and social media presence",
      gridColumn: "1 / span 12",
    },
    {
      id: 19,
      src: "/2_Workspage/2_Works page/Dogma/3. Final upload/Dogma_17a_Mock up.jpg",
      type: "image",
      title: "Application Mockup A",
      description: "Brand touchpoint applications",
      gridColumn: "1 / span 6",
      customAspectRatio: "155/208",
    },
    {
      id: 20,
      src: "/2_Workspage/2_Works page/Dogma/3. Final upload/Dogma_17b_Mock up.jpg",
      type: "image",
      title: "Application Mockup B",
      description: "Additional touchpoints",
      gridColumn: "7 / span 6",
      customAspectRatio: "155/208",
    },
    {
      id: 22,
      src: "/2_Workspage/2_Works page/Dogma/3. Final upload/Dogma_18_Space.jpg",
      type: "image",
      title: "Space Design 1",
      description: "Interior space branding",
      gridColumn: "1 / span 12",
    },
    {
      id: 23,
      src: "/2_Workspage/2_Works page/Dogma/3. Final upload/Dogma_19_Space.jpg",
      type: "image",
      title: "Space Design 2",
      description: "Environmental graphics",
      gridColumn: "1 / span 12",
    },
    {
      id: 24,
      src: "/2_Workspage/2_Works page/Dogma/3. Final upload/Dogma_20a_Signage.mp4",
      type: "video",
      title: "Signage System A",
      description: "Wayfinding and signage",
      gridColumn: "1 / span 6",
      customAspectRatio: "155/208",
    },
    {
      id: 25,
      src: "/2_Workspage/2_Works page/Dogma/3. Final upload/Dogma_20b_Signage.jpg",
      type: "image",
      title: "Signage System B",
      description: "Additional signage elements",
      gridColumn: "7 / span 6",
      customAspectRatio: "155/208",
    },
    {
      id: 26,
      src: "/2_Workspage/2_Works page/Dogma/3. Final upload/Dogma_21_Space.jpg",
      type: "image",
      title: "Complete Space",
      description: "Full spatial experience",
      gridColumn: "1 / span 12",
    },
    {
      id: 27,
      src: "/2_Workspage/2_Works page/Dogma/3. Final upload/Dogma_22_Web.mp4",
      type: "video",
      title: "Website Design",
      description: "Digital brand experience",
      gridColumn: "1 / span 12",
    },
  ];

  // Preload videos in background
  const preloadVideo = async (videoSrc) => {
    return new Promise((resolve) => {
      const video = document.createElement("video");
      video.preload = "metadata"; // Load only metadata first

      // Load metadata first
      video.onloadedmetadata = () => {
        // Then load more data progressively
        video.preload = "auto";
        setPreloadedVideos((prev) => new Set([...prev, videoSrc]));
        resolve();
      };

      video.onerror = () => resolve(); // Continue even if error
      video.src = videoSrc;
    });
  };

  // Progressive video preloading - only preload visible videos
  useEffect(() => {
    const preloadVisibleVideos = () => {
      dogmaAssets
        .filter(asset => visibleItems.has(asset.id))
        .forEach(asset => {
          // Preload main video
          if (asset.type === "video" && !preloadedVideos.has(asset.src)) {
            preloadVideo(asset.src);
          }
          // Preload hover video if exists
          if (asset.hoverType === "video" && asset.hoverSrc && !preloadedVideos.has(asset.hoverSrc)) {
            preloadVideo(asset.hoverSrc);
          }
        });
    };

    preloadVisibleVideos();
  }, [visibleItems]);

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
        className={`dogma-media-item ${hasHover ? 'has-hover' : ''}`}
        ref={(el) => setupObserver(el, asset.id)}
        data-id={asset.id}
        data-visible={isVisible}
        style={{ gridColumn: asset.gridColumn }}
      >
        <div
          className="dogma-media-wrapper"
          style={
            asset.customAspectRatio
              ? { aspectRatio: asset.customAspectRatio }
              : { aspectRatio: "3/2" }
          }
        >
          {isVisible ? (
            <>
              {/* Default media */}
              {asset.type === "video" ? (
                <LazyVideo
                  src={asset.src}
                  className={`dogma-media ${hasHover ? 'dogma-media-default' : ''}`}
                  autoPlay
                  muted
                  loop
                  playsInline
                />
              ) : (
                <LazyImage
                  src={asset.src}
                  alt={asset.title}
                  className={`dogma-media ${hasHover ? 'dogma-media-default' : ''}`}
                />
              )}

              {/* Hover media */}
              {hasHover && (
                <>
                  {asset.hoverType === "video" ? (
                    <LazyVideo
                      src={asset.hoverSrc}
                      className="dogma-media dogma-media-hover"
                      autoPlay
                      muted
                      loop
                      playsInline
                    />
                  ) : (
                    <LazyImage
                      src={asset.hoverSrc}
                      alt={`${asset.title} Hover`}
                      className="dogma-media dogma-media-hover"
                    />
                  )}
                </>
              )}
            </>
          ) : (
            <div className="dogma-media-placeholder" />
          )}
        </div>
      </div>
    );
  };

  return (
    <section className="dogma-content">
      <div className="grid-container dogma-media-grid">
        {dogmaAssets.map(renderMediaItem)}
      </div>
    </section>
  );
};

export default DogmaContent;
