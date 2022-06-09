import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { DispatchThunkType } from '../../redux/store'
import { FilterUsersType, getUsers, toggleSubscribe } from '../../redux/users-reducer'
import { selectorGetUsers, selectorGetUsersCurrentPage, selectorGetUsersFilter, selectorGetUsersInFollowingProcess, selectorGetUsersPageSize } from '../../redux/users-selector'
import { User } from './User'
import style from './Users.module.scss'

export const Users = React.memo(() => {

    const dispatch: DispatchThunkType = useDispatch()
    const users = useSelector(selectorGetUsers)
    const inFollowingProcess = useSelector(selectorGetUsersInFollowingProcess)

    const toggleSubscribeCallback = (userId: number, followed: boolean) => {
        dispatch(toggleSubscribe(userId, followed))
    }
    //console.log('Users render');

    return <div className={style.usersContainer}>
        {users.map(user => <User key={user.id} user={user} toggleSubscribe={toggleSubscribeCallback}
            inFollowingProcess={inFollowingProcess} />)}
    </div>
})