"use client";

import * as React from "react";
import Link from "next/link";
import {
  ShoppingCart,
  Zap,
  Truck,
  ShieldCheck,
  RotateCcw,
  Leaf,
  MapPin,
  Clock,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
} from "lucide-react";
import { Product, Category } from "@/lib/db";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Rating } from "@/components/ui/rating";
import { QuantityInput } from "@/components/ui/quantity-input";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ProductGallery } from "@/components/ui/product-gallery";
import { ReviewSummary } from "@/components/ui/review-summary";
import { ProductThumbnail } from "@/components/ui/product-thumbnail";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export interface ProductDetailViewProps {
  product: Product;
  category: Category | null;
  relatedProducts: Product[];
}

export function ProductDetailView({
  product,
  category,
  relatedProducts,
}: ProductDetailViewProps) {
  const [quantity, setQuantity] = React.useState(1);
  const [selectedVariant, setSelectedVariant] = React.useState("standard");
  const [zipCode, setZipCode] = React.useState("98101");
  const [isCheckingZip, setIsCheckingZip] = React.useState(false);
  const [zipStatus, setZipStatus] = React.useState<string | null>(
    "Free 2-Hour Delivery Available"
  );

  const variants = [
    { id: "standard", label: "Standard Pack", multiplier: 1.0, hint: "Regular Size" },
    { id: "family", label: "Family Pack", multiplier: 2.6, hint: "Save 10%" },
    { id: "bulk", label: "Bulk Case (3x)", multiplier: 4.8, hint: "Save 15%" },
  ];

  const currentMultiplier =
    variants.find((v) => v.id === selectedVariant)?.multiplier || 1.0;
  const currentPrice = product.price * currentMultiplier;
  const originalPrice = product.originalPrice
    ? product.originalPrice * currentMultiplier
    : undefined;
  const totalPrice = (currentPrice * quantity).toFixed(2);

  const discountPercent = originalPrice
    ? Math.round(((originalPrice - currentPrice) / originalPrice) * 100)
    : null;

  const stockPercent = product.totalStock
    ? Math.min(100, Math.round(((product.soldCount || 10) / product.totalStock) * 100))
    : 65;

  const handleAddToCart = () => {
    toast.success(`Added ${quantity}x to shopping cart!`, {
      description: `${product.title} (${variants.find((v) => v.id === selectedVariant)?.label}) • $${totalPrice}`,
    });
  };

  const handleBuyNow = () => {
    toast.success("Proceeding to Express Checkout", {
      description: `Checkout for ${quantity}x ${product.title} ($${totalPrice})`,
    });
  };

  const handleCheckZip = (e: React.FormEvent) => {
    e.preventDefault();
    if (!zipCode.trim()) return;
    setIsCheckingZip(true);
    setTimeout(() => {
      setIsCheckingZip(false);
      setZipStatus(`Delivery slot open: Today by 5:30 PM to ${zipCode}`);
      toast.success(`Delivery available in ZIP ${zipCode}!`);
    }, 400);
  };

  return (
    <div className="container mx-auto px-4 py-6 space-y-8">
      {/* Breadcrumb Navigation */}
      <Breadcrumb className="text-xs">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          {category && (
            <>
              <BreadcrumbItem>
                <BreadcrumbLink href={`/#${category.slug}`}>
                  {category.name}
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
            </>
          )}
          <BreadcrumbItem>
            <span className="text-muted-foreground font-semibold uppercase text-[11px]">
              {product.brand}
            </span>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="font-bold text-foreground line-clamp-1 max-w-[200px] sm:max-w-md">
              {product.title}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Main 2-Column Product Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Column: Gallery & Trust Perks */}
        <div className="lg:col-span-6 space-y-6">
          <ProductGallery
            title={product.title}
            brand={product.brand}
            categorySlug={product.categorySlug}
            badge={product.badge}
            price={currentPrice}
            originalPrice={originalPrice}
          />

          {/* Value Props & Trust Badges */}
          <div className="grid grid-cols-2 gap-3 p-4 rounded-2xl border border-border/80 bg-muted/20 dark:bg-muted/40">
            <div className="flex items-start gap-3 p-2">
              <div className="h-8 w-8 rounded-xl bg-amber-400/20 text-amber-700 dark:text-amber-400 flex items-center justify-center shrink-0">
                <Truck className="h-4 w-4" />
              </div>
              <div className="space-y-0.5">
                <p className="text-xs font-bold text-foreground">Cold-Chain Delivery</p>
                <p className="text-[11px] text-muted-foreground">Chilled vans maintain 4°C freshness.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-2">
              <div className="h-8 w-8 rounded-xl bg-emerald-400/20 text-emerald-700 dark:text-emerald-400 flex items-center justify-center shrink-0">
                <Leaf className="h-4 w-4" />
              </div>
              <div className="space-y-0.5">
                <p className="text-xs font-bold text-foreground">100% Organic Direct</p>
                <p className="text-[11px] text-muted-foreground">Certified organic partner farms.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-2">
              <div className="h-8 w-8 rounded-xl bg-blue-400/20 text-blue-700 dark:text-blue-400 flex items-center justify-center shrink-0">
                <ShieldCheck className="h-4 w-4" />
              </div>
              <div className="space-y-0.5">
                <p className="text-xs font-bold text-foreground">Quality Guarantee</p>
                <p className="text-[11px] text-muted-foreground">Instant refund if not 100% satisfied.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-2">
              <div className="h-8 w-8 rounded-xl bg-purple-400/20 text-purple-700 dark:text-purple-400 flex items-center justify-center shrink-0">
                <RotateCcw className="h-4 w-4" />
              </div>
              <div className="space-y-0.5">
                <p className="text-xs font-bold text-foreground">Contactless Drop-off</p>
                <p className="text-[11px] text-muted-foreground">Insulated bags keep items safe.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Title, Pricing, Variants & Purchase Actions */}
        <div className="lg:col-span-6 space-y-6">
          {/* Brand & Stock Status Header */}
          <div className="space-y-2">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <Link
                href={`/#brand-${product.brand}`}
                className="text-xs font-extrabold uppercase tracking-wider text-amber-600 dark:text-amber-400 hover:underline"
              >
                {product.brand}
              </Link>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>In Stock & Ready to Ship</span>
              </div>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-foreground tracking-tight leading-tight">
              {product.title}
            </h1>

            {/* Rating & Reviews Bar */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <div className="flex items-center gap-1.5">
                <Rating value={product.rating} readOnly size="sm" />
                <span className="text-xs font-bold text-foreground">{product.rating.toFixed(1)}</span>
              </div>
              <span className="text-muted-foreground text-xs">•</span>
              <a href="#reviews" className="text-xs font-semibold text-muted-foreground hover:text-foreground hover:underline">
                {product.reviewCount} customer reviews
              </a>
              <span className="text-muted-foreground text-xs">•</span>
              <span className="text-xs text-muted-foreground font-mono">
                SKU: FM-{product.id.toUpperCase()}
              </span>
            </div>
          </div>

          <Separator className="border-border/60" />

          {/* Pricing Box */}
          <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/60 dark:bg-muted/40 border border-amber-200/60 dark:border-border space-y-2">
            <div className="flex items-baseline gap-3">
              <span className="text-3xl sm:text-4xl font-black text-foreground tracking-tight">
                {product.currency}{currentPrice.toFixed(2)}
              </span>
              {originalPrice && (
                <span className="text-base sm:text-lg text-muted-foreground line-through font-semibold">
                  {product.currency}{originalPrice.toFixed(2)}
                </span>
              )}
              {discountPercent && (
                <Badge className="bg-amber-400 hover:bg-amber-500 text-stone-900 font-black text-xs uppercase px-2 py-0.5 border-0">
                  SAVE {discountPercent}%
                </Badge>
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              Prices inclusive of all regional farm taxes. Free insulated shipping on orders over $35.
            </p>
          </div>

          {/* Stock Urgency Meter */}
          {product.totalStock && (
            <div className="space-y-1.5 p-3.5 rounded-xl border border-border/70 bg-card">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-foreground">
                  Stock Availability:{" "}
                  <span className="text-amber-600 dark:text-amber-400">
                    {product.totalStock - (product.soldCount || 10)} items left
                  </span>
                </span>
                <span className="text-muted-foreground text-[11px] font-mono">
                  {stockPercent}% claimed
                </span>
              </div>
              <Progress value={stockPercent} className="h-2 bg-muted" />
            </div>
          )}

          {/* Package Size / Weight Variants */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-foreground uppercase tracking-wider">
                Select Package Option
              </label>
              <span className="text-[11px] text-muted-foreground">Standard 1-Day Freshness</span>
            </div>
            <div className="grid grid-cols-3 gap-2.5">
              {variants.map((v) => {
                const isSelected = selectedVariant === v.id;
                const vPrice = (product.price * v.multiplier).toFixed(2);
                return (
                  <button
                    key={v.id}
                    type="button"
                    onClick={() => setSelectedVariant(v.id)}
                    className={cn(
                      "p-3 rounded-xl border text-left transition-all cursor-pointer bg-background relative",
                      isSelected
                        ? "border-amber-400 bg-amber-50/70 dark:bg-muted/60 ring-2 ring-amber-400/40 shadow-xs"
                        : "border-border/70 hover:bg-muted/40"
                    )}
                  >
                    <div className="text-xs font-black text-foreground">{v.label}</div>
                    <div className="text-xs font-bold text-amber-600 dark:text-amber-400 mt-0.5">
                      ${vPrice}
                    </div>
                    <div className="text-[10px] text-muted-foreground mt-0.5">{v.hint}</div>
                    {isSelected && (
                      <CheckCircle2 className="h-3.5 w-3.5 text-amber-500 absolute top-2 right-2" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quantity & CTA Buttons */}
          <div className="space-y-3 pt-2">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              {/* Quantity Stepper */}
              <div className="flex items-center justify-between sm:justify-start gap-3 p-1 rounded-xl border border-border/80 bg-background shrink-0">
                <span className="text-xs font-bold text-muted-foreground pl-3 hidden sm:inline">
                  Qty:
                </span>
                <QuantityInput
                  value={quantity}
                  min={1}
                  max={20}
                  onChange={setQuantity}
                />
              </div>

              {/* Primary Add to Cart Button */}
              <Button
                type="button"
                size="lg"
                onClick={handleAddToCart}
                className="flex-1 bg-amber-400 hover:bg-amber-500 text-stone-900 font-black text-sm sm:text-base h-12 rounded-xl shadow-xs gap-2 transition-all"
              >
                <ShoppingCart className="h-5 w-5" />
                <span>Add to Basket • ${totalPrice}</span>
              </Button>
            </div>

            {/* Buy Now Button */}
            <Button
              type="button"
              variant="secondary"
              size="lg"
              onClick={handleBuyNow}
              className="w-full font-bold text-sm h-11 rounded-xl gap-2 border border-border hover:bg-muted"
            >
              <Zap className="h-4 w-4 text-amber-500" />
              <span>Instant Buy with Express Checkout</span>
            </Button>
          </div>

          {/* Delivery Postal Code Checker */}
          <div className="p-4 rounded-xl border border-border/70 bg-muted/20 space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-bold text-foreground">
              <MapPin className="h-4 w-4 text-amber-600 dark:text-amber-400" />
              <span>Check Delivery Availability</span>
            </div>
            <form onSubmit={handleCheckZip} className="flex gap-2">
              <input
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
                placeholder="Enter ZIP code (e.g. 98101)"
                className="flex h-9 w-full rounded-xl border border-input bg-background px-3 py-1 text-xs shadow-2xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
              />
              <Button
                type="submit"
                variant="outline"
                size="sm"
                disabled={isCheckingZip}
                className="rounded-xl px-4 text-xs font-bold shrink-0"
              >
                {isCheckingZip ? "Checking..." : "Verify"}
              </Button>
            </form>
            {zipStatus && (
              <p className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="h-3 w-3 shrink-0" />
                {zipStatus}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Tabs: Description, Nutrition, Reviews & Delivery */}
      <section id="reviews" className="pt-8">
        <Tabs defaultValue="description" className="w-full space-y-6">
          <TabsList className="w-full justify-start overflow-x-auto h-12 bg-muted/40 p-1 rounded-2xl border border-border/70">
            <TabsTrigger
              value="description"
              className="rounded-xl px-4 sm:px-6 font-bold text-xs sm:text-sm data-[state=active]:bg-amber-400 data-[state=active]:text-stone-900 data-[state=active]:shadow-xs transition-all"
            >
              Product Story & Origin
            </TabsTrigger>
            <TabsTrigger
              value="specifications"
              className="rounded-xl px-4 sm:px-6 font-bold text-xs sm:text-sm data-[state=active]:bg-amber-400 data-[state=active]:text-stone-900 data-[state=active]:shadow-xs transition-all"
            >
              Nutrition & Specifications
            </TabsTrigger>
            <TabsTrigger
              value="reviews"
              className="rounded-xl px-4 sm:px-6 font-bold text-xs sm:text-sm data-[state=active]:bg-amber-400 data-[state=active]:text-stone-900 data-[state=active]:shadow-xs transition-all"
            >
              Customer Reviews ({product.reviewCount})
            </TabsTrigger>
            <TabsTrigger
              value="shipping"
              className="rounded-xl px-4 sm:px-6 font-bold text-xs sm:text-sm data-[state=active]:bg-amber-400 data-[state=active]:text-stone-900 data-[state=active]:shadow-xs transition-all"
            >
              Delivery & Cold-Chain
            </TabsTrigger>
          </TabsList>

          {/* Tab 1: Product Story & Origin */}
          <TabsContent value="description" className="space-y-4">
            <div className="p-6 rounded-2xl border border-border/80 bg-card space-y-4">
              <h3 className="text-lg font-black text-foreground">
                Farm Fresh Standard: {product.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Grown with sustainable organic agriculture practices by our certified growers. Each batch of {product.title} is harvested at peak maturity, quickly inspected for prime quality, and handled through refrigerated channels to guarantee fresh-from-the-field flavor on your table.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                <div className="p-4 rounded-xl border border-border/60 bg-muted/20 space-y-1">
                  <div className="flex items-center gap-2 text-xs font-bold text-foreground">
                    <Leaf className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                    <span>Pure Organic</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    No synthetic chemicals, artificial ripening gases, or preservatives.
                  </p>
                </div>
                <div className="p-4 rounded-xl border border-border/60 bg-muted/20 space-y-1">
                  <div className="flex items-center gap-2 text-xs font-bold text-foreground">
                    <Clock className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                    <span>Harvested Fresh</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Packed and prepared within 24 hours of field harvesting.
                  </p>
                </div>
                <div className="p-4 rounded-xl border border-border/60 bg-muted/20 space-y-1">
                  <div className="flex items-center gap-2 text-xs font-bold text-foreground">
                    <Sparkles className="h-4 w-4 text-amber-500" />
                    <span>Peak Flavor Profile</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Natural soil nutrients produce richer taste and higher vitamin density.
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Tab 2: Nutrition & Specifications Table */}
          <TabsContent value="specifications">
            <div className="rounded-2xl border border-border/80 bg-card overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="font-extrabold text-foreground w-1/3">Specification</TableHead>
                    <TableHead className="font-extrabold text-foreground">Certified Value</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="text-xs sm:text-sm">
                  <TableRow>
                    <TableCell className="font-bold text-muted-foreground">Brand & Producer</TableCell>
                    <TableCell className="font-semibold text-foreground">{product.brand}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-bold text-muted-foreground">Category</TableCell>
                    <TableCell className="font-semibold text-foreground capitalize">
                      {category?.name || product.categorySlug.replace("-", " ")}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-bold text-muted-foreground">Organic Certification</TableCell>
                    <TableCell className="font-semibold text-foreground">
                      USDA Organic Certified • Non-GMO Project Verified
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-bold text-muted-foreground">Storage Recommendation</TableCell>
                    <TableCell className="font-semibold text-foreground">
                      Refrigerate between 2°C – 4°C immediately upon arrival.
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-bold text-muted-foreground">Shelf Life</TableCell>
                    <TableCell className="font-semibold text-foreground">
                      7 – 10 days under proper refrigeration
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-bold text-muted-foreground">Allergen Notice</TableCell>
                    <TableCell className="font-semibold text-foreground">
                      Handled in a facility dedicated to natural organic produce.
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          {/* Tab 3: Customer Reviews */}
          <TabsContent value="reviews">
            <ReviewSummary
              rating={product.rating}
              reviewCount={product.reviewCount}
              productTitle={product.title}
            />
          </TabsContent>

          {/* Tab 4: Delivery & Cold-Chain */}
          <TabsContent value="shipping">
            <div className="p-6 rounded-2xl border border-border/80 bg-card space-y-4">
              <h3 className="text-lg font-black text-foreground">
                Farmart Cold-Chain Fulfillment Protocol
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Unlike traditional parcel logistics, Farmart operates dedicated regional refrigerated delivery vans. Your order is protected in recyclable insulated thermal packaging with dry gel ice packs, ensuring temperature-sensitive dairy, meats, and fresh greens remain cold until you bring them inside.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl border border-border/60 bg-muted/20 space-y-1">
                  <h4 className="font-bold text-xs text-foreground">Standard Delivery</h4>
                  <p className="text-xs text-muted-foreground">
                    Same-day afternoon slots available for all orders placed before 1:00 PM.
                  </p>
                </div>
                <div className="p-4 rounded-xl border border-border/60 bg-muted/20 space-y-1">
                  <h4 className="font-bold text-xs text-foreground">Zero-Risk Freshness Guarantee</h4>
                  <p className="text-xs text-muted-foreground">
                    If an item arrives damaged or below your expectations, snap a photo in your account for an immediate full refund.
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </section>

      {/* Related / Recommended Products */}
      {relatedProducts.length > 0 && (
        <section className="pt-8 space-y-5">
          <div className="flex items-center justify-between pb-2 border-b border-border">
            <div>
              <span className="text-[11px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
                Discover More
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-foreground tracking-tight">
                Recommended From This Category
              </h2>
            </div>
            <Link
              href={`/#${product.categorySlug}`}
              className="text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline"
            >
              View All Category Items →
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {relatedProducts.map((p) => (
              <Link
                key={p.id}
                href={`/products/${p.id}`}
                className="rounded-2xl border border-border/80 bg-card p-4 flex flex-col justify-between hover:border-amber-400 hover:shadow-lg transition-all duration-200 group relative"
              >
                <div className="space-y-3">
                  <div className="relative aspect-square w-full rounded-xl bg-muted/40 flex items-center justify-center p-3 border border-border/50 overflow-hidden">
                    {p.badge && (
                      <Badge className="absolute top-2 left-2 bg-rose-600 text-white text-[10px] font-bold px-1.5 py-0.5 border-0 z-10">
                        {p.badge}
                      </Badge>
                    )}
                    <ProductThumbnail
                      categorySlug={p.categorySlug}
                      brand={p.brand}
                      title={p.title}
                    />
                  </div>

                  <div>
                    <span className="text-[11px] font-bold text-stone-600 dark:text-stone-300 uppercase">
                      {p.brand}
                    </span>
                    <h3 className="font-bold text-xs text-foreground leading-snug line-clamp-2 mt-0.5 group-hover:text-amber-600 transition-colors">
                      {p.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <Rating value={p.rating} readOnly size="sm" />
                    <span className="text-[11px] text-muted-foreground">({p.reviewCount})</span>
                  </div>

                  <div className="flex items-baseline gap-2 pt-1">
                    <span className="text-base font-black text-foreground">
                      {p.currency}{p.price.toFixed(2)}
                    </span>
                    {p.originalPrice && (
                      <span className="text-xs text-muted-foreground line-through">
                        {p.currency}{p.originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>
                </div>

                <div className="pt-3 mt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full text-xs font-bold rounded-xl border-border/80 hover:bg-amber-400 hover:text-stone-900 hover:border-amber-400 transition-colors"
                  >
                    View Details
                  </Button>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
