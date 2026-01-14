import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';

const Cart = () => {
  const { t } = useLanguage();
  const { items, updateQuantity, removeItem, totalPrice, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <Layout>
        <div className="container flex min-h-[60vh] flex-col items-center justify-center py-20">
          <ShoppingBag className="mb-6 h-24 w-24 text-muted-foreground/30" />
          <h1 className="mb-4 font-display text-2xl font-bold text-foreground">
            {t('nav.cart')} пуста
          </h1>
          <p className="mb-8 text-muted-foreground">
            Добавьте товары для оформления заказа
          </p>
          <Link to="/categories">
            <Button size="lg">
              {t('hero.cta')}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="py-12 md:py-16">
        <div className="container">
          <h1 className="mb-8 font-display text-3xl font-bold text-foreground md:text-4xl">
            {t('nav.cart')}
          </h1>

          <div className="grid gap-8 lg:grid-cols-3">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 rounded-xl border border-border bg-card p-4 transition-all hover:shadow-md"
                  >
                    <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-lg bg-muted text-3xl">
                      {item.image || '📦'}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-display font-semibold text-foreground">{item.name}</h3>
                      <p className="text-lg font-bold text-accent">
                        {item.price} {t('common.currency')}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-8 text-center font-medium">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="w-24 text-right font-display text-lg font-bold text-foreground">
                      {item.price * item.quantity} {t('common.currency')}
                    </p>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                      onClick={() => removeItem(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex justify-end">
                <Button variant="outline" onClick={clearCart}>
                  Очистить корзину
                </Button>
              </div>
            </div>

            {/* Order Summary */}
            <div>
              <div className="sticky top-24 rounded-2xl border border-border bg-card p-6">
                <h2 className="mb-6 font-display text-xl font-bold text-foreground">
                  Итого
                </h2>
                
                <div className="mb-6 space-y-3">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Товары ({items.length})</span>
                    <span>{totalPrice} {t('common.currency')}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Доставка</span>
                    <span>Бесплатно</span>
                  </div>
                  <div className="border-t border-border pt-3">
                    <div className="flex justify-between">
                      <span className="font-display text-lg font-bold text-foreground">К оплате</span>
                      <span className="font-display text-xl font-bold text-accent">
                        {totalPrice} {t('common.currency')}
                      </span>
                    </div>
                  </div>
                </div>

                <Button className="w-full" size="lg">
                  Оформить заказ
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>

                <p className="mt-4 text-center text-xs text-muted-foreground">
                  Для оформления заказа необходимо войти в аккаунт
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Cart;
