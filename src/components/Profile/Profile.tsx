import { useSelector } from 'react-redux'
import { Navigate, useParams } from 'react-router-dom'
import { selectorGetAuthUserId, selectorGetIsAuth } from '../../redux/auth-selectors'
import style from './Profile.module.scss'
import { ProfileInfo } from './ProfileInfo'
import { ProfileStatus } from './ProfileStatus'



export const Profile: React.FC = () => {

    const isAuth = useSelector(selectorGetIsAuth)
    const userInitializedId = useSelector(selectorGetAuthUserId)

    let userId: number | null;
    const params = useParams()
    //console.log(params.userId);
    userId = params.userId ? Number(params.userId) : userInitializedId

    if (!isAuth || !userId) {
        return <Navigate to='/login' />
    }

    return <div className={style.profile}>
        <ProfileInfo userId={userId} isOwner={!params.userId} />
        <ProfileStatus userId={userId} isOwner={!params.userId} />
    </div>
}
