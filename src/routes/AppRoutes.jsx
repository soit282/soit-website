import { Routes, Route, useLocation } from "react-router-dom";
import { lazy, Suspense } from "react";

// Lazy-load pages
const HomePage = lazy(() => import("@pages/HomePage"));
const AboutPage = lazy(() => import("@pages/AboutPage"));

export default function AppRoutes() {
  const location = useLocation();

  return (
    <>
      <Suspense
        fallback={
          <div style={{ textAlign: "center", padding: "2rem" }}>Loading...</div>
        }
      >
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />

          {/* 404 - Catch all route
          <Route path="*" element={<NotFoundPage />} /> */}
        </Routes>
      </Suspense>
    </>
  );
}
