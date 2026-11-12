"use client";

import * as React from "react";
import Link from "next/link";
import {
  FileCode,
  Download,
  Copy,
  Check,
  ExternalLink,
  Layers,
  Search,
  Server,
  Terminal,
  Code2,
  Sparkles,
  ArrowRight,
  ChevronDown,
  ChevronRight,
  ShieldCheck,
  Send,
} from "lucide-react";
import { swaggerSpec } from "@/lib/api-spec";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export function ApiDocsView() {
  const [activeTab, setActiveTab] = React.useState<"explorer" | "swagger-ui" | "schemas">("explorer");
  const [methodFilter, setMethodFilter] = React.useState<string>("ALL");
  const [selectedTag, setSelectedTag] = React.useState<string>("ALL");
  const [searchQuery, setSearchQuery] = React.useState<string>("");
  const [expandedEndpoints, setExpandedEndpoints] = React.useState<Record<string, boolean>>({
    "GET-/api/products": true,
    "GET-/api/products/{id}": true,
  });
  const [copiedCurl, setCopiedCurl] = React.useState<string | null>(null);
  const [isSwaggerLoaded, setIsSwaggerLoaded] = React.useState<boolean>(false);

  // Load Swagger UI script dynamically when switching to swagger-ui tab
  React.useEffect(() => {
    if (activeTab !== "swagger-ui") return;

    if (typeof window !== "undefined" && !(window as any).SwaggerUIBundle) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "https://unpkg.com/swagger-ui-dist@5/swagger-ui.css";
      document.head.appendChild(link);

      const script = document.createElement("script");
      script.src = "https://unpkg.com/swagger-ui-dist@5/swagger-ui-bundle.js";
      script.async = true;
      script.onload = () => {
        setIsSwaggerLoaded(true);
        if ((window as any).SwaggerUIBundle) {
          (window as any).SwaggerUIBundle({
            url: "/docs/swagger.json",
            dom_id: "#swagger-ui-container",
            deepLinking: true,
            presets: [
              (window as any).SwaggerUIBundle.presets.apis,
            ],
            layout: "BaseLayout",
          });
        }
      };
      document.body.appendChild(script);
    } else if ((window as any).SwaggerUIBundle) {
      setIsSwaggerLoaded(true);
      (window as any).SwaggerUIBundle({
        url: "/docs/swagger.json",
        dom_id: "#swagger-ui-container",
        deepLinking: true,
        presets: [
          (window as any).SwaggerUIBundle.presets.apis,
        ],
        layout: "BaseLayout",
      });
    }
  }, [activeTab]);

  // Extract all endpoints from swaggerSpec
  const endpoints = React.useMemo(() => {
    const list: Array<{
      path: string;
      method: "get" | "post" | "patch" | "delete";
      tag: string;
      summary: string;
      description?: string;
      parameters?: any[];
      requestBody?: any;
      responses: Record<string, any>;
    }> = [];

    for (const [pathKey, methods] of Object.entries(swaggerSpec.paths)) {
      for (const [methodKey, op] of Object.entries(methods as any)) {
        list.push({
          path: pathKey,
          method: methodKey as any,
          tag: (op as any).tags?.[0] || "General",
          summary: (op as any).summary || "",
          description: (op as any).description,
          parameters: (op as any).parameters,
          requestBody: (op as any).requestBody,
          responses: (op as any).responses,
        });
      }
    }
    return list;
  }, []);

  const tags = ["ALL", ...Array.from(new Set(endpoints.map((e) => e.tag)))];
  const methods = ["ALL", "GET", "POST", "PATCH", "DELETE"];

  const filteredEndpoints = endpoints.filter((ep) => {
    const matchesMethod = methodFilter === "ALL" || ep.method.toUpperCase() === methodFilter;
    const matchesTag = selectedTag === "ALL" || ep.tag === selectedTag;
    const q = searchQuery.toLowerCase().trim();
    const matchesQuery =
      !q ||
      ep.path.toLowerCase().includes(q) ||
      ep.summary.toLowerCase().includes(q) ||
      ep.tag.toLowerCase().includes(q);
    return matchesMethod && matchesTag && matchesQuery;
  });

  const toggleEndpoint = (key: string) => {
    setExpandedEndpoints((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const copyText = (text: string, label: string) => {
    if (typeof window !== "undefined") {
      navigator.clipboard?.writeText(text);
      toast.success(`Copied ${label} to clipboard!`);
    }
  };

  const getMethodBadgeClass = (method: string) => {
    switch (method.toUpperCase()) {
      case "GET":
        return "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border-emerald-500/30";
      case "POST":
        return "bg-amber-500/15 text-amber-800 dark:text-amber-300 border-amber-500/30";
      case "PATCH":
        return "bg-purple-500/15 text-purple-700 dark:text-purple-300 border-purple-500/30";
      case "DELETE":
        return "bg-rose-500/15 text-rose-700 dark:text-rose-400 border-rose-500/30";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-border">
        <div className="space-y-2 max-w-2xl">
          <div className="flex flex-wrap items-center gap-2">
            <Badge className="bg-amber-400 text-stone-900 hover:bg-amber-500 font-extrabold text-[11px] uppercase tracking-wider">
              OpenAPI 3.0.3
            </Badge>
            <Badge variant="outline" className="text-xs font-mono border-border/80 text-muted-foreground">
              v1.0.0
            </Badge>
            <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              Live Server
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-foreground tracking-tight">
            Farmart API Documentation
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            RESTful API specifications for catalog products, real-time inventory, categories, promotional banners, temperature-controlled delivery, and customer reviews.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5">
          <a
            href="/docs/swagger.json"
            download="farmart-swagger.json"
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-xl bg-amber-400 hover:bg-amber-500 text-stone-900 shadow-xs transition-colors"
          >
            <Download className="h-3.5 w-3.5" />
            <span>Download swagger.json</span>
          </a>

          <Button
            variant="outline"
            size="sm"
            onClick={() => copyText("http://localhost:3000", "Base URL")}
            className="rounded-xl font-bold text-xs gap-1.5 border-border hover:border-amber-400"
          >
            <Server className="h-3.5 w-3.5 text-muted-foreground" />
            <span>Copy Base URL</span>
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => copyText(JSON.stringify(swaggerSpec, null, 2), "Full Swagger Spec")}
            className="rounded-xl font-bold text-xs gap-1.5 border-border hover:border-amber-400"
          >
            <Copy className="h-3.5 w-3.5 text-muted-foreground" />
            <span>Copy Raw JSON</span>
          </Button>
        </div>
      </div>

      {/* KPI Stats Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 rounded-2xl border border-border/80 bg-muted/20 dark:bg-muted/40 space-y-1">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground">Endpoints</span>
          <div className="text-2xl font-black text-foreground">{endpoints.length}</div>
          <p className="text-[11px] text-muted-foreground">Across 7 resource domains</p>
        </div>

        <div className="p-4 rounded-2xl border border-border/80 bg-muted/20 dark:bg-muted/40 space-y-1">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground">Resource Modules</span>
          <div className="text-2xl font-black text-amber-600 dark:text-amber-400">{tags.length - 1}</div>
          <p className="text-[11px] text-muted-foreground">Products, Cart, Delivery...</p>
        </div>

        <div className="p-4 rounded-2xl border border-border/80 bg-muted/20 dark:bg-muted/40 space-y-1">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground">Data Models</span>
          <div className="text-2xl font-black text-foreground">
            {Object.keys(swaggerSpec.components.schemas).length}
          </div>
          <p className="text-[11px] text-muted-foreground">Typed JSON schemas</p>
        </div>

        <div className="p-4 rounded-2xl border border-border/80 bg-muted/20 dark:bg-muted/40 space-y-1">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground">Standard</span>
          <div className="text-2xl font-black text-foreground font-mono">OAS 3.0</div>
          <p className="text-[11px] text-muted-foreground">Postman & Bruno ready</p>
        </div>
      </div>

      {/* Main View Tabs: Native Explorer vs Official Swagger UI vs Schemas */}
      <Tabs
        value={activeTab}
        onValueChange={(v) => setActiveTab(v as any)}
        className="w-full space-y-6"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-border/60">
          <TabsList className="bg-muted/40 p-1 rounded-xl border border-border/70 h-10">
            <TabsTrigger
              value="explorer"
              className="rounded-lg text-xs font-bold data-[state=active]:bg-amber-400 data-[state=active]:text-stone-900"
            >
              Native API Explorer ({endpoints.length})
            </TabsTrigger>
            <TabsTrigger
              value="swagger-ui"
              className="rounded-lg text-xs font-bold data-[state=active]:bg-amber-400 data-[state=active]:text-stone-900"
            >
              Official Swagger UI
            </TabsTrigger>
            <TabsTrigger
              value="schemas"
              className="rounded-lg text-xs font-bold data-[state=active]:bg-amber-400 data-[state=active]:text-stone-900"
            >
              Schemas & Types ({Object.keys(swaggerSpec.components.schemas).length})
            </TabsTrigger>
          </TabsList>

          <div className="text-xs text-muted-foreground font-mono">
            GET <code className="text-foreground font-semibold">/docs/swagger.json</code>
          </div>
        </div>

        {/* Tab 1: Native API Explorer */}
        <TabsContent value="explorer" className="space-y-6">
          {/* Filter Bar */}
          <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between p-3 rounded-2xl border border-border/80 bg-card">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="h-4 w-4 absolute left-3 top-2.5 text-muted-foreground" />
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search endpoints (e.g. /api/products, cart, delivery)..."
                className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
            </div>

            {/* Method Filter Buttons */}
            <div className="flex items-center gap-1.5 overflow-x-auto">
              <span className="text-[11px] font-bold text-muted-foreground uppercase px-1">Method:</span>
              {methods.map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setMethodFilter(m)}
                  className={cn(
                    "px-2.5 py-1 rounded-lg text-xs font-bold uppercase transition-colors cursor-pointer",
                    methodFilter === m
                      ? "bg-amber-400 text-stone-900"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  {m}
                </button>
              ))}
            </div>

            {/* Tag Filter Dropdown */}
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] font-bold text-muted-foreground uppercase px-1">Tag:</span>
              <select
                value={selectedTag}
                onChange={(e) => setSelectedTag(e.target.value)}
                aria-label="Filter endpoints by tag"
                className="text-xs font-bold rounded-xl border border-input bg-background px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-amber-400"
              >
                {tags.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Endpoints List */}
          <div className="space-y-3">
            {filteredEndpoints.length === 0 ? (
              <div className="p-8 text-center border rounded-2xl bg-muted/10 text-xs text-muted-foreground">
                No API endpoints match your filter criteria.
              </div>
            ) : (
              filteredEndpoints.map((ep) => {
                const epKey = `${ep.method.toUpperCase()}-${ep.path}`;
                const isExpanded = Boolean(expandedEndpoints[epKey]);

                return (
                  <div
                    key={epKey}
                    className="rounded-2xl border border-border/80 bg-card overflow-hidden shadow-2xs transition-all hover:border-amber-400/80"
                  >
                    {/* Header Row */}
                    <div
                      onClick={() => toggleEndpoint(epKey)}
                      className="p-3.5 sm:p-4 flex items-center justify-between gap-3 cursor-pointer select-none bg-background hover:bg-muted/20 transition-colors"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span
                          className={cn(
                            "px-2.5 py-1 rounded-md text-[11px] font-black uppercase tracking-wider border shrink-0",
                            getMethodBadgeClass(ep.method)
                          )}
                        >
                          {ep.method}
                        </span>
                        <code className="text-xs sm:text-sm font-mono font-bold text-foreground truncate">
                          {ep.path}
                        </code>
                        <span className="hidden md:inline text-xs text-muted-foreground font-medium truncate">
                          — {ep.summary}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <Badge variant="outline" className="text-[10px] font-semibold text-muted-foreground">
                          {ep.tag}
                        </Badge>
                        <div className="text-muted-foreground p-1">
                          {isExpanded ? (
                            <ChevronDown className="h-4 w-4" />
                          ) : (
                            <ChevronRight className="h-4 w-4" />
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Collapsible Content */}
                    {isExpanded && (
                      <div className="p-4 sm:p-5 border-t border-border/60 bg-muted/10 space-y-4">
                        {ep.description && (
                          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                            {ep.description}
                          </p>
                        )}

                        {/* Parameters Table */}
                        {ep.parameters && ep.parameters.length > 0 && (
                          <div className="space-y-2">
                            <h4 className="text-xs font-bold text-foreground uppercase tracking-wider">
                              Request Parameters
                            </h4>
                            <div className="rounded-xl border border-border/70 overflow-hidden bg-background">
                              <table className="w-full text-xs">
                                <thead className="bg-muted/40 border-b border-border/70 text-left text-[11px] text-muted-foreground">
                                  <tr>
                                    <th className="p-2.5">Name</th>
                                    <th className="p-2.5">In</th>
                                    <th className="p-2.5">Type</th>
                                    <th className="p-2.5">Required</th>
                                    <th className="p-2.5">Description</th>
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-border/60">
                                  {ep.parameters.map((param) => (
                                    <tr key={param.name}>
                                      <td className="p-2.5 font-mono font-bold text-foreground">
                                        {param.name}
                                      </td>
                                      <td className="p-2.5 font-mono text-muted-foreground">{param.in}</td>
                                      <td className="p-2.5 font-mono text-muted-foreground">
                                        {param.schema?.type || "string"}
                                      </td>
                                      <td className="p-2.5">
                                        {param.required ? (
                                          <Badge className="bg-rose-500/15 text-rose-700 dark:text-rose-400 text-[10px]">
                                            Required
                                          </Badge>
                                        ) : (
                                          <span className="text-muted-foreground text-[11px]">Optional</span>
                                        )}
                                      </td>
                                      <td className="p-2.5 text-muted-foreground">
                                        {param.description || "—"}
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        )}

                        {/* Request Body preview */}
                        {ep.requestBody && (
                          <div className="space-y-1.5">
                            <h4 className="text-xs font-bold text-foreground uppercase tracking-wider">
                              Request Body Payload (JSON)
                            </h4>
                            <pre className="p-3 rounded-xl bg-background border border-border/70 font-mono text-xs overflow-x-auto text-muted-foreground">
                              {JSON.stringify(
                                ep.requestBody.content?.["application/json"]?.schema,
                                null,
                                2
                              )}
                            </pre>
                          </div>
                        )}

                        {/* Response Codes */}
                        <div className="space-y-2">
                          <h4 className="text-xs font-bold text-foreground uppercase tracking-wider">
                            HTTP Responses
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {Object.entries(ep.responses).map(([code, resp]: any) => (
                              <div
                                key={code}
                                className="px-3 py-1.5 rounded-xl border border-border/70 bg-background text-xs space-y-0.5"
                              >
                                <div className="flex items-center gap-1.5">
                                  <span
                                    className={cn(
                                      "font-mono font-black",
                                      code.startsWith("2")
                                        ? "text-emerald-600 dark:text-emerald-400"
                                        : "text-rose-600 dark:text-rose-400"
                                    )}
                                  >
                                    {code}
                                  </span>
                                  <span className="text-foreground font-semibold">{resp.description}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Quick cURL snippet */}
                        <div className="space-y-1.5 pt-1">
                          <div className="flex items-center justify-between text-xs font-bold text-foreground">
                            <span className="flex items-center gap-1">
                              <Terminal className="h-3.5 w-3.5 text-amber-500" />
                              cURL Example
                            </span>
                            <button
                              type="button"
                              onClick={() => {
                                const curlCmd = `curl -X ${ep.method.toUpperCase()} "http://localhost:3000${ep.path}"`;
                                copyText(curlCmd, "cURL command");
                                setCopiedCurl(epKey);
                                setTimeout(() => setCopiedCurl(null), 2000);
                              }}
                              className="text-[11px] font-semibold text-muted-foreground hover:text-foreground flex items-center gap-1 cursor-pointer"
                            >
                              {copiedCurl === epKey ? (
                                <>
                                  <Check className="h-3 w-3 text-emerald-500" />
                                  <span>Copied</span>
                                </>
                              ) : (
                                <>
                                  <Copy className="h-3 w-3" />
                                  <span>Copy cURL</span>
                                </>
                              )}
                            </button>
                          </div>
                          <pre className="p-3 rounded-xl bg-background border border-border/70 font-mono text-xs overflow-x-auto text-amber-600 dark:text-amber-400 font-bold">
                            curl -X {ep.method.toUpperCase()} "http://localhost:3000{ep.path}"
                          </pre>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </TabsContent>

        {/* Tab 2: Official Swagger UI */}
        <TabsContent value="swagger-ui" className="space-y-4">
          <div className="p-4 rounded-2xl border border-border/80 bg-muted/20 dark:bg-muted/40 flex items-center justify-between">
            <div className="space-y-0.5">
              <p className="text-xs font-bold text-foreground">Interactive Swagger UI</p>
              <p className="text-[11px] text-muted-foreground">
                Loaded live from <code className="text-foreground font-semibold">/docs/swagger.json</code> with sandbox execution.
              </p>
            </div>
            <a
              href="/docs/swagger.json"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1"
            >
              <span>View Raw JSON</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>

          <div className="rounded-2xl border border-border/80 bg-background p-4 sm:p-6 min-h-[600px] overflow-hidden">
            {!isSwaggerLoaded && (
              <div className="flex flex-col items-center justify-center p-12 text-center space-y-3">
                <div className="h-8 w-8 rounded-full border-2 border-amber-400 border-t-transparent animate-spin" />
                <p className="text-xs font-semibold text-muted-foreground">
                  Initializing Swagger UI bundle from specification...
                </p>
              </div>
            )}
            <div id="swagger-ui-container" className="prose dark:prose-invert max-w-none text-foreground" />
          </div>
        </TabsContent>

        {/* Tab 3: Schemas & Types */}
        <TabsContent value="schemas" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(swaggerSpec.components.schemas).map(([schemaName, schema]: any) => (
              <div
                key={schemaName}
                className="p-4 rounded-2xl border border-border/80 bg-card space-y-2.5"
              >
                <div className="flex items-center justify-between pb-2 border-b border-border/60">
                  <span className="font-mono font-bold text-sm text-foreground">{schemaName}</span>
                  <Badge variant="outline" className="text-[10px] font-mono">
                    {schema.type || "object"}
                  </Badge>
                </div>

                <div className="space-y-1">
                  <span className="text-[11px] font-bold text-muted-foreground uppercase">
                    Schema Definition:
                  </span>
                  <pre className="p-3 rounded-xl bg-muted/30 border border-border/60 font-mono text-[11px] max-h-56 overflow-y-auto text-muted-foreground">
                    {JSON.stringify(schema, null, 2)}
                  </pre>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
