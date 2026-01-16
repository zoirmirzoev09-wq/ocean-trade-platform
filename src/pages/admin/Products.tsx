import { useEffect, useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
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
  DialogTrigger,
} from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Pencil, Trash2, Search, Package } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Product {
  id: string;
  sku: string | null;
  name_ru: string;
  name_tj: string;
  name_en: string;
  description_ru: string | null;
  description_tj: string | null;
  description_en: string | null;
  price: number;
  sale_price: number | null;
  stock_quantity: number;
  unit: string;
  image_url: string | null;
  is_active: boolean;
  is_featured: boolean;
  category_id: string | null;
  created_at: string;
}

interface Category {
  id: string;
  name_ru: string;
  slug: string;
}

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const { toast } = useToast();

  // Form state
  const [formData, setFormData] = useState({
    sku: '',
    name_ru: '',
    name_tj: '',
    name_en: '',
    description_ru: '',
    description_tj: '',
    description_en: '',
    price: '',
    sale_price: '',
    stock_quantity: '',
    unit: 'шт',
    image_url: '',
    is_active: true,
    is_featured: false,
    category_id: '',
  });

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

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

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('id, name_ru, slug')
        .order('sort_order');

      if (error) throw error;
      setCategories(data || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const productData = {
        sku: formData.sku || null,
        name_ru: formData.name_ru,
        name_tj: formData.name_tj,
        name_en: formData.name_en,
        description_ru: formData.description_ru || null,
        description_tj: formData.description_tj || null,
        description_en: formData.description_en || null,
        price: parseFloat(formData.price) || 0,
        sale_price: formData.sale_price ? parseFloat(formData.sale_price) : null,
        stock_quantity: parseInt(formData.stock_quantity) || 0,
        unit: formData.unit,
        image_url: formData.image_url || null,
        is_active: formData.is_active,
        is_featured: formData.is_featured,
        category_id: formData.category_id || null,
      };

      if (editingProduct) {
        const { error } = await supabase
          .from('products')
          .update(productData)
          .eq('id', editingProduct.id);

        if (error) throw error;
        toast({ title: 'Успешно', description: 'Товар обновлён' });
      } else {
        const { error } = await supabase
          .from('products')
          .insert([productData]);

        if (error) throw error;
        toast({ title: 'Успешно', description: 'Товар добавлен' });
      }

      setIsDialogOpen(false);
      resetForm();
      fetchProducts();
    } catch (error: any) {
      console.error('Error saving product:', error);
      toast({
        variant: 'destructive',
        title: 'Ошибка',
        description: error.message || 'Не удалось сохранить товар',
      });
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      sku: product.sku || '',
      name_ru: product.name_ru,
      name_tj: product.name_tj,
      name_en: product.name_en,
      description_ru: product.description_ru || '',
      description_tj: product.description_tj || '',
      description_en: product.description_en || '',
      price: product.price.toString(),
      sale_price: product.sale_price?.toString() || '',
      stock_quantity: product.stock_quantity.toString(),
      unit: product.unit,
      image_url: product.image_url || '',
      is_active: product.is_active,
      is_featured: product.is_featured,
      category_id: product.category_id || '',
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Вы уверены, что хотите удалить этот товар?')) return;

    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast({ title: 'Успешно', description: 'Товар удалён' });
      fetchProducts();
    } catch (error: any) {
      console.error('Error deleting product:', error);
      toast({
        variant: 'destructive',
        title: 'Ошибка',
        description: error.message || 'Не удалось удалить товар',
      });
    }
  };

  const resetForm = () => {
    setEditingProduct(null);
    setFormData({
      sku: '',
      name_ru: '',
      name_tj: '',
      name_en: '',
      description_ru: '',
      description_tj: '',
      description_en: '',
      price: '',
      sale_price: '',
      stock_quantity: '',
      unit: 'шт',
      image_url: '',
      is_active: true,
      is_featured: false,
      category_id: '',
    });
  };

  const filteredProducts = products.filter(
    (product) =>
      product.name_ru.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.sku?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('ru-RU').format(value) + ' сом.';
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Товары</h1>
            <p className="text-muted-foreground">Управление каталогом товаров</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={(open) => {
            setIsDialogOpen(open);
            if (!open) resetForm();
          }}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Добавить товар
              </Button>
            </DialogTrigger>
            <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[700px]">
              <DialogHeader>
                <DialogTitle>
                  {editingProduct ? 'Редактировать товар' : 'Добавить товар'}
                </DialogTitle>
                <DialogDescription>
                  Заполните информацию о товаре на всех языках
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="sku">Артикул (SKU)</Label>
                    <Input
                      id="sku"
                      value={formData.sku}
                      onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                      placeholder="SKU-001"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Категория</Label>
                    <Select
                      value={formData.category_id}
                      onValueChange={(value) => setFormData({ ...formData, category_id: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите категорию" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((cat) => (
                          <SelectItem key={cat.id} value={cat.id}>
                            {cat.name_ru}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="name_ru">Название (RU) *</Label>
                  <Input
                    id="name_ru"
                    value={formData.name_ru}
                    onChange={(e) => setFormData({ ...formData, name_ru: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="name_tj">Название (TJ) *</Label>
                  <Input
                    id="name_tj"
                    value={formData.name_tj}
                    onChange={(e) => setFormData({ ...formData, name_tj: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="name_en">Название (EN) *</Label>
                  <Input
                    id="name_en"
                    value={formData.name_en}
                    onChange={(e) => setFormData({ ...formData, name_en: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description_ru">Описание (RU)</Label>
                  <Textarea
                    id="description_ru"
                    value={formData.description_ru}
                    onChange={(e) => setFormData({ ...formData, description_ru: e.target.value })}
                    rows={2}
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="price">Цена *</Label>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sale_price">Цена со скидкой</Label>
                    <Input
                      id="sale_price"
                      type="number"
                      step="0.01"
                      value={formData.sale_price}
                      onChange={(e) => setFormData({ ...formData, sale_price: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="stock_quantity">Количество</Label>
                    <Input
                      id="stock_quantity"
                      type="number"
                      value={formData.stock_quantity}
                      onChange={(e) => setFormData({ ...formData, stock_quantity: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="image_url">URL изображения</Label>
                  <Input
                    id="image_url"
                    value={formData.image_url}
                    onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                    placeholder="https://..."
                  />
                </div>

                <div className="flex items-center gap-6">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData.is_active}
                      onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                      className="rounded border-border"
                    />
                    <span className="text-sm">Активен</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData.is_featured}
                      onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                      className="rounded border-border"
                    />
                    <span className="text-sm">Рекомендуемый</span>
                  </label>
                </div>

                <div className="flex justify-end gap-2 pt-4">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Отмена
                  </Button>
                  <Button type="submit">
                    {editingProduct ? 'Сохранить' : 'Добавить'}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
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
              <Package className="h-5 w-5" />
              Список товаров ({filteredProducts.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>SKU</TableHead>
                    <TableHead>Название</TableHead>
                    <TableHead>Цена</TableHead>
                    <TableHead>Количество</TableHead>
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
                          {product.sale_price ? (
                            <div>
                              <span className="text-destructive line-through">
                                {formatCurrency(product.price)}
                              </span>
                              <br />
                              <span className="font-medium text-success">
                                {formatCurrency(product.sale_price)}
                              </span>
                            </div>
                          ) : (
                            formatCurrency(product.price)
                          )}
                        </TableCell>
                        <TableCell>
                          <span
                            className={
                              product.stock_quantity <= 0
                                ? 'text-destructive'
                                : product.stock_quantity < 10
                                ? 'text-warning'
                                : 'text-success'
                            }
                          >
                            {product.stock_quantity} {product.unit}
                          </span>
                        </TableCell>
                        <TableCell>
                          <span
                            className={`rounded-full px-2 py-1 text-xs font-medium ${
                              product.is_active
                                ? 'bg-success/10 text-success'
                                : 'bg-muted text-muted-foreground'
                            }`}
                          >
                            {product.is_active ? 'Активен' : 'Скрыт'}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEdit(product)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDelete(product.id)}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
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

export default Products;
