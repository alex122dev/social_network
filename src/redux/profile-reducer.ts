import { ResultCodeEnum } from "../api/api"
import { profileAPI, ProfileType, SetProfileDataType } from "../api/profileAPI"
import { BaseThunkType, InferActionsTypes } from "./store"


let initialState = {
    profile: null as ProfileType | null,
    errorMessage: null as null | string,
    savingSuccess: false,
    editMode: false
}



const profileReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'SN/PROFILE/SET_USER_PROFILE':
            return {
                ...state,
                profile: action.profile
            }
        case 'SN/PROFILE/SET_ERROR_MESSAGE':
            return {
                ...state,
                errorMessage: action.message
            }
        case 'SN/PROFILE/SET_SAVING_SUCCESS':
            return {
                ...state,
                savingSuccess: action.savingSuccess
            }
        case 'SN/PROFILE/SET_EDIT_MODE':
            return {
                ...state,
                editMode: action.editMode
            }
        default:
            return state
    }
}

export const actions = {
    setUserProfile: (profile: ProfileType) => ({ type: 'SN/PROFILE/SET_USER_PROFILE', profile } as const),
    setErrorMessage: (message: string | null) => ({ type: 'SN/PROFILE/SET_ERROR_MESSAGE', message } as const),
    setSavingSucces: (savingSuccess: boolean) => ({ type: 'SN/PROFILE/SET_SAVING_SUCCESS', savingSuccess } as const),
    setEditMode: (editMode: boolean) => ({ type: 'SN/PROFILE/SET_EDIT_MODE', editMode } as const)
}


export const getUserProfile = (userId: number): ThunkType => async (dispatch) => {
    const data = await profileAPI.getProfile(userId)
    //console.log(data);
    dispatch(actions.setUserProfile(data))
}

export const saveProfile = (profileData: SetProfileDataType): ThunkType => async (dispatch, getState) => {
    const userId = getState().auth.id
    const data = await profileAPI.setProfileData(profileData)
    if (data.resultCode === ResultCodeEnum.Success) {
        dispatch(actions.setEditMode(false))
        dispatch(actions.setErrorMessage(null))
        if (userId !== null) {
            dispatch(getUserProfile(userId))
        } else {
            throw new Error('userId cant be null')
        }
    } else {
        const messageError = data.messages.join(', ')
        dispatch(actions.setErrorMessage(messageError))
    }

    console.log(data);
}


type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType>

export default profileReducer