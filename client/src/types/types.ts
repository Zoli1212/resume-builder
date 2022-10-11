
export type NewUser = {

    name: string,
    email: string,
    password: string,
    confirmPassword: string


}
export type User = {

    name?: string,
    email: string,
    password: string,
    confirmPassword?: string


}

export type AuthResponse = {

    data: {

        success: boolean,
        data: NewUser | null,
        message: string
    }

}