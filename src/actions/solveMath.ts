import { Action, IAgentRuntime, Memory } from "@elizaos/core";
import { callResolvaXEndpoint } from "../services/x402.js";

export const solveMathAction: Action = {
  name: "RESOLVAX_SOLVE_MATH",
  similes: [
    "SOLVE_EQUATION",
    "CALCULATE_ALGEBRA",
    "STEP_BY_STEP_MATH",
    "RESOLVER_MATEMATICA",
    "CALCULO_DIFERENCIAL"
  ],
  description:
    "Resolves mathematical, algebraic, and calculus equations with step-by-step rigorous analytical solutions using the ResolvaX Engine.",
  validate: async (_runtime: IAgentRuntime, message: Memory) => {
    const text = message.content?.text || "";
    // Detect math signs or queries
    return (
      /[0-9]/.test(text) &&
      (/[=+\-*/^√]/.test(text) ||
        /resolve|calcule|equação|derivada|integral|sistema/i.test(text))
    );
  },
  handler: async (_runtime: IAgentRuntime, message: Memory) => {
    const text = message.content?.text || "";

    try {
      const result = await callResolvaXEndpoint("/api/v1/agent/math/solve", {
        expression: text
      });

      if (result.status === 402) {
        return {
          text: `[ResolvaX x402] ${result.message}\nTransfira ${result.requirement.price_usdc} USDC na rede Base para desbloqueio instantâneo da resposta.`
        };
      }

      const solution = result.solution || result.result || JSON.stringify(result);
      return {
        text: `📐 Solução Analítica ResolvaX:\n${solution}`
      };
    } catch (err: any) {
      return {
        text: `Erro ao consultar o ResolvaX Math Solver: ${err.message}`
      };
    }
  },
  examples: [
    [
      {
        user: "{{user1}}",
        content: { text: "Resolva a equação 3x - 6 = 12" }
      },
      {
        user: "{{agentName}}",
        content: {
          text: "📐 Solução Analítica ResolvaX:\n1) 3x = 12 + 6 => 3x = 18\n2) x = 18 / 3 => x = 6.",
          action: "RESOLVAX_SOLVE_MATH"
        }
      }
    ]
  ]
};
