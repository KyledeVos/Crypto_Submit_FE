import axios from 'axios'
import { stringValidation, objectSimpleValidation } from "../utilities/util_validation"
import type { AxiosRequestType, AxiosRequestReturn } from "../types/service_types"

// control max time for a response
const axiosTimeout = 1000 * 30

// This is the Handler for Axios Requests
export const RequestAxios = async ({ route, data, method }: AxiosRequestType): Promise<AxiosRequestReturn> => {

    // VALIDATION
    if (stringValidation(route) === "invalid") {
        return { status: 400, errorMessage: "invalid route passed to RequestAxios", data: undefined }
    } else if (data !== undefined) {
        if (objectSimpleValidation(data) === "invalid") {
            return { status: 400, errorMessage: "invalid data passed to RequestAxios", data: undefined }
        }
    } else if (stringValidation(method) === "invalid") {
        return { status: 400, errorMessage: "invalid method passed to RequestAxios", data: undefined }
    } else if (method !== "GET" && method !== "POST") {
        return { status: 400, errorMessage: "invalid method string passed to RequestAxios", data: undefined }
    }

    // configure endpoint route
    const server_url = import.meta.env.VITE_SERVER_URL || undefined
    const server_port = import.meta.env.VITE_SERVER_PORT || undefined
    const server_route = server_url + `:${server_port}` + route

    // configure headers
    const headers: Record<string, string> = {}

    if (method !== "GET") {
        headers["Content-Type"] = "application/json"
    }

    if (import.meta.env.VITE_MODE === "DEVELOPER") {
        console.log("SERVER ROUTE", server_route)
    }

    try {
        const response = await axios(
            server_route,
            {
                method: method, data: data, timeout: axiosTimeout, headers: headers
            })
        return response
    } catch (error) {
        throw error
    }

}