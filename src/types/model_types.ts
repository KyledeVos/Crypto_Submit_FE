// RESPONSES
export type CryptoSummaryModelResponseType = {
    message: string;
    data: CryptoSummaryType[] | undefined
}


// DATA
export type CryptoSummaryType = {
    currencyName: string;
    currencyID: number;
    Symbol: string;
    currencyRank: number;
    currencyIsActive: boolean;
}

export type CryptoSummaryTableType = {
    name: string;
    id: number;
    symbol: string;
    rank: number;
    is_active: boolean;
}

export type latestDataType = {
    currencyName: string,
    currencySymbol: string,
    rank: number,
    currentPrice: string,
    volume24h: number,
    marketCap: number,
    marketCapDominance: number
}
