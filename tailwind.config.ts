import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./client/**/*.{ts,tsx}"],
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
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        // Healthcare-focused colors
        health: {
          50: "hsl(168 100% 97%)",
          100: "hsl(168 85% 92%)",
          200: "hsl(168 80% 82%)",
          300: "hsl(168 75% 70%)",
          400: "hsl(168 70% 58%)",
          500: "hsl(168 65% 46%)",
          600: "hsl(168 60% 38%)",
          700: "hsl(168 55% 30%)",
          800: "hsl(168 50% 24%)",
          900: "hsl(168 45% 18%)",
        },
        women: {
          50: "hsl(320 100% 97%)",
          100: "hsl(320 85% 92%)",
          200: "hsl(320 80% 82%)",
          300: "hsl(320 75% 70%)",
          400: "hsl(320 70% 58%)",
          500: "hsl(320 65% 46%)",
          600: "hsl(320 60% 38%)",
          700: "hsl(320 55% 30%)",
          800: "hsl(320 50% 24%)",
          900: "hsl(320 45% 18%)",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      backgroundImage: {
        'gradient-health': 'linear-gradient(135deg, hsl(168 65% 46%) 0%, hsl(200 80% 50%) 100%)',
        'gradient-women': 'linear-gradient(135deg, hsl(320 65% 60%) 0%, hsl(280 70% 65%) 100%)',
        'gradient-hero': 'linear-gradient(135deg, hsl(200 80% 50%) 0%, hsl(168 65% 46%) 100%)',
        'gradient-mental': 'linear-gradient(135deg, hsl(280 70% 65%) 0%, hsl(320 65% 60%) 100%)',
        'gradient-emergency': 'linear-gradient(135deg, hsl(0 84% 60%) 0%, hsl(15 88% 55%) 100%)',
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        "float": {
          "0%, 100%": {
            transform: "translateY(0px)",
          },
          "50%": {
            transform: "translateY(-10px)",
          },
        },
        "fade-in": {
          "0%": {
            opacity: "0",
            transform: "translateY(20px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0px)",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "float": "float 3s ease-in-out infinite",
        "pulse-slow": "pulse 3s ease-in-out infinite",
        "fade-in": "fade-in 0.8s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
