import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Logo } from '@/components/Logo';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Mail, Lock, User, Github, Chrome, UserCircle, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';

type AuthMode = 'login' | 'signup';

export default function Auth() {
  const [mode, setMode] = useState<AuthMode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const { login, signup, loginWithGoogle, loginWithGithub, loginAsGuest, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const from = (location.state as any)?.from?.pathname || '/dashboard';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (mode === 'login') {
        await login(email, password);
        toast.success('تم تسجيل الدخول بنجاح');
      } else {
        await signup(email, password, name);
        toast.success('تم إنشاء الحساب بنجاح');
      }
      navigate(from, { replace: true });
    } catch (error) {
      toast.error('حدث خطأ أثناء المعالجة');
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      toast.success('تم تسجيل الدخول بجوجل');
      navigate(from, { replace: true });
    } catch (error) {
      toast.error('فشل تسجيل الدخول بجوجل');
    }
  };

  const handleGithubLogin = async () => {
    try {
      await loginWithGithub();
      toast.success('تم تسجيل الدخول بجيت هب');
      navigate(from, { replace: true });
    } catch (error) {
      toast.error('فشل تسجيل الدخول بجيت هب');
    }
  };

  const handleGuestLogin = async () => {
    try {
      await loginAsGuest();
      toast.success('تم الدخول كزائر');
      navigate(from, { replace: true });
    } catch (error) {
      toast.error('فشل الدخول كزائر');
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex flex-col justify-center px-8 py-12 lg:px-16">
        <div className="max-w-md mx-auto w-full">
          <div className="mb-8">
            <Logo size="lg" />
            <h1 className="mt-6 text-3xl font-bold text-foreground">
              {mode === 'login' ? 'مرحباً بعودتك' : 'إنشاء حساب جديد'}
            </h1>
            <p className="mt-2 text-muted-foreground">
              {mode === 'login' 
                ? 'سجل دخولك للوصول إلى لوحة التحكم' 
                : 'أنشئ حسابك وابدأ بإنشاء مواقعك'}
            </p>
          </div>

          {/* Social Login Buttons */}
          <div className="space-y-3 mb-6">
            <Button
              variant="outline"
              className="w-full h-12 gap-3"
              onClick={handleGoogleLogin}
              disabled={isLoading}
            >
              <Chrome size={20} />
              المتابعة بحساب جوجل
            </Button>
            <Button
              variant="outline"
              className="w-full h-12 gap-3"
              onClick={handleGithubLogin}
              disabled={isLoading}
            >
              <Github size={20} />
              المتابعة بحساب جيت هب
            </Button>
            <Button
              variant="glass"
              className="w-full h-12 gap-3"
              onClick={handleGuestLogin}
              disabled={isLoading}
            >
              <UserCircle size={20} />
              الدخول كزائر
            </Button>
          </div>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-background text-muted-foreground">أو</span>
            </div>
          </div>

          {/* Email/Password Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'signup' && (
              <div className="space-y-2">
                <Label htmlFor="name">الاسم</Label>
                <div className="relative">
                  <User className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                  <Input
                    id="name"
                    type="text"
                    placeholder="أدخل اسمك"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="pr-10"
                    required
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">البريد الإلكتروني</Label>
              <div className="relative">
                <Mail className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                <Input
                  id="email"
                  type="email"
                  placeholder="example@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pr-10"
                  required
                  dir="ltr"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">كلمة المرور</Label>
              <div className="relative">
                <Lock className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pr-10"
                  required
                  dir="ltr"
                />
              </div>
            </div>

            <Button
              type="submit"
              variant="gradient"
              size="lg"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
              ) : mode === 'login' ? (
                'تسجيل الدخول'
              ) : (
                'إنشاء الحساب'
              )}
            </Button>
          </form>

          <p className="mt-6 text-center text-muted-foreground">
            {mode === 'login' ? 'ليس لديك حساب؟' : 'لديك حساب بالفعل؟'}{' '}
            <button
              onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
              className="text-primary hover:underline font-medium"
            >
              {mode === 'login' ? 'إنشاء حساب' : 'تسجيل الدخول'}
            </button>
          </p>
        </div>
      </div>

      {/* Right Side - Hero */}
      <div className="hidden lg:flex flex-1 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-secondary/20" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        
        <div className="relative z-10 flex flex-col justify-center items-center text-center p-12">
          <div className="glass rounded-3xl p-8 max-w-lg">
            <div className="mb-6">
              <div className="w-20 h-20 mx-auto bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mb-4">
                <Sparkles size={40} className="text-primary-foreground" />
              </div>
            </div>
            <h2 className="text-3xl font-bold mb-4 gradient-text">
              أنشئ موقعك بالذكاء الاصطناعي
            </h2>
            <p className="text-muted-foreground text-lg">
              منصة متكاملة لإنشاء مواقع احترافية بضغطة زر واحدة.
              دع الذكاء الاصطناعي يتولى المهمة.
            </p>
            
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <span className="px-4 py-2 glass rounded-full text-sm">مواقع شخصية</span>
              <span className="px-4 py-2 glass rounded-full text-sm">متاجر إلكترونية</span>
              <span className="px-4 py-2 glass rounded-full text-sm">مواقع شركات</span>
              <span className="px-4 py-2 glass rounded-full text-sm">مدونات</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Sparkles({ size, className }: { size: number; className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
      <path d="M5 3v4" />
      <path d="M19 17v4" />
      <path d="M3 5h4" />
      <path d="M17 19h4" />
    </svg>
  );
}
