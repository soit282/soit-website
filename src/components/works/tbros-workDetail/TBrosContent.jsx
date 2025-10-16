import { useEffect, useState, useRef } from "react";
import LazyImage from "@components/common/LazyImage";
import LazyVideo from "@components/common/LazyVideo";
import "./TBrosContent.css";
import "@styles/grid-system.css";

const TBrosContent = () => {
  const [visibleItems, setVisibleItems] = useState(new Set());
  const [preloadedVideos, setPreloadedVideos] = useState(new Set());
  const observerRef = useRef(null);

  // Define all TBROS assets in order with grid positions
  const tbrosAssets = [
    {
      id: 1,
      src: "/2_Workspage/2_Works page/TBROS/TBROS_1 (HOVER).png",
      type: "image",
      title: "TBROS 1",
      gridColumn: "1 / span 12",
      hoverSrc: "/2_Workspage/2_Works page/TBROS/TBROS_11 (COVER).mp4",
      hoverType: "video",
    },
    {
      id: 2,
      src: "/2_Workspage/2_Works page/TBROS/TBROS_2.png",
      type: "image",
      title: "TBROS 2",
      gridColumn: "1 / span 12",
    },
    {
      id: 3,
      src: "/2_Workspage/2_Works page/TBROS/TBROS_3.png",
      type: "image",
      title: "TBROS 3",
      gridColumn: "1 / span 12",
    },
    {
      id: 4,
      src: "/2_Workspage/2_Works page/TBROS/TBROS_4.png",
      type: "image",
      title: "TBROS 4",
      gridColumn: "1 / span 12",
    },
    {
      id: 5,
      src: "/2_Workspage/2_Works page/TBROS/TBROS_5.png",
      type: "image",
      title: "TBROS 5",
      gridColumn: "1 / span 12",
    },
    {
      id: 6,
      src: "/2_Workspage/2_Works page/TBROS/TBROS_6.mp4",
      type: "video",
      title: "TBROS 6",
      gridColumn: "1 / span 12",
    },
    {
      id: 7,
      src: "/2_Workspage/2_Works page/TBROS/TBROS_7.A.png",
      type: "image",
      title: "TBROS 7A",
      gridColumn: "1 / span 6",
      customAspectRatio: "155/208",
    },
    {
      id: 8,
      src: "/2_Workspage/2_Works page/TBROS/TBROS_7.B.mp4",
      type: "video",
      title: "TBROS 7B",
      gridColumn: "7 / span 6",
      customAspectRatio: "155/208",
    },
    {
      id: 9,
      src: "/2_Workspage/2_Works page/TBROS/TBROS_8.png",
      type: "image",
      title: "TBROS 8",
      gridColumn: "1 / span 12",
    },
    {
      id: 10,
      src: "/2_Workspage/2_Works page/TBROS/TBROS_9.mp4",
      type: "video",
      title: "TBROS 9",
      gridColumn: "1 / span 12",
    },
    {
      id: 11,
      src: "/2_Workspage/2_Works page/TBROS/TBROS_10.png",
      type: "image",
      title: "TBROS 10",
      gridColumn: "1 / span 12",
    },
    {
      id: 12,
      src: "/2_Workspage/2_Works page/TBROS/TBROS_11 (COVER).mp4",
      type: "video",
      title: "TBROS 11",
      gridColumn: "1 / span 12",
    },
    {
      id: 13,
      src: "/2_Workspage/2_Works page/TBROS/TBROS_12.mp4",
      type: "video",
      title: "TBROS 12",
      gridColumn: "1 / span 12",
    },
    {
      id: 14,
      src: "/2_Workspage/2_Works page/TBROS/TBROS_13.png",
      type: "image",
      title: "TBROS 13",
      gridColumn: "1 / span 12",
    },
    {
      id: 15,
      src: "/2_Workspage/2_Works page/TBROS/TBROS_14.mp4",
      type: "video",
      title: "TBROS 14",
      gridColumn: "1 / span 12",
    },
    {
      id: 16,
      src: "/2_Workspage/2_Works page/TBROS/TBROS_15.png",
      type: "image",
      title: "TBROS 15",
      gridColumn: "1 / span 12",
    },
    {
      id: 17,
      src: "/2_Workspage/2_Works page/TBROS/TBROS_16.mp4",
      type: "video",
      title: "TBROS 16",
      gridColumn: "1 / span 12",
    },
    {
      id: 18,
      src: "/2_Workspage/2_Works page/TBROS/TBROS_17.png",
      type: "image",
      title: "TBROS 17",
      gridColumn: "1 / span 12",
    },
    {
      id: 19,
      src: "/2_Workspage/2_Works page/TBROS/TBROS_18.mp4",
      type: "video",
      title: "TBROS 18",
      gridColumn: "1 / span 12",
    },
    {
      id: 20,
      src: "/2_Workspage/2_Works page/TBROS/TBROS_19.png",
      type: "image",
      title: "TBROS 19",
      gridColumn: "1 / span 12",
    },
    {
      id: 21,
      src: "/2_Workspage/2_Works page/TBROS/TBROS_20.A.png",
      type: "image",
      title: "TBROS 20A",
      gridColumn: "1 / span 6",
      customAspectRatio: "155/208",
    },
    {
      id: 22,
      src: "/2_Workspage/2_Works page/TBROS/TBROS_20.B.png",
      type: "image",
      title: "TBROS 20B",
      gridColumn: "7 / span 6",
      customAspectRatio: "155/208",
    },
    {
      id: 23,
      src: "/2_Workspage/2_Works page/TBROS/TBROS_21.png",
      type: "image",
      title: "TBROS 21",
      gridColumn: "1 / span 12",
    },
    {
      id: 24,
      src: "/2_Workspage/2_Works page/TBROS/TBROS_22.png",
      type: "image",
      title: "TBROS 22",
      gridColumn: "1 / span 12",
    },
    {
      id: 25,
      src: "/2_Workspage/2_Works page/TBROS/TBROS_23A.png",
      type: "image",
      title: "TBROS 23A",
      gridColumn: "1 / span 6",
    },
    {
      id: 26,
      src: "/2_Workspage/2_Works page/TBROS/TBROS_23B.png",
      type: "image",
      title: "TBROS 23B",
      gridColumn: "7 / span 6",
    },
    {
      id: 27,
      src: "/2_Workspage/2_Works page/TBROS/TBROS_24.mov",
      type: "video",
      title: "TBROS 24",
      gridColumn: "1 / span 12",
    },
    {
      id: 28,
      src: "/2_Workspage/2_Works page/TBROS/TBROS_25A.jpg",
      type: "image",
      title: "TBROS 25A",
      gridColumn: "1 / span 6",
      customAspectRatio: "155/208",
    },
    {
      id: 29,
      src: "/2_Workspage/2_Works page/TBROS/TBROS_25B.jpg",
      type: "image",
      title: "TBROS 25B",
      gridColumn: "7 / span 6",
      customAspectRatio: "155/208",
    },
    {
      id: 30,
      src: "/2_Workspage/2_Works page/TBROS/TBROS_26.jpg",
      type: "image",
      title: "TBROS 26",
      gridColumn: "1 / span 12",
    },
    {
      id: 31,
      src: "/2_Workspage/2_Works page/TBROS/TBROS_27A.jpg",
      type: "image",
      title: "TBROS 27A",
      gridColumn: "1 / span 6",
      customAspectRatio: "155/208",
    },
    {
      id: 32,
      src: "/2_Workspage/2_Works page/TBROS/TBROS_27B.jpg",
      type: "image",
      title: "TBROS 27B",
      gridColumn: "7 / span 6",
      customAspectRatio: "155/208",
    },
    {
      id: 33,
      src: "/2_Workspage/2_Works page/TBROS/TBROS_28.mp4",
      type: "video",
      title: "TBROS 28",
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
      tbrosAssets
        .filter((asset) => visibleItems.has(asset.id))
        .forEach((asset) => {
          // Preload main video
          if (asset.type === "video" && !preloadedVideos.has(asset.src)) {
            preloadVideo(asset.src);
          }
          // Preload hover video if exists
          if (
            asset.hoverType === "video" &&
            asset.hoverSrc &&
            !preloadedVideos.has(asset.hoverSrc)
          ) {
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
        className={`tbros-media-item ${hasHover ? "has-hover" : ""}`}
        ref={(el) => setupObserver(el, asset.id)}
        data-id={asset.id}
        data-visible={isVisible}
        style={{ gridColumn: asset.gridColumn }}
      >
        <div
          className="tbros-media-wrapper"
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
                  className={`tbros-media ${hasHover ? "tbros-media-default" : ""}`}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload={
                    preloadedVideos.has(asset.src) ? "auto" : "metadata"
                  }
                  loading="lazy"
                />
              ) : (
                <LazyImage
                  src={asset.src}
                  alt={asset.title}
                  className={`tbros-media ${hasHover ? "tbros-media-default" : ""}`}
                  effect="blur"
                />
              )}

              {/* Hover media */}
              {hasHover && (
                <>
                  {asset.hoverType === "video" ? (
                    <LazyVideo
                      src={asset.hoverSrc}
                      className="tbros-media tbros-media-hover"
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload={
                        preloadedVideos.has(asset.hoverSrc)
                          ? "auto"
                          : "metadata"
                      }
                      loading="lazy"
                    />
                  ) : (
                    <img
                      src={asset.hoverSrc}
                      alt={`${asset.title} Hover`}
                      className="tbros-media tbros-media-hover"
                      loading="lazy"
                    />
                  )}
                </>
              )}
            </>
          ) : (
            <div className="tbros-media-placeholder" />
          )}
        </div>
      </div>
    );
  };

  return (
    <section className="tbros-content">
      <div className="grid-container tbros-media-grid">
        {tbrosAssets.map(renderMediaItem)}
      </div>
    </section>
  );
};

export default TBrosContent;
