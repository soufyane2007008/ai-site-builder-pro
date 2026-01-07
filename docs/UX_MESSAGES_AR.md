# 📝 قائمة رسائل الواجهة والأخطاء — Ntfly

> قائمة شاملة بالرسائل العربية التي يجب تعريفها في الواجهة

---

## رسائل المصادقة (Authentication)

### النجاح
| المفتاح | الرسالة |
|--------|---------|
| `auth.login.success` | "تم تسجيل الدخول بنجاح" |
| `auth.register.success` | "تم إنشاء الحساب بنجاح. مرحباً بك!" |
| `auth.logout.success` | "تم تسجيل الخروج بنجاح" |
| `auth.password.reset.sent` | "تم إرسال رابط إعادة تعيين كلمة المرور إلى بريدك" |
| `auth.password.changed` | "تم تغيير كلمة المرور بنجاح" |
| `auth.email.verified` | "تم التحقق من البريد الإلكتروني بنجاح" |

### الأخطاء
| المفتاح | الرسالة |
|--------|---------|
| `auth.error.invalid.credentials` | "البريد الإلكتروني أو كلمة المرور غير صحيحة" |
| `auth.error.email.exists` | "هذا البريد الإلكتروني مسجل مسبقاً" |
| `auth.error.weak.password` | "كلمة المرور ضعيفة. استخدم 8 أحرف على الأقل مع أرقام ورموز" |
| `auth.error.invalid.email` | "صيغة البريد الإلكتروني غير صحيحة" |
| `auth.error.user.disabled` | "هذا الحساب موقوف. تواصل مع الدعم" |
| `auth.error.user.not.found` | "لم يُعثر على حساب بهذا البريد" |
| `auth.error.too.many.requests` | "محاولات كثيرة. انتظر قليلاً ثم حاول مجدداً" |
| `auth.error.network` | "خطأ في الاتصال. تحقق من الإنترنت" |
| `auth.error.session.expired` | "انتهت الجلسة. سجّل الدخول مجدداً" |
| `auth.error.google.popup.closed` | "تم إغلاق نافذة تسجيل Google" |
| `auth.error.github.popup.closed` | "تم إغلاق نافذة تسجيل GitHub" |

---

## رسائل المشاريع (Projects)

### النجاح
| المفتاح | الرسالة |
|--------|---------|
| `project.created` | "تم إنشاء المشروع بنجاح" |
| `project.generating` | "جارٍ إنشاء موقعك... قد يستغرق هذا دقيقة" |
| `project.completed` | "تم إنشاء موقعك بنجاح! يمكنك معاينته الآن" |
| `project.deleted` | "تم حذف المشروع" |
| `project.downloaded` | "تم تحميل المشروع كملف ZIP" |

### التقدم
| المفتاح | الرسالة |
|--------|---------|
| `project.progress.analyzing` | "تحليل المتطلبات..." |
| `project.progress.structure` | "إنشاء الهيكل..." |
| `project.progress.content` | "توليد المحتوى..." |
| `project.progress.styling` | "تطبيق التصميم..." |
| `project.progress.seo` | "إعداد SEO..." |
| `project.progress.files` | "إنشاء الملفات..." |
| `project.progress.uploading` | "رفع الملفات..." |
| `project.progress.finishing` | "اللمسات الأخيرة..." |

### الأخطاء
| المفتاح | الرسالة |
|--------|---------|
| `project.error.create` | "خطأ في إنشاء المشروع. الرجاء المحاولة لاحقاً" |
| `project.error.generate` | "فشل في توليد الموقع. حاول مجدداً" |
| `project.error.quota.exceeded` | "تجاوزت الحد اليومي. انتظر 24 ساعة أو ترقّ لخطة أعلى" |
| `project.error.not.found` | "المشروع غير موجود أو تم حذفه" |
| `project.error.permission` | "لا تملك صلاحية الوصول لهذا المشروع" |
| `project.error.download` | "فشل في تحميل الملف. حاول مجدداً" |
| `project.error.invalid.name` | "اسم المشروع غير صالح. استخدم أحرف وأرقام فقط" |
| `project.error.name.too.long` | "اسم المشروع طويل جداً (الحد: 50 حرف)" |

---

## رسائل الذكاء الاصطناعي (AI)

### المعلومات
| المفتاح | الرسالة |
|--------|---------|
| `ai.using.local` | "يتم استخدام المحرك المحلي للتوليد" |
| `ai.using.external` | "يتم استخدام {provider} للتوليد" |
| `ai.fallback.local` | "تعذر الاتصال بالموفر الخارجي. يُستخدم المحرك المحلي" |

### النجاح
| المفتاح | الرسالة |
|--------|---------|
| `ai.keys.saved` | "تم حفظ المفاتيح مشفرة بنجاح" |
| `ai.keys.test.success` | "الاتصال بـ {provider} يعمل بنجاح" |
| `ai.keys.deleted` | "تم حذف مفتاح {provider}" |

### الأخطاء
| المفتاح | الرسالة |
|--------|---------|
| `ai.error.no.keys` | "لم يتم العثور على مفاتيح AI — النظام يعمل بوظائف محلية" |
| `ai.error.invalid.key` | "مفتاح API غير صالح لـ {provider}" |
| `ai.error.rate.limit` | "تجاوزت حد الاستخدام لـ {provider}. انتظر قليلاً" |
| `ai.error.timeout` | "انتهت مهلة الاتصال بـ {provider}. يُستخدم المحرك المحلي" |
| `ai.error.decrypt` | "كلمة المرور غير صحيحة. لا يمكن فك تشفير المفاتيح" |
| `ai.error.encrypt` | "فشل في تشفير المفاتيح. حاول مجدداً" |

---

## رسائل لوحة الأدمن (Admin)

### المستخدمون
| المفتاح | الرسالة |
|--------|---------|
| `admin.user.role.changed` | "تم تغيير دور المستخدم إلى {role}" |
| `admin.user.suspended` | "تم إيقاف المستخدم" |
| `admin.user.activated` | "تم تفعيل المستخدم" |
| `admin.user.deleted` | "تم حذف المستخدم" |
| `admin.user.cannot.modify.self` | "لا يمكنك تعديل حسابك الخاص من هنا" |
| `admin.user.cannot.delete.admin` | "لا يمكن حذف حساب الأدمن الرئيسي" |

### الإعدادات
| المفتاح | الرسالة |
|--------|---------|
| `admin.settings.saved` | "تم حفظ الإعدادات" |
| `admin.settings.theme.updated` | "تم تحديث ألوان المنصة" |
| `admin.backup.created` | "تم إنشاء نسخة احتياطية" |
| `admin.backup.restored` | "تم استعادة النسخة الاحتياطية" |

---

## رسائل التقييمات والاقتراحات (Feedback)

| المفتاح | الرسالة |
|--------|---------|
| `feedback.submitted` | "شكراً لتقييمك! رأيك مهم لنا" |
| `suggestion.submitted` | "تم إرسال اقتراحك. سنراجعه قريباً" |
| `feedback.error` | "فشل في إرسال التقييم. حاول مجدداً" |

---

## رسائل عامة (General)

### التأكيدات
| المفتاح | الرسالة |
|--------|---------|
| `confirm.delete` | "هل أنت متأكد من الحذف؟ لا يمكن التراجع" |
| `confirm.cancel` | "هل تريد الإلغاء؟ ستفقد التغييرات غير المحفوظة" |
| `confirm.logout` | "هل تريد تسجيل الخروج؟" |

### الحالات
| المفتاح | الرسالة |
|--------|---------|
| `loading` | "جارٍ التحميل..." |
| `saving` | "جارٍ الحفظ..." |
| `processing` | "جارٍ المعالجة..." |
| `uploading` | "جارٍ الرفع..." |
| `downloading` | "جارٍ التحميل..." |

### الأخطاء العامة
| المفتاح | الرسالة |
|--------|---------|
| `error.generic` | "حدث خطأ غير متوقع. حاول مجدداً" |
| `error.network` | "خطأ في الاتصال. تحقق من الإنترنت" |
| `error.server` | "خطأ في الخادم. حاول لاحقاً" |
| `error.permission` | "لا تملك الصلاحية للقيام بهذا الإجراء" |
| `error.not.found` | "الصفحة أو المورد غير موجود" |
| `error.validation` | "الرجاء تصحيح الأخطاء في النموذج" |

---

## رسائل التحقق من النماذج (Validation)

| المفتاح | الرسالة |
|--------|---------|
| `validation.required` | "هذا الحقل مطلوب" |
| `validation.email` | "أدخل بريد إلكتروني صحيح" |
| `validation.min.length` | "الحد الأدنى {min} أحرف" |
| `validation.max.length` | "الحد الأقصى {max} حرف" |
| `validation.password.match` | "كلمتا المرور غير متطابقتين" |
| `validation.url` | "أدخل رابط صحيح" |
| `validation.phone` | "أدخل رقم هاتف صحيح" |

---

## رسائل الحالة (Status)

| المفتاح | الرسالة |
|--------|---------|
| `status.pending` | "قيد الانتظار" |
| `status.generating` | "جارٍ الإنشاء" |
| `status.completed` | "مكتمل" |
| `status.failed` | "فشل" |
| `status.active` | "نشط" |
| `status.suspended` | "موقوف" |
| `status.online` | "متصل" |
| `status.offline` | "غير متصل" |

---

## نص Footer

```
منصة Ntfly — تصميم وتطوير Soufyane
⚠️ هذا إصدار تجريبي لمدة شهر

للتواصل:
📧 Irsoufyane2007@gmail.com
📱 0638369776
📷 @soufiane__lr__77
```

---

**انتهت قائمة الرسائل — يجب دمجها في نظام i18n أو ملف ثوابت**
