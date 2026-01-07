# 📋 مواصفات API وهياكل البيانات لمنصة Ntfly

> ⚠️ **ملاحظة:** هذه مواصفات وصفية — أمثلة JSON فقط، لا شيفرة تنفيذية.

---

## هياكل مجموعات Firestore

### 1. مجموعة `users` (المستخدمون)

```json
{
  "collectionName": "users",
  "description": "تخزين بيانات المستخدمين المسجلين",
  "documentIdPattern": "{firebaseAuthUID}",
  
  "schema": {
    "id": {
      "type": "string",
      "description": "معرف المستخدم الفريد (من Firebase Auth)",
      "example": "abc123xyz789"
    },
    "email": {
      "type": "string",
      "description": "البريد الإلكتروني للمستخدم",
      "example": "user@example.com"
    },
    "name": {
      "type": "string",
      "description": "الاسم الكامل للمستخدم",
      "example": "أحمد محمد"
    },
    "avatar": {
      "type": "string | null",
      "description": "رابط صورة الملف الشخصي",
      "example": "https://storage.../avatar.jpg"
    },
    "role": {
      "type": "enum",
      "values": ["SUPER_ADMIN", "ADMIN", "USER", "GUEST"],
      "description": "دور المستخدم في النظام",
      "example": "USER"
    },
    "status": {
      "type": "enum",
      "values": ["active", "suspended", "banned"],
      "description": "حالة الحساب",
      "example": "active"
    },
    "projectCount": {
      "type": "number",
      "description": "عدد المشاريع المُنشأة",
      "example": 5
    },
    "lastProjectAt": {
      "type": "timestamp | null",
      "description": "تاريخ آخر مشروع (للحصة اليومية)",
      "example": "2024-01-15T10:30:00Z"
    },
    "preferences": {
      "type": "object",
      "description": "تفضيلات المستخدم",
      "properties": {
        "theme": "light | dark",
        "language": "ar | en | fr",
        "notifications": "boolean"
      }
    },
    "createdAt": {
      "type": "timestamp",
      "description": "تاريخ إنشاء الحساب",
      "example": "2024-01-01T00:00:00Z"
    },
    "updatedAt": {
      "type": "timestamp",
      "description": "تاريخ آخر تحديث",
      "example": "2024-01-15T12:00:00Z"
    }
  },

  "exampleDocument": {
    "id": "abc123xyz789",
    "email": "ahmad@example.com",
    "name": "أحمد محمد",
    "avatar": null,
    "role": "USER",
    "status": "active",
    "projectCount": 3,
    "lastProjectAt": "2024-01-15T10:30:00Z",
    "preferences": {
      "theme": "dark",
      "language": "ar",
      "notifications": true
    },
    "createdAt": "2024-01-01T00:00:00Z",
    "updatedAt": "2024-01-15T12:00:00Z"
  }
}
```

---

### 2. مجموعة `projects` (المشاريع)

```json
{
  "collectionName": "projects",
  "description": "تخزين بيانات المشاريع المُنشأة",
  "documentIdPattern": "auto-generated",

  "schema": {
    "id": {
      "type": "string",
      "description": "معرف المشروع الفريد",
      "example": "proj_abc123"
    },
    "userId": {
      "type": "string",
      "description": "معرف المستخدم المالك",
      "example": "abc123xyz789"
    },
    "name": {
      "type": "string",
      "description": "اسم المشروع",
      "example": "موقع شركة التقنية"
    },
    "type": {
      "type": "enum",
      "values": ["landing", "business", "portfolio", "store", "blog"],
      "description": "نوع الموقع",
      "example": "business"
    },
    "status": {
      "type": "enum",
      "values": ["pending", "generating", "completed", "failed"],
      "description": "حالة المشروع",
      "example": "completed"
    },
    "language": {
      "type": "enum",
      "values": ["ar", "en", "fr"],
      "description": "لغة المحتوى",
      "example": "ar"
    },
    "colors": {
      "type": "object",
      "description": "ألوان الثيم",
      "properties": {
        "primary": "string (hex)",
        "secondary": "string (hex)",
        "background": "string (hex)",
        "text": "string (hex)"
      }
    },
    "content": {
      "type": "object",
      "description": "المحتوى المُدخل من المستخدم",
      "properties": {
        "description": "string",
        "sections": "array",
        "contactInfo": "object"
      }
    },
    "generatedFiles": {
      "type": "array",
      "description": "قائمة الملفات المُنشأة",
      "items": {
        "path": "string",
        "size": "number",
        "type": "string"
      }
    },
    "previewUrl": {
      "type": "string | null",
      "description": "رابط المعاينة",
      "example": "https://storage.../preview/index.html"
    },
    "zipUrl": {
      "type": "string | null",
      "description": "رابط ملف ZIP",
      "example": "https://storage.../project.zip"
    },
    "aiProvider": {
      "type": "enum | null",
      "values": ["local", "openai", "gemini", "claude"],
      "description": "موفر AI المستخدم في التوليد",
      "example": "local"
    },
    "generationTime": {
      "type": "number | null",
      "description": "وقت التوليد بالثواني",
      "example": 45
    },
    "errorMessage": {
      "type": "string | null",
      "description": "رسالة الخطأ إن فشل",
      "example": null
    },
    "createdAt": {
      "type": "timestamp",
      "description": "تاريخ الإنشاء"
    },
    "updatedAt": {
      "type": "timestamp",
      "description": "تاريخ آخر تحديث"
    }
  },

  "exampleDocument": {
    "id": "proj_abc123",
    "userId": "abc123xyz789",
    "name": "موقع شركة التقنية",
    "type": "business",
    "status": "completed",
    "language": "ar",
    "colors": {
      "primary": "#3B82F6",
      "secondary": "#F59E0B",
      "background": "#FFFFFF",
      "text": "#1F2937"
    },
    "content": {
      "description": "شركة متخصصة في حلول التقنية",
      "sections": ["hero", "services", "about", "contact"],
      "contactInfo": {
        "email": "info@company.com",
        "phone": "+966500000000"
      }
    },
    "generatedFiles": [
      { "path": "index.html", "size": 15000, "type": "text/html" },
      { "path": "styles.css", "size": 8000, "type": "text/css" },
      { "path": "main.js", "size": 3000, "type": "text/javascript" }
    ],
    "previewUrl": "https://storage.../preview/index.html",
    "zipUrl": "https://storage.../project.zip",
    "aiProvider": "local",
    "generationTime": 45,
    "errorMessage": null,
    "createdAt": "2024-01-15T10:00:00Z",
    "updatedAt": "2024-01-15T10:01:00Z"
  }
}
```

---

### 3. مجموعة `secure_keys` (المفاتيح المشفرة)

```json
{
  "collectionName": "secure_keys",
  "description": "تخزين مفاتيح AI مشفرة (للأدمن فقط)",
  "documentIdPattern": "provider name",
  "securityNote": "هذه المجموعة محمية — الأدمن فقط يمكنه القراءة/الكتابة",

  "schema": {
    "provider": {
      "type": "enum",
      "values": ["openai", "gemini", "claude"],
      "description": "اسم موفر AI"
    },
    "ciphertext": {
      "type": "string",
      "description": "المفتاح المشفر (Base64)",
      "example": "U2FsdGVkX1..."
    },
    "iv": {
      "type": "string",
      "description": "قيمة IV للتشفير (Base64)",
      "example": "abc123..."
    },
    "algorithm": {
      "type": "string",
      "description": "خوارزمية التشفير",
      "example": "AES-GCM-256"
    },
    "updatedBy": {
      "type": "string",
      "description": "معرف الأدمن الذي حدّث المفتاح"
    },
    "updatedAt": {
      "type": "timestamp",
      "description": "تاريخ آخر تحديث"
    }
  },

  "exampleDocument": {
    "provider": "openai",
    "ciphertext": "U2FsdGVkX19abc123...",
    "iv": "randomIV123...",
    "algorithm": "AES-GCM-256",
    "updatedBy": "admin_user_id",
    "updatedAt": "2024-01-15T12:00:00Z"
  },

  "securityRules": {
    "read": "request.auth != null && isAdmin(request.auth.uid)",
    "write": "request.auth != null && isSuperAdmin(request.auth.uid)"
  }
}
```

---

### 4. مجموعة `logs` (السجلات)

```json
{
  "collectionName": "logs",
  "description": "تسجيل أحداث النظام",
  "documentIdPattern": "auto-generated",

  "schema": {
    "id": {
      "type": "string",
      "description": "معرف السجل"
    },
    "type": {
      "type": "enum",
      "values": ["auth", "project", "ai", "admin", "error", "security"],
      "description": "نوع الحدث"
    },
    "action": {
      "type": "string",
      "description": "الإجراء المُنفذ",
      "example": "user_login"
    },
    "userId": {
      "type": "string | null",
      "description": "معرف المستخدم المرتبط"
    },
    "details": {
      "type": "object",
      "description": "تفاصيل إضافية"
    },
    "ipAddress": {
      "type": "string | null",
      "description": "عنوان IP (إن توفر)"
    },
    "userAgent": {
      "type": "string | null",
      "description": "معلومات المتصفح"
    },
    "timestamp": {
      "type": "timestamp",
      "description": "وقت الحدث"
    }
  },

  "exampleDocument": {
    "id": "log_abc123",
    "type": "project",
    "action": "project_created",
    "userId": "abc123xyz789",
    "details": {
      "projectId": "proj_abc123",
      "projectType": "business",
      "aiProvider": "local"
    },
    "ipAddress": null,
    "userAgent": "Mozilla/5.0...",
    "timestamp": "2024-01-15T10:00:00Z"
  }
}
```

---

### 5. مجموعة `settings` (الإعدادات)

```json
{
  "collectionName": "settings",
  "description": "إعدادات النظام العامة",
  "documentIdPattern": "setting key",

  "schema": {
    "key": {
      "type": "string",
      "description": "مفتاح الإعداد"
    },
    "value": {
      "type": "any",
      "description": "قيمة الإعداد"
    },
    "description": {
      "type": "string",
      "description": "وصف الإعداد"
    },
    "updatedBy": {
      "type": "string",
      "description": "من قام بالتحديث"
    },
    "updatedAt": {
      "type": "timestamp"
    }
  },

  "exampleDocuments": [
    {
      "key": "quota_limit_24h",
      "value": 1,
      "description": "الحد الأقصى للمشاريع لكل مستخدم في 24 ساعة",
      "updatedBy": "admin",
      "updatedAt": "2024-01-01T00:00:00Z"
    },
    {
      "key": "registration_enabled",
      "value": true,
      "description": "هل التسجيل مفتوح؟",
      "updatedBy": "admin",
      "updatedAt": "2024-01-01T00:00:00Z"
    },
    {
      "key": "guest_access_enabled",
      "value": true,
      "description": "هل الدخول كضيف مسموح؟",
      "updatedBy": "admin",
      "updatedAt": "2024-01-01T00:00:00Z"
    },
    {
      "key": "default_theme",
      "value": {
        "primary": "#3B82F6",
        "secondary": "#F59E0B"
      },
      "description": "الثيم الافتراضي للمنصة",
      "updatedBy": "admin",
      "updatedAt": "2024-01-01T00:00:00Z"
    },
    {
      "key": "ai_fallback_enabled",
      "value": true,
      "description": "تفعيل المحرك المحلي عند فشل الخارجي",
      "updatedBy": "admin",
      "updatedAt": "2024-01-01T00:00:00Z"
    }
  ]
}
```

---

### 6. مجموعة `feedback` (التقييمات والاقتراحات)

```json
{
  "collectionName": "feedback",
  "description": "تقييمات واقتراحات المستخدمين",
  "documentIdPattern": "auto-generated",

  "schema": {
    "id": {
      "type": "string"
    },
    "userId": {
      "type": "string"
    },
    "type": {
      "type": "enum",
      "values": ["rating", "suggestion", "bug_report"]
    },
    "rating": {
      "type": "number | null",
      "description": "التقييم من 1 إلى 5"
    },
    "title": {
      "type": "string | null",
      "description": "عنوان الاقتراح"
    },
    "content": {
      "type": "string",
      "description": "المحتوى/التعليق"
    },
    "status": {
      "type": "enum",
      "values": ["pending", "reviewed", "implemented", "rejected"]
    },
    "adminResponse": {
      "type": "string | null"
    },
    "createdAt": {
      "type": "timestamp"
    }
  },

  "exampleDocument": {
    "id": "fb_abc123",
    "userId": "abc123xyz789",
    "type": "suggestion",
    "rating": null,
    "title": "إضافة قوالب جديدة",
    "content": "أقترح إضافة قالب للمطاعم",
    "status": "pending",
    "adminResponse": null,
    "createdAt": "2024-01-15T10:00:00Z"
  }
}
```

---

## قواعد أمان Firestore المقترحة

```javascript
// firestore.rules (نموذج وصفي — ليس للتنفيذ المباشر)

/*
 * قواعد الأمان لمنصة Ntfly
 * يجب مراجعتها وتخصيصها قبل النشر
 */

rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // دالة مساعدة: هل المستخدم أدمن؟
    // function isAdmin() { ... }
    
    // دالة مساعدة: هل المستخدم مالك المستند؟
    // function isOwner(userId) { ... }
    
    // المستخدمون: يقرأ الجميع بياناتهم، الأدمن يقرأ الكل
    match /users/{userId} {
      // allow read: if isOwner(userId) || isAdmin();
      // allow write: if isOwner(userId);
    }
    
    // المشاريع: المالك فقط يقرأ/يكتب، الأدمن يقرأ
    match /projects/{projectId} {
      // allow read: if isOwner(resource.data.userId) || isAdmin();
      // allow create: if isOwner(request.resource.data.userId);
      // allow update, delete: if isOwner(resource.data.userId);
    }
    
    // المفاتيح المشفرة: الأدمن فقط
    match /secure_keys/{keyId} {
      // allow read, write: if isAdmin();
    }
    
    // السجلات: قراءة للأدمن، كتابة للنظام
    match /logs/{logId} {
      // allow read: if isAdmin();
      // allow create: if request.auth != null;
    }
    
    // الإعدادات: قراءة للجميع، كتابة للأدمن
    match /settings/{settingId} {
      // allow read: if true;
      // allow write: if isAdmin();
    }
    
    // التقييمات: المستخدم يكتب، الأدمن يقرأ الكل
    match /feedback/{feedbackId} {
      // allow create: if request.auth != null;
      // allow read: if isOwner(resource.data.userId) || isAdmin();
    }
  }
}
```

---

**انتهى ملف المواصفات — هذه أمثلة وصفية فقط**
