import { useState, useEffect, useRef } from "react";
import { m, AnimatePresence, useInView, useScroll, useTransform } from "framer-motion";
import { useLang } from "@/contexts/LangContext";
import { useTheme } from "@/contexts/ThemeContext";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import emailjs from "@emailjs/browser";
import { 
  Moon, Sun, Menu, X, ArrowRight, ArrowLeft, Code, 
  TrendingUp, Monitor, Globe, Instagram, Facebook, Linkedin, Zap, 
  Paintbrush, Users, Smartphone, Search, Rocket, ChevronDown
} from "lucide-react";
import { Button } from "@/components/ui/button";

const WA_URL = "https://wa.me/+20 10 25187974";
const GMAIL   = "mailto:riadkassab320@gmail.com";

// Contact Form Schema
const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

/* ── Legendary smooth scroll (easeInOutExpo) ── */
function useSmoothScroll() {
  useEffect(() => {
    const easeInOutExpo = (t: number) => {
      if (t === 0) return 0;
      if (t === 1) return 1;
      return t < 0.5
        ? Math.pow(2, 20 * t - 10) / 2
        : (2 - Math.pow(2, -20 * t + 10)) / 2;
    };

    const scrollTo = (targetY: number, duration = 950) => {
      const startY = window.scrollY;
      const dist = targetY - startY;
      let t0: number | null = null;

      const step = (now: number) => {
        if (t0 === null) t0 = now;
        const p = Math.min((now - t0) / duration, 1);
        window.scrollTo(0, startY + dist * easeInOutExpo(p));
        if (p < 1) requestAnimationFrame(step);
      };

      requestAnimationFrame(step);
    };

    const onClick = (e: MouseEvent) => {
      const link = (e.target as HTMLElement).closest('a[href^="#"]') as HTMLAnchorElement | null;
      if (!link) return;
      const hash = link.getAttribute("href");
      if (!hash) return;
      e.preventDefault();
      if (hash === "#") { scrollTo(0); return; }
      const el = document.querySelector(hash);
      if (!el) return;
      const top = el.getBoundingClientRect().top + window.scrollY - 84;
      scrollTo(top);
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
}

/* ── UIverse animated gradient button with shimmer effect ── */
function UIverseBtn({
  children,
  href,
  fullWidth = false,
}: {
  children: React.ReactNode;
  href: string;
  fullWidth?: boolean;
}) {
  return (
    <m.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`uiverse-btn relative inline-flex items-center justify-center gap-2 rounded-full font-bold text-white overflow-hidden cursor-pointer ${fullWidth ? "w-full py-4 text-lg" : "px-9 py-4 text-lg"}`}
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </m.a>
  );
}

/* ── Magnetic shimmer button ── */
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

/* ── UIverse Mail button — Li-Deheng bright-badger-45 swap animation ── */
function MailBtn({ href }: { href: string }) {
  const { lang } = useLang();
  const [hovered, setHovered] = useState(false);

  const EnvelopeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="16" x="2" y="4" rx="2"/>
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
    </svg>
  );

  return (
    <m.a
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileTap={{ scale: 0.96 }}
      className="mail-btn"
    >
      {/* Default label — slides up & out on hover */}
      <m.span
        animate={{ y: hovered ? "-110%" : "0%", opacity: hovered ? 0 : 1 }}
        transition={{ duration: 0.28, ease: [0.23, 1, 0.32, 1] }}
        className="absolute flex items-center gap-2 whitespace-nowrap"
      >
        <EnvelopeIcon />
        {lang === "en" ? "Send an Email" : "أرسل بريدًا"}
      </m.span>

      {/* Email address — slides up from below on hover */}
      <m.span
        animate={{ y: hovered ? "0%" : "110%", opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.28, ease: [0.23, 1, 0.32, 1] }}
        className="absolute flex items-center gap-2 whitespace-nowrap"
        style={{ fontSize: "0.92rem" }}
      >
        <EnvelopeIcon />
        riadkassab320@gmail.com
      </m.span>

      {/* Spacer to hold button width */}
      <span className="invisible flex items-center gap-2 whitespace-nowrap" aria-hidden>
        <EnvelopeIcon />
        riadkassab320@gmail.com
      </span>
    </m.a>
  );
}

/* ── Floating WhatsApp button ── */
function FloatingWhatsApp() {
  return (
    <a
      href={WA_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      data-testid="floating-whatsapp"
      className="wa-float fixed bottom-6 right-6 z-[200] w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-110"
      style={{ backgroundColor: "#25D366" }}
    >
      <svg viewBox="0 0 32 32" width="28" height="28" fill="white" xmlns="http://www.w3.org/2000/svg">
        <path d="M16.002 2.667C8.638 2.667 2.667 8.637 2.667 16c0 2.363.627 4.674 1.818 6.697L2.667 29.333l6.804-1.782A13.268 13.268 0 0 0 16.002 29.333c7.363 0 13.331-5.97 13.331-13.333S23.365 2.667 16.002 2.667Zm0 24.267a11.002 11.002 0 0 1-5.61-1.532l-.401-.238-4.038 1.058 1.079-3.93-.263-.414A10.95 10.95 0 0 1 5.001 16c0-6.075 4.926-11 11.001-11S27.003 9.925 27.003 16s-4.927 11-11.001 11Zm6.03-8.24c-.33-.165-1.952-.963-2.255-1.073-.303-.11-.524-.165-.744.165-.22.33-.854 1.073-1.046 1.293-.193.22-.385.247-.715.082-.33-.165-1.394-.514-2.655-1.638-.981-.875-1.643-1.956-1.836-2.285-.192-.33-.02-.509.145-.673.149-.148.33-.385.495-.578.165-.192.22-.33.33-.55.11-.22.055-.413-.028-.578-.082-.165-.744-1.793-1.02-2.455-.27-.645-.543-.557-.744-.567l-.634-.011c-.22 0-.578.082-.881.413-.303.33-1.155 1.128-1.155 2.753s1.183 3.195 1.348 3.415c.165.22 2.328 3.555 5.642 4.987.789.34 1.404.543 1.883.695.791.251 1.511.216 2.08.131.634-.094 1.952-.798 2.228-1.57.275-.771.275-1.431.192-1.57-.082-.138-.303-.22-.633-.385Z"/>
      </svg>
    </a>
  );
}

const navLinks = [
  { en: "Home", ar: "الرئيسية", href: "/" },
  { en: "Work", ar: "أعمالنا", href: "/projects" },
  { en: "Services", ar: "خدماتنا", href: "#services" },
  { en: "Packages", ar: "باقاتنا", href: "#packages" },
  { en: "Contact", ar: "تواصل معنا", href: "#contact" }
];

const footerLinks = [
  { en: "Work", ar: "أعمالنا", href: "/projects" },
  { en: "Services", ar: "خدماتنا", href: "#services" },
  { en: "Packages", ar: "باقاتنا", href: "#packages" },
  { en: "Contact", ar: "تواصل معنا", href: "#contact" }
];

function CursorGlow() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    setIsDesktop(window.matchMedia("(pointer: fine)").matches);
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    if (isDesktop) {
      window.addEventListener("mousemove", updateMousePosition);
      return () => window.removeEventListener("mousemove", updateMousePosition);
    }
  }, [isDesktop]);

  if (!isDesktop) return null;

  return (
    <m.div
      className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[100] mix-blend-difference"
      animate={{
        x: mousePosition.x - 16,
        y: mousePosition.y - 16,
      }}
      transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.5 }}
      style={{
        backgroundColor: "var(--accent1)",
        filter: "blur(8px)",
      }}
    />
  );
}

function Particles() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (isMobile) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 40 }).map((_, i) => (
        <m.div
          key={i}
          className="absolute w-1 h-1 rounded-full opacity-30"
          style={{
            backgroundColor: i % 2 === 0 ? "var(--accent1)" : "var(--accent2)",
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -Math.random() * 100 - 50],
            x: [0, Math.random() * 50 - 25],
            opacity: [0, 0.5, 0],
          }}
          transition={{
            duration: Math.random() * 5 + 5,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 5,
          }}
        />
      ))}
    </div>
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
          <a href="#" className="flex items-center gap-3 group relative overflow-visible">
            {/* الشكل السداسي الدوار - SVG عشان يظهر صح */}
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
            
            {/* الكلمة الكاملة orbix تطلع من جوا الشكل السداسي */}
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
            {/* Header with Logo and Close Button */}
            <div className="flex items-center justify-between pt-6 pb-8 border-b" style={{ borderColor: "var(--border)" }}>
              <div className="flex items-center gap-3">
                {/* الشكل السداسي الدوار */}
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
                <span className="font-extrabold text-2xl tracking-tighter" style={{ color: "var(--text)" }}>Obrix</span>
              </div>
              
              <button
                className="p-2 rounded-full hover:bg-[var(--surface2)] transition-colors"
                onClick={closeMenu}
              >
                <X size={24} style={{ color: "var(--text)" }} />
              </button>
            </div>

            {/* Navigation Links */}
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

            {/* Footer Actions */}
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

function StaggeredText({ text, delay = 0, className = "" }: { text: string, delay?: number, className?: string }) {
  const words = text.split(" ");
  return (
    <div className={`flex flex-wrap justify-center gap-x-3 gap-y-2 ${className}`}>
      {words.map((word, i) => (
        <m.span
          key={i}
          initial={{ opacity: 0, y: 40, clipPath: "inset(100% 0 0 0)" }}
          animate={{ opacity: 1, y: 0, clipPath: "inset(0% 0 0 0)" }}
          transition={{ duration: 0.6, delay: delay + i * 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
        >
          {word}
        </m.span>
      ))}
    </div>
  );
}

export function Hero() {
  const { lang } = useLang();
  
  return (
    <section className="relative min-h-[100dvh] flex flex-col items-center justify-center pt-20 pb-10 overflow-hidden">
      <Particles />
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{
        backgroundImage: 'linear-gradient(var(--text) 1px, transparent 1px), linear-gradient(90deg, var(--text) 1px, transparent 1px)',
        backgroundSize: '50px 50px',
        maskImage: 'radial-gradient(circle at center, black, transparent 70%)'
      }} />

      <m.div
        animate={{ x: [0, 100, 0], y: [0, -50, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] rounded-full blur-[120px] opacity-20 pointer-events-none"
        style={{ backgroundColor: "var(--accent1)" }}
      />
      <m.div
        animate={{ x: [0, -100, 0], y: [0, 50, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-1/4 right-1/4 w-[30vw] h-[30vw] rounded-full blur-[100px] opacity-20 pointer-events-none"
        style={{ backgroundColor: "var(--accent2)" }}
      />
      
      <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20vw] font-extrabold tracking-tighter opacity-5 pointer-events-none select-none blur-[4px]" style={{ color: "var(--text)" }}>
        Obrix
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center flex flex-col items-center flex-1 justify-center">
        <m.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-block px-4 py-2 rounded-full mb-8 text-sm font-semibold border backdrop-blur-md"
          style={{ backgroundColor: "var(--surface2)", borderColor: "var(--border)", color: "var(--text)" }}
        >
          {lang === "en" ? "✦ Full-Stack Digital Studio" : "✦ استوديو رقمي متكامل"}
        </m.div>
        
        <div className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight mb-8 max-w-5xl" style={{ color: "var(--text)" }}>
          <StaggeredText text={lang === "en" ? "We Build Digital Worlds." : "نبني عوالم رقمية."} delay={0.2} />
        </div>
        
        <m.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-lg md:text-2xl max-w-2xl mb-12 leading-relaxed" 
          style={{ color: "var(--text-muted)" }}
        >
          {lang === "en" 
            ? "From stunning websites to viral campaigns — orbix turns your vision into a digital experience people remember." 
            : "من المواقع المذهلة إلى الحملات الفيروسية — أوبريكس تحول رؤيتك إلى تجربة رقمية لا تُنسى."}
        </m.p>
        
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
        >
          <a href="/projects" className="w-full sm:w-auto">
            <Button className="w-full sm:w-auto bg-[var(--text)] text-[var(--bg)] hover:bg-[var(--text-muted)] hover:scale-105 transition-transform rounded-full px-8 py-6 text-lg">
              {lang === "en" ? "See Our Work" : "شاهد أعمالنا"}
              {lang === "en" ? <ArrowRight className="ml-2 w-5 h-5" /> : <ArrowLeft className="mr-2 w-5 h-5" />}
            </Button>
          </a>
          <a href="#packages" className="w-full sm:w-auto">
            <Button variant="outline" className="w-full sm:w-auto rounded-full px-8 py-6 text-lg border-2 hover:bg-[var(--surface2)] transition-colors" style={{ borderColor: "var(--border)", color: "var(--text)" }}>
              {lang === "en" ? "View Packages" : "استعرض الباقات"}
            </Button>
          </a>
        </m.div>
      </div>

      <m.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
      >
        <ChevronDown size={32} style={{ color: "var(--text-muted)" }} opacity={0.5} />
      </m.div>
    </section>
  );
}

export function Marquee() {
  const { lang } = useLang();
  const contentEn = "★ 80+ Projects · ★ 3 Expert Teams · ★ 100% Satisfaction · ★ Web · Marketing · Desktop · ★ Built for Growth · ";
  const contentAr = "★ +80 مشروع · ★ 3 فرق متخصصة · ★ رضا تام · ★ ويب · تسويق · برمجيات · ★ للنمو المستدام · ";
  const content = lang === "en" ? contentEn.repeat(4) : contentAr.repeat(4);

  return (
    <div className="w-full overflow-hidden py-5 border-y whitespace-nowrap flex relative" style={{ borderColor: "var(--border)", backgroundColor: "var(--surface)" }}>
      <div className="absolute inset-0 bg-gradient-to-r from-[var(--surface)] via-transparent to-[var(--surface)] z-10 pointer-events-none" />
      <m.div
        animate={{ x: lang === "en" ? [0, -1000] : [0, 1000] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="flex gap-4 items-center text-xl font-bold tracking-widest whitespace-nowrap bg-clip-text text-transparent bg-gradient-to-r from-[var(--accent1)] to-[var(--accent2)]"
      >
        {content}
      </m.div>
    </div>
  );
}

export function About() {
  const { lang } = useLang();
  
  return (
    <section className="py-32" id="about">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <FadeInWhenVisible>
            <div className="inline-block px-4 py-1.5 rounded-full mb-6 text-sm font-semibold border" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)", color: "var(--text)" }}>
              {lang === "en" ? "✦ About orbix" : "✦ عن أوبريكس"}
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight" style={{ color: "var(--text)" }}>
              {lang === "en" ? "We're not just another agency." : "نحن لسنا مجرد وكالة أخرى."}
            </h2>
            <p className="text-lg md:text-xl mb-8 leading-relaxed" style={{ color: "var(--text-muted)" }}>
              {lang === "en" 
                ? "We are a full-stack digital studio blending engineering precision with creative obsession. From high-conversion web experiences to robust desktop systems, we build platforms that scale."
                : "نحن استوديو رقمي متكامل يمزج بين الدقة الهندسية والهوس الإبداعي. من تجارب الويب عالية التحويل إلى أنظمة سطح المكتب القوية، نبني منصات قابلة للتوسع."}
            </p>
            <div className="flex flex-wrap gap-4 text-sm font-bold uppercase tracking-wider" style={{ color: "var(--text)" }}>
              <span className="px-4 py-2 rounded-lg" style={{ backgroundColor: "var(--surface2)" }}>3 Teams</span>
              <span className="px-4 py-2 rounded-lg" style={{ backgroundColor: "var(--surface2)" }}>80+ Projects</span>
              <span className="px-4 py-2 rounded-lg" style={{ backgroundColor: "var(--surface2)" }}>5+ Industries</span>
            </div>
          </FadeInWhenVisible>

          <div className="relative h-[400px] w-full max-w-md mx-auto">
            <m.div 
              animate={{ y: [0, -15, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-0 right-0 w-3/4 p-6 rounded-2xl border backdrop-blur-md shadow-2xl z-20"
              style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--accent1)" }}
            >
              <div className="flex items-center gap-4 mb-2">
                <Code className="w-8 h-8" style={{ color: "var(--accent1)" }} />
                <h3 className="font-bold text-xl" style={{ color: "var(--text)" }}>{lang === "en" ? "Web Development" : "تطوير الويب"}</h3>
              </div>
            </m.div>
            
            <m.div 
              animate={{ y: [0, 15, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute top-1/3 left-0 w-3/4 p-6 rounded-2xl border backdrop-blur-md shadow-2xl z-10"
              style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--accent2)" }}
            >
              <div className="flex items-center gap-4 mb-2">
                <TrendingUp className="w-8 h-8" style={{ color: "var(--accent2)" }} />
                <h3 className="font-bold text-xl" style={{ color: "var(--text)" }}>{lang === "en" ? "Marketing" : "التسويق الرقمي"}</h3>
              </div>
            </m.div>

            <m.div 
              animate={{ y: [0, -10, 0] }} transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
              className="absolute bottom-0 right-10 w-3/4 p-6 rounded-2xl border backdrop-blur-md shadow-2xl z-30"
              style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--accent3)" }}
            >
              <div className="flex items-center gap-4 mb-2">
                <Monitor className="w-8 h-8" style={{ color: "var(--accent3)" }} />
                <h3 className="font-bold text-xl" style={{ color: "var(--text)" }}>{lang === "en" ? "Desktop Apps" : "تطبيقات سطح المكتب"}</h3>
              </div>
            </m.div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Services() {
  const { lang } = useLang();
  
  const services = [
    {
      title: lang === "en" ? "Web Dev" : "تطوير الويب",
      icon: <Code />,
      color: "var(--accent1)",
      tags: ["React", "Next.js", "GSAP"]
    },
    {
      title: lang === "en" ? "Digital Marketing" : "التسويق الرقمي",
      icon: <TrendingUp />,
      color: "var(--accent2)",
      tags: ["Instagram", "TikTok", "Facebook"]
    },
    {
      title: lang === "en" ? "Desktop Apps" : "تطبيقات سطح المكتب",
      icon: <Monitor />,
      color: "var(--accent3)",
      tags: ["POS", "ERP", "Automation"]
    }
  ];

  return (
    <section className="py-32 bg-[var(--surface)]" id="services">
      <div className="container mx-auto px-6">
        <FadeInWhenVisible>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: "var(--text)" }}>
              {lang === "en" ? "What We Do" : "ماذا نفعل"}
            </h2>
          </div>
        </FadeInWhenVisible>
        
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((svc, i) => (
            <FadeInWhenVisible key={i} delay={i * 0.2}>
              <m.div
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="p-8 rounded-3xl border group relative overflow-hidden h-full flex flex-col"
                style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--card-border)" }}
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300" style={{ backgroundColor: svc.color }} />
                
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6" style={{ backgroundColor: `${svc.color}20`, color: svc.color }}>
                  {svc.icon}
                </div>
                <h3 className="text-2xl font-bold mb-6" style={{ color: "var(--text)" }}>{svc.title}</h3>
                
                <div className="flex flex-wrap gap-2 mt-auto">
                  {svc.tags.map(tag => (
                    <span key={tag} className="text-xs font-semibold px-3 py-1 rounded-full border" style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </m.div>
            </FadeInWhenVisible>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Packages() {
  const { lang } = useLang();
  
  return (
    <section className="py-32 bg-[var(--surface)]" id="packages">
      <div className="container mx-auto px-6">
        <FadeInWhenVisible>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: "var(--text)" }}>
              {lang === "en" ? "Simple Packages" : "باقات بسيطة"}
            </h2>
            <p className="text-xl" style={{ color: "var(--text-muted)" }}>
              {lang === "en" ? "No hidden fees. Just results." : "بدون رسوم خفية. فقط نتائج."}
            </p>
          </div>
        </FadeInWhenVisible>

        <div className="grid lg:grid-cols-3 gap-8 items-center max-w-6xl mx-auto">
          {/* Starter */}
          <FadeInWhenVisible delay={0.1}>
            <div className="p-8 rounded-3xl border" style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--card-border)" }}>
              <div className="mb-8">
                <span className="text-sm font-bold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>✦ {lang === "en" ? "Starter" : "البداية"}</span>
                <h3 className="text-3xl font-bold mt-2" style={{ color: "var(--text)" }}>{lang === "en" ? "Launch" : "الانطلاق"}</h3>
              </div>
              <ul className="space-y-4 mb-8" style={{ color: "var(--text)" }}>
                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-[var(--accent1)]"/> {lang === "en" ? "5-Page Website" : "موقع 5 صفحات"}</li>
                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-[var(--accent1)]"/> {lang === "en" ? "Mobile Responsive" : "متجاوب مع الجوال"}</li>
                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-[var(--accent1)]"/> {lang === "en" ? "Basic SEO" : "تحسين محركات البحث"}</li>
                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-[var(--accent1)]"/> {lang === "en" ? "1 Month Social" : "شهر تسويق رقمي"}</li>
                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-[var(--accent1)]"/> {lang === "en" ? "Brand Colors" : "ألوان العلامة التجارية"}</li>
              </ul>
              <UIverseBtn href={WA_URL} fullWidth>
                {lang === "en" ? "Get Started" : "ابدأ الآن"}
                {lang === "en" ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
              </UIverseBtn>
            </div>
          </FadeInWhenVisible>

          {/* Growth */}
          <FadeInWhenVisible delay={0.2}>
            <div className="p-8 rounded-3xl border-2 relative lg:-mt-4 lg:mb-4 shadow-2xl shadow-[var(--accent1)]/10" style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--accent1)" }}>
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[var(--accent1)] text-white px-4 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                ⭐ {lang === "en" ? "Most Popular" : "الأكثر طلباً"}
              </div>
              <div className="mb-8">
                <span className="text-sm font-bold uppercase tracking-wider text-[var(--accent1)]">✦ {lang === "en" ? "Growth" : "النمو"}</span>
                <h3 className="text-4xl font-bold mt-2" style={{ color: "var(--text)" }}>{lang === "en" ? "Scale" : "التوسع"}</h3>
              </div>
              <ul className="space-y-4 mb-8 font-medium" style={{ color: "var(--text)" }}>
                <li className="flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-[var(--accent1)]"/> {lang === "en" ? "Custom Web App" : "تطبيق ويب مخصص"}</li>
                <li className="flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-[var(--accent1)]"/> {lang === "en" ? "Full Branding" : "هوية تجارية كاملة"}</li>
                <li className="flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-[var(--accent1)]"/> {lang === "en" ? "3 Months Social" : "3 أشهر تسويق رقمي"}</li>
                <li className="flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-[var(--accent1)]"/> {lang === "en" ? "Ad Campaign" : "حملة إعلانية"}</li>
                <li className="flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-[var(--accent1)]"/> {lang === "en" ? "SEO Strategy" : "استراتيجية SEO"}</li>
                <li className="flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-[var(--accent1)]"/> {lang === "en" ? "Monthly Report" : "تقرير شهري"}</li>
              </ul>
              <UIverseBtn href={WA_URL} fullWidth>
                {lang === "en" ? "Start Growing" : "ابدأ النمو"}
                {lang === "en" ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
              </UIverseBtn>
            </div>
          </FadeInWhenVisible>

          {/* Studio */}
          <FadeInWhenVisible delay={0.3}>
            <div className="p-8 rounded-3xl border" style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--card-border)" }}>
              <div className="mb-8">
                <span className="text-sm font-bold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>◆ {lang === "en" ? "Premium" : "المميز"}</span>
                <h3 className="text-3xl font-bold mt-2" style={{ color: "var(--text)" }}>{lang === "en" ? "Studio" : "الاستوديو"}</h3>
              </div>
              <ul className="space-y-4 mb-8" style={{ color: "var(--text)" }}>
                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-[var(--accent3)]"/> {lang === "en" ? "Everything in Growth" : "كل ما في باقة النمو"}</li>
                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-[var(--accent3)]"/> {lang === "en" ? "Desktop App" : "تطبيق سطح المكتب"}</li>
                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-[var(--accent3)]"/> {lang === "en" ? "Full Marketing Funnel" : "قمع تسويقي متكامل"}</li>
                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-[var(--accent3)]"/> {lang === "en" ? "Dedicated Manager" : "مدير حساب مخصص"}</li>
                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-[var(--accent3)]"/> {lang === "en" ? "Priority Support" : "دعم فني مميز"}</li>
                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-[var(--accent3)]"/> {lang === "en" ? "Quarterly Review" : "مراجعة ربع سنوية"}</li>
              </ul>
              <UIverseBtn href={WA_URL} fullWidth>
                {lang === "en" ? "Let's Build" : "لنبني معًا"}
                {lang === "en" ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
              </UIverseBtn>
            </div>
          </FadeInWhenVisible>
        </div>
      </div>
    </section>
  );
}

export function WhyOrbix() {
  const { lang } = useLang();

  const chips = [
    { en: "Speed-Obsessed", ar: "سرعة بلا تنازل", icon: <Zap className="w-5 h-5" /> },
    { en: "Design-First", ar: "التصميم أولًا", icon: <Paintbrush className="w-5 h-5" /> },
    { en: "Full-Stack Team", ar: "فريق متكامل", icon: <Users className="w-5 h-5" /> },
    { en: "Mobile-First Always", ar: "الجوال أولًا", icon: <Smartphone className="w-5 h-5" /> },
    { en: "Detail-Oriented", ar: "حب التفاصيل", icon: <Search className="w-5 h-5" /> },
    { en: "Growth Partners", ar: "شريك نمو", icon: <Rocket className="w-5 h-5" /> }
  ];

  return (
    <section className="py-32">
      <div className="container mx-auto px-6">
        <FadeInWhenVisible>
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center" style={{ color: "var(--text)" }}>
            {lang === "en" ? "Why orbix?" : "لماذا أوبريكس؟"}
          </h2>
          <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
            {chips.map((chip, i) => (
              <m.div
                key={i}
                whileHover={{ scale: 1.05, y: -2 }}
                className="px-6 py-4 rounded-2xl border font-bold text-lg cursor-default flex items-center gap-3"
                style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)", color: "var(--text)" }}
              >
                <span style={{ color: "var(--accent1)" }}>{chip.icon}</span>
                <span>{lang === "en" ? chip.en : chip.ar}</span>
              </m.div>
            ))}
          </div>
        </FadeInWhenVisible>
      </div>
    </section>
  );
}

export function CTA() {
  const { lang } = useLang();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      // Replace with your EmailJS service ID, template ID, and public key
      await emailjs.send(
        "YOUR_SERVICE_ID",
        "YOUR_TEMPLATE_ID",
        {
          from_name: data.name,
          from_email: data.email,
          message: data.message,
        },
        "YOUR_PUBLIC_KEY"
      );
      toast.success(lang === "en" ? "Message sent successfully!" : "تم إرسال الرسالة بنجاح!");
      reset();
    } catch (error) {
      toast.error(lang === "en" ? "Failed to send message. Please try again." : "فشل إرسال الرسالة. حاول مرة أخرى.");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <section className="relative py-40 overflow-hidden" id="contact">
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--bg)] via-[var(--accent1)]/10 to-[var(--accent2)]/10" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
      
      <div className="container mx-auto px-6 relative z-10">
        <FadeInWhenVisible>
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-2 rounded-full mb-8 text-sm font-bold tracking-wider" style={{ color: "var(--accent1)", backgroundColor: "var(--accent1)10" }}>
              {lang === "en" ? "★ Let's Create Something Remarkable" : "✦ لنصنع شيئًا استثنائيًا"}
            </div>
            <h2 className="text-5xl md:text-7xl font-extrabold mb-8 max-w-4xl mx-auto" style={{ color: "var(--text)" }}>
              {lang === "en" ? "Ready to Build Your Digital World?" : "مستعد لبناء عالمك الرقمي؟"}
            </h2>
            <p className="text-xl md:text-2xl mb-12 max-w-2xl mx-auto" style={{ color: "var(--text-muted)" }}>
              {lang === "en" 
                ? "From idea to launch — orbix handles everything. Let's start a conversation."
                : "من الفكرة إلى الإطلاق — أوبريكس تتولى كل شيء. لنبدأ الحديث."}
            </p>
          </div>
          
          <div className="max-w-2xl mx-auto">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <input
                  {...register("name")}
                  placeholder={lang === "en" ? "Your Name" : "اسمك"}
                  className="w-full px-6 py-4 rounded-2xl border focus:outline-none focus:ring-2 transition-all"
                  style={{ 
                    backgroundColor: "var(--card-bg)", 
                    borderColor: "var(--card-border)",
                    color: "var(--text)"
                  }}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                )}
              </div>
              
              <div>
                <input
                  {...register("email")}
                  type="email"
                  placeholder={lang === "en" ? "Your Email" : "بريدك الإلكتروني"}
                  className="w-full px-6 py-4 rounded-2xl border focus:outline-none focus:ring-2 transition-all"
                  style={{ 
                    backgroundColor: "var(--card-bg)", 
                    borderColor: "var(--card-border)",
                    color: "var(--text)"
                  }}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                )}
              </div>
              
              <div>
                <textarea
                  {...register("message")}
                  rows={4}
                  placeholder={lang === "en" ? "Your Message" : "رسالتك"}
                  className="w-full px-6 py-4 rounded-2xl border focus:outline-none focus:ring-2 transition-all resize-none"
                  style={{ 
                    backgroundColor: "var(--card-bg)", 
                    borderColor: "var(--card-border)",
                    color: "var(--text)"
                  }}
                />
                {errors.message && (
                  <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
                )}
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-full font-bold text-white transition-all disabled:opacity-50"
                style={{ backgroundColor: "var(--accent1)" }}
              >
                {isSubmitting 
                  ? (lang === "en" ? "Sending..." : "جاري الإرسال...")
                  : (lang === "en" ? "Send Message" : "إرسال الرسالة")
                }
              </button>
            </form>
            
            <div className="flex flex-col sm:flex-row justify-center items-center gap-5 mt-8">
              <WABtn href={WA_URL} />
              <MailBtn href={GMAIL} />
            </div>
          </div>
        </FadeInWhenVisible>
      </div>
    </section>
  );
}

export function Footer() {
  const { lang } = useLang();
  
  return (
    <footer className="py-16 border-t" style={{ borderColor: "var(--border)", backgroundColor: "var(--surface)" }}>
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-12 mb-16">
          <div>
            <div className="flex items-center gap-3 mb-4 overflow-visible">
              {/* الشكل السداسي الدوار - SVG */}
              <m.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="w-11 h-11 relative flex-shrink-0"
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
              <span className="font-extrabold text-3xl tracking-tighter" style={{ color: "var(--text)" }}>orbix</span>
            </div>
            <p className="text-lg font-medium" style={{ color: "var(--text-muted)" }}>
              {lang === "en" ? "Where design meets intelligence." : "حيث يلتقي التصميم بالذكاء."}
            </p>
          </div>
          
          <div>
            <h4 className="font-bold mb-6 text-lg" style={{ color: "var(--text)" }}>
              {lang === "en" ? "Quick Links" : "روابط سريعة"}
            </h4>
            <div className="flex flex-col gap-3 font-medium" style={{ color: "var(--text-muted)" }}>
              {footerLinks.map(l => (
                <a key={l.en} href={l.href} className="hover:text-[var(--accent1)] transition-colors w-fit">
                  {lang === "en" ? l.en : l.ar}
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-bold mb-6 text-lg" style={{ color: "var(--text)" }}>
              {lang === "en" ? "Connect" : "تواصل معنا"}
            </h4>
            <div className="flex gap-4 mb-6">
              <a 
                href="https://www.facebook.com/profile.php?id=61590186044836" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border flex items-center justify-center hover:bg-[var(--accent1)] hover:text-white transition-colors" 
                style={{ borderColor: "var(--border)", color: "var(--text)" }}
              >
                <Facebook size={20} />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border flex items-center justify-center hover:bg-[var(--accent1)] hover:text-white transition-colors" 
                style={{ borderColor: "var(--border)", color: "var(--text)" }}
              >
                <Instagram size={20} />
              </a>
              
            </div>
            <a href={GMAIL} className="font-bold text-lg hover:text-[var(--accent1)] transition-colors" style={{ color: "var(--text)" }}>
              riadkassab320@gmail.com
            </a>
          </div>
        </div>
        
        <div className="pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4 text-sm font-medium" style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}>
          <p>
            {lang === "en"
              ? "© 2026 orbix. Built by Obrix. All rights reserved."
              : "© 2026 orbix. تصميم وتطوير Obrix. جميع الحقوق محفوظة."}
          </p>
          <p>{lang === "en" ? "Crafted with obsession." : "صُنع بشغف."}</p>
        </div>
      </div>
    </footer>
  );
}

export default function Home() {
  useSmoothScroll();
  return (
    <div className="w-full flex flex-col font-sans transition-colors duration-300 relative overflow-x-hidden">
      <CursorGlow />
      <Navbar />
      <Hero />
      <Marquee />
      <About />
      <Services />
      <Packages />
      <WhyOrbix />
      <CTA />
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}









