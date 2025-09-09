# SOIT Website

Website chính thức của SOIT

## 🚀 Tech Stack

- **Framework:** React 19.1.1
- **Build Tool:** Vite 7.1.2
- **Language:** JavaScript (ES6+)

## 📁 Cấu trúc dự án

```
soit-website/
│
├── 📄 index.html                 # Entry point HTML, nơi React app được mount vào
├── 📄 package.json               # Quản lý dependencies và scripts của project
├── 📄 package-lock.json          # Lock file cho npm dependencies
├── 📄 vite.config.js             # Cấu hình Vite bundler với path aliases
├── 📄 eslint.config.js           # Cấu hình ESLint cho code quality
├── 📄 README.md                  # Documentation dự án (file này)
│
├── 📁 public/                    # Static assets được serve trực tiếp
│   └── vite.svg                  # Default Vite logo
│
└── 📁 src/                       # Source code chính của ứng dụng
    ├── 📄 main.jsx               # Entry point của React app, render App component
    ├── 📄 App.jsx                # Root component chính của ứng dụng
    ├── 📄 App.css                # Styles cho App component
    ├── 📄 index.css              # Global styles cơ bản
    │
    ├── 📁 assets/                # Media files và resources
    │   ├── react.svg             # React logo
    │   └── 📁 pp-neue-montreal-cufonfonts/  # Custom font files
    │       ├── ppneuemontreal-bold.otf      # Font weight 700
    │       ├── ppneuemontreal-book.otf      # Font weight 400 (regular)
    │       ├── ppneuemontreal-italic.otf    # Italic variant
    │       ├── ppneuemontreal-medium.otf    # Font weight 500
    │       ├── ppneuemontreal-semibolditalic.otf  # Font weight 600 italic
    │       └── ppneuemontreal-thin.otf      # Font weight 100
    │
    ├── 📁 components/            # Reusable React components
    │   ├── 📁 common/            # Components dùng chung (buttons, inputs, cards...)
    │   └── 📁 layout/            # Layout components (Header, Footer, Sidebar...)
    │
    ├── 📁 pages/                 # Page components cho từng route
    │
    ├── 📁 routes/                # Định nghĩa routing và navigation
    │
    ├── 📁 styles/                # Global styles và design system
    │   ├── global.css            # Global styles, reset CSS
    │   ├── typography.css        # Typography system với 8 text styles
    │   └── variables.css         # CSS variables (colors, spacing, breakpoints...)
    │
    ├── 📁 hooks/                 # Custom React hooks
    │
    ├── 📁 context/               # React Context cho state management
    │
    ├── 📁 services/              # API calls và external services
    │
    ├── 📁 utils/                 # Utility functions và helpers
    │
    └── 📁 config/                # Configuration files (API endpoints, constants...)
```

## 🎨 Design System

## 🛠️ Scripts

```bash
# Development server (port 5173)
npm run dev

# Production build
npm run build

# Preview production build
npm run preview

# Linting
npm run lint
```

## 🔧 Path Aliases

Project đã cấu hình các path aliases trong `vite.config.js` để import dễ dàng hơn:

- `@` → `src/`
- `@assets` → `src/assets/`
- `@components` → `src/components/`
- `@styles` → `src/styles/`
- `@pages` → `src/pages/`
- `@routes` → `src/routes/`
- `@hooks` → `src/hooks/`
- `@context` → `src/context/`
- `@services` → `src/services/`
- `@utils` → `src/utils/`
- `@config` → `src/config/`

Ví dụ sử dụng:

```javascript
import Button from '@components/common/Button'
import { apiClient } from '@services/api'
import { formatDate } from '@utils/date'
```

## 🚀 Getting Started

1. Clone repository:

```bash
git clone https://github.com/soit282/soit-website.git
cd soit-website
```

2. Install dependencies:

```bash
npm install
```

3. Start development server:

```bash
npm run dev
```

4. Open browser tại `http://localhost:5173`

## 📝 Development Guidelines

### Folder Structure

- Components nên được tổ chức theo tính năng trong `components/`
- Mỗi page component nên có folder riêng trong `pages/`
- Shared utilities và helpers đặt trong `utils/`
- API services và external integrations trong `services/`

### Naming Conventions

- **Components**: PascalCase (e.g., `Button.jsx`, `HeaderNav.jsx`)
- **Utilities**: camelCase (e.g., `formatDate.js`, `apiClient.js`)
- **CSS files**: kebab-case (e.g., `global-styles.css`)
- **Folders**: kebab-case (e.g., `pp-neue-montreal-cufonfonts/`)

### Code Style

- Sử dụng ESLint để maintain code quality
- Follow React best practices và hooks rules
- Component files nên có extension `.jsx`
- Regular JavaScript files dùng `.js`

## 🌐 Deployment

Build production:

```bash
npm run build
```

Output sẽ nằm trong folder `dist/` và có thể deploy lên bất kỳ static hosting service nào (Vercel, Netlify, GitHub Pages, etc.)

## 👥 Contributors

- SOIT Development Team

## 📄 License

© 2025 SOIT - Student Organization of Information Technology
