import { useEffect, useState, useRef } from "react";
import LazyImage from "@components/common/LazyImage";
import LazyVideo from "@components/common/LazyVideo";
import "./TraMadeContent.css";
import "@styles/grid-system.css";

const TraMadeContent = () => {
  const [visibleItems, setVisibleItems] = useState(new Set());
  const [preloadedVideos, setPreloadedVideos] = useState(new Set());
  const observerRef = useRef(null);
  const videoPreloadQueue = useRef([]);

  // Define all TraMADE assets in order with grid positions
  const tramadeAssets = [
    {
      id: 1,
      src: "/2_Workspage/2_Works page/traMade/3. Final upload/TràMADE_1_intro vid.mp4",
      type: "video",
      title: "Introduction Video",
      description: "Brand introduction and story",
      gridColumn: "1 / span 12",
    },
    {
      id: 2,
      src: "/2_Workspage/2_Works page/traMade/3. Final upload/TràMADE_2a_introduce.jpg",
      type: "image",
      title: "Brand Introduction",
      description: "Tea mastery from Măng Đen highlands",
      gridColumn: "1 / span 12",
    },
    {
      id: 3,
      src: "/2_Workspage/2_Works page/traMade/3. Final upload/TràMADE_2b_introduce.jpg",
      type: "image",
      title: "Brand Introduction - Part 2",
      description: "Tea mastery from Măng Đen highlands continued",
      gridColumn: "1 / span 12",
    },
    {
      id: 4,
      src: "/2_Workspage/2_Works page/traMade/3. Final upload/TraMADE_3_Colors.mp4",
      type: "video",
      title: "Color Palette",
      description: "Brand color exploration and system",
      gridColumn: "1 / span 12",
    },
    {
      id: 5,
      src: "/2_Workspage/2_Works page/traMade/3. Final upload/TràMADE_4_Typo.jpg",
      type: "image",
      title: "Typography",
      description: "Custom typography system design",
      gridColumn: "1 / span 12",
    },
    {
      id: 6,
      src: "/2_Workspage/2_Works page/traMade/3. Final upload/TràMADE_5_Typeface_2.mp4",
      type: "video",
      title: "Typeface Animation",
      description: "Dynamic typography in motion",
      gridColumn: "1 / span 12",
    },
    {
      id: 7,
      src: "/2_Workspage/2_Works page/traMade/3. Final upload/TràMADE_6_Typeface 3.mp4",
      type: "video",
      title: "Typeface Variants",
      description: "Typography variations and usage",
      gridColumn: "1 / span 12",
    },
    {
      id: 8,
      src: "/2_Workspage/2_Works page/traMade/3. Final upload/TràMADE_7_Layout.png",
      type: "image",
      title: "Layout System",
      description: "Grid and layout principles",
      gridColumn: "1 / span 12",
    },
    {
      id: 9,
      src: "/2_Workspage/2_Works page/traMade/3. Final upload/TràMADE_8_Businesscard.png",
      type: "image",
      title: "Business Cards",
      description: "Professional identity materials",
      gridColumn: "1 / span 12",
    },
    {
      id: 10,
      src: "/2_Workspage/2_Works page/traMade/3. Final upload/TràMADE_9_Thank you card.png",
      type: "image",
      title: "Thank You Card",
      description: "Customer appreciation materials",
      gridColumn: "1 / span 12",
      customAspectRatio: "16/9",
    },
    {
      id: 11,
      src: "/2_Workspage/2_Works page/traMade/3. Final upload/TràMADE_10_Introduction&Thank u card.png",
      type: "image",
      title: "Introduction & Thank You Cards",
      description: "Complete card system overview",
      gridColumn: "1 / span 12",
    },
    {
      id: 12,
      src: "/2_Workspage/2_Works page/traMade/3. Final upload/TràMADE_11_Logo.jpg",
      type: "image",
      title: "Logo Design",
      description: "Brand mark and logomark system",
      gridColumn: "1 / span 12",
      customAspectRatio: "936/437",
    },
    {
      id: 13,
      src: "/2_Workspage/2_Works page/traMade/3. Final upload/TraMADE_12_Stationery overview.png",
      type: "image",
      title: "Stationery Overview",
      description: "Complete stationery system",
      gridColumn: "1 / span 12",
    },
    {
      id: 14,
      src: "/2_Workspage/2_Works page/traMade/3. Final upload/TràMADE_13_Box anatomy.mp4",
      type: "video",
      title: "Box Anatomy",
      description: "Packaging structure and design details",
      gridColumn: "1 / span 12",
    },
    {
      id: 15,
      src: "/2_Workspage/2_Works page/traMade/3. Final upload/TraMADE_14_Tea bag flat 2d motion.mp4",
      type: "video",
      title: "Tea Bag Animation",
      description: "2D motion graphics for tea bag design",
      gridColumn: "1 / span 12",
    },
    {
      id: 16,
      src: "/2_Workspage/2_Works page/traMade/3. Final upload/TraMADE_15_standard packaging.png",
      type: "image",
      title: "Standard Packaging",
      description: "Primary packaging design system",
      gridColumn: "1 / span 12",
    },
    {
      id: 17,
      src: "/2_Workspage/2_Works page/traMade/3. Final upload/TraMADE_16_container packaging.png",
      type: "image",
      title: "Container Packaging",
      description: "Secondary packaging solutions",
      gridColumn: "1 / span 12",
    },
    {
      id: 18,
      src: "/2_Workspage/2_Works page/traMade/3. Final upload/TraMADE_17_close up packaging standard.png",
      type: "image",
      title: "Packaging Close-up",
      description: "Detailed packaging design elements",
      gridColumn: "1 / span 12",
    },
    {
      id: 19,
      src: "/2_Workspage/2_Works page/traMade/3. Final upload/TràMADE_18_Packaging.jpg",
      type: "image",
      title: "Packaging System",
      description: "Complete packaging lineup",
      gridColumn: "1 / span 12",
    },
    {
      id: 20,
      src: "/2_Workspage/2_Works page/traMade/3. Final upload/TràMADE_19_Packaging.jpg",
      type: "image",
      title: "Packaging Variations",
      description: "Different packaging options",
      gridColumn: "1 / span 12",
    },
    {
      id: 21,
      src: "/2_Workspage/2_Works page/traMade/3. Final upload/TràMADE_20_Insta.jpg",
      type: "image",
      title: "Social Media",
      description: "Instagram and social media presence",
      gridColumn: "1 / span 12",
    },
    {
      id: 22,
      src: "/2_Workspage/2_Works page/traMade/3. Final upload/TràMADE_21.jpg",
      type: "image",
      title: "Final Showcase",
      description: "Complete brand identity showcase",
      gridColumn: "1 / span 12",
    },
  ];

  // Preload videos in background
  const preloadVideo = async (videoSrc) => {
    return new Promise((resolve) => {
      const video = document.createElement('video');
      video.preload = 'metadata'; // Load only metadata first

      // Load metadata first
      video.onloadedmetadata = () => {
        // Then load more data progressively
        video.preload = 'auto';
        setPreloadedVideos(prev => new Set([...prev, videoSrc]));
        resolve();
      };

      video.onerror = () => resolve(); // Continue even if error
      video.src = videoSrc;
    });
  };

  // Progressive video preloading
  useEffect(() => {
    const videos = tramadeAssets.filter(asset => asset.type === 'video');

    // Sort videos by size (heavy videos last)
    const sortedVideos = videos.sort((a, b) => {
      if (a.id === 6) return 1; // Heavy video (id: 6) loads last
      if (b.id === 6) return -1;
      return a.id - b.id;
    });

    // Preload videos one by one to avoid bandwidth congestion
    const loadVideosSequentially = async () => {
      for (const video of sortedVideos) {
        await preloadVideo(video.src);
        // Small delay between loads to prevent lag
        await new Promise(resolve => setTimeout(resolve, 500));
      }
    };

    // Start preloading after initial page load
    const timer = setTimeout(() => {
      loadVideosSequentially();
    }, 2000); // Wait 2 seconds after mount

    return () => clearTimeout(timer);
  }, []);

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
      { threshold: 0.1, rootMargin: "300px" } // Increased for earlier loading
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

    return (
      <div
        key={asset.id}
        className="tramade-media-item"
        ref={(el) => setupObserver(el, asset.id)}
        data-id={asset.id}
        data-visible={isVisible}
        style={{ gridColumn: asset.gridColumn }}
      >
        <div
          className="tramade-media-wrapper"
          style={asset.customAspectRatio ? { aspectRatio: asset.customAspectRatio } : {}}
        >
          {isVisible && (
            <>
              {asset.type === "video" ? (
                <LazyVideo
                  src={asset.src}
                  className="tramade-media"
                  style={asset.customAspectRatio ? { aspectRatio: asset.customAspectRatio } : {}}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload={preloadedVideos.has(asset.src) ? "auto" : "metadata"}
                  loading="lazy"
                />
              ) : (
                <LazyImage
                  src={asset.src}
                  alt={asset.title}
                  className="tramade-media"
                  style={asset.customAspectRatio ? { aspectRatio: asset.customAspectRatio } : {}}
                  effect="blur"
                />
              )}
            </>
          )}
        </div>
      </div>
    );
  };

  return (
    <section className="tramade-content">
      <div className="grid-container tramade-media-grid">
        {tramadeAssets.map(renderMediaItem)}
      </div>
    </section>
  );
};

export default TraMadeContent;
