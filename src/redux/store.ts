import { Action, AnyAction, applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk, { ThunkAction, ThunkDispatch } from "redux-thunk";
import appReducer from "./app-reducer";
import authReducer from "./auth-reducer";
import profileReducer from "./profile-reducer";


const rootReducer = combineReducers({
    profilePage: profileReducer,
    auth: authReducer,
    app: appReducer
})

export type AppStateType = ReturnType<typeof rootReducer>
export type AppActionsType = ReturnType<typeof store.dispatch>

//* for actions type find
export type InferActionsTypes<T> = T extends { [key: string]: (...args: any[]) => infer U } ? U : never

//* generic for thunk type
export type BaseThunkType<A extends Action, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, A>

//* generic for dispatch type to dispatching thunk
//export type BaseDispatchThunkType<A extends AnyAction> = ThunkDispatch<AppStateType, unknown, A>
export type DispatchThunkType = ThunkDispatch<AppStateType, unknown, AppActionsType>

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, /* preloadedState, */ composeEnhancers(
    applyMiddleware(thunk)
));

export default store