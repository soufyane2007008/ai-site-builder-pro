import { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { toast } from 'sonner';
import { User, Bell, Palette, Shield, Save, RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils';

const colorPresets = [
  { name: 'سماوي', primary: '199 89% 48%', secondary: '270 70% 60%' },
  { name: 'وردي', primary: '330 80% 60%', secondary: '20 90% 55%' },
  { name: 'أخضر', primary: '150 80% 40%', secondary: '180 70% 50%' },
  { name: 'ذهبي', primary: '40 95% 55%', secondary: '0 85% 60%' },
  { name: 'بنفسجي', primary: '270 70% 60%', secondary: '330 80% 60%' },
];

export default function Settings() {
  const { user } = useAuth();
  const { colors, setColors, resetColors } = useTheme();
  
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [notifications, setNotifications] = useState({
    email: true,
    projects: true,
    updates: false,
  });

  const handleSaveProfile = () => {
    toast.success('تم حفظ التغييرات');
  };

  const handleColorChange = (preset: typeof colorPresets[0]) => {
    setColors({
      primary: preset.primary,
      secondary: preset.secondary,
      accent: preset.primary,
    });
    toast.success('تم تغيير الألوان');
  };

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      
      <main className="lg:mr-72 min-h-screen">
        <div className="p-6 lg:p-8 max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">الإعدادات</h1>
            <p className="text-muted-foreground">
              إدارة حسابك وتفضيلاتك
            </p>
          </div>

          <div className="space-y-6">
            {/* Profile Section */}
            <div className="glass rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <User size={24} className="text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold">الملف الشخصي</h2>
                  <p className="text-sm text-muted-foreground">معلوماتك الأساسية</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">الاسم</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">البريد الإلكتروني</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    dir="ltr"
                  />
                </div>
              </div>

              <Button
                variant="gradient"
                className="mt-4 gap-2"
                onClick={handleSaveProfile}
              >
                <Save size={18} />
                حفظ التغييرات
              </Button>
            </div>

            {/* Theme Section */}
            <div className="glass rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center">
                  <Palette size={24} className="text-secondary" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold">المظهر</h2>
                  <p className="text-sm text-muted-foreground">تخصيص ألوان الواجهة</p>
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

            {/* Notifications Section */}
            <div className="glass rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-warning/10 flex items-center justify-center">
                  <Bell size={24} className="text-warning" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold">الإشعارات</h2>
                  <p className="text-sm text-muted-foreground">تحكم في الإشعارات</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-muted/50 rounded-xl">
                  <div>
                    <p className="font-medium">إشعارات البريد</p>
                    <p className="text-sm text-muted-foreground">تلقي التحديثات عبر البريد</p>
                  </div>
                  <Switch
                    checked={notifications.email}
                    onCheckedChange={(checked) =>
                      setNotifications({ ...notifications, email: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-muted/50 rounded-xl">
                  <div>
                    <p className="font-medium">إشعارات المشاريع</p>
                    <p className="text-sm text-muted-foreground">عند اكتمال أو فشل مشروع</p>
                  </div>
                  <Switch
                    checked={notifications.projects}
                    onCheckedChange={(checked) =>
                      setNotifications({ ...notifications, projects: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-muted/50 rounded-xl">
                  <div>
                    <p className="font-medium">تحديثات المنصة</p>
                    <p className="text-sm text-muted-foreground">أخبار وميزات جديدة</p>
                  </div>
                  <Switch
                    checked={notifications.updates}
                    onCheckedChange={(checked) =>
                      setNotifications({ ...notifications, updates: checked })
                    }
                  />
                </div>
              </div>
            </div>

            {/* Security Section */}
            <div className="glass rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-destructive/10 flex items-center justify-center">
                  <Shield size={24} className="text-destructive" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold">الأمان</h2>
                  <p className="text-sm text-muted-foreground">حماية حسابك</p>
                </div>
              </div>

              <div className="space-y-4">
                <Button variant="outline" className="w-full justify-start">
                  تغيير كلمة المرور
                </Button>
                <Button variant="outline" className="w-full justify-start text-destructive">
                  حذف الحساب
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
