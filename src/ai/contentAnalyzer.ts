// AI Content Analyzer Module
// This module analyzes user behavior and content to provide suggestions

export interface UserBehavior {
  timeSpent: number; // in seconds
  pagesVisited: string[];
  actionsPerformed: string[];
  projectsCreated: number;
}

export interface ContentAnalysis {
  readabilityScore: number;
  sentimentScore: number;
  keyPhrases: string[];
  suggestedImprovements: string[];
}

export interface Suggestion {
  id: string;
  type: 'improvement' | 'feature' | 'warning';
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
}

// Analyze user behavior and provide suggestions
export function analyzeUserBehavior(behavior: UserBehavior): Suggestion[] {
  const suggestions: Suggestion[] = [];
  
  // Check time spent
  if (behavior.timeSpent > 300 && behavior.projectsCreated === 0) {
    suggestions.push({
      id: 'create-first-project',
      type: 'feature',
      title: 'أنشئ مشروعك الأول',
      description: 'يبدو أنك تستكشف المنصة. جرب إنشاء مشروعك الأول الآن!',
      priority: 'high',
    });
  }
  
  // Check pages visited
  if (!behavior.pagesVisited.includes('/settings')) {
    suggestions.push({
      id: 'customize-theme',
      type: 'improvement',
      title: 'خصص مظهر لوحة التحكم',
      description: 'يمكنك تغيير ألوان الواجهة من الإعدادات',
      priority: 'low',
    });
  }
  
  return suggestions;
}

// Analyze content for quality
export function analyzeContent(content: string, language: string = 'ar'): ContentAnalysis {
  // Basic analysis - in real implementation, this would use NLP
  const words = content.split(/\s+/).filter(w => w.length > 0);
  const sentences = content.split(/[.!?؟。]/).filter(s => s.trim().length > 0);
  
  // Calculate readability (simplified)
  const avgWordsPerSentence = words.length / Math.max(sentences.length, 1);
  const readabilityScore = Math.max(0, Math.min(100, 100 - (avgWordsPerSentence - 15) * 5));
  
  // Extract key phrases (simplified)
  const keyPhrases = extractKeyPhrases(content, language);
  
  // Generate suggestions
  const suggestedImprovements = generateContentSuggestions(content, readabilityScore);
  
  return {
    readabilityScore,
    sentimentScore: 0.7, // Placeholder
    keyPhrases,
    suggestedImprovements,
  };
}

function extractKeyPhrases(content: string, language: string): string[] {
  // Simplified key phrase extraction
  const words = content.split(/\s+/).filter(w => w.length > 3);
  const wordFrequency: Record<string, number> = {};
  
  words.forEach(word => {
    const normalized = word.toLowerCase();
    wordFrequency[normalized] = (wordFrequency[normalized] || 0) + 1;
  });
  
  return Object.entries(wordFrequency)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([word]) => word);
}

function generateContentSuggestions(content: string, readabilityScore: number): string[] {
  const suggestions: string[] = [];
  
  if (readabilityScore < 50) {
    suggestions.push('حاول تقصير الجمل لتحسين القراءة');
  }
  
  if (content.length < 100) {
    suggestions.push('أضف المزيد من التفاصيل لوصف أفضل');
  }
  
  if (!content.includes('!') && !content.includes('؟')) {
    suggestions.push('أضف علامات تعجب أو استفهام لجذب الانتباه');
  }
  
  return suggestions;
}

// Generate improvement suggestions based on project type
export function generateProjectSuggestions(
  projectType: string,
  currentContent: string
): Suggestion[] {
  const suggestions: Suggestion[] = [];
  
  const typeSpecificSuggestions: Record<string, Suggestion[]> = {
    personal: [
      {
        id: 'add-portfolio',
        type: 'feature',
        title: 'أضف معرض أعمال',
        description: 'أظهر أفضل أعمالك للزوار',
        priority: 'high',
      },
      {
        id: 'add-testimonials',
        type: 'improvement',
        title: 'أضف آراء العملاء',
        description: 'الشهادات تزيد من مصداقيتك',
        priority: 'medium',
      },
    ],
    store: [
      {
        id: 'add-reviews',
        type: 'feature',
        title: 'أضف نظام تقييمات',
        description: 'التقييمات تزيد ثقة المشترين',
        priority: 'high',
      },
      {
        id: 'add-offers',
        type: 'improvement',
        title: 'أضف قسم العروض',
        description: 'العروض تجذب المزيد من العملاء',
        priority: 'medium',
      },
    ],
    company: [
      {
        id: 'add-team',
        type: 'feature',
        title: 'أضف صفحة الفريق',
        description: 'عرّف الزوار بفريق العمل',
        priority: 'medium',
      },
      {
        id: 'add-clients',
        type: 'improvement',
        title: 'أضف شعارات العملاء',
        description: 'أظهر الشركات التي تعاملت معها',
        priority: 'high',
      },
    ],
    blog: [
      {
        id: 'add-newsletter',
        type: 'feature',
        title: 'أضف نشرة بريدية',
        description: 'ابق على تواصل مع قرائك',
        priority: 'high',
      },
      {
        id: 'add-categories',
        type: 'improvement',
        title: 'نظم المقالات بتصنيفات',
        description: 'سهّل على الزوار إيجاد ما يبحثون عنه',
        priority: 'medium',
      },
    ],
  };
  
  return typeSpecificSuggestions[projectType] || [];
}
