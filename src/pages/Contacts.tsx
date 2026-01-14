import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

const Contacts = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast.success(t('common.success'));
    setFormData({ name: '', email: '', message: '' });
    setIsSubmitting(false);
  };

  const contactInfo = [
    {
      icon: Phone,
      label: t('contacts.phone'),
      values: ['+992 93 123 45 67', '+992 92 765 43 21'],
    },
    {
      icon: Mail,
      label: t('contacts.email'),
      values: ['info@ocean.tj', 'sales@ocean.tj'],
    },
    {
      icon: MapPin,
      label: t('contacts.address'),
      values: ['Республика Таджикистан', 'г. Душанбе, ул. Рудаки 45'],
    },
    {
      icon: Clock,
      label: t('contacts.hours'),
      values: ['Понедельник - Суббота', '08:00 - 18:00'],
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-hero py-20 md:py-28">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-4 font-display text-4xl font-bold text-primary-foreground md:text-5xl">
              {t('contacts.title')}
            </h1>
            <p className="text-xl text-primary-foreground/80">
              {t('contacts.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Contact Info */}
            <div>
              <h2 className="mb-8 font-display text-2xl font-bold text-foreground">
                {t('contacts.subtitle')}
              </h2>

              <div className="space-y-6">
                {contactInfo.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={index}
                      className="flex items-start gap-4 rounded-xl border border-border bg-card p-4 transition-all hover:-translate-y-0.5 hover:shadow-md"
                    >
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-accent/10">
                        <Icon className="h-6 w-6 text-accent" />
                      </div>
                      <div>
                        <h3 className="mb-1 font-semibold text-foreground">{item.label}</h3>
                        {item.values.map((value, i) => (
                          <p key={i} className="text-muted-foreground">{value}</p>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Map Placeholder */}
              <div className="mt-8 overflow-hidden rounded-xl border border-border bg-muted">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d49366.97975387612!2d68.73443454378!3d38.55996369326!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38b5d16b84c0a5f9%3A0x4bf5e3a8f4e3f5a7!2sDushanbe%2C%20Tajikistan!5e0!3m2!1sen!2sus!4v1640000000000!5m2!1sen!2sus"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Location Map"
                />
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <div className="rounded-2xl border border-border bg-card p-8">
                <h2 className="mb-6 font-display text-2xl font-bold text-foreground">
                  {t('contacts.form_title')}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="mb-2 block text-sm font-medium text-foreground">
                      {t('contacts.form_name')}
                    </label>
                    <Input
                      id="name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="w-full"
                      placeholder={t('contacts.form_name')}
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="mb-2 block text-sm font-medium text-foreground">
                      {t('contacts.form_email')}
                    </label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="w-full"
                      placeholder="email@example.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="mb-2 block text-sm font-medium text-foreground">
                      {t('contacts.form_message')}
                    </label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                      className="min-h-[150px] w-full"
                      placeholder={t('contacts.form_message')}
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? (
                      t('common.loading')
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        {t('contacts.form_send')}
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contacts;
