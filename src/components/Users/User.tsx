import { UserType } from "../../api/usersAPI"
import userPhotoPlaceholder from '../../assets/img/user-image.png'
import style from './Users.module.scss'
import globalStyle from '../../globalStyles/globalStyle.module.scss'
import { Link } from "react-router-dom"
import React from "react"

type PropsType = {
    user: UserType
    toggleSubscribe: (userId: number, followed: boolean) => void
    inFollowingProcess: number[]
}

export const User: React.FC<PropsType> = React.memo(({ user, toggleSubscribe, inFollowingProcess }) => {
    return <div className={style.user}>
        <div>
            <Link to={'/profile/' + user.id}>
                <div className={style.userPhoto}>
                    <img src={user.photos.large || userPhotoPlaceholder} alt="user photo" />
                </div>
            </Link>
            <button className={globalStyle.btn}
                onClick={() => toggleSubscribe(user.id, user.followed)}
                disabled={inFollowingProcess.some(id => id === user.id)}>{user.followed ? 'Unfollow' : 'Follow'}</button>
        </div>
        <div>
            <div>
                <b>{user.name}</b>
            </div>
            <div className={style.userStatus}>
                Status: {user.status}
            </div>
        </div>
    </div>
})