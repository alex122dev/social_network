import { AppStateType } from "./store";


export const selectorGetInitialized = (state: AppStateType) => {
    return state.app.isInitialized
}