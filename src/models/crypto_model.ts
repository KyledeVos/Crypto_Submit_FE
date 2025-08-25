
import {RequestAxios} from "../services/api_service"
import {developerLog} from "../utilities/util_logs"
import type {CryptoSummaryType, CryptoSummaryModelResponseType} from "../types/model_types"
import { data } from "react-router-dom"


export const getHomePageData = async ():Promise<any> =>{

    //set values
    const route = "/summaryData"
    const method = "GET"

    const dataResponse = await RequestAxios({route: route, method: method});
    console.log("data resp", dataResponse)
    if(!dataResponse || dataResponse === undefined){
        developerLog("getHomePageData request to Axios did not return any data")
        return {message: "Could not retrieve data", data: undefined}
    }else if(dataResponse.status !== 200){
        if(dataResponse.status === 500 || dataResponse.status >= 400 && dataResponse.status <500){
            return {message: "Could not retrieve data at this time", data: undefined}
        }else if(dataResponse.status === 204){
            return {message: "Data not available at this time. Please try again or contact support", data: undefined}
        }
    }else if(!dataResponse.data || dataResponse.data === undefined){
        developerLog("getHomePageData did not get any data from server");
        return {message: "Could not retrieve data at this time. Please try again or contact support", data: undefined}
    }
        developerLog(`Axios Response: ${typeof dataResponse.data}`)
        //success of 200
        return {message: "success", data: dataResponse.data}
    

}