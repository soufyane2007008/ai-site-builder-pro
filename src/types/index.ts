export type UserRole = 'SUPER_ADMIN' | 'ADMIN' | 'USER' | 'GUEST';

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: UserRole;
  createdAt: Date;
}

export interface Project {
  id: string;
  userId: string;
  name: string;
  type: 'personal' | 'store' | 'company' | 'blog';
  status: 'creating' | 'completed' | 'failed';
  language: 'ar' | 'en' | 'fr';
  colors: {
    primary: string;
    secondary: string;
    background: string;
  };
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Feedback {
  id: string;
  userId: string;
  rating: number;
  comment: string;
  createdAt: Date;
}

export interface Suggestion {
  id: string;
  userId: string;
  title: string;
  description: string;
  votes: number;
  createdAt: Date;
}

export interface DashboardStats {
  totalProjects: number;
  activeProjects: number;
  completedProjects: number;
  failedProjects: number;
}

export interface AdminStats extends DashboardStats {
  totalUsers: number;
  totalRequests: number;
  averageRating: number;
}
