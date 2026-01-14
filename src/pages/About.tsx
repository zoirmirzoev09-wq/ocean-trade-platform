import { Layout } from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { Building2, Target, Eye, Award, Users, Calendar } from 'lucide-react';

const About = () => {
  const { t } = useLanguage();

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-hero py-20 md:py-28">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-4 font-display text-4xl font-bold text-primary-foreground md:text-5xl">
              {t('about.title')}
            </h1>
            <p className="text-xl text-primary-foreground/80">
              {t('about.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Company Description */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <div className="mb-6 inline-flex items-center rounded-full bg-accent/10 px-4 py-2 text-sm font-medium text-accent">
                <Building2 className="mr-2 h-4 w-4" />
                Ҷ.Д.Д.М Океан
              </div>
              <h2 className="mb-6 font-display text-3xl font-bold text-foreground md:text-4xl">
                {t('about.experience')}
              </h2>
              <p className="mb-6 text-lg text-muted-foreground">
                {t('about.experience_text')}
              </p>
              <p className="text-muted-foreground">
                Мы предлагаем широкий ассортимент строительных и отделочных материалов высочайшего качества. 
                Наша команда профессионалов всегда готова помочь вам в выборе оптимальных решений для ваших проектов.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-2xl border border-border bg-card p-6 text-center">
                <p className="font-display text-4xl font-bold text-accent">5+</p>
                <p className="mt-2 text-sm text-muted-foreground">Лет на рынке</p>
              </div>
              <div className="rounded-2xl border border-border bg-card p-6 text-center">
                <p className="font-display text-4xl font-bold text-accent">500+</p>
                <p className="mt-2 text-sm text-muted-foreground">Продуктов</p>
              </div>
              <div className="rounded-2xl border border-border bg-card p-6 text-center">
                <p className="font-display text-4xl font-bold text-accent">1000+</p>
                <p className="mt-2 text-sm text-muted-foreground">Клиентов</p>
              </div>
              <div className="rounded-2xl border border-border bg-card p-6 text-center">
                <p className="font-display text-4xl font-bold text-accent">12</p>
                <p className="mt-2 text-sm text-muted-foreground">Категорий</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-muted/50 py-16 md:py-24">
        <div className="container">
          <div className="grid gap-8 md:grid-cols-2">
            {/* Mission */}
            <div className="rounded-2xl border border-border bg-card p-8">
              <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <Target className="h-7 w-7" />
              </div>
              <h3 className="mb-4 font-display text-2xl font-bold text-foreground">
                {t('about.mission')}
              </h3>
              <p className="text-muted-foreground">
                {t('about.mission_text')}
              </p>
            </div>

            {/* Vision */}
            <div className="rounded-2xl border border-border bg-card p-8">
              <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-accent text-accent-foreground">
                <Eye className="h-7 w-7" />
              </div>
              <h3 className="mb-4 font-display text-2xl font-bold text-foreground">
                {t('about.vision')}
              </h3>
              <p className="text-muted-foreground">
                {t('about.vision_text')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-display text-3xl font-bold text-foreground md:text-4xl">
              Наши ценности
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-border bg-card p-6 text-center transition-all hover:-translate-y-1 hover:shadow-lg">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-500/10">
                <Award className="h-8 w-8 text-blue-500" />
              </div>
              <h3 className="mb-2 font-display text-xl font-semibold text-foreground">
                Качество
              </h3>
              <p className="text-sm text-muted-foreground">
                Мы гарантируем высочайшее качество всех наших продуктов
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6 text-center transition-all hover:-translate-y-1 hover:shadow-lg">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10">
                <Users className="h-8 w-8 text-green-500" />
              </div>
              <h3 className="mb-2 font-display text-xl font-semibold text-foreground">
                Клиентоориентированность
              </h3>
              <p className="text-sm text-muted-foreground">
                Ваш успех - наш приоритет
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6 text-center transition-all hover:-translate-y-1 hover:shadow-lg">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-purple-500/10">
                <Calendar className="h-8 w-8 text-purple-500" />
              </div>
              <h3 className="mb-2 font-display text-xl font-semibold text-foreground">
                Надёжность
              </h3>
              <p className="text-sm text-muted-foreground">
                Мы выполняем свои обязательства в срок
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
