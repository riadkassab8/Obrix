# دليل إنشاء صفحة المشاريع (Projects Page)

## نظرة عامة
هذا الدليل يشرح كيف تم إنشاء صفحة المشاريع في المشروع باستخدام React و TypeScript و Tailwind CSS.

## هيكل الملف
الملف الرئيسي: `src/pages/Projects.tsx`

## المكونات الرئيسية

### 1. LivePreview Component
```typescript
function LivePreview({ url }: { url: string })
```
**الوظيفة:** عرض معاينة حية للموقع عبر iframe

**الميزات:**
- عرض الموقع بحجم مصغر (scale 0.25)
- معالجة الأخطاء إذا فشل تحميل الموقع
- استخدام sandbox للأمان
- تحميل lazy للأداء

**التنفيذ:**
```typescript
<iframe
  src={url}
  width="400%"
  height="400%"
  style={{
    transform: "scale(0.25)",
    transformOrigin: "top left",
    pointerEvents: "none",
  }}
  sandbox="allow-same-origin allow-scripts allow-forms"
/>
```

---

### 2. WABtn Component
```typescript
function WABtn({ href, fullWidth = false }: { href: string; fullWidth?: boolean })
```
**الوظيفة:** زر واتساب للتواصل

**الميزات:**
- دعم اللغتين العربية والإنجليزية
- أيقونة واتساب مخصصة
- تأثيرات animation عند الضغط

---

### 3. FadeInWhenVisible Component
```typescript
function FadeInWhenVisible({ children, margin = "-100px", delay = 0 }: any)
```
**الوظيفة:** إضافة أنيميشن عند ظهور العنصر في الشاشة

**الميزات:**
- استخدام `useInView` من framer-motion
- أنيميشن fade-in من الأسفل
- قابل للتخصيص (margin, delay)

**التنفيذ:**
```typescript
const ref = useRef(null);
const isInView = useInView(ref, { once: true, margin });

<m.div
  ref={ref}
  initial={{ y: 40, opacity: 0 }}
  animate={isInView ? { y: 0, opacity: 1 } : { y: 40, opacity: 0 }}
  transition={{ duration: 0.4, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
>
```

---

### 4. Navbar Component
```typescript
export function Navbar()
```
**الوظيفة:** شريط التنقل الرئيسي

**الميزات:**
- ثابت في أعلى الصفحة
- يتغير عند التمرير (backdrop-blur)
- قائمة موبايل متجاوبة
- تبديل اللغة والثيم
- شعار متحرك (rotation animation)

**الروابط:**
- الرئيسية (/)
- أعمالنا (/projects)
- خدماتنا (/#services)
- باقاتنا (/#packages)
- تواصل معنا (/contact)

---

### 5. Projects Component (المكون الرئيسي)
```typescript
export default function Projects()
```

#### الحالة (State)
```typescript
const [activeFilter, setActiveFilter] = useState("All");
const [isLoading, setIsLoading] = useState(true);
```

#### بيانات المشاريع
مصفوفة `projects` تحتوي على 20 مشروع، كل مشروع يحتوي على:
```typescript
{
  titleEn: string;      // العنوان بالإنجليزية
  titleAr: string;      // العنوان بالعربية
  descEn: string;       // الوصف بالإنجليزية
  descAr: string;       // الوصف بالعربية
  tags: string[];       // التقنيات المستخدمة
  category: string;     // الفئة الرئيسية
  categories?: string[]; // فئات إضافية (اختياري)
  url: string;          // رابط الموقع
}
```

#### الفلاتر
```typescript
const filters = [
  { en: "All", ar: "الكل", value: "All" },
  { en: "Portfolio", ar: "بورتفوليو", value: "Portfolio" },
  { en: "E-Commerce", ar: "متاجر إلكترونية", value: "E-Commerce" },
  { en: "Landing", ar: "صفحات هبوط", value: "Landing" },
  { en: "Education", ar: "تعليمية", value: "Education" },
  { en: "Dashboard", ar: "لوحات تحكم", value: "Dashboard" },
];
```

#### تصفية المشاريع
```typescript
const filteredProjects = activeFilter === "All" 
  ? projects 
  : projects.filter((p) => (p.categories ?? [p.category]).includes(activeFilter));
```

---

## المكتبات المستخدمة

### 1. framer-motion
```typescript
import { m, AnimatePresence, useInView } from "framer-motion";
```
**الاستخدام:**
- أنيميشن العناصر
- تأثيرات hover
- انتقالات سلسة

### 2. lucide-react
```typescript
import { ArrowRight, ArrowLeft, Menu, X, Moon, Sun } from "lucide-react";
```
**الاستخدام:**
- أيقونات الواجهة
- دعم RTL/LTR

### 3. Context APIs
```typescript
import { useLang } from "@/contexts/LangContext";
import { useTheme } from "@/contexts/ThemeContext";
```
**الاستخدام:**
- إدارة اللغة (عربي/إنجليزي)
- إدارة الثيم (ليلي/نهاري)

---

## التصميم والستايل

### CSS Variables المستخدمة
```css
--text          : لون النص الرئيسي
--text-muted    : لون النص الثانوي
--surface       : لون الخلفية
--surface2      : لون الخلفية الثانوي
--accent1       : اللون الأساسي
--border        : لون الحدود
--card-border   : لون حدود البطاقات
--navbar-bg     : لون خلفية النافبار
--bg            : لون الخلفية العام
```

### Tailwind CSS Classes
- `grid md:grid-cols-2 lg:grid-cols-3` - الشبكة المتجاوبة
- `rounded-2xl` - زوايا دائرية
- `backdrop-blur-md` - تأثير الضبابية
- `transition-all` - انتقالات سلسة

---

## الأنيميشن

### 1. شريط التنقل
```typescript
// تغيير عند التمرير
scrolled ? "backdrop-blur-md border-b" : ""
```

### 2. البطاقات
```typescript
whileHover={{ y: -6 }}
transition={{ type: "spring", stiffness: 280, damping: 22 }}
```

### 3. الفلاتر
```typescript
whileHover={{ scale: 1.05 }}
whileTap={{ scale: 0.95 }}
```

### 4. الشعار
```typescript
animate={{ rotate: 360 }}
transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
```

---

## الميزات المتقدمة

### 1. Skeleton Loading
```typescript
{isLoading ? (
  Array.from({ length: 6 }).map((_, i) => (
    <div key={i}>
      <Skeleton className="w-full h-[220px]" />
      {/* المزيد من Skeletons */}
    </div>
  ))
) : (
  // عرض المشاريع الحقيقية
)}
```

### 2. تحميل وهمي
```typescript
useEffect(() => {
  const timer = setTimeout(() => setIsLoading(false), 1000);
  return () => clearTimeout(timer);
}, []);
```

### 3. AnimatePresence للتصفية
```typescript
<AnimatePresence mode="wait">
  <m.div
    key={activeFilter}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
  >
```

---

## دعم اللغات

### العربية (RTL)
```typescript
{lang === "en" ? "English Text" : "النص العربي"}
{lang === "en" ? <ArrowRight /> : <ArrowLeft />}
```

### اتجاه النص
- يتم تحديد الاتجاه بناءً على اللغة المختارة
- الأيقونات تتغير حسب اتجاه النص

---

## خطوات الإنشاء

### 1. إنشاء المكونات الأساسية
- LivePreview
- WABtn
- FadeInWhenVisible
- Navbar

### 2. إعداد بيانات المشاريع
- إنشاء مصفوفة projects
- إضافة البيانات لكل مشروع

### 3. إنشاء الفلاتر
- تعريف مصفوفة filters
- إضافة منطق التصفية

### 4. بناء الواجهة
- إضافة Navbar
- إضافة قسم الفلاتر
- إضافة شبكة المشاريع

### 5. إضافة الأنيميشن
- استخدام framer-motion
- إضافة تأثيرات hover
- إضافة انتقالات

### 6. دعم اللغات
- إضافة Context للغة
- تحديث النصوص بناءً على اللغة

### 7. التجاوب
- استخدام Tailwind breakpoints
- اختبار على أحجام شاشات مختلفة

---

## نصائح مهمة

### 1. الأداء
- استخدام `loading="lazy"` للـ iframes
- استخدام `once: true` في useInView
- تحميل وهمي لتجربة أفضل

### 2. الأمان
- استخدام sandbox للـ iframes
- تعطيل pointerEvents للمعاينة

### 3. التجربة المستخدم
- skeleton loading أثناء التحميل
- أنيميشن سلس وغير مزعج
- feedback فوري عند التفاعل

### 4. الصيانة
- فصل المكونات
- استخدام TypeScript للأنواع
- تعليقات واضحة للكود

---

## الخلاصة

صفحة المشاريع هذه تجمع بين:
- تصميم عصري وجذاب
- أداء عالي
- تجربة مستخدم ممتازة
- دعم كامل للغتين
- أنيميشن احترافي
- تجاوب كامل

يمكنك استخدام هذا الدليل لإنشاء صفحات مشاريع مشابهة في مشاريع أخرى.
