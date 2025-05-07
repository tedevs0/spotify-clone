// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import tailwindcss from '@tailwindcss/vite'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react(), tailwindcss(),],
// })

import mkcert from 'vite-plugin-mkcert'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss(), mkcert()],
  server: {
    host: '0.0.0.0', // permite acceso desde otras IPs (como tu teléfono o red local)
    https: true,
  },
})
