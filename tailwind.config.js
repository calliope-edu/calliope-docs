/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts,svx,md}'],
  theme: {
    typography: {
      DEFAULT: { // this is for prose class
        css: {
          a: {
            // change anchor color and on hover
            color: '#4075e5',
              '&:hover': { // could be any. It's like extending css selector
                // color: '#85a5e9',
              },
          },
        },
      },
    },
    extend: {
      fontFamily: {
        'sans': ["Roboto", "ui-sans-serif", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "Helvetica Neue", "Arial", "Noto Sans", "sans-serif", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"],
        'condensed': ["Roboto Condensed", "ui-sans-serif", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "Helvetica Neue", "Arial", "Noto Sans", "sans-serif", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"],
        'serif': ["ui-serif", "Georgia", "Cambria", "Times New Roman", "Times", "serif"],
        'mono': ["Roboto Mono", "ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "Consolas", "Liberation Mono", "Courier New", "monospace"],
      },
      colors: {
        'calliope': {
          DEFAULT: '#42C9CB', '50': '#D2F2F3', '100': '#C2EEEE', '200': '#A2E4E5', '300': '#82DBDD', '400': '#62D2D4', '500': '#42C9CB', '600': '#2EA5A7', '700': '#227A7B', '800': '#164E4F', '900': '#0A2323'
        },
        'rosa': {
          DEFAULT: '#E6007D', '50': '#FF9FD3', '100': '#FF8ACA', '200': '#FF61B7', '300': '#FF39A4', '400': '#FF1092', '500': '#E6007D', '600': '#AE005F', '700': '#760040', '800': '#3E0022', '900': '#060003'
        },
        'blau': {
          DEFAULT: '#6476FD', '50': '#F1F3FF', '100': '#DDE1FF', '200': '#B5BDFE', '300': '#8C9AFE', '400': '#6476FD', '500': '#2D45FC', '600': '#031FEE', '700': '#0218B6', '800': '#02107F', '900': '#010948'
        },
        'gruen': {
          DEFAULT: '#3FC863', '50': '#CEF1D7', '100': '#BEECCA', '200': '#9EE3B0', '300': '#7EDA97', '400': '#5FD17D', '500': '#3FC863', '600': '#2EA14C', '700': '#227538', '800': '#154A23', '900': '#091E0E'
        },
        'lila': {
          DEFAULT: '#8073E5', '50': '#EDEBFB', '100': '#DEDAF8', '200': '#BEB8F2', '300': '#9F95EB', '400': '#8073E5', '500': '#5544DC', '600': '#3624C3', '700': '#291C94', '800': '#1C1365', '900': '#0F0A36'
        },
        'gelb': {
          DEFAULT: '#F7C425', '50': '#FDF4D6', '100': '#FDEFC2', '200': '#FBE49B', '300': '#FAD974', '400': '#F8CF4C', '500': '#F7C425', '600': '#DCA808', '700': '#A67F06', '800': '#705504', '900': '#392C02'
        },
        'apricot': {
          DEFAULT: '#FF4600', '50': '#FFCBB8', '100': '#FFBCA3', '200': '#FF9F7A', '300': '#FF8152', '400': '#FF6429', '500': '#FF4600', '600': '#C73700', '700': '#8F2700', '800': '#571800', '900': '#1F0800'
        },
        'grau': {
          DEFAULT: '#48525F', '50': '#D3D7DD', '100': '#C7CDD5', '200': '#B0B8C3', '300': '#99A3B1', '400': '#828FA0', '500': '#6B7A8D', '600': '#5A6676', '700': '#48525F', '800': '#30363F', '900': '#181B1F'
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
    // 'bg-inherit',
    // 'bg-transparent',
    // 'bg-white',
    // 'bg-current',
    // 'bg-black',
    // 'text-slate-600',
    // 'hover:bg-slate-600',
    // 'rounded',
    // { pattern: /rounded-(none|full|r-full|l-full)/ },
    // { pattern: /font-(medium|bold|black)/ },
    // {
    //   pattern: /(border|bg|text|fill|stroke)-(slate|calliope).*/,
    //   variants: ['hover'],
    // },
    // {
    //   pattern: /(calliope|rosa|blau|gruen|lila|gelb|apricot|grau).*/,
    //   variants: ['hover'],
    // }
  ]
}