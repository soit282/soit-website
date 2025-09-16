// Base paths
const BASE_PATH = '/1_Homepage/1_Homepage/2_Feature works';
const ICON_PATH = '/icon/Icon';

// Helper function to generate asset path
export const getAssetPath = (filename) => `${BASE_PATH}/${filename}`;
export const getIconPath = (filename) => `${ICON_PATH}/${filename}`;

// Common icons
export const ICONS = {
  ellipse: getIconPath('ellipse.svg'),
};

// Works projects configuration
export const WORKS_PROJECTS = {
  // TraMADE project
  tramade: {
    id: 'tramade',
    title: 'TràMADE',
    tagline: 'Tea mastery born in the heights of Măng Đen',
    category: 'Branding Strategy, Brand Identity',
    images: {
      default: getAssetPath('TraMADE_18_Packaging.jpg'),
      hover: getAssetPath('TraMADE_1.jpg'),
    },
    route: '/works/tramade',
  },

  // OKKIO project
  okkio: {
    id: 'okkio',
    title: 'OKKIO',
    tagline: 'A culinary deep dive that will make you speechless',
    category: 'Branding',
    images: {
      default: getAssetPath('Okkio_1.png'),
      hover: getAssetPath('Okkio_2.png'),
    },
    route: '/works/okkio',
  },

  // TBros project
  tbros: {
    id: 'tbros',
    title: 'TBros',
    tagline: "Vietnam's most awarded bean-to-bar chocolate",
    category: 'Branding',
    images: {
      default: getAssetPath('TBros_2.png'),
      hover: getAssetPath('TBros_2.png'),
    },
    video: {
      src: getAssetPath('TBros_1.mov'),
    },
    route: '/works/tbros',
  },

  // Lune project
  lune: {
    id: 'lune',
    title: 'Lune',
    tagline: 'Modern French culinary experience in Saigon',
    category: 'Branding',
    images: {
      default: getAssetPath('Okkio_1.png'), // Update with correct paths
      hover: getAssetPath('Okkio_2.png'),
    },
    route: '/works/lune',
  },
};

// Section configurations
export const SECTION_CONFIGS = {
  section2: {
    leftProject: WORKS_PROJECTS.tramade,
    rightProject: WORKS_PROJECTS.okkio,
  },
  section3: {
    project: WORKS_PROJECTS.tbros,
  },
  section4: {
    leftProject: WORKS_PROJECTS.tramade,
    rightProject: WORKS_PROJECTS.lune,
  },
  // Add more sections as needed
};

// Services list for Section 1
export const SERVICES = [
  'Brand Strategy',
  'Brand Identity',
  'Packaging Design',
  'Editorial Design',
  'Campaigns & Activations',
  'Web & App',
  'Creative Development',
  'Design Systems',
];