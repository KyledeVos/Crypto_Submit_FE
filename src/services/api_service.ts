import axios from 'axios'
import {stringValidation,  objectSimpleValidation} from "../utilities/util_validation"
import type {AxiosRequestType, AxiosRequestReturn} from "../types/service_types"

const axiosTimeout = 1000 * 60

// This is the Handler for Axios Requests
export const RequestAxios = async({route, data, method}: AxiosRequestType): Promise<AxiosRequestReturn> => {

    // VALIDATION
    if(stringValidation(route) === "invalid"){
        return {status: 400, errorMessage: "invalid route passed to RequestAxios", data: undefined}
    }else if(data !== undefined){
        if(objectSimpleValidation(data) === "invalid"){
            return {status: 400, errorMessage: "invalid data passed to RequestAxios", data: undefined}
        }
    }else if(stringValidation(method) === "invalid"){
        return {status: 400, errorMessage: "invalid method passed to RequestAxios", data: undefined}
    }else if(method !== "GET" && method !== "POST"){
        return {status: 400, errorMessage: "invalid method string passed to RequestAxios", data: undefined}
    }

    // configure endpoint route
    const server_url = import.meta.env.VITE_SERVER_URL || undefined
    const server_port = import.meta.env.VITE_SERVER_PORT || undefined
    const server_route = server_url + `:${server_port}` + route
    if(import.meta.env.VITE_MODE === "DEVELOPER"){
        console.log("SERVER ROUTE", server_route)
    }
    
    try{
        const response = await axios(server_route, {method: method, params: data, timeout: axiosTimeout})
        if(import.meta.env.VITE_MODE === "DEVELOPER"){
            console.log(`RESPONSE STATUS FOR REQUEST ROUTE: ${route}`, response)
            console.log("DATA", response.data)
        }
        if(!response || response === undefined){
            return {status: 500, data: undefined}
        }else if(!response.status){
            return {status: 500, data: undefined}
        }else{
            return {status: response.status, data: response.data}
        }
    }catch(error){
        console.error(`Error Occured during getRequest as: ${error}`)
        return {status: 500, data: undefined}
    }

}