import { authMe } from "./auth-reducer"
import { BaseThunkType, InferActionsTypes } from "./store"


const initialState = {
    isInitialized: false
}

const appReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'SN/APP/SET_INITIALIZED':
            return {
                ...state,
                isInitialized: action.isInitialized
            }
        default:
            return state
    }
}

export const actions = {
    setInitialized: (isInitialized: boolean) => ({ type: 'SN/APP/SET_INITIALIZED', isInitialized } as const)
}


export const setUserInitialized = (): ThunkType => async (dispatch) => {
    const initResult = await dispatch(authMe())
    dispatch(actions.setInitialized(true))
}

export type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType>

export default appReducer