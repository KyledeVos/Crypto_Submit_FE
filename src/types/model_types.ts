// RESPONSES
export type CryptoSummaryModelResponseType = {
    message: string;
    data: CryptoSummaryType[] | undefined
}


// DATA
export type CryptoSummaryType = {
    currencyName: string;
    currencyID: number;
    currencySymbol: string;
    currencyRank: number;
    currencyIsActive: boolean;
}