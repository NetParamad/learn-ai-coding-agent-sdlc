"use client";

import * as React from "react";
import { Rating } from "@/components/ui/rating";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, ThumbsUp, MessageSquarePlus } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export interface ReviewItem {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
  helpfulCount: number;
}

export interface ReviewSummaryProps {
  rating: number;
  reviewCount: number;
  productTitle: string;
  className?: string;
}

export function ReviewSummary({
  rating,
  reviewCount,
  productTitle,
  className,
}: ReviewSummaryProps) {
  const [helpfulVotes, setHelpfulVotes] = React.useState<Record<string, number>>({});

  const distribution = [
    { stars: 5, percentage: 75, count: Math.round(reviewCount * 0.75) },
    { stars: 4, percentage: 18, count: Math.round(reviewCount * 0.18) },
    { stars: 3, percentage: 5, count: Math.round(reviewCount * 0.05) },
    { stars: 2, percentage: 2, count: Math.round(reviewCount * 0.02) },
    { stars: 1, percentage: 0, count: 0 },
  ];

  const sampleReviews: ReviewItem[] = [
    {
      id: "rev-1",
      author: "Samantha K.",
      rating: 5,
      date: "2 days ago",
      title: "Exceptionally fresh and crisp!",
      comment:
        "Ordered in the morning and arrived cold and perfectly packed by afternoon. You can tell this comes straight from the regional grower. Highly recommended!",
      verified: true,
      helpfulCount: 14,
    },
    {
      id: "rev-2",
      author: "David L.",
      rating: 5,
      date: "1 week ago",
      title: "Great quality, will subscribe weekly",
      comment:
        "Farmart has been our go-to for organic groceries. The texture and taste are far superior to standard supermarket options. Packaging is clean and recyclable.",
      verified: true,
      helpfulCount: 9,
    },
    {
      id: "rev-3",
      author: "Elena Rostova",
      rating: 4,
      date: "2 weeks ago",
      title: "Very good value for money",
      comment:
        "Taste is delicious. Delivery driver was polite and followed drop-off instructions. Will definitely purchase again next week.",
      verified: true,
      helpfulCount: 4,
    },
  ];

  const handleHelpful = (id: string) => {
    setHelpfulVotes((prev) => {
      if (prev[id]) {
        toast.info("You already voted this review as helpful");
        return prev;
      }
      toast.success("Thank you for your feedback!");
      return { ...prev, [id]: 1 };
    });
  };

  return (
    <div className={cn("space-y-6", className)}>
      {/* Top Summary Bar */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-5 sm:p-6 rounded-2xl border border-border/80 bg-muted/20 dark:bg-muted/40">
        {/* Left Score Box */}
        <div className="md:col-span-4 flex flex-col items-center justify-center text-center p-4 rounded-xl bg-background border border-border/60 shadow-xs">
          <div className="text-4xl sm:text-5xl font-black text-foreground tracking-tight">
            {rating.toFixed(1)}
          </div>
          <div className="my-2">
            <Rating value={rating} readOnly size="default" />
          </div>
          <p className="text-xs text-muted-foreground font-medium">
            Based on {reviewCount} verified ratings
          </p>
          <div className="mt-4 w-full">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => toast.info(`Review submission modal for "${productTitle}"`)}
              className="w-full font-bold text-xs gap-1.5 border-border hover:border-amber-400 hover:text-amber-600 dark:hover:text-amber-400"
            >
              <MessageSquarePlus className="h-3.5 w-3.5" />
              Write a Review
            </Button>
          </div>
        </div>

        {/* Right Star Breakdown */}
        <div className="md:col-span-8 flex flex-col justify-center space-y-2">
          {distribution.map((d) => (
            <div key={d.stars} className="flex items-center gap-3 text-xs">
              <span className="w-12 font-bold text-muted-foreground text-right shrink-0">
                {d.stars} star
              </span>
              <div className="flex-1">
                <Progress value={d.percentage} className="h-2.5 bg-muted" />
              </div>
              <span className="w-10 text-muted-foreground font-mono text-[11px] text-right shrink-0">
                {d.percentage}%
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-3.5">
        <h4 className="text-sm font-extrabold text-foreground uppercase tracking-wider">
          Verified Customer Experiences ({sampleReviews.length})
        </h4>

        <div className="divide-y divide-border/60 rounded-2xl border border-border/80 bg-card overflow-hidden">
          {sampleReviews.map((rev) => {
            const hasVoted = Boolean(helpfulVotes[rev.id]);
            const totalHelpful = rev.helpfulCount + (helpfulVotes[rev.id] || 0);

            return (
              <div key={rev.id} className="p-4 sm:p-5 space-y-2.5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-sm text-foreground">{rev.author}</span>
                    {rev.verified && (
                      <Badge variant="outline" className="text-[10px] gap-1 bg-emerald-50 dark:bg-muted text-emerald-700 dark:text-emerald-400 border-emerald-300 dark:border-emerald-700/50 font-bold py-0">
                        <CheckCircle2 className="h-3 w-3" /> Verified Buyer
                      </Badge>
                    )}
                  </div>
                  <span className="text-xs text-muted-foreground font-medium">{rev.date}</span>
                </div>

                <div className="flex items-center gap-2">
                  <Rating value={rev.rating} readOnly size="sm" />
                  <span className="font-bold text-xs text-foreground">{rev.title}</span>
                </div>

                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {rev.comment}
                </p>

                <div className="flex items-center gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => handleHelpful(rev.id)}
                    className={cn(
                      "inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-lg border transition-colors cursor-pointer",
                      hasVoted
                        ? "bg-amber-50 text-amber-700 border-amber-300 dark:bg-muted dark:text-amber-400"
                        : "border-border/70 text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                  >
                    <ThumbsUp className="h-3 w-3" />
                    <span>Helpful ({totalHelpful})</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
