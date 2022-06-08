import { ResultCodeEnum, ResultCodeWithCaptchaEnum } from "../api/api"
import { authAPI, AuthDataType } from "../api/authAPI"
import { BaseThunkType, InferActionsTypes } from "./store"


const initialState = {
    id: null as null | number,
    email: null as null | string,
    login: null as null | string,
    isAuth: false,
    captchaUrl: null as string | null,
    errorMessage: null as null | string
}

export const authReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'SN/AUTH/SET_USER_DATA':
            return {
                ...state,
                ...action.payload
            }
        case 'SN/AUTH/SET_ERROR_MESSAGE':
            return {
                ...state,
                errorMessage: action.message
            }
        case 'SN/AUTH/SET_CAPTCHA_URL':
            return {
                ...state,
                captchaUrl: action.captchaUrl
            }
        default:
            return state
    }
}

export const actions = {
    setUserData: (id: number | null, email: string | null, login: string | null, isAuth: boolean) =>
        ({ type: 'SN/AUTH/SET_USER_DATA', payload: { email, login, id, isAuth } } as const),
    setErrorMessage: (message: string | null) => ({ type: 'SN/AUTH/SET_ERROR_MESSAGE', message } as const),
    setCaptchaUrl: (captchaUrl: string | null) => ({ type: 'SN/AUTH/SET_CAPTCHA_URL', captchaUrl } as const)
}




export const authMe = (): ThunkType => async (dispatch) => {
    const authData = await authAPI.authMe()
    //console.log(authData);
    if (authData.resultCode === ResultCodeEnum.Success) {
        const { id, email, login } = authData.data
        dispatch(actions.setUserData(id, email, login, true))
    }
}

export const login = (email: string, password: string, rememberMe: boolean, captha: string): ThunkType => async (dispatch) => {
    const data = await authAPI.login(email, password, rememberMe, captha)
    console.log('Login data: ', data);

    if (data.resultCode === ResultCodeEnum.Success) {
        dispatch(authMe())
        dispatch(actions.setErrorMessage(null))
    } else {
        if (data.resultCode === ResultCodeWithCaptchaEnum.CaptchaIsRequired) {
            dispatch(getCaptcha())
        }

        const messageError = data.messages[0]
        dispatch(actions.setErrorMessage(messageError))
    }
}

export const logout = (): ThunkType => async (dispatch) => {
    const data = await authAPI.logout()
    console.log(data);
    if (data.resultCode === ResultCodeEnum.Success) {
        dispatch(actions.setUserData(null, null, null, false))
        dispatch(actions.setCaptchaUrl(null))
    }
}

export const getCaptcha = (): ThunkType => async (dispatch) => {
    const data = await authAPI.getCaptchaUrl()
    dispatch(actions.setCaptchaUrl(data.url))
}


type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType>

export default authReducer