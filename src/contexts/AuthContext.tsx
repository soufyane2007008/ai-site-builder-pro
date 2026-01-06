import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, UserRole } from '@/types';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  loginWithGithub: () => Promise<void>;
  loginAsGuest: () => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Demo users for testing
const DEMO_USERS: Record<string, User> = {
  'lrsoufyane2007@gmail.com': {
    id: 'super-admin-1',
    email: 'lrsoufyane2007@gmail.com',
    name: 'سفيان',
    role: 'SUPER_ADMIN',
    createdAt: new Date(),
  },
  'admin@ntfly.ai': {
    id: 'admin-1',
    email: 'admin@ntfly.ai',
    name: 'مدير النظام',
    role: 'ADMIN',
    createdAt: new Date(),
  },
  'user@ntfly.ai': {
    id: 'user-1',
    email: 'user@ntfly.ai',
    name: 'مستخدم تجريبي',
    role: 'USER',
    createdAt: new Date(),
  },
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem('ntfly_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const demoUser = DEMO_USERS[email];
    if (demoUser) {
      setUser(demoUser);
      localStorage.setItem('ntfly_user', JSON.stringify(demoUser));
    } else {
      // Create new user
      const newUser: User = {
        id: `user-${Date.now()}`,
        email,
        name: email.split('@')[0],
        role: 'USER',
        createdAt: new Date(),
      };
      setUser(newUser);
      localStorage.setItem('ntfly_user', JSON.stringify(newUser));
    }
    setIsLoading(false);
  };

  const loginWithGoogle = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    const googleUser: User = {
      id: `google-${Date.now()}`,
      email: 'google.user@gmail.com',
      name: 'مستخدم جوجل',
      role: 'USER',
      createdAt: new Date(),
    };
    setUser(googleUser);
    localStorage.setItem('ntfly_user', JSON.stringify(googleUser));
    setIsLoading(false);
  };

  const loginWithGithub = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    const githubUser: User = {
      id: `github-${Date.now()}`,
      email: 'github.user@github.com',
      name: 'مستخدم جيت هب',
      role: 'USER',
      createdAt: new Date(),
    };
    setUser(githubUser);
    localStorage.setItem('ntfly_user', JSON.stringify(githubUser));
    setIsLoading(false);
  };

  const loginAsGuest = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    const guestUser: User = {
      id: `guest-${Date.now()}`,
      email: 'guest@ntfly.ai',
      name: 'زائر',
      role: 'GUEST',
      createdAt: new Date(),
    };
    setUser(guestUser);
    localStorage.setItem('ntfly_user', JSON.stringify(guestUser));
    setIsLoading(false);
  };

  const signup = async (email: string, password: string, name: string) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    const newUser: User = {
      id: `user-${Date.now()}`,
      email,
      name,
      role: 'USER',
      createdAt: new Date(),
    };
    setUser(newUser);
    localStorage.setItem('ntfly_user', JSON.stringify(newUser));
    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('ntfly_user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        loginWithGoogle,
        loginWithGithub,
        loginAsGuest,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
