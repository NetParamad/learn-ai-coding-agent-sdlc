"use client";

import * as React from "react";
import Link from "next/link";
import { Truck, Headphones, ShieldCheck, RefreshCw, Sparkles, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function Footer() {
  return (
    <footer className="w-full bg-muted/40 border-t border-border mt-16">
      {/* Features Value Props */}
      <div className="border-b border-border/60">
        <div className="container mx-auto px-4 py-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-muted flex items-center justify-center shrink-0">
              <Truck className="w-6 h-6 text-amber-600 dark:text-amber-400" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-foreground">Free Shipping</h4>
              <p className="text-xs text-muted-foreground">For all orders over $100</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-muted flex items-center justify-center shrink-0">
              <RefreshCw className="w-6 h-6 text-amber-600 dark:text-amber-400" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-foreground">Freshness Guarantee</h4>
              <p className="text-xs text-muted-foreground">100% Hassle-free returns</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-muted flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6 text-amber-600 dark:text-amber-400" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-foreground">100% Secure Payment</h4>
              <p className="text-xs text-muted-foreground">Guarantee secure payments</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-muted flex items-center justify-center shrink-0">
              <Headphones className="w-6 h-6 text-amber-600 dark:text-amber-400" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-foreground">24/7 Dedicated Support</h4>
              <p className="text-xs text-muted-foreground">Anywhere & anytime assistance</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="container mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-400 flex items-center justify-center font-black text-stone-900">
              <Sparkles className="w-5 h-5" />
            </div>
            <span className="text-2xl font-black tracking-tight text-foreground">Farmart</span>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed max-w-sm text-pretty">
            Farmart is your premier destination for farm-fresh fruits, vegetables, artisan breads,
            and daily grocery essentials delivered straight to your doorstep.
          </p>
          <div className="text-xs text-muted-foreground space-y-1">
            <p>Hotline: <strong className="text-foreground">8 800 332 65-66</strong></p>
            <p>Email: <strong className="text-foreground">contact@farmart.com</strong></p>
          </div>
        </div>

        <div>
          <h5 className="font-bold text-xs uppercase tracking-wider text-foreground mb-4">
            Categories
          </h5>
          <ul className="space-y-2 text-xs text-muted-foreground">
            <li><Link href="#" className="hover:text-amber-500">Fruits & Vegetables</Link></li>
            <li><Link href="#" className="hover:text-amber-500">Breads & Sweets</Link></li>
            <li><Link href="#" className="hover:text-amber-500">Frozen Seafoods</Link></li>
            <li><Link href="#" className="hover:text-amber-500">Raw Meats</Link></li>
            <li><Link href="#" className="hover:text-amber-500">Milks and Dairies</Link></li>
          </ul>
        </div>

        <div>
          <h5 className="font-bold text-xs uppercase tracking-wider text-foreground mb-4">
            Quick Links
          </h5>
          <ul className="space-y-2 text-xs text-muted-foreground">
            <li><Link href="#" className="hover:text-amber-500">Special Prices</Link></li>
            <li><Link href="#" className="hover:text-amber-500">Top Saver Deals</Link></li>
            <li><Link href="#" className="hover:text-amber-500">Featured Brands</Link></li>
            <li><Link href="#" className="hover:text-amber-500">Best Sellers</Link></li>
            <li><Link href="#" className="hover:text-amber-500">New Arrivals</Link></li>
            <li><Link href="/docs" className="hover:text-amber-500 text-foreground font-semibold">Swagger API Docs (/docs)</Link></li>
          </ul>
        </div>

        <div>
          <h5 className="font-bold text-xs uppercase tracking-wider text-foreground mb-4">
            Newsletter
          </h5>
          <p className="text-xs text-muted-foreground mb-3">
            Subscribe to receive daily discount coupons and latest seasonal arrivals.
          </p>
          <div className="flex gap-1.5">
            <Input
              type="email"
              aria-label="Newsletter email address"
              placeholder="Your email address"
              className="text-xs h-9"
            />
            <Button
              size="sm"
              aria-label="Subscribe to newsletter"
              className="bg-amber-400 hover:bg-amber-500 text-stone-900 font-bold px-3"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-border/60 py-6">
        <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© 2026 Farmart Grocery. All rights reserved.</p>
          <div className="flex items-center gap-4 font-medium">
            <Link href="#" className="hover:text-foreground">Privacy Policy</Link>
            <Link href="#" className="hover:text-foreground">Terms of Service</Link>
            <Link href="#" className="hover:text-foreground">Shipping Info</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
