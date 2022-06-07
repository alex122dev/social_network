import axios from "axios"
import { BaseResponseType, instance } from "./api"

export type ProfileType = {
    aboutMe: string
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: ContactsType
    photos: PhotosType
}

export type ContactsType = {
    github: string | null
    vk: string | null
    facebook: string | null
    instagram: string | null
    twitter: string | null
    website: string | null
    youtube: string | null
    mainLink: string | null
}

export type PhotosType = {
    small: string | null
    large: string | null
}


export const profileAPI = {
    getProfile(userId: number) {
        return instance.get<ProfileType>('profile/' + userId)
            .then(res => res.data)
    },
    setProfileData(profile: ProfileType) {
        return instance.put<BaseResponseType>('profile/', profile).then(res => res.data)
    }
}