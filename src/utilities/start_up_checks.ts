// Confirm specific .env variables are present before allowing application to start
export const criticalStartUpChecks = ():string[] => {
    let errors: string[] = []
    if(import.meta.env.VITE_SERVER_URL === undefined || import.meta.env.VITE_SERVER_URL.trim() === ""){
        errors.push("Missing Server URL")
    }else if(import.meta.env.VITE_SERVER_PORT === undefined || import.meta.env.VITE_SERVER_PORT.trim() === "" ){
        errors.push("Missing Server Port")
    }else if(import.meta.env.VITE_MODE === undefined || import.meta.env.VITE_MODE.trim() === "" ){
        errors.push("Missing Mode")
    }

    return errors;
}
