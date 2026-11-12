"use client";

import * as React from "react";
import { Star, CheckCircle2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface TestimonialAuthor {
  name: string;
  role?: string;
  company?: string;
  avatarUrl?: string;
  avatarFallback?: string;
  verified?: boolean;
}

export interface TestimonialCardProps extends React.HTMLAttributes<HTMLDivElement> {
  quote: string;
  author: TestimonialAuthor;
  rating?: number;
  companyLogo?: React.ReactNode;
}

export function TestimonialCard({
  quote,
  author,
  rating = 5,
  companyLogo,
  className,
  ...props
}: TestimonialCardProps) {
  return (
    <Card
      className={cn(
        "relative flex flex-col justify-between border bg-card p-5 sm:p-6 shadow-xs transition-all hover:shadow-md",
        className
      )}
      {...props}
    >
      <CardContent className="p-0 space-y-4">
        {/* Rating Stars & optional company logo */}
        <div className="flex items-center justify-between gap-2">
          {rating > 0 && (
            <div className="flex items-center gap-1" aria-label={`Rating: ${rating} out of 5 stars`}>
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    "h-4 w-4",
                    i < rating
                      ? "fill-amber-400 text-amber-400"
                      : "fill-muted text-muted-foreground/30"
                  )}
                />
              ))}
            </div>
          )}
          {companyLogo && <div className="text-muted-foreground shrink-0">{companyLogo}</div>}
        </div>

        {/* Quote */}
        <p className="text-xs sm:text-sm text-foreground leading-relaxed italic">
          &ldquo;{quote}&rdquo;
        </p>

        {/* Author Details */}
        <div className="flex items-center gap-3 pt-2 border-t border-border/40">
          <Avatar className="h-9 w-9 border">
            {author.avatarUrl && <AvatarImage src={author.avatarUrl} alt={author.name} />}
            <AvatarFallback className="text-xs font-semibold bg-primary/10 text-primary">
              {author.avatarFallback || author.name.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              <span className="text-xs sm:text-sm font-semibold text-foreground truncate">
                {author.name}
              </span>
              {author.verified && (
                <span title="Verified Customer" className="inline-flex items-center">
                  <CheckCircle2
                    className="h-3.5 w-3.5 text-primary shrink-0"
                    aria-label="Verified Customer"
                  />
                </span>
              )}
            </div>
            {(author.role || author.company) && (
              <p className="text-[11px] text-muted-foreground truncate">
                {author.role}
                {author.role && author.company && " · "}
                {author.company}
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
