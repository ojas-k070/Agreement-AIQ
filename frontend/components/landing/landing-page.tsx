"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { 
  FileText, 
  Search, 
  Shield, 
  Zap, 
  CheckCircle2,
  ArrowRight,
  Github,
  Linkedin,
  Sparkles
} from "lucide-react";
import { TopNavLanding } from "@/components/layout/top-nav-landing";

export function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
      <TopNavLanding />
      
      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20 md:py-32 relative">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <Sparkles className="h-4 w-4" />
            <span>AI-Powered Contract Intelligence</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
            Analyze Contracts with
            <span className="block text-primary mt-2">Intelligent AI</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Extract clauses, assess risks, and get instant answers from your contract documents using advanced AI and semantic search.
          </p>
          
          <div className="flex justify-center items-center pt-4">
            <Button asChild size="lg" className="text-lg px-8 py-6 shadow-md hover:shadow-lg transition-all duration-200">
              <Link href="/login">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Mockup Preview Section */}
      <section className="container mx-auto px-6 -mt-8 mb-20">
        <div className="max-w-5xl mx-auto rounded-xl border bg-card/60 backdrop-blur p-4 md:p-6 shadow-2xl relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-primary/5 pointer-events-none" />
          
          {/* Header/Title bar mockup */}
          <div className="flex items-center justify-between border-b pb-4 mb-6">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full bg-red-400" />
                <span className="w-3 h-3 rounded-full bg-yellow-400" />
                <span className="w-3 h-3 rounded-full bg-green-400" />
              </div>
              <span className="text-xs text-muted-foreground font-mono ml-2">AgreementAIQ / Workspace / OPK / AnalyticsPlus NDA</span>
            </div>
            <span className="text-xs font-medium px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-500">Processed</span>
          </div>

          {/* Grid Layout inside mockup */}
          <div className="grid md:grid-cols-3 gap-6">
            {/* Column 1: Document info & Score */}
            <div className="space-y-4">
              <div className="rounded-lg bg-muted/40 p-4 border border-border/40">
                <span className="text-xs text-muted-foreground">Document Health Score</span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-4xl font-extrabold tracking-tight text-amber-500">74</span>
                  <span className="text-sm font-medium text-muted-foreground">/ 100</span>
                </div>
                <p className="text-[11px] text-muted-foreground mt-2 leading-relaxed">
                  Moderate overall risk. 3 clauses flagged with high or medium severity.
                </p>
              </div>

              <div className="rounded-lg bg-muted/40 p-4 border border-border/40 space-y-3">
                <span className="text-xs font-semibold">Clause Summary</span>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Total Chunks</span>
                    <span className="font-semibold">11</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Identified Clauses</span>
                    <span className="font-semibold text-primary">10</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Risk Flags</span>
                    <span className="font-semibold text-destructive">2 Critical</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Column 2 & 3: Clause list */}
            <div className="md:col-span-2 space-y-3">
              <span className="text-xs font-semibold block mb-1">Identified Key Clauses</span>
              
              <div className="rounded-lg border bg-background/80 p-3 space-y-2 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-primary">1. Governing Law</span>
                  <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-500">Low Risk</span>
                </div>
                <p className="text-xs text-muted-foreground line-clamp-2">
                  "This Agreement shall be governed by, and construed in accordance with, the laws of India without regard to conflict of law principles."
                </p>
              </div>

              <div className="rounded-lg border bg-background/80 p-3 space-y-2 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-primary">2. Confidentiality Period</span>
                  <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-amber-500/10 text-amber-500">Medium Risk</span>
                </div>
                <p className="text-xs text-muted-foreground line-clamp-2">
                  "The obligations under this agreement shall survive for a period of five (5) years from the date of disclosure."
                </p>
              </div>

              <div className="rounded-lg border bg-background/80 p-3 space-y-2 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-primary">3. Indemnification Limitation</span>
                  <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-red-500/10 text-red-500">High Risk</span>
                </div>
                <p className="text-xs text-muted-foreground line-clamp-2">
                  "Receiving Party shall indemnify and hold harmless Disclosing Party from all claims without any cap or limitation on total liability."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Powerful Features for Contract Analysis
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to understand, analyze, and manage your contracts efficiently.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="p-6 rounded-xl border bg-card hover:-translate-y-1 hover:shadow-xl hover:border-primary/20 transition-all duration-300 ease-out group">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/15 transition-colors">
                <FileText className="h-6 w-6 text-primary group-hover:scale-110 transition-transform duration-300" />
              </div>
              <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">Intelligent Extraction</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Automatically extract and categorize 15+ clause types with confidence scores and risk assessment.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-6 rounded-xl border bg-card hover:-translate-y-1 hover:shadow-xl hover:border-primary/20 transition-all duration-300 ease-out group">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/15 transition-colors">
                <Search className="h-6 w-6 text-primary group-hover:scale-110 transition-transform duration-300" />
              </div>
              <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">Semantic Search</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Ask natural language questions across multiple documents and get answers with accurate citations.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-6 rounded-xl border bg-card hover:-translate-y-1 hover:shadow-xl hover:border-primary/20 transition-all duration-300 ease-out group">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/15 transition-colors">
                <Shield className="h-6 w-6 text-primary group-hover:scale-110 transition-transform duration-300" />
              </div>
              <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">Risk Analysis</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Automated risk scoring (0-100) with detailed flags and reasoning for each identified clause.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="p-6 rounded-xl border bg-card hover:-translate-y-1 hover:shadow-xl hover:border-primary/20 transition-all duration-300 ease-out group">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/15 transition-colors">
                <Zap className="h-6 w-6 text-primary group-hover:scale-110 transition-transform duration-300" />
              </div>
              <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">Fast Processing</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Background processing with real-time status updates. Documents ready in minutes, not hours.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="p-6 rounded-xl border bg-card hover:-translate-y-1 hover:shadow-xl hover:border-primary/20 transition-all duration-300 ease-out group">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/15 transition-colors">
                <CheckCircle2 className="h-6 w-6 text-primary group-hover:scale-110 transition-transform duration-300" />
              </div>
              <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">Evidence Packs</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Generate PDF evidence packs with citations for negotiations, compliance, and legal reviews.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="p-6 rounded-xl border bg-card hover:-translate-y-1 hover:shadow-xl hover:border-primary/20 transition-all duration-300 ease-out group">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/15 transition-colors">
                <FileText className="h-6 w-6 text-primary group-hover:scale-110 transition-transform duration-300" />
              </div>
              <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">Multi-Document</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Search and analyze across entire document sets with workspace-based organization.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="container mx-auto px-6 py-20 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How It Works
            </h2>
            <p className="text-lg text-muted-foreground">
              Simple workflow for powerful contract analysis
            </p>
          </div>

          <div className="space-y-8">
            <div className="flex gap-6">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg">
                1
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Upload Documents</h3>
                <p className="text-muted-foreground">
                  Upload PDF or DOCX files. The system automatically extracts text, structures content, and indexes for search.
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg">
                2
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Extract Clauses</h3>
                <p className="text-muted-foreground">
                  AI identifies and extracts key clauses with risk scores, flags, and detailed reasoning for each finding.
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg">
                3
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Ask Questions</h3>
                <p className="text-muted-foreground">
                  Use natural language to query your contracts. Get instant answers with citations and page references.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold">
            Ready to Analyze Your Contracts?
          </h2>
          <p className="text-lg text-muted-foreground">
            Get started with Agreement AIQ and transform how you review contracts.
          </p>
          <Button asChild size="lg" className="text-lg px-8 py-6">
            <Link href="/login">
              Start Analyzing
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/30 py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <p className="font-semibold text-lg mb-2">Agreement AIQ</p>
              <p className="text-sm text-muted-foreground">
                AI-Powered Contract Intelligence Platform
              </p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
            <p>© 2024 Agreement AIQ. Portfolio project by Ojas Kulkarni.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

