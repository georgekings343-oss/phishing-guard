/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "#e2e8f0", // slate-200
        input: "#ffffff", // white
        ring: "#0ea5e9", // sky-500
        background: "#f9fafb", // gray-50
        foreground: "#1e293b", // slate-800
        primary: {
          DEFAULT: "#1e40af", // blue-800
          foreground: "#ffffff",
        },
        secondary: {
          DEFAULT: "#64748b", // slate-500
          foreground: "#ffffff",
        },
        destructive: {
          DEFAULT: "#dc2626", // red-600
          foreground: "#ffffff",
        },
        muted: {
          DEFAULT: "#f1f5f9", // slate-100
          foreground: "#64748b", // slate-500
        },
        accent: {
          DEFAULT: "#0ea5e9", // sky-500
          foreground: "#ffffff",
        },
        popover: {
          DEFAULT: "#ffffff", // solid white (no transparency)
          foreground: "#1e293b", // slate-800
        },
        card: {
          DEFAULT: "#ffffff", // solid white
          foreground: "#1e293b", // slate-800
        },
        success: {
          DEFAULT: "#059669", // emerald-600
          foreground: "#ffffff",
        },
        warning: {
          DEFAULT: "#d97706", // amber-600
          foreground: "#ffffff",
        },
        error: {
          DEFAULT: "#dc2626", // red-600
          foreground: "#ffffff",
        },
        surface: "#ffffff", // white
        'text-primary': "#1e293b", // slate-800
        'text-secondary': "#64748b", // slate-500
      },
      borderRadius: {
        lg: "0.5rem",
        md: "0.375rem",
        sm: "0.25rem",
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [],
}