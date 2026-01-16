import { AdminLayout } from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Settings as SettingsIcon, 
  Store,
  Bell,
  Shield,
  Globe
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Settings = () => {
  const { toast } = useToast();

  const handleSave = () => {
    toast({
      title: 'Успешно',
      description: 'Настройки сохранены',
    });
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Настройки</h1>
          <p className="text-muted-foreground">Управление настройками магазина</p>
        </div>

        <Tabs defaultValue="store" className="space-y-6">
          <TabsList>
            <TabsTrigger value="store" className="gap-2">
              <Store className="h-4 w-4" />
              Магазин
            </TabsTrigger>
            <TabsTrigger value="notifications" className="gap-2">
              <Bell className="h-4 w-4" />
              Уведомления
            </TabsTrigger>
            <TabsTrigger value="security" className="gap-2">
              <Shield className="h-4 w-4" />
              Безопасность
            </TabsTrigger>
            <TabsTrigger value="language" className="gap-2">
              <Globe className="h-4 w-4" />
              Языки
            </TabsTrigger>
          </TabsList>

          <TabsContent value="store">
            <Card>
              <CardHeader>
                <CardTitle>Настройки магазина</CardTitle>
                <CardDescription>
                  Основная информация о вашем магазине
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="store-name">Название магазина</Label>
                    <Input id="store-name" defaultValue="Ҷ.Д.Д.М Океан" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="store-email">Email</Label>
                    <Input id="store-email" type="email" defaultValue="info@okean.tj" />
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="store-phone">Телефон</Label>
                    <Input id="store-phone" defaultValue="+992 93 123 45 67" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="store-address">Адрес</Label>
                    <Input id="store-address" defaultValue="г. Душанбе, ул. Рудаки, 45" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="store-hours">Режим работы</Label>
                  <Input id="store-hours" defaultValue="Пн-Сб: 09:00 - 18:00, Вс: выходной" />
                </div>
                <Button onClick={handleSave}>Сохранить</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Уведомления</CardTitle>
                <CardDescription>
                  Настройте, какие уведомления вы хотите получать
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Новые заказы</p>
                    <p className="text-sm text-muted-foreground">
                      Получать уведомления о новых заказах
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Мало товара на складе</p>
                    <p className="text-sm text-muted-foreground">
                      Уведомлять, когда товар заканчивается
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Новые пользователи</p>
                    <p className="text-sm text-muted-foreground">
                      Уведомлять о новых регистрациях
                    </p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Отмены заказов</p>
                    <p className="text-sm text-muted-foreground">
                      Уведомлять об отменённых заказах
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Button onClick={handleSave}>Сохранить</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle>Безопасность</CardTitle>
                <CardDescription>
                  Настройки безопасности аккаунта
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Текущий пароль</Label>
                    <Input id="current-password" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new-password">Новый пароль</Label>
                    <Input id="new-password" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Подтвердите пароль</Label>
                    <Input id="confirm-password" type="password" />
                  </div>
                </div>
                <div className="flex items-center justify-between border-t border-border pt-6">
                  <div>
                    <p className="font-medium">Двухфакторная аутентификация</p>
                    <p className="text-sm text-muted-foreground">
                      Дополнительный уровень защиты
                    </p>
                  </div>
                  <Switch />
                </div>
                <Button onClick={handleSave}>Сохранить</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="language">
            <Card>
              <CardHeader>
                <CardTitle>Языки</CardTitle>
                <CardDescription>
                  Настройки мультиязычности магазина
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🇷🇺</span>
                    <div>
                      <p className="font-medium">Русский</p>
                      <p className="text-sm text-muted-foreground">Основной язык</p>
                    </div>
                  </div>
                  <Switch defaultChecked disabled />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🇹🇯</span>
                    <div>
                      <p className="font-medium">Тоҷикӣ</p>
                      <p className="text-sm text-muted-foreground">Таджикский язык</p>
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🇬🇧</span>
                    <div>
                      <p className="font-medium">English</p>
                      <p className="text-sm text-muted-foreground">Английский язык</p>
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Button onClick={handleSave}>Сохранить</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default Settings;
