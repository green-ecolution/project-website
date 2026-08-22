import { defineConfig } from 'vite'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import pkg from './package.json' with { type: 'json' }
import { execSync } from 'node:child_process'

function safeCommand(cmd: string) {
  try {
    return execSync(cmd).toString().trim()
  } catch {
    return null
  }
}

// https://vitejs.dev/config/
export default defineConfig(() => {
  process.env.VITE_APP_VERSION =
    process.env.VITE_APP_VERSION ??
    safeCommand('git describe --tags --always') ??
    pkg.version ??
    'develop'

  process.env.VITE_BUILD_VERSION =
    process.env.VITE_BUILD_VERSION ?? new Date().toISOString().slice(0, 10).replace(/-/g, '')

  return {
    resolve: {
      alias: {
        // vite 8 resolves this package's browser field to a UMD bundle whose default
        // export is the CJS exports object, so <Lottie /> would receive an object.
        'lottie-react': 'lottie-react/build/index.es.js',
      },
    },
    server: {
      watch: {
        // chokidar follows .direnv/flake-inputs into the nix store and burns ~140k
        // inotify watches on the nixpkgs tree, which kills the dev server with ENOSPC.
        ignored: ['**/.direnv/**'],
      },
    },
    plugins: [tailwindcss(), TanStackRouterVite({ routesDirectory: './src/routes' }), react()],
    build: {
      rollupOptions: {
        output: {
          codeSplitting: {
            groups: [
              { name: 'react-vendor', test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/ },
              { name: 'router', test: /[\\/]node_modules[\\/]@tanstack[\\/]react-router[\\/]/ },
              { name: 'lottie', test: /[\\/]node_modules[\\/]lottie-react[\\/]/ },
              { name: 'video', test: /[\\/]node_modules[\\/]react-player[\\/]/ },
              {
                name: 'three',
                test: /[\\/]node_modules[\\/](three|@react-three)[\\/]/,
              },
            ],
          },
        },
      },
    },
  }
})
