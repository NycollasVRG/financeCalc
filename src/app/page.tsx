import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Calculator,
  Home,
  TrendingUp,
  DollarSign,
  PieChart,
  Shield,
  Zap,
  BarChart3,
  ArrowRight,
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Calculator className="h-4 w-4" />
            </div>
            <span className="text-lg font-semibold tracking-tight">
              FinanceCalc
            </span>
          </div>
          <nav className="hidden items-center gap-6 text-sm text-muted-foreground sm:flex">
            <a
              href="#features"
              className="hover:text-foreground transition-colors"
            >
              Features
            </a>
            <a
              href="#calculators"
              className="hover:text-foreground transition-colors"
            >
              Calculators
            </a>
            <a
              href="#benefits"
              className="hover:text-foreground transition-colors"
            >
              Benefits
            </a>
          </nav>
          <Button size="sm">
            Get Started
            <ArrowRight className="h-4 w-4" data-icon="inline-end" />
          </Button>
        </div>
      </header>

      <main className="flex-1">
        <section className="mx-auto max-w-5xl px-6 py-24 text-center sm:py-32">
          <div className="mx-auto max-w-2xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
              <Zap className="h-3 w-3" />
              Free &middot; No sign-up required
            </div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Make smarter{" "}
              <span className="text-primary">financial decisions</span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              Calculate mortgage repayments, project compound interest growth,
              and take control of your financial future — all in one place.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button size="lg" asChild>
                <Link href="/mortgage-repayments-calculator">
                  Mortgage Calculator
                  <Home className="h-4 w-4" data-icon="inline-end" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/compound-interest-calculator">
                  Compound Interest
                  <TrendingUp className="h-4 w-4" data-icon="inline-end" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <section id="features" className="border-t border-border bg-muted/30">
          <div className="mx-auto max-w-5xl px-6 py-24">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Two powerful calculators
              </h2>
              <p className="mt-3 text-muted-foreground">
                Whether you&apos;re buying a home or growing your savings, we
                have the tools you need.
              </p>
            </div>

            <div className="mt-16 grid gap-8 md:grid-cols-2">
              <Card className="relative overflow-hidden">
                <CardHeader>
                  <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400">
                    <Home className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-xl">
                    Mortgage Repayments Calculator
                  </CardTitle>
                  <CardDescription>
                    Know exactly what your home loan will cost you each month.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-3 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <DollarSign className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                      <span>
                        Calculate monthly repayments based on loan amount,
                        interest rate, and term
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <PieChart className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                      <span>
                        See a clear breakdown of principal vs. interest over the
                        life of the loan
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <BarChart3 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                      <span>
                        Compare different scenarios — adjust rates, terms, and
                        deposits instantly
                      </span>
                    </li>
                  </ul>
                  <div className="pt-2">
                    <Button className="w-full" asChild>
                      <Link href="/mortgage-repayments-calculator">
                        Try Mortgage Calculator
                        <ArrowRight
                          className="h-4 w-4"
                          data-icon="inline-end"
                        />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="relative overflow-hidden">
                <CardHeader>
                  <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400">
                    <TrendingUp className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-xl">
                    Compound Interest Calculator
                  </CardTitle>
                  <CardDescription>
                    See how your money grows over time with the power of
                    compounding.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-3 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <TrendingUp className="mt-0.5 h-4 w-4 shrink-0 text-blue-500" />
                      <span>
                        Project future value based on initial deposit,
                        contribution frequency, and rate
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <PieChart className="mt-0.5 h-4 w-4 shrink-0 text-blue-500" />
                      <span>
                        Visualize the difference between simple and compound
                        interest
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <BarChart3 className="mt-0.5 h-4 w-4 shrink-0 text-blue-500" />
                      <span>
                        Model different compounding periods — monthly,
                        quarterly, or annually
                      </span>
                    </li>
                  </ul>
                  <div className="pt-2">
                    <Button className="w-full" variant="outline" asChild>
                      <Link href="/compound-interest-calculator">
                        Try Compound Interest Calculator
                        <ArrowRight className="h-4 w-4" data-icon="inline-end" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section id="calculators" className="border-t border-border">
          <div className="mx-auto max-w-5xl px-6 py-24">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Built for clarity
              </h2>
              <p className="mt-3 text-muted-foreground">
                No clutter, no confusion — just the numbers that matter.
              </p>
            </div>
            <div className="mt-16 grid gap-6 sm:grid-cols-3">
              {[
                {
                  icon: Calculator,
                  title: "Instant Results",
                  description:
                    "Results update in real time as you adjust your inputs. No waiting, no page reloads.",
                },
                {
                  icon: Shield,
                  title: "Private by Default",
                  description:
                    "Your financial data stays in your browser. We never store or transmit your numbers.",
                },
                {
                  icon: DollarSign,
                  title: "Always Free",
                  description:
                    "No subscriptions, no hidden fees. Every calculator is completely free to use.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="flex flex-col items-center gap-3 rounded-xl border border-border p-6 text-center transition-colors hover:bg-muted/50"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted text-foreground">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="benefits" className="border-t border-border bg-muted/30">
          <div className="mx-auto max-w-5xl px-6 py-24">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Who is this for?
              </h2>
              <p className="mt-3 text-muted-foreground">
                Whether you&apos;re a first-time buyer or a seasoned investor,
                FinanceCalc has you covered.
              </p>
            </div>
            <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: "First-time home buyers",
                  description:
                    "Understand what you can afford before you start house hunting.",
                },
                {
                  title: "Property investors",
                  description:
                    "Compare mortgage scenarios and model cash flow across multiple properties.",
                },
                {
                  title: "Savers & investors",
                  description:
                    "See how consistent contributions compound into serious wealth over time.",
                },
                {
                  title: "Financial planners",
                  description:
                    "Quickly run numbers for clients without firing up heavy spreadsheet software.",
                },
                {
                  title: "Students & educators",
                  description:
                    "Learn and teach financial concepts with clear, interactive calculators.",
                },
                {
                  title: "Anyone with a goal",
                  description:
                    "Planning a big purchase? Retirement? Our tools help you get there faster.",
                },
              ].map((item) => (
                <div key={item.title} className="space-y-2">
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-border">
          <div className="mx-auto max-w-5xl px-6 py-24 text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Ready to crunch the numbers?
            </h2>
            <p className="mx-auto mt-3 max-w-md text-muted-foreground">
              Start calculating in seconds. No account needed.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button size="lg" asChild>
                <Link href="/mortgage-repayments-calculator">
                  Mortgage Calculator
                  <Home className="h-4 w-4" data-icon="inline-end" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/compound-interest-calculator">
                  Compound Interest Calculator
                  <TrendingUp className="h-4 w-4" data-icon="inline-end" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Calculator className="h-4 w-4" />
            <span className="font-medium text-foreground">FinanceCalc</span>
          </div>
          <p>&copy; {new Date().getFullYear()} FinanceCalc</p>
        </div>
      </footer>
    </div>
  );
}
