import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Calculator, ArrowLeft } from "lucide-react";
import { MortgageCalculator } from "@/components/mortgage-calculator";

export const metadata: Metadata = {
  title: "Mortgage Repayments Calculator — FinanceCalc",
  description:
    "Calculate your monthly mortgage repayments, total interest, and see a breakdown of your home loan costs.",
};

export default function MortgageRepaymentsCalculatorPage() {
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
              Mortgage Repayments Calculator
            </h1>
            <p className="mt-3 max-w-2xl text-muted-foreground">
              Enter your loan details below to see how much you&apos;ll pay each
              month and the total cost of your mortgage.
            </p>
          </div>

          <MortgageCalculator />
        </div>
      </main>
    </div>
  );
}
