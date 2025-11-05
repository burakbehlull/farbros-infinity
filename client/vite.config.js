import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import tsconfigPaths from "vite-tsconfig-paths"
import * as path from "node:path"

function way(name){
  return path.resolve(__dirname, name)
}

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  server: {
    port: 8000,
    proxy: {
      '/api': 'http://localhost:80'
    }
  },
  resolve: {
    alias: {
      '~': way('src'),
	  '@api': way('src/base/api.js'),
      '@requests': way('src/base/requests.js'),
	  
      '@routes': way('src/routes/index'),
	
      '@pages': way('src/pages/index'),
      '@components': way('src/components/index'),
    },
  },
})
