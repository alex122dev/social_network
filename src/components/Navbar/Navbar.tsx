import cn from 'classnames'
import { NavLink } from 'react-router-dom'
import style from './Navbar.module.scss'



type PropsType = {

}

export const Navbar: React.FC<PropsType> = () => {
    return (
        <nav className={style.navbar}>

            <ul className={style.menu}>
                <li className={style.menuItem}>
                    <NavLink to='/profile'
                        className={({ isActive }) => cn(style.menuLink, { [style.menuLinkActive]: isActive })}>
                        Profile</NavLink>
                </li>
                <li className={style.menuItem}>
                    <NavLink to='/dialogs'
                        className={({ isActive }) => cn(style.menuLink, { [style.menuLinkActive]: isActive })}>
                        Dialogs</NavLink>
                </li>
                <li className={style.menuItem}>
                    <NavLink to='/users'
                        className={({ isActive }) => cn(style.menuLink, { [style.menuLinkActive]: isActive })}>
                        Users</NavLink>
                </li>
                <li className={style.menuItem}>
                    <NavLink to='/chat'
                        className={({ isActive }) => cn(style.menuLink, { [style.menuLinkActive]: isActive })}>
                        Chat</NavLink>
                </li>
            </ul>
        </nav>
    )
}