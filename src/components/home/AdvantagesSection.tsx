import { Award, Truck, HeadphonesIcon, BadgePercent } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const advantages = [
  {
    icon: Award,
    titleKey: 'advantages.quality',
    descKey: 'advantages.quality_desc',
    color: 'text-blue-500',
    bg: 'bg-blue-500/10',
  },
  {
    icon: BadgePercent,
    titleKey: 'advantages.price',
    descKey: 'advantages.price_desc',
    color: 'text-green-500',
    bg: 'bg-green-500/10',
  },
  {
    icon: Truck,
    titleKey: 'advantages.delivery',
    descKey: 'advantages.delivery_desc',
    color: 'text-orange-500',
    bg: 'bg-orange-500/10',
  },
  {
    icon: HeadphonesIcon,
    titleKey: 'advantages.support',
    descKey: 'advantages.support_desc',
    color: 'text-purple-500',
    bg: 'bg-purple-500/10',
  },
];

export const AdvantagesSection = () => {
  const { t } = useLanguage();

  return (
    <section className="bg-muted/50 py-16 md:py-24">
      <div className="container">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <h2 className="mb-4 font-display text-3xl font-bold text-foreground md:text-4xl">
            {t('advantages.title')}
          </h2>
        </div>

        {/* Advantages Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {advantages.map((advantage, index) => {
            const Icon = advantage.icon;
            return (
              <div
                key={index}
                className="group rounded-2xl border border-border bg-card p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className={`mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full ${advantage.bg} transition-transform group-hover:scale-110`}>
                  <Icon className={`h-8 w-8 ${advantage.color}`} />
                </div>
                <h3 className="mb-2 font-display text-xl font-semibold text-foreground">
                  {t(advantage.titleKey)}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {t(advantage.descKey)}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
