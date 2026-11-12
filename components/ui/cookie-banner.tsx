"use client";

import * as React from "react";
import { Cookie, ShieldCheck, ChevronDown, ChevronUp, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export interface CookiePreferences {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
  functional: boolean;
}

export interface CookieBannerProps extends React.HTMLAttributes<HTMLDivElement> {
  onAcceptAll?: () => void;
  onRejectAll?: () => void;
  onSavePreferences?: (preferences: CookiePreferences) => void;
  storageKey?: string;
  policyUrl?: string;
  inline?: boolean;
}

export function CookieBanner({
  onAcceptAll,
  onRejectAll,
  onSavePreferences,
  storageKey = "sd_cookie_consent",
  policyUrl = "#",
  inline = false,
  className,
  ...props
}: CookieBannerProps) {
  const [isVisible, setIsVisible] = React.useState(true);
  const [showDetails, setShowDetails] = React.useState(false);
  const [preferences, setPreferences] = React.useState<CookiePreferences>({
    essential: true,
    analytics: true,
    marketing: false,
    functional: true,
  });

  React.useEffect(() => {
    if (inline) return;
    try {
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        setIsVisible(false);
      }
    } catch {
      // localStorage may fail in iframe/private browsing
    }
  }, [storageKey, inline]);

  const handleAcceptAll = () => {
    const all = { essential: true, analytics: true, marketing: true, functional: true };
    try {
      localStorage.setItem(storageKey, JSON.stringify(all));
    } catch {}
    onAcceptAll?.();
    if (!inline) setIsVisible(false);
  };

  const handleRejectAll = () => {
    const minimal = { essential: true, analytics: false, marketing: false, functional: false };
    try {
      localStorage.setItem(storageKey, JSON.stringify(minimal));
    } catch {}
    onRejectAll?.();
    if (!inline) setIsVisible(false);
  };

  const handleSave = () => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(preferences));
    } catch {}
    onSavePreferences?.(preferences);
    if (!inline) setIsVisible(false);
  };

  if (!isVisible && !inline) return null;

  return (
    <aside
      role="region"
      aria-label="Cookie and privacy consent"
      className={cn(
        "rounded-xl border bg-card/95 p-4 sm:p-5 shadow-lg backdrop-blur-md transition-all text-card-foreground",
        !inline && "fixed bottom-[calc(env(safe-area-inset-bottom,0px)+4.5rem)] md:bottom-4 left-4 right-4 z-50 max-w-2xl mx-auto border-border/80",
        className
      )}
      {...props}
    >
      <div className="flex items-start gap-3 sm:gap-4">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Cookie className="h-5 w-5" />
        </div>

        <div className="flex-1 space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold tracking-tight">We value your privacy</h3>
            {!inline && (
              <button
                type="button"
                onClick={() => setIsVisible(false)}
                className="text-muted-foreground hover:text-foreground p-1 rounded-md"
                aria-label="Dismiss banner"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          <p className="text-xs text-muted-foreground leading-relaxed">
            We use cookies to improve your browsing experience, personalize content, and analyze traffic in compliance with PDPA/GDPR. Read our{" "}
            <a href={policyUrl} className="underline underline-offset-2 hover:text-primary">
              Privacy Policy
            </a>
            .
          </p>

          {/* Granular Preferences Accordion */}
          {showDetails && (
            <div className="my-3 space-y-3 pt-3 border-t text-xs">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-1.5 font-medium">
                    <span>Strictly Necessary</span>
                    <ShieldCheck className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <p className="text-[11px] text-muted-foreground">Required for core system functions.</p>
                </div>
                <span className="text-[10px] font-mono font-medium text-muted-foreground bg-muted px-2 py-0.5 rounded">Always active</span>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="cookie-analytics" className="font-medium cursor-pointer text-xs">
                    Analytics & Performance
                  </Label>
                  <p className="text-[11px] text-muted-foreground">Helps us understand how visitors interact with the site.</p>
                </div>
                <Switch
                  id="cookie-analytics"
                  checked={preferences.analytics}
                  onCheckedChange={(val) => setPreferences((p) => ({ ...p, analytics: val }))}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="cookie-marketing" className="font-medium cursor-pointer text-xs">
                    Marketing & Advertising
                  </Label>
                  <p className="text-[11px] text-muted-foreground">Used to deliver tailored announcements and recommendations.</p>
                </div>
                <Switch
                  id="cookie-marketing"
                  checked={preferences.marketing}
                  onCheckedChange={(val) => setPreferences((p) => ({ ...p, marketing: val }))}
                />
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <Button size="sm" onClick={handleAcceptAll} className="h-8 text-xs font-medium">
              Accept all
            </Button>
            <Button size="sm" variant="outline" onClick={handleRejectAll} className="h-8 text-xs font-medium">
              Reject non-essential
            </Button>
            {showDetails ? (
              <Button size="sm" variant="secondary" onClick={handleSave} className="h-8 text-xs font-medium">
                Save preferences
              </Button>
            ) : null}
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setShowDetails(!showDetails)}
              className="h-8 text-xs text-muted-foreground hover:text-foreground ml-auto gap-1"
            >
              {showDetails ? "Hide preferences" : "Customize"}
              {showDetails ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
            </Button>
          </div>
        </div>
      </div>
    </aside>
  );
}
