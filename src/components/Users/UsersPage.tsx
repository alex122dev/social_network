import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { DispatchThunkType } from '../../redux/store'
import { FilterUsersType, getUsers } from '../../redux/users-reducer'
import { selectorGetTotalUsersCount, selectorGetUsersCurrentPage, selectorGetUsersFilter, selectorGetUsersIsFetching, selectorGetUsersPageSize } from '../../redux/users-selector'
import { Paginator } from '../common/Paginator/Paginator'
import { Preloader } from '../common/Preloader/Preloader'
import { Users } from './Users'
import style from './Users.module.scss'
import { UsersSearchForm } from './UsersSearchForm'

export const UsersPage = () => {

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



    return <div className={style.usersPage}>
        <UsersSearchForm onFilterChanged={onFilterChanged} />
        <Paginator currentPage={currentPage} pageSize={pageSize} totalItemsCount={totalUsersCount} onChangePage={onChangePage} />
        {isFetching && <Preloader />}
        <Users />
    </div>
}