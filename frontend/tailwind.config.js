module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontFamily: {
      'roboto': ['roboto'],
      'inter': ['inter']
    },
    backgroundSize: {
      'size-200': "200% 200%"
    },
    backgroundPosition: {
      'pos-0': "0% 0%",
      'pos-100': "100% 100%"
    },
    extend: {
      backgroundImage: {
        'landing': "url('/src/Assets/images/sampleBackground.png')",
        'card': "radial-gradient(115.12% 179.71% at 30.06% 38.86%, #01000D 0%, rgba(17, 12, 79, 0.99) 93.99%, rgba(4, 0, 53, 0.99) 98.04%)",
        'card-gradient': "radial-gradient(50% 50% at 50% 50%, #36377C 0%, #2E3196 0.01%, #151647 100%)"//"linear-gradient(302.08deg, #4D4F95 -2.95%, #2B2D66 65.12%)"
      },
      backgroundColor: {
        'sidebar': "rgb(7,6,33)",
        'sidebar-highlight': "rgb(16,136,255)",
        
      },
    },
  },
  plugins: [
    require("tailwind-scrollbar")
  ],
  variants: {
    scrollbar: ['rounded']
  },


}
