/**
 * @module contains functions for control of the sign-up process
 */
import type {signUpData} from "../types/user_types"
import {performSignUpModel} from "../models/user_model"

/**
 * Handles signup calling model for signup
 * @param data 
 * @remarks data needs to be validated before call
 */
export const handleSignUpController = async (signUpFields : signUpData):Promise<string>=> {
    const dataResult = await performSignUpModel(signUpFields)
    console.log("data result", dataResult)
    return "success"

}