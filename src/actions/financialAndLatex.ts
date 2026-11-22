import { Action, IAgentRuntime, Memory } from "@elizaos/core";
import { callResolvaXEndpoint } from "../services/x402.js";

export const financialMathAction: Action = {
  name: "RESOLVAX_FINANCIAL_MATH",
  similes: [
    "CALCULATE_AMORTIZATION",
    "PRICE_TABLE",
    "SAC_TABLE",
    "COMPOUND_INTEREST",
    "CALCULO_FINANCEIRO"
  ],
  description:
    "Calculates financial math tables (Price, SAC amortization), compound interest, NPV, and IRR using the ResolvaX Engine.",
  validate: async (_runtime: IAgentRuntime, message: Memory) => {
    const text = message.content?.text || "";
    return /juros|amortização|price|sac|financiamento|investimento|tir|vpl/i.test(text);
  },
  handler: async (_runtime: IAgentRuntime, message: Memory) => {
    const text = message.content?.text || "";

    try {
      const result = await callResolvaXEndpoint("/api/v1/agent/math/financial", {
        query: text
      });

      if (result.status === 402) {
        return {
          text: `[ResolvaX x402] ${result.message}`
        };
      }

      return {
        text: `💰 Cálculo Financeiro ResolvaX:\n${result.summary || JSON.stringify(result)}`
      };
    } catch (err: any) {
      return {
        text: `Erro ao consultar o ResolvaX Financial Engine: ${err.message}`
      };
    }
  },
  examples: [
    [
      {
        user: "{{user1}}",
        content: { text: "Calcule uma amortização de R$ 50.000 em 12x pela tabela Price com juros de 1.5% ao mês" }
      },
      {
        user: "{{agentName}}",
        content: {
          text: "💰 Cálculo Financeiro ResolvaX: Parcela fixa de R$ 4.588,61. Total de juros: R$ 5.063,32.",
          action: "RESOLVAX_FINANCIAL_MATH"
        }
      }
    ]
  ]
};

export const latexConvertAction: Action = {
  name: "RESOLVAX_LATEX_CONVERT",
  similes: ["CONVERT_LATEX", "EXPRESSION_TO_LATEX", "EQUATION_LATEX"],
  description:
    "Converts plain mathematical text or equations into canonical, publication-ready LaTeX syntax via ResolvaX.",
  validate: async (_runtime: IAgentRuntime, message: Memory) => {
    const text = message.content?.text || "";
    return /latex|formatação matemática|sintaxe latex/i.test(text);
  },
  handler: async (_runtime: IAgentRuntime, message: Memory) => {
    const text = message.content?.text || "";

    try {
      const result = await callResolvaXEndpoint("/api/v1/agent/math/latex", {
        raw_text: text
      });

      if (result.status === 402) {
        return { text: `[ResolvaX x402] ${result.message}` };
      }

      return {
        text: `📜 LaTeX Canônico ResolvaX:\n\`\`\`latex\n${result.latex || result.result}\n\`\`\``
      };
    } catch (err: any) {
      return { text: `Erro ao converter para LaTeX: ${err.message}` };
    }
  },
  examples: [
    [
      {
        user: "{{user1}}",
        content: { text: "Converta para LaTeX: integral de 0 a infinito de e elevado a -x ao quadrado dx" }
      },
      {
        user: "{{agentName}}",
        content: {
          text: "📜 LaTeX Canônico ResolvaX:\n```latex\n\\int_{0}^{\\infty} e^{-x^2} \\, dx = \\frac{\\sqrt{\\pi}}{2}\n```",
          action: "RESOLVAX_LATEX_CONVERT"
        }
      }
    ]
  ]
};
