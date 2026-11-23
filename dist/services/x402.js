/**
 * ResolvaX x402 Protocol Client (Compiled ES Module)
 */
export async function callResolvaXEndpoint(endpointPath, payload, headersInit = {}) {
    const baseUrl = "https://resolvax.com.br";
    const url = `${baseUrl}${endpointPath}`;
    const defaultHeaders = {
        "Content-Type": "application/json",
        "User-Agent": "ElizaOS-ResolvaX-Plugin/1.0",
        ...headersInit
    };
    const response = await fetch(url, {
        method: "POST",
        headers: defaultHeaders,
        body: JSON.stringify(payload)
    });
    if (response.status === 402) {
        let requirement = {
            network: "base",
            chain_id: 8453,
            currency: "USDC",
            price_usdc: "0.0010",
            recipient_wallet: "0x93dd815bc8d9a6e299d936986c5ee7dc3f267fee"
        };
        try {
            const data = await response.json();
            if (data.payment_details) {
                requirement = { ...requirement, ...data.payment_details };
            }
        }
        catch { }
        return {
            status: 402,
            error: "PAYMENT_REQUIRED",
            message: `ResolvaX endpoint requires x402 on-chain settlement of ${requirement.price_usdc} USDC on Base L2 to ${requirement.recipient_wallet}.`,
            requirement
        };
    }
    if (!response.ok) {
        const errText = await response.text();
        throw new Error(`ResolvaX API error (${response.status}): ${errText}`);
    }
    return await response.json();
}
