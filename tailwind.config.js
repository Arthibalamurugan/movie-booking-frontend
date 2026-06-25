module.exports = {
  content: ['./src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        cinemaRed: '#E50914',
        cinemaGold: '#F59E0B',
        cinemaBlue: '#3B82F6',
        surface: '#171717',
        surfaceAlt: '#1E1E1E',
        muted: '#9CA3AF'
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif']
      },
      boxShadow: {
        glow: '0 28px 80px rgba(233,9,20,0.18)',
        soft: '0 20px 80px rgba(0,0,0,0.35)'
      },
      backgroundImage: {
        cinematic: 'radial-gradient(circle at 10% 10%, rgba(229,9,20,0.18), transparent 25%), radial-gradient(circle at 90% 10%, rgba(59,130,246,0.14), transparent 20%), linear-gradient(180deg,#0f0f1a 0%,#151515 100%)'
      }
    }
  },
  plugins: []
};
