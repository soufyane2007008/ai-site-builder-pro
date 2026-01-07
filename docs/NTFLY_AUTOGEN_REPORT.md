# 📋 تقرير الملفات والخطوات — Ntfly

> قالب تقرير التوليد التلقائي

---

## قائمة الملفات التي يجب إنشاؤها

### ملفات Firebase (`src/firebase/`)

| المسار | الغرض | الأولوية |
|--------|-------|----------|
| `src/firebase/config.ts` | إعدادات Firebase من متغيرات البيئة | عالية |
| `src/firebase/index.ts` | التصدير المركزي + وضع Mock | عالية |
| `src/firebase/auth.ts` | دوال المصادقة | عالية |
| `src/firebase/db.ts` | دوال Firestore CRUD | عالية |
| `src/firebase/storage.ts` | دوال رفع/تحميل الملفات | متوسطة |
| `src/firebase/mock/` | تنفيذات Mock للتطوير | متوسطة |

### ملفات المصادقة (`src/auth/`)

| المسار | الغرض | الأولوية |
|--------|-------|----------|
| `src/auth/AuthProvider.tsx` | سياق React للمصادقة | عالية |
| `src/auth/useAuth.ts` | Hook للوصول للسياق | عالية |
| `src/auth/RequireAuth.tsx` | حماية المسارات العامة | عالية |
| `src/auth/RequireAdmin.tsx` | حماية مسارات الأدمن | عالية |

### ملفات الذكاء الاصطناعي (`src/ai/`)

| المسار | الغرض | الأولوية |
|--------|-------|----------|
| `src/ai/config.ts` | إعدادات AI ومنطق القرار | عالية |
| `src/ai/router.ts` | توجيه الطلبات (محلي/خارجي) | عالية |
| `src/ai/local/generator.ts` | محرك التوليد المحلي | عالية |
| `src/ai/local/templates.ts` | قوالب المحتوى | عالية |
| `src/ai/external/openai.ts` | واجهة OpenAI | متوسطة |
| `src/ai/external/gemini.ts` | واجهة Gemini | متوسطة |
| `src/ai/external/claude.ts` | واجهة Claude | متوسطة |
| `src/ai/crypto.ts` | دوال التشفير/فك التشفير | عالية |

### ملفات منشئ المواقع (`src/builder/`)

| المسار | الغرض | الأولوية |
|--------|-------|----------|
| `src/builder/generator.ts` | المنطق الرئيسي للتوليد | عالية |
| `src/builder/exporter.ts` | تصدير ZIP | متوسطة |
| `src/builder/validator.ts` | التحقق من المدخلات | عالية |
| `src/builder/templates/landing.ts` | قالب صفحة هبوط | عالية |
| `src/builder/templates/business.ts` | قالب شركة | متوسطة |
| `src/builder/templates/portfolio.ts` | قالب معرض أعمال | متوسطة |
| `src/builder/templates/store.ts` | قالب متجر | منخفضة |

### ملفات الخدمات (`src/services/`)

| المسار | الغرض | الأولوية |
|--------|-------|----------|
| `src/services/quota.ts` | إدارة الحصص اليومية | عالية |
| `src/services/stats.ts` | تسجيل الإحصائيات | متوسطة |
| `src/services/logs.ts` | تسجيل الأحداث | متوسطة |

### ملفات الأدمن (`src/pages/admin/`)

| المسار | الغرض | الأولوية |
|--------|-------|----------|
| `src/pages/admin/AISettings.tsx` | إدارة مفاتيح AI | عالية |
| `src/pages/admin/Logs.tsx` | عرض السجلات | متوسطة |
| `src/pages/admin/Backup.tsx` | النسخ الاحتياطي | منخفضة |

### ملفات المكونات (`src/components/`)

| المسار | الغرض | الأولوية |
|--------|-------|----------|
| `src/components/SiteFooter.tsx` | Footer الموقع | عالية |
| `src/components/PassphraseModal.tsx` | مودال كلمة المرور | عالية |
| `src/components/ProgressBar.tsx` | شريط التقدم | متوسطة |

### ملفات التكوين (الجذر)

| المسار | الغرض | الأولوية |
|--------|-------|----------|
| `.env.example` | قالب المتغيرات البيئية | عالية |
| `firebase.json` | إعدادات Firebase Hosting | متوسطة |
| `firestore.rules` | قواعد أمان Firestore | عالية |
| `storage.rules` | قواعد أمان Storage | متوسطة |
| `netlify.toml` | إعدادات Netlify | منخفضة |

---

## خطوات الإعداد اليدوي

### 1. إعداد Firebase

```bash
# تثبيت Firebase CLI
npm install -g firebase-tools

# تسجيل الدخول
firebase login

# تهيئة المشروع
firebase init

# اختر:
# - Firestore
# - Hosting
# - Storage
# - Functions (اختياري)
```

### 2. إنشاء مشروع Firebase

1. اذهب إلى [Firebase Console](https://console.firebase.google.com)
2. أنشئ مشروعًا جديدًا
3. فعّل الخدمات:
   - Authentication (Email, Google, GitHub)
   - Firestore Database
   - Storage
4. أضف تطبيق ويب
5. انسخ بيانات التكوين

### 3. إعداد المتغيرات البيئية

```bash
# انسخ القالب
cp .env.example .env

# عدّل الملف وأضف قيم Firebase
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abc123
```

### 4. نشر قواعد الأمان

```bash
# نشر قواعد Firestore
firebase deploy --only firestore:rules

# نشر قواعد Storage
firebase deploy --only storage:rules
```

### 5. بناء ونشر التطبيق

```bash
# بناء للإنتاج
npm run build

# نشر على Firebase Hosting
firebase deploy --only hosting

# أو على Netlify
netlify deploy --prod
```

---

## خطوات الاختبار (Smoke Tests)

### 1. اختبار المصادقة

- [ ] فتح صفحة تسجيل الدخول
- [ ] إنشاء حساب جديد
- [ ] تسجيل الدخول بالبريد
- [ ] تسجيل الدخول بـ Google
- [ ] تسجيل الخروج
- [ ] التحقق من حماية المسارات

### 2. اختبار إنشاء المشاريع

- [ ] فتح معالج إنشاء مشروع
- [ ] إكمال جميع الخطوات
- [ ] انتظار اكتمال التوليد
- [ ] معاينة الموقع في iframe
- [ ] التحقق من حالة المشروع في Dashboard

### 3. اختبار التحميل

- [ ] الضغط على "تحميل ZIP"
- [ ] انتظار إنشاء الملف
- [ ] التحقق من تحميل الملف
- [ ] فك الضغط والتحقق من المحتويات
- [ ] فتح index.html محلياً

### 4. اختبار لوحة الأدمن

- [ ] تسجيل الدخول بحساب الأدمن
- [ ] عرض قائمة المستخدمين
- [ ] عرض قائمة المشاريع
- [ ] فتح صفحة مفاتيح AI
- [ ] إدخال مفتاح تجريبي
- [ ] تشفير وحفظ المفتاح
- [ ] اختبار الاتصال

### 5. اختبار الحصة

- [ ] إنشاء مشروع
- [ ] محاولة إنشاء مشروع ثانٍ
- [ ] التحقق من ظهور رسالة الحد

---

## ملاحظات التنفيذ

### ما تم تنفيذه
- [x] هيكل المشروع الأساسي
- [x] واجهة المستخدم (React + Tailwind)
- [x] نظام الثيم
- [x] صفحات التوجيه
- [x] AuthContext (تجريبي)

### ما يحتاج تنفيذ
- [ ] ربط Firebase حقيقي
- [ ] دوال المصادقة الفعلية
- [ ] Firestore CRUD
- [ ] Storage للملفات
- [ ] محرك AI المحلي الكامل
- [ ] واجهات AI الخارجية
- [ ] تشفير/فك تشفير المفاتيح
- [ ] تصدير ZIP
- [ ] قواعد الأمان

---

## معلومات المشروع

- **اسم المنصة:** Ntfly
- **الشركة:** Ntfly Digital
- **المطور:** Soufyane
- **البريد:** Irsoufyane2007@gmail.com
- **الهاتف:** 0638369776
- **إنستغرام:** @soufiane__lr__77
- **حساب الأدمن:** lrsoufyane2007@gmail.com

---

**تم إنشاء هذا التقرير تلقائياً — للتوثيق فقط**
