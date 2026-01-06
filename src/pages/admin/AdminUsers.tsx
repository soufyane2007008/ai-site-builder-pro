import { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Search, MoreVertical, Shield, Trash2, Ban } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

const demoUsers = [
  { id: '1', name: 'سفيان', email: 'lrsoufyane2007@gmail.com', role: 'SUPER_ADMIN', projects: 15, createdAt: '2024-01-01' },
  { id: '2', name: 'أحمد محمد', email: 'ahmed@example.com', role: 'USER', projects: 8, createdAt: '2024-01-10' },
  { id: '3', name: 'سارة أحمد', email: 'sara@example.com', role: 'ADMIN', projects: 12, createdAt: '2024-01-15' },
  { id: '4', name: 'محمد علي', email: 'mohamed@example.com', role: 'USER', projects: 3, createdAt: '2024-01-20' },
  { id: '5', name: 'فاطمة حسن', email: 'fatima@example.com', role: 'USER', projects: 6, createdAt: '2024-01-25' },
];

const roleConfig = {
  SUPER_ADMIN: { label: 'مدير عام', color: 'bg-primary/10 text-primary' },
  ADMIN: { label: 'مدير', color: 'bg-secondary/10 text-secondary' },
  USER: { label: 'مستخدم', color: 'bg-muted text-muted-foreground' },
  GUEST: { label: 'زائر', color: 'bg-warning/10 text-warning' },
};

export default function AdminUsers() {
  const [users, setUsers] = useState(demoUsers);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredUsers = users.filter(
    (user) =>
      user.name.includes(searchQuery) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleMakeAdmin = (userId: string) => {
    setUsers(users.map(u => u.id === userId ? { ...u, role: 'ADMIN' } : u));
    toast.success('تم ترقية المستخدم إلى مدير');
  };

  const handleBan = (userId: string) => {
    toast.success('تم حظر المستخدم');
  };

  const handleDelete = (userId: string) => {
    setUsers(users.filter(u => u.id !== userId));
    toast.success('تم حذف المستخدم');
  };

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      
      <main className="lg:mr-72 min-h-screen">
        <div className="p-6 lg:p-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">إدارة المستخدمين</h1>
              <p className="text-muted-foreground">
                {users.length} مستخدم
              </p>
            </div>
          </div>

          {/* Search */}
          <div className="glass rounded-2xl p-4 mb-6">
            <div className="relative">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
              <Input
                placeholder="ابحث عن مستخدم..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pr-10"
              />
            </div>
          </div>

          {/* Users Table */}
          <div className="glass rounded-2xl overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-right">المستخدم</TableHead>
                  <TableHead className="text-right">الدور</TableHead>
                  <TableHead className="text-right">المشاريع</TableHead>
                  <TableHead className="text-right">تاريخ الانضمام</TableHead>
                  <TableHead className="text-right w-12"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-primary-foreground font-bold">
                          {user.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p className="text-sm text-muted-foreground" dir="ltr">{user.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={cn("font-normal", roleConfig[user.role as keyof typeof roleConfig].color)}>
                        {roleConfig[user.role as keyof typeof roleConfig].label}
                      </Badge>
                    </TableCell>
                    <TableCell>{user.projects}</TableCell>
                    <TableCell>{new Date(user.createdAt).toLocaleDateString('ar-SA')}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical size={18} />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start">
                          <DropdownMenuItem onClick={() => handleMakeAdmin(user.id)}>
                            <Shield size={16} className="ml-2" />
                            ترقية لمدير
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleBan(user.id)}>
                            <Ban size={16} className="ml-2" />
                            حظر
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleDelete(user.id)}
                            className="text-destructive"
                          >
                            <Trash2 size={16} className="ml-2" />
                            حذف
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </main>
    </div>
  );
}
