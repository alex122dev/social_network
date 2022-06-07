import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { selectorGetAuthUserId, selectorGetIsAuth } from '../../redux/auth-selectors'
import style from './Profile.module.scss'
import { ProfileInfo } from './ProfileInfo'



export const Profile: React.FC = () => {

    const isAuth = useSelector(selectorGetIsAuth)
    const userId = useSelector(selectorGetAuthUserId)

    if (!isAuth || !userId) {
        return <Navigate to='/login' />
    }

    return <div className={style.profile}>
        <ProfileInfo userId={userId} />
    </div>
}
