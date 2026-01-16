import { useEffect, useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { StatsCard } from '@/components/admin/StatsCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Users, 
  ShoppingCart, 
  Package, 
  DollarSign,
  TrendingUp,
  Clock
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from 'recharts';

interface DashboardStats {
  totalUsers: number;
  totalOrders: number;
  totalProducts: number;
  totalRevenue: number;
}

const COLORS = ['hsl(var(--primary))', 'hsl(var(--accent))', 'hsl(var(--secondary))', 'hsl(var(--muted))'];

const Dashboard = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    totalOrders: 0,
    totalProducts: 0,
    totalRevenue: 0,
  });
  const [recentOrders, setRecentOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Mock chart data - will be replaced with real data
  const revenueData = [
    { name: 'Янв', revenue: 4000 },
    { name: 'Фев', revenue: 3000 },
    { name: 'Мар', revenue: 5000 },
    { name: 'Апр', revenue: 2780 },
    { name: 'Май', revenue: 1890 },
    { name: 'Июн', revenue: 2390 },
    { name: 'Июл', revenue: 3490 },
  ];

  const orderStatusData = [
    { name: 'Ожидают', value: 30 },
    { name: 'Подтверждены', value: 25 },
    { name: 'Доставлены', value: 40 },
    { name: 'Отменены', value: 5 },
  ];

  const categoryData = [
    { name: 'Водоэмульсии', sales: 120 },
    { name: 'Грунтовка', sales: 98 },
    { name: 'Шпатлёвка', sales: 86 },
    { name: 'Клей для кафеля', sales: 72 },
    { name: 'Ротбанд', sales: 65 },
  ];

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch users count
        const { count: usersCount } = await supabase
          .from('profiles')
          .select('*', { count: 'exact', head: true });

        // Fetch orders count and revenue
        const { data: ordersData } = await supabase
          .from('orders')
          .select('id, total_amount');

        const totalOrders = ordersData?.length || 0;
        const totalRevenue = ordersData?.reduce((sum, order) => sum + Number(order.total_amount || 0), 0) || 0;

        // Fetch products count
        const { count: productsCount } = await supabase
          .from('products')
          .select('*', { count: 'exact', head: true });

        // Fetch recent orders
        const { data: recent } = await supabase
          .from('orders')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(5);

        setStats({
          totalUsers: usersCount || 0,
          totalOrders,
          totalProducts: productsCount || 0,
          totalRevenue,
        });

        setRecentOrders(recent || []);
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'decimal',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value) + ' сом.';
  };

  const getStatusBadge = (status: string) => {
    const statusStyles: Record<string, string> = {
      pending: 'bg-warning/10 text-warning',
      confirmed: 'bg-primary/10 text-primary',
      processing: 'bg-accent/10 text-accent',
      shipped: 'bg-secondary/80 text-secondary-foreground',
      delivered: 'bg-success/10 text-success',
      cancelled: 'bg-destructive/10 text-destructive',
    };

    const statusLabels: Record<string, string> = {
      pending: 'Ожидает',
      confirmed: 'Подтверждён',
      processing: 'В обработке',
      shipped: 'Отправлен',
      delivered: 'Доставлен',
      cancelled: 'Отменён',
    };

    return (
      <span className={`rounded-full px-2 py-1 text-xs font-medium ${statusStyles[status] || ''}`}>
        {statusLabels[status] || status}
      </span>
    );
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Панель управления</h1>
          <p className="text-muted-foreground">Обзор вашего магазина</p>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            title="Всего пользователей"
            value={stats.totalUsers}
            change="+12% за месяц"
            changeType="positive"
            icon={Users}
            iconColor="text-primary"
            iconBgColor="bg-primary/10"
          />
          <StatsCard
            title="Заказов"
            value={stats.totalOrders}
            change="+8% за месяц"
            changeType="positive"
            icon={ShoppingCart}
            iconColor="text-accent"
            iconBgColor="bg-accent/10"
          />
          <StatsCard
            title="Товаров"
            value={stats.totalProducts}
            icon={Package}
            iconColor="text-secondary-foreground"
            iconBgColor="bg-secondary/50"
          />
          <StatsCard
            title="Выручка"
            value={formatCurrency(stats.totalRevenue)}
            change="+23% за месяц"
            changeType="positive"
            icon={DollarSign}
            iconColor="text-success"
            iconBgColor="bg-success/10"
          />
        </div>

        {/* Charts Row */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Revenue Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Выручка по месяцам
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={revenueData}>
                    <defs>
                      <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="revenue"
                      stroke="hsl(var(--primary))"
                      fillOpacity={1}
                      fill="url(#colorRevenue)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Order Status Pie Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingCart className="h-5 w-5 text-accent" />
                Статусы заказов
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={orderStatusData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      fill="#8884d8"
                      paddingAngle={5}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {orderStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Category Sales & Recent Orders */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Category Bar Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5 text-secondary-foreground" />
                Продажи по категориям
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={categoryData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis type="number" stroke="hsl(var(--muted-foreground))" />
                    <YAxis dataKey="name" type="category" width={100} stroke="hsl(var(--muted-foreground))" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                    />
                    <Bar dataKey="sales" fill="hsl(var(--accent))" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Recent Orders */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-warning" />
                Последние заказы
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentOrders.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">
                    Нет заказов
                  </p>
                ) : (
                  recentOrders.map((order) => (
                    <div
                      key={order.id}
                      className="flex items-center justify-between rounded-lg border border-border p-4"
                    >
                      <div>
                        <p className="font-medium text-foreground">{order.order_number}</p>
                        <p className="text-sm text-muted-foreground">{order.customer_name}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-foreground">{formatCurrency(order.total_amount)}</p>
                        {getStatusBadge(order.status)}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
