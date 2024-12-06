/** @type {import('tailwindcss').Config} */

module.exports = {
    darkMode: ["class"],
    content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
  	extend: {
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {},
  		keyframes: {
  			'spinner-leaf-fade': {
  				'0%, 100%': {
  					opacity: '0'
  				},
  				'50%': {
  					opacity: '1'
  				}
  			}
  		},
  		animation: {
  			'spinner-leaf-fade': 'spinner-leaf-fade 800ms linear infinite'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
}
