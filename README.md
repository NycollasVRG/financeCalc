# FinanceCalc

**Smart financial calculators that help you make better decisions.**

FinanceCalc is a free, fast, and privacy-focused web application for calculating mortgage repayments and projecting compound interest growth. No sign-up required — just open and calculate.

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8?logo=tailwindcss)](https://tailwindcss.com)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

---

## Features

### Mortgage Repayments Calculator

- Calculate monthly repayments based on loan amount, interest rate, and term
- Compare **repayment** vs **interest-only** mortgage types
- See total interest paid over the life of the loan
- Visual breakdown of principal vs. interest

### Compound Interest Calculator

- Project future value of investments over time
- Model different compounding periods (monthly, quarterly, annually)
- Factor in regular monthly contributions
- See total interest earned at a glance

### General

- **Instant results** — calculations update in real time as you type
- **Private by default** — all data stays in your browser, nothing is stored or transmitted
- **Always free** — no subscriptions, no hidden fees
- **Shareable links** — share your calculations via URL with pre-filled parameters
- **Responsive design** — works perfectly on desktop, tablet, and mobile
- **Dark mode** — automatic support for system preference
- **Lazy loading** — components load on demand for faster initial page load
- **Security headers** — CSP, HSTS, X-Frame-Options, and more

---

## Tech Stack

| Technology                                   | Purpose                         |
| -------------------------------------------- | ------------------------------- |
| [Next.js 16](https://nextjs.org)             | React framework with App Router |
| [React 19](https://react.dev)                | UI library                      |
| [TypeScript](https://www.typescriptlang.org) | Type safety                     |
| [Tailwind CSS 4](https://tailwindcss.com)    | Utility-first styling           |
| [shadcn/ui](https://ui.shadcn.com)           | Accessible UI components        |
| [Lucide React](https://lucide.dev)           | Icons                           |

---

## Getting Started

### Prerequisites

- **Node.js** 18.17 or later
- **npm**, **yarn**, or **pnpm**

### Installation

```bash
# Clone the repository
git clone https://github.com/NycollasVRG/financeCalc.git

# Navigate to the project
cd financeCalc

# Install dependencies
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm start
```

---

## Project Structure

```
financeCalc/
├── src/
│   ├── app/
│   │   ├── page.tsx                          # Landing page
│   │   ├── compound-interest-calculator/
│   │   │   └── page.tsx                      # Compound interest page
│   │   ├── mortgage-repayments-calculator/
│   │   │   └── page.tsx                      # Mortgage calculator page
│   │   ├── layout.tsx                        # Root layout
│   │   └── globals.css                       # Global styles
│   ├── components/
│   │   ├── header.tsx                        # Shared header
│   │   ├── footer.tsx                        # Shared footer
│   │   ├── compound-interest-calculator.tsx   # Compound interest logic
│   │   ├── mortgage-calculator.tsx            # Mortgage calculator logic
│   │   ├── input-with-icon.tsx               # Reusable input component
│   │   └── ui/                               # shadcn/ui components
│   ├── hooks/
│   │   └── use-query-params.ts               # URL state sync hook
│   └── lib/
│       └── utils.ts                          # Utility functions
├── public/                                   # Static assets
├── next.config.ts                            # Next.js config + security headers
├── tailwind.config.ts                        # Tailwind configuration
└── package.json
```

---

## Calculators

### Mortgage Calculator

| Parameter      | Description                           |
| -------------- | ------------------------------------- |
| Property Price | Total price of the property           |
| Deposit        | Upfront payment (reduces loan amount) |
| Interest Rate  | Annual interest rate (%)              |
| Mortgage Term  | Loan duration (5–40 years)            |
| Repayment Type | Full repayment or interest-only       |

### Compound Interest Calculator

| Parameter            | Description                     |
| -------------------- | ------------------------------- |
| Initial Investment   | Starting amount                 |
| Monthly Contribution | Recurring monthly deposit       |
| Annual Interest Rate | Expected annual return (%)      |
| Investment Term      | Duration (1–40 years)           |
| Compound Frequency   | Monthly, quarterly, or annually |

---

## Security

FinanceCalc includes several security measures:

- **Content Security Policy (CSP)** — restricts resource loading origins
- **HTTP Strict Transport Security (HSTS)** — enforces HTTPS connections
- **X-Content-Type-Options** — prevents MIME type sniffing
- **X-Frame-Options** — prevents clickjacking attacks
- **X-XSS-Protection** — enables browser XSS filtering
- **Referrer-Policy** — controls referrer information sharing
- **Permissions-Policy** — restricts access to browser features
- **poweredByHeader: false** — hides server technology

---

## Performance

- **Static Generation** — pages are pre-rendered at build time
- **Lazy Loading** — calculator components load only when needed
- **Code Splitting** — JavaScript bundles are split per route
- **Optimized Fonts** — Geist font loaded via `next/font`
- **Tailwind Purging** — unused CSS is automatically removed

---

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## License

This project is licensed under the MIT License.

---

## Acknowledgments

- [Next.js](https://nextjs.org) for the amazing framework
- [shadcn/ui](https://ui.shadcn.com) for beautiful, accessible components
- [Vercel](https://vercel.com) for hosting and deployment platform
