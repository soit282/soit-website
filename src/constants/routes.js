// Routes Constants - Centralized route management
// Only update routes here, all other files will use these constants

export const ROUTES = {
  // Main pages
  HOME: "/",
  ABOUT: "/about",
  SERVICES: "/services",
  WORKS: "/works",
  CONTACT: "/contact",
  PLAYGROUND: "/playground",

  // Work detail pages
  WORKS_TBROS: "/works/tbros",
  WORKS_DOGMA: "/works/dogma",
  WORKS_TRAMADE: "/works/tramade",
  WORKS_UNAVAILABLE: "/works/unavailable",

  // Other routes can be added here as needed
};

// Helper to get work detail route
export const getWorkDetailRoute = (workSlug) => {
  return `/works/${workSlug}`;
};

// Export default for convenience
export default ROUTES;
