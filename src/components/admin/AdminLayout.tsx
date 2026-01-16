import { ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { AdminSidebar } from './AdminSidebar';
import { Loader2 } from 'lucide-react';

interface AdminLayoutProps {
  children: ReactNode;
}

export const AdminLayout = ({ children }: AdminLayoutProps) => {
  const { user, loading, isAdmin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        navigate('/auth');
      } else if (!isAdmin) {
        navigate('/account');
      }
    }
  }, [user, loading, isAdmin, navigate]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user || !isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <AdminSidebar />
      <main className="ml-64 min-h-screen p-6 transition-all duration-300">
        {children}
      </main>
    </div>
  );
};
