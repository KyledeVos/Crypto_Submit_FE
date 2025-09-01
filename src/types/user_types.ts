export type userSignUpFieldsType = {
    userName: string,
    email: string,
    password: string
    confirmPassword: string,
}

export type userSignUpErrorType = {
    userName: string,
    email: string,
    password: string,
    confirmPassword: string
    otherError: string
}

export type signUpData = {
    userName: string,
    email: string,
    password: string
}
