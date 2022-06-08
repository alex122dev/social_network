import { ResultCodeEnum } from "../api/api";
import { usersAPI, UserType } from "../api/usersAPI";
import { BaseThunkType, InferActionsTypes } from "./store";


const initialState = {
    users: [] as Array<UserType>,
    pageSize: 5,
    currentPage: 1,
    totalUsersCount: 0,
    isFetching: false,
    inFollowingProcess: [] as number[],
    filter: {
        term: '',
        friend: 'null' as FriendRequestType,
    }
}

export type FriendRequestType = 'null' | 'true' | 'false'

export type FilterUsersType = {
    term: string
    friend: FriendRequestType
}

export type InitialStateType = typeof initialState

export const usersReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'SN/USERS/SET_USERS':
            return {
                ...state,
                users: action.users
            }
        case 'SN/USERS/SET_TOTAL_USERS_COUNT':
            return {
                ...state,
                totalUsersCount: action.total
            }
        case 'SN/USERS/SET_CURRENT_PAGE':
            return {
                ...state,
                currentPage: action.pageNumber
            }
        case 'SN/USERS/SET_IS_FETCHING':
            return {
                ...state,
                isFetching: action.isFetching
            }
        case 'SN/USERS/TOGGLE_USER_FOLLOWED':
            return {
                ...state,
                users: state.users.map(user => {
                    if (user.id === action.userId) {
                        return { ...user, followed: !user.followed }
                    }
                    return user
                })
            }
        case 'SN/USERS/TOGGLE_IN_FOLLOWING_PROCESS':
            return {
                ...state,
                inFollowingProcess: action.isFetching
                    ? [...state.inFollowingProcess, action.userId]
                    : state.inFollowingProcess.filter(id => id !== action.userId)
            }
        case 'SN/USERS/SET_FILTER':
            return {
                ...state,
                filter: action.filter
            }
        default:
            return state
    }
}

export const actions = {
    setFilter: (filter: FilterUsersType) => ({ type: 'SN/USERS/SET_FILTER', filter } as const),
    toggleInFollowingProcess: (isFetching: boolean, userId: number) => ({ type: 'SN/USERS/TOGGLE_IN_FOLLOWING_PROCESS', isFetching, userId } as const),
    toggleUserFollowed: (userId: number) => ({ type: 'SN/USERS/TOGGLE_USER_FOLLOWED', userId } as const),
    setUsers: (users: Array<UserType>) => ({ type: 'SN/USERS/SET_USERS', users } as const),
    setTotalUsersCount: (total: number) => ({ type: 'SN/USERS/SET_TOTAL_USERS_COUNT', total } as const),
    setCurrentPage: (pageNumber: number) => ({ type: 'SN/USERS/SET_CURRENT_PAGE', pageNumber } as const),
    setIsFetching: (isFetching: boolean) => ({ type: 'SN/USERS/SET_IS_FETCHING', isFetching } as const),
}

export const getUsers = (count: number, page: number, filter: FilterUsersType): ThunkType => async (dispatch) => {
    dispatch(actions.setIsFetching(true))
    const data = await usersAPI.getUsers(count, page, filter)
    dispatch(actions.setIsFetching(false))
    dispatch(actions.setFilter(filter))
    dispatch(actions.setCurrentPage(page))
    dispatch(actions.setUsers(data.items))
    dispatch(actions.setTotalUsersCount(data.totalCount))
    //console.log(data);
}

export const toggleSubscribe = (userId: number, followed: boolean): ThunkType => async (dispatch) => {
    dispatch(actions.toggleInFollowingProcess(true, userId))
    const data = followed ? await usersAPI.unfollow(userId) : await usersAPI.follow(userId)
    if (data.resultCode === ResultCodeEnum.Success) {
        dispatch(actions.toggleUserFollowed(userId))
    }
    dispatch(actions.toggleInFollowingProcess(false, userId))
    console.log(data);
}


type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType>

export default usersReducer