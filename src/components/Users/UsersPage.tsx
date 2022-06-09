import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { DispatchThunkType } from '../../redux/store'
import { FilterUsersType, getUsers } from '../../redux/users-reducer'
import { selectorGetTotalUsersCount, selectorGetUsersCurrentPage, selectorGetUsersFilter, selectorGetUsersIsFetching, selectorGetUsersPageSize } from '../../redux/users-selector'
import { Paginator } from '../common/Paginator/Paginator'
import { Preloader } from '../common/Preloader/Preloader'
import { Users } from './Users'
import style from './Users.module.scss'
import { UsersSearchForm } from './UsersSearchForm'

export const UsersPage = React.memo(() => {

    const currentPage = useSelector(selectorGetUsersCurrentPage)
    const pageSize = useSelector(selectorGetUsersPageSize)
    const totalUsersCount = useSelector(selectorGetTotalUsersCount)
    const isFetching = useSelector(selectorGetUsersIsFetching)
    const filter = useSelector(selectorGetUsersFilter)

    const dispatch: DispatchThunkType = useDispatch()

    const onChangePage = (pageNumber: number) => {
        dispatch(getUsers(pageSize, pageNumber, filter))
    }

    const onFilterChanged = (filter: FilterUsersType) => {
        dispatch(getUsers(pageSize, 1, filter))
    }


    const [searchParams, setSearchParams] = useSearchParams();
    const currentParams = Object.fromEntries([...searchParams]);
    //console.log('query params: ', currentParams);

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



    return <div className={style.usersPage}>
        <UsersSearchForm onFilterChanged={onFilterChanged} />
        <Paginator currentPage={currentPage} pageSize={pageSize} totalItemsCount={totalUsersCount} onChangePage={onChangePage} />
        {isFetching && <Preloader />}
        <Users />
    </div>
})