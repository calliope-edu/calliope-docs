/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts,svx,md}'],
  theme: {
    extend: {
      colors: {
        'calliope': {
          DEFAULT: '#42C9CB',
          '50': '#D2F2F3',
          '100': '#C2EEEE',
          '200': '#A2E4E5',
          '300': '#82DBDD',
          '400': '#62D2D4',
          '500': '#42C9CB',
          '600': '#2EA5A7',
          '700': '#227A7B',
          '800': '#164E4F',
          '900': '#0A2323'
        },
        'pink': {
          DEFAULT: '#E6007D',
          '50': '#FF9FD3',
          '100': '#FF8ACA',
          '200': '#FF61B7',
          '300': '#FF39A4',
          '400': '#FF1092',
          '500': '#E6007D',
          '600': '#AE005F',
          '700': '#760040',
          '800': '#3E0022',
          '900': '#060003'
        },
        'blue': {
          DEFAULT: '#6476FD',
          '50': '#FFFFFF',
          '100': '#FFFFFF',
          '200': '#DDE1FF',
          '300': '#B5BDFE',
          '400': '#8C9AFE',
          '500': '#6476FD',
          '600': '#2D45FC',
          '700': '#031FEE',
          '800': '#0218B6',
          '900': '#02107F'
        },
        'green': {
          DEFAULT: '#3FC863',
          '50': '#CEF1D7',
          '100': '#BEECCA',
          '200': '#9EE3B0',
          '300': '#7EDA97',
          '400': '#5FD17D',
          '500': '#3FC863',
          '600': '#2EA14C',
          '700': '#227538',
          '800': '#154A23',
          '900': '#091E0E'
        },
        'purple': {
          DEFAULT: '#8073E5',
          '50': '#FFFFFF',
          '100': '#FDFDFF',
          '200': '#DEDAF8',
          '300': '#BEB8F2',
          '400': '#9F95EB',
          '500': '#8073E5',
          '600': '#5544DC',
          '700': '#3624C3',
          '800': '#291C94',
          '900': '#1C1365'
        },
        'yellow': {
          DEFAULT: '#F7C425',
          '50': '#FDF4D6',
          '100': '#FDEFC2',
          '200': '#FBE49B',
          '300': '#FAD974',
          '400': '#F8CF4C',
          '500': '#F7C425',
          '600': '#DCA808',
          '700': '#A67F06',
          '800': '#705504',
          '900': '#392C02'
        },
        'orange': {
          DEFAULT: '#FF4600',
          '50': '#FFCBB8',
          '100': '#FFBCA3',
          '200': '#FF9F7A',
          '300': '#FF8152',
          '400': '#FF6429',
          '500': '#FF4600',
          '600': '#C73700',
          '700': '#8F2700',
          '800': '#571800',
          '900': '#1F0800'
        },
        'gray': {
          DEFAULT: '#48525F',
          '50': '#A4AEBA',
          '100': '#99A3B1',
          '200': '#828FA0',
          '300': '#6B7A8D',
          '400': '#5A6676',
          '500': '#48525F',
          '600': '#30363F',
          '700': '#181B1F',
          '800': '#000000',
          '900': '#000000'
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
    'bg-inherit',
    'bg-transparent',
    'bg-white',
    'bg-current',
    'bg-black',
    'text-slate-600',
    'hover:bg-slate-600',
    {
      pattern: /(border|bg|text)-(slate|calliope)-.+/,
      variants: ['hover'],
    },
    {
      pattern: /(slate|calliope)-.+/,
      variants: ['hover'],
    }
  ]
}
