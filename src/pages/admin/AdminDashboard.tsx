import { Sidebar } from '@/components/Sidebar';
import { StatsCard } from '@/components/StatsCard';
import { Users, Folders, Star, TrendingUp, MessageSquare, Settings } from 'lucide-react';

const adminStats = {
  totalUsers: 1248,
  totalProjects: 3456,
  totalRequests: 8912,
  averageRating: 4.8,
  pendingFeedback: 23,
  activeSuggestions: 15,
};

const recentActivity = [
  { id: 1, type: 'user', message: 'مستخدم جديد: أحمد محمد', time: 'منذ 5 دقائق' },
  { id: 2, type: 'project', message: 'مشروع مكتمل: موقع شركة النور', time: 'منذ 15 دقيقة' },
  { id: 3, type: 'feedback', message: 'تقييم جديد: ⭐⭐⭐⭐⭐', time: 'منذ 30 دقيقة' },
  { id: 4, type: 'project', message: 'مشروع جديد: متجر الأثاث', time: 'منذ ساعة' },
  { id: 5, type: 'suggestion', message: 'اقتراح جديد: إضافة قوالب', time: 'منذ ساعتين' },
];

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      
      <main className="lg:mr-72 min-h-screen">
        <div className="p-6 lg:p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">لوحة تحكم الأدمن</h1>
            <p className="text-muted-foreground">
              نظرة عامة على المنصة
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            <StatsCard
              title="إجمالي المستخدمين"
              value={adminStats.totalUsers.toLocaleString('ar-SA')}
              icon={Users}
              trend={{ value: 12, isPositive: true }}
            />
            <StatsCard
              title="إجمالي المشاريع"
              value={adminStats.totalProjects.toLocaleString('ar-SA')}
              icon={Folders}
              trend={{ value: 8, isPositive: true }}
            />
            <StatsCard
              title="الطلبات"
              value={adminStats.totalRequests.toLocaleString('ar-SA')}
              icon={TrendingUp}
              trend={{ value: 15, isPositive: true }}
            />
            <StatsCard
              title="متوسط التقييم"
              value={adminStats.averageRating}
              icon={Star}
            />
            <StatsCard
              title="تقييمات بانتظار المراجعة"
              value={adminStats.pendingFeedback}
              icon={MessageSquare}
            />
            <StatsCard
              title="اقتراحات نشطة"
              value={adminStats.activeSuggestions}
              icon={Settings}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Activity */}
            <div className="glass rounded-2xl p-6">
              <h2 className="text-xl font-semibold mb-4">النشاط الأخير</h2>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-center justify-between p-3 bg-muted/50 rounded-xl"
                  >
                    <p className="text-sm">{activity.message}</p>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">
                      {activity.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="glass rounded-2xl p-6">
              <h2 className="text-xl font-semibold mb-4">إحصائيات سريعة</h2>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>المشاريع المكتملة</span>
                    <span className="text-success">85%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-success w-[85%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>المشاريع قيد الإنشاء</span>
                    <span className="text-warning">12%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-warning w-[12%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>المشاريع الفاشلة</span>
                    <span className="text-destructive">3%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-destructive w-[3%]" />
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl">
                <h3 className="font-medium mb-2">📊 ملخص اليوم</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">مستخدمين جدد</p>
                    <p className="text-xl font-bold">+24</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">مشاريع جديدة</p>
                    <p className="text-xl font-bold">+56</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
