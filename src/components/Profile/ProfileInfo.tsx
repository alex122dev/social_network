import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { getUserProfile, saveProfile } from "../../redux/profile-reducer"
import { selectorGetUserProfile } from "../../redux/profile-selectors"
import { DispatchThunkType } from "../../redux/store"
import { Preloader } from "../common/Preloader/Preloader"
import photoPlaceholder from '../../assets/img/user-image.png'
import style from './Profile.module.scss'
import { ProfileInfoData } from "./ProfileInfoData"
import { ProfileDataForm } from "./ProfileDataForm"
import { ProfileType } from "../../api/api-profile"

type PropsType = {
    userId: number
}

export const ProfileInfo: React.FC<PropsType> = ({ userId }) => {


    const dispatch: DispatchThunkType = useDispatch()
    const profile = useSelector(selectorGetUserProfile)
    const [editMode, setEditMode] = useState(false)

    const saveProfileCallback = (profile: ProfileType) => {
        dispatch(saveProfile(profile))
    }

    const getProfile = (userId: number) => {
        dispatch(getUserProfile(userId))
    }

    useEffect(() => {
        getProfile(userId)
    }, [userId])

    //console.log('ProfileInfo render');


    if (!profile) {
        return <Preloader />
    }

    return (
        <div className={style.profileInfo}>
            <div className={style.profileImage}>
                <img src={profile.photos.large || photoPlaceholder} alt="avatar" />
            </div>
            {!editMode
                ? <ProfileInfoData profile={profile} setEditMode={setEditMode} />
                : <ProfileDataForm profile={profile} setEditMode={setEditMode} saveProfile={saveProfileCallback} />
            }
        </div>
    )
}