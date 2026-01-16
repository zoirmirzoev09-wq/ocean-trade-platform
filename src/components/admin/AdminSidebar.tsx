import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  ShoppingCart,
  Package,
  Layers,
  BarChart3,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Warehouse,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import { useState } from 'react';

const menuItems = [
  { path: '/admin', icon: LayoutDashboard, labelKey: 'Панель управления' },
  { path: '/admin/orders', icon: ShoppingCart, labelKey: 'Заказы' },
  { path: '/admin/products', icon: Package, labelKey: 'Товары' },
  { path: '/admin/categories', icon: Layers, labelKey: 'Категории' },
  { path: '/admin/warehouse', icon: Warehouse, labelKey: 'Склад' },
  { path: '/admin/users', icon: Users, labelKey: 'Пользователи' },
  { path: '/admin/reports', icon: BarChart3, labelKey: 'Отчёты' },
  { path: '/admin/settings', icon: Settings, labelKey: 'Настройки' },
];

export const AdminSidebar = () => {
  const location = useLocation();
  const { signOut } = useAuth();
  const [collapsed, setCollapsed] = useState(false);

  const isActive = (path: string) => {
    if (path === '/admin') {
      return location.pathname === '/admin';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 z-40 flex h-screen flex-col border-r border-border bg-card transition-all duration-300',
        collapsed ? 'w-16' : 'w-64'
      )}
    >
      {/* Logo */}
      <div className="flex h-16 items-center justify-between border-b border-border px-4">
        {!collapsed && (
          <Link to="/admin" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-primary">
              <span className="font-display text-lg font-bold text-primary-foreground">О</span>
            </div>
            <span className="font-display text-lg font-bold text-foreground">Админ</span>
          </Link>
        )}
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 overflow-y-auto p-3">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
              isActive(item.path)
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:bg-muted hover:text-foreground'
            )}
          >
            <item.icon className="h-5 w-5 flex-shrink-0" />
            {!collapsed && <span>{item.labelKey}</span>}
          </Link>
        ))}
      </nav>

      {/* Logout */}
      <div className="border-t border-border p-3">
        <Button
          variant="ghost"
          className={cn(
            'w-full justify-start gap-3 text-muted-foreground hover:bg-destructive/10 hover:text-destructive',
            collapsed && 'justify-center px-0'
          )}
          onClick={signOut}
        >
          <LogOut className="h-5 w-5 flex-shrink-0" />
          {!collapsed && <span>Выйти</span>}
        </Button>
        
        {!collapsed && (
          <Link to="/">
            <Button
              variant="outline"
              className="mt-2 w-full"
            >
              На сайт
            </Button>
          </Link>
        )}
      </div>
    </aside>
  );
};
