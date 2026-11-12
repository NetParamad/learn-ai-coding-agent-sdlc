"use client";

import * as React from "react";
import { ShoppingBag, Trash2, ArrowRight } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { QuantityInput } from "@/components/ui/quantity-input";
import { cn } from "@/lib/utils";

/**
 * @component CartDrawer
 * @description Slide-over shopping cart drawer with line item quantity management, subtotal breakdown, and checkout action.
 * @example
 * ```tsx
 * <CartDrawer
 *   items={[
 *     { id: "1", name: "System Design Kit", price: 49, quantity: 1, image: "/placeholder.svg" }
 *   ]}
 *   onCheckout={() => console.log("Checkout")}
 * />
 * ```
 */
export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  variant?: string;
}

export interface CartDrawerProps {
  items: CartItem[];
  currencySymbol?: string;
  onUpdateQuantity?: (id: string, quantity: number) => void;
  onRemoveItem?: (id: string) => void;
  onCheckout?: () => void;
  trigger?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function CartDrawer({
  items = [],
  currencySymbol = "$",
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
  trigger,
  open,
  onOpenChange,
}: CartDrawerProps) {
  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>
        {trigger || (
          <Button variant="outline" size="icon" className="relative h-9 w-9 rounded-lg shadow-2xs">
            <ShoppingBag className="h-4 w-4" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 min-w-[16px] px-1 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                {totalItems}
              </span>
            )}
          </Button>
        )}
      </SheetTrigger>
      <SheetContent side="right" className="flex flex-col w-full sm:max-w-md p-0">
        <SheetHeader className="h-14 px-4 pr-14 border-b flex flex-row items-center justify-between">
          <SheetTitle className="text-base font-semibold flex items-center gap-2">
            <span>Shopping Cart</span>
            <span className="text-xs font-normal text-muted-foreground">
              ({totalItems} {totalItems === 1 ? "item" : "items"})
            </span>
          </SheetTitle>
          <SheetDescription className="sr-only">
            Your shopping cart items and checkout options
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-center">
              <ShoppingBag className="h-10 w-10 text-muted-foreground/40 mb-3" />
              <p className="text-sm font-medium text-foreground">Your cart is empty</p>
              <p className="text-xs text-muted-foreground mt-1">
                Add products from the catalog to get started.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-border/60">
              {items.map((item) => (
                <div key={item.id} className="py-3 flex gap-3 first:pt-0 last:pb-0">
                  {item.image && (
                    <div className="h-16 w-16 rounded-md border bg-muted/30 overflow-hidden shrink-0 flex items-center justify-center">
                      <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h4 className="text-xs font-semibold text-foreground truncate">{item.name}</h4>
                        {item.variant && (
                          <p className="text-[11px] text-muted-foreground">{item.variant}</p>
                        )}
                      </div>
                      <span className="text-xs font-bold font-mono">
                        {currencySymbol}
                        {(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <QuantityInput
                        size="sm"
                        value={item.quantity}
                        onChange={(qty) => onUpdateQuantity?.(item.id, qty)}
                      />
                      {onRemoveItem && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => onRemoveItem(item.id)}
                          className="h-7 w-7 text-muted-foreground hover:text-destructive"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <SheetFooter className="p-4 border-t bg-muted/20 flex flex-col gap-3 sm:flex-col">
            <div className="space-y-1.5 text-xs">
              <div className="flex items-center justify-between text-muted-foreground">
                <span>Subtotal</span>
                <span className="font-mono text-foreground font-medium">
                  {currencySymbol}
                  {subtotal.toFixed(2)}
                </span>
              </div>
              <div className="flex items-center justify-between text-muted-foreground">
                <span>Shipping & Taxes</span>
                <span>Calculated at checkout</span>
              </div>
              <Separator />
              <div className="flex items-center justify-between text-sm font-semibold">
                <span>Total</span>
                <span className="font-mono text-primary font-bold">
                  {currencySymbol}
                  {subtotal.toFixed(2)}
                </span>
              </div>
            </div>

            <Button onClick={onCheckout} className="w-full gap-2 font-medium">
              <span>Proceed to Checkout</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
}
