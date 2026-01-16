import { useEffect, useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, Users as UsersIcon, ShoppingBag } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface UserProfile {
  id: string;
  user_id: string;
  email: string;
  full_name: string | null;
  phone: string | null;
  created_at: string;
  orders_count?: number;
  total_spent?: number;
}

const Users = () => {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      // Fetch profiles
      const { data: profiles, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Fetch orders to calculate stats per user
      const { data: orders } = await supabase
        .from('orders')
        .select('user_id, total_amount');

      // Calculate stats for each user
      const usersWithStats = (profiles || []).map(profile => {
        const userOrders = orders?.filter(o => o.user_id === profile.user_id) || [];
        return {
          ...profile,
          orders_count: userOrders.length,
          total_spent: userOrders.reduce((sum, o) => sum + Number(o.total_amount || 0), 0),
        };
      });

      setUsers(usersWithStats);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast({
        variant: 'destructive',
        title: 'Ошибка',
        description: 'Не удалось загрузить пользователей',
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = users.filter(user =>
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.phone?.includes(searchQuery)
  );

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('ru-RU').format(value) + ' сом.';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Пользователи</h1>
          <p className="text-muted-foreground">Управление клиентами магазина</p>
        </div>

        {/* Search */}
        <Card>
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Поиск по email, имени или телефону..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Users Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UsersIcon className="h-5 w-5" />
              Список пользователей ({filteredUsers.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Пользователь</TableHead>
                    <TableHead>Контакт</TableHead>
                    <TableHead>Заказов</TableHead>
                    <TableHead>Сумма покупок</TableHead>
                    <TableHead>Дата регистрации</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="py-8 text-center text-muted-foreground">
                        {loading ? 'Загрузка...' : 'Пользователи не найдены'}
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                              <span className="text-sm font-medium text-primary">
                                {(user.full_name || user.email).charAt(0).toUpperCase()}
                              </span>
                            </div>
                            <div>
                              <p className="font-medium">{user.full_name || 'Без имени'}</p>
                              <p className="text-sm text-muted-foreground">{user.email}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <p className="text-sm">{user.phone || 'Не указан'}</p>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
                            <span>{user.orders_count || 0}</span>
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">
                          {formatCurrency(user.total_spent || 0)}
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {formatDate(user.created_at)}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default Users;
