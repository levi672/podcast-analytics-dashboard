/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          bg: '#0a0a0f',
          card: '#12121a',
          border: '#1e1e2e',
          text: '#e4e4e7',
          muted: '#71717a',
        },
        spotify: '#1DB954',
        youtube: '#FF0000',
        instagram: '#E4405F',
        tiktok: '#000000',
      }
    },
  },
  plugins: [],
}
