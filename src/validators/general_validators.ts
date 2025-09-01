/**
 * @module general_validators.ts This module houses general, reusable functions for validations
 */

/**
 * check if a string is undefined or empty
 * @param value 
 * @returns boolean
 */
export const stringBasicValidation = (value: string): boolean => {
    if (!value || value === undefined || value.trim() === "") {
        return false
    }
    return true
}

/**
 * check if an email is valid checking single '@' and no more than 3 '.'
 * @param value 
 * @returns boolean
 */
export const emailValidation = (value: string): boolean => {
    if (!value || value === undefined || value.trim() === "") {
        return false
    } else if (!value.includes("@")) {
        return false
    } else if (value.split("@").length > 2) {
        return false
    } else if (!value.includes(".")) {
        return false
    }else if(value.split(".").length > 3){
        return false
    }else if(value.split("@")[0].trim() === ""){
        // checks that there is text content before the "@"
        return false
    }
    return true
}
