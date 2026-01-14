import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-border bg-card">
      <div className="container py-12 md:py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Company Info */}
          <div>
            <Link to="/" className="mb-4 flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-primary">
                <span className="font-display text-xl font-bold text-primary-foreground">О</span>
              </div>
              <div>
                <span className="font-display text-xl font-bold text-foreground">Океан</span>
                <span className="ml-1 text-xs text-muted-foreground">Ҷ.Д.Д.М</span>
              </div>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              {t('hero.subtitle')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4 font-display text-lg font-semibold text-foreground">
              {t('nav.categories')}
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/categories/water-emulsion" className="text-muted-foreground transition-colors hover:text-foreground">
                  {t('categories.water_emulsion')}
                </Link>
              </li>
              <li>
                <Link to="/categories/decorative-plaster" className="text-muted-foreground transition-colors hover:text-foreground">
                  {t('categories.decorative_plaster')}
                </Link>
              </li>
              <li>
                <Link to="/categories/primer" className="text-muted-foreground transition-colors hover:text-foreground">
                  {t('categories.primer')}
                </Link>
              </li>
              <li>
                <Link to="/categories/putty" className="text-muted-foreground transition-colors hover:text-foreground">
                  {t('categories.putty')}
                </Link>
              </li>
              <li>
                <Link to="/categories" className="font-medium text-accent transition-colors hover:text-accent/80">
                  {t('categories.view_all')} →
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="mb-4 font-display text-lg font-semibold text-foreground">
              {t('footer.company')}
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/about" className="text-muted-foreground transition-colors hover:text-foreground">
                  {t('nav.about')}
                </Link>
              </li>
              <li>
                <Link to="/contacts" className="text-muted-foreground transition-colors hover:text-foreground">
                  {t('nav.contacts')}
                </Link>
              </li>
              <li>
                <Link to="/account" className="text-muted-foreground transition-colors hover:text-foreground">
                  {t('nav.account')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="mb-4 font-display text-lg font-semibold text-foreground">
              {t('contacts.title')}
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 h-4 w-4 text-accent" />
                <div>
                  <p className="text-foreground">+992 93 123 45 67</p>
                  <p className="text-foreground">+992 92 765 43 21</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 h-4 w-4 text-accent" />
                <span className="text-muted-foreground">info@ocean.tj</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 text-accent" />
                <span className="text-muted-foreground">Душанбе, ул. Рудаки 45</span>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="mt-0.5 h-4 w-4 text-accent" />
                <span className="text-muted-foreground">Пн-Сб: 08:00 - 18:00</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-border pt-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} {t('footer.company')}. {t('footer.rights')}.
            </p>
            <div className="flex items-center gap-4">
              <span className="text-xs text-muted-foreground">
                Made with ❤️ in Tajikistan
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
