module.exports = {
  content: [
    './index.html',
    './src/**/*.{ts,tsx,js,jsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif']
      },
      colors: {
        primary: '#2F7F78',
        secondary: '#C76A5A',
        'bg-neutral': '#FAF8F5',
        'bg-soft': '#F2EEE9',
        'glass': 'rgba(255,255,255,0.6)',
        terracotta: {
          500: '#C76A5A',
          600: '#B95C4D'
        },
        forest: {
          500: '#2F7F78',
          600: '#256A64'
        },
        dusty: {
          500: '#D88A94',
          50: '#F6E8EA'
        },
        sage: {
          500: '#8FAE9D',
          700: '#2F4F46'
        },
        mustard: {
          500: '#C8A24C'
        },
        rose: {
          50: '#F6E8EA',
          400: '#D88A94',
          500: '#C76A5A',
          600: '#B95C4D'
        }
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.5rem'
      }
    }
  },
  plugins: []
}
