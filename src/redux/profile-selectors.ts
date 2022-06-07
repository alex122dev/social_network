import { AppStateType } from "./store";


export const selectorGetUserProfile = (state: AppStateType) => {
    return state.profilePage.profile
}

export const selectorGetProfileErrorMessage = (state: AppStateType) => {
    return state.profilePage.errorMessage
}

export const selectorGetProfileSavingSuccess = (state: AppStateType) => {
    return state.profilePage.savingSuccess
}