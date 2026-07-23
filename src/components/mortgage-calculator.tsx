"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Home, DollarSign, Percent, Calendar, Calculator } from "lucide-react";

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

export function MortgageCalculator() {
  const [propertyPrice, setPropertyPrice] = useState("400000");
  const [deposit, setDeposit] = useState("80000");
  const [interestRate, setInterestRate] = useState("5.5");
  const [termYears, setTermYears] = useState("30");
  const [repaymentType, setRepaymentType] = useState("repayment");

  const results = useMemo(() => {
    const price = parseFloat(propertyPrice) || 0;
    const dep = parseFloat(deposit) || 0;
    const rate = parseFloat(interestRate) || 0;
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
                <div className="relative">
                  <DollarSign className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="property-price"
                    type="number"
                    placeholder="400,000"
                    value={propertyPrice}
                    onChange={(e) => setPropertyPrice(e.target.value)}
                    className="pl-8"
                    min="0"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="deposit">Deposit</Label>
                <div className="relative">
                  <DollarSign className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="deposit"
                    type="number"
                    placeholder="80,000"
                    value={deposit}
                    onChange={(e) => setDeposit(e.target.value)}
                    className="pl-8"
                    min="0"
                  />
                </div>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="interest-rate">Interest Rate</Label>
                <div className="relative">
                  <Percent className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="interest-rate"
                    type="number"
                    step="0.1"
                    placeholder="5.5"
                    value={interestRate}
                    onChange={(e) => setInterestRate(e.target.value)}
                    className="pl-8"
                    min="0"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="term">Mortgage Term</Label>
                <div className="relative">
                  <Calendar className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Select value={termYears} onValueChange={setTermYears}>
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
              <Select value={repaymentType} onValueChange={setRepaymentType}>
                <SelectTrigger className="w-full sm:w-[200px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="repayment">Repayment</SelectItem>
                  <SelectItem value="interest-only">Interest Only</SelectItem>
                </SelectContent>
              </Select>
            </div>
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
