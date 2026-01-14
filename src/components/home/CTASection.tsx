import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

export const CTASection = () => {
  const { t } = useLanguage();

  return (
    <section className="py-16 md:py-24">
      <div className="container">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-primary p-8 md:p-16">
          {/* Background Elements */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-accent blur-3xl" />
            <div className="absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-white blur-3xl" />
          </div>

          <div className="relative z-10 grid items-center gap-8 lg:grid-cols-2">
            <div>
              <h2 className="mb-4 font-display text-3xl font-bold text-primary-foreground md:text-4xl">
                {t('contacts.form_title')}
              </h2>
              <p className="mb-6 text-primary-foreground/80">
                {t('about.experience_text')}
              </p>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Link to="/contacts">
                  <Button size="lg" variant="accent" className="group w-full sm:w-auto">
                    {t('hero.contact')}
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
                <Link to="/categories">
                  <Button size="lg" variant="hero" className="w-full sm:w-auto">
                    {t('hero.cta')}
                  </Button>
                </Link>
              </div>
            </div>

            <div className="hidden lg:block">
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-xl bg-primary-foreground/10 p-6 backdrop-blur">
                  <p className="font-display text-4xl font-bold text-primary-foreground">500+</p>
                  <p className="text-sm text-primary-foreground/70">{t('nav.products')}</p>
                </div>
                <div className="rounded-xl bg-primary-foreground/10 p-6 backdrop-blur">
                  <p className="font-display text-4xl font-bold text-primary-foreground">12</p>
                  <p className="text-sm text-primary-foreground/70">{t('nav.categories')}</p>
                </div>
                <div className="rounded-xl bg-primary-foreground/10 p-6 backdrop-blur">
                  <p className="font-display text-4xl font-bold text-primary-foreground">1000+</p>
                  <p className="text-sm text-primary-foreground/70">Клиентов</p>
                </div>
                <div className="rounded-xl bg-primary-foreground/10 p-6 backdrop-blur">
                  <p className="font-display text-4xl font-bold text-primary-foreground">5+</p>
                  <p className="text-sm text-primary-foreground/70">Лет опыта</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
