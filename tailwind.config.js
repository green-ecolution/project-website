/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx,css}',
  ],
  theme: {
    colors: {
      'current': 'currentColor',
      'transparent': 'transparent',
      'white': '#FCFCFC',
      'green': {
        'light': {
          '900': '#ACB63B',
        },
        'middle': {
          '900': '#659858',
        },
        'dark': {
          '900': '#4C7741',
        },
      },
      'grey': {
        '100': '#E5E5E5',
        '900': '#171717',
      },
    },
    fontFamily: {
      'lato': ['Lato', 'sans-serif'],
      'nunito-sans': ['Nunito Sans', 'sans-serif'],
    },
    fontSize: {
      'xxs': ['0.625rem', '1'], // 10px
      'xs': ['0.75rem', '1.2'], // 12px
      'sm': ['0.875rem', '1.4'], // 14px
      'base': ['1rem', '1.5'], // 16px
      'lg': ['1.125rem', '1.55'], // 18px
      'xl': ['1.25rem', '1.55'], // 20px
      '2xl': ['1.5rem', '1.35'], // 24px
      '3xl': ['1.75rem', '1.43'], // 28px
      '4xl': ['2rem', '1.33'], // 32px
      '5xl': ['2.25rem', '1.33'], // 36px
      '6xl': ['3rem', '1.25'], // 48px
    },
    extend: {
        backgroundImage: {
            'background-footer-mobile': "url('/assets/svg/background/footer-mobile.svg')",
            'background-footer-desktop': "url('/assets/svg/background/footer-desktop.svg')",
        },
        screens: {
            '3xl': '1920px',
        },
        spacing: {
            '18': '4.5rem',
            '208': '52rem',
        },
        boxShadow: {
            'mainNav': '-4px 0px 20px 8px rgba(0,0,0,0.1)',
        },
    },
  },
  plugins: [],
};
