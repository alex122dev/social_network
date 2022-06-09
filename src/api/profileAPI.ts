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
    github: string
    vk: string
    facebook: string
    instagram: string
    twitter: string
    website: string
    youtube: string
    mainLink: string
}

export type PhotosType = {
    small: string | null
    large: string | null
}

export type SetProfileDataType = {
    aboutMe: string
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: ContactsType
}

export type RequestPhotosData = {
    photos: PhotosType
}

export const profileAPI = {
    getProfile(userId: number) {
        return instance.get<ProfileType>('profile/' + userId)
            .then(res => res.data)
    },
    setProfileData(profileData: SetProfileDataType) {
        return instance.put<BaseResponseType>('profile/', profileData).then(res => res.data)
    },
    setProfilePhoto(photo: File) {
        const formData = new FormData()
        formData.append('image', photo)
        return instance.put<BaseResponseType<RequestPhotosData>>('profile/photo', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(res => res.data)
    },
    setProfileStatus(status: string) {
        return instance.put<BaseResponseType>('profile/status', { status }).then(res => res.data)
    },
    getProfileStatus(userId: number) {
        return instance.get<string>(`profile/status/${userId}`).then(res => res.data)
    }
}