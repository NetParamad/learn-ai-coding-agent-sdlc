"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Search,
  ShoppingCart,
  User,
  Heart,
  Menu,
  ChevronDown,
  PhoneCall,
  Zap,
  Clock,
  Store,
  Loader2,
  Package,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CartDrawer, CartItem } from "@/components/ui/cart-drawer";
import { ThemeToggle } from "@/components/theme-toggle";
import { ProductThumbnail } from "@/components/ui/product-thumbnail";
import { Category, Product } from "@/lib/db";

interface HeaderProps {
  categories?: Category[];
}

export function Header({ categories = [] }: HeaderProps) {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = React.useState("ALL CATEGORIES");
  const [searchQuery, setSearchQuery] = React.useState("");
  const [liveResults, setLiveResults] = React.useState<Product[]>([]);
  const [isSearching, setIsSearching] = React.useState(false);
  const [showDropdown, setShowDropdown] = React.useState(false);
  const searchContainerRef = React.useRef<HTMLDivElement>(null);

  // Close live search dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Live search debounced fetch
  React.useEffect(() => {
    if (!searchQuery.trim() || searchQuery.trim().length < 2) {
      setLiveResults([]);
      setShowDropdown(false);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        setIsSearching(true);
        const cat = categories.find((c) => c.name === selectedCategory);
        const catParam = cat ? `&categorySlug=${cat.slug}` : "";
        const res = await fetch(`/api/products?search=${encodeURIComponent(searchQuery.trim())}${catParam}&limit=5`);
        if (res.ok) {
          const data = await res.json();
          setLiveResults(data.products || []);
          setShowDropdown(true);
        }
      } catch (err) {
        console.error("Live search failed:", err);
      } finally {
        setIsSearching(false);
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [searchQuery, selectedCategory, categories]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setShowDropdown(false);
    const cat = categories.find((c) => c.name === selectedCategory);
    const catParam = cat ? `&categorySlug=${cat.slug}` : "";
    router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}${catParam}`);
  };

  const sampleCartItems: CartItem[] = [
    {
      id: "p1",
      name: "Ice Cool 350ml x 24 Pieces",
      price: 48.5,
      quantity: 2,
    },
    {
      id: "p2",
      name: "British Beef Mince (10% Fat)",
      price: 28.0,
      quantity: 1,
    },
  ];

  return (
    <header className="w-full bg-background border-b border-border/80 sticky top-0 z-40">
      {/* Top Main Row */}
      <div className="container mx-auto px-4 py-3 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <div className="w-10 h-10 rounded-xl bg-amber-400 flex items-center justify-center font-black text-stone-900 shadow-sm">
            <Store className="w-6 h-6 text-stone-900" />
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-black tracking-tight leading-none text-foreground">
              Farmart
            </span>
            <span className="text-[11px] uppercase font-bold tracking-widest text-muted-foreground">
              Grocery
            </span>
          </div>
        </Link>

        {/* Search Bar with Live Results Dropdown */}
        <div ref={searchContainerRef} className="hidden md:flex flex-1 max-w-2xl relative">
          <form
            onSubmit={handleSearchSubmit}
            className="w-full flex items-center border-2 border-amber-400 rounded-xl overflow-hidden bg-background shadow-xs focus-within:ring-2 focus-within:ring-amber-400/40"
          >
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  className="px-3.5 py-2 text-xs font-semibold text-muted-foreground hover:text-foreground flex items-center gap-1.5 shrink-0 bg-muted/40 hover:bg-muted transition-colors cursor-pointer"
                >
                  <span className="truncate max-w-[130px]">{selectedCategory}</span>
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56 max-h-80 overflow-y-auto">
                <DropdownMenuItem onClick={() => setSelectedCategory("ALL CATEGORIES")}>
                  ALL CATEGORIES
                </DropdownMenuItem>
                {categories.map((cat) => (
                  <DropdownMenuItem key={cat.id} onClick={() => setSelectedCategory(cat.name)}>
                    {cat.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <div className="w-[1px] h-6 bg-border" />

            <div className="flex-1 relative flex items-center">
              <Input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => {
                  if (liveResults.length > 0) setShowDropdown(true);
                }}
                placeholder="I'm searching for fresh organic produce..."
                aria-label="Search products"
                className="border-0 shadow-none focus-visible:ring-0 text-sm h-10 px-3 bg-transparent"
              />
              {isSearching && (
                <Loader2 className="w-4 h-4 text-amber-500 animate-spin absolute right-3 pointer-events-none" />
              )}
            </div>

            <Button
              type="submit"
              size="sm"
              aria-label="Submit search"
              className="rounded-none h-10 px-5 bg-amber-400 hover:bg-amber-500 text-stone-900 font-bold"
            >
              <Search className="w-4 h-4" />
            </Button>
          </form>

          {/* Live Search Floating Dropdown */}
          {showDropdown && liveResults.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-background border border-border/80 rounded-2xl shadow-xl p-2 z-50 divide-y divide-border/60">
              <div className="p-2 text-[11px] font-bold text-muted-foreground uppercase tracking-wider flex items-center justify-between">
                <span>Matching Products ({liveResults.length})</span>
                <span className="font-normal lowercase">click to view details</span>
              </div>

              <div className="py-1 space-y-1">
                {liveResults.map((item) => (
                  <Link
                    key={item.id}
                    href={`/products/${item.id}`}
                    onClick={() => setShowDropdown(false)}
                    className="flex items-center gap-3 p-2 rounded-xl hover:bg-muted/40 transition-colors group cursor-pointer"
                  >
                    <div className="w-10 h-10 rounded-lg bg-muted/40 border border-border/50 flex items-center justify-center shrink-0 overflow-hidden">
                      <ProductThumbnail
                        categorySlug={item.categorySlug}
                        brand={item.brand}
                        title={item.title}
                        className="w-8 h-8"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[11px] font-bold text-stone-500 uppercase">{item.brand}</div>
                      <div className="text-xs font-bold text-foreground truncate group-hover:text-amber-600 transition-colors">
                        {item.title}
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-xs font-black text-foreground">
                        {item.currency}{item.price.toFixed(2)}
                      </div>
                      {item.originalPrice && (
                        <div className="text-[10px] text-muted-foreground line-through">
                          {item.currency}{item.originalPrice.toFixed(2)}
                        </div>
                      )}
                    </div>
                  </Link>
                ))}
              </div>

              <div className="pt-2 p-1">
                <button
                  type="button"
                  onClick={handleSearchSubmit}
                  className="w-full py-2 text-center text-xs font-bold text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-muted/60 rounded-xl transition-colors cursor-pointer"
                >
                  View all results for "{searchQuery}" →
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Customer Service & User Actions */}
        <div className="flex items-center gap-5 shrink-0">
          <div className="hidden lg:flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-muted flex items-center justify-center">
              <PhoneCall className="w-4 h-4 text-amber-500" />
            </div>
            <div className="text-left text-xs">
              <p className="font-extrabold text-foreground tracking-tight">8 800 332 65-66</p>
              <p className="text-[11px] text-muted-foreground">Support 24/7</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle />

            <Button variant="ghost" size="icon" aria-label="User account" className="relative hover:bg-muted">
              <User className="w-5 h-5 text-foreground" />
            </Button>

            <Button variant="ghost" size="icon" aria-label="Wishlist" className="relative hover:bg-muted hidden sm:inline-flex">
              <Heart className="w-5 h-5 text-foreground" />
              <Badge className="absolute -top-1 -right-1 h-4 min-w-4 px-1 text-[11px] bg-amber-400 text-stone-900 font-bold border-0">
                2
              </Badge>
            </Button>

            <CartDrawer
              items={sampleCartItems}
              currencySymbol="$"
              trigger={
                <Button
                  variant="outline"
                  aria-label="Shopping Cart"
                  className="flex items-center gap-2.5 h-10 px-3 border-amber-300 dark:border-amber-700/60 hover:bg-amber-50 dark:hover:bg-muted"
                >
                  <div className="relative">
                    <ShoppingCart className="w-5 h-5 text-foreground" />
                    <Badge className="absolute -top-2 -right-2 h-4.5 min-w-4.5 px-1 text-[11px] bg-amber-400 text-stone-900 font-bold border-0 flex items-center justify-center">
                      3
                    </Badge>
                  </div>
                  <div className="text-left hidden sm:block">
                    <span className="text-[11px] text-muted-foreground uppercase block leading-none">
                      Total
                    </span>
                    <span className="text-xs font-bold text-foreground leading-tight block">
                      $1,450.59
                    </span>
                  </div>
                </Button>
              }
            />
          </div>
        </div>
      </div>

      {/* Navigation Sub-bar */}
      <div className="border-t border-border/60 bg-background/50 backdrop-blur">
        <div className="container mx-auto px-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            {/* Shop by Category Trigger */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  className="flex items-center gap-3 bg-amber-400 hover:bg-amber-500 text-stone-900 px-5 py-3 font-extrabold text-xs uppercase tracking-wide transition-colors shrink-0"
                >
                  <Menu className="w-4 h-4" />
                  <span>Shop By Category</span>
                  <ChevronDown className="w-3.5 h-3.5 ml-2" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-64 p-2">
                {categories.map((cat) => (
                  <DropdownMenuItem key={cat.id} className="py-2 cursor-pointer font-medium">
                    {cat.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Quick Links */}
            <nav className="hidden md:flex items-center gap-5 text-xs font-semibold text-muted-foreground">
              <Link
                href="#"
                className="flex items-center gap-1 text-foreground hover:text-amber-600 transition-colors"
              >
                <Zap className="w-3.5 h-3.5 text-amber-500" />
                <span>Deals Today</span>
              </Link>
              <Link href="#" className="hover:text-foreground transition-colors">
                Special Prices
              </Link>
              <Link href="#" className="hover:text-foreground transition-colors">
                Fresh
              </Link>
              <Link href="#" className="hover:text-foreground transition-colors">
                Frozen
              </Link>
              <Link href="#" className="hover:text-foreground transition-colors">
                Weekly Specials
              </Link>
              <Link href="#" className="hover:text-foreground transition-colors">
                Organic Direct
              </Link>
              <Link href="#" className="hover:text-foreground transition-colors">
                Local Farms
              </Link>
            </nav>
          </div>

          {/* Recently Viewed */}
          <div className="hidden xl:flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground cursor-pointer">
            <Clock className="w-3.5 h-3.5 text-amber-500" />
            <span>Recently Viewed</span>
          </div>
        </div>
      </div>
    </header>
  );
}
