
import type {latestDataType} from "..//types/model_types"
import { developerLog } from "../utilities/util_logs"
import {formatLatestData} from "../utilities/util_data_format"

/**
 * Validate latestData recieved from BE
 * @param data 
 * @returns formatted latest data for FE usage, undefined if error
 * @remarks if in developer mode - will show logs
 */
export const latestDataValidateResponse = (data: any):latestDataType | undefined => {

    if(!data || data == undefined){
        developerLog("latestDataValidateResponse given undefined data")
        return undefined
    }

    console.log("valiator receved", data)

    // check every field
    let errors = ""
        if(data.currency_name === undefined || typeof data.currency_name !== "string" || data.currency_name.trim() === ""){
            errors += `currency name failed with value as: ${data.currency_name}, `
        }else if(data.currency_symbol === undefined || typeof data.currency_symbol !== "string" || data.currency_symbol.trim() === ""){
            errors += `currency symbol failed with value as: ${data.currency_symbol}, `
        }else if(data.rank === undefined || typeof data.rank !== "number" || Number.isNaN(data.rank) || data.rank < 0){
            errors += `rank failed with value as: ${data.rank}, `
        }else if(data.current_price === undefined || typeof data.current_price !== "number" || Number.isNaN(data.current_price) || data.current_price < 0){
            errors += `current_price failed with value as: ${data.current_price}, `
        }else if(data.volume_24h === undefined || typeof data.volume_24h !== "number" || Number.isNaN(data.volume_24h) || data.volume_24h < 0){
            errors += `volume_24h failed with value as: ${data.volume_24h}, `
        }else if(data.market_cap === undefined || typeof data.market_cap !== "number" || Number.isNaN(data.market_cap) || data.market_cap < 0){
            errors += `market_cap failed with value as: ${data.market_cap}, `
        }else if(data.market_cap_dominance === undefined || typeof data.market_cap_dominance !== "number" || Number.isNaN(data.market_cap_dominance) || data.market_cap_dominance < 0){
            errors += `market_cap_dominance failed with value as: ${data.market_cap_dominance}, `
        }

    if(errors !== ""){
        developerLog(`latestDataValidateResponse Validation errors as:  ${errors}`)
        return undefined
    }
    // format the data then return
    return formatLatestData(data)
}