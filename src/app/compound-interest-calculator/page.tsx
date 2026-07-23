import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Calculator, ArrowLeft } from "lucide-react";
import { CompoundInterestCalculator } from "@/components/compound-interest-calculator";

export const metadata: Metadata = {
  title: "Compound Interest Calculator — FinanceCalc",
  description:
    "See how your money grows over time with the power of compound interest. Calculate future value, total contributions, and interest earned.",
};

export default function CompoundInterestCalculatorPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Link>
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Calculator className="h-4 w-4" />
            </div>
            <span className="text-lg font-semibold tracking-tight">
              FinanceCalc
            </span>
          </div>
          <Button size="sm" variant="ghost" asChild>
            <Link href="/">Home</Link>
          </Button>
        </div>
      </header>

      <main className="flex-1">
        <div className="mx-auto max-w-5xl px-6 py-12">
          <div className="mb-10">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Compound Interest Calculator
            </h1>
            <p className="mt-3 max-w-2xl text-muted-foreground">
              See how your investments grow over time. Enter your details below
              to project the future value of your savings.
            </p>
          </div>

          <CompoundInterestCalculator />
        </div>
      </main>
    </div>
  );
}
