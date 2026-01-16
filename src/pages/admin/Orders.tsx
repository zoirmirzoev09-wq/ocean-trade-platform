import { useEffect, useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, ShoppingCart, Eye, Package } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

type OrderStatus = 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

interface Order {
  id: string;
  order_number: string;
  status: OrderStatus;
  total_amount: number;
  customer_name: string;
  customer_email: string;
  customer_phone: string | null;
  shipping_address: string | null;
  notes: string | null;
  created_at: string;
  user_id: string | null;
}

interface OrderItem {
  id: string;
  product_name: string;
  quantity: number;
  unit_price: number;
  total_price: number;
}

const statusOptions: { value: OrderStatus; label: string }[] = [
  { value: 'pending', label: 'Ожидает' },
  { value: 'confirmed', label: 'Подтверждён' },
  { value: 'processing', label: 'В обработке' },
  { value: 'shipped', label: 'Отправлен' },
  { value: 'delivered', label: 'Доставлен' },
  { value: 'cancelled', label: 'Отменён' },
];

const statusStyles: Record<OrderStatus, string> = {
  pending: 'bg-warning/10 text-warning',
  confirmed: 'bg-primary/10 text-primary',
  processing: 'bg-accent/10 text-accent',
  shipped: 'bg-secondary/80 text-secondary-foreground',
  delivered: 'bg-success/10 text-success',
  cancelled: 'bg-destructive/10 text-destructive',
};

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setOrders(data || []);
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast({
        variant: 'destructive',
        title: 'Ошибка',
        description: 'Не удалось загрузить заказы',
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchOrderItems = async (orderId: string) => {
    try {
      const { data, error } = await supabase
        .from('order_items')
        .select('*')
        .eq('order_id', orderId);

      if (error) throw error;
      setOrderItems(data || []);
    } catch (error) {
      console.error('Error fetching order items:', error);
    }
  };

  const handleViewOrder = async (order: Order) => {
    setSelectedOrder(order);
    await fetchOrderItems(order.id);
    setIsDialogOpen(true);
  };

  const handleStatusChange = async (orderId: string, newStatus: OrderStatus) => {
    try {
      const { error } = await supabase
        .from('orders')
        .update({ status: newStatus })
        .eq('id', orderId);

      if (error) throw error;

      setOrders(orders.map(order => 
        order.id === orderId ? { ...order, status: newStatus } : order
      ));

      if (selectedOrder?.id === orderId) {
        setSelectedOrder({ ...selectedOrder, status: newStatus });
      }

      toast({ title: 'Успешно', description: 'Статус заказа обновлён' });
    } catch (error: any) {
      console.error('Error updating order status:', error);
      toast({
        variant: 'destructive',
        title: 'Ошибка',
        description: error.message || 'Не удалось обновить статус',
      });
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.order_number.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer_email.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('ru-RU').format(value) + ' сом.';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Заказы</h1>
          <p className="text-muted-foreground">Управление заказами клиентов</p>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col gap-4 sm:flex-row">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Поиск по номеру, имени или email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Статус" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все статусы</SelectItem>
                  {statusOptions.map((status) => (
                    <SelectItem key={status.value} value={status.value}>
                      {status.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Orders Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5" />
              Список заказов ({filteredOrders.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Номер</TableHead>
                    <TableHead>Клиент</TableHead>
                    <TableHead>Сумма</TableHead>
                    <TableHead>Статус</TableHead>
                    <TableHead>Дата</TableHead>
                    <TableHead className="text-right">Действия</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrders.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="py-8 text-center text-muted-foreground">
                        {loading ? 'Загрузка...' : 'Заказы не найдены'}
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredOrders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-mono text-sm font-medium">
                          {order.order_number}
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">{order.customer_name}</p>
                            <p className="text-sm text-muted-foreground">{order.customer_email}</p>
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">
                          {formatCurrency(order.total_amount)}
                        </TableCell>
                        <TableCell>
                          <Select
                            value={order.status}
                            onValueChange={(value) => handleStatusChange(order.id, value as OrderStatus)}
                          >
                            <SelectTrigger className={`w-[140px] ${statusStyles[order.status]}`}>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {statusOptions.map((status) => (
                                <SelectItem key={status.value} value={status.value}>
                                  {status.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {formatDate(order.created_at)}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleViewOrder(order)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Order Details Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Заказ {selectedOrder?.order_number}</DialogTitle>
              <DialogDescription>
                Детали заказа
              </DialogDescription>
            </DialogHeader>

            {selectedOrder && (
              <div className="space-y-6">
                {/* Customer Info */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <h4 className="mb-2 text-sm font-medium text-muted-foreground">Клиент</h4>
                    <p className="font-medium">{selectedOrder.customer_name}</p>
                    <p className="text-sm">{selectedOrder.customer_email}</p>
                    {selectedOrder.customer_phone && (
                      <p className="text-sm">{selectedOrder.customer_phone}</p>
                    )}
                  </div>
                  <div>
                    <h4 className="mb-2 text-sm font-medium text-muted-foreground">Доставка</h4>
                    <p className="text-sm">
                      {selectedOrder.shipping_address || 'Адрес не указан'}
                    </p>
                  </div>
                </div>

                {/* Order Items */}
                <div>
                  <h4 className="mb-3 flex items-center gap-2 text-sm font-medium text-muted-foreground">
                    <Package className="h-4 w-4" />
                    Товары
                  </h4>
                  <div className="space-y-2">
                    {orderItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between rounded-lg border border-border p-3"
                      >
                        <div>
                          <p className="font-medium">{item.product_name}</p>
                          <p className="text-sm text-muted-foreground">
                            {item.quantity} × {formatCurrency(item.unit_price)}
                          </p>
                        </div>
                        <p className="font-medium">{formatCurrency(item.total_price)}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Total */}
                <div className="flex items-center justify-between border-t border-border pt-4">
                  <span className="text-lg font-medium">Итого:</span>
                  <span className="text-xl font-bold text-primary">
                    {formatCurrency(selectedOrder.total_amount)}
                  </span>
                </div>

                {/* Notes */}
                {selectedOrder.notes && (
                  <div>
                    <h4 className="mb-2 text-sm font-medium text-muted-foreground">Примечания</h4>
                    <p className="text-sm">{selectedOrder.notes}</p>
                  </div>
                )}

                {/* Status Change */}
                <div className="flex items-center gap-4 border-t border-border pt-4">
                  <span className="text-sm font-medium">Изменить статус:</span>
                  <Select
                    value={selectedOrder.status}
                    onValueChange={(value) => handleStatusChange(selectedOrder.id, value as OrderStatus)}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {statusOptions.map((status) => (
                        <SelectItem key={status.value} value={status.value}>
                          {status.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
};

export default Orders;
