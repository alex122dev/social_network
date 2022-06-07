import style from './Login.module.scss'
import { useSelector } from "react-redux";
import { selectorGetIsAuth } from "../../redux/auth-selectors";
import { Navigate } from "react-router-dom";
import { LoginForm } from "./LoginForm";


type PropsType = {
}

export const Login: React.FC<PropsType> = () => {
    const isAuth = useSelector(selectorGetIsAuth)

    if (isAuth) {
        return <Navigate to='/profile' />
    }

    return (
        <div>
            <h2 className={style.title}>Login</h2>
            <LoginForm />
        </div>
    )
}