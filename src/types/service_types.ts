//types intended for service

export type AxiosRequestType = {
    route: string;
    method: "GET"| "POST"
    data? : object;
}

export type AxiosRequestReturn = {
    status: number;
    errorMessage?: string;
    data: unknown
}