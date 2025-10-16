import { lazy, Suspense, useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

// Lazy load all sections for better performance
const Section1Work = lazy(() => import("@components/works/section1-work/Section1Work"));
const Section2Work = lazy(() => import("@components/works/section2-work/Section2Work"));
const Section3Work = lazy(() => import("@components/works/section3-work/Section3Work"));
const Section4Work = lazy(() => import("@components/works/section4-work/Section4Work"));
const Section5Work = lazy(() => import("@components/works/section5-work/Section5Work"));
const Section6Work = lazy(() => import("@components/works/section6-work/Section6Work"));
const Section7Work = lazy(() => import("@components/works/section7-work/Section7Work"));
const Section8Work = lazy(() => import("@components/works/section8-work/Section8Work"));
const Section9Work = lazy(() => import("@components/works/section9-work/Section9Work"));

const WorksPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Initialize viewMode from URL query param or localStorage, fallback to 'gallery'
  const getInitialViewMode = () => {
    // First check URL query param
    const urlViewMode = searchParams.get('view');
    if (urlViewMode === 'list' || urlViewMode === 'gallery') {
      return urlViewMode;
    }

    // Then check localStorage
    const savedViewMode = localStorage.getItem('worksViewMode');
    if (savedViewMode === 'list' || savedViewMode === 'gallery') {
      return savedViewMode;
    }

    // Default to gallery
    return 'gallery';
  };

  const [viewMode, setViewMode] = useState(getInitialViewMode);

  // Save viewMode to localStorage and update URL when it changes
  useEffect(() => {
    localStorage.setItem('worksViewMode', viewMode);
    setSearchParams({ view: viewMode }, { replace: true });
  }, [viewMode, setSearchParams]);

  return (
    <div className="works-page">
      <Suspense fallback={<div style={{ minHeight: '100vh' }} />}>
        <Section1Work viewMode={viewMode} setViewMode={setViewMode} />
      </Suspense>

      {viewMode === 'gallery' ? (
        <>
          <Suspense fallback={<div style={{ minHeight: '100vh' }} />}>
            <Section2Work />
          </Suspense>
          <Suspense fallback={<div style={{ minHeight: '100vh' }} />}>
            <Section3Work />
          </Suspense>
          <Suspense fallback={<div style={{ minHeight: '100vh' }} />}>
            <Section4Work />
          </Suspense>
          <Suspense fallback={<div style={{ minHeight: '100vh' }} />}>
            <Section5Work />
          </Suspense>
          <Suspense fallback={<div style={{ minHeight: '100vh' }} />}>
            <Section6Work />
          </Suspense>
          <Suspense fallback={<div style={{ minHeight: '100vh' }} />}>
            <Section7Work />
          </Suspense>
          <Suspense fallback={<div style={{ minHeight: '100vh' }} />}>
            <Section8Work />
          </Suspense>
          <Suspense fallback={<div style={{ minHeight: '100vh' }} />}>
            <Section9Work />
          </Suspense>
        </>
      ) : (
        <Suspense fallback={<div style={{ minHeight: '100vh' }} />}>
          <Section9Work />
        </Suspense>
      )}
    </div>
  );
};

export default WorksPage;