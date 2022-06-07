import { useSelector } from 'react-redux'
import { selectorGetIsAuth, selectorGetUserLogin } from '../../redux/auth-selectors'
import style from './Header.module.scss'
import globalstyle from '../../globalStyles/globalStyle.module.scss'
import { DispatchThunkType } from '../../redux/store'
import { useDispatch } from 'react-redux'
import { logout } from '../../redux/auth-reducer'


type PropsType = {

}

export const Header: React.FC<PropsType> = () => {
    const isAuth = useSelector(selectorGetIsAuth)
    const login = useSelector(selectorGetUserLogin)

    const dispatch: DispatchThunkType = useDispatch()

    const logoutCallback = () => {
        dispatch(logout())
        console.log(1);
    }

    return (
        <header className={style.header}>
            <div>logo</div>
            <div className={style.userBlock}>
                {isAuth
                    ? <>
                        <span className={style.userName}>{login}</span>
                        <button className={globalstyle.btn} onClick={logoutCallback}>Log out</button>
                    </>
                    : <>
                        <button type='button' className={globalstyle.btn}>Login</button>
                    </>}
            </div>
        </header>
    )
}