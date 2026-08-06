"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  FileText,
  MessageSquare,
  FolderOpen,
  Settings,
  FileCheck,
  LogOut,
  User,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useAuth } from "@/contexts/auth-context";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const navigation = [
  { name: "Workspaces", href: "/", icon: FolderOpen },
  { name: "Documents", href: "/documents", icon: FileText },
  { name: "Clauses", href: "/clauses", icon: FileCheck },
  { name: "Q&A", href: "/qa", icon: MessageSquare },
  { name: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("sidebar-collapsed");
    if (stored) {
      setIsCollapsed(stored === "true");
    }
    setIsMounted(true);
  }, []);

  const toggleSidebar = () => {
    const newState = !isCollapsed;
    setIsCollapsed(newState);
    localStorage.setItem("sidebar-collapsed", String(newState));
  };

  // Prevent layout flash on mount by showing full sidebar during SSR/hydration
  const sidebarWidthClass = isMounted
    ? (isCollapsed ? "w-[70px]" : "w-64")
    : "w-64";

  return (
    <div
      className={cn(
        "flex h-full flex-col border-r border-border bg-sidebar transition-all duration-300 ease-in-out",
        sidebarWidthClass
      )}
    >
      <div
        className={cn(
          "flex h-16 items-center border-b border-sidebar-border gap-1.5 transition-all duration-300",
          isCollapsed && isMounted ? "justify-center px-2" : "justify-between px-6"
        )}
      >
        {(!isCollapsed || !isMounted) && (
          <h1 className="text-xl font-bold text-sidebar-foreground tracking-tight transition-opacity duration-300">
            AgreementAIQ
          </h1>
        )}
        {isCollapsed && isMounted ? (
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-sidebar-accent text-sidebar-accent-foreground font-bold text-sm shadow-sm transition-all duration-300">
            A
          </div>
        ) : (
          <span className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_var(--primary)]" />
        )}
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "h-8 w-8 hover:bg-sidebar-accent text-sidebar-foreground/70 hover:text-sidebar-foreground transition-all duration-300",
            (!isCollapsed || !isMounted) && "ml-auto"
          )}
          onClick={toggleSidebar}
          title={isCollapsed && isMounted ? "Expand Sidebar" : "Collapse Sidebar"}
        >
          {isCollapsed && isMounted ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-4">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              title={isCollapsed && isMounted ? item.name : undefined}
              className={cn(
                "group flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-all duration-300",
                isCollapsed && isMounted ? "justify-center" : "gap-3",
                isActive
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              )}
            >
              <item.icon className="h-5 w-5 flex-shrink-0" />
              {(!isCollapsed || !isMounted) && (
                <span className="truncate transition-opacity duration-300">
                  {item.name}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      <div
        className={cn(
          "border-t border-sidebar-border p-4 transition-all duration-300",
          isCollapsed && isMounted ? "px-2" : "p-4"
        )}
      >
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className={cn(
                "w-full text-sidebar-foreground/70 hover:text-sidebar-foreground transition-all duration-300",
                isCollapsed && isMounted ? "justify-center px-0 gap-0" : "justify-start gap-2"
              )}
              title={isCollapsed && isMounted ? (user?.full_name || user?.email || "User") : undefined}
            >
              <User className="h-4 w-4 flex-shrink-0" />
              {(!isCollapsed || !isMounted) && (
                <span className="truncate transition-opacity duration-300">
                  {user?.full_name || user?.email || "User"}
                </span>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            side={isCollapsed && isMounted ? "right" : "bottom"}
            align={isCollapsed && isMounted ? "start" : "end"}
            sideOffset={10}
            className="w-56"
          >
            <DropdownMenuLabel>
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium">{user?.full_name || "User"}</p>
                <p className="text-xs text-muted-foreground">{user?.email}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={logout} className="text-destructive">
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

