import { useEffect, useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
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
import { Search, Warehouse as WarehouseIcon, AlertTriangle, Package, TrendingDown } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Product {
  id: string;
  sku: string | null;
  name_ru: string;
  price: number;
  stock_quantity: number;
  unit: string;
  is_active: boolean;
}

const Warehouse = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editQuantity, setEditQuantity] = useState<string>('');
  const { toast } = useToast();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('id, sku, name_ru, price, stock_quantity, unit, is_active')
        .order('stock_quantity', { ascending: true });

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast({
        variant: 'destructive',
        title: 'Ошибка',
        description: 'Не удалось загрузить товары',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateQuantity = async (productId: string) => {
    const newQuantity = parseInt(editQuantity);
    if (isNaN(newQuantity) || newQuantity < 0) {
      toast({
        variant: 'destructive',
        title: 'Ошибка',
        description: 'Введите корректное количество',
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('products')
        .update({ stock_quantity: newQuantity })
        .eq('id', productId);

      if (error) throw error;

      setProducts(products.map(p => 
        p.id === productId ? { ...p, stock_quantity: newQuantity } : p
      ));
      
      setEditingId(null);
      setEditQuantity('');
      
      toast({ title: 'Успешно', description: 'Количество обновлено' });
    } catch (error: any) {
      console.error('Error updating quantity:', error);
      toast({
        variant: 'destructive',
        title: 'Ошибка',
        description: error.message || 'Не удалось обновить количество',
      });
    }
  };

  const startEditing = (product: Product) => {
    setEditingId(product.id);
    setEditQuantity(product.stock_quantity.toString());
  };

  const filteredProducts = products.filter(product =>
    product.name_ru.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.sku?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const outOfStock = products.filter(p => p.stock_quantity <= 0).length;
  const lowStock = products.filter(p => p.stock_quantity > 0 && p.stock_quantity < 10).length;
  const totalItems = products.reduce((sum, p) => sum + p.stock_quantity, 0);

  const getStockColor = (quantity: number) => {
    if (quantity <= 0) return 'text-destructive';
    if (quantity < 10) return 'text-warning';
    return 'text-success';
  };

  const getStockBg = (quantity: number) => {
    if (quantity <= 0) return 'bg-destructive/10';
    if (quantity < 10) return 'bg-warning/10';
    return 'bg-success/10';
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Склад</h1>
          <p className="text-muted-foreground">Управление запасами товаров</p>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardContent className="flex items-center gap-4 pt-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Package className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Всего единиц</p>
                <p className="text-2xl font-bold">{totalItems}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-4 pt-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-warning/10">
                <TrendingDown className="h-6 w-6 text-warning" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Мало на складе</p>
                <p className="text-2xl font-bold">{lowStock}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-4 pt-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10">
                <AlertTriangle className="h-6 w-6 text-destructive" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Нет в наличии</p>
                <p className="text-2xl font-bold">{outOfStock}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <Card>
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Поиск по названию или артикулу..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Products Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <WarehouseIcon className="h-5 w-5" />
              Остатки товаров ({filteredProducts.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>SKU</TableHead>
                    <TableHead>Название</TableHead>
                    <TableHead>Количество</TableHead>
                    <TableHead>Единица</TableHead>
                    <TableHead>Статус</TableHead>
                    <TableHead className="text-right">Действия</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProducts.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="py-8 text-center text-muted-foreground">
                        {loading ? 'Загрузка...' : 'Товары не найдены'}
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredProducts.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell className="font-mono text-sm">{product.sku || '-'}</TableCell>
                        <TableCell className="font-medium">{product.name_ru}</TableCell>
                        <TableCell>
                          {editingId === product.id ? (
                            <div className="flex items-center gap-2">
                              <Input
                                type="number"
                                value={editQuantity}
                                onChange={(e) => setEditQuantity(e.target.value)}
                                className="w-24"
                                min="0"
                              />
                              <Button size="sm" onClick={() => handleUpdateQuantity(product.id)}>
                                OK
                              </Button>
                              <Button 
                                size="sm" 
                                variant="outline" 
                                onClick={() => {
                                  setEditingId(null);
                                  setEditQuantity('');
                                }}
                              >
                                ✕
                              </Button>
                            </div>
                          ) : (
                            <span className={`font-bold ${getStockColor(product.stock_quantity)}`}>
                              {product.stock_quantity}
                            </span>
                          )}
                        </TableCell>
                        <TableCell>{product.unit}</TableCell>
                        <TableCell>
                          <span className={`rounded-full px-2 py-1 text-xs font-medium ${getStockBg(product.stock_quantity)} ${getStockColor(product.stock_quantity)}`}>
                            {product.stock_quantity <= 0 
                              ? 'Нет в наличии' 
                              : product.stock_quantity < 10 
                              ? 'Мало' 
                              : 'В наличии'}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => startEditing(product)}
                            disabled={editingId !== null}
                          >
                            Изменить
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
      </div>
    </AdminLayout>
  );
};

export default Warehouse;
