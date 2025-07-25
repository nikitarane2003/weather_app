/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Tells Tailwind where to look for class names
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4F46E5', // Indigo
        secondary: '#6366F1',
        background: '#F3F4F6',
      },
      spacing: {
        chatWidth: '1140px',
        answerBox: '723px',
        inputBox: '721px',
      },
    },
  },
  plugins: [],
}
