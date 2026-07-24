import { Calculator } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-6 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <Calculator className="h-4 w-4" />
          <span className="font-medium text-foreground">FinanceCalc</span>
        </div>
        <p>&copy; {new Date().getFullYear()} FinanceCalc</p>
      </div>
    </footer>
  );
}
