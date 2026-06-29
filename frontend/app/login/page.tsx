"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/auth-context";
import { toast } from "sonner";
import { ArrowRight } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const { login, register, user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [registerData, setRegisterData] = useState({ 
    email: "", 
    password: "", 
    confirmPassword: "",
    fullName: ""
  });

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user, router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(loginData.email, loginData.password);
      toast.success("Logged in successfully");
    } catch (error: any) {
      toast.error(error.detail || "Failed to login");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (registerData.password !== registerData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    if (registerData.password.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }
    setLoading(true);
    try {
      await register(registerData.email, registerData.password, registerData.fullName);
      toast.success("Account created successfully");
    } catch (error: any) {
      toast.error(error.detail || "Failed to register");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-background">
      {/* Left Column: Visual branding and features (hidden on mobile) */}
      <div className="hidden lg:flex flex-col justify-between p-12 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 text-slate-100 relative overflow-hidden">
        {/* Glow effect in background */}
        <div className="absolute top-1/4 right-0 w-96 h-96 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 left-0 w-96 h-96 rounded-full bg-amber-500/5 blur-3xl pointer-events-none" />
        
        {/* Header */}
        <div className="flex items-center gap-2 relative z-10">
          <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-primary to-amber-400 bg-clip-text text-transparent">AgreementAIQ</span>
          <span className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_10px_var(--primary)]" />
        </div>

        {/* Content */}
        <div className="space-y-8 relative z-10 max-w-lg my-auto">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
            The intelligent layer for your <span className="text-primary font-semibold">contracts.</span>
          </h2>
          <p className="text-slate-400 text-lg">
            Understand obligations, evaluate risks, and get instant answers with citation-backed semantic RAG.
          </p>

          <div className="space-y-5 pt-4">
            <div className="flex gap-3">
              <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-primary font-bold text-xs">✓</span>
              </div>
              <div>
                <p className="font-semibold text-slate-200 text-sm">Automated Clause Extraction</p>
                <p className="text-slate-400 text-xs mt-0.5">Identify 15+ clause categories instantly with AI risk evaluations.</p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-primary font-bold text-xs">✓</span>
              </div>
              <div>
                <p className="font-semibold text-slate-200 text-sm">Multi-Document RAG Querying</p>
                <p className="text-slate-400 text-xs mt-0.5">Ask questions across your entire document pool with verbatim citations.</p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-primary font-bold text-xs">✓</span>
              </div>
              <div>
                <p className="font-semibold text-slate-200 text-sm">Review Checklist Exports</p>
                <p className="text-slate-400 text-xs mt-0.5">Generate high-fidelity highlighted PDFs and CSV checklist data.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-slate-500 text-xs relative z-10">
          © 2026 AgreementAIQ. All rights reserved.
        </div>
      </div>

      {/* Right Column: Authentication Form */}
      <div className="flex items-center justify-center p-8 bg-background relative">
        <div className="w-full max-w-md space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="text-center lg:hidden">
            <div className="inline-flex items-center gap-2 mb-2 justify-center">
              <span className="text-2xl font-bold tracking-tight bg-gradient-to-r from-primary to-amber-500 bg-clip-text text-transparent">AgreementAIQ</span>
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            </div>
            <p className="text-sm text-muted-foreground">Document Intelligence & RAG Platform</p>
          </div>

          <Card className="border shadow-md bg-card/60 backdrop-blur-xs">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold text-center hidden lg:block">Welcome Back</CardTitle>
              <CardDescription className="text-center hidden lg:block">
                Sign in to manage and analyze your contracts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="login" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="login">Login</TabsTrigger>
                  <TabsTrigger value="register">Register</TabsTrigger>
                </TabsList>
                
                <TabsContent value="login">
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="login-email">Email</Label>
                      <Input
                        id="login-email"
                        type="email"
                        placeholder="you@example.com"
                        value={loginData.email}
                        onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                        required
                        disabled={loading}
                        className="bg-background/50 border border-border/80 focus:border-primary/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="login-password">Password</Label>
                      <Input
                        id="login-password"
                        type="password"
                        placeholder="••••••••"
                        value={loginData.password}
                        onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                        required
                        disabled={loading}
                        className="bg-background/50 border border-border/80 focus:border-primary/50"
                      />
                    </div>
                    <Button type="submit" className="w-full mt-2 font-semibold shadow-xs" disabled={loading}>
                      {loading ? "Logging in..." : "Login"}
                    </Button>
                  </form>
                </TabsContent>
                
                <TabsContent value="register">
                  <form onSubmit={handleRegister} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="register-name">Full Name (Optional)</Label>
                      <Input
                        id="register-name"
                        type="text"
                        placeholder="John Doe"
                        value={registerData.fullName}
                        onChange={(e) => setRegisterData({ ...registerData, fullName: e.target.value })}
                        disabled={loading}
                        className="bg-background/50 border border-border/80 focus:border-primary/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="register-email">Email</Label>
                      <Input
                        id="register-email"
                        type="email"
                        placeholder="you@example.com"
                        value={registerData.email}
                        onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                        required
                        disabled={loading}
                        className="bg-background/50 border border-border/80 focus:border-primary/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="register-password">Password</Label>
                      <Input
                        id="register-password"
                        type="password"
                        placeholder="••••••••"
                        value={registerData.password}
                        onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                        required
                        minLength={8}
                        disabled={loading}
                        className="bg-background/50 border border-border/80 focus:border-primary/50"
                      />
                      <p className="text-xs text-muted-foreground">
                        Must be at least 8 characters
                      </p>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="register-confirm">Confirm Password</Label>
                      <Input
                        id="register-confirm"
                        type="password"
                        placeholder="••••••••"
                        value={registerData.confirmPassword}
                        onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
                        required
                        disabled={loading}
                        className="bg-background/50 border border-border/80 focus:border-primary/50"
                      />
                    </div>
                    <Button type="submit" className="w-full mt-2 font-semibold shadow-xs" disabled={loading}>
                      {loading ? "Creating account..." : "Register"}
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
