import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import tailwindcss from '@tailwindcss/vite'
import { execSync } from 'node:child_process'
import pkg from './package.json' with { type: 'json' }

function safeCommand(cmd) {
  try {
    return execSync(cmd).toString().trim()
  } catch {
    return null
  }
}

process.env.VITE_APP_VERSION =
  process.env.VITE_APP_VERSION ??
  safeCommand('git describe --tags --always') ??
  pkg.version ??
  'develop'

process.env.VITE_BUILD_VERSION =
  process.env.VITE_BUILD_VERSION ?? new Date().toISOString().slice(0, 10).replace(/-/g, '')

export default defineConfig({
  site: 'https://green-ecolution.de',
  output: 'static',
  trailingSlash: 'never',
  build: { format: 'file' },
  i18n: {
    defaultLocale: 'de',
    locales: ['de', 'en'],
    routing: { prefixDefaultLocale: true },
  },
  // Order matters: the framework integration has to come before mdx() so MDX
  // inherits the configured JSX runtime. This is what `astro add react mdx` emits.
  integrations: [
    react(),
    mdx(),
    sitemap({
      // The root page only redirects and is marked noindex; listing it next to
      // the pages it points to would hand crawlers a duplicate.
      filter: (page) => new URL(page).pathname !== '/',
      i18n: { defaultLocale: 'de', locales: { de: 'de-DE', en: 'en-GB' } },
    }),
  ],
  vite: {
    envPrefix: ['VITE_', 'PUBLIC_'],
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        // vite resolves this package's browser field to a UMD bundle whose default
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
  },
})
