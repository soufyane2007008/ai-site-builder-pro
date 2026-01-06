import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sidebar } from '@/components/Sidebar';
import { ProjectCard } from '@/components/ProjectCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Project } from '@/types';
import { Plus, Search, Filter } from 'lucide-react';
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
  {
    id: '4',
    userId: 'user-1',
    name: 'موقعي الشخصي',
    type: 'personal',
    status: 'completed',
    language: 'ar',
    colors: { primary: '#8b5cf6', secondary: '#ec4899', background: '#0f172a' },
    content: 'سيرة ذاتية ومعرض أعمال',
    createdAt: new Date('2024-01-05'),
    updatedAt: new Date('2024-01-05'),
  },
];

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>(demoProjects);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');

  const filteredProjects = projects.filter((project) => {
    const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || project.status === statusFilter;
    const matchesType = typeFilter === 'all' || project.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
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
              <h1 className="text-3xl font-bold mb-2">مشاريعي</h1>
              <p className="text-muted-foreground">
                {projects.length} مشروع
              </p>
            </div>
            <Link to="/new-project">
              <Button variant="gradient" size="lg" className="gap-2">
                <Plus size={20} />
                مشروع جديد
              </Button>
            </Link>
          </div>

          {/* Filters */}
          <div className="glass rounded-2xl p-4 mb-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                <Input
                  placeholder="ابحث عن مشروع..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pr-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="الحالة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع الحالات</SelectItem>
                  <SelectItem value="completed">مكتمل</SelectItem>
                  <SelectItem value="creating">قيد الإنشاء</SelectItem>
                  <SelectItem value="failed">فاشل</SelectItem>
                </SelectContent>
              </Select>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="النوع" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع الأنواع</SelectItem>
                  <SelectItem value="personal">شخصي</SelectItem>
                  <SelectItem value="store">متجر</SelectItem>
                  <SelectItem value="company">شركة</SelectItem>
                  <SelectItem value="blog">مدونة</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Projects Grid */}
          {filteredProjects.length === 0 ? (
            <div className="glass rounded-2xl p-12 text-center">
              <Filter size={48} className="mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">لا توجد نتائج</h3>
              <p className="text-muted-foreground">
                جرب تغيير معايير البحث
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredProjects.map((project) => (
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
      </main>
    </div>
  );
}
