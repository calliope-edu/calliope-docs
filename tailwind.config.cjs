/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts,svx,md}'],
  theme: {
    extend: {
      colors: {
        calliope: {
          100: "#d9f4f5",
          200: "#b3e9ea",
          300: "#8edfe0",
          400: "#68d4d5",
          500: "#42c9cb",
          600: "#35a1a2",
          700: "#28797a",
          800: "#1a5051",
          900: "#0d2829"
        },
      },
      maxWidth: {
        '8xl': '90rem',
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
  safelist: [
    'bg-slate-600',
    'text-slate-600',
    'hover:bg-slate-600',
    {
      pattern: /border-(slate|calliope)-.+/,
      variants: ['hover'],
    }
  ]
}
