"use client";

import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "@/components/ui/context-menu";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";
import { NotificationBell } from "@/components/ui/notification-bell";
import { NotificationCenter } from "@/components/ui/notification-center";
import { CartDrawer, type CartItem } from "@/components/ui/cart-drawer";
import { CookieBanner } from "@/components/ui/cookie-banner";
import { ComponentInstallButton } from "@/components/design-system/component-install-button";
import { SectionHeader } from "@/components/design-system/sections/section-header";
import { Bell, Layers, Compass, ChevronRight, AlertTriangle, Terminal } from "lucide-react";
import { toast } from "sonner";
import { useToast } from "@/components/ui/use-toast";

export function OverlaysSection() {
  const { toast: radixToast } = useToast();
  const [search, setSearch] = React.useState("");
  const [demoCart, setDemoCart] = React.useState<CartItem[]>([
    { id: "item-1", name: "System Design Kit (Enterprise)", price: 79, quantity: 1, variant: "React 19 + OKLCH" },
    { id: "item-2", name: "Extended UI Primitives", price: 29, quantity: 2, variant: "Full shadcn/ui" },
  ]);

  const q = search.toLowerCase().trim();

  const cards = [
    { id: "card-confirm-dialog", name: "Modals, Drawers & Live Feedback Triggers", tags: ["dialog", "modal", "alert-dialog", "confirm-dialog", "sheet", "drawer", "popover", "tooltip", "dropdown-menu", "context-menu", "toast", "sonner", "resizable", "scroll-area", "progress", "alert"] },
    { id: "card-notification-bell", name: "Notification Bell & Feed", tags: ["notification", "bell", "feed", "badge", "counter"] },
    { id: "card-notification-center", name: "Notification Center", tags: ["notification", "center", "feed", "badge", "unread", "tabs"] },
    { id: "card-cart-drawer", name: "Shopping Cart Drawer", tags: ["cart", "drawer", "ecommerce", "checkout", "shop"] },
    { id: "card-cookie-banner", name: "Cookie Consent Banner", tags: ["cookie", "banner", "gdpr", "pdpa", "consent"] },
  ];

  const isVisible = (id: string) => {
    if (!q) return true;
    const card = cards.find((c) => c.id === id);
    if (!card) return true;
    return card.name.toLowerCase().includes(q) || card.tags.some((t) => t.includes(q));
  };

  const visibleCount = cards.filter((c) => isVisible(c.id)).length;

  return (
    <section id="overlays" className="space-y-6 scroll-mt-28">
      <SectionHeader
        icon={Bell}
        title="Overlays & Feedback"
        description="Dialog, Alert Dialog, Sheet, Drawer, Popover, Tooltip, Hover Card, Context Menu, Dropdown Menu, Notification Bell, Alert, Progress, Resizable, Scroll Area, and Sonner."
        searchQuery={search}
        onSearchChange={setSearch}
        totalCount={cards.length}
        filteredCount={visibleCount}
        placeholder="Filter overlays (dialog, drawer, notification, cookie...)"
      />

      {visibleCount === 0 ? (
        <div className="p-8 text-center border rounded-lg bg-muted/10 text-xs text-muted-foreground">
          No overlay components match "{search}".
        </div>
      ) : (
        <div className="space-y-6">
          {/* Modals, Drawers & Live Feedback Triggers */}
          {isVisible("card-confirm-dialog") && (
            <Card id="card-confirm-dialog" className="scroll-mt-28">
              <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                <div>
                  <CardTitle className="text-base">Modals, Drawers & Live Feedback Triggers</CardTitle>
                  <CardDescription className="text-xs">
                    Touch-friendly drawers, focus-trapped dialogs, and non-blocking notifications
                  </CardDescription>
                </div>
                <ComponentInstallButton name="dialog" title="Dialog" />
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Group 1: Modals & Dialogs */}
                  <div className="space-y-2.5 p-3.5 rounded-lg border bg-muted/20">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-foreground">
                      <Layers className="h-3.5 w-3.5 text-primary" />
                      <span>Modals & Critical Actions</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">Open Dialog</Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Edit Workspace Profile</DialogTitle>
                            <DialogDescription>
                              Update team profile and preferences. Responsive across mobile, tablet, and desktop viewports.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-3 py-2">
                            <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-1.5 sm:gap-4">
                              <label htmlFor="modal-name" className="text-xs font-medium sm:text-right">
                                Name
                              </label>
                              <input
                                id="modal-name"
                                defaultValue="Alex Rivera"
                                className="col-span-1 sm:col-span-3 flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-xs shadow-2xs transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                              />
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-1.5 sm:gap-4">
                              <label htmlFor="modal-handle" className="text-xs font-medium sm:text-right">
                                Handle
                              </label>
                              <input
                                id="modal-handle"
                                defaultValue="@arivera"
                                className="col-span-1 sm:col-span-3 flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-xs shadow-2xs transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                              />
                            </div>
                          </div>
                          <DialogFooter>
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              className="w-full sm:w-auto"
                              onClick={() => toast.info("Discarded changes")}
                            >
                              Cancel
                            </Button>
                            <Button
                              type="button"
                              size="sm"
                              className="w-full sm:w-auto"
                              onClick={() => toast.success("Saved profile changes")}
                            >
                              Save Changes
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>

                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="destructive" size="sm">Alert Dialog</Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Confirmation Modal</AlertDialogTitle>
                            <AlertDialogDescription>
                              This modal requires explicit user confirmation before proceeding.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => toast.success("Confirmed action")}>
                              Confirm
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>

                      <ConfirmDialog
                        title="Terminate Production Database"
                        description="This is an irreversible destructive operation. All 14 tenant replicas, backups, and caching layers will be permanently deleted."
                        confirmWord="DELETE-PROD-DB"
                        confirmButtonText="Permanently Terminate"
                        onConfirm={() => {
                          toast.error("Production database deletion initiated");
                        }}
                        trigger={
                          <Button variant="destructive" size="sm" className="gap-1.5 font-medium">
                            <AlertTriangle className="h-3.5 w-3.5" />
                            Type-to-Confirm
                          </Button>
                        }
                      />
                    </div>
                  </div>

                  {/* Group 2: Drawers & Sheets */}
                  <div className="space-y-2.5 p-3.5 rounded-lg border bg-muted/20">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-foreground">
                      <Compass className="h-3.5 w-3.5 text-primary" />
                      <span>Drawers & Navigation Sheets</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Sheet>
                        <SheetTrigger asChild>
                          <Button variant="secondary" size="sm">Open Sheet</Button>
                        </SheetTrigger>
                        <SheetContent className="w-full sm:max-w-sm">
                          <SheetHeader>
                            <SheetTitle>Side Slide-out Sheet</SheetTitle>
                            <SheetDescription className="text-xs">
                              Slide-out panel commonly used for navigation drawers and filter sheets.
                            </SheetDescription>
                          </SheetHeader>
                        </SheetContent>
                      </Sheet>

                      <Drawer>
                        <DrawerTrigger asChild>
                          <Button variant="outline" size="sm">Bottom Drawer (Touch)</Button>
                        </DrawerTrigger>
                        <DrawerContent>
                          <DrawerHeader>
                            <DrawerTitle>Bottom Drawer (Vaul)</DrawerTitle>
                            <DrawerDescription className="text-xs">Touch gesture-friendly drawer for mobile viewports.</DrawerDescription>
                          </DrawerHeader>
                          <DrawerFooter>
                            <DrawerClose asChild>
                              <Button variant="outline">Dismiss</Button>
                            </DrawerClose>
                          </DrawerFooter>
                        </DrawerContent>
                      </Drawer>
                    </div>
                  </div>

                  {/* Group 3: Contextual Flyouts & Toasts */}
                  <div className="space-y-2.5 p-3.5 rounded-lg border bg-muted/20">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-foreground">
                      <Bell className="h-3.5 w-3.5 text-primary" />
                      <span>Flyouts, Menus & Toasts</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" size="sm">Popover</Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-64 text-xs space-y-1">
                          <div className="font-semibold">Popover Anchor</div>
                          <p className="text-muted-foreground">Floating overlay anchored to the trigger button.</p>
                        </PopoverContent>
                      </Popover>

                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="sm">Tooltip</Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="text-xs">WCAG 2.1 Tooltip</p>
                        </TooltipContent>
                      </Tooltip>

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" size="sm">Dropdown <ChevronRight className="ml-1 h-3 w-3" /></Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>View Tokens</DropdownMenuItem>
                          <DropdownMenuItem>Copy Specifications</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">Reset Theme</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>

                      <ContextMenu>
                        <ContextMenuTrigger className="flex h-9 items-center justify-center rounded-md border border-dashed px-3 text-xs font-medium cursor-context-menu">
                          Right Click
                        </ContextMenuTrigger>
                        <ContextMenuContent>
                          <ContextMenuItem>Copy Color Token</ContextMenuItem>
                          <ContextMenuItem>Inspect Element</ContextMenuItem>
                        </ContextMenuContent>
                      </ContextMenu>

                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          toast.success("Sonner Toast Triggered", {
                            description: "All 97 UI components verified with full responsiveness and zero broken styles.",
                          });
                        }}
                      >
                        Sonner
                      </Button>

                      <Button
                        size="sm"
                        onClick={() => {
                          radixToast({
                            title: "Radix Toast Triggered",
                            description: "Native Radix UI Toast notification primitive active.",
                          });
                        }}
                      >
                        Radix Toast
                      </Button>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Resizable & ScrollArea */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="h-36 sm:h-40 border rounded-lg overflow-hidden">
                    <ResizablePanelGroup direction="horizontal">
                      <ResizablePanel defaultSize={50}>
                        <div className="flex h-full items-center justify-center p-3 text-xs font-mono bg-muted/20">
                          Panel A
                        </div>
                      </ResizablePanel>
                      <ResizableHandle withHandle />
                      <ResizablePanel defaultSize={50}>
                        <div className="flex h-full items-center justify-center p-3 text-xs font-mono bg-muted/40">
                          Panel B
                        </div>
                      </ResizablePanel>
                    </ResizablePanelGroup>
                  </div>

                  <div className="h-36 sm:h-40 border rounded-lg">
                    <ScrollArea className="h-full p-3 sm:p-4 text-xs space-y-2">
                      <div className="font-semibold mb-2">Custom Styled ScrollArea</div>
                      {Array.from({ length: 8 }).map((_, i) => (
                        <p key={i} className="text-muted-foreground">
                          Item #{i + 1}: Custom styled scrollbar matching OKLCH theme.
                        </p>
                      ))}
                    </ScrollArea>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-mono text-muted-foreground">
                    <span>Components Verified</span>
                    <span>96 / 96 (100%)</span>
                  </div>
                  <Progress value={100} className="h-2" />
                </div>

                <Alert>
                  <Terminal className="h-4 w-4" />
                  <AlertTitle className="text-xs sm:text-sm">Verified shadcn/ui Component Catalog</AlertTitle>
                  <AlertDescription className="text-xs">
                    All components, tokens, and templates adhere to the Next.js 16 App Router architecture and are fully responsive across mobile, tablet, and desktop viewports.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          )}

          {/* Notification Bell */}
          {isVisible("card-notification-bell") && (
            <Card id="card-notification-bell" className="scroll-mt-28">
              <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                <div>
                  <CardTitle className="text-base">Notification Bell & Feed</CardTitle>
                  <CardDescription className="text-xs">
                    Header notification center with unread badge counter, status categories, and mark-as-read actions
                  </CardDescription>
                </div>
                <ComponentInstallButton name="notification-bell" title="Notification Bell" />
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-lg border bg-muted/20 p-4">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Notification Center</p>
                    <p className="text-xs text-muted-foreground">Click the bell trigger to open popover drawer with filterable status tabs.</p>
                  </div>
                  <NotificationBell />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Notification Center */}
          {isVisible("card-notification-center") && (
            <Card id="card-notification-center" className="scroll-mt-28">
              <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                <div>
                  <CardTitle className="text-base">Notification Center</CardTitle>
                  <CardDescription className="text-xs">
                    Dashboard notification popover with tabbed filtering (All / Unread), mark-as-read toggles, and badge counters
                  </CardDescription>
                </div>
                <ComponentInstallButton name="notification-center" title="Notification Center" />
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-lg border bg-muted/20 p-4">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Interactive Notification Feed</p>
                    <p className="text-xs text-muted-foreground">Click the trigger icon to view filterable tabs and mark notifications as read.</p>
                  </div>
                  <NotificationCenter
                    notifications={[
                      { id: "1", title: "Build Deployment Succeeded", message: "Production environment v2.4.0 is now live across edge nodes", timestamp: "4m ago", read: false },
                      { id: "2", title: "Security Key Created", message: "A new scoped API key was provisioned for downstream testing", timestamp: "32m ago", read: false },
                      { id: "3", title: "Theme Switched to Zinc", message: "Default OKLCH palette synchronized across sessions", timestamp: "2h ago", read: true },
                    ]}
                    onMarkAllAsRead={() => toast.success("All notifications marked as read")}
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Shopping Cart Drawer */}
          {isVisible("card-cart-drawer") && (
            <Card id="card-cart-drawer" className="scroll-mt-28">
              <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                <div>
                  <CardTitle className="text-base">Shopping Cart Drawer</CardTitle>
                  <CardDescription className="text-xs">
                    E-commerce mini-cart slide-over drawer with interactive quantity steppers, subtotal breakdown, and checkout CTA
                  </CardDescription>
                </div>
                <ComponentInstallButton name="cart-drawer" title="Cart Drawer" />
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-lg border bg-muted/20 p-4">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Cart Slide-Over Drawer</p>
                    <p className="text-xs text-muted-foreground">Click the shopping bag trigger to view line items, adjust quantities, or proceed to checkout.</p>
                  </div>
                  <CartDrawer
                    items={demoCart}
                    onUpdateQuantity={(id, qty) => {
                      setDemoCart((prev) =>
                        prev.map((item) => (item.id === id ? { ...item, quantity: qty } : item))
                      );
                      toast.info(`Updated quantity to ${qty}`);
                    }}
                    onRemoveItem={(id) => {
                      setDemoCart((prev) => prev.filter((item) => item.id !== id));
                      toast.warning("Item removed from cart");
                    }}
                    onCheckout={() => toast.success("Redirecting to secure checkout...")}
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Cookie Banner */}
          {isVisible("card-cookie-banner") && (
            <Card id="card-cookie-banner" className="scroll-mt-28">
              <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                <div>
                  <CardTitle className="text-base">Cookie Consent Banner</CardTitle>
                  <CardDescription className="text-xs">
                    PDPA & GDPR compliant cookie consent modal with categorized preferences (Essential, Analytics, Marketing)
                  </CardDescription>
                </div>
                <ComponentInstallButton name="cookie-banner" title="Cookie Banner" />
              </CardHeader>
              <CardContent>
                <div className="rounded-lg border bg-muted/10 p-2 sm:p-4">
                  <CookieBanner
                    inline
                    onAcceptAll={() => toast.success("Accepted all cookies")}
                    onRejectAll={() => toast.info("Rejected optional cookies")}
                    onSavePreferences={() => toast.success("Saved preferences")}
                  />
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </section>
  );
}
