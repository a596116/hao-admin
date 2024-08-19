/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme'
import type { Config } from 'tailwindcss'
import plugin from 'tailwindcss/plugin'

module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  important: true,
  theme: {
    screens: {
      xs: '475px',
      ...defaultTheme.screens,
    },
    fontSize: {
      ...defaultTheme.fontSize,
      h1: [
        '2.5rem',
        {
          fontWeight: '500',
          lineHeight: '3rem',
        },
      ],
      h2: [
        '2rem',
        {
          fontWeight: '500',
          lineHeight: '2.375rem',
        },
      ],
      h3: [
        '1.75rem',
        {
          fontWeight: '500',
          lineHeight: '2rem',
        },
      ],
      h4: [
        '1.5rem',
        {
          fontWeight: '500',
          lineHeight: '1.75rem',
        },
      ],
      h5: [
        '1.25rem',
        {
          fontWeight: '500',
          lineHeight: '1.5rem',
        },
      ],
      h6: [
        '1rem',
        {
          fontWeight: '500',
          lineHeight: '1.25rem',
        },
      ],
      body: [
        '1rem',
        {
          fontWeight: '400',
          lineHeight: '1.5rem',
        },
      ],
      small: [
        '0.875rem',
        {
          fontWeight: '400',
          lineHeight: '1.25rem',
        },
      ],
      tiny: [
        '0.75rem',
        {
          fontWeight: '400',
          lineHeight: '1.25rem',
        },
      ],
    },
    extend: {
      colors: {
        hd: {
          primary: 'var(--hd-primary)',
          'primary-hover': 'var(--hd-primary-hover)',
          'primary-active': 'var(--hd-primary-active)',
          'login-bg': 'var(--hd-login-bg)',
          success: 'var(--hd-success)',
          danger: 'var(--hd-danger)',
          warning: 'var(--hd-warning)',
          info: 'var(--hd-info)',
          link: 'var(--hd-link)',
          light: 'var(--hd-light)',
          text: 'var(--hd-text)',
          'text-50': 'var(--hd-text-50)',
          dark: 'var(--hd-dark)',
          'dark-50': 'var(--hd-dark-50)',
          muted: 'var(--hd-muted)',
          white: 'var(--hd-white)',
          'white-50': 'var(--hd-white-50)',
          'black-50': 'var(--hd-black-50)',
          disable: 'var(--hd-disable)',
          border: 'var(--hd-border)',
          bg: 'var(--hd-bg)',
          'bg-1': 'var(--hd-bg-1)',
          'bg-50': 'var(--hd-bg-50)',
        },
      },
      animation: {
        move: 'svgMove 5s ',
      },
      keyframes: {
        svgMove: {
          '0%': { strokeDasharray: '0, 600px' },
          '100%': { strokeDasharray: '600px, 0' },
        },
      },
    },
  },
  plugins: [
    plugin(function ({ addComponents }) {
      const hoverTransitionBg = {
        '.hover-transition-bg': {
          '@apply relative cursor-pointer': {},
          '&::before': {
            '@apply absolute left-0 top-0 z-0 h-full w-full': {},
            'z-index': '1',
            'pointer-events': 'none',
            content: '""',
            'background-color': 'color-mix(in srgb, var(--primary-text-color) 10%, transparent)',
            'border-radius': 'inherit',
            opacity: '0',
            transition: 'all 0.25s ease',
            transform: 'scale(0.5)',
          },
          '@media (hover: hover)': {
            '&:hover::before': {
              opacity: '1',
              transform: 'scale(1)',
            },
          },
        },
      }
      addComponents(hoverTransitionBg)
    }),
    plugin(function ({ addVariant }) {
      addVariant('hover-hover', '@media (hover: hover)')
    }),
  ],
} satisfies Config
