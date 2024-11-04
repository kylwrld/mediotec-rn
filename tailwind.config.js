/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
    presets: [require("nativewind/preset")],
    theme: {
      extend: {
        fontFamily: {
            // "inter-thin": ['Inter_100Thin'],
            // "inter-regular": ["Inter_400Regular"],
            // "inter-medium": ["Inter_500Medium"],
            // "inter-semibold": ["Inter_600SemiBold"],
            // "inter-bold": ["Inter_700Bold"],
            // "inter-black": ['Inter_900Black'],
            "inter-black": ["Inter-Black"],
            "inter-bold": ["Inter-Bold"],
            "inter-extrabold": ["Inter-ExtraBold"],
            "inter-light": ["Inter-Light"],
            "inter-medium": ["Inter-Medium"],
            "inter-regular": ["Inter-Regular"],
            "inter-semibold": ["Inter-SemiBold"],
        },
      },
    },
    plugins: [],
}
