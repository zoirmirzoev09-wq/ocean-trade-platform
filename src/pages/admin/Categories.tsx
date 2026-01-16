import { useEffect, useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
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
import { Plus, Pencil, Trash2, Layers, GripVertical } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Category {
  id: string;
  slug: string;
  name_ru: string;
  name_tj: string;
  name_en: string;
  description_ru: string | null;
  description_tj: string | null;
  description_en: string | null;
  image_url: string | null;
  sort_order: number;
  created_at: string;
}

const AdminCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const { toast } = useToast();

  // Form state
  const [formData, setFormData] = useState({
    slug: '',
    name_ru: '',
    name_tj: '',
    name_en: '',
    description_ru: '',
    description_tj: '',
    description_en: '',
    image_url: '',
    sort_order: 0,
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('sort_order');

      if (error) throw error;
      setCategories(data || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
      toast({
        variant: 'destructive',
        title: 'Ошибка',
        description: 'Не удалось загрузить категории',
      });
    } finally {
      setLoading(false);
    }
  };

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9а-яё]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const categoryData = {
        slug: formData.slug || generateSlug(formData.name_en || formData.name_ru),
        name_ru: formData.name_ru,
        name_tj: formData.name_tj,
        name_en: formData.name_en,
        description_ru: formData.description_ru || null,
        description_tj: formData.description_tj || null,
        description_en: formData.description_en || null,
        image_url: formData.image_url || null,
        sort_order: formData.sort_order,
      };

      if (editingCategory) {
        const { error } = await supabase
          .from('categories')
          .update(categoryData)
          .eq('id', editingCategory.id);

        if (error) throw error;
        toast({ title: 'Успешно', description: 'Категория обновлена' });
      } else {
        const { error } = await supabase
          .from('categories')
          .insert([categoryData]);

        if (error) throw error;
        toast({ title: 'Успешно', description: 'Категория добавлена' });
      }

      setIsDialogOpen(false);
      resetForm();
      fetchCategories();
    } catch (error: any) {
      console.error('Error saving category:', error);
      toast({
        variant: 'destructive',
        title: 'Ошибка',
        description: error.message || 'Не удалось сохранить категорию',
      });
    }
  };

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    setFormData({
      slug: category.slug,
      name_ru: category.name_ru,
      name_tj: category.name_tj,
      name_en: category.name_en,
      description_ru: category.description_ru || '',
      description_tj: category.description_tj || '',
      description_en: category.description_en || '',
      image_url: category.image_url || '',
      sort_order: category.sort_order,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Вы уверены, что хотите удалить эту категорию?')) return;

    try {
      const { error } = await supabase
        .from('categories')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast({ title: 'Успешно', description: 'Категория удалена' });
      fetchCategories();
    } catch (error: any) {
      console.error('Error deleting category:', error);
      toast({
        variant: 'destructive',
        title: 'Ошибка',
        description: error.message || 'Не удалось удалить категорию',
      });
    }
  };

  const resetForm = () => {
    setEditingCategory(null);
    setFormData({
      slug: '',
      name_ru: '',
      name_tj: '',
      name_en: '',
      description_ru: '',
      description_tj: '',
      description_en: '',
      image_url: '',
      sort_order: categories.length,
    });
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Категории</h1>
            <p className="text-muted-foreground">Управление категориями товаров</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={(open) => {
            setIsDialogOpen(open);
            if (!open) resetForm();
          }}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Добавить категорию
              </Button>
            </DialogTrigger>
            <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>
                  {editingCategory ? 'Редактировать категорию' : 'Добавить категорию'}
                </DialogTitle>
                <DialogDescription>
                  Заполните информацию о категории на всех языках
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="slug">URL (slug)</Label>
                    <Input
                      id="slug"
                      value={formData.slug}
                      onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                      placeholder="water-emulsion"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sort_order">Порядок сортировки</Label>
                    <Input
                      id="sort_order"
                      type="number"
                      value={formData.sort_order}
                      onChange={(e) => setFormData({ ...formData, sort_order: parseInt(e.target.value) || 0 })}
                    />
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

                <div className="space-y-2">
                  <Label htmlFor="image_url">URL изображения</Label>
                  <Input
                    id="image_url"
                    value={formData.image_url}
                    onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                    placeholder="https://..."
                  />
                </div>

                <div className="flex justify-end gap-2 pt-4">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Отмена
                  </Button>
                  <Button type="submit">
                    {editingCategory ? 'Сохранить' : 'Добавить'}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Categories Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Layers className="h-5 w-5" />
              Список категорий ({categories.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px]">№</TableHead>
                    <TableHead>Slug</TableHead>
                    <TableHead>Название (RU)</TableHead>
                    <TableHead>Название (TJ)</TableHead>
                    <TableHead>Название (EN)</TableHead>
                    <TableHead className="text-right">Действия</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {categories.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="py-8 text-center text-muted-foreground">
                        {loading ? 'Загрузка...' : 'Категории не найдены'}
                      </TableCell>
                    </TableRow>
                  ) : (
                    categories.map((category) => (
                      <TableRow key={category.id}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <GripVertical className="h-4 w-4 text-muted-foreground" />
                            <span>{category.sort_order}</span>
                          </div>
                        </TableCell>
                        <TableCell className="font-mono text-sm">{category.slug}</TableCell>
                        <TableCell className="font-medium">{category.name_ru}</TableCell>
                        <TableCell>{category.name_tj}</TableCell>
                        <TableCell>{category.name_en}</TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEdit(category)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDelete(category.id)}
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

export default AdminCategories;
