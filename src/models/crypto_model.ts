
import { RequestAxios } from "../services/api_service"
import { developerLog } from "../utilities/util_logs"
import { AxiosError } from "axios"
import type { CryptoSummaryType, CryptoSummaryModelResponseType } from "../types/model_types"
import { data } from "react-router-dom"


export const getHomePageData = async (): Promise<any> => {

    //set values
    const route = "/summaryData"
    const method = "GET"
    try {
        const dataResponse = await RequestAxios({ route: route, method: method });
        console.log("data resp", dataResponse)
        if (!dataResponse || dataResponse === undefined) {
            developerLog("getHomePageData request to Axios did not return any data")
            return { message: "Could not retrieve data", data: undefined }
        }
        return { message: "success", data: dataResponse.data }
    } catch (error) {
        console.log("in the error")
        if (error instanceof AxiosError) {
            console.log("estatus", error.status)
            if (error.status === 204 || error.status === 400) {
                developerLog(`getHomePageData request returned ${error.status}`)
                return { message: "Data not available at this time. Please try again or contact support", data: undefined }
            } else if (error.status === 500) {
                developerLog(`getHomePageData request returned 500`)
                return { message: "Could not retrieve data at this time", data: undefined }
            } else {
                developerLog(`getHomePageData request returned uexpected status code as ${error.status}`)
                return { message: "Could not retrieve data at this time", data: undefined }
            }
        } else {
            developerLog(`Error occured during axios fetch for getHomePageData as ${error}`)
            return { message: "Could not retrieve data at this time", data: undefined }
        }
    }
}

export const getAllLatestTableData = async() => {

    //set values
    const route = "/latestDataAll"
    const method = "GET"

    try {

        const dataResponse = await RequestAxios({ route: route, method: method });
        console.log("data resp", dataResponse)
        if (!dataResponse || dataResponse === undefined) {
            developerLog("latestDataAll request to Axios did not return any data")
            return { message: "Could not retrieve data", data: undefined }
        }
        return { message: "success", data: dataResponse.data }
    } catch (error) {
        console.log("in the error")
        if (error instanceof AxiosError) {
            console.log("estatus", error.status)
            if (error.status === 400) {
                developerLog(`latestDataAll request returned ${error.status}`)
                return { message: "Data not available at this time. Please try again or contact support", data: undefined }
            } else if (error.status === 500) {
                developerLog(`latestDataAll request returned 500`)
                return { message: "Could not retrieve data at this time", data: undefined }
            } else {
                developerLog(`latestDataAll request returned uexpected status code as ${error.status}`)
                return { message: "Could not retrieve data at this time", data: undefined }
            }
        } else {
            developerLog(`Error occured during axios fetch for latestDataAll as ${error}`)
            return { message: "Could not retrieve data at this time", data: undefined }
        }
    }

}

export const getLatestDataSingle = async (symbol: string) => {

    //set values
    const route = "/latestData"
    const method = "POST"

    try {

        const dataResponse = await RequestAxios({ route: route, method: method, data: { symbol: symbol } });
        console.log("data resp", dataResponse)
        if (!dataResponse || dataResponse === undefined) {
            developerLog("latestData request to Axios did not return any data")
            return { message: "Could not retrieve data", data: undefined }
        }
        return { message: "success", data: dataResponse.data }
    } catch (error) {
        console.log("in the error")
        if (error instanceof AxiosError) {
            console.log("estatus", error.status)
            if (error.status === 400) {
                developerLog(`latestData request returned ${error.status}`)
                return { message: "Data not available at this time. Please try again or contact support", data: undefined }
            } else if (error.status === 500) {
                developerLog(`latestData request returned 500`)
                return { message: "Could not retrieve data at this time", data: undefined }
            } else {
                developerLog(`latestData request returned uexpected status code as ${error.status}`)
                return { message: "Could not retrieve data at this time", data: undefined }
            }
        } else {
            developerLog(`Error occured during axios fetch for latestData as ${error}`)
            return { message: "Could not retrieve data at this time", data: undefined }
        }
    }
}