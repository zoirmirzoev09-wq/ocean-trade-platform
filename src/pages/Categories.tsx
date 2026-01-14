import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { categories } from '@/components/home/CategoriesSection';

const Categories = () => {
  const { t } = useLanguage();

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-hero py-20 md:py-28">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-4 font-display text-4xl font-bold text-primary-foreground md:text-5xl">
              {t('categories.title')}
            </h1>
            <p className="text-xl text-primary-foreground/80">
              {t('categories.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category, index) => {
              const Icon = category.icon;
              return (
                <Link
                  key={category.id}
                  to={`/categories/${category.slug}`}
                  className="group relative overflow-hidden rounded-2xl border border-border bg-card p-8 transition-all duration-300 hover:-translate-y-2 hover:border-accent/50 hover:shadow-xl"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className={`mb-6 inline-flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br ${category.color} text-white shadow-lg transition-transform group-hover:scale-110`}>
                    <Icon className="h-8 w-8" />
                  </div>
                  <h3 className="mb-2 font-display text-xl font-semibold text-foreground transition-colors group-hover:text-primary">
                    {t(category.translationKey)}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {t('products.view_details')} →
                  </p>
                  <div className="absolute bottom-0 left-0 h-1 w-0 bg-accent transition-all duration-300 group-hover:w-full" />
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Categories;
