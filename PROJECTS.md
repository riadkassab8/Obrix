# Obrix - Full-Stack Digital Studio

## Project Overview

Obrix is a modern, full-stack digital studio landing page built with React, TypeScript, and cutting-edge web technologies. It serves as a portfolio and business showcase for a digital agency specializing in web development, digital marketing, and desktop applications.

**Version:** 1.0.0
**Type:** Private Project
**Developer:** Eng/Riadkassab
**Year:** 2026

---

## Tech Stack

### Core Framework
- **React 19.1.0** - UI library
- **TypeScript 5.9.3** - Type safety
- **Vite 7.3.2** - Build tool and dev server

### Routing
- **Wouter 3.3.5** - Lightweight router with hash-based routing support

### UI Components & Styling
- **Tailwind CSS 4.1.14** - Utility-first CSS framework
- **Radix UI** - Comprehensive component library (40+ components)
  - Accordion, Alert Dialog, Avatar, Button, Calendar, Card, Carousel, Checkbox, Collapsible, Command, Context Menu, Dialog, Dropdown Menu, Hover Card, Input, Label, Menubar, Navigation Menu, Pagination, Popover, Progress, Radio Group, Resizable, Scroll Area, Select, Separator, Sheet, Sidebar, Skeleton, Slider, Switch, Tabs, Toast, Toggle, Tooltip
- **Framer Motion 12.23.24** - Animation library
- **Lucide React 0.545.0** - Icon library
- **Class Variance Authority (CVA)** - Component variant management
- **Tailwind Merge** - Tailwind class merging utility
- **clsx** - Conditional className utility

### State Management & Data Fetching
- **TanStack React Query 5.90.21** - Data fetching and caching
- **React Hook Form 7.55.0** - Form management
- **Zod 3.25.76** - Schema validation
- **@hookform/resolvers** - Form validation integration

### Theming
- **next-themes 0.4.6** - Dark/light theme management

### Additional Libraries
- **date-fns 3.6.0** - Date manipulation
- **react-day-picker 9.11.1** - Date picker
- **embla-carousel-react 8.6.0** - Carousel component
- **recharts 2.15.2** - Chart library
- **react-resizable-panels 2.1.7** - Resizable panels
- **sonner 2.0.7** - Toast notifications
- **vaul 1.1.2** - Drawer component
- **cmdk 1.1.1** - Command palette
- **input-otp 1.4.2** - OTP input component

---

## Project Structure

```
Obrix/
├── src/
│   ├── components/
│   │   └── ui/           # Radix UI components (55 components)
│   ├── contexts/
│   │   ├── LangContext.tsx    # Language switching (EN/AR)
│   │   └── ThemeContext.tsx   # Theme switching (Dark/Light)
│   ├── hooks/
│   │   └── (2 custom hooks)
│   ├── lib/
│   │   └── (utility functions)
│   ├── pages/
│   │   ├── Home.tsx       # Main landing page
│   │   ├── Projects.tsx   # Projects showcase page
│   │   └── not-found.tsx  # 404 page
│   ├── App.tsx            # Main app component with routing
│   ├── main.tsx           # Entry point
│   └── index.css          # Global styles
├── public/                # Static assets
├── scripts/
│   └── build.mjs          # Custom build script
├── .gitignore
├── components.json        # shadcn/ui configuration
├── package.json
├── tsconfig.json
├── vite.config.ts
└── PROJECTS.md            # This file
```

---

## Features

### Core Features
1. **Multi-language Support** - English and Arabic with RTL support
2. **Dark/Light Theme** - Persistent theme switching
3. **Smooth Animations** - Framer Motion powered animations
4. **Responsive Design** - Mobile-first approach
5. **Fast Performance** - Optimized with Vite and React 19

### Page Features

#### Home Page (`/`)
- **Hero Section** - Animated hero with staggered text animation
- **Marquee** - Scrolling text banner with project stats
- **About Section** - Company overview with animated cards
- **Services Section** - Three main services with hover effects
- **Packages Section** - Three pricing tiers (Starter, Growth, Studio)
- **Why Obrix Section** - Feature chips with hover animations
- **CTA Section** - Contact call-to-action
- **Footer** - Quick links and social media

#### Projects Page (`/projects`)
- **Project Showcase** - Grid of 14 projects with live previews
- **Filter System** - Filter by category (All, Portfolio, E-Commerce, Landing, Education, Dashboard)
- **Live Previews** - Iframe-based live site previews
- **Hover Effects** - Project cards with hover animations
- **Responsive Grid** - Adapts to screen size

### Navigation Features
- **Animated Navbar** - Fixed navbar with scroll effects
- **Mobile Menu** - Full-screen mobile menu with animations
- **Smooth Scrolling** - Custom smooth scroll implementation
- **Active State** - Current page highlighting
- **Logo Animation** - Rotating hexagon with animated text

---

## Deployed Projects

### Portfolio Projects (4)

1. **Professional Portfolio**
   - URL: https://new-portfolio-site-h2gw.vercel.app/
   - Category: Portfolio
   - Tags: React, Next.js, Portfolio, Vercel
   - Description: Clean and professional portfolio website with elegant design

2. **Moaz Sigma**
   - URL: https://moaz-sigma.vercel.app/
   - Category: Portfolio
   - Tags: React, Portfolio, Vercel
   - Description: Professional portfolio showcasing skills with modern design

3. **Dr. Mohamed**
   - URL: https://dr-mohamed-page.vercel.app/
   - Category: Portfolio
   - Tags: React, CSS Animations, Portfolio, Vercel
   - Description: Medical professional portfolio with service sections

4. **Profissor Portfolio**
   - URL: https://profissor-landing-teacher-landing.vercel.app/
   - Category: Portfolio
   - Tags: React, Teacher, Education, Vercel
   - Description: Professional portfolio for teachers and professors

### E-Commerce Projects (3)

5. **Eldod E-Commerce**
   - URL: https://eldod-ecommerce-wind.vercel.app/
   - Category: E-Commerce
   - Tags: React, Tailwind CSS, E-Commerce, Vercel
   - Description: Full-featured e-commerce platform with product catalog

6. **Sneakers Store**
   - URL: https://sneakers-ecommerce-henna.vercel.app/
   - Category: E-Commerce, Dashboard
   - Tags: React, E-Commerce, Fashion, Responsive
   - Description: Sneaker brand e-commerce store with product pages

7. **JUBA Store**
   - URL: https://juba-store.vercel.app/
   - Category: Landing
   - Tags: React, E-Commerce, Fashion, Responsive
   - Description: Luxury fashion and footwear e-commerce platform

### Landing Pages (11)

8. **Coffee Corner**
   - URL: https://coffee-corner-a1zq.vercel.app/
   - Category: Landing, Menu
   - Tags: HTML5, CSS3, JavaScript, Bootstrap
   - Description: Modern coffee shop website with smooth animations

9. **Same Menu Site**
   - URL: https://new-same-menu-site.vercel.app/
   - Category: Landing, Menu
   - Tags: React, Restaurant, Vercel
   - Description: Restaurant menu website with elegant design

10. **Coffee Brand M**
   - URL: https://coffe-brand-m-salary.vercel.app/
   - Category: Landing
   - Tags: React, Coffee, Vercel
   - Description: Premium coffee brand website with product showcase

11. **Coffee Low Budget**
   - URL: https://coffe-low-budget.vercel.app/
   - Category: Landing
   - Tags: React, Coffee, Vercel
   - Description: Budget-friendly coffee shop website

12. **Islamic Structure**
   - URL: https://islamic-structure.vercel.app/
   - Category: Landing
   - Tags: React, Islamic, Architecture, Vercel
   - Description: Modern Islamic website showcasing Islamic architecture

13. **Metal Factory**
   - URL: https://metal-factory-steel-factory.vercel.app/
   - Category: Landing
   - Tags: React, Industrial, Manufacturing, Vercel
   - Description: Professional metal and steel factory website with industrial design

14. **H-Blend Coffee Menu**
   - URL: https://h-blend-coffee-blend-coffee.vercel.app/
   - Category: Landing, Menu
   - Tags: React, Coffee, Restaurant, Vercel
   - Description: High-quality coffee menu website with elegant design

15. **E-Tmam Company Site**
   - URL: https://e-tmam.vercel.app/
   - Category: Landing
   - Tags: React, Corporate, Business, Vercel
   - Description: Professional company website with modern business design

16. **Tourism Site**
   - URL: https://tourism-landing-tourist-landing-3ft.vercel.app/
   - Category: Landing
   - Tags: React, Travel, Tourism, Vercel
   - Description: Tourism and travel landing page with destination showcase

17. **Dental Clinic**
   - URL: https://dental-clinic-dental-clinic.vercel.app/
   - Category: Landing, Medical
   - Tags: React, Medical, Healthcare, Vercel
   - Description: Professional dental clinic website with appointment booking

### Education Projects (2)

18. **Quran Academy**
    - URL: https://quran-academy-sooty.vercel.app/
    - Category: Education
    - Tags: React, Next.js, Tailwind CSS, Islamic Content
    - Description: Islamic learning platform with Quran recitation

19. **Sabora Academy**
    - URL: https://sabora-acadimy-gxkt.vercel.app/
    - Category: Education
    - Tags: React, Next.js, Education, LMS
    - Description: Modern educational academy platform with courses

### Dashboard Projects (1)

20. **Café Cashier**
    - URL: https://cahier-angular-qhet.vercel.app/login
    - Category: E-Commerce, Dashboard, SAAS
    - Tags: Angular, TypeScript, Dashboard, Charts
    - Description: Complete cashier system for coffee shops with analytics and admin panel

---

**Total Projects: 20**
**All projects deployed on Vercel**

---

## Setup Instructions

### Prerequisites
- Node.js (latest version)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd Obrix
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

5. Preview production build:
```bash
npm run preview
```

### Available Scripts

- `npm run dev` - Start development server on all network interfaces
- `npm run typecheck` - Run TypeScript type checking
- `npm run build` - Build for production using custom build script
- `npm run preview` - Preview production build

---

## Component Architecture

### Context Providers
- **LangProvider** - Manages language state (EN/AR) across the app
- **ThemeProvider** - Manages theme state (Dark/Light) with persistence
- **QueryClientProvider** - Provides React Query for data fetching
- **TooltipProvider** - Radix UI tooltip context

### Key Components

#### Home Page Components
- **Navbar** - Fixed navigation with scroll effects and mobile menu
- **Hero** - Animated hero section with staggered text
- **Marquee** - Scrolling text banner
- **About** - Company overview with animated cards
- **Services** - Three service cards with hover effects
- **Packages** - Three pricing tiers
- **WhyObrix** - Feature chips
- **CTA** - Contact call-to-action
- **Footer** - Footer with links and social media

#### Projects Page Components
- **Navbar** - Same as Home page
- **FadeInWhenVisible** - Reusable fade-in animation component
- **LivePreview** - Iframe-based live site preview component

#### Utility Components
- **FadeInWhenVisible** - Scroll-triggered fade-in animation
- **WABtn** - WhatsApp contact button
- **MailBtn** - Email contact button
- **UIverseBtn** - Animated gradient button
- **FloatingWhatsApp** - Floating WhatsApp button

---

## Styling Approach

### CSS Variables
The project uses CSS custom properties for theming:
- `--bg` - Background color
- `--text` - Primary text color
- `--text-muted` - Muted text color
- `--surface` - Surface color
- `--surface2` - Secondary surface color
- `--card-bg` - Card background
- `--card-border` - Card border color
- `--border` - Border color
- `--navbar-bg` - Navbar background
- `--accent1` - Primary accent color
- `--accent2` - Secondary accent color
- `--accent3` - Tertiary accent color

### Tailwind CSS Configuration
- Uses Tailwind CSS v4 with Vite plugin
- Custom theme configuration via CSS variables
- Responsive design with mobile-first approach
- Dark mode support via next-themes

### Animation System
- **Framer Motion** for complex animations
- Custom easing functions for smooth animations
- Staggered animations for lists and grids
- Scroll-triggered animations using useInView hook

---

## Routing

### Route Structure
- `/` - Home page
- `/projects` - Projects showcase page
- `*` - 404 not found page

### Navigation Links
- **Work** → `/projects`
- **Services** → `/#services`
- **Packages** → `/#packages`
- **Contact** → `/#contact`

---

## Contact Information

- **Email:** riadkassab320@gmail.com
- **WhatsApp:** https://wa.me/201098277229
- **Developer:** Eng/Riadkassab
- **Year:** 2026

---

## Deployment

### Platform
- **Vercel** - All projects deployed on Vercel

### Build Process
- Custom build script (`scripts/build.mjs`)
- Vite for bundling
- TypeScript compilation
- Tailwind CSS processing

### Environment Variables
- `BASE_URL` - Base URL for routing (configured in vite.config.ts)

---

## Performance Optimizations

- React 19 with automatic optimizations
- Code splitting via Vite
- Lazy loading of iframes
- Optimized images
- CSS-in-JS with Tailwind
- Minimal bundle size
- Fast initial load

---

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Progressive enhancement approach

---

## License

© 2026 Obrix. All rights reserved.
Built by Eng/Riadkassab.
