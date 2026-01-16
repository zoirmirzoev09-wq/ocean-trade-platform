import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { User, LogIn, ArrowRight, ShoppingBag, Settings, LogOut, Loader2, Shield } from 'lucide-react';

const Account = () => {
  const { t } = useLanguage();
  const { user, loading, isAdmin, signOut } = useAuth();
  const navigate = useNavigate();

  if (loading) {
    return (
      <Layout>
        <div className="flex min-h-[60vh] items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  if (!user) {
    return (
      <Layout>
        <div className="container flex min-h-[60vh] flex-col items-center justify-center py-20">
          <div className="mx-auto w-full max-w-md rounded-2xl border border-border bg-card p-8 text-center">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-muted">
              <User className="h-10 w-10 text-muted-foreground" />
            </div>
            <h1 className="mb-2 font-display text-2xl font-bold text-foreground">
              {t('nav.account')}
            </h1>
            <p className="mb-8 text-muted-foreground">
              Войдите в аккаунт для просмотра заказов и управления профилем
            </p>
            
            <div className="space-y-4">
              <Link to="/auth">
                <Button className="w-full" size="lg">
                  <LogIn className="mr-2 h-4 w-4" />
                  {t('nav.login')}
                </Button>
              </Link>
              <Link to="/auth">
                <Button variant="outline" className="w-full" size="lg">
                  {t('nav.register')}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container py-12">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="font-display text-3xl font-bold text-foreground">
              {t('nav.account')}
            </h1>
            <p className="text-muted-foreground">{user.email}</p>
          </div>
          <Button variant="outline" onClick={signOut}>
            <LogOut className="mr-2 h-4 w-4" />
            {t('nav.logout')}
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {isAdmin && (
            <Link to="/admin">
              <Card className="h-full transition-shadow hover:shadow-lg">
                <CardHeader>
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>{t('nav.admin')}</CardTitle>
                  <CardDescription>
                    Управление магазином, товарами и заказами
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
          )}

          <Link to="/cart">
            <Card className="h-full transition-shadow hover:shadow-lg">
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/10">
                  <ShoppingBag className="h-6 w-6 text-accent" />
                </div>
                <CardTitle>{t('nav.cart')}</CardTitle>
                <CardDescription>
                  Просмотр корзины и оформление заказа
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Card className="h-full">
            <CardHeader>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary/50">
                <Settings className="h-6 w-6 text-secondary-foreground" />
              </div>
              <CardTitle>Настройки</CardTitle>
              <CardDescription>
                Управление профилем и предпочтениями
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Account;
