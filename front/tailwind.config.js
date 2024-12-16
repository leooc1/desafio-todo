/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'dark-image': `url("./public/bg-desktop-dark.jpg")`,
        'light-image': `url("./public/bg-desktop-light.jpg)`,
        'dark-image-mobile': `url("./public/bg-mobile-dark.jpg)`,
        'light-image-mobile': `url("./public/bg-mobile-light.jpg")`,
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}