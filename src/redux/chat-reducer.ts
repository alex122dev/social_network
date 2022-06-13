import { Dispatch } from "redux"
import { chatAPI, ItemResponseType, ItemsSubscribeType, StatusWSSubscribeType, StatusWSType } from "../api/chatAPI"
import { BaseThunkType, InferActionsTypes } from "./store"
import { v1 as uuidv1 } from 'uuid';

const initialState = {
    items: [] as Array<ItemResponseType & { uniqId: string }>,
    statusWS: 'pending' as StatusWSType
}


export type InitialStateType = typeof initialState

export const chatReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'SN/CHAT/SET_ITEMS':
            return {
                ...state,
                items: [...state.items, ...action.items.map(el => ({ ...el, uniqId: uuidv1() }))].filter((el, i, array) => i >= array.length - 10)
            }
        case 'SN/CHAT/SET_STATUS_WS':
            return {
                ...state,
                statusWS: action.status
            }
        default:
            return state
    }
}

export const actions = {
    setItems: (items: Array<ItemResponseType>) => ({ type: 'SN/CHAT/SET_ITEMS', items } as const),
    setStatusWS: (status: StatusWSType) => ({ type: 'SN/CHAT/SET_STATUS_WS', status } as const)
}

let _addReceivedItemsToState: ItemsSubscribeType | null = null;
const itemsReceiveHandler = (dispatch: Dispatch) => {
    if (!_addReceivedItemsToState) {
        _addReceivedItemsToState = (items: ItemResponseType[]) => dispatch(actions.setItems(items))
    }
    return _addReceivedItemsToState
}

let _addReceivedStatusWSToState: StatusWSSubscribeType | null = null;
const statusWSReceiveHandler = (dispatch: Dispatch) => {
    if (!_addReceivedStatusWSToState) {
        _addReceivedStatusWSToState = (status: StatusWSType) => dispatch(actions.setStatusWS(status))
    }
    return _addReceivedStatusWSToState
}

export const subscribeToReceiveWSData = (): ThunkType => async (dispatch) => {
    chatAPI.subscribe('items-receivers', itemsReceiveHandler(dispatch))
    chatAPI.subscribe('statusWS-receivers', statusWSReceiveHandler(dispatch))
    chatAPI.start()
}

export const unsubscribeToReceiveWSData = (): ThunkType => async (dispatch) => {
    chatAPI.stop()
    chatAPI.unsubscribe('items-receivers', itemsReceiveHandler(dispatch))
    chatAPI.unsubscribe('statusWS-receivers', statusWSReceiveHandler(dispatch))
}


export const sendMessage = (message: string): ThunkType => async (dispatch) => {
    chatAPI.send(message)
}


export default chatReducer

type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType>