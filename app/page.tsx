import { Header } from "@/components/sections/header";
import { HeroBanners } from "@/components/sections/hero-banners";
import { CategoryBrowser } from "@/components/sections/category-browser";
import { FeaturedBranches } from "@/components/sections/featured-brands";
import { TopSaverToday } from "@/components/sections/top-saver-today";
import { ProductTabsSection } from "@/components/sections/product-tabs-section";
import { Footer } from "@/components/sections/footer";
import {
  getCategories,
  getBrands,
  getBanners,
  getTopSavers,
  getBestSellers,
  getJustLanding,
} from "@/lib/db";

// Ensure dynamic rendering to read from SQLite on request
export const dynamic = "force-dynamic";

export default function Home() {
  const categories = getCategories();
  const brands = getBrands();
  const banners = getBanners();
  const topSavers = getTopSavers();
  const bestSellers = getBestSellers();
  const justLanding = getJustLanding();

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground antialiased selection:bg-amber-400 selection:text-stone-900">
      <Header categories={categories} />

      <main className="flex-1 space-y-2 sm:space-y-4">
        <HeroBanners banners={banners} />
        <CategoryBrowser categories={categories} />
        <FeaturedBranches brands={brands} />
        <TopSaverToday products={topSavers} />
        <ProductTabsSection
          title="Best Seller"
          categories={categories}
          products={bestSellers}
        />
        <ProductTabsSection
          title="Just Landing"
          categories={categories}
          products={justLanding}
        />
      </main>

      <Footer />
    </div>
  );
}
