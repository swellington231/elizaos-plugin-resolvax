# elizaos-plugin-resolvax 🚀

> Official **ElizaOS** plugin for the **ResolvaX Autonomous Math & Pedagogical Engine** with native **x402 on-chain micropayments** on Coinbase's **Base Layer 2** (USDC).

---

## 🌟 Overview

Large Language Models (LLMs) frequently struggle with deterministic mathematical reasoning, financial amortization schedules, and canonical LaTeX formatting.

The **ResolvaX Plugin** connects any ElizaOS agent directly to ResolvaX's high-precision analytical backend:
- 📐 **Math Solver Engine:** Step-by-step analytical algebra, equation solving, calculus, and linear systems.
- 💰 **Financial Math Engine:** French (Price) and German (SAC) amortization tables, compound interest, NPV (VPL), and IRR (TIR).
- 📜 **LaTeX Converter Engine:** Turns conversational math and OCR transcripts into publication-ready LaTeX syntax.
- ⚡ **Autonomous M2M Commerce (x402):** Settles API calls on-chain using micro-transactions in USDC on Base L2 (Chain ID 8453).

---

## 📦 Installation

Inside your ElizaOS project, run:

```bash
pnpm add elizaos-plugin-resolvax
```

Or with npm / yarn:
```bash
npm install elizaos-plugin-resolvax
```

---

## 🛠️ Usage in Character Configuration

Add `"elizaos-plugin-resolvax"` to the `plugins` array in your agent's character file (e.g. `characters/myagent.character.json`):

```json
{
  "name": "MathTutorAgent",
  "clients": ["twitter", "discord"],
  "modelProvider": "openai",
  "plugins": [
    "elizaos-plugin-resolvax"
  ],
  "bio": [
    "Autonomous assistant specialized in precision science, education, and finance powered by ResolvaX."
  ]
}
```

---

## ⚡ Available Actions

| Action Name | Description | Example Query |
| :--- | :--- | :--- |
| `RESOLVAX_SOLVE_MATH` | Solves linear, quadratic, differential, and integral equations step by step. | *"Solve 4x + 12 = 32 with step by step justification"* |
| `RESOLVAX_FINANCIAL_MATH` | Generates amortization schedules (Price/SAC) and financial metrics. | *"Calculate a 50,000 loan in 24 months with 2% interest using SAC"* |
| `RESOLVAX_LATEX_CONVERT` | Converts expressions to formatted LaTeX code blocks. | *"Convert the integral from 0 to 1 of x^2 dx into canonical LaTeX"* |

---

## 💳 The x402 Micropayment Protocol

When an agent invokes a paid tool:
1. ResolvaX checks for pre-authorization or responds with `HTTP 402 Payment Required`.
2. The agent settles the micro-fee (e.g. `$0.0010` to `$0.0050` USDC) on **Base L2** to the verified recipient wallet `0x93dd815bc8d9a6e299d936986c5ee7dc3f267fee`.
3. Attaches the transaction hash in the `x-402-payment-hash` header.
4. Instant analytical execution and JSON delivery.

---

## 📄 License

MIT © [ResolvaX Tecnologias](https://resolvax.com.br)
