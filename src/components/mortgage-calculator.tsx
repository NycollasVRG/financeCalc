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
  Home,
  DollarSign,
  Percent,
  Calendar,
  Calculator,
  Share2,
} from "lucide-react";
import { InputWithIcon } from "@/components/input-with-icon";
import { formatCurrency, parseNumericInput } from "@/lib/utils";
import { useQueryParams } from "@/hooks/use-query-params";

type MortgageParams = {
  price?: string;
  deposit?: string;
  rate?: string;
  years?: string;
  type?: string;
  [key: string]: string | undefined;
};

export function MortgageCalculator() {
  const { params, updateParam } = useQueryParams<MortgageParams>();

  const propertyPrice = params.price || "400000";
  const deposit = params.deposit || "80000";
  const interestRate = params.rate || "5.5";
  const termYears = params.years || "30";
  const repaymentType = params.type || "repayment";

  const handleInputChange =
    (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      if (value === "" || /^\d*\.?\d*$/.test(value)) {
        updateParam(key, value);
      }
    };

  const results = useMemo(() => {
    const price = parseNumericInput(propertyPrice);
    const dep = parseNumericInput(deposit);
    const rate = parseNumericInput(interestRate);
    const years = parseInt(termYears) || 0;

    const principal = Math.max(price - dep, 0);
    const monthlyRate = rate / 100 / 12;
    const totalMonths = years * 12;

    if (principal === 0 || monthlyRate === 0 || totalMonths === 0) {
      return null;
    }

    let monthlyPayment: number;

    if (repaymentType === "repayment") {
      monthlyPayment =
        (principal * (monthlyRate * Math.pow(1 + monthlyRate, totalMonths))) /
        (Math.pow(1 + monthlyRate, totalMonths) - 1);
    } else {
      monthlyPayment = principal * monthlyRate;
    }

    const totalPaid = monthlyPayment * totalMonths;
    const totalInterest = totalPaid - principal;

    return { monthlyPayment, totalPaid, totalInterest, principal };
  }, [propertyPrice, deposit, interestRate, termYears, repaymentType]);

  const shareUrl = useMemo(() => {
    if (typeof window === "undefined") return "";
    const url = new URL(window.location.href);
    url.searchParams.set("price", propertyPrice);
    url.searchParams.set("deposit", deposit);
    url.searchParams.set("rate", interestRate);
    url.searchParams.set("years", termYears);
    url.searchParams.set("type", repaymentType);
    return url.toString();
  }, [propertyPrice, deposit, interestRate, termYears, repaymentType]);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "FinanceCalc - Mortgage Calculation",
          text: "Check out this mortgage calculation",
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
              <Calculator className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              Loan Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="property-price">Property Price</Label>
                <InputWithIcon
                  id="property-price"
                  icon={DollarSign}
                  type="number"
                  placeholder="400,000"
                  value={propertyPrice}
                  onChange={handleInputChange("price")}
                  min="0"
                  max="10000000"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="deposit">Deposit</Label>
                <InputWithIcon
                  id="deposit"
                  icon={DollarSign}
                  type="number"
                  placeholder="80,000"
                  value={deposit}
                  onChange={handleInputChange("deposit")}
                  min="0"
                  max="10000000"
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="interest-rate">Interest Rate</Label>
                <InputWithIcon
                  id="interest-rate"
                  icon={Percent}
                  type="number"
                  step="0.1"
                  placeholder="5.5"
                  value={interestRate}
                  onChange={handleInputChange("rate")}
                  min="0"
                  max="100"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="term">Mortgage Term</Label>
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
                      {[5, 10, 15, 20, 25, 30, 35, 40].map((y) => (
                        <SelectItem key={y} value={String(y)}>
                          {y} years
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Repayment Type</Label>
              <Select
                value={repaymentType}
                onValueChange={(v) => updateParam("type", v)}
              >
                <SelectTrigger className="w-full sm:w-[200px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="repayment">Repayment</SelectItem>
                  <SelectItem value="interest-only">Interest Only</SelectItem>
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
        <Card className="border-emerald-200 bg-emerald-50/50 dark:border-emerald-900/50 dark:bg-emerald-950/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Home className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              Your Estimate
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <p className="text-sm text-muted-foreground">Monthly Repayment</p>
              <p className="text-4xl font-bold tracking-tight text-emerald-700 dark:text-emerald-300">
                {results ? formatCurrency(results.monthlyPayment) : "$0"}
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Loan Amount</span>
                <span className="font-medium">
                  {results ? formatCurrency(results.principal) : "$0"}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Total Amount Paid</span>
                <span className="font-medium">
                  {results ? formatCurrency(results.totalPaid) : "$0"}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Total Interest</span>
                <span className="font-medium">
                  {results ? formatCurrency(results.totalInterest) : "$0"}
                </span>
              </div>
            </div>

            <div className="rounded-lg border border-border bg-background p-4">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Interest / Principal</span>
                <span className="font-medium text-foreground">
                  {results
                    ? `${((results.totalInterest / results.principal) * 100).toFixed(1)}%`
                    : "0%"}
                </span>
              </div>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-muted">
                <div
                  className="h-2 rounded-full bg-emerald-500 transition-all"
                  style={{
                    width: results
                      ? `${Math.min((results.totalInterest / results.totalPaid) * 100, 100)}%`
                      : "0%",
                  }}
                />
              </div>
            </div>

            <p className="text-xs leading-relaxed text-muted-foreground">
              This is an estimate only. Actual repayments may vary based on
              fees, insurance, and changes to interest rates.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
