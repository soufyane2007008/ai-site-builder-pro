import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Logo } from './Logo';
import { Button } from './ui/button';
import {
  LayoutDashboard,
  FolderPlus,
  Folders,
  Settings,
  LogOut,
  Shield,
  Users,
  MessageSquare,
  Menu,
  X,
  ChevronLeft,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const userNavItems = [
  { icon: LayoutDashboard, label: 'لوحة التحكم', path: '/dashboard' },
  { icon: FolderPlus, label: 'مشروع جديد', path: '/new-project' },
  { icon: Folders, label: 'مشاريعي', path: '/projects' },
  { icon: MessageSquare, label: 'التقييم والاقتراحات', path: '/feedback' },
  { icon: Settings, label: 'الإعدادات', path: '/settings' },
];

const adminNavItems = [
  { icon: Shield, label: 'لوحة الأدمن', path: '/admin' },
  { icon: Users, label: 'المستخدمين', path: '/admin/users' },
  { icon: Folders, label: 'جميع المشاريع', path: '/admin/projects' },
  { icon: MessageSquare, label: 'التقييمات', path: '/admin/feedback' },
  { icon: Settings, label: 'إعدادات النظام', path: '/admin/settings' },
];

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const isAdmin = user?.role === 'SUPER_ADMIN' || user?.role === 'ADMIN';
  const navItems = isAdmin ? [...userNavItems, ...adminNavItems] : userNavItems;

  const handleLogout = () => {
    logout();
    navigate('/auth');
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileOpen(true)}
        className="fixed top-4 right-4 z-50 lg:hidden p-2 glass rounded-lg"
      >
        <Menu size={24} />
      </button>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 right-0 h-full bg-card border-l border-border z-50 transition-all duration-300 flex flex-col",
          isCollapsed ? "w-20" : "w-72",
          isMobileOpen ? "translate-x-0" : "translate-x-full lg:translate-x-0"
        )}
      >
        {/* Header */}
        <div className="p-4 flex items-center justify-between border-b border-border">
          {!isCollapsed && <Logo size="sm" />}
          <button
            onClick={() => {
              setIsCollapsed(!isCollapsed);
              setIsMobileOpen(false);
            }}
            className="p-2 hover:bg-muted rounded-lg transition-colors"
          >
            {isMobileOpen ? (
              <X size={20} />
            ) : (
              <ChevronLeft
                size={20}
                className={cn("transition-transform", isCollapsed && "rotate-180")}
              />
            )}
          </button>
        </div>

        {/* User Info */}
        <div className={cn("p-4 border-b border-border", isCollapsed && "items-center")}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-primary-foreground font-bold">
              {user?.name?.charAt(0) || 'م'}
            </div>
            {!isCollapsed && (
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{user?.name}</p>
                <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
                <span className="inline-block mt-1 px-2 py-0.5 text-xs rounded-full bg-primary/10 text-primary">
                  {user?.role === 'SUPER_ADMIN' ? 'مدير عام' : 
                   user?.role === 'ADMIN' ? 'مدير' : 
                   user?.role === 'GUEST' ? 'زائر' : 'مستخدم'}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 overflow-y-auto">
          <ul className="space-y-2">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    onClick={() => setIsMobileOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200",
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-muted text-muted-foreground hover:text-foreground"
                    )}
                  >
                    <item.icon size={20} />
                    {!isCollapsed && <span>{item.label}</span>}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-border">
          <Button
            variant="ghost"
            className={cn("w-full justify-start gap-3", isCollapsed && "justify-center")}
            onClick={handleLogout}
          >
            <LogOut size={20} />
            {!isCollapsed && <span>تسجيل الخروج</span>}
          </Button>
        </div>
      </aside>
    </>
  );
}
