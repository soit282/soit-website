import { lazy, Suspense } from 'react';

const LazySection = ({ componentPath, fallback = null }) => {
  const Component = lazy(() => import(componentPath));

  const defaultFallback = (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#ffffff'
    }}>
      <div style={{
        width: '40px',
        height: '40px',
        border: '3px solid #f3f3f3',
        borderTop: '3px solid #1f1f1f',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite'
      }} />
    </div>
  );

  return (
    <Suspense fallback={fallback || defaultFallback}>
      <Component />
    </Suspense>
  );
};

export default LazySection;