import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { User, LogIn, ArrowRight } from 'lucide-react';

const Account = () => {
  const { t } = useLanguage();

  // This is a placeholder - will be replaced with actual auth
  const isLoggedIn = false;

  if (!isLoggedIn) {
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
              <Button className="w-full" size="lg">
                <LogIn className="mr-2 h-4 w-4" />
                {t('nav.login')}
              </Button>
              <Button variant="outline" className="w-full" size="lg">
                {t('nav.register')}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>

            <p className="mt-6 text-xs text-muted-foreground">
              Для полной функциональности требуется подключение базы данных
            </p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container py-12">
        <h1 className="mb-8 font-display text-3xl font-bold text-foreground">
          {t('nav.account')}
        </h1>
        {/* Account content will go here */}
      </div>
    </Layout>
  );
};

export default Account;
