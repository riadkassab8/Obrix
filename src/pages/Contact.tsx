import { useState } from "react";
import emailjs from "@emailjs/browser";
import { m, AnimatePresence } from "framer-motion";
import { useLang } from "@/contexts/LangContext";
import { useTheme } from "@/contexts/ThemeContext";
import { ArrowRight, ArrowLeft, Loader2, CheckCircle, XCircle, Phone } from "lucide-react";

const SERVICE_ID = "service_7h8hg1o";
const TEMPLATE_ID = "template_w8k8ixq";
const PUBLIC_KEY = "xeaivkRMG5-TylraA";

const countryCodes = [
  { code: "+20", country: "Egypt", flag: "🇪🇬" },
  { code: "+1", country: "USA", flag: "🇺🇸" },
  { code: "+44", country: "UK", flag: "🇬🇧" },
  { code: "+971", country: "UAE", flag: "🇦🇪" },
  { code: "+966", country: "Saudi Arabia", flag: "🇸🇦" },
  { code: "+974", country: "Qatar", flag: "🇶🇦" },
  { code: "+965", country: "Kuwait", flag: "🇰🇼" },
  { code: "+973", country: "Bahrain", flag: "🇧🇭" },
  { code: "+968", country: "Oman", flag: "🇴🇲" },
  { code: "+213", country: "Algeria", flag: "🇩🇿" },
  { code: "+216", country: "Tunisia", flag: "🇹🇳" },
  { code: "+212", country: "Morocco", flag: "🇲🇦" },
];

function FadeInWhenVisible({ children, delay = 0 }: any) {
  return (
    <m.div
      initial={{ y: 40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
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
  { en: "Contact", ar: "تواصل معنا", href: "/contact" }
];

export function Navbar() {
  const { lang, toggleLang } = useLang();
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
              <a
                key={link.en}
                href={link.href}
                className="text-sm font-medium tracking-wide transition-colors duration-200 ease relative"
                style={{
                  color: link.href === "/contact" ? "var(--text)" : "var(--text-muted)"
                }}
              >
                {lang === "en" ? link.en : link.ar}
                {link.href === "/contact" && (
                  <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-[var(--accent1)]" />
                )}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <m.button
              onClick={toggleLang}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-sm font-bold hover:text-[var(--accent1)] transition-colors"
              style={{ color: "var(--text)" }}
              aria-label="Toggle language"
            >
              {lang === "en" ? "عربي | EN" : "EN | عربي"}
            </m.button>
            <m.button
              onClick={toggleTheme}
              whileHover={{ scale: 1.1, rotate: 180 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="p-3 rounded-full hover:bg-[var(--surface2)] transition-colors"
              aria-label="Toggle theme"
            >
              <span style={{ color: "var(--text)" }}>🌙</span>
            </m.button>
          </div>
        </div>
      </nav>
    </>
  );
}

export default function Contact() {
  const { lang } = useLang();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    countryCode: "+20",
    phone: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // First name validation - only letters, spaces, hyphens, apostrophes, min 2 chars
    if (!formData.firstName.trim()) {
      newErrors.firstName = lang === "en" ? "First name is required" : "الاسم الأول مطلوب";
    } else if (!/^[a-zA-Z\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF\s\-']{2,50}$/.test(formData.firstName.trim())) {
      newErrors.firstName = lang === "en" ? "Invalid first name (2-50 characters, letters only)" : "اسم الأول غير صالح (2-50 حرف، حروف فقط)";
    }

    // Last name validation - only letters, spaces, hyphens, apostrophes, min 2 chars
    if (!formData.lastName.trim()) {
      newErrors.lastName = lang === "en" ? "Last name is required" : "الاسم الأخير مطلوب";
    } else if (!/^[a-zA-Z\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF\s\-']{2,50}$/.test(formData.lastName.trim())) {
      newErrors.lastName = lang === "en" ? "Invalid last name (2-50 characters, letters only)" : "الاسم الأخير غير صالح (2-50 حرف، حروف فقط)";
    }

    // Email validation - comprehensive regex
    if (!formData.email.trim()) {
      newErrors.email = lang === "en" ? "Email is required" : "البريد الإلكتروني مطلوب";
    } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email.trim())) {
      newErrors.email = lang === "en" ? "Invalid email address" : "بريد إلكتروني غير صالح";
    }

    // Phone validation - exactly 11 digits, numbers only
    if (!formData.phone.trim()) {
      newErrors.phone = lang === "en" ? "Phone number is required" : "رقم الهاتف مطلوب";
    } else if (!/^\d{11}$/.test(formData.phone.trim())) {
      newErrors.phone = lang === "en" ? "Phone number must be exactly 11 digits" : "رقم الهاتف يجب أن يكون 11 رقم";
    }

    // Subject validation - min 3 chars, max 100 chars
    if (!formData.subject.trim()) {
      newErrors.subject = lang === "en" ? "Subject is required" : "الموضوع مطلوب";
    } else if (formData.subject.trim().length < 3 || formData.subject.trim().length > 100) {
      newErrors.subject = lang === "en" ? "Subject must be 3-100 characters" : "الموضوع يجب أن يكون 3-100 حرف";
    }

    // Message validation - min 10 chars, max 1000 chars
    if (!formData.message.trim()) {
      newErrors.message = lang === "en" ? "Message is required" : "الرسالة مطلوبة";
    } else if (formData.message.trim().length < 10 || formData.message.trim().length > 1000) {
      newErrors.message = lang === "en" ? "Message must be 10-1000 characters" : "الرسالة يجب أن تكون 10-1000 حرف";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    setStatus("idle");

    try {
      const templateParams = {
        from_name: `${formData.firstName} ${formData.lastName}`,
        from_email: formData.email,
        phone: `${formData.countryCode} ${formData.phone}`,
        subject: formData.subject,
        message: formData.message
      };

      await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);
      
      setStatus("success");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        countryCode: "+20",
        phone: "",
        subject: "",
        message: ""
      });
      setErrors({});
    } catch (error) {
      console.error("EmailJS error:", error);
      setStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // First name - only letters, spaces, hyphens, apostrophes
    if (name === "firstName" || name === "lastName") {
      const sanitized = value.replace(/[^a-zA-Z\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF\s\-']/g, "");
      setFormData(prev => ({ ...prev, [name]: sanitized }));
      if (errors[name]) {
        setErrors(prev => ({ ...prev, [name]: "" }));
      }
      return;
    }
    
    // Phone number - only numbers, max 11 digits
    if (name === "phone") {
      if (value.length > 11) return;
      if (value && !/^\d*$/.test(value)) return;
      setFormData(prev => ({ ...prev, [name]: value }));
      if (errors[name]) {
        setErrors(prev => ({ ...prev, [name]: "" }));
      }
      return;
    }
    
    // Subject - max 100 characters
    if (name === "subject") {
      if (value.length > 100) return;
      setFormData(prev => ({ ...prev, [name]: value }));
      if (errors[name]) {
        setErrors(prev => ({ ...prev, [name]: "" }));
      }
      return;
    }
    
    // Message - max 1000 characters
    if (name === "message") {
      if (value.length > 1000) return;
      setFormData(prev => ({ ...prev, [name]: value }));
      if (errors[name]) {
        setErrors(prev => ({ ...prev, [name]: "" }));
      }
      return;
    }
    
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  return (
    <div className="w-full min-h-screen pt-24 pb-16">
      <style>{`
        select option {
          background-color: var(--surface);
          color: var(--text);
        }
        select:focus {
          outline: none;
          border-color: var(--accent1);
        }
      `}</style>
      <Navbar />
      <section className="py-16">
        <div className="container mx-auto px-6">
          <FadeInWhenVisible>
            <div className="max-w-2xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center" style={{ color: "var(--text)" }}>
                {lang === "en" ? "Get in Touch" : "تواصل معنا"}
              </h1>
              <p className="text-xl mb-12 text-center" style={{ color: "var(--text-muted)" }}>
                {lang === "en" ? "We'd love to hear from you. Send us a message!" : "نود سماع رأيك. أرسل لنا رسالة!"}
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold mb-2" style={{ color: "var(--text)" }}>
                      {lang === "en" ? "First Name" : "الاسم الأول"} *
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl transition-all"
                      style={{
                        backgroundColor: "var(--surface)",
                        border: errors.firstName ? "2px solid #ef4444" : "2px solid var(--border)",
                        color: "var(--text)"
                      }}
                      placeholder={lang === "en" ? "John" : "محمد"}
                    />
                    {errors.firstName && (
                      <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2" style={{ color: "var(--text)" }}>
                      {lang === "en" ? "Last Name" : "الاسم الأخير"} *
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl transition-all"
                      style={{
                        backgroundColor: "var(--surface)",
                        border: errors.lastName ? "2px solid #ef4444" : "2px solid var(--border)",
                        color: "var(--text)"
                      }}
                      placeholder={lang === "en" ? "Doe" : "أحمد"}
                    />
                    {errors.lastName && (
                      <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: "var(--text)" }}>
                    {lang === "en" ? "Email Address" : "البريد الإلكتروني"} *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl transition-all"
                    style={{
                      backgroundColor: "var(--surface)",
                      border: errors.email ? "2px solid #ef4444" : "2px solid var(--border)",
                      color: "var(--text)"
                    }}
                    placeholder={lang === "en" ? "john@example.com" : "محمد@example.com"}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: "var(--text)" }}>
                    {lang === "en" ? "Phone Number" : "رقم الهاتف"} *
                  </label>
                  <div className="flex gap-3">
                    <select
                      name="countryCode"
                      value={formData.countryCode}
                      onChange={handleChange}
                      className="px-3 py-3 rounded-xl transition-all appearance-none cursor-pointer"
                      style={{
                        backgroundColor: "var(--surface)",
                        border: "2px solid var(--border)",
                        color: "var(--text)",
                        minWidth: "140px",
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23ffffff'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "right 0.75rem center",
                        backgroundSize: "1rem",
                        paddingRight: "2.5rem"
                      }}
                    >
                      {countryCodes.map((country) => (
                        <option 
                          key={country.code} 
                          value={country.code}
                          style={{
                            backgroundColor: "var(--surface)",
                            color: "var(--text)"
                          }}
                        >
                          {country.flag} {country.code}
                        </option>
                      ))}
                    </select>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      maxLength={11}
                      className="flex-1 px-4 py-3 rounded-xl transition-all"
                      style={{
                        backgroundColor: "var(--surface)",
                        border: errors.phone ? "2px solid #ef4444" : "2px solid var(--border)",
                        color: "var(--text)"
                      }}
                      placeholder={lang === "en" ? "phone number or whatsapp" : "رقم الهاتف أو الواتساب"}
                    />
                  </div>
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: "var(--text)" }}>
                    {lang === "en" ? "Subject" : "الموضوع"} *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl transition-all"
                    style={{
                      backgroundColor: "var(--surface)",
                      border: errors.subject ? "2px solid #ef4444" : "2px solid var(--border)",
                      color: "var(--text)"
                    }}
                    placeholder={lang === "en" ? "Project Inquiry" : "استفسار عن مشروع"}
                  />
                  {errors.subject && (
                    <p className="text-red-500 text-sm mt-1">{errors.subject}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: "var(--text)" }}>
                    {lang === "en" ? "Message" : "الرسالة"} *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    className="w-full px-4 py-3 rounded-xl transition-all resize-none"
                    style={{
                      backgroundColor: "var(--surface)",
                      border: errors.message ? "2px solid #ef4444" : "2px solid var(--border)",
                      color: "var(--text)"
                    }}
                    placeholder={lang === "en" ? "Tell us about your project..." : "أخبرنا عن مشروعك..."}
                  />
                  {errors.message && (
                    <p className="text-red-500 text-sm mt-1">{errors.message}</p>
                  )}
                </div>

                <AnimatePresence mode="wait">
                  {status === "success" && (
                    <m.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex items-center gap-2 p-4 rounded-xl bg-green-500/10 border border-green-500/30"
                    >
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-green-500 font-semibold">
                        {lang === "en" ? "Message sent successfully!" : "تم إرسال الرسالة بنجاح!"}
                      </span>
                    </m.div>
                  )}

                  {status === "error" && (
                    <m.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex items-center gap-2 p-4 rounded-xl bg-red-500/10 border border-red-500/30"
                    >
                      <XCircle className="w-5 h-5 text-red-500" />
                      <span className="text-red-500 font-semibold">
                        {lang === "en" ? "Failed to send message. Please try again." : "فشل إرسال الرسالة. يرجى المحاولة مرة أخرى."}
                      </span>
                    </m.div>
                  )}
                </AnimatePresence>

                <m.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                  className="w-full px-8 py-4 rounded-full font-semibold text-sm transition-all flex items-center justify-center gap-2"
                  style={{
                    backgroundColor: "transparent",
                    color: "var(--accent1)",
                    border: "2px solid var(--accent1)",
                    opacity: isSubmitting ? 0.7 : 1
                  }}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      {lang === "en" ? "Sending..." : "جاري الإرسال..."}
                    </>
                  ) : (
                    <>
                      {lang === "en" ? "Send Message" : "إرسال الرسالة"}
                      {lang === "en" ? <ArrowRight className="w-5 h-5" /> : <ArrowLeft className="w-5 h-5" />}
                    </>
                  )}
                </m.button>
              </form>
            </div>
          </FadeInWhenVisible>
        </div>
      </section>
    </div>
  );
}
