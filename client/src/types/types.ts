
export type User = {

    name?: string,
    email: string,
    password: string,
    confirmPassword?: string

}

export type AuthResponse = {

    data: {

        success: boolean,
        data: User | null,
        message: string
    }

}