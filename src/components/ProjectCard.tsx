import { Project } from '@/types';
import { Button } from './ui/button';
import { Download, ExternalLink, MoreVertical, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

interface ProjectCardProps {
  project: Project;
  onDownload?: () => void;
  onDelete?: () => void;
  onView?: () => void;
}

const statusConfig = {
  creating: {
    label: 'قيد الإنشاء',
    color: 'bg-warning/10 text-warning',
  },
  completed: {
    label: 'مكتمل',
    color: 'bg-success/10 text-success',
  },
  failed: {
    label: 'فشل',
    color: 'bg-destructive/10 text-destructive',
  },
};

const typeConfig = {
  personal: 'شخصي',
  store: 'متجر',
  company: 'شركة',
  blog: 'مدونة',
};

export function ProjectCard({ project, onDownload, onDelete, onView }: ProjectCardProps) {
  const status = statusConfig[project.status];
  
  return (
    <div className="glass rounded-2xl p-6 transition-all duration-300 hover:scale-[1.02] animate-fade-in">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div 
            className="w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold"
            style={{ 
              background: `linear-gradient(135deg, ${project.colors.primary}, ${project.colors.secondary})`,
              color: '#fff'
            }}
          >
            {project.name.charAt(0)}
          </div>
          <div>
            <h3 className="font-semibold text-lg">{project.name}</h3>
            <p className="text-sm text-muted-foreground">{typeConfig[project.type]}</p>
          </div>
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreVertical size={18} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem onClick={onView}>
              <ExternalLink size={16} className="ml-2" />
              عرض المشروع
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onDownload}>
              <Download size={16} className="ml-2" />
              تحميل ZIP
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onDelete} className="text-destructive">
              <Trash2 size={16} className="ml-2" />
              حذف
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
        {project.content || 'لا يوجد وصف'}
      </p>

      <div className="flex items-center justify-between">
        <span className={cn("px-3 py-1 rounded-full text-sm", status.color)}>
          {status.label}
        </span>
        <span className="text-xs text-muted-foreground">
          {new Date(project.createdAt).toLocaleDateString('ar-SA')}
        </span>
      </div>

      {project.status === 'creating' && (
        <div className="mt-4">
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-primary to-secondary w-1/2 animate-pulse" />
          </div>
        </div>
      )}
    </div>
  );
}
