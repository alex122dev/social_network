import { FilterUsersType } from "../redux/users-reducer"
import { BaseResponseType, instance } from "./api"
import { PhotosType } from "./profileAPI"

export type UserType = {
    name: string
    id: number
    photos: PhotosType
    status: null | string,
    followed: boolean
}

export type UsersResponseType = {
    items: Array<UserType>
    totalCount: number
    error: string
}

export const usersAPI = {
    getUsers(count: number, page: number, filter: FilterUsersType) {
        return instance.get<UsersResponseType>(`users?count=${count}&page=${page}&term=${filter.term}&friend=${filter.friend}`)
            .then(res => res.data)
    },
    follow(userId: number) {
        return instance.post<BaseResponseType>('follow/' + userId).then(res => res.data)
    },
    unfollow(userId: number) {
        return instance.delete<BaseResponseType>('follow/' + userId).then(res => res.data)
    }
}