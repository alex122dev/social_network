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

    const pageSize = useSelector(selectorGetUsersPageSize)
    const currentPage = useSelector(selectorGetUsersCurrentPage)
    const dispatch: DispatchThunkType = useDispatch()
    const users = useSelector(selectorGetUsers)
    const inFollowingProcess = useSelector(selectorGetUsersInFollowingProcess)
    const filter = useSelector(selectorGetUsersFilter)

    const toggleSubscribeCallback = (userId: number, followed: boolean) => {
        dispatch(toggleSubscribe(userId, followed))
    }

    const [searchParams, setSearchParams] = useSearchParams();
    const currentParams = Object.fromEntries([...searchParams]);
    console.log('query params: ', currentParams);

    useEffect(() => {
        //console.log('reading from query params');

        let actualFilter: FilterUsersType = filter;
        let actualCurrentPage = currentPage;

        if (currentParams.page) actualCurrentPage = Number(currentParams.page)
        if (currentParams.term) actualFilter = { ...actualFilter, term: currentParams.term }
        switch (currentParams.friend) {
            case 'true':
                actualFilter = { ...actualFilter, friend: 'true' }
                break
            case 'false':
                actualFilter = { ...actualFilter, friend: 'false' }
                break
            case 'null':
                actualFilter = { ...actualFilter, friend: 'null' }
                break
        }

        dispatch(getUsers(pageSize, actualCurrentPage, actualFilter))
    }, [])

    useEffect(() => {
        //console.log('create new query str');

        let queryStr = ''
        if (filter.term) queryStr += `&term=${filter.term}`
        if (filter.friend !== 'null') queryStr += `&friend=${filter.friend}`
        if (currentPage > 1) queryStr += `&page=${currentPage}`

        setSearchParams(queryStr)
        //setSearchParams(`page=${currentPage}&term=${filter.term}&friend=${filter.friend}`)
    }, [filter, currentPage])

    return <div className={style.usersContainer}>
        {users.map(user => <User key={user.id} user={user} toggleSubscribe={toggleSubscribeCallback}
            inFollowingProcess={inFollowingProcess} />)}
    </div>
})