# Placement Hub Brand Guidelines
This document outlines the core design system and UX principles for the Placement Hub platform.

## Color Palette

The platform relies strictly on CSS variables defined in `:root`. No external utility suites (like Tailwind) are used. 

### Brand Colors (Sky Blue scale)
The primary brand identity focuses on a clean, professional, academic blue.
- `--brand-50`: `#f0f9ff` (Softest background hints)
- `--brand-100`: `#e0f2fe`
- `--brand-200`: `#bae6fd`
- `--brand-500`: `#0ea5e9` (Active/Hover states)
- `--brand-600`: `#0284c7` **(Primary Brand Color)**
- `--brand-700`: `#0369a1` (Deep accents)

### Structural & Typography Colors (Light Mode)
- `--bg-color`: `#f8fafc` (Slate 50)
- `--text-main`: `#0f172a` (Slate 900)
- `--text-muted`: `#64748b` (Slate 500)
- `--border-light`: `#e2e8f0` (Slate 200)
- `--white`: `#ffffff`

### Dark Mode (via `[data-theme='dark']`)
Dark mode uses deep slate and slightly brighter brand blues for accessibility.
- `--brand-600`: `#38bdf8`
- `--bg-color`: `#0f172a`
- `--white` (surface color): `#1e293b`
- `--text-main`: `#f8fafc`
- `--text-muted`: `#94a3b8`
- `--border-light`: `#334155`

## Typography

- **Font Family**: `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif`
- **Base Line Height**: `1.5`
- Uses native OS fonts over heavy external CDNs to ensure snappy performance and clean OS-native aesthetics.

## Core UI Components

### Cards (`.card`)
Cards are the foundational block of the dashboard and list layouts.
- **Background**: `var(--white)`
- **Border**: `1px solid var(--border-light)`
- **Radius**: `0.75rem` (12px)
- **Shadow**: `var(--shadow-sm)`

### Buttons
All buttons use standard padded structures.
- **`.btn-primary`**: Brand-colored, solid button for primary actions (Submit, Register). White text on `--brand-600`.
- **`.btn-outline`**: Transparent button with a `--border-light` edge. Used for secondary actions (Role Selection UI, form toggles).

## Principles
1. **Consistency**: Always use CSS variables. Never hardcode hex values like `#fff` or `#000` directly into component CSS unless testing, to protect the Dark Mode transition system.
2. **Spacing**: Rely on standard Flexbox utilities (`.flex`, `.gap-4`, `.items-center`) natively built in `index.css`.
3. **Animations**: Subtle, 0.2s to 0.3s ease transitions on `background-color` and `border-color` to give the app a responsive, modern feel.
