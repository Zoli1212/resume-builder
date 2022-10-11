
export type NewUser = {

    name: string,
    email: string,
    password: string,
    confirmPassword: string


}

export type RegistrationResponse = {

    data: {

        success: boolean,
        data: NewUser | null,
        message: string
    }




}