export const developerLog = (message: string) => {
    if (import.meta.env.VITE_MODE === "DEVELOPER") {
        console.log(message)
    }
}