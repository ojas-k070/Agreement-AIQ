"use client";

import { Sidebar } from "./Sidebar";

export function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Left Sidebar */}
      <Sidebar />

      {/* Right Content Area */}
      <main className="flex-1 overflow-y-auto p-6 md:p-8 bg-background/30">
        <div className="max-w-7xl mx-auto space-y-6">
          {children}
        </div>
      </main>
    </div>
  );
}

