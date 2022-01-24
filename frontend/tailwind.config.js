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
        'login-gradient': '#CEDAF3',//' linear-gradient(90deg, rgba(231,229,255,1) 0%, rgba(247,247,247,1) 32%, rgba(235,241,255,1) 100%)',//'linear-gradient(203deg, rgba(46,39,59,1) 0%, rgba(110,35,180,1) 16%, rgba(81,25,222,1) 51%, rgba(7,6,18,1) 100%);',// 'linear-gradient(211deg, rgba(100,29,177,1) 0%, rgba(92,14,140,1) 19%, rgba(81,25,222,1) 66%, rgba(29,18,99,1) 100%);',
        'card': "radial-gradient(115.12% 179.71% at 30.06% 38.86%, #01000D 0%, rgba(17, 12, 79, 0.99) 93.99%, rgba(4, 0, 53, 0.99) 98.04%)",
        'dashboard': 'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(0,0,41,1) 51%, rgba(0,0,0,1) 100%);'//'#F1F5F9'//'linear-gradient(100deg, rgba(0,9,36,1) 0%, rgba(67,40,231,1) 19%, rgba(61,39,197,1) 72%, rgba(13,3,73,1) 100%);' //'linear-gradient(to right, #000000, #243b55);'
      },
      backgroundColor: {
        'landing': "#000000",// "linear-gradient(135deg, rgba(5,13,49,1) 0%, rgba(18,46,95,1) 32%, rgba(47,2,96,1) 100%);",//"radial-gradient(50% 50% at 50% 50%, rgba(2,16,73,1) 0%, rgba(18,46,95,1) 32%, rgba(47,2,96,1) 100%)",//"url('/src/Assets/images/sampleBackground.png')",
        'sidebar': "rgb(7,6,33)",
        'sidebar-highlight': "rgb(16,136,255)",
        'contest-card': "rgba(255,255,255,0.1)",
        'contest-card-hover': "#295ff5"
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
