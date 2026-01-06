import { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { Star, Send, Lightbulb, MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Feedback() {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [feedbackComment, setFeedbackComment] = useState('');
  const [suggestionTitle, setSuggestionTitle] = useState('');
  const [suggestionDescription, setSuggestionDescription] = useState('');

  const handleSubmitFeedback = () => {
    if (rating === 0) {
      toast.error('الرجاء اختيار تقييم');
      return;
    }
    toast.success('شكراً لتقييمك!');
    setRating(0);
    setFeedbackComment('');
  };

  const handleSubmitSuggestion = () => {
    if (!suggestionTitle) {
      toast.error('الرجاء إدخال عنوان الاقتراح');
      return;
    }
    toast.success('تم إرسال اقتراحك بنجاح!');
    setSuggestionTitle('');
    setSuggestionDescription('');
  };

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      
      <main className="lg:mr-72 min-h-screen">
        <div className="p-6 lg:p-8 max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">التقييم والاقتراحات</h1>
            <p className="text-muted-foreground">
              شاركنا رأيك لنحسن المنصة
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Rating Card */}
            <div className="glass rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <MessageSquare size={24} className="text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold">قيّم تجربتك</h2>
                  <p className="text-sm text-muted-foreground">كيف كانت تجربتك مع NTFly AI؟</p>
                </div>
              </div>

              <div className="flex justify-center gap-2 mb-6">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoveredRating(star)}
                    onMouseLeave={() => setHoveredRating(0)}
                    className="transition-transform hover:scale-110"
                  >
                    <Star
                      size={40}
                      className={cn(
                        "transition-colors",
                        (hoveredRating || rating) >= star
                          ? "fill-warning text-warning"
                          : "text-muted-foreground"
                      )}
                    />
                  </button>
                ))}
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="feedback">تعليقك (اختياري)</Label>
                  <Textarea
                    id="feedback"
                    placeholder="شاركنا المزيد من التفاصيل..."
                    value={feedbackComment}
                    onChange={(e) => setFeedbackComment(e.target.value)}
                    className="min-h-[100px]"
                  />
                </div>

                <Button
                  variant="gradient"
                  className="w-full gap-2"
                  onClick={handleSubmitFeedback}
                >
                  <Send size={18} />
                  إرسال التقييم
                </Button>
              </div>
            </div>

            {/* Suggestion Card */}
            <div className="glass rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center">
                  <Lightbulb size={24} className="text-secondary" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold">اقترح ميزة</h2>
                  <p className="text-sm text-muted-foreground">ماذا تريد في التحديث القادم؟</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="suggestion-title">عنوان الاقتراح</Label>
                  <Input
                    id="suggestion-title"
                    placeholder="مثال: إضافة قوالب جاهزة"
                    value={suggestionTitle}
                    onChange={(e) => setSuggestionTitle(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="suggestion-desc">وصف الاقتراح</Label>
                  <Textarea
                    id="suggestion-desc"
                    placeholder="اشرح فكرتك بالتفصيل..."
                    value={suggestionDescription}
                    onChange={(e) => setSuggestionDescription(e.target.value)}
                    className="min-h-[100px]"
                  />
                </div>

                <Button
                  variant="gradient"
                  className="w-full gap-2"
                  onClick={handleSubmitSuggestion}
                >
                  <Lightbulb size={18} />
                  إرسال الاقتراح
                </Button>
              </div>
            </div>
          </div>

          {/* Info */}
          <div className="mt-6 glass rounded-2xl p-6">
            <h3 className="font-semibold mb-4">🎯 كيف نستخدم ملاحظاتك؟</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 bg-muted/50 rounded-xl">
                <h4 className="font-medium mb-2">نحلل التقييمات</h4>
                <p className="text-sm text-muted-foreground">
                  نراجع كل تقييم لفهم احتياجاتك
                </p>
              </div>
              <div className="p-4 bg-muted/50 rounded-xl">
                <h4 className="font-medium mb-2">نطور الميزات</h4>
                <p className="text-sm text-muted-foreground">
                  اقتراحاتك تشكل خارطة التطوير
                </p>
              </div>
              <div className="p-4 bg-muted/50 rounded-xl">
                <h4 className="font-medium mb-2">نشاركك التحديثات</h4>
                <p className="text-sm text-muted-foreground">
                  ستعلم عند تنفيذ اقتراحك
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
