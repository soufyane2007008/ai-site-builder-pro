import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sidebar } from '@/components/Sidebar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';
import { Sparkles, Wand2, Palette, Globe, FileText, ArrowLeft, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

const projectTypes = [
  { id: 'personal', label: 'موقع شخصي', icon: '👤', description: 'سيرة ذاتية أو بورتفوليو' },
  { id: 'store', label: 'متجر إلكتروني', icon: '🛒', description: 'بيع منتجات أو خدمات' },
  { id: 'company', label: 'موقع شركة', icon: '🏢', description: 'تعريف بالشركة وخدماتها' },
  { id: 'blog', label: 'مدونة', icon: '✍️', description: 'مقالات ومحتوى' },
];

const colorPresets = [
  { name: 'سماوي', primary: '#0ea5e9', secondary: '#8b5cf6' },
  { name: 'وردي', primary: '#ec4899', secondary: '#f97316' },
  { name: 'أخضر', primary: '#10b981', secondary: '#06b6d4' },
  { name: 'ذهبي', primary: '#f59e0b', secondary: '#ef4444' },
  { name: 'بنفسجي', primary: '#8b5cf6', secondary: '#ec4899' },
];

export default function NewProject() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    language: 'ar',
    primaryColor: '#0ea5e9',
    secondaryColor: '#8b5cf6',
    content: '',
  });

  const handleNext = () => {
    if (step === 1 && !formData.type) {
      toast.error('الرجاء اختيار نوع الموقع');
      return;
    }
    if (step === 2 && !formData.name) {
      toast.error('الرجاء إدخال اسم المشروع');
      return;
    }
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleGenerate = async () => {
    if (!formData.content) {
      toast.error('الرجاء إدخال وصف المحتوى');
      return;
    }

    setIsGenerating(true);
    
    // Simulate AI generation
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    toast.success('تم إنشاء المشروع بنجاح!');
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      
      <main className="lg:mr-72 min-h-screen">
        <div className="p-6 lg:p-8 max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <Sparkles size={24} className="text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">إنشاء مشروع جديد</h1>
                <p className="text-muted-foreground">دع الذكاء الاصطناعي يبني موقعك</p>
              </div>
            </div>

            {/* Progress Steps */}
            <div className="flex items-center gap-2 mt-6">
              {[1, 2, 3, 4].map((s) => (
                <div key={s} className="flex items-center">
                  <div
                    className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all",
                      step >= s
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    )}
                  >
                    {step > s ? <Check size={16} /> : s}
                  </div>
                  {s < 4 && (
                    <div
                      className={cn(
                        "w-12 h-1 mx-2 rounded-full transition-all",
                        step > s ? "bg-primary" : "bg-muted"
                      )}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Step 1: Choose Type */}
          {step === 1 && (
            <div className="animate-fade-in">
              <h2 className="text-xl font-semibold mb-6">اختر نوع الموقع</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {projectTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setFormData({ ...formData, type: type.id })}
                    className={cn(
                      "glass p-6 rounded-2xl text-right transition-all hover:scale-[1.02]",
                      formData.type === type.id && "ring-2 ring-primary"
                    )}
                  >
                    <span className="text-4xl mb-4 block">{type.icon}</span>
                    <h3 className="font-semibold text-lg mb-1">{type.label}</h3>
                    <p className="text-sm text-muted-foreground">{type.description}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Basic Info */}
          {step === 2 && (
            <div className="animate-fade-in space-y-6">
              <h2 className="text-xl font-semibold mb-6">المعلومات الأساسية</h2>
              
              <div className="space-y-2">
                <Label htmlFor="name">اسم المشروع</Label>
                <Input
                  id="name"
                  placeholder="مثال: موقع شركتي"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="language">لغة الموقع</Label>
                <Select
                  value={formData.language}
                  onValueChange={(value) => setFormData({ ...formData, language: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ar">العربية</SelectItem>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="fr">Français</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {/* Step 3: Colors */}
          {step === 3 && (
            <div className="animate-fade-in space-y-6">
              <h2 className="text-xl font-semibold mb-6">اختر الألوان</h2>
              
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-6">
                {colorPresets.map((preset) => (
                  <button
                    key={preset.name}
                    onClick={() => setFormData({
                      ...formData,
                      primaryColor: preset.primary,
                      secondaryColor: preset.secondary,
                    })}
                    className={cn(
                      "p-4 rounded-xl transition-all hover:scale-105",
                      formData.primaryColor === preset.primary && "ring-2 ring-foreground"
                    )}
                    style={{
                      background: `linear-gradient(135deg, ${preset.primary}, ${preset.secondary})`,
                    }}
                  >
                    <span className="text-white text-sm font-medium">{preset.name}</span>
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>اللون الأساسي</Label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={formData.primaryColor}
                      onChange={(e) => setFormData({ ...formData, primaryColor: e.target.value })}
                      className="w-12 h-12 rounded-lg cursor-pointer"
                    />
                    <Input
                      value={formData.primaryColor}
                      onChange={(e) => setFormData({ ...formData, primaryColor: e.target.value })}
                      dir="ltr"
                      className="flex-1"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>اللون الثانوي</Label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={formData.secondaryColor}
                      onChange={(e) => setFormData({ ...formData, secondaryColor: e.target.value })}
                      className="w-12 h-12 rounded-lg cursor-pointer"
                    />
                    <Input
                      value={formData.secondaryColor}
                      onChange={(e) => setFormData({ ...formData, secondaryColor: e.target.value })}
                      dir="ltr"
                      className="flex-1"
                    />
                  </div>
                </div>
              </div>

              {/* Preview */}
              <div
                className="h-32 rounded-2xl mt-6"
                style={{
                  background: `linear-gradient(135deg, ${formData.primaryColor}, ${formData.secondaryColor})`,
                }}
              />
            </div>
          )}

          {/* Step 4: Content */}
          {step === 4 && (
            <div className="animate-fade-in space-y-6">
              <h2 className="text-xl font-semibold mb-6">محتوى الموقع</h2>
              
              <div className="space-y-2">
                <Label htmlFor="content">صف ما تريد في موقعك</Label>
                <Textarea
                  id="content"
                  placeholder="مثال: أريد موقع لشركة برمجيات، يحتوي على صفحة رئيسية، صفحة خدمات، صفحة من نحن، وصفحة تواصل..."
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="min-h-[200px]"
                />
              </div>

              <div className="glass rounded-xl p-4">
                <h3 className="font-medium mb-2 flex items-center gap-2">
                  <Wand2 size={18} className="text-primary" />
                  الذكاء الاصطناعي سيقوم بـ:
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <Check size={14} className="text-success" />
                    توليد هيكل الموقع
                  </li>
                  <li className="flex items-center gap-2">
                    <Check size={14} className="text-success" />
                    كتابة النصوص والمحتوى
                  </li>
                  <li className="flex items-center gap-2">
                    <Check size={14} className="text-success" />
                    إعداد SEO مبدئي
                  </li>
                  <li className="flex items-center gap-2">
                    <Check size={14} className="text-success" />
                    تطبيق التصميم والألوان
                  </li>
                </ul>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
            {step > 1 ? (
              <Button variant="ghost" onClick={handleBack}>
                <ArrowLeft size={18} className="ml-2 rotate-180" />
                السابق
              </Button>
            ) : (
              <div />
            )}

            {step < 4 ? (
              <Button variant="gradient" onClick={handleNext}>
                التالي
                <ArrowLeft size={18} className="mr-2" />
              </Button>
            ) : (
              <Button
                variant="gradient"
                size="lg"
                onClick={handleGenerate}
                disabled={isGenerating}
                className="gap-2"
              >
                {isGenerating ? (
                  <>
                    <div className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                    جاري الإنشاء...
                  </>
                ) : (
                  <>
                    <Sparkles size={20} />
                    إنشاء الموقع
                  </>
                )}
              </Button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
