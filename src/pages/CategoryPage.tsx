import { useParams, Link } from 'react-router-dom';
import { useState, useMemo } from 'react';
import { Layout } from '@/components/layout/Layout';
import { useLanguage, Language } from '@/contexts/LanguageContext';
import { useCart } from '@/contexts/CartContext';
import { categories } from '@/components/home/CategoriesSection';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ShoppingCart, Search, ChevronLeft } from 'lucide-react';
import { toast } from 'sonner';

// Mock products for each category
const generateProducts = (categorySlug: string) => {
  const baseProducts: Record<string, Array<{
    id: string;
    name: { ru: string; tj: string; en: string };
    description: { ru: string; tj: string; en: string };
    price: number;
    image: string;
    inStock: boolean;
  }>> = {
    'water-emulsion': [
      { id: 'we1', name: { ru: 'Водоэмульсия белая 5л', tj: 'Эмулсияи обии сафед 5л', en: 'White Water Emulsion 5L' }, description: { ru: 'Высококачественная водоэмульсионная краска', tj: 'Ранги баландсифати эмулсияи обӣ', en: 'High quality water emulsion paint' }, price: 75, image: '🎨', inStock: true },
      { id: 'we2', name: { ru: 'Водоэмульсия белая 10л', tj: 'Эмулсияи обии сафед 10л', en: 'White Water Emulsion 10L' }, description: { ru: 'Высококачественная водоэмульсионная краска', tj: 'Ранги баландсифати эмулсияи обӣ', en: 'High quality water emulsion paint' }, price: 140, image: '🎨', inStock: true },
      { id: 'we3', name: { ru: 'Водоэмульсия белая 20л', tj: 'Эмулсияи обии сафед 20л', en: 'White Water Emulsion 20L' }, description: { ru: 'Высококачественная водоэмульсионная краска', tj: 'Ранги баландсифати эмулсияи обӣ', en: 'High quality water emulsion paint' }, price: 250, image: '🎨', inStock: true },
      { id: 'we4', name: { ru: 'Водоэмульсия цветная 10л', tj: 'Эмулсияи обии рангӣ 10л', en: 'Colored Water Emulsion 10L' }, description: { ru: 'Водоэмульсионная краска различных цветов', tj: 'Ранги эмулсияи обии рангҳои гуногун', en: 'Water emulsion paint in various colors' }, price: 180, image: '🌈', inStock: true },
      { id: 'we5', name: { ru: 'Водоэмульсия супербелая 20л', tj: 'Эмулсияи обии суперсафед 20л', en: 'Super White Water Emulsion 20L' }, description: { ru: 'Премиум водоэмульсионная краска', tj: 'Ранги премиуми эмулсияи обӣ', en: 'Premium water emulsion paint' }, price: 320, image: '⚪', inStock: false },
    ],
    'decorative-plaster': [
      { id: 'dp1', name: { ru: 'Декоративная штукатурка "Короед" 25кг', tj: 'Андоваи ороишии "Короед" 25кг', en: 'Decorative Plaster "Bark" 25kg' }, description: { ru: 'Структурная штукатурка с эффектом короеда', tj: 'Андоваи структуравӣ бо эффекти короед', en: 'Structural plaster with bark effect' }, price: 180, image: '🏛️', inStock: true },
      { id: 'dp2', name: { ru: 'Декоративная штукатурка "Шуба" 25кг', tj: 'Андоваи ороишии "Шуба" 25кг', en: 'Decorative Plaster "Fur" 25kg' }, description: { ru: 'Структурная штукатурка с эффектом шубы', tj: 'Андоваи структуравӣ бо эффекти шуба', en: 'Structural plaster with fur effect' }, price: 160, image: '🏢', inStock: true },
      { id: 'dp3', name: { ru: 'Венецианская штукатурка 15кг', tj: 'Андоваи венетсиягӣ 15кг', en: 'Venetian Plaster 15kg' }, description: { ru: 'Декоративная штукатурка под мрамор', tj: 'Андоваи ороишии зери мармар', en: 'Decorative marble-like plaster' }, price: 450, image: '✨', inStock: true },
    ],
    'primer': [
      { id: 'pr1', name: { ru: 'Грунтовка глубокого проникновения 5л', tj: 'Грунтовкаи нуфузи амиқ 5л', en: 'Deep Penetration Primer 5L' }, description: { ru: 'Универсальная грунтовка для всех поверхностей', tj: 'Грунтовкаи универсалӣ барои ҳама сатҳҳо', en: 'Universal primer for all surfaces' }, price: 65, image: '🧪', inStock: true },
      { id: 'pr2', name: { ru: 'Грунтовка глубокого проникновения 10л', tj: 'Грунтовкаи нуфузи амиқ 10л', en: 'Deep Penetration Primer 10L' }, description: { ru: 'Универсальная грунтовка для всех поверхностей', tj: 'Грунтовкаи универсалӣ барои ҳама сатҳҳо', en: 'Universal primer for all surfaces' }, price: 120, image: '🧪', inStock: true },
      { id: 'pr3', name: { ru: 'Грунт-концентрат 10л', tj: 'Грунт-консентрат 10л', en: 'Primer Concentrate 10L' }, description: { ru: 'Концентрированная грунтовка 1:5', tj: 'Грунтовкаи консентратсияшуда 1:5', en: 'Concentrated primer 1:5' }, price: 200, image: '🔬', inStock: true },
    ],
    'putty': [
      { id: 'pu1', name: { ru: 'Шпатлёвка стартовая 25кг', tj: 'Шпаклёвкаи оғозӣ 25кг', en: 'Starting Putty 25kg' }, description: { ru: 'Для выравнивания стен и потолков', tj: 'Барои ҳамвор кардани деворҳо ва шифтҳо', en: 'For leveling walls and ceilings' }, price: 85, image: '📦', inStock: true },
      { id: 'pu2', name: { ru: 'Шпатлёвка финишная 25кг', tj: 'Шпаклёвкаи анҷомӣ 25кг', en: 'Finishing Putty 25kg' }, description: { ru: 'Финишная шпатлёвка для гладких поверхностей', tj: 'Шпаклёвкаи анҷомӣ барои сатҳҳои ҳамвор', en: 'Finishing putty for smooth surfaces' }, price: 95, image: '✨', inStock: true },
      { id: 'pu3', name: { ru: 'Шпатлёвка универсальная 20кг', tj: 'Шпаклёвкаи универсалӣ 20кг', en: 'Universal Putty 20kg' }, description: { ru: 'Универсальная шпатлёвка для внутренних работ', tj: 'Шпаклёвкаи универсалӣ барои корҳои дохилӣ', en: 'Universal putty for interior work' }, price: 110, image: '🏠', inStock: true },
    ],
    'tile-adhesive': [
      { id: 'ta1', name: { ru: 'Клей для плитки стандарт 25кг', tj: 'Часби стандартии кафел 25кг', en: 'Standard Tile Adhesive 25kg' }, description: { ru: 'Универсальный клей для керамической плитки', tj: 'Часби универсалии плиткаи керамикӣ', en: 'Universal adhesive for ceramic tiles' }, price: 85, image: '🧱', inStock: true },
      { id: 'ta2', name: { ru: 'Клей для плитки усиленный 25кг', tj: 'Часби мустаҳками кафел 25кг', en: 'Reinforced Tile Adhesive 25kg' }, description: { ru: 'Усиленный клей для керамогранита', tj: 'Часби мустаҳкам барои керамогранит', en: 'Reinforced adhesive for porcelain tiles' }, price: 120, image: '💪', inStock: true },
      { id: 'ta3', name: { ru: 'Клей для плитки для теплого пола 25кг', tj: 'Часби кафел барои фарши гарм 25кг', en: 'Tile Adhesive for Heated Floor 25kg' }, description: { ru: 'Эластичный клей для теплых полов', tj: 'Часби чандир барои фаршҳои гарм', en: 'Elastic adhesive for heated floors' }, price: 150, image: '🔥', inStock: true },
    ],
    'rodband': [
      { id: 'rb1', name: { ru: 'Ротбанд гипсовый 30кг', tj: 'Ротбанди гипсӣ 30кг', en: 'Gypsum Rodband 30kg' }, description: { ru: 'Гипсовая штукатурка для внутренних работ', tj: 'Андоваи гипсӣ барои корҳои дохилӣ', en: 'Gypsum plaster for interior work' }, price: 145, image: '📦', inStock: true },
      { id: 'rb2', name: { ru: 'Ротбанд универсальный 25кг', tj: 'Ротбанди универсалӣ 25кг', en: 'Universal Rodband 25kg' }, description: { ru: 'Универсальная гипсовая штукатурка', tj: 'Андоваи универсалии гипсӣ', en: 'Universal gypsum plaster' }, price: 130, image: '🏗️', inStock: true },
    ],
    'sand': [
      { id: 'sa1', name: { ru: 'Песок речной мешок 50кг', tj: 'Реги дарёӣ халта 50кг', en: 'River Sand Bag 50kg' }, description: { ru: 'Очищенный речной песок', tj: 'Реги тозакардашудаи дарёӣ', en: 'Cleaned river sand' }, price: 35, image: '⏳', inStock: true },
      { id: 'sa2', name: { ru: 'Песок карьерный мешок 50кг', tj: 'Реги карерӣ халта 50кг', en: 'Quarry Sand Bag 50kg' }, description: { ru: 'Карьерный песок для строительства', tj: 'Реги карерӣ барои сохтмон', en: 'Quarry sand for construction' }, price: 25, image: '🏔️', inStock: true },
    ],
    'acrylic-glue': [
      { id: 'ag1', name: { ru: 'Акриловый клей универсальный 3кг', tj: 'Часби универсалии акрилӣ 3кг', en: 'Universal Acrylic Glue 3kg' }, description: { ru: 'Универсальный акриловый клей', tj: 'Часби универсалии акрилӣ', en: 'Universal acrylic glue' }, price: 120, image: '🧴', inStock: true },
      { id: 'ag2', name: { ru: 'Акриловый клей для обоев 5кг', tj: 'Часби акрилии қоғази девор 5кг', en: 'Acrylic Wallpaper Glue 5kg' }, description: { ru: 'Специальный клей для виниловых обоев', tj: 'Часби махсус барои қоғази девории винилӣ', en: 'Special glue for vinyl wallpaper' }, price: 85, image: '📜', inStock: true },
    ],
    'atlas': [
      { id: 'at1', name: { ru: 'Атлас клей для плитки 25кг', tj: 'Атлас часби кафел 25кг', en: 'Atlas Tile Adhesive 25kg' }, description: { ru: 'Профессиональный клей Атлас', tj: 'Часби касбии Атлас', en: 'Professional Atlas adhesive' }, price: 95, image: '🔷', inStock: true },
      { id: 'at2', name: { ru: 'Атлас затирка белая 2кг', tj: 'Атлас затирка сафед 2кг', en: 'Atlas White Grout 2kg' }, description: { ru: 'Затирка для плитки белая', tj: 'Затиркаи сафеди кафел', en: 'White tile grout' }, price: 45, image: '⚪', inStock: true },
    ],
    'bilivet': [
      { id: 'bi1', name: { ru: 'Биливет для стен 25кг', tj: 'Биливет барои деворҳо 25кг', en: 'Bilivet for Walls 25kg' }, description: { ru: 'Декоративное покрытие Биливет', tj: 'Пӯшиши ороишии Биливет', en: 'Bilivet decorative coating' }, price: 200, image: '🎨', inStock: true },
    ],
    'beton-contact': [
      { id: 'bc1', name: { ru: 'Бетон контакт 10л', tj: 'Бетон контакт 10л', en: 'Beton Contact 10L' }, description: { ru: 'Грунтовка для бетонных поверхностей', tj: 'Грунтовка барои сатҳҳои бетонӣ', en: 'Primer for concrete surfaces' }, price: 180, image: '🧱', inStock: true },
      { id: 'bc2', name: { ru: 'Бетон контакт 20л', tj: 'Бетон контакт 20л', en: 'Beton Contact 20L' }, description: { ru: 'Грунтовка для бетонных поверхностей', tj: 'Грунтовка барои сатҳҳои бетонӣ', en: 'Primer for concrete surfaces' }, price: 320, image: '🧱', inStock: true },
    ],
    'other': [
      { id: 'ot1', name: { ru: 'Сетка армирующая 1м', tj: 'Торҳои мустаҳкамкунанда 1м', en: 'Reinforcing Mesh 1m' }, description: { ru: 'Сетка для армирования штукатурки', tj: 'Торҳо барои мустаҳкам кардани андова', en: 'Mesh for plaster reinforcement' }, price: 50, image: '🔲', inStock: true },
      { id: 'ot2', name: { ru: 'Маяки штукатурные 3м', tj: 'Маякҳои андова 3м', en: 'Plaster Beacons 3m' }, description: { ru: 'Маяки для выравнивания стен', tj: 'Маякҳо барои ҳамвор кардани деворҳо', en: 'Beacons for wall leveling' }, price: 15, image: '📏', inStock: true },
      { id: 'ot3', name: { ru: 'Уголок перфорированный 3м', tj: 'Кунҷи перфорациягӣ 3м', en: 'Perforated Corner 3m' }, description: { ru: 'Уголок для защиты углов', tj: 'Кунҷ барои ҳифзи кунҷҳо', en: 'Corner for angle protection' }, price: 25, image: '📐', inStock: true },
    ],
  };

  return baseProducts[categorySlug] || [];
};

const CategoryPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { t, language } = useLanguage();
  const { addItem } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('name');

  const category = categories.find(c => c.slug === slug);
  const products = generateProducts(slug || '');

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Filter by search
    if (searchQuery) {
      result = result.filter(p => 
        p.name[language as Language].toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sort
    result.sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      return a.name[language as Language].localeCompare(b.name[language as Language]);
    });

    return result;
  }, [products, searchQuery, sortBy, language]);

  const handleAddToCart = (product: typeof products[0]) => {
    addItem({
      id: product.id,
      name: product.name[language as Language],
      price: product.price,
      image: product.image,
    });
    toast.success(`${product.name[language as Language]} ${t('products.add_to_cart')}`);
  };

  if (!category) {
    return (
      <Layout>
        <div className="container py-20 text-center">
          <h1 className="mb-4 font-display text-2xl font-bold">Category not found</h1>
          <Link to="/categories">
            <Button>
              <ChevronLeft className="mr-2 h-4 w-4" />
              {t('common.back')}
            </Button>
          </Link>
        </div>
      </Layout>
    );
  }

  const Icon = category.icon;

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-hero py-16 md:py-20">
        <div className="container">
          <Link to="/categories" className="mb-6 inline-flex items-center text-sm text-primary-foreground/70 transition-colors hover:text-primary-foreground">
            <ChevronLeft className="mr-1 h-4 w-4" />
            {t('common.back')}
          </Link>
          <div className="flex items-center gap-4">
            <div className={`flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br ${category.color} text-white shadow-lg`}>
              <Icon className="h-8 w-8" />
            </div>
            <h1 className="font-display text-3xl font-bold text-primary-foreground md:text-4xl">
              {t(category.translationKey)}
            </h1>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-12 md:py-16">
        <div className="container">
          {/* Filters */}
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative flex-1 sm:max-w-xs">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder={t('products.search')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder={t('products.sort_by')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">{t('products.sort_name')}</SelectItem>
                <SelectItem value="price-asc">{t('products.sort_price_asc')}</SelectItem>
                <SelectItem value="price-desc">{t('products.sort_price_desc')}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Products Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="group overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="relative flex h-40 items-center justify-center bg-muted/50 text-5xl transition-transform group-hover:scale-105">
                    {product.image}
                    {!product.inStock && (
                      <div className="absolute inset-0 flex items-center justify-center bg-background/80">
                        <span className="rounded-full bg-destructive/10 px-3 py-1 text-sm font-medium text-destructive">
                          {t('products.out_of_stock')}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="mb-1 line-clamp-2 font-display text-lg font-semibold text-foreground">
                      {product.name[language as Language]}
                    </h3>
                    <p className="mb-3 line-clamp-2 text-sm text-muted-foreground">
                      {product.description[language as Language]}
                    </p>
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
          ) : (
            <div className="py-12 text-center">
              <p className="text-muted-foreground">No products found</p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default CategoryPage;
