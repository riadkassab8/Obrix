import { useState, useRef, useEffect } from "react";
import { m, AnimatePresence, useInView } from "framer-motion";
import { useLang } from "@/contexts/LangContext";
import { useTheme } from "@/contexts/ThemeContext";
import { ArrowRight, ArrowLeft, Menu, X, Moon, Sun } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const WA_URL = "https://wa.me/+20 10 25187974";

const IFRAME_W = 1280;
const IFRAME_H = 960;

function LivePreview({ url, screenshot }: { url: string; screenshot: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.22);
  const [active, setActive] = useState(false);

  const updateScale = () => {
    if (!containerRef.current) return;
    setScale(containerRef.current.clientWidth / IFRAME_W);
  };

  useState(() => {
    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  });

  return (
    <div ref={containerRef} className="relative w-full overflow-hidden rounded-xl" style={{ height: 220 }}>
      {active ? (
        <>
          <div className="absolute inset-0" style={{ backgroundColor: "var(--surface2)" }} />
          <iframe
            src={url}
            width={IFRAME_W}
            height={IFRAME_H}
            scrolling="no"
            loading="lazy"
            style={{
              transform: `scale(${scale})`,
              transformOrigin: "top left",
              pointerEvents: "none",
              border: "none",
              position: "absolute",
              top: 0,
              left: 0,
              display: "block",
            }}
            sandbox="allow-same-origin allow-scripts allow-forms"
          />
        </>
      ) : (
        <div
          onClick={() => setActive(true)}
          className="w-full h-full flex flex-col items-center justify-center cursor-pointer transition-colors hover:bg-[var(--surface2)] relative"
          style={{ backgroundColor: "var(--surface)" }}
        >
          <img
            src={screenshot}
            alt="Project preview"
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 transition-opacity hover:bg-black/30">
            <div className="text-4xl mb-2 text-white">▶</div>
            <span className="text-sm font-semibold text-white">
              Click to Preview
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

function WABtn({ href, fullWidth = false }: { href: string; fullWidth?: boolean }) {
  const { lang } = useLang();
  return (
    <m.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      whileTap={{ scale: 0.97 }}
      className={`wa-btn${fullWidth ? " w-full justify-center" : ""}`}
    >
      <svg viewBox="0 0 32 32" width="22" height="22" fill="currentColor">
        <path d="M16.002 2.667C8.638 2.667 2.667 8.637 2.667 16c0 2.363.627 4.674 1.818 6.697L2.667 29.333l6.804-1.782A13.268 13.268 0 0 0 16.002 29.333c7.363 0 13.331-5.97 13.331-13.333S23.365 2.667 16.002 2.667Zm6.03 18.093c-.33-.165-1.952-.963-2.255-1.073-.303-.11-.524-.165-.744.165-.22.33-.854 1.073-1.046 1.293-.193.22-.385.247-.715.082-.33-.165-1.394-.514-2.655-1.638-.981-.875-1.643-1.956-1.836-2.285-.192-.33-.02-.509.145-.673.149-.148.33-.385.495-.578.165-.192.22-.33.33-.55.11-.22.055-.413-.028-.578-.082-.165-.744-1.793-1.02-2.455-.27-.645-.543-.557-.744-.567l-.634-.011c-.22 0-.578.082-.881.413-.303.33-1.155 1.128-1.155 2.753s1.183 3.195 1.348 3.415c.165.22 2.328 3.555 5.642 4.987.789.34 1.404.543 1.883.695.791.251 1.511.216 2.08.131.634-.094 1.952-.798 2.228-1.57.275-.771.275-1.431.192-1.57-.082-.138-.303-.22-.633-.385Z"/>
      </svg>
      {lang === "en" ? "Chat on WhatsApp" : "تواصل عبر واتساب"}
      {lang === "en" ? <ArrowRight className="w-5 h-5" /> : <ArrowLeft className="w-5 h-5" />}
    </m.a>
  );
}

function FadeInWhenVisible({ children, margin = "-100px", delay = 0 }: any) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin });

  return (
    <m.div
      ref={ref}
      initial={{ y: 40, opacity: 0 }}
      animate={isInView ? { y: 0, opacity: 1 } : { y: 40, opacity: 0 }}
      transition={{ duration: 0.4, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      {children}
    </m.div>
  );
}

const navLinks = [
  { en: "Home", ar: "الرئيسية", href: "/" },
  { en: "Work", ar: "أعمالنا", href: "/projects" },
  { en: "Services", ar: "خدماتنا", href: "/#services" },
  { en: "Packages", ar: "باقاتنا", href: "/#packages" },
  { en: "Contact", ar: "تواصل معنا", href: "/#contact" }
];

export function Navbar() {
  const { lang, toggleLang } = useLang();
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "backdrop-blur-md border-b" : ""
        }`}
        style={{
          backgroundColor: scrolled ? "var(--navbar-bg)" : "transparent",
          borderColor: scrolled ? "var(--border)" : "transparent"
        }}
      >
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <a href="/" className="flex items-center gap-3 group relative overflow-visible">
            <m.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="w-12 h-12 relative flex-shrink-0"
            >
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <polygon
                  points="50,5 90,25 90,75 50,95 10,75 10,25"
                  fill="none"
                  stroke="var(--accent1)"
                  strokeWidth="3"
                  strokeLinejoin="round"
                />
              </svg>
            </m.div>
            
            <m.span
              animate={{ 
                x: [-50, 0, 0, 0, -50],
                opacity: [0, 1, 1, 1, 0],
                scale: [0.3, 1, 1, 1, 0.3]
              }}
              transition={{ 
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                times: [0, 0.25, 0.5, 0.7, 1]
              }}
              className="font-extrabold text-3xl tracking-tighter transition-colors group-hover:text-[var(--accent1)]"
              style={{ color: "var(--text)" }}
            >
              orbix
            </m.span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link, i) => (
              <m.a
                key={link.en}
                href={link.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ 
                  color: "var(--accent1)"
                }}
                whileTap={{ scale: 0.95 }}
                className="text-sm font-semibold transition-colors relative group"
                style={{ color: "rgba(255, 255, 255, 0.8)" }}
              >
                {lang === "en" ? link.en : link.ar}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[var(--accent1)] transition-all duration-300 group-hover:w-full" />
              </m.a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <m.button
              onClick={toggleLang}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-sm font-bold hover:text-[var(--accent1)] transition-colors"
              style={{ color: "var(--text)" }}
            >
              {lang === "en" ? "عربي | EN" : "EN | عربي"}
            </m.button>
            <m.button
              onClick={toggleTheme}
              whileHover={{ scale: 1.1, rotate: 180 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="p-2 rounded-full hover:bg-[var(--surface2)] transition-colors"
            >
              {theme === "dark" ? <Sun size={18} style={{ color: "var(--text)" }} /> : <Moon size={18} style={{ color: "var(--text)" }} />}
            </m.button>
            <WABtn href={WA_URL} />
          </div>

          <button className="md:hidden" onClick={() => setMobileMenuOpen(true)}>
            <Menu size={24} style={{ color: "var(--text)" }} />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <m.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-[60] flex flex-col px-6 pb-6"
            style={{ backgroundColor: "var(--bg)" }}
          >
            <div className="flex items-center justify-between pt-6 pb-8 border-b" style={{ borderColor: "var(--border)" }}>
              <div className="flex items-center gap-3">
                <m.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  className="w-10 h-10 relative flex-shrink-0"
                >
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    <polygon
                      points="50,5 90,25 90,75 50,95 10,75 10,25"
                      fill="none"
                      stroke="var(--accent1)"
                      strokeWidth="3"
                      strokeLinejoin="round"
                    />
                  </svg>
                </m.div>
                <span className="font-extrabold text-2xl tracking-tighter" style={{ color: "var(--text)" }}>orbix</span>
              </div>
              
              <button
                className="p-2 rounded-full hover:bg-[var(--surface2)] transition-colors"
                onClick={closeMenu}
              >
                <X size={24} style={{ color: "var(--text)" }} />
              </button>
            </div>

            <div className="flex flex-col gap-6 text-2xl font-bold mt-12 flex-1">
              {navLinks.map((link, i) => (
                <m.a
                  key={link.en}
                  href={link.href}
                  onClick={closeMenu}
                  initial={{ opacity: 0, x: lang === "en" ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  whileHover={{ 
                    color: "var(--accent1)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ delay: i * 0.1 }}
                  style={{ color: "rgba(255, 255, 255, 0.9)" }}
                  className="transition-colors py-2 relative group"
                >
                  {lang === "en" ? link.en : link.ar}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[var(--accent1)] transition-all duration-300 group-hover:w-full" />
                </m.a>
              ))}
            </div>

            <div className="flex flex-col gap-6 pt-6 border-t" style={{ borderColor: "var(--border)" }}>
              <div className="flex items-center justify-between">
                <button onClick={toggleLang} className="text-base font-bold hover:text-[var(--accent1)] transition-colors" style={{ color: "var(--text)" }}>
                  {lang === "en" ? "التبديل للعربية" : "Switch to English"}
                </button>
                <button onClick={toggleTheme} className="p-3 rounded-full hover:bg-[var(--surface2)] transition-colors" style={{ backgroundColor: "var(--surface)" }}>
                  {theme === "dark" ? <Sun size={20} style={{ color: "var(--text)" }} /> : <Moon size={20} style={{ color: "var(--text)" }} />}
                </button>
              </div>
              <WABtn href={WA_URL} fullWidth />
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default function Projects() {
  const { lang } = useLang();
  const [activeFilter, setActiveFilter] = useState("All");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);
  
  const projects = [
    {
      titleEn: "Professional Portfolio",
      titleAr: "بورتفوليو احترافي",
      descEn: "Clean and professional portfolio website with elegant design and smooth user experience.",
      descAr: "موقع بورتفوليو احترافي بتصميم أنيق وتجربة مستخدم سلسة.",
      tags: ["React", "Next.js", "Portfolio", "Vercel"],
      category: "Portfolio",
      url: "https://new-portfolio-site-h2gw.vercel.app/",
      screenshot: "/screenshots/portfolio.webp",
    },
    {
      titleEn: "Moaz Sigma",
      titleAr: "معز سيجما",
      descEn: "Professional portfolio website showcasing skills and projects with modern design.",
      descAr: "موقع بورتفوليو احترافي يعرض المهارات والمشاريع بتصميم عصري.",
      tags: ["React", "Portfolio", "Vercel"],
      category: "Portfolio",
      url: "https://moaz-sigma.vercel.app/",
      screenshot: "/screenshots/moaz-sigma.webp",
    },
    {
      titleEn: "Eldod E-Commerce",
      titleAr: "الدود للتجارة الإلكترونية",
      descEn: "Full-featured e-commerce platform with product catalog and shopping cart.",
      descAr: "منصة تجارة إلكترونية متكاملة مع كتالوج منتجات وسلة تسوق.",
      tags: ["React", "Tailwind CSS", "E-Commerce", "Vercel"],
      category: "E-Commerce",
      url: "https://eldod-ecommerce-wind.vercel.app/",
      screenshot: "/screenshots/eldod-ecommerce.webp",
    },
    {
      titleEn: "Dr. Mohamed",
      titleAr: "د. محمد",
      descEn: "Personal portfolio for a medical professional with clean layout and service sections.",
      descAr: "بورتفوليو طبي احترافي بتصميم أنيق وأقسام للخدمات.",
      tags: ["React", "CSS Animations", "Portfolio", "Vercel"],
      category: "Portfolio",
      url: "https://dr-mohamed-page.vercel.app/",
      screenshot: "/screenshots/dr-mohamed.webp",
    },
    {
      titleEn: "Sneakers Store",
      titleAr: "سنيكرز ستور",
      descEn: "Full e-commerce store for a sneaker brand with product pages and cart.",
      descAr: "متجر إلكتروني متكامل لعلامة أحذية رياضية مع صفحات منتجات وسلة.",
      tags: ["React", "E-Commerce", "Fashion", "Responsive"],
      categories: ["E-Commerce", "Dashboard"],
      url: "https://sneakers-ecommerce-henna.vercel.app/",
      screenshot: "/screenshots/sneakers-store.webp",
    },
    {
      titleEn: "JUBA Store",
      titleAr: "جوبا ستور",
      descEn: "Luxury fashion and footwear e-commerce platform with elegant design and seamless shopping experience.",
      descAr: "منصة تجارة إلكترونية للأزياء والأحذية بتصميم أنيق وتجربة تسوق سلسة.",
      tags: ["React", "E-Commerce", "Fashion", "Responsive"],
      category: "Landing",
      url: "https://juba-store.vercel.app/",
      screenshot: "/screenshots/juba-store.webp",
    },
    {
      titleEn: "Coffee Corner",
      titleAr: "كوفي كورنر",
      descEn: "Modern coffee shop website with elegant design and smooth animations.",
      descAr: "موقع مقهى عصري بتصميم أنيق وأنيميشن سلس.",
      tags: ["HTML5", "CSS3", "JavaScript", "Bootstrap"],
      category: "Landing",
      url: "https://coffee-corner-a1zq.vercel.app/",
      screenshot: "/screenshots/coffee-corner.webp",
    },
    {
      titleEn: "Same Menu Site",
      titleAr: "موقع القائمة",
      descEn: "Restaurant menu website with elegant design and easy navigation.",
      descAr: "موقع قائمة مطعم بتصميم أنيق وتصفح سهل.",
      tags: ["React", "Restaurant", "Vercel"],
      category: "Landing",
      url: "https://new-same-menu-site.vercel.app/",
      screenshot: "/screenshots/same-menu.webp",
    },
    {
      titleEn: "Coffee Brand M",
      titleAr: "علامة قهوة M",
      descEn: "Premium coffee brand website with sophisticated design and product showcase.",
      descAr: "موقع علامة قهوة فاخرة بتصميم راقٍ وعرض منتجات.",
      tags: ["React", "Coffee", "Vercel"],
      category: "Landing",
      url: "https://coffe-brand-m-salary.vercel.app/",
      screenshot: "/screenshots/coffee-brand-m.webp",
    },
    {
      titleEn: "Coffee Low Budget",
      titleAr: "قهوة ميزانية منخفضة",
      descEn: "Budget-friendly coffee shop website with clean design and essential features.",
      descAr: "موقع مقهى بتصميم بسيط وميزات أساسية.",
      tags: ["React", "Coffee", "Vercel"],
      category: "Landing",
      url: "https://coffe-low-budget.vercel.app/",
      screenshot: "/screenshots/coffee-low-budget.webp",
    },
    {
      titleEn: "Quran Academy",
      titleAr: "أكاديمية القرآن",
      descEn: "Islamic learning platform with Quran recitation, lessons, and educational resources.",
      descAr: "منصة تعليم إسلامية لتحفيظ القرآن والدروس والمحتوى التعليمي.",
      tags: ["React", "Next.js", "Tailwind CSS", "Islamic Content"],
      category: "Education",
      url: "https://quran-academy-sooty.vercel.app/",
      screenshot: "/screenshots/quran-academy.webp",
    },
    {
      titleEn: "Sabora Academy",
      titleAr: "أكاديمية صابورا",
      descEn: "Modern educational academy platform with courses, student management, and learning resources.",
      descAr: "منصة أكاديمية تعليمية حديثة مع كورسات وإدارة طلاب ومحتوى تعليمي.",
      tags: ["React", "Next.js", "Education", "LMS"],
      category: "Education",
      url: "https://sabora-acadimy-gxkt.vercel.app/",
      screenshot: "/screenshots/sabora-academy.webp",
    },
    {
      titleEn: "Café Cashier",
      titleAr: "كاشير الكافيه",
      descEn: "Complete dashboard system with advanced features, data visualization, analytics, and comprehensive admin panel.",
      descAr: "نظام لوحة تحكم متكامل مع ميزات متقدمة وتحليلات ولوحة إدارة شاملة.",
      tags: ["Angular", "TypeScript", "Dashboard", "Charts"],
      categories: ["E-Commerce", "Dashboard"],
      url: "https://cahier-angular-qhet.vercel.app/login",
      screenshot: "/screenshots/cafe-cashier.webp",
    },
    {
      titleEn: "Islamic Structure",
      titleAr: "الهيكل الإسلامي",
      descEn: "Modern Islamic website showcasing Islamic architecture and cultural heritage with elegant design.",
      descAr: "موقع إسلامي حديث يعرض العمارة الإسلامية والتراث الثقافي بتصميم أنيق.",
      tags: ["React", "Islamic", "Architecture", "Vercel"],
      category: "Landing",
      url: "https://islamic-structure.vercel.app/",
      screenshot: "/screenshots/islamic-structure.webp",
    },
  ];

  const filters = [
    { en: "All", ar: "الكل", value: "All" },
    { en: "Portfolio", ar: "بورتفوليو", value: "Portfolio" },
    { en: "E-Commerce", ar: "متاجر إلكترونية", value: "E-Commerce" },
    { en: "Landing", ar: "صفحات هبوط", value: "Landing" },
    { en: "Education", ar: "تعليمية", value: "Education" },
    { en: "Dashboard", ar: "لوحات تحكم", value: "Dashboard" },
  ];

  const filteredProjects = activeFilter === "All" 
    ? projects 
    : projects.filter((p) => (p.categories ?? [p.category]).includes(activeFilter));

  return (
    <div className="w-full min-h-screen pt-24 pb-16">
      <Navbar />
      <section className="py-16">
        <div className="container mx-auto px-6">
          <FadeInWhenVisible>
            <div className="mb-16">
              <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: "var(--text)" }}>
                {lang === "en" ? "Selected Work" : "أبرز أعمالنا"}
              </h1>
              <p className="text-xl mb-8" style={{ color: "var(--text-muted)" }}>
                {lang === "en" ? "A glimpse of what we've shipped." : "لمحة مما أنجزناه."}
              </p>

              <div className="flex flex-wrap gap-3 justify-center">
                {filters.map((filter) => (
                  <m.button
                    key={filter.value}
                    onClick={() => setActiveFilter(filter.value)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-2.5 rounded-full font-semibold text-sm transition-all"
                    style={{
                      backgroundColor: activeFilter === filter.value ? "var(--accent1)" : "var(--surface)",
                      color: activeFilter === filter.value ? "#fff" : "var(--text)",
                      border: `2px solid ${activeFilter === filter.value ? "var(--accent1)" : "var(--border)"}`,
                    }}
                  >
                    {lang === "en" ? filter.en : filter.ar}
                  </m.button>
                ))}
              </div>
            </div>
          </FadeInWhenVisible>

          <AnimatePresence mode="wait">
            <m.div 
              key={activeFilter}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {isLoading ? (
                Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="rounded-2xl overflow-hidden" style={{ backgroundColor: "var(--surface)", border: "1px solid var(--card-border)" }}>
                    <Skeleton className="w-full h-[220px]" />
                    <div className="p-5 space-y-3">
                      <Skeleton className="h-6 w-3/4" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-2/3" />
                      <div className="flex flex-wrap gap-2 mt-4">
                        <Skeleton className="h-6 w-16 rounded-full" />
                        <Skeleton className="h-6 w-16 rounded-full" />
                        <Skeleton className="h-6 w-16 rounded-full" />
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                filteredProjects.map((p, i) => (
                  <FadeInWhenVisible key={i} delay={i * 0.07}>
                    <m.a
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ y: -6 }}
                      transition={{ type: "spring", stiffness: 280, damping: 22 }}
                      className="group block rounded-2xl overflow-hidden cursor-pointer"
                      style={{
                        backgroundColor: "var(--surface)",
                        border: "1px solid var(--card-border)",
                      }}
                    >
                      <div className="relative overflow-hidden" style={{ height: 220 }}>
                        <LivePreview url={p.url} screenshot={p.screenshot} />
                        <div
                          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          style={{ backgroundColor: "rgba(0,0,0,0.52)", backdropFilter: "blur(3px)" }}
                        >
                          <span className="flex items-center gap-2 text-sm font-bold px-5 py-2.5 rounded-full bg-white/10 text-white border border-white/25">
                            {lang === "en" ? "View Live" : "مشاهدة المشروع"}
                            {lang === "en" ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
                          </span>
                        </div>
                      </div>

                      <div className="p-5">
                        <h3 className="font-bold text-xl leading-snug mb-2" style={{ color: "var(--text)" }}>
                          {lang === "en" ? p.titleEn : p.titleAr}
                        </h3>

                        <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
                          {lang === "en" ? p.descEn : p.descAr}
                        </p>

                        <div className="flex flex-wrap gap-2">
                          {p.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-xs font-semibold px-3 py-1 rounded-full"
                              style={{
                                backgroundColor: "var(--surface2)",
                                color: "var(--text-muted)",
                                border: "1px solid var(--card-border)",
                              }}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </m.a>
                  </FadeInWhenVisible>
                ))
              )}
            </m.div>
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}
