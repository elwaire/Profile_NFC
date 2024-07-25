
/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
      "./src/**/*.{js,ts,jsx,tsx}", // Include all the files where Tailwind CSS classes are used
      "./src/**/*.{html,scss}", // Include your custom SCSS files
    ],
    theme: {
      extend:{
        colors:{
          primary: "#1677ff",
        },
        textColor: {
          'cl-gray': '#7D7D7D',
        },
        boxShadow: {
          default: "0 0 24px 12px #F3F3F3",
          v2: "0 0 24px 12px #ECECEC",
        },
      },
      container: {
        center: true, // Để căn giữa container
        screens: {
          sm: '100%', // Kích thước container trên màn hình nhỏ
          md: '100%', // Kích thước container trên màn hình trung bình
          lg: '1024px', // Kích thước container trên màn hình lớn
          xl: '1280px', // Kích thước container trên màn hình rất lớn
        },
      },
    },
    plugins: [],
};
