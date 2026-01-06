// AI Text Generator Module
// This module handles text generation for websites

export interface TextGeneratorOptions {
  type: 'personal' | 'store' | 'company' | 'blog';
  language: 'ar' | 'en' | 'fr';
  tone?: 'professional' | 'casual' | 'friendly';
}

export interface GeneratedContent {
  hero: {
    title: string;
    subtitle: string;
    cta: string;
  };
  about: {
    title: string;
    content: string;
  };
  services: Array<{
    title: string;
    description: string;
  }>;
  contact: {
    title: string;
    description: string;
  };
}

// Demo text templates for Arabic
const arabicTemplates = {
  personal: {
    hero: {
      title: 'مرحباً، أنا {name}',
      subtitle: 'مطور ومصمم شغوف بإنشاء تجارب رقمية مميزة',
      cta: 'تواصل معي',
    },
    about: {
      title: 'من أنا',
      content: 'أنا مطور ويب متخصص في إنشاء مواقع وتطبيقات عصرية. أؤمن بأهمية التصميم الجيد والتجربة السلسة للمستخدم.',
    },
    services: [
      { title: 'تطوير الويب', description: 'إنشاء مواقع سريعة ومتجاوبة' },
      { title: 'تصميم UI/UX', description: 'تصاميم عصرية وسهلة الاستخدام' },
      { title: 'تطبيقات الجوال', description: 'تطبيقات لنظامي iOS و Android' },
    ],
    contact: {
      title: 'تواصل معي',
      description: 'أنا متاح للمشاريع الجديدة. لا تتردد في التواصل.',
    },
  },
  store: {
    hero: {
      title: 'تسوق أفضل المنتجات',
      subtitle: 'اكتشف تشكيلة واسعة من المنتجات عالية الجودة بأسعار منافسة',
      cta: 'تسوق الآن',
    },
    about: {
      title: 'عن متجرنا',
      content: 'نحن متجر إلكتروني نقدم منتجات أصلية بأفضل الأسعار مع توصيل سريع لجميع أنحاء المملكة.',
    },
    services: [
      { title: 'توصيل سريع', description: 'توصيل خلال 24-48 ساعة' },
      { title: 'دفع آمن', description: 'طرق دفع متعددة وآمنة' },
      { title: 'ضمان الجودة', description: 'منتجات أصلية 100%' },
    ],
    contact: {
      title: 'خدمة العملاء',
      description: 'فريقنا متاح على مدار الساعة لمساعدتك.',
    },
  },
  company: {
    hero: {
      title: 'نبني المستقبل معاً',
      subtitle: 'شركة رائدة في تقديم الحلول التقنية المبتكرة',
      cta: 'اكتشف خدماتنا',
    },
    about: {
      title: 'من نحن',
      content: 'نحن شركة متخصصة في تقديم حلول تقنية متكاملة للشركات والمؤسسات. نسعى دائماً للتميز والابتكار.',
    },
    services: [
      { title: 'استشارات تقنية', description: 'حلول مخصصة لاحتياجاتك' },
      { title: 'تطوير البرمجيات', description: 'أنظمة وتطبيقات متكاملة' },
      { title: 'الدعم الفني', description: 'دعم على مدار الساعة' },
    ],
    contact: {
      title: 'تواصل معنا',
      description: 'نحن سعداء بسماع اقتراحاتكم واستفساراتكم.',
    },
  },
  blog: {
    hero: {
      title: 'مدونة التقنية والإبداع',
      subtitle: 'اكتشف أحدث المقالات والأخبار في عالم التقنية',
      cta: 'اقرأ المزيد',
    },
    about: {
      title: 'عن المدونة',
      content: 'مدونة متخصصة في نشر المحتوى التقني والإبداعي. نهدف لإثراء المحتوى العربي على الإنترنت.',
    },
    services: [
      { title: 'مقالات تقنية', description: 'آخر الأخبار والتحديثات' },
      { title: 'دروس تعليمية', description: 'تعلم البرمجة والتصميم' },
      { title: 'مراجعات', description: 'مراجعات للأدوات والخدمات' },
    ],
    contact: {
      title: 'اشترك معنا',
      description: 'اشترك في النشرة البريدية ليصلك كل جديد.',
    },
  },
};

export function generateContent(options: TextGeneratorOptions): GeneratedContent {
  // In demo mode, return template content
  const template = arabicTemplates[options.type];
  return template;
}

export function generateHeadline(type: string, language: string = 'ar'): string {
  const headlines = {
    ar: {
      personal: 'بناء حضورك الرقمي',
      store: 'تسوق بثقة وأمان',
      company: 'حلول تقنية متكاملة',
      blog: 'محتوى يثري عقلك',
    },
    en: {
      personal: 'Building Your Digital Presence',
      store: 'Shop with Confidence',
      company: 'Integrated Tech Solutions',
      blog: 'Content That Enriches Your Mind',
    },
  };
  
  return headlines[language as keyof typeof headlines]?.[type as keyof typeof headlines.ar] || '';
}

export function generateMetaDescription(content: string, maxLength: number = 160): string {
  if (content.length <= maxLength) return content;
  return content.substring(0, maxLength - 3) + '...';
}
