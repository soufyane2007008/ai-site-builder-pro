import { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Star, ThumbsUp, Trash2, Check } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

const demoFeedback = [
  { id: '1', user: 'أحمد محمد', rating: 5, comment: 'منصة رائعة وسهلة الاستخدام!', date: '2024-01-20' },
  { id: '2', user: 'سارة أحمد', rating: 4, comment: 'جيدة جداً لكن تحتاج بعض التحسينات', date: '2024-01-19' },
  { id: '3', user: 'محمد علي', rating: 5, comment: 'أفضل أداة لإنشاء المواقع', date: '2024-01-18' },
];

const demoSuggestions = [
  { id: '1', user: 'فاطمة حسن', title: 'إضافة قوالب جاهزة', description: 'سيكون رائعاً وجود قوالب يمكن البدء منها', votes: 24, date: '2024-01-20' },
  { id: '2', user: 'أحمد محمد', title: 'دعم اللغة الفرنسية', description: 'إضافة دعم كامل للغة الفرنسية', votes: 18, date: '2024-01-19' },
  { id: '3', user: 'محمد علي', title: 'تطبيق موبايل', description: 'تطبيق للهواتف لإدارة المشاريع', votes: 32, date: '2024-01-18' },
];

export default function AdminFeedback() {
  const [feedback, setFeedback] = useState(demoFeedback);
  const [suggestions, setSuggestions] = useState(demoSuggestions);

  const handleDeleteFeedback = (id: string) => {
    setFeedback(feedback.filter(f => f.id !== id));
    toast.success('تم حذف التقييم');
  };

  const handleImplementSuggestion = (id: string) => {
    toast.success('تم وضع علامة "قيد التنفيذ"');
  };

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      
      <main className="lg:mr-72 min-h-screen">
        <div className="p-6 lg:p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">التقييمات والاقتراحات</h1>
            <p className="text-muted-foreground">
              مراجعة آراء المستخدمين
            </p>
          </div>

          <Tabs defaultValue="feedback" className="space-y-6">
            <TabsList className="glass">
              <TabsTrigger value="feedback">التقييمات ({feedback.length})</TabsTrigger>
              <TabsTrigger value="suggestions">الاقتراحات ({suggestions.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="feedback" className="space-y-4">
              {feedback.map((item) => (
                <div key={item.id} className="glass rounded-2xl p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-primary-foreground font-bold">
                        {item.user.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium">{item.user}</p>
                        <p className="text-sm text-muted-foreground">{item.date}</p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteFeedback(item.id)}
                    >
                      <Trash2 size={18} className="text-destructive" />
                    </Button>
                  </div>
                  
                  <div className="flex gap-1 mt-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={20}
                        className={cn(
                          star <= item.rating
                            ? "fill-warning text-warning"
                            : "text-muted-foreground"
                        )}
                      />
                    ))}
                  </div>
                  
                  <p className="mt-3 text-muted-foreground">{item.comment}</p>
                </div>
              ))}
            </TabsContent>

            <TabsContent value="suggestions" className="space-y-4">
              {suggestions.map((item) => (
                <div key={item.id} className="glass rounded-2xl p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-lg">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {item.user} • {item.date}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-2"
                        onClick={() => handleImplementSuggestion(item.id)}
                      >
                        <Check size={16} />
                        قيد التنفيذ
                      </Button>
                    </div>
                  </div>
                  
                  <p className="mt-3 text-muted-foreground">{item.description}</p>
                  
                  <div className="mt-4 flex items-center gap-2 text-sm">
                    <ThumbsUp size={16} className="text-primary" />
                    <span>{item.votes} تصويت</span>
                  </div>
                </div>
              ))}
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
