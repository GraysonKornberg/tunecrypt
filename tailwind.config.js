/** @type {import('tailwindcss').Config} */

module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            colors: {
                pink: '#F0B0C1',
                violet: '#A37AB4',
                magenta: '#D587B8',
                'powder-blue': '#AABCD7',
                'light-blue': '#B4D8E8',
            },
            fontFamily: {
                indie: ['Indie Flower'],
            },
            screens: {
                xsm: '500px',
            },
        },
    },
    plugins: [],
}
