import type { Metadata } from "next";
import { Header } from "@/components/sections/header";
import { Footer } from "@/components/sections/footer";
import { ApiDocsView } from "@/components/docs/api-docs-view";
import { getCategories } from "@/lib/db";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "API Documentation (Swagger / OpenAPI) | Farmart",
  description:
    "Explore the official Farmart OpenAPI 3.0.3 REST specification. Endpoints for products, categories, cart, cold-chain fulfillment, and reviews.",
};

export default function DocsPage() {
  const categories = getCategories();

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground antialiased selection:bg-amber-400 selection:text-stone-900">
      <Header categories={categories} />

      <main className="flex-1">
        <ApiDocsView />
      </main>

      <Footer />
    </div>
  );
}
