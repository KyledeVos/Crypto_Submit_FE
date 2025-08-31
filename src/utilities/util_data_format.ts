
import type { latestDataType, CryptoSummaryType } from "../types/model_types"
import { developerLog } from "./util_logs"

/**
 * Convert snake case data to camelCase for FE
 * @param data of type latestDataType
 */
export const formatLatestData = (data: any ): latestDataType | undefined=> {

    if(data === undefined){
        developerLog("formatLatestData given undefined data")
        return undefined
    }
        return {
        currencyName: data.currency_name,
        currencySymbol: data.currency_symbol,
        rank: data.rank,
        currentPrice: data.current_price,
        volume24h: data.volume_24h,
        marketCap: data.market_cap,
        marketCapDominance: data.market_cap_dominance
        }
}

/**
 * Convert snake case data to camelCase for FE
 * @param data of type latestDataType
 */
export const formatSummaryData = (data: any ): CryptoSummaryType[] | undefined=> {

    if(data === undefined){
        developerLog("formatSummaryData given undefined data")
        return undefined
    }else if(!Array.isArray(data) || data.length === 0){
        developerLog("formatSummaryData given data that is not any array or is blank")
    }

    return data.map((currentValue: any)=> {
        return {
        "Name": currentValue.currency_name,
        "Coin ID": currentValue.currency_id,
        "Symbol": currentValue.currency_symbol,
        "Rank": currentValue.rank,
        "Is Currently Active": currentValue.is_active
        }
    })
}