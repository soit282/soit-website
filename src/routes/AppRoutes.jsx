import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { ROUTES } from "@constants/routes";

// Lazy-load pages
const HomePage = lazy(() => import("@pages/HomePage"));
const AboutPage = lazy(() => import("@pages/AboutPage"));
const ServicePage = lazy(() => import("@pages/ServicePage"));
const WorksPage = lazy(() => import("@pages/WorksPage"));
const WorkDetailPage = lazy(() => import("@pages/WorkDetailPage"));

export default function AppRoutes() {

  return (
    <>
      <Suspense
        fallback={
          <div style={{ textAlign: "center", padding: "2rem" }}>Loading...</div>
        }
      >
        <Routes>
          <Route path={ROUTES.HOME} element={<HomePage />} />
          <Route path={ROUTES.ABOUT} element={<AboutPage />} />
          <Route path={ROUTES.SERVICES} element={<ServicePage />} />
          <Route path={ROUTES.WORKS} element={<WorksPage />} />
          <Route path="/works/:workId" element={<WorkDetailPage />} />

          {/* 404 - Catch all route
          <Route path="*" element={<NotFoundPage />} /> */}
        </Routes>
      </Suspense>
    </>
  );
}
