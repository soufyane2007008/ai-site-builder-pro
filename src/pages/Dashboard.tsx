import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Sidebar } from '@/components/Sidebar';
import { StatsCard } from '@/components/StatsCard';
import { ProjectCard } from '@/components/ProjectCard';
import { Button } from '@/components/ui/button';
import { Project, DashboardStats } from '@/types';
import { Plus, Folders, CheckCircle, AlertCircle, Clock } from 'lucide-react';
import { toast } from 'sonner';

// Demo data
const demoProjects: Project[] = [
  {
    id: '1',
    userId: 'user-1',
    name: 'موقع شركة التقنية',
    type: 'company',
    status: 'completed',
    language: 'ar',
    colors: { primary: '#0ea5e9', secondary: '#8b5cf6', background: '#0f172a' },
    content: 'موقع شركة متخصصة في حلول التقنية والبرمجيات',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
  },
  {
    id: '2',
    userId: 'user-1',
    name: 'متجر الأزياء',
    type: 'store',
    status: 'creating',
    language: 'ar',
    colors: { primary: '#ec4899', secondary: '#f97316', background: '#0f172a' },
    content: 'متجر إلكتروني لبيع الملابس والأزياء العصرية',
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-01-20'),
  },
  {
    id: '3',
    userId: 'user-1',
    name: 'مدونة السفر',
    type: 'blog',
    status: 'completed',
    language: 'ar',
    colors: { primary: '#10b981', secondary: '#06b6d4', background: '#0f172a' },
    content: 'مدونة شخصية لمشاركة تجارب السفر والمغامرات',
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-10'),
  },
];

export default function Dashboard() {
  const { user } = useAuth();
  const [projects, setProjects] = useState<Project[]>(demoProjects);
  const [stats, setStats] = useState<DashboardStats>({
    totalProjects: 3,
    activeProjects: 1,
    completedProjects: 2,
    failedProjects: 0,
  });

  const handleDownload = (projectId: string) => {
    toast.success('جاري تحميل المشروع...');
  };

  const handleDelete = (projectId: string) => {
    setProjects(projects.filter(p => p.id !== projectId));
    toast.success('تم حذف المشروع');
  };

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      
      <main className="lg:mr-72 min-h-screen">
        <div className="p-6 lg:p-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                مرحباً، {user?.name} 👋
              </h1>
              <p className="text-muted-foreground">
                إليك نظرة عامة على مشاريعك
              </p>
            </div>
            <Link to="/new-project">
              <Button variant="gradient" size="lg" className="gap-2">
                <Plus size={20} />
                مشروع جديد
              </Button>
            </Link>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <StatsCard
              title="إجمالي المشاريع"
              value={stats.totalProjects}
              icon={Folders}
            />
            <StatsCard
              title="قيد الإنشاء"
              value={stats.activeProjects}
              icon={Clock}
            />
            <StatsCard
              title="مكتملة"
              value={stats.completedProjects}
              icon={CheckCircle}
            />
            <StatsCard
              title="فاشلة"
              value={stats.failedProjects}
              icon={AlertCircle}
            />
          </div>

          {/* Recent Projects */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">المشاريع الأخيرة</h2>
              <Link to="/projects" className="text-primary hover:underline text-sm">
                عرض الكل
              </Link>
            </div>

            {projects.length === 0 ? (
              <div className="glass rounded-2xl p-12 text-center">
                <Folders size={48} className="mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">لا توجد مشاريع بعد</h3>
                <p className="text-muted-foreground mb-4">
                  ابدأ بإنشاء مشروعك الأول
                </p>
                <Link to="/new-project">
                  <Button variant="gradient">
                    <Plus size={18} className="ml-2" />
                    مشروع جديد
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {projects.map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    onDownload={() => handleDownload(project.id)}
                    onDelete={() => handleDelete(project.id)}
                    onView={() => toast.info('سيتم فتح المعاينة')}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Quick Tips */}
          <div className="mt-8 glass rounded-2xl p-6">
            <h3 className="font-semibold mb-4">💡 نصائح سريعة</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="p-4 bg-muted/50 rounded-xl">
                <h4 className="font-medium mb-2">اختر نوع الموقع بعناية</h4>
                <p className="text-sm text-muted-foreground">
                  نوع الموقع يؤثر على الهيكل والتصميم المقترح
                </p>
              </div>
              <div className="p-4 bg-muted/50 rounded-xl">
                <h4 className="font-medium mb-2">أضف محتوى واضح</h4>
                <p className="text-sm text-muted-foreground">
                  كلما كان المحتوى أوضح، كان الموقع أفضل
                </p>
              </div>
              <div className="p-4 bg-muted/50 rounded-xl">
                <h4 className="font-medium mb-2">اختر ألوان متناسقة</h4>
                <p className="text-sm text-muted-foreground">
                  الألوان تعكس هوية علامتك التجارية
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
