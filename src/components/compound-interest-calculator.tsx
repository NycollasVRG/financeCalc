"use client";

import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  TrendingUp,
  DollarSign,
  Percent,
  Calendar,
  Calculator,
  Share2,
} from "lucide-react";
import { InputWithIcon } from "@/components/input-with-icon";
import { formatCurrency, parseNumericInput } from "@/lib/utils";
import { useQueryParams } from "@/hooks/use-query-params";

const FREQUENCY_MAP: Record<string, number> = {
  monthly: 12,
  quarterly: 4,
  annually: 1,
};

type CompoundInterestParams = {
  initial?: string;
  monthly?: string;
  rate?: string;
  years?: string;
  frequency?: string;
  [key: string]: string | undefined;
};

export function CompoundInterestCalculator() {
  const { params, updateParam } = useQueryParams<CompoundInterestParams>();

  const initialInvestment = params.initial || "10000";
  const monthlyContribution = params.monthly || "500";
  const interestRate = params.rate || "7";
  const termYears = params.years || "10";
  const compoundFrequency = params.frequency || "monthly";

  const handleInputChange =
    (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      if (value === "" || /^\d*\.?\d*$/.test(value)) {
        updateParam(key, value);
      }
    };

  const results = useMemo(() => {
    const principal = parseNumericInput(initialInvestment);
    const contribution = parseNumericInput(monthlyContribution);
    const rate = parseNumericInput(interestRate);
    const years = parseInt(termYears) || 0;
    const n = FREQUENCY_MAP[compoundFrequency] || 12;

    if (rate === 0 || years === 0) {
      return null;
    }

    const r = rate / 100;
    const nt = n * years;
    const rOverN = r / n;

    const fvPrincipal = principal * Math.pow(1 + rOverN, nt);

    let fvContributions: number;
    if (rOverN === 0) {
      fvContributions = contribution * 12 * years;
    } else {
      const totalMonths = years * 12;
      let futureValueOfContributions = 0;
      const monthlyRate = Math.pow(1 + rOverN, n / 12) - 1;

      for (let month = 1; month <= totalMonths; month++) {
        const remainingMonths = totalMonths - month;
        futureValueOfContributions +=
          contribution * Math.pow(1 + monthlyRate, remainingMonths);
      }
      fvContributions = futureValueOfContributions;
    }

    const futureValue = fvPrincipal + fvContributions;
    const totalContributed = principal + contribution * 12 * years;
    const totalInterest = futureValue - totalContributed;

    return { futureValue, totalContributed, totalInterest, principal };
  }, [
    initialInvestment,
    monthlyContribution,
    interestRate,
    termYears,
    compoundFrequency,
  ]);

  const shareUrl = useMemo(() => {
    if (typeof window === "undefined") return "";
    const url = new URL(window.location.href);
    url.searchParams.set("initial", initialInvestment);
    url.searchParams.set("monthly", monthlyContribution);
    url.searchParams.set("rate", interestRate);
    url.searchParams.set("years", termYears);
    url.searchParams.set("frequency", compoundFrequency);
    return url.toString();
  }, [
    initialInvestment,
    monthlyContribution,
    interestRate,
    termYears,
    compoundFrequency,
  ]);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "FinanceCalc - Compound Interest Calculation",
          text: "Check out this compound interest calculation",
          url: shareUrl,
        });
      } catch {
        await navigator.clipboard.writeText(shareUrl);
      }
    } else {
      await navigator.clipboard.writeText(shareUrl);
    }
  };

  return (
    <div className="grid gap-8 lg:grid-cols-5">
      <div className="lg:col-span-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Calculator className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              Investment Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="initial-investment">Initial Investment</Label>
                <InputWithIcon
                  id="initial-investment"
                  icon={DollarSign}
                  type="number"
                  placeholder="10,000"
                  value={initialInvestment}
                  onChange={handleInputChange("initial")}
                  min="0"
                  max="10000000"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="monthly-contribution">
                  Monthly Contribution
                </Label>
                <InputWithIcon
                  id="monthly-contribution"
                  icon={DollarSign}
                  type="number"
                  placeholder="500"
                  value={monthlyContribution}
                  onChange={handleInputChange("monthly")}
                  min="0"
                  max="100000"
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="interest-rate">Annual Interest Rate</Label>
                <InputWithIcon
                  id="interest-rate"
                  icon={Percent}
                  type="number"
                  step="0.1"
                  placeholder="7"
                  value={interestRate}
                  onChange={handleInputChange("rate")}
                  min="0"
                  max="100"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="term">Investment Term</Label>
                <div className="relative">
                  <Calendar className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Select
                    value={termYears}
                    onValueChange={(v) => updateParam("years", v)}
                  >
                    <SelectTrigger id="term" className="w-full pl-8">
                      <SelectValue placeholder="Select term" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 40 }, (_, i) => i + 1).map((y) => (
                        <SelectItem key={y} value={String(y)}>
                          {y} {y === 1 ? "year" : "years"}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Compound Frequency</Label>
              <Select
                value={compoundFrequency}
                onValueChange={(v) => updateParam("frequency", v)}
              >
                <SelectTrigger className="w-full sm:w-[200px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="quarterly">Quarterly</SelectItem>
                  <SelectItem value="annually">Annually</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <button
              onClick={handleShare}
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <Share2 className="h-4 w-4" />
              Share this calculation
            </button>
          </CardContent>
        </Card>
      </div>

      <div className="lg:col-span-2">
        <Card className="border-blue-200 bg-blue-50/50 dark:border-blue-900/50 dark:bg-blue-950/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <TrendingUp className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              Your Projection
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <p className="text-sm text-muted-foreground">Future Value</p>
              <p className="text-4xl font-bold tracking-tight text-blue-700 dark:text-blue-300">
                {results ? formatCurrency(results.futureValue) : "$0"}
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Total Contributed</span>
                <span className="font-medium">
                  {results ? formatCurrency(results.totalContributed) : "$0"}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Interest Earned</span>
                <span className="font-medium">
                  {results ? formatCurrency(results.totalInterest) : "$0"}
                </span>
              </div>
            </div>

            <div className="rounded-lg border border-border bg-background p-4">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Contributed / Interest</span>
                <span className="font-medium text-foreground">
                  {results
                    ? `${((results.totalInterest / results.futureValue) * 100).toFixed(1)}% interest`
                    : "0% interest"}
                </span>
              </div>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-muted">
                <div
                  className="h-2 rounded-full bg-blue-500 transition-all"
                  style={{
                    width: results
                      ? `${Math.min((results.totalContributed / results.futureValue) * 100, 100)}%`
                      : "0%",
                  }}
                />
              </div>
            </div>

            <p className="text-xs leading-relaxed text-muted-foreground">
              This is a projection only. Actual returns may vary based on market
              conditions, fees, and changes to interest rates.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
