import type { Config } from 'tailwindcss'

const config: Config = {
   content: [
      './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
      './src/components/**/*.{js,ts,jsx,tsx,mdx}',
      './src/app/**/*.{js,ts,jsx,tsx,mdx}',
   ],
   theme: {
      extend: {
         screens: {
            mobile: { max: '600px' },
            tablet: { min: '600px' },
            laptop: { min: '768px' },
            desktop: { min: '1024px' },
         },
         colors: {
            primary: '#CB3494',
            secondary: '#FECFE7',
            tertiary: '#D55CA9'
         },
         animation: {
            'reverse-spin': 'reverse-spin 0.3s linear infinite',
         },
         keyframes: {
            'reverse-spin': {
               from: {
                  transform: 'rotate(360deg)',
               },
            },
         },
      },
   },
   plugins: [],
}
export default config
