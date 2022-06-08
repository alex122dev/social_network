import { BaseResponseType, instance, ResultCodeEnum, ResultCodeWithCaptchaEnum } from "./api"

export type AuthDataType = {
    id: number
    email: string
    login: string
}

export type LoginResponseDataType = {
    userId: number
}

type AuthMeResponseType = BaseResponseType<AuthDataType>

type CaptchaResponseType = {
    url: string
}

export const authAPI = {
    authMe() {
        return instance.get<AuthMeResponseType>('auth/me').then(res => res.data)
    },
    login(email: string, password: string, rememberMe: boolean, captcha: string | null = null) {
        return instance.post<BaseResponseType<LoginResponseDataType, ResultCodeEnum | ResultCodeWithCaptchaEnum>>('auth/login', { email, password, rememberMe, captcha })
            .then(res => res.data)
    },
    logout() {
        return instance.delete<BaseResponseType>('auth/login').then(res => res.data)
    },
    getCaptchaUrl() {
        return instance.get<CaptchaResponseType>('security/get-captcha-url').then(res => res.data)
    }
}