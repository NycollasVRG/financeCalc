import type { Metadata } from "next";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Skeleton } from "@/components/ui/skeleton";

const MortgageCalculator = dynamic(
  () =>
    import("@/components/mortgage-calculator").then(
      (mod) => mod.MortgageCalculator,
    ),
  {
    loading: () => (
      <div className="grid gap-8 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <Skeleton className="h-[400px] w-full rounded-xl" />
        </div>
        <div className="lg:col-span-2">
          <Skeleton className="h-[400px] w-full rounded-xl" />
        </div>
      </div>
    ),
  },
);

export const metadata: Metadata = {
  title: "Mortgage Repayments Calculator — FinanceCalc",
  description:
    "Calculate your monthly mortgage repayments, total interest, and see a breakdown of your home loan costs.",
};

export default function MortgageRepaymentsCalculatorPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
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

          <Suspense>
            <MortgageCalculator />
          </Suspense>
        </div>
      </main>
      <Footer />
    </div>
  );
}
