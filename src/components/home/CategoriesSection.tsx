import { Link } from 'react-router-dom';
import { Droplets, Paintbrush, Layers, Package, Shield, Hammer, Grid3x3, Mountain, Sparkles, CircleDot, Wrench, MoreHorizontal } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface Category {
  id: string;
  slug: string;
  translationKey: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

const categories: Category[] = [
  { id: '1', slug: 'water-emulsion', translationKey: 'categories.water_emulsion', icon: Droplets, color: 'from-blue-500 to-cyan-400' },
  { id: '2', slug: 'decorative-plaster', translationKey: 'categories.decorative_plaster', icon: Paintbrush, color: 'from-purple-500 to-pink-400' },
  { id: '3', slug: 'atlas', translationKey: 'categories.atlas', icon: Layers, color: 'from-indigo-500 to-blue-400' },
  { id: '4', slug: 'bilivet', translationKey: 'categories.bilivet', icon: Package, color: 'from-teal-500 to-green-400' },
  { id: '5', slug: 'beton-contact', translationKey: 'categories.beton_contact', icon: Shield, color: 'from-gray-500 to-slate-400' },
  { id: '6', slug: 'primer', translationKey: 'categories.primer', icon: CircleDot, color: 'from-amber-500 to-yellow-400' },
  { id: '7', slug: 'putty', translationKey: 'categories.putty', icon: Sparkles, color: 'from-rose-500 to-orange-400' },
  { id: '8', slug: 'tile-adhesive', translationKey: 'categories.tile_adhesive', icon: Grid3x3, color: 'from-emerald-500 to-teal-400' },
  { id: '9', slug: 'rodband', translationKey: 'categories.rodband', icon: Hammer, color: 'from-red-500 to-rose-400' },
  { id: '10', slug: 'sand', translationKey: 'categories.sand', icon: Mountain, color: 'from-yellow-500 to-amber-400' },
  { id: '11', slug: 'acrylic-glue', translationKey: 'categories.acrylic_glue', icon: Wrench, color: 'from-cyan-500 to-blue-400' },
  { id: '12', slug: 'other', translationKey: 'categories.other', icon: MoreHorizontal, color: 'from-slate-500 to-gray-400' },
];

export const CategoriesSection = () => {
  const { t } = useLanguage();

  return (
    <section className="py-16 md:py-24">
      <div className="container">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <h2 className="mb-4 font-display text-3xl font-bold text-foreground md:text-4xl">
            {t('categories.title')}
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            {t('categories.subtitle')}
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <Link
                key={category.id}
                to={`/categories/${category.slug}`}
                className="group relative overflow-hidden rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/50 hover:shadow-lg"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br ${category.color} text-white shadow-md transition-transform group-hover:scale-110`}>
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground transition-colors group-hover:text-primary">
                  {t(category.translationKey)}
                </h3>
                <div className="absolute bottom-0 left-0 h-1 w-0 bg-accent transition-all duration-300 group-hover:w-full" />
              </Link>
            );
          })}
        </div>

        {/* View All Link */}
        <div className="mt-12 text-center">
          <Link
            to="/categories"
            className="inline-flex items-center gap-2 font-medium text-accent transition-colors hover:text-accent/80"
          >
            {t('categories.view_all')}
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export { categories };
