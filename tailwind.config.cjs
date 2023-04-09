/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			animation: {
				'show-bottom-content': 'bottom-content 0.5s linear forwards'
			},
			keyframes: {
				'bottom-content': {
					'0%': { opacity: 0 },
					'100%': { opacity: 1, transform: 'translate(0px, -80px)' }
				}
			}
		}
	},
	daisyui: {
		themes: ['emerald', 'dark']
	},
	plugins: [require('daisyui'), require('@tailwindcss/line-clamp')]
};
