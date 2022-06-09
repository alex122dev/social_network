import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { actions, getUserProfile, saveProfile } from "../../redux/profile-reducer"
import { selectorGetProfileEditMode, selectorGetUserProfile } from "../../redux/profile-selectors"
import { DispatchThunkType } from "../../redux/store"
import { Preloader } from "../common/Preloader/Preloader"
import photoPlaceholder from '../../assets/img/user-image.png'
import { ProfileInfoData } from "./ProfileInfoData"
import { ProfileDataForm } from "./ProfileDataForm"
import globalStyles from '../../globalStyles/globalStyle.module.scss'
import style from './Profile.module.scss'
import { ProfileAvatar } from "./ProfileAvatatar"

type PropsType = {
    userId: number
    isOwner: boolean
}

export const ProfileInfo: React.FC<PropsType> = ({ userId, isOwner }) => {


    const dispatch: DispatchThunkType = useDispatch()
    const profile = useSelector(selectorGetUserProfile)
    //const [editMode, setEditMode] = useState(false)
    const editMode = useSelector(selectorGetProfileEditMode)
    const setEditMode = (editMode: boolean) => {
        dispatch(actions.setEditMode(editMode))
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
            <ProfileAvatar isOwner={isOwner} />
            {!editMode
                ? <ProfileInfoData profile={profile} setEditMode={setEditMode} isOwner={isOwner} />
                : <ProfileDataForm profile={profile} setEditMode={setEditMode} />
            }
        </div>
    )
}