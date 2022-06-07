import { AppStateType } from "./store";

export const selectorGetIsAuth = (state: AppStateType) => {
    return state.auth.isAuth
}
export const selectorGetUserLogin = (state: AppStateType) => {
    return state.auth.login
}

export const selectorGetCaptchaUrl = (state: AppStateType) => {
    return state.auth.captchaUrl
}

export const selectorGetMessageError = (state: AppStateType) => {
    return state.auth.errorMessage
}

export const selectorGetAuthUserId = (state: AppStateType) => {
    return state.auth.id
}