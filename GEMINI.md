# Placement Hub - System Instructions

This file serves as the architectural truth-source for the Placement Hub platform. Any AI assisting with this project (such as Gemini) should abide by the rules and structures documented here.

## 1. Tech Stack Overview

### Frontend
- **Framework:** React (Standard Setup, no Next.js/SSR required)
- **Routing:** `react-router-dom`
- **Styling:** Pure CSS (using specific CSS Modules/files like `index.css` or `Dashboard.css`). **Tailwind CSS is strictly forbidden.**
- **Icons:** `lucide-react`
- **Charts:** `recharts` for Market Analysis and Dashboard visual data.
- **State Management:** React Context API (`AuthContext`, `ThemeContext`).

### Backend
- **Framework:** Node.js + Express
- **Database:** MongoDB via Mongoose ODM
- **Authentication:** JWT (JSON Web Tokens) with `bcryptjs` hashing. Stored in frontend `localStorage`.

## 2. Core Entities & Roles
The `User` model supports three major groups:
1. `student`: Access to resources, questions, and dashboard. Can ask queries.
2. `placed_student`: Access to same areas. Distinct identifier in forums.
3. `mentor`: Simplified registration. Has special UI scopes. Can answer/resolve doubts in the Hub.
*(There is also an internal `admin` role for administrative routes).*

## 3. Strict Development Rules for AI

### CSS & Theming
- **Always use CSS Variables**: The application relies on a system-wide Dark Mode toggle powered by root variables in `index.css`.
- **No Hardcoded Hex**: Do NOT write `#ffffff` or `#000000` into new components. Use `var(--bg-color)`, `var(--white)`, `var(--text-main)`, and `var(--border-light)`.
- **No Tailwind CSS**: Do not inject tailwind classes into JSX. Rely on the base utility classes found in `index.css` (e.g., `.flex`, `.flex-col`, `.w-full`) or component-specific CSS files.

### Backend Data Integrity
- Dummy Data: Do not use user "System Admin" universally. Always attach relations to properly seeded users (students/mentors) so nested populate features work correctly.
- Ensure API routes follow standard RESTful paths (`/api/users`, `/api/questions`, `/api/resources`).

### Component Design
- Aim for sleek, academic professionalism.
- Utilize Card layouts generously.
- Prefer dynamic mapping over hardcoded static lists.

## 4. Known Existing Features
- `DoubtChat`: Real-time nested forum embedded into Dashboards.
- `Market Trends`: Recharts dynamic data view changing based on specific FAANG tab selections.
- Multi-step Registration flow that conditionally asks for Roll Number / Branch / Year only if the selecting role demands it (i.e. hiding them for Mentors).
