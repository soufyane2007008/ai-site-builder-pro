// AI SEO Generator Module
// This module handles SEO optimization for generated websites

export interface SEOConfig {
  title: string;
  description: string;
  keywords: string[];
  ogImage?: string;
  canonical?: string;
  language: string;
  robots: string;
}

export interface GeneratedSEO {
  meta: SEOConfig;
  structuredData: Record<string, any>;
  sitemap: string[];
}

const seoTemplates = {
  personal: {
    titleTemplate: '{name} - {profession} | الموقع الرسمي',
    descriptionTemplate: 'مرحباً بك في موقع {name}، {profession} متخصص في {specialty}. تعرف على خدماتي وأعمالي.',
    keywords: ['مطور', 'مصمم', 'بورتفوليو', 'أعمال', 'خدمات'],
  },
  store: {
    titleTemplate: '{storeName} - تسوق أفضل المنتجات أونلاين',
    descriptionTemplate: 'اكتشف تشكيلة واسعة من {category} في {storeName}. توصيل سريع وأسعار منافسة.',
    keywords: ['متجر', 'تسوق', 'أونلاين', 'منتجات', 'توصيل'],
  },
  company: {
    titleTemplate: '{companyName} - {tagline}',
    descriptionTemplate: '{companyName} شركة رائدة في {industry}. نقدم {services} بأعلى معايير الجودة.',
    keywords: ['شركة', 'خدمات', 'حلول', 'أعمال', 'تقنية'],
  },
  blog: {
    titleTemplate: '{blogName} - مدونة {topic}',
    descriptionTemplate: 'اقرأ أحدث المقالات عن {topic} في مدونة {blogName}. محتوى حصري ومفيد.',
    keywords: ['مدونة', 'مقالات', 'أخبار', 'تعليم', 'محتوى'],
  },
};

export function generateSEO(
  type: 'personal' | 'store' | 'company' | 'blog',
  data: Record<string, string>
): GeneratedSEO {
  const template = seoTemplates[type];
  
  // Generate title
  let title = template.titleTemplate;
  Object.entries(data).forEach(([key, value]) => {
    title = title.replace(`{${key}}`, value);
  });
  
  // Generate description
  let description = template.descriptionTemplate;
  Object.entries(data).forEach(([key, value]) => {
    description = description.replace(`{${key}}`, value);
  });
  
  // Generate structured data
  const structuredData = generateStructuredData(type, data);
  
  return {
    meta: {
      title: title.length > 60 ? title.substring(0, 57) + '...' : title,
      description: description.length > 160 ? description.substring(0, 157) + '...' : description,
      keywords: [...template.keywords, ...Object.values(data).filter(v => v.length < 20)],
      language: 'ar',
      robots: 'index, follow',
    },
    structuredData,
    sitemap: generateSitemap(type),
  };
}

function generateStructuredData(type: string, data: Record<string, string>): Record<string, any> {
  const baseSchema = {
    '@context': 'https://schema.org',
  };
  
  switch (type) {
    case 'personal':
      return {
        ...baseSchema,
        '@type': 'Person',
        name: data.name || '',
        jobTitle: data.profession || '',
        url: data.url || '',
      };
    case 'store':
      return {
        ...baseSchema,
        '@type': 'Store',
        name: data.storeName || '',
        description: data.description || '',
      };
    case 'company':
      return {
        ...baseSchema,
        '@type': 'Organization',
        name: data.companyName || '',
        description: data.description || '',
      };
    case 'blog':
      return {
        ...baseSchema,
        '@type': 'Blog',
        name: data.blogName || '',
        description: data.description || '',
      };
    default:
      return baseSchema;
  }
}

function generateSitemap(type: string): string[] {
  const commonPages = ['/', '/about', '/contact'];
  
  const typeSpecificPages: Record<string, string[]> = {
    personal: ['/portfolio', '/skills', '/resume'],
    store: ['/products', '/cart', '/checkout', '/categories'],
    company: ['/services', '/team', '/clients', '/careers'],
    blog: ['/articles', '/categories', '/archives', '/subscribe'],
  };
  
  return [...commonPages, ...(typeSpecificPages[type] || [])];
}

export function generateRobotsTxt(): string {
  return `User-agent: *
Allow: /

Sitemap: /sitemap.xml`;
}

export function optimizeForSearch(content: string): string {
  // Basic optimization - in real implementation, this would be more sophisticated
  return content
    .replace(/\s+/g, ' ')
    .trim();
}
