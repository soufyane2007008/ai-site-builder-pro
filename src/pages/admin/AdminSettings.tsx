import { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useTheme } from '@/contexts/ThemeContext';
import { toast } from 'sonner';
import { Palette, Server, Shield, Save, RotateCcw, Key, Database } from 'lucide-react';
import { cn } from '@/lib/utils';

const colorPresets = [
  { name: 'سماوي', primary: '199 89% 48%', secondary: '270 70% 60%' },
  { name: 'وردي', primary: '330 80% 60%', secondary: '20 90% 55%' },
  { name: 'أخضر', primary: '150 80% 40%', secondary: '180 70% 50%' },
  { name: 'ذهبي', primary: '40 95% 55%', secondary: '0 85% 60%' },
  { name: 'بنفسجي', primary: '270 70% 60%', secondary: '330 80% 60%' },
];

export default function AdminSettings() {
  const { colors, setColors, resetColors } = useTheme();
  
  const [settings, setSettings] = useState({
    allowRegistration: true,
    allowGuestAccess: true,
    maxProjectsPerUser: 10,
    aiEnabled: true,
  });

  const [apiKeys, setApiKeys] = useState({
    openai: '',
    firebase: '',
  });

  const handleColorChange = (preset: typeof colorPresets[0]) => {
    setColors({
      primary: preset.primary,
      secondary: preset.secondary,
      accent: preset.primary,
    });
    toast.success('تم تغيير ألوان المنصة');
  };

  const handleSaveSettings = () => {
    toast.success('تم حفظ الإعدادات');
  };

  const handleSaveApiKeys = () => {
    toast.success('تم حفظ مفاتيح API');
  };

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      
      <main className="lg:mr-72 min-h-screen">
        <div className="p-6 lg:p-8 max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">إعدادات النظام</h1>
            <p className="text-muted-foreground">
              تحكم في إعدادات المنصة العامة
            </p>
          </div>

          <div className="space-y-6">
            {/* Theme Section */}
            <div className="glass rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Palette size={24} className="text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold">ألوان المنصة</h2>
                  <p className="text-sm text-muted-foreground">تغيير الألوان لجميع المستخدمين</p>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-4">
                {colorPresets.map((preset) => (
                  <button
                    key={preset.name}
                    onClick={() => handleColorChange(preset)}
                    className={cn(
                      "p-4 rounded-xl transition-all hover:scale-105",
                      colors.primary === preset.primary && "ring-2 ring-foreground"
                    )}
                    style={{
                      background: `linear-gradient(135deg, hsl(${preset.primary}), hsl(${preset.secondary}))`,
                    }}
                  >
                    <span className="text-white text-sm font-medium">{preset.name}</span>
                  </button>
                ))}
              </div>

              <Button
                variant="outline"
                className="gap-2"
                onClick={() => {
                  resetColors();
                  toast.success('تم استعادة الألوان الافتراضية');
                }}
              >
                <RotateCcw size={18} />
                استعادة الافتراضي
              </Button>
            </div>

            {/* General Settings */}
            <div className="glass rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center">
                  <Server size={24} className="text-secondary" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold">الإعدادات العامة</h2>
                  <p className="text-sm text-muted-foreground">تحكم في سلوك المنصة</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-muted/50 rounded-xl">
                  <div>
                    <p className="font-medium">السماح بالتسجيل</p>
                    <p className="text-sm text-muted-foreground">السماح للمستخدمين الجدد بإنشاء حسابات</p>
                  </div>
                  <Switch
                    checked={settings.allowRegistration}
                    onCheckedChange={(checked) =>
                      setSettings({ ...settings, allowRegistration: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-muted/50 rounded-xl">
                  <div>
                    <p className="font-medium">دخول الزوار</p>
                    <p className="text-sm text-muted-foreground">السماح بالدخول كزائر</p>
                  </div>
                  <Switch
                    checked={settings.allowGuestAccess}
                    onCheckedChange={(checked) =>
                      setSettings({ ...settings, allowGuestAccess: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-muted/50 rounded-xl">
                  <div>
                    <p className="font-medium">الذكاء الاصطناعي</p>
                    <p className="text-sm text-muted-foreground">تفعيل ميزات AI</p>
                  </div>
                  <Switch
                    checked={settings.aiEnabled}
                    onCheckedChange={(checked) =>
                      setSettings({ ...settings, aiEnabled: checked })
                    }
                  />
                </div>

                <div className="p-4 bg-muted/50 rounded-xl">
                  <Label htmlFor="maxProjects" className="mb-2 block">
                    الحد الأقصى للمشاريع لكل مستخدم
                  </Label>
                  <Input
                    id="maxProjects"
                    type="number"
                    value={settings.maxProjectsPerUser}
                    onChange={(e) =>
                      setSettings({ ...settings, maxProjectsPerUser: parseInt(e.target.value) })
                    }
                    className="w-32"
                  />
                </div>
              </div>

              <Button
                variant="gradient"
                className="mt-4 gap-2"
                onClick={handleSaveSettings}
              >
                <Save size={18} />
                حفظ الإعدادات
              </Button>
            </div>

            {/* API Keys */}
            <div className="glass rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-warning/10 flex items-center justify-center">
                  <Key size={24} className="text-warning" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold">مفاتيح API</h2>
                  <p className="text-sm text-muted-foreground">إعداد الخدمات الخارجية</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="openai">OpenAI API Key</Label>
                  <Input
                    id="openai"
                    type="password"
                    placeholder="sk-..."
                    value={apiKeys.openai}
                    onChange={(e) => setApiKeys({ ...apiKeys, openai: e.target.value })}
                    dir="ltr"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="firebase">Firebase Config</Label>
                  <Input
                    id="firebase"
                    type="password"
                    placeholder="AIzaSy..."
                    value={apiKeys.firebase}
                    onChange={(e) => setApiKeys({ ...apiKeys, firebase: e.target.value })}
                    dir="ltr"
                  />
                </div>
              </div>

              <Button
                variant="gradient"
                className="mt-4 gap-2"
                onClick={handleSaveApiKeys}
              >
                <Save size={18} />
                حفظ المفاتيح
              </Button>
            </div>

            {/* Database Info */}
            <div className="glass rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center">
                  <Database size={24} className="text-success" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold">قاعدة البيانات</h2>
                  <p className="text-sm text-muted-foreground">حالة الاتصال</p>
                </div>
              </div>

              <div className="p-4 bg-success/10 rounded-xl flex items-center gap-3">
                <div className="w-3 h-3 bg-success rounded-full animate-pulse" />
                <span className="text-success font-medium">متصل (Demo Mode)</span>
              </div>

              <p className="mt-4 text-sm text-muted-foreground">
                المنصة تعمل حالياً في الوضع التجريبي. البيانات محفوظة محلياً.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
