import { Layout } from '@/components/layout/Layout';
import { HeroSection } from '@/components/home/HeroSection';
import { CategoriesSection } from '@/components/home/CategoriesSection';
import { AdvantagesSection } from '@/components/home/AdvantagesSection';
import { ProductsSection } from '@/components/home/ProductsSection';
import { CTASection } from '@/components/home/CTASection';

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <CategoriesSection />
      <AdvantagesSection />
      <ProductsSection />
      <CTASection />
    </Layout>
  );
};

export default Index;
