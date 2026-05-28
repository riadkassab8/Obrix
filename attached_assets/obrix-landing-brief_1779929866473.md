# Obrix — Landing Page Brief
**Full Production-Grade React Landing Page**
**v2.0 — Updated with: Bilingual (AR/EN) · Dark/Light Mode · Full Responsiveness**

---

## 🏢 Brand Identity

| Property | Value |
|----------|-------|
| **Brand Name** | Obrix |
| **Tagline (EN)** | Where design meets intelligence. |
| **Tagline (AR)** | حيث يلتقي التصميم بالذكاء. |
| **Sub-tagline (EN)** | Full-stack creativity. |
| **Sub-tagline (AR)** | إبداع بلا حدود. |
| **Brand Personality** | Modern · Premium · Bold · Tech-driven · Creative · Youthful |
| **Framework** | React (JSX, single file artifact) |
| **Styling** | Tailwind CSS + inline styles for advanced effects |
| **Animations** | Framer Motion — heavy use |
| **Languages** | Arabic + English (toggle in navbar) |
| **Themes** | Dark + Light (toggle in navbar) |

---

## 🌐 Bilingual System (AR / EN)

### Language Toggle
- زرار في الـ Navbar — `EN | عر`
- عند الضغط عليه يتغير كل النص في الصفحة فورًا
- لما اللغة عربي: الـ `dir` يبقى `rtl` على كل الصفحة
- لما اللغة إنجليزي: الـ `dir` يبقى `ltr`
- الأنيميشن يفضل شغال بدون أي تأخير عند التبديل

### RTL Considerations
```
- كل الـ flex directions تتعكس أوتوماتيك مع dir="rtl"
- الـ text alignment يتغير: start بدل left/right
- الـ padding/margin تتعكس (ps/pe بدل pl/pr في Tailwind)
- الـ grid يفضل نفسه (لا تأثير)
- الأيقونات الاتجاهية (←→) تتعكس في العربي
- الـ Marquee تتجه من اليسار لليمين في الإنجليزي،
  ومن اليمين لليسار في العربي
```

### Arabic Font
- **عناوين:** `Cairo` (ExtraBold 800) — من Google Fonts
- **Body:** `Cairo` (Regular 400) — نفس الفونت بوزن أخف
- **أو بديل:** `Tajawal` (Bold + Regular)
- الفونت العربي يحل محل Syne + DM Mono تلقائيًا عند تغيير اللغة

### Content Translation Table

| Section | English | Arabic |
|---------|---------|--------|
| Nav: Work | Work | أعمالنا |
| Nav: Services | Services | خدماتنا |
| Nav: Packages | Packages | الباقات |
| Nav: Contact | Contact | تواصل |
| Nav: CTA | Start a Project → | ابدأ مشروعك ← |
| Hero Badge | ✦ Full-Stack Digital Studio | ✦ استوديو رقمي متكامل |
| Hero H1 | We Build Digital Worlds. | نبني عوالم رقمية. |
| Hero Sub | From stunning websites to viral campaigns... | من المواقع المذهلة إلى الحملات الفيروسية... |
| Hero CTA1 | See Our Work → | شاهد أعمالنا ← |
| Hero CTA2 | View Packages | استعرض الباقات |
| About Label | ✦ About Obrix | ✦ عن أوبريكس |
| About H2 | We're not just another agency. | نحن لسنا مجرد وكالة أخرى. |
| About Body | Obrix is a full-stack digital studio... | أوبريكس استوديو رقمي متكامل يجمع... |
| Services H2 | What We Do | ماذا نفعل |
| Service 1 | Web Development | تطوير الويب |
| Service 2 | Digital Marketing | التسويق الرقمي |
| Service 3 | Desktop Applications | تطبيقات سطح المكتب |
| Work H2 | Selected Work | أبرز أعمالنا |
| Work Sub | A glimpse of what we've shipped. | لمحة مما أنجزناه. |
| Packages H2 | Simple Packages | باقات بسيطة |
| Packages Sub | No hidden fees. Just results. | بدون رسوم خفية. فقط نتائج. |
| Pkg 1 Name | Launch | البداية |
| Pkg 2 Name | Growth | النمو |
| Pkg 3 Name | Studio | الاستوديو |
| Why H2 | Why Obrix? | لماذا أوبريكس؟ |
| CTA H2 | Ready to Build Your Digital World? | مستعد لبناء عالمك الرقمي؟ |
| Footer copy | Crafted with obsession. | صُنع بشغف. |

---

## 🌓 Dark / Light Mode System

### Toggle
- أيقونة 🌙 / ☀️ في الـ Navbar بجانب Language toggle
- الحالة الافتراضية: **Dark Mode**
- الانتقال بين الوضعين: CSS transition على كل الألوان (0.3s ease)
- يُحفظ في `localStorage` — يُذكر عند إعادة فتح الصفحة

### Color Tokens — Dark Mode
```css
--bg:           #060610
--surface:      #0d0d1a
--surface2:     #12122a
--border:       rgba(255,255,255,0.06)
--text:         #f0f0f8
--text-muted:   #5a5a7a
--card-bg:      rgba(255,255,255,0.03)
--card-border:  rgba(255,255,255,0.08)
--navbar-bg:    rgba(6,6,16,0.85)  [+ backdrop blur]
```

### Color Tokens — Light Mode
```css
--bg:           #f8f7f4
--surface:      #ffffff
--surface2:     #f0eeea
--border:       rgba(0,0,0,0.08)
--text:         #111118
--text-muted:   #777788
--card-bg:      rgba(255,255,255,0.9)
--card-border:  rgba(0,0,0,0.1)
--navbar-bg:    rgba(248,247,244,0.85) [+ backdrop blur]
```

### Accent Colors (same in both modes)
```css
--accent1:  #6c63ff   (electric violet — PRIMARY)
--accent2:  #00e5c8   (cyber teal — SECONDARY)
--accent3:  #b06cf7   (soft purple — TERTIARY)
--accent4:  #ff6b6b   (warm red — CTA hover)
--gold:     #f5c542   (premium gold)
```

### Light Mode Design Notes
- الخلفية: warm off-white (#f8f7f4) مش أبيض صريح
- الـ orbs والـ gradient blobs: نفسها بس بـ opacity أقل (0.08 بدل 0.15)
- الـ grid overlay: أدق وأخف
- الـ cards: بيضاء ناصعة مع shadow بدل glassmorphism
- النص الرئيسي: #111118 (مش أسود صريح — أرق على العين)
- الـ glow effects على الـ CTAs تفضل نفسها (violet glow شغال في الاتنين)
- الـ noise texture: نفس الـ overlay بس opacity أخف جدًا

---

## 📱 Responsive Design System

### Breakpoints
```
xs:  < 480px   (small phones)
sm:  480–767px (phones)
md:  768–1023px (tablets)
lg:  1024–1279px (small laptops)
xl:  1280px+   (desktops)
```

### Navbar — Responsive
```
Desktop (lg+):
  [Logo]  [Links: Work · Services · Packages · Contact]  [Lang] [Theme] [CTA Button]

Tablet (md):
  [Logo]  [Lang] [Theme] [Hamburger Menu ☰]
  → Dropdown menu slides down with links + CTA

Mobile (sm/xs):
  [Logo]  [Hamburger ☰]
  → Full-screen overlay menu
  → Links centered, large font
  → Lang + Theme toggles at bottom
  → CTA button full-width
```

**Mobile Menu Animation:**
- AnimatePresence → slide down from top OR full-screen fade-in
- Links stagger in one by one (0.1s delay each)
- Close button (×) in top-right corner

### Hero Section — Responsive
```
Desktop:  font-size headline ~88px, centered, particles full
Tablet:   font-size ~60px, reduced particles (20 instead of 40)
Mobile:   font-size ~40px, particles disabled (performance),
          CTAs stack vertically (full-width buttons),
          watermark "OBRIX" text hidden
```

### About Section — Responsive
```
Desktop:  2-column split (text left, cards right)
Tablet:   2-column split (50/50)
Mobile:   Single column — text on top, cards below (stacked vertically)
          Stats row: 3 items in a row (smaller font)
```

### Services Section — Responsive
```
Desktop:  3 cards in a row
Tablet:   3 cards in a row (smaller padding)
Mobile:   1 card per row (full width, stacked)
```

### Work / Portfolio — Responsive
```
Desktop:  3 columns × 2 rows = 6 cards
Tablet:   2 columns × 3 rows = 6 cards
Mobile:   1 column × 6 rows = 6 cards (full width each)
          Card height: 200px mobile / 280px desktop
```

### Packages Section — Responsive
```
Desktop:  3 cards side by side (featured card slightly taller)
Tablet:   3 cards side by side (equal height, scrollable if needed)
Mobile:   1 card per row, stacked
          Featured card has colored top border to stand out
```

### Why Obrix — Responsive
```
Desktop:  2 columns × 3 rows grid
Tablet:   2 columns × 3 rows grid
Mobile:   1 column × 6 rows (full width chips)
```

### Footer — Responsive
```
Desktop:  3 columns (Logo+desc | Links | Social+Email)
Tablet:   2 columns (Logo | Links+Social)
Mobile:   Single column, centered
          Logo top, links middle, social icons row, copyright bottom
```

### Typography Scale — Responsive
```
                Mobile    Tablet    Desktop
Hero H1:        38px      58px      88px
Section H2:     28px      36px      52px
Card Title:     18px      20px      22px
Body Text:      13px      14px      14px
Nav Links:      14px      14px      15px
Badge Text:     10px      10px      11px
```

### Touch Optimizations (Mobile)
- كل الأزرار والـ links: min-height 44px (Apple HIG standard)
- الـ cards: tap highlight بدل hover effects
- الـ custom cursor مش شغال على موبايل (مخفي)
- الـ marquee/ticker: يشتغل بسلاسة على touch screens
- No horizontal overflow anywhere

---

## 📐 Page Structure & Sections (Full Detail)

### 1. NAVBAR
- Logo: `OBRIX` في Syne 800 + أيقونة SVG صغيرة متحركة (hex orbit)
- Nav links: `Work · Services · Packages · Contact`
- Controls (من اليمين): `[Lang Toggle] [Theme Toggle] [CTA Button]`
- Behavior: transparent فوق، frosted glass بعد scroll 50px
- Mobile: Hamburger menu مع full-screen overlay

---

### 2. HERO SECTION
**الجزء الأهم — لازم يكون مذهل**

```
[Badge: ✦ Full-Stack Digital Studio]

We Build
Digital Worlds.

[Italic subtext:]
From stunning websites to viral campaigns —
Obrix turns your vision into a digital experience
people remember.

[CTAs:]
  [ See Our Work → ]   [ View Packages ]

[Scroll indicator ↓]
```

**Visual Effects:**
- Animated gradient mesh (violet + teal orbs floating)
- Floating particles (40 dots — disabled on mobile)
- Perspective grid fading to center
- Giant blurred "OBRIX" watermark at 3% opacity
- Word-by-word staggered entrance animation
- Mouse-tracking cursor glow (desktop only)
- Bouncing scroll indicator at bottom

---

### 3. MARQUEE TICKER (Full-width)
```
★ 80+ Projects  ·  ★ 3 Expert Teams  ·  ★ 100% Satisfaction
·  ★ Web · Marketing · Desktop  ·  ★ Built for Growth  [repeats]
```
- EN: scrolls left → right | AR: scrolls right → left
- Gradient text (violet → teal)
- Thin border top + bottom

---

### 4. ABOUT SECTION

**Left / Top (Mobile):**
```
[Label: ✦ About Obrix]

We're not just
another agency.

Obrix is a full-stack digital studio combining
world-class web development, creative marketing,
and powerful desktop software — all under one roof.

We don't just build websites.
We build digital ecosystems.

[Stats: 3 Teams | 80+ Projects | 5+ Industries]
```

**Right / Bottom (Mobile):**
- 3 floating glassmorphism cards:
  - 💻 Web Development (violet border)
  - 📣 Marketing (teal border)
  - 🖥️ Desktop Apps (purple border)
- كل كارت يعمل float animation مستقلة (staggered y-axis)

---

### 5. SERVICES SECTION

**Title:** What We Do / ماذا نفعل

**3 Cards (grid on desktop, stacked on mobile):**

| | Card 1 | Card 2 | Card 3 |
|-|--------|--------|--------|
| Icon | `</>` SVG | `↗` SVG | `⬜` SVG |
| Title EN | Web Development | Digital Marketing | Desktop Applications |
| Title AR | تطوير الويب | التسويق الرقمي | تطبيقات سطح المكتب |
| Accent | Violet | Teal | Purple |
| Tags | React · Next.js · GSAP | Instagram · TikTok · Google | POS · ERP · Automation |

**Hover:** border يضيء بلون الـ accent + card يرتفع + glow shadow

---

### 6. WORK / PORTFOLIO SECTION

**Title:** Selected Work / أبرز أعمالنا

**6 Project Cards:**

| Card | Gradient | Label EN | Label AR | Type |
|------|----------|----------|----------|------|
| 1 | violet → teal | Project Alpha | مشروع ألفا | Web |
| 2 | teal → blue | Project Beta | مشروع بيتا | Marketing |
| 3 | purple → pink | Project Gamma | مشروع جاما | Desktop |
| 4 | gold → orange | Project Delta | مشروع دلتا | Branding |
| 5 | blue → violet | Project Epsilon | مشروع إبسيلون | Web + Marketing |
| 6 | pink → purple | Project Zeta | مشروع زيتا | Full Package |

**كل كارت:**
- Hover: overlay يظهر مع "View Project →" / "مشاهدة المشروع ←"
- Scale up + glow border
- Link يُفتح في tab جديد (placeholder URL)

---

### 7. PACKAGES SECTION

**Title:** Simple Packages / باقات بسيطة
**No prices displayed**

| | Launch / البداية | Growth / النمو ⭐ | Studio / الاستوديو |
|-|---------|--------|--------|
| Badge | ✦ Starter | ★ Most Popular | ◆ Premium |
| Style | Glassmorphism | Glowing violet border | Glassmorphism |
| Item 1 | 5-Page Business Website | Custom Web App or Store | Everything in Growth |
| Item 2 | Mobile Responsive Design | Full Branding Identity | Desktop Application |
| Item 3 | Basic SEO Setup | 3 Months Social Media | Full Marketing Funnel |
| Item 4 | 1 Month Social Media | Ad Campaign (Google+Meta) | Dedicated Account Manager |
| Item 5 | Brand Color & Typography | SEO Strategy & Content | Priority Support & Updates |
| Item 6 | — | Monthly Performance Report | Quarterly Strategy Review |
| CTA EN | Get Started → | Start Growing → | Let's Build → |
| CTA AR | ابدأ الآن ← | ابدأ النمو ← | لنبني معًا ← |

**الكارت المميز (Growth):**
- أكبر قليلًا
- Border يتألق بـ violet
- Badge "Most Popular" / "الأكثر طلبًا"
- CTA button يتوهج

---

### 8. WHY OBRIX

**Title:** Why Obrix? / لماذا أوبريكس؟

**6 Feature Chips (2×3 grid desktop, 1×6 mobile):**

| Icon | EN | AR |
|------|----|----|
| ⚡ | Speed-Obsessed — We ship fast without cutting corners. | سرعة بلا تنازل — نُسلّم بسرعة دون المساس بالجودة. |
| 🎨 | Design-First — Every pixel is intentional. | التصميم أولًا — كل بكسل له غرض. |
| 🧠 | Full-Stack Team — Dev + Marketing + Software in one. | فريق متكامل — تطوير + تسويق + برمجيات تحت سقف واحد. |
| 📱 | Mobile-First Always — Flawless on every screen. | الجوال أولًا — مثالي على كل شاشة. |
| 🔍 | Detail-Oriented — We sweat the small stuff. | حب التفاصيل — نهتم بما يغفله غيرنا. |
| 🚀 | Growth Partners — We think long-term. | شريك نمو — نفكر بعيد المدى. |

---

### 9. CTA SECTION

```
[★ Label: Let's Create Something Remarkable]
     [✦ لنصنع شيئًا استثنائيًا]

Ready to Build
Your Digital World?

From idea to launch — Obrix handles everything.
Let's start a conversation.

[ Start a Project → ]     [ hello@obrix.io ]
```

**Background:** animated mesh gradient (violet + teal, very dramatic)
**Button:** large, glowing, pulse animation on hover

---

### 10. FOOTER

```
Desktop layout (3 columns):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
OBRIX              Quick Links    Connect
──────────────     ───────────    ───────
Where design       Work           IG  LI  BE
meets intelligence Services       hello@obrix.io
                   Packages
                   Contact
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
© 2026 Obrix. All rights reserved.  ·  Crafted with obsession.
```

**Mobile layout:** centered single column

---

## ⚙️ Technical Architecture

### React Component Tree
```
App
├── Context
│   ├── ThemeContext (dark/light + localStorage)
│   └── LangContext  (ar/en + dir attribute on <html>)
│
├── Navbar
│   ├── Logo
│   ├── NavLinks
│   ├── LangToggle
│   ├── ThemeToggle
│   ├── CTAButton
│   └── MobileMenu (AnimatePresence)
│
├── HeroSection
│   ├── BackgroundOrbs (animated)
│   ├── ParticleSystem (desktop only)
│   ├── GridOverlay
│   ├── HeroContent (staggered motion)
│   └── ScrollIndicator
│
├── MarqueeTicker
│
├── AboutSection
│   ├── TextContent
│   └── FloatingCards (3 animated cards)
│
├── ServicesSection
│   └── ServiceCard × 3
│
├── WorkSection
│   └── PortfolioCard × 6
│
├── PackagesSection
│   └── PackageCard × 3 (middle = featured)
│
├── WhyObrix
│   └── FeatureChip × 6
│
├── CTASection
│
└── Footer
```

### State Management
```javascript
// Theme
const [theme, setTheme] = useState(() =>
  localStorage.getItem('obrix-theme') || 'dark'
)
useEffect(() => {
  document.documentElement.setAttribute('data-theme', theme)
  localStorage.setItem('obrix-theme', theme)
}, [theme])

// Language
const [lang, setLang] = useState('en')
useEffect(() => {
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'
  document.documentElement.lang = lang
}, [lang])
```

### Animation Plan (Framer Motion)
```javascript
// Page load — staggered sections
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } }
}

// Section entry
const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22,1,0.36,1] } }
}

// Hero headline — word by word
const wordVariants = {
  hidden: { opacity: 0, y: 60, clipPath: 'inset(100% 0 0 0)' },
  visible: { opacity: 1, y: 0, clipPath: 'inset(0% 0 0 0)',
    transition: { duration: 0.7, ease: [0.22,1,0.36,1] } }
}

// Cards hover
whileHover={{ y: -8, scale: 1.02 }}
transition={{ type: 'spring', stiffness: 300 }}

// Background orbs
animate={{ x: [0, 30, -20, 0], y: [0, -40, 20, 0] }}
transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}

// CTA button pulse
whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(108,99,255,0.5)' }}
whileTap={{ scale: 0.97 }}

// Mobile menu
initial={{ opacity: 0, y: -20 }}
animate={{ opacity: 1, y: 0 }}
exit={{ opacity: 0, y: -20 }}

// Scroll-triggered sections (useInView)
const ref = useRef(null)
const isInView = useInView(ref, { once: true, margin: '-100px' })
```

### CSS Variables Setup
```css
:root[data-theme="dark"] {
  --bg: #060610;
  --surface: #0d0d1a;
  --surface2: #12122a;
  --border: rgba(255,255,255,0.06);
  --text: #f0f0f8;
  --text-muted: #5a5a7a;
  --card-bg: rgba(255,255,255,0.03);
  --card-border: rgba(255,255,255,0.08);
  --navbar-bg: rgba(6,6,16,0.85);
  --orb-opacity: 0.15;
  --grid-opacity: 0.04;
}

:root[data-theme="light"] {
  --bg: #f8f7f4;
  --surface: #ffffff;
  --surface2: #f0eeea;
  --border: rgba(0,0,0,0.08);
  --text: #111118;
  --text-muted: #777788;
  --card-bg: rgba(255,255,255,0.9);
  --card-border: rgba(0,0,0,0.1);
  --navbar-bg: rgba(248,247,244,0.85);
  --orb-opacity: 0.08;
  --grid-opacity: 0.06;
}

/* All transitions smooth */
*, *::before, *::after {
  transition: background-color 0.3s ease, color 0.3s ease,
              border-color 0.3s ease, box-shadow 0.3s ease;
}
```

### Google Fonts Import
```css
@import url('https://fonts.googleapis.com/css2?
  family=Syne:wght@400;600;700;800&
  family=DM+Mono:wght@300;400;500&
  family=Instrument+Serif:ital@0;1&
  family=Cairo:wght@300;400;600;700;800&
  family=Tajawal:wght@300;400;500;700;800&
  display=swap');
```

### Font Logic
```javascript
// عند اختيار العربي: يستخدم Cairo
// عند اختيار الإنجليزي: يستخدم Syne + DM Mono

const fontFamily = lang === 'ar'
  ? "'Cairo', sans-serif"
  : "'Syne', 'DM Mono', sans-serif"
```

### Performance Notes
```
- Lazy load portfolio images (when real images added)
- Particles disabled on mobile (window.innerWidth < 768)
- useInView with once:true — animations fire once only
- CSS transitions on theme switch — no JS thrashing
- Marquee uses pure CSS animation (no JS)
- Custom cursor hidden on touch devices (pointer: coarse)
```

---

## 🎭 Mood & Feel References

| Reference | What to take from it |
|-----------|---------------------|
| Linear.app | Precision dark UI, micro-interactions |
| Vercel.com | Sharp, minimal, fast-feeling |
| Framer.com | Animation-forward, bold typography |
| Stripe.com | Trustworthy, premium, glassmorphism |
| Basement Studio | Creative agency dark aesthetic |
| Awwwards sites | Unexpected layouts, editorial feel |

**One-sentence brief:**
> A dark (and equally stunning in light mode), bilingual, cinematic digital studio landing page — built by people who are slightly obsessed with perfection, and speaks fluently to both Arabic and global audiences.

---

## 📝 Placeholders to Replace

| Placeholder | Replace With |
|-------------|--------------|
| `hello@obrix.io` | Your real email |
| `Project Alpha / مشروع ألفا` | Real project names |
| Gradient backgrounds in portfolio | Real screenshots |
| Package CTA `href="#"` | Contact form URL or WhatsApp link |
| `@obrix` social handles | Real Instagram / LinkedIn / Behance |
| `obrix.io` | Real domain |

---

## ✅ Final Checklist Before Shipping

- [ ] Dark mode looks stunning ✦
- [ ] Light mode equally polished ✦
- [ ] Arabic RTL layout correct (no broken alignments) ✦
- [ ] English LTR layout correct ✦
- [ ] Mobile menu works smoothly ✦
- [ ] All animations fire on scroll ✦
- [ ] Portfolio links open correctly ✦
- [ ] Package CTAs linked ✦
- [ ] No horizontal overflow on mobile ✦
- [ ] Fonts load correctly for both languages ✦
- [ ] Theme preference saved in localStorage ✦
- [ ] Custom cursor hidden on touch devices ✦
- [ ] Marquee direction correct per language ✦
- [ ] All copy reviewed in both languages ✦

---

*Brief v2.0 — Obrix Digital Studio · 2026*
*Build with intention. Ship with obsession.*
*صُنع بشغف — أوبريكس الاستوديو الرقمي*
