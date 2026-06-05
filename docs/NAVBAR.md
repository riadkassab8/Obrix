# Navbar Component Documentation

## Overview
The Navbar component is the main navigation bar for the Obrix landing page. It provides navigation links, language toggle, theme toggle, and a WhatsApp button.

## Location
`src/pages/Home.tsx` - Lines 289-479

## Features

### Navigation Links
The navbar includes the following navigation links:

| English | Arabic | Href |
|---------|--------|------|
| Home | الرئيسية | `/` |
| Work | أعمالنا | `/projects` |
| Services | خدماتنا | `#services` |
| Packages | باقاتنا | `#packages` |
| Contact | تواصل معنا | `#contact` |

### Components

#### 1. Logo Section
- Rotating hexagonal SVG shape
- Animated "Obrix" text that appears/disappears
- Links to home page (`/`)

#### 2. Desktop Navigation
- Hidden on mobile (`hidden md:flex`)
- Links with hover effects:
  - Scale: 1.05
  - Y position: -2px
  - Color change to `var(--accent1)`
  - Animated underline (width 0 to 100%)
  - Tap effect: scale 0.95
- Initial animation: fade in from top (opacity 0 to 1, y -10 to 0)
- Staggered animation delay: `i * 0.1`

#### 3. Mobile Menu Button
- Hamburger menu icon (24px)
- Opens mobile menu overlay
- Visible only on mobile (`md:hidden`)

#### 4. Action Buttons (Desktop)
- **Language Toggle**: Switches between English and Arabic
  - Scale on hover: 1.05
  - Scale on tap: 0.95
  - Text: "عربي | EN" / "EN | عربي"
  
- **Theme Toggle**: Switches between dark and light mode
  - Scale on hover: 1.1
  - Rotate on hover: 180 degrees
  - Scale on tap: 0.9
  - Spring animation
  - Icon: Sun (dark) / Moon (light)
  
- **WhatsApp Button**: Opens WhatsApp chat
  - Uses WABtn component
  - Links to: `https://wa.me/201098277229`

#### 5. Mobile Menu Overlay
- Full-screen overlay
- Backdrop blur effect
- Close button (X icon)
- Navigation links (vertical layout):
  - Scale on hover: 1.05
  - X position: 5px (LTR) / -5px (RTL)
  - Color change to `var(--accent1)`
  - Animated underline
  - Tap effect: scale 0.95
  - Initial animation: slide in from side
  - Staggered animation delay: `i * 0.1`
- Footer actions:
  - Language toggle button
  - Theme toggle button
  - WhatsApp button (full width)

## Styling

### CSS Variables Used
- `var(--navbar-bg)`: Navbar background color (when scrolled)
- `var(--border)`: Border color
- `var(--text)`: Text color
- `var(--text-muted)`: Muted text color
- `var(--accent1)`: Accent color (used for hover states)
- `var(--surface)`: Surface color
- `var(--surface2)`: Surface color variant

### Responsive Breakpoints
- Mobile: `< md` (768px)
- Desktop: `>= md` (768px)

## State Management

### Local State
- `scrolled`: Boolean - Tracks if page has been scrolled
- `mobileMenuOpen`: Boolean - Controls mobile menu visibility

### Context Hooks
- `useLang()`: Language context (en/ar)
- `useTheme()`: Theme context (dark/light)

## Animations

### Framer Motion Used
- `m.a`: Animated anchor tag
- `m.button`: Animated button
- `m.div`: Animated div
- `AnimatePresence`: Handles exit animations

### Animation Details

#### Desktop Nav Links
```jsx
initial={{ opacity: 0, y: -10 }}
animate={{ opacity: 1, y: 0 }}
transition={{ delay: i * 0.1 }}
whileHover={{ 
  scale: 1.05, 
  y: -2,
  color: "var(--accent1)"
}}
whileTap={{ scale: 0.95 }}
```

#### Mobile Nav Links
```jsx
initial={{ opacity: 0, x: lang === "en" ? -20 : 20 }}
animate={{ opacity: 1, x: 0 }}
whileHover={{ 
  scale: 1.05, 
  x: lang === "en" ? 5 : -5,
  color: "var(--accent1)"
}}
whileTap={{ scale: 0.95 }}
transition={{ delay: i * 0.1 }}
```

#### Mobile Menu Overlay
```jsx
initial={{ opacity: 0 }}
animate={{ opacity: 1 }}
exit={{ opacity: 0 }}
transition={{ duration: 0.3 }}
```

## Accessibility
- Semantic HTML: `<nav>` element
- ARIA labels: Not explicitly set (could be improved)
- Keyboard navigation: Standard link behavior
- Touch targets: Adequate size for mobile

## Dependencies
- React hooks: `useState`, `useEffect`
- Framer Motion: `m`, `AnimatePresence`
- Lucide React: `Menu`, `X`, `Sun`, `Moon`
- Custom contexts: `useLang`, `useTheme`

## Future Improvements
- Add ARIA labels for better accessibility
- Implement smooth scroll for anchor links
- Add keyboard shortcuts for navigation
- Consider adding a search functionality
- Add breadcrumbs for deeper navigation
