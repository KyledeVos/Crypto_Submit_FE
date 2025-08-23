import axios from 'axios'

type AxiosRequestType = {
    route: string;
    data? : object;
}

export const getRequestAxios = async({route, data}: AxiosRequestType) => {

    // ADD VALIDATION

    const server_url = import.meta.env.VITE_SERVER_URL
    const server_port = import.meta.env.VITE_SERVER_PORT
    // ADD Error for no server url
    const server_route = server_url + `:${server_port}` + route
    console.log("SERVER ROUTE", server_route)
    

    try{
        const response = await axios.get(server_route, {params: data})
        console.log("RESPONSE", response)
        console.log("DATA", response.data)
    }catch(error){
        console.error("Error Occured during getRequest")
    }

}