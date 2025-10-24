import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
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
    plugins: [react()],
  }
})
