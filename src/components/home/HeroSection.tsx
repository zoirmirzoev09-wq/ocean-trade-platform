import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

export const HeroSection = () => {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden bg-gradient-hero py-20 md:py-32">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-accent blur-3xl" />
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-primary blur-3xl" />
      </div>

      <div className="container relative z-10">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Content */}
          <div className="animate-fade-in">
            <div className="mb-4 inline-flex items-center rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-4 py-1.5 text-sm text-primary-foreground backdrop-blur">
              <span className="mr-2 h-2 w-2 animate-pulse rounded-full bg-accent" />
              Ҷ.Д.Д.М Океан
            </div>
            
            <h1 className="mb-6 font-display text-4xl font-bold leading-tight text-primary-foreground md:text-5xl lg:text-6xl">
              {t('hero.title')}
            </h1>
            
            <p className="mb-8 max-w-lg text-lg text-primary-foreground/80 md:text-xl">
              {t('hero.subtitle')}
            </p>
            
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link to="/categories">
                <Button size="lg" variant="accent" className="group w-full sm:w-auto">
                  {t('hero.cta')}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link to="/contacts">
                <Button size="lg" variant="hero" className="w-full sm:w-auto">
                  {t('hero.contact')}
                </Button>
              </Link>
            </div>
          </div>

          {/* Hero Visual */}
          <div className="relative hidden lg:block">
            <div className="relative animate-float">
              <div className="absolute -inset-4 rounded-3xl bg-accent/20 blur-2xl" />
              <div className="relative overflow-hidden rounded-2xl border border-primary-foreground/20 bg-primary-foreground/10 p-8 backdrop-blur">
                <div className="grid grid-cols-2 gap-4">
                  {['🏗️', '🎨', '🔧', '🏠'].map((emoji, i) => (
                    <div
                      key={i}
                      className="flex h-24 items-center justify-center rounded-xl bg-primary-foreground/10 text-4xl backdrop-blur transition-transform hover:scale-105"
                      style={{ animationDelay: `${i * 0.1}s` }}
                    >
                      {emoji}
                    </div>
                  ))}
                </div>
                <div className="mt-4 text-center">
                  <p className="text-sm text-primary-foreground/60">12+ {t('nav.categories')}</p>
                  <p className="font-display text-2xl font-bold text-primary-foreground">500+</p>
                  <p className="text-xs text-primary-foreground/60">{t('nav.products')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Wave Decoration */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V120Z"
            className="fill-background"
          />
        </svg>
      </div>
    </section>
  );
};
