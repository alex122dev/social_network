import { AppStateType } from "./store";


export const selectorGetUsersPageSize = (state: AppStateType) => {
    return state.usersPage.pageSize
}
export const selectorGetUsersCurrentPage = (state: AppStateType) => {
    return state.usersPage.currentPage
}
export const selectorGetUsers = (state: AppStateType) => {
    return state.usersPage.users
}
export const selectorGetTotalUsersCount = (state: AppStateType) => {
    return state.usersPage.totalUsersCount
}
export const selectorGetUsersIsFetching = (state: AppStateType) => {
    return state.usersPage.isFetching
}
export const selectorGetUsersInFollowingProcess = (state: AppStateType) => {
    return state.usersPage.inFollowingProcess
}
export const selectorGetUsersFilter = (state: AppStateType) => {
    return state.usersPage.filter
}

