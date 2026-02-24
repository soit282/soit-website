import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [react()],
    define: {
      'import.meta.env.VITE_API_BASE_URL': JSON.stringify(env.VITE_API_BASE_URL || 'http://localhost:8080/api'),
      'import.meta.env.VITE_NODE_ENV': JSON.stringify(env.VITE_NODE_ENV || mode),
    },
    server: {
      allowedHosts: true,
      host: '0.0.0.0',
      port: 5173,
      proxy: {
        '/api': {
          target: env.VITE_API_BASE_URL || 'http://localhost:8080',
          changeOrigin: true,
          secure: false,
          ws: true,
        },
      },
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
        '@assets': path.resolve(__dirname, 'src/assets'),
        '@api': path.resolve(__dirname, 'src/api'),
        '@layouts': path.resolve(__dirname, 'src/layouts'),
        '@fonts': path.resolve(__dirname, 'src/assets/fonts'),
        '@components': path.resolve(__dirname, 'src/components'),
        '@pages': path.resolve(__dirname, 'src/pages'),
        '@utils': path.resolve(__dirname, 'src/utils'),
        '@hooks': path.resolve(__dirname, 'src/hooks'),
        '@services': path.resolve(__dirname, 'src/services'),
        '@styles': path.resolve(__dirname, 'src/styles'),
        '@config': path.resolve(__dirname, 'src/config'),
        '@context': path.resolve(__dirname, 'src/context'),
        '@routes': path.resolve(__dirname, 'src/routes'),
        '@data': path.resolve(__dirname, 'src/data'),
        '@constants': path.resolve(__dirname, 'src/constants'),
      },
    },
  }
})