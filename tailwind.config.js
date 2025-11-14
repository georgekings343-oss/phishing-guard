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
        border: "#1e293b",
        input: "#1e293b",
        ring: "#3b82f6",
        background: "#0a0f1e",
        foreground: "#f8fafc",
        primary: { DEFAULT: "#3b82f6", foreground: "#ffffff" },
        secondary: { DEFAULT: "#64748b", foreground: "#ffffff" },
        destructive: { DEFAULT: "#ef4444", foreground: "#ffffff" },
        muted: { DEFAULT: "#1e293b", foreground: "#94a3b8" },
        accent: { DEFAULT: "#3b82f6", foreground: "#ffffff" },
        popover: { DEFAULT: "#1a1f2e", foreground: "#f8fafc" },
        card: { DEFAULT: "#1a1f2e", foreground: "#f8fafc" },
        success: { DEFAULT: "#10b981", foreground: "#ffffff" },
        warning: { DEFAULT: "#f59e0b", foreground: "#ffffff" },
        error: { DEFAULT: "#ef4444", foreground: "#ffffff" },
        surface: "#1a1f2e",
        'text-primary': "#f8fafc",
        'text-secondary': "#cbd5e1",
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
        glow: {
          "0%, 100%": { boxShadow: "0 0 5px #3b82f6, 0 0 10px #3b82f6, 0 0 15px #3b82f6" },
          "50%": { boxShadow: "0 0 10px #3b82f6, 0 0 20px #3b82f6, 0 0 30px #3b82f6" },
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        glow: "glow 2s ease-in-out infinite alternate",
      },
      backgroundImage: {
        'security-gradient': 'linear-gradient(135deg, #0a0f1e 0%, #1a1f2e 50%, #0f172a 100%)',
        'blue-gradient': 'linear-gradient(135deg, #1e40af 0%, #3b82f6 50%, #60a5fa 100%)',
      },
      backdropBlur: { xs: '2px' },
      backgroundColor: {
        'dark-overlay': '#1a1f2e', // changed from semi-transparent
        'red-overlay': '#dc2626',   // solid red
      }
    },
  },
  plugins: [],
}
