"use client";

import * as React from "react";
import { ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

const GithubIcon = ({ className }: { className?: string }) => (
  <svg role="img" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

const TwitterIcon = ({ className }: { className?: string }) => (
  <svg role="img" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const DiscordIcon = ({ className }: { className?: string }) => (
  <svg role="img" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.894.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
  </svg>
);

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg role="img" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);

export interface FooterLink {
  label: string;
  href: string;
  badge?: string;
  isExternal?: boolean;
}

export interface FooterColumn {
  title: string;
  links: FooterLink[];
}

export interface FooterSectionProps extends React.HTMLAttributes<HTMLElement> {
  brandName?: string;
  brandDescription?: string;
  columns?: FooterColumn[];
  copyright?: string;
  socialLinks?: {
    github?: string;
    twitter?: string;
    discord?: string;
    linkedin?: string;
  };
  newsletter?: {
    title?: string;
    description?: string;
    placeholder?: string;
    buttonText?: string;
    onSubscribe?: (email: string) => void;
  };
}

export function FooterSection({
  brandName = "System Design Starter",
  brandDescription = "Modern OKLCH design system and component registry for rapid web production.",
  columns = [
    {
      title: "Product",
      links: [
        { label: "Components", href: "#primitives" },
        { label: "Themes (OKLCH)", href: "#colors" },
        { label: "Design Specs", href: "#typography" },
        { label: "Changelog", href: "#" },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "Documentation", href: "/llms.txt" },
        { label: "Registry API", href: "/r" },
        { label: "GitHub Repo", href: "#" },
        { label: "Community", href: "#" },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy Policy", href: "#" },
        { label: "Terms of Service", href: "#" },
        { label: "License (MIT)", href: "#" },
      ],
    },
  ],
  copyright = `© ${new Date().getFullYear()} System Design Starter. All rights reserved.`,
  socialLinks,
  newsletter,
  className,
  ...props
}: FooterSectionProps) {
  const [email, setEmail] = React.useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && newsletter?.onSubscribe) {
      newsletter.onSubscribe(email.trim());
      setEmail("");
    }
  };

  return (
    <footer className={cn("border-t bg-card text-card-foreground", className)} {...props}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand & Slogan */}
          <div className="space-y-3 lg:col-span-2">
            <h3 className="text-base sm:text-lg font-bold tracking-tight text-foreground">
              {brandName}
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-sm">
              {brandDescription}
            </p>

            {/* Newsletter input if enabled */}
            {newsletter && (
              <form onSubmit={handleSubscribe} className="pt-2 space-y-2 max-w-sm">
                {newsletter.title && (
                  <p className="text-xs font-semibold text-foreground">{newsletter.title}</p>
                )}
                <div className="flex gap-2">
                  <Input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={newsletter.placeholder || "Enter your work email..."}
                    className="h-8 text-xs"
                  />
                  <Button type="submit" size="sm" className="h-8 text-xs px-3 shrink-0">
                    {newsletter.buttonText || "Subscribe"}
                    <ArrowRight className="h-3 w-3 ml-1" />
                  </Button>
                </div>
                {newsletter.description && (
                  <p className="text-[11px] text-muted-foreground">{newsletter.description}</p>
                )}
              </form>
            )}
          </div>

          {/* Link Columns */}
          {columns.map((col, idx) => (
            <div key={idx} className="space-y-3">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {col.title}
              </h4>
              <ul className="space-y-2 text-xs">
                {col.links.map((link, linkIdx) => (
                  <li key={linkIdx}>
                    <a
                      href={link.href}
                      className="text-muted-foreground transition-colors hover:text-foreground inline-flex items-center gap-1.5"
                    >
                      {link.label}
                      {link.badge && (
                        <span className="rounded bg-primary/10 px-1 py-0.5 text-[9px] font-mono text-primary font-medium">
                          {link.badge}
                        </span>
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="my-8" />

        {/* Bottom Bar: Copyright & Socials */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>{copyright}</p>

          <div className="flex items-center gap-3">
            {socialLinks?.github && (
              <a
                href={socialLinks.github}
                aria-label="GitHub"
                className="hover:text-foreground transition-colors"
              >
                <GithubIcon className="h-4 w-4" />
              </a>
            )}
            {socialLinks?.twitter && (
              <a
                href={socialLinks.twitter}
                aria-label="Twitter / X"
                className="hover:text-foreground transition-colors"
              >
                <TwitterIcon className="h-4 w-4" />
              </a>
            )}
            {socialLinks?.discord && (
              <a
                href={socialLinks.discord}
                aria-label="Discord"
                className="hover:text-foreground transition-colors"
              >
                <DiscordIcon className="h-4 w-4" />
              </a>
            )}
            {socialLinks?.linkedin && (
              <a
                href={socialLinks.linkedin}
                aria-label="LinkedIn"
                className="hover:text-foreground transition-colors"
              >
                <LinkedinIcon className="h-4 w-4" />
              </a>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
