import axios from "axios"

export type BaseResponseType<D = {}, R = ResultCodeEnum> = {
    data: D
    resultCode: R
    messages: Array<string>
}

export enum ResultCodeEnum {
    Success = 0,
    Error = 1
}

export enum ResultCodeWithCaptchaEnum {
    CaptchaIsRequired = 10
}

export const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {
        'API-KEY': '0941e090-cd00-408a-bc64-05221be4ca0f',
    }
})