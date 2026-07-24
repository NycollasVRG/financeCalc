import type { Metadata } from "next";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Skeleton } from "@/components/ui/skeleton";

const CompoundInterestCalculator = dynamic(
  () =>
    import("@/components/compound-interest-calculator").then(
      (mod) => mod.CompoundInterestCalculator,
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
  title: "Compound Interest Calculator — FinanceCalc",
  description:
    "See how your money grows over time with the power of compound interest. Calculate future value, total contributions, and interest earned.",
};

export default function CompoundInterestCalculatorPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
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

          <Suspense>
            <CompoundInterestCalculator />
          </Suspense>
        </div>
      </main>
      <Footer />
    </div>
  );
}
