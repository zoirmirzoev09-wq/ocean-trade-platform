import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCart } from '@/contexts/CartContext';
import { toast } from 'sonner';

// Sample products for display
const sampleProducts = [
  {
    id: 'p1',
    name: { ru: 'Водоэмульсия белая 20л', tj: 'Эмулсияи обии сафед 20л', en: 'White Water Emulsion 20L' },
    price: 250,
    image: '🎨',
    category: 'water-emulsion',
    inStock: true,
  },
  {
    id: 'p2',
    name: { ru: 'Декоративная штукатурка "Короед"', tj: 'Андоваи ороишии "Короед"', en: 'Decorative Plaster "Bark"' },
    price: 180,
    image: '🏛️',
    category: 'decorative-plaster',
    inStock: true,
  },
  {
    id: 'p3',
    name: { ru: 'Грунтовка глубокого проникновения', tj: 'Грунтовкаи нуфузи амиқ', en: 'Deep Penetration Primer' },
    price: 120,
    image: '🧪',
    category: 'primer',
    inStock: true,
  },
  {
    id: 'p4',
    name: { ru: 'Шпатлёвка финишная', tj: 'Шпаклёвкаи анҷомӣ', en: 'Finishing Putty' },
    price: 95,
    image: '✨',
    category: 'putty',
    inStock: true,
  },
  {
    id: 'p5',
    name: { ru: 'Клей для плитки универсальный', tj: 'Часби универсалии кафел', en: 'Universal Tile Adhesive' },
    price: 85,
    image: '🧱',
    category: 'tile-adhesive',
    inStock: true,
  },
  {
    id: 'p6',
    name: { ru: 'Ротбанд гипсовый 30кг', tj: 'Ротбанди гипсӣ 30кг', en: 'Gypsum Rodband 30kg' },
    price: 145,
    image: '📦',
    category: 'rodband',
    inStock: false,
  },
];

export const ProductsSection = () => {
  const { t, language } = useLanguage();
  const { addItem } = useCart();

  const handleAddToCart = (product: typeof sampleProducts[0]) => {
    addItem({
      id: product.id,
      name: product.name[language],
      price: product.price,
      image: product.image,
    });
    toast.success(`${product.name[language]} ${t('products.add_to_cart')}`);
  };

  return (
    <section className="py-16 md:py-24">
      <div className="container">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <h2 className="mb-4 font-display text-3xl font-bold text-foreground md:text-4xl">
            {t('products.title')}
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            {t('products.subtitle')}
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sampleProducts.map((product, index) => (
            <div
              key={product.id}
              className="group overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Product Image */}
              <div className="relative flex h-48 items-center justify-center bg-muted/50 text-6xl transition-transform group-hover:scale-105">
                {product.image}
                {!product.inStock && (
                  <div className="absolute inset-0 flex items-center justify-center bg-background/80">
                    <span className="rounded-full bg-destructive/10 px-3 py-1 text-sm font-medium text-destructive">
                      {t('products.out_of_stock')}
                    </span>
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="p-4">
                <h3 className="mb-2 line-clamp-2 font-display text-lg font-semibold text-foreground">
                  {product.name[language]}
                </h3>
                
                <div className="mb-4 flex items-center justify-between">
                  <p className="font-display text-xl font-bold text-accent">
                    {product.price} <span className="text-sm font-normal">{t('common.currency')}</span>
                  </p>
                  {product.inStock && (
                    <span className="rounded-full bg-success/10 px-2 py-0.5 text-xs font-medium text-success">
                      {t('products.in_stock')}
                    </span>
                  )}
                </div>

                <Button
                  onClick={() => handleAddToCart(product)}
                  disabled={!product.inStock}
                  className="w-full"
                  variant={product.inStock ? 'default' : 'secondary'}
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  {t('products.add_to_cart')}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
