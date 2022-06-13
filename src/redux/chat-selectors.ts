import { AppStateType } from "./store";


export const selectorGetChatItems = (state: AppStateType) => {
    return state.chat.items
}

export const selectorGetChatStatusWS = (state: AppStateType) => {
    return state.chat.statusWS
}