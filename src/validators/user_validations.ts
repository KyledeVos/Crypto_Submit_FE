/**
 * @module user_validations.ts this module houses validation function for data / functions for user related actions
 */

import type { userSignUpFieldsType, userSignUpErrorType } from "../types/user_types"
import { stringBasicValidation, emailValidation } from "./general_validators"

/**
 * Perform validation of the signup fields - sets messages for external handling and returns a string for password non match
 * @param signUpFields Perform
 * @param setSignUpErrorFields 
 * @returns string containing password match error or blank
 */
export const validateSubmissionFields = (signUpFields: userSignUpFieldsType, setSignUpErrorFields: (fields: userSignUpErrorType) => void): boolean => {

    // track errorFlag
    let errorFlag: boolean = false

    // check for blanks
    const validUsername = stringBasicValidation(signUpFields.userName) === true ? "" : "Missing Username"
    let validEmail = stringBasicValidation(signUpFields.email) === true ? "" : "Missing Email"
    let validPassword = stringBasicValidation(signUpFields.password) === true ? "" : "Missing password"
    let validConfirmPassword = stringBasicValidation(signUpFields.confirmPassword) === true ? "" : "Missing confirmation"
    let otherError = ""

    if(validUsername !== "" || validEmail !== "" || validPassword !== "" || validConfirmPassword !== ""){
        errorFlag = true
    }

    // fields validation
    // confirm valid email address
    if (validEmail === "") {
        const validatedEmail = emailValidation(signUpFields.email)
        if (validatedEmail === false) {
            errorFlag = true
            validEmail = "Please enter a valid email"
        }
    }

    // simple password length check
    if (validPassword === "") {
        if (signUpFields.password.length < 6) {
            validPassword = "Password must be at least 6 characters"
            errorFlag = true
        }
    }

    // if no other errors, check password and confirm password match
    if (errorFlag === false) {
        if (signUpFields.password !== signUpFields.confirmPassword) {
            otherError = "Passwords do not match"
            errorFlag = true
        
        }
    }

    setSignUpErrorFields({
        "userName": validUsername,
        "email": validEmail,
        "password": validPassword,
        "confirmPassword": validConfirmPassword,
        "otherError": otherError
    })
    return errorFlag

}