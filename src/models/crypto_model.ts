
import {RequestAxios} from "../services/api_service"
import {developerLog} from "../utilities/util_logs"
import type {CryptoSummaryType, CryptoSummaryModelResponseType} from "../types/model_types"


export const getHomePageData = async ():Promise<CryptoSummaryModelResponseType> =>{

    //set values
    const route = "/summaryData"
    const method = "GET"

    const dataResponse = await RequestAxios({route: route, method: method});
    if(!dataResponse || dataResponse === undefined){
        developerLog("getHomePageData request to Axios did not return any data")
        return {message: "Could not retrieve data", data: undefined}
    }else if(dataResponse.status !== 200){
        if(dataResponse.status === 500){
            return {message: "Could not retrieve data at this time", data: undefined}
        }else if(dataResponse.status >= 400 && dataResponse.status <500){
            return {message: "Could not retrieve data at this time. Please try again or contact support", data: undefined}
        }
    }
        developerLog(`Axios Response: ${dataResponse.data}`)
        //success of 200
        return {message: "success", data: undefined}
    

}