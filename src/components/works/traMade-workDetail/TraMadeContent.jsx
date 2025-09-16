import { useEffect, useState, useRef } from "react";
import LazyImage from "@components/common/LazyImage";
import LazyVideo from "@components/common/LazyVideo";
import "./TraMadeContent.css";
import "@styles/grid-system.css";

const TraMadeContent = () => {
  const [visibleItems, setVisibleItems] = useState(new Set());
  const observerRef = useRef(null);

  // Define all TraMADE assets in order
  const tramadeAssets = [
    {
      id: 1,
      src: "/2_Workspage/2_Works page/traMade/3. Final upload/TràMADE_1_intro vid.mp4",
      type: "video",
      title: "Introduction Video",
      description: "Brand introduction and story"
    },
    {
      id: 2,
      src: "/2_Workspage/2_Works page/traMade/3. Final upload/TràMADE_2_introduce.jpg",
      type: "image",
      title: "Brand Introduction",
      description: "Tea mastery from Măng Đen highlands"
    },
    {
      id: 3,
      src: "/2_Workspage/2_Works page/traMade/3. Final upload/TraMADE_3_Colors.mp4",
      type: "video",
      title: "Color Palette",
      description: "Brand color exploration and system"
    },
    {
      id: 4,
      src: "/2_Workspage/2_Works page/traMade/3. Final upload/TràMADE_4_Typo.jpg",
      type: "image",
      title: "Typography",
      description: "Custom typography system design"
    },
    {
      id: 5,
      src: "/2_Workspage/2_Works page/traMade/3. Final upload/TràMADE_5_Typeface_2.mp4",
      type: "video",
      title: "Typeface Animation",
      description: "Dynamic typography in motion"
    },
    {
      id: 6,
      src: "/2_Workspage/2_Works page/traMade/3. Final upload/TràMADE_6_Typeface 3.mp4",
      type: "video",
      title: "Typeface Variants",
      description: "Typography variations and usage"
    },
    {
      id: 7,
      src: "/2_Workspage/2_Works page/traMade/3. Final upload/TràMADE_7_Layout.png",
      type: "image",
      title: "Layout System",
      description: "Grid and layout principles"
    },
    {
      id: 8,
      src: "/2_Workspage/2_Works page/traMade/3. Final upload/TràMADE_8_Businesscard.png",
      type: "image",
      title: "Business Cards",
      description: "Professional identity materials"
    },
    {
      id: 9,
      src: "/2_Workspage/2_Works page/traMade/3. Final upload/TràMADE_9_Thank you card.png",
      type: "image",
      title: "Thank You Card",
      description: "Customer appreciation materials"
    },
    {
      id: 10,
      src: "/2_Workspage/2_Works page/traMade/3. Final upload/TràMADE_10_Introduction&Thank u card.png",
      type: "image",
      title: "Introduction & Thank You Cards",
      description: "Complete card system overview"
    },
    {
      id: 11,
      src: "/2_Workspage/2_Works page/traMade/3. Final upload/TràMADE_11_Logo.jpg",
      type: "image",
      title: "Logo Design",
      description: "Brand mark and logomark system"
    },
    {
      id: 12,
      src: "/2_Workspage/2_Works page/traMade/3. Final upload/TraMADE_12_Stationery overview.png",
      type: "image",
      title: "Stationery Overview",
      description: "Complete stationery system"
    },
    {
      id: 13,
      src: "/2_Workspage/2_Works page/traMade/3. Final upload/TràMADE_13_Box anatomy.mp4",
      type: "video",
      title: "Box Anatomy",
      description: "Packaging structure and design details"
    },
    {
      id: 14,
      src: "/2_Workspage/2_Works page/traMade/3. Final upload/TraMADE_14_Tea bag flat 2d motion.mp4",
      type: "video",
      title: "Tea Bag Animation",
      description: "2D motion graphics for tea bag design"
    },
    {
      id: 15,
      src: "/2_Workspage/2_Works page/traMade/3. Final upload/TraMADE_15_standard packaging.png",
      type: "image",
      title: "Standard Packaging",
      description: "Primary packaging design system"
    },
    {
      id: 16,
      src: "/2_Workspage/2_Works page/traMade/3. Final upload/TraMADE_16_container packaging.png",
      type: "image",
      title: "Container Packaging",
      description: "Secondary packaging solutions"
    },
    {
      id: 17,
      src: "/2_Workspage/2_Works page/traMade/3. Final upload/TraMADE_17_close up packaging standard.png",
      type: "image",
      title: "Packaging Close-up",
      description: "Detailed packaging design elements"
    },
    {
      id: 18,
      src: "/2_Workspage/2_Works page/traMade/3. Final upload/TràMADE_18_Packaging.jpg",
      type: "image",
      title: "Packaging System",
      description: "Complete packaging lineup"
    },
    {
      id: 19,
      src: "/2_Workspage/2_Works page/traMade/3. Final upload/TràMADE_19_Packaging.jpg",
      type: "image",
      title: "Packaging Variations",
      description: "Different packaging options"
    },
    {
      id: 20,
      src: "/2_Workspage/2_Works page/traMade/3. Final upload/TràMADE_20_Insta.jpg",
      type: "image",
      title: "Social Media",
      description: "Instagram and social media presence"
    },
    {
      id: 21,
      src: "/2_Workspage/2_Works page/traMade/3. Final upload/TràMADE_21.jpg",
      type: "image",
      title: "Final Showcase",
      description: "Complete brand identity showcase"
    }
  ];

  // Set up intersection observer for lazy loading
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const itemId = parseInt(entry.target.dataset.id);
            setVisibleItems(prev => new Set([...prev, itemId]));
          }
        });
      },
      { threshold: 0.1, rootMargin: '100px' }
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
      >
        <div className="tramade-media-wrapper">
          {isVisible && (
            <>
              {asset.type === 'video' ? (
                <LazyVideo
                  src={asset.src}
                  className="tramade-media"
                  autoPlay
                  muted
                  loop
                  playsInline
                />
              ) : (
                <LazyImage
                  src={asset.src}
                  alt={asset.title}
                  className="tramade-media"
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
      <div className="grid-container">
        <div className="tramade-media-grid" style={{ gridColumn: "1 / span 12" }}>
          {tramadeAssets.map(renderMediaItem)}
        </div>
      </div>
    </section>
  );
};

export default TraMadeContent;