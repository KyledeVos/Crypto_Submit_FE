/**
 * @module user_model.ts contains funtions for user related axios request
 */

import type {signUpData} from "../types/user_types"
import {RequestAxios} from "../services/api_service"
import {developerLog} from "../utilities/util_logs"
import { AxiosError } from "axios"

export const performSignUpModel = async(signUpFields: signUpData):Promise<{message: string, data: any}> => {

        //set values
        const route = "/signUp"
        const method = "POST"
    
        try {
    
            const dataResponse = await RequestAxios({ route: route, method: method, data: { fields: signUpFields } });
            console.log("data resp", dataResponse)
            if (!dataResponse || dataResponse === undefined) {
                developerLog("signUp request to Axios did not return any data")
                return { message: "Could not retrieve data", data: undefined }
            }
            return { message: "success", data: dataResponse.data }
        } catch (error) {
            console.log("in the error")
            if (error instanceof AxiosError) {
                console.log("estatus", error.status)
                if (error.status === 400) {
                    developerLog(`signUp request returned ${error.status}`)
                    return { message: "Data not available at this time. Please try again or contact support", data: undefined }
                } else if (error.status === 500) {
                    developerLog(`signUp request returned 500`)
                    return { message: "Could not retrieve data at this time", data: undefined }
                } else {
                    developerLog(`signUp request returned uexpected status code as ${error.status}`)
                    return { message: "Could not retrieve data at this time", data: undefined }
                }
            } else {
                developerLog(`Error occured during axios fetch for signUp as ${error}`)
                return { message: "Could not retrieve data at this time", data: undefined }
            }
        }

}