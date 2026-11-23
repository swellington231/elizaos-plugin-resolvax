import { solveMathAction } from "./actions/solveMath.js";
import { financialMathAction, latexConvertAction } from "./actions/financialAndLatex.js";

export * from "./actions/solveMath.js";
export * from "./actions/financialAndLatex.js";
export * from "./services/x402.js";

export const resolvaxPlugin = {
    name: "resolvax",
    description: "ResolvaX Autonomous Agent Plugin: high-precision math, financial analytics, and LaTeX conversion with x402 on-chain settlement on Base L2.",
    actions: [solveMathAction, financialMathAction, latexConvertAction],
    evaluators: [],
    providers: []
};

export default resolvaxPlugin;
