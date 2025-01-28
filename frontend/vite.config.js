import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
})
// export default {
//   optimizeDeps: {
//     exclude: ['chunk-AEXSP3BR'] // Add the module causing the issue here
//   }
// }
