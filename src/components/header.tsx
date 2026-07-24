"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Calculator, ArrowLeft } from "lucide-react";

export function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6">
        {isHome ? (
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Calculator className="h-4 w-4" />
            </div>
            <span className="text-lg font-semibold tracking-tight">
              FinanceCalc
            </span>
          </div>
        ) : (
          <Link
            href="/"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Link>
        )}

        <div className="flex items-center gap-2">
          {!isHome && (
            <div className="hidden items-center gap-2 sm:flex">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Calculator className="h-4 w-4" />
              </div>
              <span className="text-lg font-semibold tracking-tight">
                FinanceCalc
              </span>
            </div>
          )}
          <Button size="sm" variant="ghost" asChild>
            <Link href="/">Home</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
