
// simple validation for strings
export const stringValidation = (data: string):string => {
    if(!data || data === undefined || typeof data !== 'string' || data.trim() === ""){
        return "invalid"
    }
    return "valid"
}

// simple validation for objects
export const objectSimpleValidation = (data: object):string => {
    if(!data || data === undefined || typeof data !== "object"){
        return "invalid"
    }
    return "valid"
}